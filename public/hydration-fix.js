// Prevent browser extensions from interfering with hydration
(function() {
  'use strict';
  
  // Remove problematic attributes that browser extensions add
  function cleanupExtensionAttributes() {
    const body = document.body;
    if (body) {
      // Remove Grammarly attributes
      body.removeAttribute('data-new-gr-c-s-check-loaded');
      body.removeAttribute('data-gr-ext-installed');
      
      // Remove other common extension attributes
      const extensionAttributes = [
      // Remove common extension and third-party service attributes
      const problematicAttributes = [
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
      });
    }
  }
  
  // Run cleanup before React hydration
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanupExtensionAttributes);
  } else {
    cleanupExtensionAttributes();
  }
  
  // Also run cleanup periodically to catch late-loading extensions
  let cleanupCount = 0;
  const maxCleanups = 5;
  
  const intervalId = setInterval(() => {
    cleanupExtensionAttributes();
    cleanupCount++;
    
    if (cleanupCount >= maxCleanups) {
      clearInterval(intervalId);
    }
  }, 100);
  
  // Stop cleanup after 2 seconds
  setTimeout(() => {
    clearInterval(intervalId);
  }, 2000);
})();