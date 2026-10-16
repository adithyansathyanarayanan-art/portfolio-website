/* =========================================================
   Phone menu — on narrow screens the Work / About / Contact links
   fold into a full-screen overlay, opened by the menu button.
   Shared by every page. Without this script the links simply stay
   visible in a row, so the site still works.
   ========================================================= */
(() => {
  const sidebar = document.querySelector('.sidebar');
  const toggle = sidebar && sidebar.querySelector('.menu-toggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  const label = toggle.querySelector('.menu-toggle-label');
  // switches on the menu styles — without the fade-out, so the links don't flash up on load
  nav.style.transition = 'none';
  sidebar.classList.add('has-menu');
  void nav.offsetWidth;
  nav.style.transition = '';

  const isOpen = () => sidebar.classList.contains('menu-open');
  function setOpen(open) {
    sidebar.classList.toggle('menu-open', open);
    document.documentElement.classList.toggle('menu-is-open', open); // stops the page scrolling behind
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close' : 'Menu';
  }

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Choosing a link:
  //  - another page: the menu stays up and the next page simply replaces it
  //    (closing it first flashed the old page for a moment — a jitter)
  //  - a part of this page (e.g. Introduction / Work / Contact on the home page):
  //    the menu closes and the page glides to that part
  //  - the page you're already on: the menu closes and the page glides back to
  //    its top, instead of jumping to an anchor part-way down
  const samePath = (p) => p.replace(/\/index\.html$/, '/');
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) {
      if (e.target === nav) setOpen(false); // tapped the empty overlay
      return;
    }
    if (samePath(link.pathname) === samePath(location.pathname)) {
      e.preventDefault();
      setOpen(false);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const part = link.hash && document.querySelector(link.hash);
      // the home page's strip takes it from there (index.html); anywhere else, a plain scroll
      const handled = part && !part.dispatchEvent(new CustomEvent('menu:go', { bubbles: true, cancelable: true }));
      if (part && !handled) part.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start', inline: 'start' });
      else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  });

  // Coming back with the browser's Back button can restore the page exactly as it
  // was left — menu open — so close it then
  window.addEventListener('pageshow', (e) => { if (e.persisted) setOpen(false); });

  // Tapping anywhere else, or Escape, closes it
  document.addEventListener('click', (e) => { if (isOpen() && !sidebar.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Widening the window to the desktop sidebar closes it too
  window.matchMedia('(min-width: 601px), (orientation: landscape) and (max-height: 500px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
})();
