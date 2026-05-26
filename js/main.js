/**
 * SMART PACKING PRO - Landing Page Scripts
 * Handles scroll reveal animations, sticky nav, and carousel logic.
 */

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
});
