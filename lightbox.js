// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.lightboxImage');
const closeLightbox = function() {
  lightbox.style.display = 'none';
};

document.querySelectorAll('.raceImage').forEach(image => {
  image.addEventListener('click', function() {
    lightboxImage.src = this.src;
    lightbox.style.display = 'flex';
  });
});

lightbox.addEventListener('click', closeLightbox);
lightboxImage.addEventListener('click', function(event) {
  event.stopPropagation();
});
