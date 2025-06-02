// content.js - Autodarts Helper
// This script automatically clicks the "Good darts! 🎯" button on autodarts.io matches
// I only vibe coded this but it looks like it works

// In-memory variable to store the last game id for which 'Good darts!' was sent
let lastGoodDartsGameId = null;

// Helper to extract game id from URL
function getGameIdFromUrl(url) {
  // Example: https://play.autodarts.io/matches/1234-123-123-1234-123123123
  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split('/');
    // parts: ['', 'matches', 'GAME_ID', ...]
    if (parts[1] === 'matches' && parts[2]) {
      return parts[2];
    }
    return null;
  } catch (e) {
    return null;
  }
}

// Check if URL matches autodarts matches pattern
function checkAndProcessAutodarts() {
  const currentUrl = window.location.href;
  let parsedUrl;
  try {
    parsedUrl = new URL(currentUrl);
  } catch (e) {
    console.log('Invalid URL:', currentUrl);
    return;
  }
  if (parsedUrl.hostname === 'play.autodarts.io' && parsedUrl.pathname.startsWith('/matches/')) {
    const gameId = getGameIdFromUrl(parsedUrl.href);
    if (gameId && lastGoodDartsGameId !== gameId) {
      console.log("Detected autodarts matches page:", currentUrl);
      findChatButton(gameId);
    } else {
      console.log("Already sent 'Good darts!' for this game or game id not found.");
    }
  }
}

// Function to find the chat button
function findChatButton(gameId) {
  // Targeting the chat button using reliable attributes
  const targetElement = document.querySelector('button.chakra-button svg[viewBox="0 0 24 24"][height="20"][width="20"]');
  
  // If we found tthe SVG, get its parent button
  const buttonElement = targetElement ? targetElement.closest('button') : null;
  
  if (buttonElement) {
    console.log("Found chat button:", buttonElement);
    buttonElement.click();
    
    // After clicking the chat button, look for the "Good darts! 🎯" button
    setTimeout(() => findGoodDartsButton(gameId), 500);
  } else {
    console.log("Chat button not found. DOM might not be fully loaded.");
    // Retry after a delay
    setTimeout(() => findChatButton(gameId), 2000);
  }
}

// Function to find the "Good darts! 🎯" button
function findGoodDartsButton(gameId) {
  // Find all buttons with chakra-button class
  const buttons = document.querySelectorAll('button.chakra-button');
  
  // Look for the button with the exact text content
  let goodDartsButton = null;
  buttons.forEach(button => {
    if (button.textContent === 'Good darts! 🎯') {
      goodDartsButton = button;
    }
  });
  
  if (goodDartsButton) {
    console.log("Found Good darts button:", goodDartsButton);
    goodDartsButton.click();
    // Mark this game id as sent
    lastGoodDartsGameId = gameId;
  } else {
    console.log("Good darts button not found. Trying again...");
    // Retry after a short delay
    setTimeout(() => findGoodDartsButton(gameId), 1000);
  }
}

// Run the check when the page loads
checkAndProcessAutodarts();

// Monitor for URL changes (for SPA navigation)
let lastUrl = window.location.href;
const observer = new MutationObserver(() => {
  if (lastUrl !== window.location.href) {
    lastUrl = window.location.href;
    checkAndProcessAutodarts();
  }
});

observer.observe(document, { subtree: true, childList: true });


