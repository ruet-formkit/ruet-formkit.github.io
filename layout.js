/**
 * RUET FormKit — layout.js
 * Loads header.html + footer.html, manages dark mode, active nav links, sidebar.
 *
 * Usage: include this script in each page via:
 *   <script src="layout.js" data-page="course-registration"></script>
 *
 * The data-page attribute must match one of the nav-link data-page values:
 *   course-registration | form-fillup | cgpa-calculator
 */

(function () {
  'use strict';

  /* ── Config ───────────────────────────────────────────────── */
  const THEME_KEY  = 'ruetFormkit_theme';   // localStorage key
  const DARK_CLASS = 'dark';

  /* ── Helpers ──────────────────────────────────────────────── */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* Determine current page from script tag attribute */
  function currentPage() {
    const script = document.currentScript ||
      $('script[data-page]');
    return script ? script.getAttribute('data-page') : null;
  }
  const PAGE = currentPage();

  /* ── Theme ────────────────────────────────────────────────── */
  function prefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function savedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch { return null; }
  }

  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch {}
  }

  function initTheme() {
    const saved = savedTheme();
    const dark  = saved ? (saved === 'dark') : prefersDark();
    applyTheme(dark);
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(!isDark);
  }

  /* ── Fetch partials ───────────────────────────────────────── */
  async function fetchHTML(url) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.text();
    } catch (e) {
      console.warn(`[FormKit] Could not fetch ${url}:`, e.message);
      return null;
    }
  }

  /* ── Inject Header ────────────────────────────────────────── */
  function injectHeader(html) {
    const placeholder = document.getElementById('fk-header');
    if (!placeholder) return;
    placeholder.outerHTML = html;
    // Wire up active links
    markActive();
    // Wire toggle
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
    // Wire sidebar
    initSidebar();
  }

  /* ── Inject Footer ────────────────────────────────────────── */
  function injectFooter(html) {
    const placeholder = document.getElementById('fk-footer');
    if (!placeholder) return;
    placeholder.outerHTML = html;
    // Year is set inside footer.html via inline script
  }

  /* ── Mark Active Nav ──────────────────────────────────────── */
  function markActive() {
    if (!PAGE) return;
    $$('[data-page]').forEach(el => {
      if (el.getAttribute('data-page') === PAGE && !el.classList.contains('brand')) {
        el.classList.add('active');
        el.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ── Sidebar ──────────────────────────────────────────────── */
  function initSidebar() {
    const ham      = document.getElementById('hamburger');
    const sidebar  = document.getElementById('mobileSidebar');
    const overlay  = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('sidebarClose');
    if (!ham || !sidebar || !overlay) return;

    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      sidebar.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
      ham.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Focus trap: first link
      const first = sidebar.querySelector('a, button');
      if (first) setTimeout(() => first.focus(), 60);
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('aria-hidden', 'true');
      ham.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      ham.focus();
    }

    ham.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);

    // ESC key closes sidebar
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
    });
  }

  /* ── Header scroll shadow ─────────────────────────────────── */
  function initScrollShadow() {
    const hdr = document.querySelector('.site-header');
    if (!hdr) return;
    const update = () => {
      hdr.style.boxShadow = window.scrollY > 10
        ? '0 4px 28px rgba(0,0,0,0.12)'
        : 'var(--hdr-shadow, 0 2px 20px rgba(0,0,0,0.06))';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── System theme change listener ────────────────────────── */
  function initSystemThemeWatcher() {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        // Only auto-switch if user hasn't saved a preference
        if (!savedTheme()) applyTheme(e.matches);
      });
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  async function boot() {
    // 1. Apply theme immediately (before paint) to prevent flash
    initTheme();

    // 2. Fetch header + footer in parallel
    const [hdrHTML, ftrHTML] = await Promise.all([
      fetchHTML('header.html'),
      fetchHTML('footer.html'),
    ]);

    if (hdrHTML) injectHeader(hdrHTML);
    if (ftrHTML) injectFooter(ftrHTML);

    // 3. Post-inject setup
    initScrollShadow();
    initSystemThemeWatcher();
  }

  // Run as soon as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
