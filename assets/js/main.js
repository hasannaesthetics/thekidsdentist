/* ──────────────────────────────────────────────────
   THE KIDS DENTIST — Main JavaScript
   ────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll shadow ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', background: 'rgba(13,27,62,0.55)',
    zIndex: '998', display: 'none', backdropFilter: 'blur(4px)'
  });
  document.body.appendChild(overlay);

  const closeNav = () => {
    navLinks?.classList.remove('open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    toggle?.setAttribute('aria-expanded', 'false');
  };

  toggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('open');
    overlay.style.display = isOpen ? 'block' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  overlay.addEventListener('click', closeNav);

  /* ── Active nav link ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('open');
        q.nextElementSibling?.classList.remove('open');
      });

      // Open this if was closed
      if (!isOpen) {
        btn.classList.add('open');
        btn.nextElementSibling?.classList.add('open');
      }
    });
  });

  /* ── Contact form ── */
  const form = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        form.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
      }, 1400);
    });
  }

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeNav();
      }
    });
  });

  /* ── Counter animation ── */
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;
          const update = () => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
            if (current < target) requestAnimationFrame(update);
          };
          update();
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

});
