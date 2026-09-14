export function initThemeManager() {
  const checkbox = document.getElementById('theme-toggle-checkbox');
  if (!checkbox) return;

  const syncCheckbox = (isDark) => {
    checkbox.checked = !isDark;
  };

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const isDark = currentTheme === 'dark';

  syncCheckbox(isDark);

  checkbox.addEventListener('change', (e) => {
    const newDark = !e.target.checked;
    const themeName = newDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeName);
    try {
      localStorage.setItem('theme-preference', themeName);
    } catch (err) { }
  });

  // Слушаем изменение системной темы (Windows/macOS/PowerToys)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Переключаем автоматически только если пользователь не установил тему вручную
    if (!localStorage.getItem('theme-preference')) {
      const newDark = e.matches;
      const themeName = newDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', themeName);
      syncCheckbox(newDark);
    }
  });
}
