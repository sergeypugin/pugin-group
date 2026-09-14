export function initFaq() {
  document.addEventListener('click', (e) => {
    // 1. Аккордеон вопросов FAQ
    const header = e.target.closest('.faq__header');
    if (header) {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq__item').forEach((el) => el.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
      return;
    }

    // 2. Табы переключения ролей в prosv-faq.html
    const tab = e.target.closest('.role-tab');
    if (tab) {
      const targetId = tab.dataset.target;
      if (!targetId) return;

      document.querySelectorAll('.role-tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.role-section').forEach((s) => s.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(targetId)?.classList.add('active');
    }
  });
}
