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
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed',
        'data-new-gr-c-s-loaded',
        'spellcheck',
        'data-gramm',
        'data-gramm_editor',
        'data-enable-grammarly'
      ];
      
      extensionAttributes.forEach(attr => {
        if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
      });
      
      // Remove any attributes that look like extension IDs
      Array.from(body.attributes).forEach(attr => {
        if (attr.name.includes('__processed_') || 
            attr.name.includes('data-') && attr.name.length > 20) {
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