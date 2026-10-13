// Cookie consent and Google tag loader (Google Consent Mode v2).
// Nothing Google-related loads while GOOGLE_TAG_ID is empty.
(function () {
  var GOOGLE_TAG_ID = ''; // e.g. 'AW-1234567890', set once Google Ads is connected
  var STORAGE_KEY = 'dssg-consent';
  if (!GOOGLE_TAG_ID) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  function readChoice() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveChoice(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* storage blocked */ }
  }

  var GRANTED = {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  };
  var DENIED = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  };

  // Consent defaults must be set before the tag loads.
  var choice = readChoice();
  gtag('consent', 'default', choice === 'granted' ? GRANTED : DENIED);

  gtag('js', new Date());
  gtag('config', GOOGLE_TAG_ID);

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GOOGLE_TAG_ID);
  document.head.appendChild(script);

  function addBanner() {
    if (readChoice() !== null) return;

    var style = document.createElement('style');
    style.textContent =
      '.dssg-consent{position:fixed;left:16px;right:16px;bottom:16px;max-width:640px;margin:0 auto;' +
      'background:#fff;color:#1f2933;border-radius:12px;padding:16px 18px;z-index:9999;' +
      'box-shadow:0 8px 30px rgba(0,0,0,.2);font:14px/1.5 system-ui,sans-serif;display:flex;flex-wrap:wrap;gap:12px;align-items:center}' +
      '.dssg-consent p{margin:0;flex:1 1 280px}' +
      '.dssg-consent a{color:#F47E2D}' +
      '.dssg-consent button{border:0;border-radius:8px;padding:8px 14px;font:600 14px system-ui,sans-serif;cursor:pointer}' +
      '.dssg-consent .accept{background:#002D72;color:#fff}' +
      '.dssg-consent .decline{background:#e5e9f0;color:#1f2933}';
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.className = 'dssg-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie choices');
    banner.innerHTML =
      '<p>We use cookies to measure our outreach and show relevant ads. ' +
      'See our <a href="/privacy/">Privacy Policy</a>.</p>' +
      '<button type="button" class="decline">Decline</button>' +
      '<button type="button" class="accept">Accept</button>';

    banner.querySelector('.accept').addEventListener('click', function () {
      saveChoice('granted');
      gtag('consent', 'update', GRANTED);
      banner.remove();
    });
    banner.querySelector('.decline').addEventListener('click', function () {
      saveChoice('denied');
      banner.remove();
    });

    document.body.appendChild(banner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addBanner);
  } else {
    addBanner();
  }
})();
