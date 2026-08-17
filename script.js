/**
 * Pathak Web Works — Interactive UI
 */

(function () {
  'use strict';

  // ── Sticky Nav with Glassmorphism ──
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navDrawer = document.getElementById('navDrawer');

  function handleScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile nav drawer
  navToggle.addEventListener('click', () => {
    const isOpen = navDrawer.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navDrawer.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // ── Scroll Reveal Animations ──
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), Number(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ── Hero Device Viewport Toggles ──
  const deviceScreen = document.getElementById('deviceScreen');
  const viewportBtns = document.querySelectorAll('.viewport-btn');

  viewportBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      viewportBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      deviceScreen.classList.remove('view-tablet', 'view-mobile');
      const view = btn.dataset.view;
      if (view === 'tablet') deviceScreen.classList.add('view-tablet');
      if (view === 'mobile') deviceScreen.classList.add('view-mobile');
    });
  });

  // ── Portfolio Filter Tabs ──
  const tabs = document.querySelectorAll('.tab');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;
      portfolioCards.forEach((card) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;
        card.classList.toggle('hidden', !show);
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
        }
      });
    });
  });

  // ── Pricing Plan Selection ──
  const planPrices = { starter: 499, business: 1499, ecommerce: 2999 };
  let basePrice = 499;

  document.querySelectorAll('.select-plan').forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      basePrice = planPrices[plan] || 499;
      updateEstimate();

      document.querySelectorAll('.select-plan').forEach((b) => {
        b.closest('.pricing-card')?.classList.remove('selected');
      });
      btn.closest('.pricing-card')?.classList.add('selected');

      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Scope Estimator ──
  const estPrice = document.getElementById('estPrice');
  const checkboxes = document.querySelectorAll('.estimator-options input[type="checkbox"]');

  function updateEstimate() {
    let total = basePrice;
    checkboxes.forEach((cb) => {
      if (cb.checked) total += Number(cb.dataset.cost);
    });
    estPrice.textContent = '$' + total.toLocaleString();
  }

  checkboxes.forEach((cb) => cb.addEventListener('change', updateEstimate));

  // ── Contact Form ──
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const budgetSelect = document.getElementById('budget');
  const serviceTypeInput = document.getElementById('serviceType');
  const formSuccess = document.getElementById('formSuccess');

  // Service chips
  const chips = document.querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      serviceTypeInput.value = chip.dataset.value;
    });
  });

  // File upload label
  const briefInput = document.getElementById('brief');
  const fileName = document.getElementById('fileName');

  briefInput.addEventListener('change', () => {
    fileName.textContent = briefInput.files.length
      ? briefInput.files[0].name
      : 'Drop file or click to upload';
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, errorEl, message) {
    input.classList.add('error');
    errorEl.textContent = message;
  }

  function clearError(input, errorEl) {
    input.classList.remove('error');
    errorEl.textContent = '';
  }

  nameInput.addEventListener('input', () => clearError(nameInput, document.getElementById('nameError')));
  emailInput.addEventListener('input', () => clearError(emailInput, document.getElementById('emailError')));
  budgetSelect.addEventListener('change', () => clearError(budgetSelect, document.getElementById('budgetError')));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, document.getElementById('nameError'), 'Name is required');
      valid = false;
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, document.getElementById('emailError'), 'Email is required');
      valid = false;
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, document.getElementById('emailError'), 'Please enter a valid email');
      valid = false;
    }

    if (!budgetSelect.value) {
      showError(budgetSelect, document.getElementById('budgetError'), 'Please select a budget range');
      valid = false;
    }

    if (!valid) return;

    formSuccess.hidden = false;
    form.reset();
    chips.forEach((c) => c.classList.remove('active'));
    serviceTypeInput.value = '';
    fileName.textContent = 'Drop file or click to upload';

    setTimeout(() => {
      formSuccess.hidden = true;
    }, 5000);
  });

  // ── Smooth scroll — internal section links only (#services, #contact, etc.) ──
  document.querySelectorAll('a[href^="#"]:not([target="_blank"])').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── External & new-tab links — enforce security attrs ──
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute('rel', 'noopener noreferrer');
  });
})();
