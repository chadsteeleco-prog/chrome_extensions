// Tab Management
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.dataset.tab;

    // Remove active class from all tabs
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to selected tab
    button.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

// ===========================
// DRAWING CANVAS FUNCTIONALITY
// ===========================

const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const strokeWidthInput = document.getElementById('strokeWidth');
const strokeWidthValue = document.getElementById('strokeWidthValue');
const strokeColorInput = document.getElementById('strokeColor');
const clearCanvasBtn = document.getElementById('clearCanvas');
const downloadDrawingBtn = document.getElementById('downloadDrawing');

let isDrawing = false;
let paths = [];
let currentPath = [];

// Initialize canvas
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Update stroke width display
strokeWidthInput.addEventListener('input', (e) => {
  strokeWidthValue.textContent = e.target.value;
});

// Get pointer position (works for both mouse and pen)
function getPointerPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    pressure: e.pressure || 0.5
  };
}

// Start drawing
canvas.addEventListener('pointerdown', (e) => {
  isDrawing = true;
  const pos = getPointerPos(e);
  currentPath = [{
    x: pos.x,
    y: pos.y,
    pressure: pos.pressure,
    color: strokeColorInput.value,
    width: parseInt(strokeWidthInput.value)
  }];

  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
});

// Draw
canvas.addEventListener('pointermove', (e) => {
  if (!isDrawing) return;

  const pos = getPointerPos(e);
  currentPath.push({
    x: pos.x,
    y: pos.y,
    pressure: pos.pressure,
    color: strokeColorInput.value,
    width: parseInt(strokeWidthInput.value)
  });

  ctx.strokeStyle = strokeColorInput.value;
  ctx.lineWidth = parseInt(strokeWidthInput.value) * pos.pressure;
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
});

// Stop drawing
canvas.addEventListener('pointerup', () => {
  if (isDrawing && currentPath.length > 0) {
    paths.push([...currentPath]);
    currentPath = [];
  }
  isDrawing = false;
});

canvas.addEventListener('pointerleave', () => {
  if (isDrawing && currentPath.length > 0) {
    paths.push([...currentPath]);
    currentPath = [];
  }
  isDrawing = false;
});

// Clear canvas
clearCanvasBtn.addEventListener('click', () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  paths = [];
  currentPath = [];
});

// Convert paths to SVG and download
downloadDrawingBtn.addEventListener('click', () => {
  if (paths.length === 0) {
    alert('Please draw something first!');
    return;
  }

  let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
`;

  paths.forEach(path => {
    if (path.length < 2) return;

    const color = path[0].color;
    const width = path[0].width;

    let pathData = `M ${path[0].x} ${path[0].y}`;

    for (let i = 1; i < path.length; i++) {
      pathData += ` L ${path[i].x} ${path[i].y}`;
    }

    svgContent += `  <path d="${pathData}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>\n`;
  });

  svgContent += '</svg>';

  downloadSVG(svgContent, 'drawing.svg');
});

// ===========================
// TEXT TO SVG FUNCTIONALITY
// ===========================

const textInput = document.getElementById('textInput');
const fontFamily = document.getElementById('fontFamily');
const fontSize = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const textColor = document.getElementById('textColor');
const previewTextBtn = document.getElementById('previewText');
const downloadTextBtn = document.getElementById('downloadText');
const textPreview = document.getElementById('textPreview');

let currentTextSVG = null;

// Update font size display
fontSize.addEventListener('input', (e) => {
  fontSizeValue.textContent = e.target.value;
  if (textInput.value) {
    updateTextPreview();
  }
});

// Update preview on input
textInput.addEventListener('input', updateTextPreview);
fontFamily.addEventListener('change', updateTextPreview);
textColor.addEventListener('input', updateTextPreview);

function updateTextPreview() {
  const text = textInput.value;
  if (!text) {
    textPreview.innerHTML = '<em style="color: #999;">Preview will appear here</em>';
    return;
  }

  textPreview.style.fontFamily = fontFamily.value;
  textPreview.style.fontSize = fontSize.value + 'px';
  textPreview.style.color = textColor.value;
  textPreview.textContent = text;
}

previewTextBtn.addEventListener('click', updateTextPreview);

