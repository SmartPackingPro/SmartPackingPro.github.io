// Google Analytics 4 — initialisation (loaded after gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
// Consent Mode: no analytics cookies/storage until the visitor accepts.
var SPP_CONSENT_KEY = 'spp_ga_consent';
var sppChoice = null;
try { sppChoice = localStorage.getItem(SPP_CONSENT_KEY); } catch (e) {}
gtag('consent', 'default', {
  analytics_storage: sppChoice === 'granted' ? 'granted' : 'denied',
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
});
// gtag.js is fetched only after the visitor accepts: no request to Google before consent.
function sppLoadGtag() {
  if (window.sppGtagLoaded) return;
  window.sppGtagLoaded = true;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-S919FCNMTS';
  document.head.appendChild(s);
}
if (sppChoice === 'granted') sppLoadGtag();
gtag('js', new Date());
gtag('config', 'G-S919FCNMTS', { allow_google_signals: false, allow_ad_personalization_signals: false });

// Small consent banner (website only; the Android app has its own choices).
document.addEventListener('DOMContentLoaded', function () {
  if (sppChoice) return;
  var bar = document.createElement('div');
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Analytics choice');
  bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#0f172a;color:#e2e8f0;padding:12px 16px;font:14px/1.4 system-ui,sans-serif;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center';
  bar.innerHTML = '<span>This website uses Google Analytics to count visits, only if you accept. The Smart Packing Pro app is separate.</span>';
  function choose(v) {
    try { localStorage.setItem(SPP_CONSENT_KEY, v); } catch (e) {}
    gtag('consent', 'update', { analytics_storage: v });
    if (v === 'granted') sppLoadGtag();
    bar.remove();
  }
  [['Decline', 'denied', '#334155'], ['Accept', 'granted', '#38bdf8']].forEach(function (b) {
    var btn = document.createElement('button');
    btn.textContent = b[0];
    btn.style.cssText = 'border:0;border-radius:6px;padding:8px 14px;cursor:pointer;color:' + (b[1] === 'granted' ? '#0f172a' : '#e2e8f0') + ';background:' + b[2];
    btn.addEventListener('click', function () { choose(b[1]); });
    bar.appendChild(btn);
  });
  document.body.appendChild(bar);
});

// Play Store click tracking — fires a named event with the source location
// Selector targets /get links (the Play Store launcher page)
document.addEventListener('DOMContentLoaded', function () {
  var playStoreLinks = document.querySelectorAll('a[href="/get"]');

  playStoreLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var location = 'unknown';
      var section = link.closest('nav, section, footer, header');
      if (section) {
        if (section.tagName.toLowerCase() === 'nav') {
          location = 'nav';
        } else if (section.tagName.toLowerCase() === 'footer') {
          location = 'footer';
        } else if (section.id) {
          location = section.id;
        }
      }
      // beacon transport ensures the hit sends before /get navigates away
      gtag('event', 'play_store_click', {
        event_category: 'conversion',
        event_label: location,
        link_text: link.innerText.trim() || 'badge',
        transport_type: 'beacon'
      });
    });
  });
});
