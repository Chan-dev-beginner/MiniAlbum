const gallery = document.getElementById('gallery');
const emptyState = document.getElementById('emptyState');
const photoInput = document.getElementById('photoInput');
const uploadForm = document.getElementById('uploadForm');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function updateEmptyState() {
  if (!emptyState) return;
  emptyState.style.display = gallery.querySelectorAll('.card').length === 0 ? 'block' : 'none';
}

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

function uploadFiles(files) {
  const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
  if (!imageFiles.length) {
    return;
  }

  const formData = new FormData();
  imageFiles.forEach((file) => formData.append('photos[]', file));

  fetch(window.location.href, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      window.location.reload();
    })
    .catch(() => {
      alert('Unable to upload images. Please try again.');
    });
}

photoInput.addEventListener('change', (event) => {
  uploadFiles(event.target.files);
  photoInput.value = '';
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
  uploadForm.addEventListener(eventName, (event) => event.preventDefault());
});

['dragenter', 'dragover'].forEach((eventName) => {
  uploadForm.addEventListener(eventName, () => uploadForm.classList.add('is-dragover'));
});

['dragleave', 'drop'].forEach((eventName) => {
  uploadForm.addEventListener(eventName, () => uploadForm.classList.remove('is-dragover'));
});

uploadForm.addEventListener('drop', (event) => {
  if (event.dataTransfer?.files) {
    uploadFiles(event.dataTransfer.files);
  }
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

attachCardListeners();
updateEmptyState();
