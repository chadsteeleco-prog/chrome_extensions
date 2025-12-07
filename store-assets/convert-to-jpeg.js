/**
 * Automated HTML to JPEG Converter for Chrome Web Store Assets
 *
 * Requirements:
 *   npm install puppeteer
 *
 * Usage:
 *   node convert-to-jpeg.js
 *
 * This script will generate all required JPEG files from HTML templates.
 */

const fs = require('fs');
const path = require('path');

// Check if puppeteer is installed
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (error) {
  console.log('\n❌ Puppeteer is not installed.');
  console.log('\nTo install puppeteer, run:');
  console.log('  npm install puppeteer\n');
  console.log('Or use one of the manual methods described in README.md\n');
  process.exit(1);
}

const files = [
  {
    input: 'screenshot1-draw.html',
    output: 'screenshot1-draw.jpg',
    width: 1280,
    height: 800
  },
  {
    input: 'screenshot2-text.html',
    output: 'screenshot2-text.jpg',
    width: 1280,
    height: 800
  },
  {
    input: 'screenshot3-trace.html',
    output: 'screenshot3-trace.jpg',
    width: 1280,
    height: 800
  },
  {
    input: 'small-promo-tile.html',
    output: 'small-promo-tile.jpg',
    width: 440,
    height: 280
  },
  {
    input: 'marquee-promo-tile.html',
    output: 'marquee-promo-tile.jpg',
    width: 1400,
    height: 560
  }
];

async function convertToJpeg(file) {
  console.log(`Converting ${file.input}...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport to exact dimensions
  await page.setViewport({
    width: file.width,
    height: file.height,
    deviceScaleFactor: 1
  });

  // Load HTML file
  const htmlPath = `file://${path.resolve(__dirname, file.input)}`;
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // Take screenshot as JPEG
  await page.screenshot({
    path: file.output,
    type: 'jpeg',
    quality: 90,
    fullPage: false
  });

  await browser.close();

  console.log(`✅ Created ${file.output} (${file.width}x${file.height})`);
}

async function main() {
  console.log('\n🎨 Converting HTML files to JPEG...\n');

  for (const file of files) {
    try {
      await convertToJpeg(file);
    } catch (error) {
      console.error(`❌ Error converting ${file.input}:`, error.message);
    }
  }

  console.log('\n✅ All conversions complete!');
  console.log('\nGenerated files:');
  files.forEach(f => console.log(`  - ${f.output}`));
  console.log('\nYou can now upload these JPEG files to the Chrome Web Store.\n');
}

main().catch(console.error);
