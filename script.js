const cards = document.querySelectorAll('.animate-card');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

function updateCardMotion(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  const rotateX = y * 12;
  const rotateY = x * 12;

  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function resetCardMotion(event) {
  const card = event.currentTarget;
  card.style.transform = '';
}

cards.forEach((card) => {
  revealObserver.observe(card);
  card.addEventListener('pointermove', updateCardMotion);
  card.addEventListener('pointerleave', resetCardMotion);
  card.addEventListener('pointercancel', resetCardMotion);
});

window.addEventListener('mousemove', (event) => {
  document.documentElement.style.setProperty(
    '--pointer-x', `${(event.clientX / window.innerWidth) * 100}%`
  );
  document.documentElement.style.setProperty(
    '--pointer-y', `${(event.clientY / window.innerHeight) * 100}%`
  );
});
