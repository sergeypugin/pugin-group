document.addEventListener('DOMContentLoaded', () => {

  const themeInput = document.getElementById('theme-toggle-input');
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // 1. АВТО-ОПРЕДЕЛЕНИЕ ТЕМЫ ИЗ ОС ИЛИ LOCALSTORAGE
  const savedTheme = localStorage.getItem('theme');
  let currentTheme = savedTheme ? savedTheme : (mediaQuery.matches ? 'dark' : 'light');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeInput.checked = (theme === 'dark');
  }

  applyTheme(currentTheme);

  // Переключение кнопкой
  themeInput.addEventListener('change', () => {
    const newTheme = themeInput.checked ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // Отслеживание изменения темы в ОС на лету
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 2. FAQ АККОРДЕОН
  const faqHeaders = document.querySelectorAll('.faq__header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq__item').forEach(el => el.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });

  // 3. КНОПКА "НАВЕРХ" (afraid-falcon-17)
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