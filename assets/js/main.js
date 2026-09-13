import { initMetrika } from './modules/metrika.js';
import { initThemeManager } from './modules/theme.js';
import { initFaq } from './modules/faq.js';
import { initBackToTop } from './modules/back-to-top.js';
import { loadComponents } from './modules/components-loader.js';

// Инициализируем аналитику и базовые интерактивные элементы
initMetrika();
initFaq();
initBackToTop();

// Подгружаем компоненты и включаем переключатель темы (временно, до Этапа 2)
loadComponents(() => {
  initThemeManager();
});

// Умная ленивая загрузка: если мы находимся на странице карточки организации
if (document.getElementById('company-card-body')) {
  import('./modules/company-card.js').then((module) => {
    module.initCompanyCard();
  });
}
