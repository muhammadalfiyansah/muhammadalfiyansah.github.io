/**
 * loader.js — Splash / Loading Screen Controller
 * Handles letter-by-letter name animation, progress bar, and exit.
 */

const LOADER_DURATION = 2800;   // total ms before exit starts
const LETTER_STAGGER  = 70;     // ms between each letter animation
const EXIT_DURATION   = 800;    // ms for exit animation

/**
 * Populate the .loader__name element with individual <span> per character.
 */
function createLetters(container, text) {
  container.innerHTML = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.classList.add('loader__letter');
    if (char === ' ') {
      span.classList.add('is-space');
    } else {
      span.textContent = char;
    }
    span.style.animationDelay = `${0.4 + i * (LETTER_STAGGER / 1000)}s`;
    container.appendChild(span);
  });
}

/**
 * Animate the progress bar from 0 → 100% over the given duration.
 */
function animateProgress(fill, percentEl, duration) {
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);       // easeOutCubic
    const percent = Math.round(eased * 100);

    fill.style.width = `${percent}%`;
    if (percentEl) percentEl.textContent = `${percent}%`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

/**
 * Add the glow effect to letters once they've appeared.
 */
function addGlow(container) {
  const letters = container.querySelectorAll('.loader__letter:not(.is-space)');
  letters.forEach((letter, i) => {
    setTimeout(() => letter.classList.add('is-revealed'), 800 + i * 60);
  });
}

/**
 * Initialize the loader — call this as early as possible.
 * Only shows on fresh page load / refresh; skips on back-navigation.
 */
export function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Skip loader if already shown this session (e.g. "Back to Home")
  const STORAGE_KEY = 'loader_shown';
  if (sessionStorage.getItem(STORAGE_KEY)) {
    loader.remove();
    document.body.classList.remove('loader-active');
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, '1');

  document.body.classList.add('loader-active');

  const nameContainer = loader.querySelector('.loader__name');
  const progressFill  = loader.querySelector('.loader__progress-fill');
  const percentEl     = loader.querySelector('.loader__percent');

  // Build letter spans
  if (nameContainer) {
    createLetters(nameContainer, 'ALFI YANSAH');
    addGlow(nameContainer);
  }

  // Animate progress bar
  if (progressFill) {
    animateProgress(progressFill, percentEl, LOADER_DURATION);
  }

  // Exit after duration
  setTimeout(() => {
    loader.classList.add('loader--hidden');

    setTimeout(() => {
      document.body.classList.remove('loader-active');
      loader.remove();
    }, EXIT_DURATION);
  }, LOADER_DURATION);
}
