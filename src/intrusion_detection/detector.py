"""
Main Intrusion Detector Module for Farmer Intrusion Detection System.

This module provides the main interface for detecting intrusions
on farms using video input from cameras.
"""

import cv2
import time
from typing import Callable, Optional, List, Tuple

from .config import DetectionConfig
from .motion_detector import MotionDetector


class IntrusionDetector:
    """
    Main intrusion detection class.

    This class handles video input processing and coordinates motion
    detection to identify potential intrusions on a farm.
    """

    def __init__(
        self,
        config: Optional[DetectionConfig] = None,
        alert_callback: Optional[Callable[[List[Tuple[int, int, int, int]]], None]] = None
    ):
        """
        Initialize the intrusion detector.

        Args:
            config: Detection configuration settings. Uses defaults if None.
            alert_callback: Optional callback function called when intrusion is detected.
                           Receives list of bounding boxes as argument.
        """
        self.config = config or DetectionConfig()
        self.config.validate()

        self.motion_detector = MotionDetector(self.config)
        self.alert_callback = alert_callback

        self._last_alert_time = 0
        self._is_running = False
        self._video_capture = None

    def _can_alert(self) -> bool:
        """Check if enough time has passed since last alert."""
        current_time = time.time()
        if current_time - self._last_alert_time >= self.config.alert_cooldown:
            return True
        return False

    def _trigger_alert(self, regions: List[Tuple[int, int, int, int]]):
        """Trigger an alert for detected intrusion."""
        if self._can_alert():
            self._last_alert_time = time.time()
            if self.alert_callback:
                self.alert_callback(regions)
            print(f"[ALERT] Intrusion detected! {len(regions)} region(s) identified.")

    def process_frame(
        self, frame
    ) -> Tuple[bool, List[Tuple[int, int, int, int]]]:
        """
        Process a single frame for intrusion detection.

        Args:
            frame: Input frame (BGR format)

        Returns:
            Tuple of (intrusion_detected, annotated_frame, regions)
        """
        # Detect motion
        motion_detected, regions = self.motion_detector.detect_motion(frame)

        # Resize frame for display
        display_frame = cv2.resize(
            frame,
            (self.config.frame_width, self.config.frame_height)
        )

        # Draw bounding boxes
        if motion_detected:
            for (x, y, w, h) in regions:
                cv2.rectangle(
                    display_frame,
                    (x, y),
                    (x + w, y + h),
                    self.config.box_color,
                    self.config.box_thickness
                )

            # Add alert text
            cv2.putText(
                display_frame,
                "INTRUSION DETECTED",
                (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 0, 255),
                2
            )

            self._trigger_alert(regions)

        # Add timestamp
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        cv2.putText(
            display_frame,
            timestamp,
            (10, display_frame.shape[0] - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (255, 255, 255),
            1
        )

        return motion_detected, display_frame, regions

    def start_camera(self, camera_source: int = 0):
        """
        Start monitoring from a camera source.

        Args:
            camera_source: Camera index (0 for default camera) or video file path
        """
        self._video_capture = cv2.VideoCapture(camera_source)

        if not self._video_capture.isOpened():
            raise RuntimeError(f"Could not open camera source: {camera_source}")

        self._is_running = True
        print(f"Starting intrusion detection on camera {camera_source}")
        print("Press 'q' to quit")

        try:
            while self._is_running:
                ret, frame = self._video_capture.read()

                if not ret:
                    print("Failed to read frame from camera")
                    break

                detected, display_frame, _ = self.process_frame(frame)

                if self.config.show_display:
                    cv2.imshow("Farmer Intrusion Detection", display_frame)

                    # Check for quit key
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break

        finally:
            self.stop()

    def start_video(self, video_path: str):
        """
        Start monitoring from a video file.

        Args:
            video_path: Path to the video file
        """
        self._video_capture = cv2.VideoCapture(video_path)

        if not self._video_capture.isOpened():
            raise RuntimeError(f"Could not open video file: {video_path}")

        self._is_running = True
        print(f"Starting intrusion detection on video: {video_path}")
        print("Press 'q' to quit")

        try:
            while self._is_running:
                ret, frame = self._video_capture.read()

                if not ret:
                    print("End of video")
                    break

                detected, display_frame, _ = self.process_frame(frame)

                if self.config.show_display:
                    cv2.imshow("Farmer Intrusion Detection", display_frame)

                    # Check for quit key - wait longer for video playback
                    if cv2.waitKey(30) & 0xFF == ord('q'):
                        break

        finally:
            self.stop()

    def stop(self):
        """Stop the detection and release resources."""
        self._is_running = False

        if self._video_capture is not None:
            self._video_capture.release()
            self._video_capture = None

        cv2.destroyAllWindows()
        print("Intrusion detection stopped")

    def process_image(
        self, image_path: str
    ) -> Tuple[bool, List[Tuple[int, int, int, int]]]:
        """
        Process a single image for intrusion detection.

        Note: Single image processing is limited since motion detection
        requires comparing frames. This method is mainly useful for testing.

        Args:
            image_path: Path to the image file

        Returns:
            Tuple of (detection_possible, regions)
        """
        image = cv2.imread(image_path)

        if image is None:
            raise ValueError(f"Could not load image: {image_path}")

        # For single images, we can't detect motion, but we can show
        # the processed frame
        resized = cv2.resize(
            image,
            (self.config.frame_width, self.config.frame_height)
        )

        if self.config.show_display:
            cv2.imshow("Farmer Intrusion Detection - Image", resized)
            cv2.waitKey(0)
            cv2.destroyAllWindows()

        # Return False since we can't detect motion in a single frame
        return False, []
