(function () {
  'use strict';

  var GTM_ID = 'GTM-TCG8Z3K7';
  var GA_ID = 'G-23G2Y8PVLR';
  var CONSENT_KEY = 'cookie_consent';

  // --- Google Consent Mode v2: default to denied ---
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied'
  });

  // --- Check saved consent ---
  var saved;
  try { saved = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  if (saved === 'accepted') { loadTracking(); return; }
  if (saved === 'declined') { return; }

  // --- First visit: show banner after DOM is ready ---
  if (document.body) { init(); }
  else { document.addEventListener('DOMContentLoaded', init); }

  function init() {
    injectStyles();
    showBanner();
  }

  // ========================
  //  Load GTM + GA
  // ========================
  function loadTracking() {
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    });

    // GTM
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', GTM_ID);

    // GA (gtag.js)
    var gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(gs);

    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // ========================
  //  Banner CSS
  // ========================
  function injectStyles() {
    var css =
      '#cc-banner{' +
        'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
        'background:#2E3E24;' +
        'padding:20px 24px;' +
        'box-shadow:0 -4px 20px rgba(0,0,0,.15);' +
        'font-family:Montserrat,sans-serif;' +
        'transform:translateY(100%);' +
        'transition:transform .4s cubic-bezier(.4,0,.2,1);' +
      '}' +
      '#cc-banner.cc-show{transform:translateY(0)}' +
      '#cc-banner.cc-hide{' +
        'opacity:0;transition:opacity .3s ease;' +
      '}' +
      '.cc-inner{' +
        'max-width:680px;margin:0 auto;' +
        'display:flex;align-items:center;gap:20px;' +
      '}' +
      '.cc-text{' +
        'color:#FAF8EB;font-size:.85rem;line-height:1.55;flex:1;margin:0;' +
      '}' +
      '.cc-btns{display:flex;gap:10px;flex-shrink:0}' +
      '#cc-accept{' +
        'background:#AD9846;color:#FAF8EB;border:none;' +
        'padding:10px 22px;border-radius:8px;' +
        'font-family:inherit;font-size:.85rem;font-weight:600;' +
        'cursor:pointer;transition:background .15s ease;' +
      '}' +
      '#cc-accept:hover{background:#c4ad52}' +
      '#cc-decline{' +
        'background:transparent;color:#C6C8BB;' +
        'border:1px solid #C6C8BB;' +
        'padding:10px 22px;border-radius:8px;' +
        'font-family:inherit;font-size:.85rem;font-weight:500;' +
        'cursor:pointer;transition:border-color .15s ease,color .15s ease;' +
      '}' +
      '#cc-decline:hover{color:#FAF8EB;border-color:#FAF8EB}' +
      '@media(max-width:480px){' +
        '.cc-inner{flex-direction:column;text-align:center}' +
        '.cc-btns{width:100%;flex-direction:column}' +
        '#cc-accept,#cc-decline{width:100%;min-height:44px}' +
      '}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ========================
  //  Banner DOM
  // ========================
  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cc-banner';
    banner.innerHTML =
      '<div class="cc-inner">' +
        '<p class="cc-text">' +
          'We use cookies to understand how visitors interact with this site. ' +
          'No personal data is sold or shared with advertisers.' +
        '</p>' +
        '<div class="cc-btns">' +
          '<button id="cc-accept">Accept</button>' +
          '<button id="cc-decline">Decline</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    // Trigger slide-up on next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add('cc-show');
      });
    });

    document.getElementById('cc-accept').addEventListener('click', function () {
      saveConsent('accepted');
      dismiss(banner);
      loadTracking();
    });

    document.getElementById('cc-decline').addEventListener('click', function () {
      saveConsent('declined');
      dismiss(banner);
    });
  }

  function dismiss(banner) {
    banner.classList.remove('cc-show');
    banner.classList.add('cc-hide');
    setTimeout(function () { banner.remove(); }, 350);
  }

  function saveConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }
})();
