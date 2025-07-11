// Handle chunk loading errors globally
(function() {
  'use strict';
  
  // Track reload attempts to prevent infinite loops
  var reloadAttempts = 0;
  var MAX_RELOAD_ATTEMPTS = 3;
  
  // Listen for unhandled promise rejections (chunk loading errors)
  window.addEventListener('unhandledrejection', function(event) {
    var error = event.reason;
    
    // Check if it's a chunk loading error
    if (error && (
      error.name === 'ChunkLoadError' ||
      (error.message && error.message.includes('Loading chunk')) ||
      (error.message && error.message.includes('Loading CSS chunk'))
    )) {
      console.warn('Chunk loading error detected:', error);
      
      // Prevent the error from being logged to console
      event.preventDefault();
      
      // Attempt to reload if we haven't exceeded max attempts
      if (reloadAttempts < MAX_RELOAD_ATTEMPTS) {
        reloadAttempts++;
        console.log(`Attempting to reload (attempt ${reloadAttempts}/${MAX_RELOAD_ATTEMPTS})`);
        
        // Clear any cached chunks and reload
        if ('caches' in window) {
          caches.keys().then(function(names) {
            names.forEach(function(name) {
              if (name.includes('webpack') || name.includes('chunk')) {
                caches.delete(name);
              }
            });
          }).finally(function() {
            window.location.reload();
          });
        } else {
          window.location.reload();
        }
      } else {
        console.error('Max reload attempts reached. Please refresh manually.');
        // Show user-friendly error message
        showChunkErrorMessage();
      }
    }
  });
  
  // Listen for regular errors too
  window.addEventListener('error', function(event) {
    var error = event.error;
    
    if (error && (
      error.name === 'ChunkLoadError' ||
      (error.message && error.message.includes('Loading chunk'))
    )) {
      console.warn('Chunk loading error detected in error handler:', error);
      event.preventDefault();
      
      if (reloadAttempts < MAX_RELOAD_ATTEMPTS) {
        reloadAttempts++;
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      }
    }
  });
  
  function showChunkErrorMessage() {
    // Create error overlay
    var overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    var message = document.createElement('div');
    message.style.cssText = `
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      max-width: 400px;
      margin: 1rem;
    `;
    
    message.innerHTML = `
      <h2 style="margin: 0 0 1rem 0; color: #dc2626;">Loading Error</h2>
      <p style="margin: 0 0 1.5rem 0; color: #6b7280;">
        There was an issue loading the application. Please refresh the page to continue.
      </p>
      <button onclick="window.location.reload()" style="
        background: #2563eb;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
      ">
        Refresh Page
      </button>
    `;
    
    overlay.appendChild(message);
    document.body.appendChild(overlay);
  }
})();