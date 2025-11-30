"""
Farmer Intrusion Detection Package

This package provides tools for detecting intrusions on farms using
computer vision techniques.
"""

from .detector import IntrusionDetector
from .motion_detector import MotionDetector
from .config import DetectionConfig

__all__ = ["IntrusionDetector", "MotionDetector", "DetectionConfig"]
__version__ = "1.0.0"
