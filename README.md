# Autodarts Helper Extension

A Chrome/Edge extension that automatically clicks the "Good darts! 🎯" button on autodarts.io matches.

## Features

- Automatically detects when you're on an autodarts.io matches page
- Finds and clicks the chat button to open the chat panel
- Automatically clicks the "Good darts! 🎯" button in the chat
- Works with URL changes in single-page application

## Installation

### Developer Mode

1. Clone or download this repository
2. Open Chrome/Edge and navigate to `chrome://extensions` or `edge://extensions`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension is now installed and will automatically work when you visit autodarts.io matches

### Chrome Web Store

(Coming soon)

## How It Works

This extension uses content scripts to:
1. Detect when you navigate to a URL matching `https://play.autodarts.io/matches/*`
2. Find and click the chat button on the match page
3. Automatically click the "Good darts! 🎯" button in the chat panel

No configuration needed! Just install and play.

## Development

This extension uses:
- Manifest V3
- Modern JavaScript (ES6+)
- Chrome Extension APIs (tabs, runtime)

### Files Overview

- `manifest.json` - Extension configuration
- `background.js` - Service worker background script
- `popup.html` - Popup UI
- `popup.js` - Popup functionality
- `content.js` - Content script for page interaction
- `styles.css` - Styling for the popup UI

## License

MIT 