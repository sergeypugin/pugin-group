(function() {
  const minWidth = 350;
  // Берём реальную ширину окна устройства
  const screenWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth;

  if (screenWidth < minWidth && screenWidth > 0) {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      const scale = screenWidth / minWidth;
      meta.setAttribute(
        'content',
        `width=${minWidth}, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`
      );
    }
  }
})();
