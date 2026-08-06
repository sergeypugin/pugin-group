Понял тебя! Договорились: теперь мы **не переписываем проект с нуля**, а работаем точечно — я даю тебе конкретные блоки кода и объясняю, какую именно строчку в каком файле нужно заменить или добавить.

Ниже точные исправления по всем твоим 5 замечаниям.

---

### 🔨 Исправление №1: Полоса при отмотке страницы наверх (Overscroll)

**Проблема:** Когда пользователь прокручивает страницу выше самого верха (эффект резиновой прокрутки), из-под фиксированной шапки вылезает контрастная полоса.

**Что изменить в `style.css`:**
Найди в самом начале `style.css` тег `html` и добавь в него привязку фонового цвета, совпадающего с верхом страницы:

```css
/* --- ДОБАВИТЬ В STYLE.CSS В САМОЕ НАЧАЛО --- */
html {
  scroll-behavior: smooth;
  /* Цвет верхней области совпадает с фоном Hero-блока, чтобы при отмотке не вылезала полоса */
  background-color: var(--accent-indigo);
  overscroll-behavior-y: none; /* Запрещает разрыв верхней границы на MacOS и смартфонах */
}
```

---

### 🔨 Исправление №2: Возвращаем шумящие текстуры ИТМО + Индиго ретушь

**Проблема:** Пропали фирменные шумящие текстуры ИТМО (`noise_bg.webp`, `noise_bg_light.webp`, `noise_bg_2.webp`).

**Что изменить в `style.css`:**
1. Замени блок `.hero-indigo` в `style.css`, добавив смешивание слоёв (`background-blend-mode`):

```css
/* --- ЗАМЕНИТЬ БЛОК .hero-indigo В STYLE.CSS --- */
.hero-indigo {
  background-color: var(--accent-indigo);
  /* Накладываем полупрозрачный фиолетово-индиго слой поверх оригинального шума ИТМО */
  background-image: linear-gradient(rgba(99, 102, 241, 0.88), rgba(99, 102, 241, 0.88)), 
                    url('https://abit.itmo.ru/images/noise_bg.webp');
  background-repeat: repeat;
  color: #FFFFFF;
  padding: 80px 0 70px;
  text-align: center;
}
```

2. Обнови переменные фонов для Светлой и Тёмной темы в `:root` и `[data-theme="dark"]`:

```css
/* --- ЗАМЕНИТЬ В БЛОКАХ ПЕРЕМЕННЫХ В STYLE.CSS --- */
:root, [data-theme="light"] {
  --bg-page: #F4F5F7;
  --bg-page-noise: url('https://abit.itmo.ru/images/noise_bg_light.webp');
  --bg-card: #FFFFFF;
  --text-main: #111111;
  /* ... остальные переменные остаются ... */
}

[data-theme="dark"] {
  --bg-page: #202020;
  --bg-page-noise: url('https://abit.itmo.ru/images/noise_bg_2.webp');
  --bg-card: #1A1A1A;
  --text-main: #F8FAFC;
  /* ... остальные переменные остаются ... */
}

/* Применяем шумящую текстуру к телу страницы */
body, .main-body {
  background-color: var(--bg-page);
  background-image: var(--bg-page-noise);
  background-repeat: repeat;
}
```

---

### 🔨 Исправление №3: Текст Hero-блока и кнопка «Связаться» адаптируются под тему

**Проблема:** В тёмной теме текст и кнопка в Hero-блоке оставались зафиксированными и не меняли контраст.

**Что изменить в `style.css`:**
Замени стили кнопки `.button-cta` и заголовка `.hero__title`:

```css
/* --- ЗАМЕНИТЬ В STYLE.CSS --- */
.hero__title {
  font-size: 44px;
  font-weight: 800;
  max-width: 900px;
  margin: 0 auto 18px;
  line-height: 1.2;
  color: #FFFFFF; /* Заголовок на индиго-фоне всегда белый */
}

/* Адаптивная кнопка "Связаться" */
.button-cta {
  line-height: 1; text-decoration: none; display: inline-flex; border: none; cursor: pointer;
  align-items: center; gap: 0.75rem; 
  background-color: var(--accent-lime); 
  color: #0F172A;
  border-radius: 10rem; font-weight: 700; padding: 0.75rem 1.5rem; padding-left: 20px;
  white-space: nowrap; overflow: hidden; transition: all 0.3s; font-size: 14px;
}

[data-theme="dark"] .button-cta {
  background-color: #FFFFFF; /* В тёмной теме кнопка становится белоснежной для сверх-контраста */
  color: #0F172A;
}

.button-cta:hover {
  background-color: var(--accent-lime) !important;
  color: #0F172A !important;
  box-shadow: 0 0 15px rgba(221, 243, 101, 0.4);
}
```

