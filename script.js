(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return media.matches ? 'dark' : 'light';
  }

  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    root.setAttribute('data-theme', next);
  });
})();
