/**
 * Course Access Gate
 * Protects course.html and all module pages behind a magic link.
 *
 * How it works:
 * 1. Customer buys → Stripe redirects to thank-you.html → localStorage grants access
 * 2. Kit sends welcome email with magic link: course.html?key=ACCESS_KEY
 * 3. Clicking the link stores the key in localStorage, cleans the URL
 * 4. Future visits check localStorage — no key needed in URL
 * 5. No valid access → page content hidden, "purchase required" message shown
 */
(function() {
  'use strict';

  const ACCESS_KEY = 'gab2026cc';
  const LS_KEY = 'gab_course_access';
  const LANDING_URL = 'https://gab.ae/';

  function getParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch(e) {
      return null;
    }
  }

  function hasAccess() {
    try {
      return localStorage.getItem(LS_KEY) === ACCESS_KEY;
    } catch(e) {
      return false;
    }
  }

  function grantAccess() {
    try {
      localStorage.setItem(LS_KEY, ACCESS_KEY);
      localStorage.setItem('gab_customer', '1');
    } catch(e) {}
    // Clean the key from URL
    const clean = window.location.pathname + window.location.hash;
    window.history.replaceState({}, '', clean);
  }

  function showPage() {
    document.documentElement.style.visibility = 'visible';
  }

  function showGate() {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.innerHTML = '' +
        '<div style="max-width:480px;margin:120px auto;text-align:center;padding:24px;font-family:Inter,-apple-system,sans-serif;color:#F5F5F7;">' +
          '<div style="font-size:3rem;margin-bottom:20px;">🔒</div>' +
          '<h1 style="font-size:1.6rem;font-weight:700;margin-bottom:12px;">Course Access Required</h1>' +
          '<p style="color:#8E8E93;margin-bottom:28px;line-height:1.6;">This content is for enrolled students. If you purchased the tutorial, check your email for the access link.</p>' +
          '<a href="' + LANDING_URL + '" style="display:inline-block;background:#6C5CE7;color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:1rem;">Get the Tutorial &mdash; $39</a>' +
          '<p style="margin-top:24px;font-size:0.85rem;color:#636366;">Already purchased? Check your email for the magic link or contact <a href="mailto:gab@gab.ae" style="color:#A29BFE;">gab@gab.ae</a></p>' +
        '</div>';
      showPage();
    });
  }

  // 1. Check for key in URL
  const urlKey = getParam('key');
  if (urlKey === ACCESS_KEY) {
    grantAccess();
    return;
  }

  // 2. Check localStorage
  if (hasAccess()) {
    return;
  }

  // 3. No access — show gate
  // Hide page immediately to prevent content flash (only for unauthorized users)
  document.documentElement.style.visibility = 'hidden';
  showGate();
})();
