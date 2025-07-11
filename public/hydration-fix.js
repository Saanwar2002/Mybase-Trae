// Prevent browser extensions from interfering with hydration
(function() {
  'use strict';
  
  // Remove problematic attributes that browser extensions add
  function cleanupExtensionAttributes() {
    var body = document.body;
    if (body) {
      // Remove Grammarly attributes
      body.removeAttribute('data-new-gr-c-s-check-loaded');
      body.removeAttribute('data-gr-ext-installed');
      
      // Remove other common extension attributes
      // Remove common extension and third-party service attributes
      var problematicAttributes = [
        // Grammarly
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed',
        'data-new-gr-c-s-loaded',
        'data-gramm',
        'data-gramm_editor',
        'data-enable-grammarly',
        // Clerk (if any remnants exist)
        'data-clerk-hydrated',
        'data-clerk-publishable-key',
        // Other common problematic attributes
        'spellcheck',
        'data-ms-editor',
        'data-lt-installed'
      ];
      
      problematicAttributes.forEach(attr => {
          body.removeAttribute(attr.name);
        }
      );
    }
  }
  
  // Run cleanup before React hydration
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanupExtensionAttributes);
  } else {
    cleanupExtensionAttributes();
  }
  
  // Also run cleanup periodically to catch late-loading extensions
  var cleanupCount = 0;
  var maxCleanups = 5;
  
  var intervalId = setInterval(function() {
    cleanupExtensionAttributes();
    cleanupCount++;
    
    if (cleanupCount >= maxCleanups) {
      clearInterval(intervalId);
    }
  }, 100);
  
  // Stop cleanup after 2 seconds
  setTimeout(function() {
    clearInterval(intervalId);
  }, 2000);
})();