(function() {
  var btn = document.querySelector('.nav-hamburger');
  var nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;
  btn.addEventListener('click', function() {
    nav.classList.toggle('open');
    var open = nav.classList.contains('open');
    btn.setAttribute('aria-expanded', open);
    btn.querySelector('span:nth-child(1)').style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
    btn.querySelector('span:nth-child(2)').style.opacity = open ? '0' : '1';
    btn.querySelector('span:nth-child(3)').style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  document.addEventListener('click', function(e) {
    if (!btn.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelector('span:nth-child(1)').style.transform = '';
      btn.querySelector('span:nth-child(2)').style.opacity = '1';
      btn.querySelector('span:nth-child(3)').style.transform = '';
    }
  });
})();
