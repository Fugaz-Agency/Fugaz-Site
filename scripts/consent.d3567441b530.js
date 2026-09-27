// Optional behaviour analytics. No Clarity request is made before acceptance.
(() => {
  'use strict';
  const banner = document.getElementById('fugaz-cookies');
  if (!banner) return;
  const config = window.FugazAnalyticsConfig || {};
  const projectId = /^[a-z0-9]+$/i.test(config.clarityProjectId || '') ? config.clarityProjectId : '';
  const key = 'fugaz_consent';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let loaded = false;
  let returnFocus = null;
  let expiryTimer;

  function readChoice() {
    try {
      const cookie = document.cookie.split('; ').find(part => part.startsWith(key + '='));
      const value = cookie && JSON.parse(decodeURIComponent(cookie.slice(key.length + 1)));
      return value && value.version === 1 && value.project === projectId &&
        typeof value.accepted === 'boolean' && Number.isFinite(value.expires) && value.expires > Date.now() ? value : null;
    } catch (_) { return null; }
  }

  let choice = readChoice();
  function signal(accepted) {
    if (typeof window.clarity === 'function') {
      window.clarity('consentv2', {
        analytics_Storage: accepted ? 'granted' : 'denied',
        ad_Storage: 'denied'
      });
    }
  }

  function clearClarityCookies() {
    const domains = ['', location.hostname, '.' + location.hostname];
    const parts = location.hostname.split('.');
    while (parts.length > 2) { parts.shift(); domains.push('.' + parts.join('.')); }
    ['_clck', '_clsk'].forEach(name => domains.forEach(domain => {
      try {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' +
          (domain ? '; Domain=' + domain : '') + (location.protocol === 'https:' ? '; Secure' : '');
      } catch (_) { /* Cookie storage may be unavailable in private browsing. */ }
    }));
  }

  function activate() {
    if (loaded || !projectId || !choice || !choice.accepted) return;
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    signal(true);
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/' + projectId;
    script.dataset.fugazClarity = '1';
    loaded = true;
    document.head.appendChild(script);
  }

  function scheduleExpiry() {
    clearTimeout(expiryTimer);
    if (!choice) return;
    // Timers longer than 2^31-1 overflow in browsers; recheck daily instead.
    expiryTimer = setTimeout(checkExpiry, Math.min(24 * 60 * 60 * 1000, Math.max(0, choice.expires - Date.now())));
  }

  function checkExpiry() {
    if (choice && choice.expires <= Date.now()) {
      choice = null;
      if (loaded) { signal(false); clearClarityCookies(); location.reload(); return; }
      banner.hidden = false;
    }
    scheduleExpiry();
  }

  function choose(accepted) {
    choice = { version: 1, project: projectId, accepted, expires: Date.now() + lifetime };
    try {
      document.cookie = key + '=' + encodeURIComponent(JSON.stringify(choice)) +
        '; Max-Age=' + lifetime / 1000 + '; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
    } catch (_) { /* A blocked cookie does not prevent using the website. */ }
    banner.hidden = true;
    if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
    if (!accepted) {
      signal(false);
      clearClarityCookies();
      // Removing a script tag does not stop its running recorder. Reload to unload it.
      if (loaded) { location.reload(); return; }
    } else {
      activate();
    }
    scheduleExpiry();
  }

  banner.querySelector('[data-cookie-accept]').addEventListener('click', () => choose(true));
  banner.querySelector('[data-cookie-decline]').addEventListener('click', () => choose(false));
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-cookie-settings]');
    if (!trigger) return;
    const legalPanel = trigger.closest('[data-legal]');
    returnFocus = legalPanel ? document.querySelector('[data-open-legal="privacy"]') : trigger;
    // Use the existing panel close control so scroll locking stays in sync.
    if (legalPanel) legalPanel.querySelector('[data-legal-close]').click();
    banner.hidden = false;
    banner.querySelector('[data-cookie-accept]').focus({ preventScroll: true });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    const saved = readChoice();
    if (loaded && (!saved || !saved.accepted)) {
      signal(false); clearClarityCookies(); location.reload(); return;
    }
    if (saved) choice = saved;
    checkExpiry();
  });

  // The runtime mounts the intro beside the main container. Wait for it to finish.
  let frame = 0;
  const observer = new MutationObserver(() => {
    if (!frame) frame = requestAnimationFrame(checkIntro);
  });
  function checkIntro() {
    frame = 0;
    const preloader = document.querySelector('#fugaz-root [data-preloader]');
    if (!preloader || getComputedStyle(preloader).display !== 'none') return;
    observer.disconnect();
    if (!choice) banner.hidden = false;
    activate();
    scheduleExpiry();
  }
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
  checkIntro();
})();
