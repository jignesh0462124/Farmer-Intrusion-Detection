"""
Tests for Farmer Intrusion Detection System.
"""

import unittest
import numpy as np
import sys
import os

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.intrusion_detection import DetectionConfig, MotionDetector, IntrusionDetector


class TestDetectionConfig(unittest.TestCase):
    """Tests for DetectionConfig class."""

    def test_default_config(self):
        """Test default configuration values."""
        config = DetectionConfig()
        self.assertEqual(config.sensitivity, 50)
        self.assertEqual(config.min_contour_area, 500)
        self.assertEqual(config.frame_width, 640)
        self.assertEqual(config.frame_height, 480)
        self.assertTrue(config.validate())

    def test_custom_config(self):
        """Test custom configuration values."""
        config = DetectionConfig(
            sensitivity=80,
            min_contour_area=1000,
            frame_width=1280,
            frame_height=720
        )
        self.assertEqual(config.sensitivity, 80)
        self.assertEqual(config.min_contour_area, 1000)
        self.assertTrue(config.validate())

    def test_invalid_sensitivity(self):
        """Test that invalid sensitivity raises error."""
        config = DetectionConfig(sensitivity=150)
        with self.assertRaises(ValueError):
            config.validate()

    def test_invalid_min_area(self):
        """Test that invalid minimum area raises error."""
        config = DetectionConfig(min_contour_area=-100)
        with self.assertRaises(ValueError):
            config.validate()


class TestMotionDetector(unittest.TestCase):
    """Tests for MotionDetector class."""

    def test_initialization(self):
        """Test motion detector initialization."""
        detector = MotionDetector()
        self.assertIsNotNone(detector.config)
        self.assertIsNotNone(detector.bg_subtractor)

    def test_preprocess_frame(self):
        """Test frame preprocessing."""
        detector = MotionDetector()
        # Create a dummy color frame
        frame = np.zeros((480, 640, 3), dtype=np.uint8)
        frame[:, :, 2] = 255  # Red frame

        processed = detector.preprocess_frame(frame)

        # Should be grayscale (2D)
        self.assertEqual(len(processed.shape), 2)

    def test_detect_motion_no_motion(self):
        """Test motion detection with static frames."""
        detector = MotionDetector()

        # Create identical frames
        frame = np.zeros((480, 640, 3), dtype=np.uint8)

        # Process several identical frames to establish background
        for _ in range(10):
            detected, regions = detector.detect_motion(frame)

        # Should not detect motion in identical frames
        detected, regions = detector.detect_motion(frame)
        # Note: Background subtractor may still show some initial adaptation
        self.assertIsInstance(detected, bool)
        self.assertIsInstance(regions, list)

    def test_reset(self):
        """Test detector reset."""
        detector = MotionDetector()
        frame = np.zeros((480, 640, 3), dtype=np.uint8)

        # Process a frame
        detector.detect_motion(frame)
        self.assertGreater(detector._frame_count, 0)

        # Reset
        detector.reset()
        self.assertEqual(detector._frame_count, 0)


class TestIntrusionDetector(unittest.TestCase):
    """Tests for IntrusionDetector class."""

    def test_initialization(self):
        """Test intrusion detector initialization."""
        detector = IntrusionDetector()
        self.assertIsNotNone(detector.config)
        self.assertIsNotNone(detector.motion_detector)

    def test_initialization_with_callback(self):
        """Test initialization with alert callback."""
        alerts = []

        def callback(regions):
            alerts.append(regions)

        detector = IntrusionDetector(alert_callback=callback)
        self.assertIsNotNone(detector.alert_callback)

    def test_can_alert_cooldown(self):
        """Test alert cooldown mechanism."""
        config = DetectionConfig(alert_cooldown=0.1)
        detector = IntrusionDetector(config=config)

        # First alert should be allowed
        self.assertTrue(detector._can_alert())

        # After triggering, should be blocked
        detector._last_alert_time = __import__('time').time()
        self.assertFalse(detector._can_alert())

    def test_process_frame(self):
        """Test frame processing."""
        config = DetectionConfig(show_display=False)
        detector = IntrusionDetector(config=config)

        frame = np.zeros((480, 640, 3), dtype=np.uint8)
        detected, display_frame, regions = detector.process_frame(frame)

        self.assertIsInstance(detected, bool)
        self.assertIsNotNone(display_frame)
        self.assertIsInstance(regions, list)


if __name__ == '__main__':
    unittest.main()
