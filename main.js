/* =========================================================
   PERCH BOOKKEEPING — main.js
   ========================================================= */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- NAV SCROLL STATE ---------- */
  const header = document.querySelector('.site-header');
  function updateHeaderShadow() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  updateHeaderShadow();
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open', !expanded);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  if (!prefersReduced) {
    const revealEls = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Immediately show all
    document.querySelectorAll('.reveal-up').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- NUMBER COUNTERS ---------- */
  function animateCounter(el, target, duration) {
    if (prefersReduced) { el.textContent = target; return; }
    var start = 0;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      // Ease out quad
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counterEls = document.querySelectorAll('.trust-num[data-target]');
  if (counterEls.length > 0) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          animateCounter(el, target, 1800);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- FORM SUBMIT ---------- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('.btn-submit');
      var originalText = btn.textContent;

      // Simple validation
      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        }
      });

      if (!valid) {
        var firstErr = form.querySelector('[required][style]');
        if (firstErr) firstErr.focus();
        return;
      }

      btn.textContent = 'Sending...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      // Simulate submission — swap in success state
      setTimeout(function () {
        btn.textContent = 'Request Sent!';
        btn.style.background = '#16a34a';
        btn.style.boxShadow = '0 4px 20px rgba(22,163,74,0.35)';
        btn.style.opacity = '1';

        setTimeout(function () {
          form.reset();
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.boxShadow = '';
        }, 3000);
      }, 1200);
    });
  }

  /* ---------- SMOOTH ANCHOR OFFSET (nav height) ---------- */
  if (!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = this.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 68;
        var top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ---------- HERO PARALLAX (subtle) ---------- */
  if (!prefersReduced) {
    var heroUnsplash = document.querySelector('.hero-unsplash');
    if (heroUnsplash) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (!ticking) {
          requestAnimationFrame(function () {
            var y = window.scrollY;
            heroUnsplash.style.transform = 'translateY(' + y * 0.25 + 'px)';
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }

})();
