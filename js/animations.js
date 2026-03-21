/**
 * animations.js — Scroll-triggered animations using IntersectionObserver
 */

/**
 * Animate skill icons when they scroll into view
 */
function initSkillIconAnimations() {
  const icons = document.querySelectorAll('.skill-icon');
  if (!icons.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  icons.forEach((icon) => observer.observe(icon));
}

/**
 * Animate skill progress bars when section scrolls into view
 * Replaces the old scroll event listener with IntersectionObserver (better performance)
 */
function initSkillBarAnimations() {
  const skillBars = document.getElementById('skills-section');
  if (!skillBars) return;

  const fills = document.querySelectorAll('.skill-bar__fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fills.forEach((fill) => {
            const value = fill.dataset.progress;
            fill.style.width = `${value}%`;

            // Animate the percentage text
            const label = fill
              .closest('.skill-bar')
              ?.querySelector('.skill-bar__percent');
            if (label) {
              animateCounter(label, 0, parseInt(value), 1000);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillBars);
}

/**
 * Animate a number counting up (replaces CSS content animations)
 * @param {HTMLElement} element - Element to update text of
 * @param {number} start - Starting number
 * @param {number} end - Ending number
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out curve
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);

    element.textContent = `${current}%`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

export function initAnimations() {
  initSkillIconAnimations();
  initSkillBarAnimations();
}
