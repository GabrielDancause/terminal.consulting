(function () {
  'use strict';

  var KIT_FORM_URL = 'https://app.kit.com/forms/9115688/subscriptions';
  var STORAGE_PREFIX = 'email_capture_';

  if (document.body) { init(); }
  else { document.addEventListener('DOMContentLoaded', init); }

  function init() {
    var container = document.getElementById('email-capture-form');
    if (!container) return;

    var postSlug = container.getAttribute('data-post-slug') || '';
    var pdfUrl = container.getAttribute('data-pdf-url') || '';
    var pdfName = container.getAttribute('data-pdf-name') || 'Free Guide';

    // No PDF configured — don't render anything
    if (!pdfUrl) return;

    injectStyles();

    // Check if already subscribed for this post
    var saved;
    try { saved = localStorage.getItem(STORAGE_PREFIX + postSlug); } catch (e) {}

    if (saved) {
      renderAlreadySubscribed(container, pdfUrl, pdfName);
    } else {
      renderForm(container, postSlug, pdfUrl, pdfName);
      // Set up scroll-triggered popup (only if not yet subscribed)
      initPopup(postSlug, pdfUrl, pdfName);
    }
  }

  // ========================
  //  Scroll-triggered Popup
  // ========================
  var popupShown = false;
  var popupDismissed = false;

  function initPopup(postSlug, pdfUrl, pdfName) {
    window.addEventListener('scroll', function onScroll() {
      if (popupShown || popupDismissed) return;

      // Check if already subscribed (might have just signed up via inline form)
      var saved;
      try { saved = localStorage.getItem(STORAGE_PREFIX + postSlug); } catch (e) {}
      if (saved) { window.removeEventListener('scroll', onScroll); return; }

      // Calculate scroll depth
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      var scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 55) {
        popupShown = true;
        window.removeEventListener('scroll', onScroll);
        showPopup(postSlug, pdfUrl, pdfName);
      }
    });
  }

  function showPopup(postSlug, pdfUrl, pdfName) {
    var overlay = document.createElement('div');
    overlay.id = 'ec-popup-overlay';
    overlay.innerHTML =
      '<div class="ec-card">' +
        '<button class="ec-popup-close" aria-label="Close">&times;</button>' +
        '<div class="ec-badge">Free Download</div>' +
        '<p class="ec-heading">' + pdfName + '</p>' +
        '<p class="ec-desc">Enjoying this article? Grab the free guide with practical insights you won\'t find in the video.</p>' +
        '<form class="ec-form" id="ec-popup-form">' +
          '<input class="ec-input" type="email" name="email" placeholder="Your email address" required autocomplete="email">' +
          '<button class="ec-btn" type="submit">Get the Guide</button>' +
        '</form>' +
        '<p class="ec-note">No spam, ever. Your email stays between us.</p>' +
      '</div>';

    document.body.appendChild(overlay);

    // Animate in on next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('ec-popup-show');
      });
    });

    // Close button
    overlay.querySelector('.ec-popup-close').addEventListener('click', function () {
      dismissPopup(overlay);
    });

    // Click outside to close
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) dismissPopup(overlay);
    });

    // Escape key to close
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        dismissPopup(overlay);
        document.removeEventListener('keydown', onKey);
      }
    });

    // Form submit
    var popupForm = document.getElementById('ec-popup-form');
    var inlineContainer = document.getElementById('email-capture-form');

    popupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = popupForm.querySelector('.ec-input');
      var btn = popupForm.querySelector('.ec-btn');
      var email = input.value.trim();

      // Clear previous errors
      var prevErr = overlay.querySelector('.ec-error-msg');
      if (prevErr) prevErr.remove();
      input.classList.remove('ec-error');

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.classList.add('ec-error');
        var errP = document.createElement('p');
        errP.className = 'ec-error-msg';
        errP.textContent = 'Please enter a valid email address.';
        popupForm.parentNode.appendChild(errP);
        input.focus();
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending\u2026';

      submitEmail(email, postSlug, function () {
        // Success: show download link inside popup, update inline form too
        try { localStorage.setItem(STORAGE_PREFIX + postSlug, email); } catch (ex) {}
        var card = overlay.querySelector('.ec-card');
        card.innerHTML =
          '<button class="ec-popup-close" aria-label="Close">&times;</button>' +
          '<div class="ec-success-icon">\u2714\uFE0F</div>' +
          '<p class="ec-heading">You\'re In!</p>' +
          '<p class="ec-desc">Your guide is ready. Click below to download it now.</p>' +
          '<a class="ec-download-btn" href="' + pdfUrl + '" download>Download ' + pdfName + ' \u2192</a>';
        card.querySelector('.ec-popup-close').addEventListener('click', function () {
          dismissPopup(overlay);
        });
        if (inlineContainer) {
          renderSuccess(inlineContainer, pdfUrl, pdfName);
        }
      }, function () {
        btn.disabled = false;
        btn.textContent = 'Get the Guide';
        var errP2 = document.createElement('p');
        errP2.className = 'ec-error-msg';
        errP2.textContent = 'Something went wrong. Please try again.';
        popupForm.parentNode.appendChild(errP2);
      });
    });
  }

  function dismissPopup(overlay) {
    popupDismissed = true;
    overlay.classList.remove('ec-popup-show');
    setTimeout(function () { overlay.remove(); }, 350);
  }

  // ========================
  //  Shared Email Submit
  // ========================
  function submitEmail(email, postSlug, onSuccess, onError) {
    var fd = new FormData();
    fd.append('email_address', email);

    var controller;
    var timeoutId;
    if (typeof AbortController !== 'undefined') {
      controller = new AbortController();
      timeoutId = setTimeout(function () { controller.abort(); }, 15000);
    }

    var fetchOptions = {
      method: 'POST',
      body: fd,
      headers: { 'Accept': 'application/json' }
    };
    if (controller) fetchOptions.signal = controller.signal;

    fetch(KIT_FORM_URL, fetchOptions)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (timeoutId) clearTimeout(timeoutId);
        onSuccess();
      })
      .catch(function () {
        if (timeoutId) clearTimeout(timeoutId);
        // On error, still give user the PDF
        onSuccess();
      });
  }

  // ========================
  //  CSS Injection
  // ========================
  function injectStyles() {
    var css =
      // Shared card styles (inline + popup)
      '.ec-card{' +
        'background:#fff;border-radius:18px;padding:32px 28px;' +
        'text-align:center;' +
        'box-shadow:0 1px 4px rgba(46,62,36,.06);' +
        'border:1px solid rgba(46,62,36,.06);' +
      '}' +
      '#email-capture-form .ec-card{margin:36px 0 20px}' +
      '.ec-badge{' +
        'display:inline-block;font-size:.7rem;font-weight:600;' +
        'letter-spacing:.08em;text-transform:uppercase;' +
        'color:#AD9846;margin-bottom:8px;' +
      '}' +
      '.ec-heading{' +
        "font-family:'The Bloomington',cursive;" +
        'font-size:2rem;font-weight:400;color:#2E3E24;' +
        'margin:0 0 10px;line-height:1.2;' +
      '}' +
      '.ec-desc{' +
        'font-size:.88rem;color:#555549;line-height:1.7;' +
        'margin:0 0 22px;max-width:440px;margin-left:auto;margin-right:auto;' +
      '}' +
      '.ec-form{' +
        'display:flex;justify-content:center;gap:10px;max-width:440px;margin:0 auto;' +
      '}' +
      '.ec-input{' +
        'flex:1;padding:14px 18px;border:1px solid #C6C8BB;' +
        'border-radius:10px;font-family:inherit;font-size:.9rem;' +
        'background:#FAF8EB;color:#2E3E24;outline:none;' +
        'transition:border-color .15s ease,box-shadow .15s ease;' +
      '}' +
      '.ec-input:focus{' +
        'border-color:#AD9846;box-shadow:0 0 0 3px rgba(173,152,70,.15);' +
      '}' +
      '.ec-input.ec-error{border-color:#9b3c3c}' +
      '.ec-btn{' +
        'padding:14px 28px;background:#AD9846;color:#FAF8EB;' +
        'border:none;border-radius:10px;font-family:inherit;' +
        'font-size:.9rem;font-weight:600;cursor:pointer;white-space:nowrap;' +
        'transition:background .15s ease,transform .15s ease;' +
      '}' +
      '.ec-btn:hover{background:#c4ad52;transform:translateY(-1px)}' +
      '.ec-btn:disabled{opacity:.6;cursor:wait;transform:none}' +
      '.ec-note{font-size:.75rem;color:#8a8a7a;margin:14px 0 0}' +
      '.ec-error-msg{font-size:.82rem;color:#9b3c3c;margin:10px 0 0}' +
      '.ec-success-icon{font-size:2.5rem;margin-bottom:10px}' +
      '.ec-download-btn{' +
        'display:inline-block;padding:14px 32px;background:#2E3E24;color:#FAF8EB;' +
        'text-decoration:none;border-radius:10px;font-weight:600;font-size:.9rem;' +
        'transition:background .15s ease,transform .15s ease;margin-top:18px;' +
      '}' +
      '.ec-download-btn:hover{background:#3a5030;transform:translateY(-1px)}' +

      // Popup overlay
      '#ec-popup-overlay{' +
        'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9998;' +
        'background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;' +
        'padding:20px;opacity:0;visibility:hidden;' +
        'transition:opacity .3s ease,visibility .3s ease;' +
        'font-family:Montserrat,sans-serif;' +
      '}' +
      '#ec-popup-overlay.ec-popup-show{opacity:1;visibility:visible}' +
      '#ec-popup-overlay .ec-card{' +
        'max-width:480px;width:100%;position:relative;' +
        'transform:translateY(20px);transition:transform .3s ease;' +
        'box-shadow:0 8px 40px rgba(0,0,0,.15);' +
      '}' +
      '#ec-popup-overlay.ec-popup-show .ec-card{transform:translateY(0)}' +
      '.ec-popup-close{' +
        'position:absolute;top:14px;right:16px;background:none;border:none;' +
        'font-size:1.4rem;color:#8a8a7a;cursor:pointer;padding:4px 8px;' +
        'line-height:1;transition:color .15s ease;' +
      '}' +
      '.ec-popup-close:hover{color:#2E3E24}' +

      // Responsive
      '@media(max-width:480px){' +
        '.ec-form{flex-direction:column}' +
        '.ec-input{width:100%}' +
        '.ec-btn{width:100%;min-height:44px}' +
        '#ec-popup-overlay .ec-card{padding:26px 20px}' +
      '}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ========================
  //  Render Form
  // ========================
  function renderForm(container, postSlug, pdfUrl, pdfName) {
    container.innerHTML =
      '<div class="ec-card">' +
        '<div class="ec-badge">Free Download</div>' +
        '<p class="ec-heading">' + pdfName + '</p>' +
        '<p class="ec-desc">Get our free guide delivered straight to your inbox. ' +
          'Practical insights you won\'t find in the video.</p>' +
        '<form class="ec-form" id="ec-form-inner">' +
          '<input class="ec-input" type="email" name="email" placeholder="Your email address" required autocomplete="email">' +
          '<button class="ec-btn" type="submit">Send Me the Guide</button>' +
        '</form>' +
        '<p class="ec-note">No spam, ever. Your email stays between us.</p>' +
      '</div>';

    var form = document.getElementById('ec-form-inner');
    form.addEventListener('submit', function (e) {
      handleSubmit(e, postSlug, pdfUrl, pdfName, container);
    });
  }

  // ========================
  //  Render Success
  // ========================
  function renderSuccess(container, pdfUrl, pdfName) {
    container.innerHTML =
      '<div class="ec-card">' +
        '<div class="ec-success-icon">\u2714\uFE0F</div>' +
        '<p class="ec-heading">You\'re In!</p>' +
        '<p class="ec-desc">Your guide is ready. Click below to download it now.</p>' +
        '<a class="ec-download-btn" href="' + pdfUrl + '" download>Download ' + pdfName + ' \u2192</a>' +
      '</div>';
  }

  // ========================
  //  Render Already Subscribed
  // ========================
  function renderAlreadySubscribed(container, pdfUrl, pdfName) {
    container.innerHTML =
      '<div class="ec-card">' +
        '<div class="ec-success-icon">\uD83D\uDC4B</div>' +
        '<p class="ec-heading">Welcome Back!</p>' +
        '<p class="ec-desc">You already grabbed this guide. Here it is again if you need it.</p>' +
        '<a class="ec-download-btn" href="' + pdfUrl + '" download>Download ' + pdfName + ' \u2192</a>' +
      '</div>';
  }

  // ========================
  //  Handle Submit
  // ========================
  function handleSubmit(e, postSlug, pdfUrl, pdfName, container) {
    e.preventDefault();

    var form = document.getElementById('ec-form-inner');
    var input = form.querySelector('.ec-input');
    var btn = form.querySelector('.ec-btn');
    var email = input.value.trim();

    // Clear previous errors
    var prevError = form.parentNode.querySelector('.ec-error-msg');
    if (prevError) prevError.remove();
    input.classList.remove('ec-error');

    // Validate
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.classList.add('ec-error');
      showError(form.parentNode, 'Please enter a valid email address.');
      input.focus();
      return;
    }

    // Loading state
    btn.disabled = true;
    var originalText = btn.textContent;
    btn.textContent = 'Sending\u2026';

    submitEmail(email, postSlug, function () {
      try { localStorage.setItem(STORAGE_PREFIX + postSlug, email); } catch (ex) {}
      popupDismissed = true; // Prevent popup from showing after inline submit
      renderSuccess(container, pdfUrl, pdfName);
    }, function () {
      btn.disabled = false;
      btn.textContent = originalText;
      showError(form.parentNode, 'Something went wrong. Please try again.');
    });
  }

  function showError(parent, message) {
    var p = document.createElement('p');
    p.className = 'ec-error-msg';
    p.textContent = message;
    parent.appendChild(p);
  }

  // Load global newsletter bar on blog posts
  var nlScript = document.createElement('script');
  nlScript.src = '/newsletter-bar.js';
  nlScript.defer = true;
  document.body.appendChild(nlScript);
})();
