const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, caption) {
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

function attachCardListeners() {
  const cards = gallery.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      openLightbox(card.dataset.src, card.dataset.name);
    });
  });
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Load manifest generated at build time
fetch('assets.json')
  .then((r) => r.json())
  .then((files) => {
    files.forEach((file) => {
      const url = `assets/${encodeURIComponent(file)}`;
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.name = file;
      card.dataset.src = url;

      const top = document.createElement('div');
      top.className = 'card-top';
      card.appendChild(top);

      const img = document.createElement('img');
      img.src = url;
      img.alt = file;
      card.appendChild(img);

      gallery.appendChild(card);
    });
    attachCardListeners();
  })
  .catch(() => {
    // If manifest missing, fail silently; site may have hardcoded items
    attachCardListeners();
  });
