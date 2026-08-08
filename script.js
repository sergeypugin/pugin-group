document.addEventListener('DOMContentLoaded', () => {

  // 1. Авто-загрузка компонент (хедер, футер, кнопка неверх)
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
  loadComponent('back-to-top-placeholder', 'components/back-to-top.html');

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  });

});