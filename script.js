document.addEventListener('DOMContentLoaded', () => {

  // 1. Авто-загрузка единой шапки и футера
  const loadComponent = (id, path) => {
    const el = document.getElementById(id);
    if (el) {
      fetch(path)
        .then(res => res.text())
        .then(html => { el.innerHTML = html; })
        .catch(err => console.error('Ошибка загрузки ' + path, err));
    }
  };

  loadComponent('header-placeholder', 'components/header.html');
  loadComponent('footer-placeholder', 'components/footer.html');

  // 2. FAQ
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.faq__header');
    if (!header) return;

    const item = header.parentElement;
    const isOpen = item.classList.contains('active');

    document.querySelectorAll('.faq__item').forEach(el => el.classList.remove('active'));

    if (!isOpen) {
      item.classList.add('active');
    }
  });

  // Кнопка возврата наверх
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});