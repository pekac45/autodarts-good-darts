// background.js - Service Worker for Manifest V3
// Minimal background script for Autodarts Helper extension

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Autodarts Helper extension installed');
});

// We don't need message handling for the simplified extension 