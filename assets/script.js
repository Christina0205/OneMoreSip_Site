/* ============================================================
   ONE MORE SIP — scroll behaviour
   The page gets progressively "drunk" as you scroll:
   the Drunk Level HUD climbs, and the body tilts & drifts.
   Honours prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var drunkValue = document.getElementById('drunkValue');
  var drunkFill  = document.getElementById('drunkFill');
  var body       = document.body;

  // Map scroll position (0..1) to a drunk level 0..10
  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;

    var level = Math.round(p * 10);
    if (drunkValue) drunkValue.textContent = level;
    if (drunkFill)  drunkFill.style.width = (p * 100) + '%';

    if (!reduce) {
      // Warp grows with drunkenness, then a gentle oscillation on top
      var t = Date.now() / 1000;
      var tilt  = (p * 1.6) * Math.sin(t * 0.7);      // up to ~1.6deg sway
      var drift = (p * 14) * Math.sin(t * 0.5);        // up to ~14px drift
      var aberr = p * 2.2;                             // chromatic hint
      body.style.setProperty('--tilt', tilt.toFixed(3) + 'deg');
      body.style.setProperty('--drift', drift.toFixed(2) + 'px');
      body.style.setProperty('--aberr', aberr.toFixed(2) + 'px');
    }
  }

  var ticking = false;
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
      ticking = true;
    }
  }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);

  // keep the gentle sway alive even when not scrolling
  if (!reduce) {
    setInterval(requestTick, 90);
  }

  // Reveal sections as they enter the viewport
  var sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    sections.forEach(function (s) { io.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add('in'); });
  }

  onScroll();
})();
