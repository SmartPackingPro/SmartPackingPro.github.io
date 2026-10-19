// Google Analytics 4 — /get redirect page (Play Store launcher)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
// Track only if the visitor accepted analytics on the main site (same origin storage).
var sppGranted = false;
try { sppGranted = localStorage.getItem('spp_ga_consent') === 'granted'; } catch (e) {}
if (sppGranted) {
  var sppTag = document.createElement('script');
  sppTag.async = true;
  sppTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-S919FCNMTS';
  document.head.appendChild(sppTag);
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('js', new Date());
  gtag('config', 'G-S919FCNMTS', { allow_google_signals: false, allow_ad_personalization_signals: false });
}

var PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.androidapp.smartpackingpro&pcampaignid=web_share";

// Named conversion event so /get hits are distinguishable from the on-page play_store_click events
if (sppGranted) gtag('event', 'play_store_redirect', {
  event_category: 'conversion',
  transport_type: 'beacon'
});

// Short delay so the page_view/event beacons can dispatch before the page navigates away
setTimeout(function () {
  window.location.replace(PLAY_STORE_URL);
}, 400);
