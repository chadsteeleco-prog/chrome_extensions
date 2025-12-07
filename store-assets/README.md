# Chrome Web Store Assets

This folder contains promotional graphics for the Chrome Web Store listing.

## Files Included

### Screenshots (1280x800 JPEG)
- `screenshot1-draw.html` - Drawing mode demonstration
- `screenshot2-text.html` - Text to SVG mode
- `screenshot3-trace.html` - Image tracing mode

### Promotional Tiles
- `small-promo-tile.html` - Small promo tile (440x280 JPEG)
- `marquee-promo-tile.html` - Marquee promo tile (1400x560 JPEG)

## How to Convert HTML to JPEG

### Method 1: Using Browser Screenshot (Easiest)

1. Open each HTML file in Chrome/Edge
2. Press `F12` to open DevTools
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "screenshot" and select "Capture screenshot"
5. The image will be saved as PNG
6. Convert PNG to JPEG using any image editor or online tool

### Method 2: Using Chrome DevTools (Precise)

1. Open each HTML file in Chrome
2. Press `F12` to open DevTools
3. Press `Ctrl+Shift+M` to toggle device toolbar
4. Set custom dimensions:
   - Screenshots: 1280 x 800
   - Small promo: 440 x 280
   - Marquee: 1400 x 560
5. Press `Ctrl+Shift+P` and select "Capture screenshot"
6. Convert to JPEG if needed

### Method 3: Using Node.js Script (Automated)

Run the included conversion script:

```bash
node convert-to-jpeg.js
```

This will automatically generate all required JPEG files.

### Method 4: Using Online Tools

1. Open each HTML file in your browser
2. Use a screenshot extension like:
   - Awesome Screenshot
   - GoFullPage
   - Nimbus Screenshot
3. Capture at exact dimensions
4. Save as JPEG

## File Specifications

### Screenshots
- **Dimensions**: 1280 x 800 pixels
- **Format**: JPEG
- **Purpose**: Show extension features in the Chrome Web Store
- **Quantity**: Up to 5 screenshots allowed

### Small Promo Tile
- **Dimensions**: 440 x 280 pixels
- **Format**: JPEG
- **Purpose**: Small promotional tile in Chrome Web Store

### Marquee Promo Tile
- **Dimensions**: 1400 x 560 pixels
- **Format**: JPEG
- **Purpose**: Large banner in Chrome Web Store featured section

## Quality Guidelines

- Use 80-90% JPEG quality for optimal file size
- Ensure text is readable
- Keep file sizes under 2MB each
- Use consistent branding across all images

## Notes

- All HTML files are self-contained with inline CSS
- Colors and styling match the extension's brand
- Files are optimized for conversion to JPEG
- No external dependencies required
