export function loadComponents(onHeaderLoaded) {
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

    return fetch(path)
      .then((res) => res.text())
      .then((html) => {
        el.innerHTML = html;
        if (id === 'header-placeholder' && typeof onHeaderLoaded === 'function') {
          onHeaderLoaded();
        }
      })
      .catch((err) => console.error('Ошибка загрузки ' + path, err));
  };

  loadComponent('header-placeholder', 'components/header.html', 'afterbegin');
  loadComponent('footer-placeholder', 'components/footer.html', 'beforeend');
  loadComponent('back-to-top-placeholder', 'components/back-to-top.html', 'beforeend');
  loadComponent('cookie-placeholder', 'components/cookie-banner.html', 'beforeend');
}
