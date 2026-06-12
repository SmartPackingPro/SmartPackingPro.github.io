// Google Analytics 4 — /get redirect page (Play Store launcher)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-S919FCNMTS');

var PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.androidapp.smartpackingpro&pcampaignid=web_share";

// Named conversion event so /get hits are distinguishable from the on-page play_store_click events
gtag('event', 'play_store_redirect', {
  event_category: 'conversion',
  transport_type: 'beacon'
});

// Short delay so the page_view/event beacons can dispatch before the page navigates away
setTimeout(function () {
  window.location.replace(PLAY_STORE_URL);
}, 400);
