// Google Analytics 4 — initialisation (loaded after gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-S919FCNMTS');

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
