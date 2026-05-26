/**
 * SMART PACKING PRO - Landing Page Scripts
 * Handles scroll reveal animations, sticky nav, and carousel logic.
 */

// Frame busting guard - prevents embedding in third-party iframes
if (window.self !== window.top) {
  try {
    window.top.location = window.self.location;
  } catch (e) {
    document.body.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Init state
  handleScroll();

  // 2. Mobile Menu Toggle
  const menuBtn  = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  const iconOpen  = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
  const iconClose = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  function closeMenu() {
    navbar.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = iconOpen;
  }

  function openMenu() {
    navbar.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.innerHTML = iconClose;
  }

  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navbar.classList.contains('menu-open') ? closeMenu() : openMenu();
    });

    // Close when any nav link is tapped
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    // Close when tapping outside the navbar
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) closeMenu();
    });

    // Close on scroll (feels native)
    window.addEventListener('scroll', () => {
      if (navbar.classList.contains('menu-open')) closeMenu();
    }, { passive: true });
  }

  // 2. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally stop observing after reveal
          // observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Reveal when 15% of the element is visible
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // If no IO support or prefers-reduced-motion, just make everything visible immediately
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // 3. Carousel (Handled by CSS scroll snapping now)
  // No JS needed for basic horizontal scroll behavior
  
  // 4. Current Year for Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 5. Image Protections (Disable Context Menu and Dragging)
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault());
    img.addEventListener('dragstart', e => e.preventDefault());
  });

  // 6. Contact Email Assembly (Obfuscation decryption)
  const contactLink = document.getElementById('contact-link');
  if (contactLink) {
    const u = 'devloper';
    const d = 'samartha';
    const at = '@';
    const host = 'gmail.com';
    contactLink.href = 'mailto:' + u + d + at + host;
  }
});
