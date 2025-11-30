#!/usr/bin/env python3
"""
Example usage script for Farmer Intrusion Detection System.

This script demonstrates how to use the intrusion detection system
with different configurations and sources.
"""

import argparse
import sys
from typing import List, Tuple

from src.intrusion_detection import IntrusionDetector, DetectionConfig


def on_intrusion_detected(regions: List[Tuple[int, int, int, int]]):
    """Callback function when intrusion is detected."""
    print(f"\n*** ALERT: Intrusion detected! ***")
    print(f"Number of regions: {len(regions)}")
    for i, (x, y, w, h) in enumerate(regions, 1):
        print(f"  Region {i}: x={x}, y={y}, width={w}, height={h}")
    print()


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Farmer Intrusion Detection System"
    )

    parser.add_argument(
        "--source",
        type=str,
        default="0",
        help="Video source: camera index (0, 1, etc.) or video file path"
    )

    parser.add_argument(
        "--sensitivity",
        type=int,
        default=50,
        help="Detection sensitivity (0-100)"
    )

    parser.add_argument(
        "--min-area",
        type=int,
        default=500,
        help="Minimum contour area for detection"
    )

    parser.add_argument(
        "--width",
        type=int,
        default=640,
        help="Processing frame width"
    )

    parser.add_argument(
        "--height",
        type=int,
        default=480,
        help="Processing frame height"
    )

    parser.add_argument(
        "--cooldown",
        type=float,
        default=5.0,
        help="Alert cooldown in seconds"
    )

    parser.add_argument(
        "--no-display",
        action="store_true",
        help="Disable visual display"
    )

    args = parser.parse_args()

    # Create configuration
    config = DetectionConfig(
        sensitivity=args.sensitivity,
        min_contour_area=args.min_area,
        frame_width=args.width,
        frame_height=args.height,
        alert_cooldown=args.cooldown,
        show_display=not args.no_display
    )

    # Create detector
    detector = IntrusionDetector(
        config=config,
        alert_callback=on_intrusion_detected
    )

    # Determine source type
    try:
        source = int(args.source)
        print(f"Using camera {source}")
        detector.start_camera(source)
    except ValueError:
        print(f"Using video file: {args.source}")
        detector.start_video(args.source)


if __name__ == "__main__":
    main()
