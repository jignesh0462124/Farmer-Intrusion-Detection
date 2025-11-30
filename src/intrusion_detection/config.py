"""
Configuration module for Farmer Intrusion Detection System.
"""

from dataclasses import dataclass
from typing import Tuple


@dataclass
class DetectionConfig:
    """Configuration settings for intrusion detection."""

    # Detection sensitivity (0-100)
    sensitivity: int = 50

    # Minimum contour area to be considered as motion
    min_contour_area: int = 500

    # Motion detection threshold
    motion_threshold: int = 25

    # Frame resize dimensions for processing
    frame_width: int = 640
    frame_height: int = 480

    # Alert cooldown in seconds (to avoid repeated alerts)
    alert_cooldown: float = 5.0

    # Region of interest (x, y, width, height) - None means full frame
    roi: Tuple[int, int, int, int] = None

    # Enable visual display of detection
    show_display: bool = True

    # Color for drawing detection boxes (BGR format)
    box_color: Tuple[int, int, int] = (0, 255, 0)

    # Box thickness
    box_thickness: int = 2

    def validate(self):
        """Validate configuration values."""
        if not 0 <= self.sensitivity <= 100:
            raise ValueError("Sensitivity must be between 0 and 100")
        if self.min_contour_area <= 0:
            raise ValueError("Minimum contour area must be positive")
        if self.motion_threshold <= 0:
            raise ValueError("Motion threshold must be positive")
        if self.frame_width <= 0 or self.frame_height <= 0:
            raise ValueError("Frame dimensions must be positive")
        if self.alert_cooldown < 0:
            raise ValueError("Alert cooldown cannot be negative")
        return True
