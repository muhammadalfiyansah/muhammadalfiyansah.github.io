/**
 * tabs.js — Certificate / Portfolio panel switching
 */

export function initTabs() {
  const toggleBtns = document.querySelectorAll('.cp-toggle-btn');
  const panels = document.querySelectorAll('.cp-panel');

  if (!toggleBtns.length) return;

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Deactivate all
      toggleBtns.forEach((b) => b.classList.remove('tab-active'));
      panels.forEach((p) => p.classList.remove('tab-active'));

      // Activate selected
      btn.classList.add('tab-active');
      const targetPanel = document.getElementById(btn.dataset.tab);
      if (targetPanel) targetPanel.classList.add('tab-active');
    });
  });

  // Nav links that activate a specific tab (e.g. PORTFOLIO nav link)
  document.querySelectorAll('[data-activate-tab]').forEach((link) => {
    link.addEventListener('click', () => {
      const tabId = link.dataset.activateTab;
      const targetBtn = document.querySelector(`.cp-toggle-btn[data-tab="${tabId}"]`);
      if (targetBtn) {
        setTimeout(() => targetBtn.click(), 100);
      }
    });
  });
}
