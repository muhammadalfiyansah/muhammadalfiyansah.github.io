/**
 * app.js — Main entry point
 * Imports and initializes all modules on DOMContentLoaded.
 */

import { initLoader } from './loader.js';
import { initNavigation } from './navigation.js';
import { initTabs } from './tabs.js';
import { initContactForm } from './form.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavigation();
  initTabs();
  initContactForm();
  initAnimations();
});
