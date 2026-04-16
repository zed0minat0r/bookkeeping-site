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
     SCROLL REVEAL (fade, scale, left, right)
  ------------------------------------------------------- */
  var allRevealClasses = '.reveal-fade, .reveal-up, .reveal-left, .reveal-right';

  if (!prefersReduced) {
    var revealEls = document.querySelectorAll(allRevealClasses);
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
    document.querySelectorAll(allRevealClasses).forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* -------------------------------------------------------
     WHY CARDS — staggered cascade (override inline --d)
  ------------------------------------------------------- */
  var whyCards = document.querySelectorAll('.why-card');
  whyCards.forEach(function (card, i) {
    card.style.setProperty('--d', (i * 0.12) + 's');
  });

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
  ------------------------------------------------------- */
  var servicesSection = document.querySelector('.services-section');
  var servicesTrack = document.querySelector('.services-track');
  var servicesTrackWrap = document.querySelector('.services-track-wrap');
  var progressBar = document.querySelector('.services-progress-bar');
  var scrollHint = document.querySelector('.services-scroll-hint');

  function initServicesScroll() {
    if (!servicesSection || !servicesTrack || !servicesTrackWrap) return;

    if (window.innerWidth <= 768) {
      servicesTrack.style.transform = 'none';
      return;
    }

    if (prefersReduced) {
      servicesSection.style.height = 'auto';
      var stickyInner = servicesSection.querySelector('.services-sticky-inner');
      if (stickyInner) {
        stickyInner.style.position = 'relative';
        stickyInner.style.height = 'auto';
        stickyInner.style.overflow = 'visible';
      }
      return;
    }

    servicesTrack.style.transform = 'translateX(0)';

    var sectionTop = 0;
    var sectionH = 0;
    var trackW = 0;
    var wrapW = 0;

    function measureLayout() {
      sectionTop = servicesSection.getBoundingClientRect().top + window.scrollY;
      sectionH = servicesSection.offsetHeight;
      trackW = servicesTrack.scrollWidth;
      wrapW = servicesTrackWrap.clientWidth;
    }

    function onScroll() {
      var viewH = window.innerHeight;
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
      var maxTranslate = Math.max(trackW - wrapW, 0);
      var tx = progress * maxTranslate;
      servicesTrack.style.transform = 'translateX(-' + tx + 'px)';

      if (progressBar) progressBar.style.width = (progress * 100) + '%';
      if (scrollHint) scrollHint.style.opacity = progress > 0.04 ? '0' : '';
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    window.addEventListener('resize', function () {
      if (window.innerWidth <= 768) {
        servicesTrack.style.transform = 'none';
        return;
      }
      measureLayout();
      onScroll();
    }, { passive: true });

    window.addEventListener('load', function () {
      measureLayout();
      onScroll();
    });

    measureLayout();
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
     HERO PARALLAX — orbs + photo depth
  ------------------------------------------------------- */
  if (!prefersReduced) {
    var heroOrb1 = document.querySelector('.orb-1');
    var heroOrb2 = document.querySelector('.orb-2');
    var heroOrb3 = document.querySelector('.orb-3');
    var heroPhotoImg = document.querySelector('.hero-photo-img');
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var y = window.scrollY;
          if (heroOrb1) heroOrb1.style.transform = 'translateY(' + (y * 0.14) + 'px)';
          if (heroOrb2) heroOrb2.style.transform = 'translateY(' + (-y * 0.09) + 'px)';
          if (heroOrb3) heroOrb3.style.transform = 'translateY(' + (y * 0.06) + 'px)';
          /* Subtle parallax on the hero photo */
          if (heroPhotoImg) {
            heroPhotoImg.style.transform = 'translateY(' + (y * 0.18) + 'px) scale(1.02)';
          }
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
      btn.style.opacity = '0.75';
      btn.style.animation = 'none';

      setTimeout(function () {
        btn.innerHTML = 'Request Sent! <span class="btn-arrow">&#10003;</span>';
        btn.style.background = '#16a34a';
        btn.style.boxShadow = '0 4px 32px rgba(22,163,74,0.5)';
        btn.style.opacity = '1';
        setTimeout(function () {
          form.reset();
          btn.innerHTML = originalHTML;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.boxShadow = '';
          btn.style.animation = '';
        }, 3000);
      }, 1200);
    });
  }

})();

/* ---- Scroll Journey Bar ---- */
(function() {
  var bar = document.getElementById('scrollJourney');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();
