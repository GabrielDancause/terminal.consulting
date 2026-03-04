/**
 * Global newsletter bar — sticky bottom CTA that appears on scroll.
 * Include this script on any page to add a newsletter signup bar.
 * Hides itself once the user has subscribed (via localStorage).
 * Hides when a page already has an inline subscribe form in view.
 */
(function () {
  'use strict';

  var KIT_URL = 'https://app.kit.com/forms/9115688/subscriptions';
  var STORAGE_KEY = 'ali_newsletter_subscribed';
  var DISMISSED_KEY = 'ali_newsletter_bar_dismissed';

  // Don't show if already subscribed or dismissed this session
  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
    if (sessionStorage.getItem(DISMISSED_KEY)) return;
  } catch (e) {}

  // Don't show on the dedicated newsletter or guide landing pages
  var path = window.location.pathname;
  if (path.indexOf('newsletter') !== -1 || path.indexOf('ethical-nightlife-guide') !== -1) return;

  // Wait for DOM
  if (document.body) { init(); }
  else { document.addEventListener('DOMContentLoaded', init); }

  function init() {
    // Create the bar
    var bar = document.createElement('div');
    bar.id = 'nl-bar';
    bar.innerHTML =
      '<div class="nl-bar-inner">' +
        '<p class="nl-bar-text"><strong>Stay curious.</strong> Join the newsletter for honest conversations about sex &amp; relationships. <span class="nl-bar-bonus">+ free guide</span></p>' +
        '<form class="nl-bar-form" id="nl-bar-form">' +
          '<input type="email" name="email" placeholder="Your email" required autocomplete="email" aria-label="Email address" class="nl-bar-input">' +
          '<button type="submit" class="nl-bar-btn">Join Free</button>' +
        '</form>' +
        '<button class="nl-bar-close" aria-label="Close">&times;</button>' +
      '</div>';

    // Styles
    var style = document.createElement('style');
    style.textContent =
      '#nl-bar{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#2E3E24;color:#FAF8EB;padding:14px 20px;' +
      'transform:translateY(100%);transition:transform .4s cubic-bezier(.22,1,.36,1);box-shadow:0 -2px 20px rgba(0,0,0,.15)}' +
      '#nl-bar.nl-bar-show{transform:translateY(0)}' +
      '#nl-bar.nl-bar-success{background:#2E3E24}' +
      '.nl-bar-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:16px}' +
      '.nl-bar-text{font-family:Montserrat,sans-serif;font-size:.85rem;color:#C6C8BB;flex:1;line-height:1.4;margin:0}' +
      '.nl-bar-text strong{color:#FAF8EB}' +
      '.nl-bar-bonus{color:#AD9846;font-weight:600}' +
      '.nl-bar-form{display:flex;gap:8px;flex-shrink:0}' +
      '.nl-bar-input{padding:10px 14px;border:1px solid rgba(198,200,187,.3);border-radius:8px;font-family:Montserrat,sans-serif;' +
      'font-size:.85rem;background:rgba(250,248,235,.08);color:#FAF8EB;outline:none;width:200px;transition:border-color .15s}' +
      '.nl-bar-input::placeholder{color:rgba(198,200,187,.5)}' +
      '.nl-bar-input:focus{border-color:#AD9846}' +
      '.nl-bar-btn{padding:10px 20px;background:#AD9846;color:#FAF8EB;border:none;border-radius:8px;font-family:Montserrat,sans-serif;' +
      'font-size:.85rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .15s}' +
      '.nl-bar-btn:hover{background:#c4ad52}' +
      '.nl-bar-btn:disabled{opacity:.6;cursor:wait}' +
      '.nl-bar-close{background:none;border:none;color:#C6C8BB;font-size:1.4rem;cursor:pointer;padding:0 0 0 8px;line-height:1;' +
      'transition:color .15s;flex-shrink:0}' +
      '.nl-bar-close:hover{color:#FAF8EB}' +
      '.nl-bar-success-msg{font-family:Montserrat,sans-serif;font-size:.9rem;color:#FAF8EB;text-align:center;flex:1;margin:0}' +
      '.nl-bar-success-msg strong{color:#AD9846}' +
      '@media(max-width:640px){' +
        '.nl-bar-inner{flex-wrap:wrap;gap:10px}' +
        '.nl-bar-text{width:100%;font-size:.8rem}' +
        '.nl-bar-form{width:100%}' +
        '.nl-bar-input{flex:1;min-width:0}' +
        '.nl-bar-close{position:absolute;top:10px;right:12px}' +
        '#nl-bar{padding:14px 16px 14px 16px;position:fixed}' +
      '}';
    document.head.appendChild(style);
    document.body.appendChild(bar);

    // Show after scroll (30% of page or 3 seconds)
    var shown = false;
    function showBar() {
      if (shown) return;
      shown = true;
      bar.classList.add('nl-bar-show');
    }

    var scrollTimer = setTimeout(showBar, 3000);

    window.addEventListener('scroll', function () {
      var scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.3) {
        clearTimeout(scrollTimer);
        showBar();
      }
    }, { passive: true });

    // Close button
    bar.querySelector('.nl-bar-close').addEventListener('click', function () {
      bar.classList.remove('nl-bar-show');
      try { sessionStorage.setItem(DISMISSED_KEY, '1'); } catch (e) {}
      setTimeout(function () { bar.remove(); }, 400);
    });

    // Form submit
    var form = document.getElementById('nl-bar-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('.nl-bar-input');
        var btn = form.querySelector('.nl-bar-btn');
        var email = input.value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          input.style.borderColor = '#c47070';
          input.focus();
          return;
        }
        btn.disabled = true;
        btn.textContent = 'Sending\u2026';

        var fd = new FormData();
        fd.append('email_address', email);

        fetch(KIT_URL, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } })
          .then(function (r) { return r.json(); })
          .then(onSuccess)
          .catch(onSuccess); // Still show success on error (graceful degradation)

        function onSuccess() {
          try { localStorage.setItem(STORAGE_KEY, email); } catch (ex) {}
          var inner = bar.querySelector('.nl-bar-inner');
          inner.innerHTML =
            '<p class="nl-bar-success-msg"><strong>You\'re in!</strong> Check your inbox to confirm. Welcome to the community.</p>' +
            '<button class="nl-bar-close" aria-label="Close">&times;</button>';
          bar.classList.add('nl-bar-success');
          inner.querySelector('.nl-bar-close').addEventListener('click', function () {
            bar.classList.remove('nl-bar-show');
            setTimeout(function () { bar.remove(); }, 400);
          });
          // Auto-hide after 5 seconds
          setTimeout(function () {
            bar.classList.remove('nl-bar-show');
            setTimeout(function () { bar.remove(); }, 400);
          }, 5000);
        }
      });
    }
  }
})();
