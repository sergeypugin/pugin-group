document.addEventListener('DOMContentLoaded', () => {

  // 1. Автоматическое управление переключателем темы
  const initThemeManager = () => {
    const checkbox = document.getElementById('theme-toggle-checkbox');
    const savedTheme = localStorage.getItem('theme-preference');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Определяем тему: из памяти или из настроек ОС
    let isDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;

    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

    if (checkbox) {
      checkbox.checked = !isDark;
      checkbox.addEventListener('change', (e) => {
        const newDark = !e.target.checked;
        document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
        localStorage.setItem('theme-preference', newDark ? 'dark' : 'light');
      });
    }
  };

  // 2. Автоматическое добавление тегов и загрузка компонентов
  const loadComponent = (id, path, position = 'beforeend') => {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      if (position === 'afterbegin') {
        document.body.prepend(el);
      } else {
        document.body.appendChild(el);
      }
    }

    fetch(path)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;
        if (id === 'header-placeholder') {
          initThemeManager();
        }
      })
      .catch(err => console.error('Ошибка загрузки ' + path, err));
  };

  loadComponent('header-placeholder', 'components/header.html', 'afterbegin');
  loadComponent('footer-placeholder', 'components/footer.html', 'beforeend');
  loadComponent('back-to-top-placeholder', 'components/back-to-top.html', 'beforeend');
  loadComponent('cookie-placeholder', 'components/cookie-banner.html', 'beforeend');

  // 3. FAQ
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

  // 4. Кнопка возврата наверх
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

//setTimeout(() => {
//  if (!localStorage.getItem('cookieAccepted')) {
//    const cookieBanner = document.getElementById('cookie-banner');
//    if (cookieBanner) cookieBanner.style.display = 'flex';
//  }
//}, 500);
//
//document.addEventListener('click', (e) => {
//  if (e.target && e.target.id === 'accept-cookies-btn') {
//    localStorage.setItem('cookieAccepted', 'true');
//    const cookieBanner = document.getElementById('cookie-banner');
//    if (cookieBanner) cookieBanner.style.display = 'none';
//  }
//});