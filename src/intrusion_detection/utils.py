"""
Utility functions for Farmer Intrusion Detection System.
"""

import cv2
import os
import datetime
from typing import Tuple, Optional
import numpy as np


def save_detection_snapshot(
    frame: np.ndarray,
    output_dir: str = "snapshots",
    prefix: str = "intrusion"
) -> str:
    """
    Save a snapshot of the detected intrusion.

    Args:
        frame: The frame to save
        output_dir: Directory to save snapshots
        prefix: Filename prefix

    Returns:
        Path to the saved snapshot
    """
    os.makedirs(output_dir, exist_ok=True)

    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{prefix}_{timestamp}.jpg"
    filepath = os.path.join(output_dir, filename)

    cv2.imwrite(filepath, frame)
    return filepath


def resize_frame(
    frame: np.ndarray,
    width: Optional[int] = None,
    height: Optional[int] = None
) -> np.ndarray:
    """
    Resize a frame maintaining aspect ratio.

    Args:
        frame: Input frame
        width: Target width (optional)
        height: Target height (optional)

    Returns:
        Resized frame
    """
    if width is None and height is None:
        return frame

    h, w = frame.shape[:2]

    if width is not None and height is not None:
        return cv2.resize(frame, (width, height))

    if width is not None:
        ratio = width / w
        new_height = int(h * ratio)
        return cv2.resize(frame, (width, new_height))

    if height is not None:
        ratio = height / h
        new_width = int(w * ratio)
        return cv2.resize(frame, (new_width, height))

    return frame


def draw_detection_info(
    frame: np.ndarray,
    regions: list,
    fps: float = 0.0,
    status: str = "Monitoring"
) -> np.ndarray:
    """
    Draw detection information overlay on frame.

    Args:
        frame: Input frame
        regions: List of detected regions
        fps: Current FPS
        status: Current status string

    Returns:
        Frame with overlay
    """
    output = frame.copy()

    # Draw status bar background
    cv2.rectangle(output, (0, 0), (frame.shape[1], 50), (0, 0, 0), -1)

    # Draw status text
    cv2.putText(
        output,
        f"Status: {status}",
        (10, 20),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.5,
        (255, 255, 255),
        1
    )

    # Draw FPS
    cv2.putText(
        output,
        f"FPS: {fps:.1f}",
        (10, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.5,
        (255, 255, 255),
        1
    )

    # Draw detection count
    cv2.putText(
        output,
        f"Detections: {len(regions)}",
        (200, 20),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.5,
        (0, 255, 0) if len(regions) == 0 else (0, 0, 255),
        1
    )

    return output


def calculate_fps(
    prev_time: float,
    current_time: float
) -> float:
    """
    Calculate frames per second.

    Args:
        prev_time: Previous frame timestamp
        current_time: Current frame timestamp

    Returns:
        FPS value
    """
    elapsed = current_time - prev_time
    if elapsed > 0:
        return 1.0 / elapsed
    return 0.0


def validate_video_source(source) -> bool:
    """
    Validate that a video source can be opened.

    Args:
        source: Camera index or video file path

    Returns:
        True if source is valid, False otherwise
    """
    cap = cv2.VideoCapture(source)
    is_valid = cap.isOpened()
    cap.release()
    return is_valid


def get_video_properties(source) -> dict:
    """
    Get properties of a video source.

    Args:
        source: Camera index or video file path

    Returns:
        Dictionary with video properties
    """
    cap = cv2.VideoCapture(source)

    if not cap.isOpened():
        return {}

    properties = {
        "width": int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
        "height": int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)),
        "fps": cap.get(cv2.CAP_PROP_FPS),
        "frame_count": int(cap.get(cv2.CAP_PROP_FRAME_COUNT)),
    }

    cap.release()
    return properties
