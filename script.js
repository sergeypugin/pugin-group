document.addEventListener('DOMContentLoaded', () => {

  // 1. ПЕРЕКЛЮЧАТЕЛЬ ТЕМ UIVERSE (ПО МАКЕТУ СКРИНШОТОВ)
  const themeInput = document.getElementById('theme-toggle-input');

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeInput.checked = (savedTheme === 'dark');

  themeInput.addEventListener('change', () => {
    const newTheme = themeInput.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // 2. FAQ АККОРДЕОН (ALUMNI.ITMO - МИНИМАЛИЗМ)
  const faqHeaders = document.querySelectorAll('.alumni-faq__header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.alumni-faq__item').forEach(el => el.classList.remove('active'));
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