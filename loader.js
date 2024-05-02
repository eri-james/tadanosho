document.addEventListener("DOMContentLoaded", function() {
    // Show loader overlay
    const loaderOverlay = document.getElementById('loaderOverlay');
    loaderOverlay.style.opacity = '1';
  
    // Wait for 5 seconds before fading out loader overlay
    setTimeout(function() {
      loaderOverlay.style.opacity = '0';
      setTimeout(function() {
        loaderOverlay.style.display = 'none';
      }, 2000); // Fade out duration
    }, 5000); // Wait duration
  });
  