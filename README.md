# Farmer Intrusion Detection System

A Python-based intrusion detection system designed for agricultural environments. This system uses computer vision techniques to detect motion and potential intrusions on farms, helping farmers protect their crops and livestock from unwanted visitors.

## Features

- **Real-time Motion Detection**: Uses background subtraction and contour analysis to detect movement
- **Camera Support**: Works with USB cameras, webcams, or IP cameras
- **Video File Processing**: Analyze recorded video footage for intrusions
- **Configurable Sensitivity**: Adjust detection parameters to reduce false positives
- **Alert System**: Callback-based alerts when intrusions are detected
- **Visual Feedback**: Real-time display with bounding boxes around detected motion
- **Snapshot Saving**: Utility functions to save images when intrusions are detected

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/jignesh0462124/Farmer-Intrusion-Detection.git
cd Farmer-Intrusion-Detection
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

Run the intrusion detection system with default settings (using the default camera):

```bash
python main.py
```

### Command Line Options

```bash
python main.py [OPTIONS]
```

| Option | Description | Default |
|--------|-------------|---------|
| `--source` | Video source (camera index or file path) | `0` |
| `--sensitivity` | Detection sensitivity (0-100) | `50` |
| `--min-area` | Minimum contour area for detection | `500` |
| `--width` | Processing frame width | `640` |
| `--height` | Processing frame height | `480` |
| `--cooldown` | Alert cooldown in seconds | `5.0` |
| `--no-display` | Disable visual display | `False` |

### Examples

Monitor using a USB camera:
```bash
python main.py --source 0
```

Process a video file:
```bash
python main.py --source /path/to/video.mp4
```

High sensitivity detection:
```bash
python main.py --sensitivity 80 --min-area 300
```

Run without display (headless mode):
```bash
python main.py --no-display
```

### Programmatic Usage

```python
from src.intrusion_detection import IntrusionDetector, DetectionConfig

# Create custom configuration
config = DetectionConfig(
    sensitivity=60,
    min_contour_area=500,
    frame_width=640,
    frame_height=480,
    alert_cooldown=5.0,
    show_display=True
)

# Define alert callback
def on_intrusion(regions):
    print(f"Intrusion detected in {len(regions)} region(s)")
    for x, y, w, h in regions:
        print(f"  Location: ({x}, {y}) Size: {w}x{h}")

# Create and start detector
detector = IntrusionDetector(config=config, alert_callback=on_intrusion)
detector.start_camera(0)
```

## Project Structure

```
Farmer-Intrusion-Detection/
├── src/
│   └── intrusion_detection/
│       ├── __init__.py          # Package initialization
│       ├── config.py            # Configuration settings
│       ├── detector.py          # Main intrusion detector
│       ├── motion_detector.py   # Motion detection algorithms
│       └── utils.py             # Utility functions
├── main.py                      # CLI entry point
├── requirements.txt             # Python dependencies
└── README.md                    # This file
```

## Configuration

The `DetectionConfig` class allows customization of the detection behavior:

| Parameter | Type | Description |
|-----------|------|-------------|
| `sensitivity` | int | Detection sensitivity (0-100) |
| `min_contour_area` | int | Minimum area to consider as motion |
| `motion_threshold` | int | Threshold for motion detection |
| `frame_width` | int | Processing frame width |
| `frame_height` | int | Processing frame height |
| `alert_cooldown` | float | Seconds between alerts |
| `roi` | tuple | Region of interest (x, y, w, h) |
| `show_display` | bool | Enable/disable visual display |
| `box_color` | tuple | BGR color for detection boxes |
| `box_thickness` | int | Thickness of detection boxes |

## How It Works

1. **Frame Capture**: Video frames are captured from the specified source
2. **Preprocessing**: Frames are resized, converted to grayscale, and blurred
3. **Background Subtraction**: MOG2 algorithm identifies foreground objects
4. **Contour Detection**: Motion regions are identified through contour analysis
5. **Filtering**: Small contours (noise) are filtered based on minimum area
6. **Alert Generation**: When significant motion is detected, alerts are triggered
7. **Visualization**: Bounding boxes are drawn around detected motion regions

## Controls

When running with display enabled:
- Press `q` to quit the application

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.