downloadTextBtn.addEventListener('click', () => {
  const text = textInput.value;
  if (!text) {
    alert('Please enter some text first!');
    return;
  }

  const font = fontFamily.value;
  const size = parseInt(fontSize.value);
  const color = textColor.value;

  // Create temporary canvas to measure text
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.font = `${size}px "${font}"`;

  const lines = text.split('\n');
  const lineHeight = size * 1.2;
  let maxWidth = 0;

  lines.forEach(line => {
    const metrics = tempCtx.measureText(line);
    maxWidth = Math.max(maxWidth, metrics.width);
  });

  const width = Math.ceil(maxWidth) + 40;
  const height = Math.ceil(lines.length * lineHeight) + 40;

  let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
`;

  lines.forEach((line, index) => {
    const y = 20 + (index + 1) * lineHeight;
    svgContent += `  <text x="20" y="${y}" font-family="${font}" font-size="${size}" fill="${color}">${escapeXml(line)}</text>\n`;
  });

  svgContent += '</svg>';

  downloadSVG(svgContent, 'text.svg');
});

// ===========================
// IMAGE TRACING FUNCTIONALITY
// ===========================

const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const threshold = document.getElementById('threshold');
const thresholdValue = document.getElementById('thresholdValue');
const processImageBtn = document.getElementById('processImage');
const downloadTraceBtn = document.getElementById('downloadTrace');
const tracedPreview = document.getElementById('tracedPreview');
const svgPreview = document.getElementById('svgPreview');

let uploadedImage = null;
let tracedSVG = null;

// Update threshold display
threshold.addEventListener('input', (e) => {
  thresholdValue.textContent = e.target.value;
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleImageUpload(files[0]);
  }
});

// File input
imageInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleImageUpload(e.target.files[0]);
  }
});

function handleImageUpload(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file!');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      uploadedImage = img;
      displayImagePreview(img);
      uploadArea.classList.add('hidden');
      imagePreviewContainer.classList.remove('hidden');
      tracedPreview.classList.add('hidden');
      downloadTraceBtn.disabled = true;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function displayImagePreview(img) {
  const maxWidth = 600;
  const maxHeight = 400;
  let width = img.width;
  let height = img.height;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = width * ratio;
    height = height * ratio;
  }

  imagePreview.width = width;
  imagePreview.height = height;

  const ctx = imagePreview.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
}

processImageBtn.addEventListener('click', () => {
  if (!uploadedImage) {
    alert('Please upload an image first!');
    return;
  }

  const thresholdVal = parseInt(threshold.value);
  tracedSVG = traceImage(uploadedImage, thresholdVal);

  svgPreview.innerHTML = tracedSVG;
  tracedPreview.classList.remove('hidden');
  downloadTraceBtn.disabled = false;
});

downloadTraceBtn.addEventListener('click', () => {
  if (tracedSVG) {
    downloadSVG(tracedSVG, 'traced-image.svg');
  }
});

function traceImage(img, thresholdVal) {
  // Create canvas for processing
  const processCanvas = document.createElement('canvas');
  const processCtx = processCanvas.getContext('2d');

  processCanvas.width = img.width;
  processCanvas.height = img.height;

  // Draw image
  processCtx.drawImage(img, 0, 0);

  // Get image data
  const imageData = processCtx.getImageData(0, 0, processCanvas.width, processCanvas.height);
  const data = imageData.data;

  // Convert to black and white
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Calculate grayscale
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;

    // Apply threshold
    const bw = gray > thresholdVal ? 255 : 0;

    data[i] = data[i + 1] = data[i + 2] = bw;
  }

  processCtx.putImageData(imageData, 0, 0);

  // Simple edge detection and path tracing
  const paths = detectEdges(imageData);

  // Generate SVG
  let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${processCanvas.width}" height="${processCanvas.height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${processCanvas.width} ${processCanvas.height}">
  <rect width="100%" height="100%" fill="white"/>
`;

  paths.forEach(path => {
    if (path.length > 2) {
      let pathData = `M ${path[0].x} ${path[0].y}`;
      for (let i = 1; i < path.length; i++) {
        pathData += ` L ${path[i].x} ${path[i].y}`;
      }
      pathData += ' Z';
      svgContent += `  <path d="${pathData}" fill="black"/>\n`;
    }
  });

  svgContent += '</svg>';

  return svgContent;
}

function detectEdges(imageData) {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const paths = [];

  // Create a grid to track black pixels
  const grid = [];
  for (let y = 0; y < height; y++) {
    grid[y] = [];
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      grid[y][x] = data[idx] === 0 ? 1 : 0; // 1 for black, 0 for white
    }
  }

  // Find contours using marching squares algorithm (simplified)
  const visited = Array(height).fill().map(() => Array(width).fill(false));

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (grid[y][x] === 1 && !visited[y][x]) {
        const contour = traceContour(grid, visited, x, y, width, height);
        if (contour.length > 10) { // Only keep significant contours
          paths.push(simplifyPath(contour, 2)); // Simplify path
        }
      }
    }
  }

  return paths;
}

function traceContour(grid, visited, startX, startY, width, height) {
  const contour = [];
  const directions = [
    {dx: 1, dy: 0},
    {dx: 1, dy: 1},
    {dx: 0, dy: 1},
    {dx: -1, dy: 1},
    {dx: -1, dy: 0},
    {dx: -1, dy: -1},
    {dx: 0, dy: -1},
    {dx: 1, dy: -1}
  ];

  let x = startX;
  let y = startY;
  let steps = 0;
  const maxSteps = width * height; // Prevent infinite loops

  do {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      contour.push({x, y});
      visited[y][x] = true;
    }

    // Find next black pixel
    let found = false;
    for (let dir of directions) {
      const nx = x + dir.dx;
      const ny = y + dir.dy;

      if (nx >= 0 && nx < width && ny >= 0 && ny < height &&
          grid[ny][nx] === 1 && !visited[ny][nx]) {
        x = nx;
        y = ny;
        found = true;
        break;
      }
    }

    if (!found) break;
    steps++;

  } while ((x !== startX || y !== startY) && steps < maxSteps);

  return contour;
}

function simplifyPath(points, tolerance) {
  if (points.length <= 2) return points;

  // Douglas-Peucker algorithm for path simplification
  let maxDistance = 0;
  let index = 0;
  const end = points.length - 1;

  for (let i = 1; i < end; i++) {
    const distance = perpendicularDistance(points[i], points[0], points[end]);
    if (distance > maxDistance) {
      maxDistance = distance;
      index = i;
    }
  }

  if (maxDistance > tolerance) {
    const left = simplifyPath(points.slice(0, index + 1), tolerance);
    const right = simplifyPath(points.slice(index), tolerance);
    return left.slice(0, -1).concat(right);
  } else {
    return [points[0], points[end]];
  }
}

function perpendicularDistance(point, lineStart, lineEnd) {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;

  const numerator = Math.abs(dy * point.x - dx * point.y + lineEnd.x * lineStart.y - lineEnd.y * lineStart.x);
  const denominator = Math.sqrt(dx * dx + dy * dy);

  return denominator === 0 ? 0 : numerator / denominator;
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

function downloadSVG(svgContent, filename) {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}
