# SVG Tracer & Creator - Chrome Extension

A powerful Chrome extension for creating and converting SVG (Scalable Vector Graphics) files with support for multiple input methods.

## Features

### 🎨 Draw Mode
- **Pen Tablet Support**: Full support for USB Wacom tablets and other pen input devices
- **Mouse Drawing**: Draw with your mouse on a high-quality canvas
- **Pressure Sensitivity**: Pen pressure affects stroke width for natural drawing
- **Customizable**: Adjust stroke width (1-20px) and color
- **Instant Export**: Download your drawings as SVG vector files

### ✍️ Text to SVG
- **Font Selection**: Choose from 8 different fonts
- **Size Control**: Adjustable font sizes from 12px to 120px
- **Color Picker**: Full color customization
- **Multi-line Support**: Create text with multiple lines
- **Live Preview**: See your text before exporting
- **Clean Output**: Generate clean, scalable SVG text files

### 🖼️ Image Tracing
- **Image Upload**: Drag & drop or click to upload images
- **Format Support**: Works with JPG, PNG, GIF, and BMP files
- **B&W Conversion**: Adjustable threshold for black and white conversion
- **Vector Tracing**: Converts bitmap images to vector paths
- **Edge Detection**: Uses advanced algorithms to detect and trace edges
- **Preview**: See the traced result before downloading

## Installation

### Method 1: Load Unpacked Extension (Development)

1. Clone or download this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `chrome_extensions` folder
6. The extension icon will appear in your browser toolbar

### Method 2: Generate Better Icons (Optional)

The extension comes with placeholder icons. For better quality icons:

1. Open `icons/generate-pngs.html` in your browser
2. Click each download button (16x16, 48x48, 128x128)
3. Replace the existing PNG files in the `icons/` folder
4. Reload the extension in Chrome

## Usage

### Drawing with Pen/Mouse

1. Click the extension icon in your toolbar
2. Select the **Draw** tab (default)
3. Adjust stroke width and color as desired
4. Draw on the canvas using your mouse or pen tablet
5. Click **Download SVG** to save your drawing

**Tips:**
- Use a Wacom tablet for pressure-sensitive drawing
- The Clear button resets the canvas
- SVG files can be scaled infinitely without quality loss

### Creating Text SVG

1. Click the extension icon
2. Select the **Text** tab
3. Enter your text in the textarea
4. Choose a font family
5. Adjust font size with the slider
6. Pick a color
7. Click **Preview** to see the result
8. Click **Download SVG** to save

**Tips:**
- Press Enter for multi-line text
- Preview updates automatically as you type
- Text SVGs are perfect for logos and graphics

### Tracing Images

1. Click the extension icon
2. Select the **Trace Image** tab
3. Upload an image (drag & drop or click)
4. Adjust the threshold slider to control B&W conversion
   - Lower values = more black
   - Higher values = more white
5. Click **Process & Trace**
6. Preview the vectorized result
7. Click **Download SVG** to save

**Tips:**
- Works best with high-contrast images
- Simple shapes trace better than complex photos
- Adjust threshold for optimal results
- The tracing uses edge detection and path simplification

## Technical Details

### Technologies Used

- **HTML5 Canvas API**: For drawing and image processing
- **Pointer Events API**: For pen tablet and mouse support
- **File API**: For image upload and drag-and-drop
- **SVG**: For vector output generation

### Algorithms

- **Edge Detection**: Custom implementation using pixel analysis
- **Contour Tracing**: Follows edges to create vector paths
- **Douglas-Peucker**: Path simplification algorithm
- **Pressure Mapping**: Pen pressure affects stroke width

### Browser Compatibility

- Chrome 88+
- Edge 88+
- Any Chromium-based browser with Manifest V3 support

## File Structure

```
chrome_extensions/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI
├── popup.css             # Styling
├── popup.js              # Core functionality
├── lib/
│   └── potrace.js        # Tracing library stub
├── icons/
│   ├── icon16.png        # 16x16 icon
│   ├── icon48.png        # 48x48 icon
│   ├── icon128.png       # 128x128 icon
│   ├── icon.svg          # Source SVG icon
│   ├── generate-icons.js # Icon generator script
│   └── generate-pngs.html# Browser-based icon generator
└── README.md             # This file
```

## SVG Output

All SVG files are generated with:
- XML declaration
- Proper viewBox for scaling
- White background
- Clean, optimized paths
- No external dependencies

### Drawing SVG
- Stores each stroke as a separate path
- Preserves color and width information
- Smooth curves with rounded caps/joins

### Text SVG
- Uses standard SVG `<text>` elements
- Embedded font information
- Multi-line support with proper spacing

### Traced SVG
- Converts pixels to vector paths
- Closed paths filled with black
- Simplified for smaller file sizes

## Privacy

This extension:
- ✅ Runs completely offline
- ✅ Does not collect any data
- ✅ Does not require internet connection
- ✅ Does not track usage
- ✅ Does not access external websites
- ✅ All processing happens locally in your browser

## Future Enhancements

Potential features for future versions:
- [ ] More drawing tools (shapes, lines, eraser)
- [ ] Layer support
- [ ] Undo/redo functionality
- [ ] Color palette saving
- [ ] Advanced image filters
- [ ] Batch processing
- [ ] Cloud save integration
- [ ] Export to other formats (PNG, PDF)

## Troubleshooting

### Pen tablet not working
- Ensure your tablet drivers are installed
- Check that Chrome has permission to access the device
- Try restarting the browser

### Image tracing quality is poor
- Adjust the threshold slider
- Use higher resolution images
- Try images with better contrast
- Simplify the image before uploading

### Download not working
- Check your browser's download settings
- Ensure pop-ups are allowed for the extension
- Try a different browser if issues persist

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is provided as-is for educational and commercial use.

## Credits

- SVG specification: W3C
- Icon design: Custom SVG illustration
- Algorithms: Douglas-Peucker (path simplification), Custom edge detection

## Support

For issues, questions, or feature requests, please open an issue on the repository.

---

**Enjoy creating beautiful SVG graphics!** 🎨
