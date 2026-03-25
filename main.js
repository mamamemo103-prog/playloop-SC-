(function () {
  'use strict';

  // Header (mobile menu)
  var top = document.querySelector('.pl-top');
  var bur = document.querySelector('.pl-burger');
  var nav = document.getElementById('pl-nav');

  if (top && bur && nav) {
    bur.addEventListener('click', function () {
      var on = top.classList.toggle('pl-on');
      bur.setAttribute('aria-expanded', on ? 'true' : 'false');
      bur.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        top.classList.remove('pl-on');
        bur.setAttribute('aria-expanded', 'false');
        bur.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Game catalog filtering
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('[data-pl-filter]'));
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-pl-cat]'));

  function applyFilter(cat) {
    items.forEach(function (item) {
      var c = item.getAttribute('data-pl-cat') || '';
      item.style.display = cat === 'all' || c === cat ? '' : 'none';
    });
  }

  function setPressed(targetBtn) {
    filterBtns.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn === targetBtn ? 'true' : 'false');
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-pl-filter') || 'all';
      setPressed(btn);
      applyFilter(cat);
    });
  });

  // Support URL hash navigation: games.html#slots
  var hash = window.location.hash ? window.location.hash.replace('#', '') : '';
  if (hash) {
    var match = filterBtns.find(function (btn) {
      return (btn.getAttribute('data-pl-filter') || '') === hash;
    });
    if (match) {
      var cat = match.getAttribute('data-pl-filter') || 'all';
      setPressed(match);
      applyFilter(cat);
    }
  }
})();
