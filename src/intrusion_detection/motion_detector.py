"""
Motion Detection Module for Farmer Intrusion Detection System.

This module provides motion detection capabilities using background
subtraction and contour analysis.
"""

import cv2
import numpy as np
from typing import List, Tuple, Optional

from .config import DetectionConfig


class MotionDetector:
    """
    Motion detector using background subtraction.

    This class detects motion in video frames by comparing them against
    a background model and identifying areas of significant change.
    """

    def __init__(self, config: Optional[DetectionConfig] = None):
        """
        Initialize the motion detector.

        Args:
            config: Detection configuration settings. Uses defaults if None.
        """
        self.config = config or DetectionConfig()
        self.config.validate()

        # Create background subtractor
        self.bg_subtractor = cv2.createBackgroundSubtractorMOG2(
            history=500,
            varThreshold=self.config.motion_threshold,
            detectShadows=True
        )

        self._previous_frame = None
        self._frame_count = 0

    def preprocess_frame(self, frame: np.ndarray) -> np.ndarray:
        """
        Preprocess a frame for motion detection.

        Args:
            frame: Input frame (BGR format)

        Returns:
            Preprocessed grayscale frame
        """
        # Resize frame
        resized = cv2.resize(
            frame,
            (self.config.frame_width, self.config.frame_height)
        )

        # Apply region of interest if specified
        if self.config.roi is not None:
            x, y, w, h = self.config.roi
            resized = resized[y:y+h, x:x+w]

        # Convert to grayscale
        gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)

        # Apply Gaussian blur to reduce noise
        blurred = cv2.GaussianBlur(gray, (21, 21), 0)

        return blurred

    def detect_motion(
        self, frame: np.ndarray
    ) -> Tuple[bool, List[Tuple[int, int, int, int]]]:
        """
        Detect motion in a frame.

        Args:
            frame: Input frame (BGR format)

        Returns:
            Tuple of (motion_detected, list of bounding boxes)
        """
        self._frame_count += 1

        # Preprocess frame
        processed = self.preprocess_frame(frame)

        # Apply background subtraction
        fg_mask = self.bg_subtractor.apply(processed)

        # Apply threshold to remove shadows (shadows are marked as 127)
        _, thresh = cv2.threshold(fg_mask, 200, 255, cv2.THRESH_BINARY)

        # Dilate to fill gaps
        kernel = np.ones((5, 5), np.uint8)
        dilated = cv2.dilate(thresh, kernel, iterations=2)

        # Find contours
        contours, _ = cv2.findContours(
            dilated,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        # Filter contours by area
        motion_regions = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area >= self.config.min_contour_area:
                x, y, w, h = cv2.boundingRect(contour)
                motion_regions.append((x, y, w, h))

        motion_detected = len(motion_regions) > 0

        return motion_detected, motion_regions

    def detect_motion_simple(
        self, frame: np.ndarray
    ) -> Tuple[bool, List[Tuple[int, int, int, int]]]:
        """
        Simple motion detection using frame differencing.

        This is an alternative method that compares consecutive frames.

        Args:
            frame: Input frame (BGR format)

        Returns:
            Tuple of (motion_detected, list of bounding boxes)
        """
        processed = self.preprocess_frame(frame)

        if self._previous_frame is None:
            self._previous_frame = processed
            return False, []

        # Compute absolute difference
        frame_diff = cv2.absdiff(self._previous_frame, processed)

        # Apply threshold
        _, thresh = cv2.threshold(
            frame_diff,
            self.config.motion_threshold,
            255,
            cv2.THRESH_BINARY
        )

        # Dilate to fill gaps
        kernel = np.ones((5, 5), np.uint8)
        dilated = cv2.dilate(thresh, kernel, iterations=2)

        # Find contours
        contours, _ = cv2.findContours(
            dilated,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        # Filter contours by area
        motion_regions = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area >= self.config.min_contour_area:
                x, y, w, h = cv2.boundingRect(contour)
                motion_regions.append((x, y, w, h))

        # Update previous frame
        self._previous_frame = processed

        motion_detected = len(motion_regions) > 0

        return motion_detected, motion_regions

    def reset(self):
        """Reset the detector state."""
        self._previous_frame = None
        self._frame_count = 0
        self.bg_subtractor = cv2.createBackgroundSubtractorMOG2(
            history=500,
            varThreshold=self.config.motion_threshold,
            detectShadows=True
        )
