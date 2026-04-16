/* =========================================================
   PERCH BOOKKEEPING — main.js
   ========================================================= */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------
     NAV SCROLL STATE
  ------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* -------------------------------------------------------
     MOBILE NAV TOGGLE
  ------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open', !expanded);
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });
    document.addEventListener('click', function (e) {
      if (header && !header.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
  }

  /* -------------------------------------------------------
     SCROLL REVEAL (fade + scale)
  ------------------------------------------------------- */
  if (!prefersReduced) {
    var revealEls = document.querySelectorAll('.reveal-fade, .reveal-up');
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    document.querySelectorAll('.reveal-fade, .reveal-up').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* -------------------------------------------------------
     ANIMATED NUMBER COUNTERS
  ------------------------------------------------------- */
  function animateCounter(el, target, duration) {
    if (prefersReduced) { el.textContent = target; return; }
    var start = 0;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counterEls = document.querySelectorAll('.stat-num[data-target]');
  if (counterEls.length) {
    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          animateCounter(el, target, 1800);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(function (el) { counterObs.observe(el); });
  }

  /* -------------------------------------------------------
     SERVICES — STICKY HORIZONTAL SCROLL
     Vertical scroll drives horizontal card movement.
     Fixed calculation: maxTranslate = scrollWidth - trackWrap clientWidth
  ------------------------------------------------------- */
  var servicesSection = document.querySelector('.services-section');
  var servicesTrack = document.querySelector('.services-track');
  var servicesTrackWrap = document.querySelector('.services-track-wrap');
  var progressBar = document.querySelector('.services-progress-bar');

  function initServicesScroll() {
    if (!servicesSection || !servicesTrack || !servicesTrackWrap) return;

    if (prefersReduced) {
      // No animation — let cards stack or show naturally
      servicesSection.style.height = 'auto';
      var stickyOuter = servicesSection.querySelector('.services-sticky-outer');
      if (stickyOuter) {
        stickyOuter.style.position = 'relative';
        stickyOuter.style.height = 'auto';
        stickyOuter.style.overflow = 'auto';
      }
      return;
    }

    // Disable native horizontal scroll since we drive it via vertical scroll
    servicesTrack.style.transform = 'translateX(0)';

    function onScroll() {
      // Get section bounds relative to document
      var rect = servicesSection.getBoundingClientRect();
      var sectionTop = rect.top + window.scrollY;
      var sectionH = servicesSection.offsetHeight;
      var viewH = window.innerHeight;

      // Sticky phase: from when section hits top to when section bottom hits viewport bottom
      var scrollStart = sectionTop;
      var scrollEnd = sectionTop + sectionH - viewH;
      var scrollRange = scrollEnd - scrollStart;

      var scrolled = window.scrollY - scrollStart;

      if (scrollRange <= 0) {
        servicesTrack.style.transform = 'translateX(0)';
        if (progressBar) progressBar.style.width = '0%';
        return;
      }

      var progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);

      // How far we need to slide: total track scrollWidth minus visible wrap width
      var trackW = servicesTrack.scrollWidth;
      var wrapW = servicesTrackWrap.clientWidth;
      var maxTranslate = Math.max(trackW - wrapW, 0);

      var tx = progress * maxTranslate;
      servicesTrack.style.transform = 'translateX(-' + tx + 'px)';

      if (progressBar) progressBar.style.width = (progress * 100) + '%';
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once after fonts/images settle
    window.addEventListener('load', onScroll);
    onScroll();
  }

  initServicesScroll();

  /* -------------------------------------------------------
     SMOOTH ANCHOR SCROLL WITH NAV OFFSET
  ------------------------------------------------------- */
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

  /* -------------------------------------------------------
     HERO PARALLAX ON PHOTO (subtle depth)
  ------------------------------------------------------- */
  if (!prefersReduced) {
    var heroOrb1 = document.querySelector('.orb-1');
    var heroOrb2 = document.querySelector('.orb-2');
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var y = window.scrollY;
          if (heroOrb1) heroOrb1.style.transform = 'translateY(' + (y * 0.15) + 'px)';
          if (heroOrb2) heroOrb2.style.transform = 'translateY(' + (-y * 0.08) + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* -------------------------------------------------------
     FORM SUBMIT
  ------------------------------------------------------- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.btn-submit');
      var originalHTML = btn.innerHTML;

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
        var firstErr = form.querySelector('[required]');
        if (firstErr) firstErr.focus();
        return;
      }

      btn.innerHTML = 'Sending...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(function () {
        btn.innerHTML = 'Request Sent! <span class="btn-arrow">&#10003;</span>';
        btn.style.background = '#16a34a';
        btn.style.boxShadow = '0 4px 32px rgba(22,163,74,0.45)';
        btn.style.opacity = '1';
        setTimeout(function () {
          form.reset();
          btn.innerHTML = originalHTML;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.boxShadow = '';
        }, 3000);
      }, 1200);
    });
  }

})();
