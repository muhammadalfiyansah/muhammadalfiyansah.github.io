/**
 * navigation.js — Hamburger toggle & mobile nav behavior
 * Features: aria-expanded, body scroll lock, Escape to close, outside click
 */

export function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (!hamburger || !nav) return;

  // Toggle mobile nav
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  // Close nav when a link is clicked (mobile UX)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeNav();
    }
  });

  // Close on click outside nav and hamburger
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeNav();
    }
  });

  function closeNav() {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }
}