В `index.html` в логотипе пропиши правильную разметку бренда:
```html
<!-- ИЗМЕНИТЬ В INDEX.HTML В ЛОГОТИПЕ -->
<a href="#" class="logo">
  <span class="brand-ip">ИП</span>
  <span class="brand-name">Евгений Пугин</span>
</a>
```

---

### 🔨 Исправление №4: Футер такого же цвета, как и фон FAQ выше

**Проблема:** Чёрная полоса футера создавала резкий разрыв после секции FAQ.

**Что изменить в `style.css`:**
Сделай так, чтобы футер наследовал цвет и шумящую текстуру основной страницы (`var(--bg-page)`):

```css
/* --- ЗАМЕНИТЬ БЛОК .footer В STYLE.CSS --- */
.footer {
  background-color: var(--bg-page);
  background-image: var(--bg-page-noise);
  color: var(--text-main);
  padding: 60px 0 30px;
  border-top: 1px solid var(--border-color);
}

.footer-heading {
  color: var(--text-main); /* Заголовки колонок становятся цвета основного текста */
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 16px;
}

.footer-links a {
  color: var(--text-muted);
}
.footer-links a:hover {
  color: var(--accent-indigo);
}
```

---

### 🔨 Исправление №5: 1 в 1 крестики/плюсики FAQ с `alumni.itmo.ru` (по твоим скришотам №1 и №2)

**Анализ твоего скриншота №1:** В закрытом состоянии там тонкий длинный `+`. При открытии вопрос подсвечивается, а справа появляется серый круглый значок (`#E0E0E0`) с жирным крестиком `✕`.

Вот точная реализация Tilda-аккордеона с `alumni.itmo.ru`:

**1. Изменения в `index.html` (в секции FAQ):**
Замени разметку кнопок вопросов в `index.html`:

```html
<!-- ЗАМЕНИТЬ ЭЛЕМЕНТЫ FAQ В INDEX.HTML -->
<div class="alumni-faq__item">
  <button class="alumni-faq__header">
    <span>Как оформить закупку учебной литературы или ПО по 44-ФЗ / 223-ФЗ?</span>
    <div class="alumni-faq__icon-wrapper">
      <span class="alumni-faq__symbol"></span>
    </div>
  </button>
  <div class="alumni-faq__body">
    Мы подготавливаем 3 независимых КП для обоснования НМЦК, формируем техническое задание и сопровождаем сделку до подписания актов в ЕИС.
  </div>
</div>
```

**2. Изменения в `style.css` (Стили иконок 1 в 1 как у ИТМО):**

```css
/* --- ЗАМЕНИТЬ СТИЛИ FAQ В STYLE.CSS --- */
.alumni-faq__item {
  border-bottom: 1px solid var(--border-color);
  padding: 22px 0;
}

.alumni-faq__header {
  width: 100%; background: none; border: none; text-align: left;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 20px; font-weight: 700; color: var(--text-main); cursor: pointer; gap: 20px;
}

/* Контейнер иконки */
.alumni-faq__icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent; /* В закрытом состоянии кружка нет */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease-in-out;
}

/* Тонкий крестик/плюсик */
.alumni-faq__symbol {
  position: relative;
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.alumni-faq__symbol::before,
.alumni-faq__symbol::after {
  content: "";
  position: absolute;
  background-color: var(--text-main);
  transition: transform 0.3s ease;
}

/* Горизонтальная линия плюса */
.alumni-faq__symbol::before {
  top: 7px; left: 0; width: 16px; height: 2px;
}

/* Вертикальная линия плюса */
.alumni-faq__symbol::after {
  top: 0; left: 7px; width: 2px; height: 16px;
}

/* СОСТОЯНИЕ ОТКРЫТОГО ВОПРОСА (СКРИНШОТ №1 С ALUMNI.ITMO) */
.alumni-faq__item.active .alumni-faq__icon-wrapper {
  background-color: rgba(0, 0, 0, 0.08); /* Появляется серый круг под крестиком */
}

[data-theme="dark"] .alumni-faq__item.active .alumni-faq__icon-wrapper {
  background-color: rgba(255, 255, 255, 0.15);
}

.alumni-faq__item.active .alumni-faq__symbol {
  transform: rotate(45deg); /* Поворачиваем плюс на 45 градусов — получается крестик ✕ */
}
```

---

Вноси эти правки в файлы `index.html` и `style.css` — всё будет работать точно по твоим инструкциям!