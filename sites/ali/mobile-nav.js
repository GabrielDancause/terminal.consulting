/* Mobile hamburger menu - auto-initializes on any nav with .nav-links */
(function() {
  var nav = document.querySelector('nav');
  if (!nav) return;

  var links = nav.querySelector('.nav-links');
  if (!links) return;

  // Create hamburger button
  var btn = document.createElement('button');
  btn.className = 'nav-hamburger';
  btn.setAttribute('aria-label', 'Toggle menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);

  function closeMenu() {
    links.classList.remove('nav-open');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    links.classList.add('nav-open');
    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
  }

  // Toggle menu — use explicit open/close instead of toggle
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (links.classList.contains('nav-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on link click
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', closeMenu);
  });

  // Close when tapping outside the nav
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && links.classList.contains('nav-open')) {
      closeMenu();
    }
  });
})();
