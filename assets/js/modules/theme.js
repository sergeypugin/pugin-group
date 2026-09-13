export function initThemeManager() {
  const checkbox = document.getElementById('theme-toggle-checkbox');
  const savedTheme = localStorage.getItem('theme-preference');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

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
}
