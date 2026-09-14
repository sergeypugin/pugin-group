export function initBackToTop() {
  window.addEventListener('scroll', () => {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#back-to-top');
    if (btn) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  });
}
