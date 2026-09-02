/**
 * SAF FOUNDATION (S. A. FOUNDATION) - JAVASCRIPT CONTROLLER
 * Unified 3D Entrance, Interactive Mouse Parallax Tilt, Live Counters & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  init3DScrollObserver();
  init3DCardTilt();
  initCounters();
  initActionButtons();
  initNewsletter();
});

window.init3DCardTilt = init3DCardTilt;
window.initActionButtons = initActionButtons;
window.initCounters = initCounters;

/* ==================== 1. NAVBAR & MOBILE DRAWER ==================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  function openMobileMenu() {
    mobileDrawer?.classList.add('open');
    mobileBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  mobileDrawerClose?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/* ==================== 2. 3D SCROLL REVEAL OBSERVER ==================== */
function init3DScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal-3d');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==================== 3. INTERACTIVE 3D MOUSE TILT ON CARDS ==================== */
function init3DCardTilt() {
  const cards = document.querySelectorAll('.card-3d-interactive');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7; // Max 7 deg
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==================== 4. ANIMATED NUMBER COUNTERS ==================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.count-up');
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0');
        const duration = 2200;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // easeOutExpo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = easeProgress * target;

          el.textContent = `${prefix}${decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal).toLocaleString('en-IN')}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${prefix}${decimals > 0 ? target.toFixed(decimals) : target.toLocaleString('en-IN')}${suffix}`;
          }
        }

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}

/* ==================== 5. ACTIONS & SMOOTH SCROLL ==================== */
function initActionButtons() {
  function closeDrawerIfOpen() {
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-donate]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawerIfOpen();
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      showToast('Thank you for choosing to empower village communities! Please connect with us below for official contribution details.', 'Heartfelt Gratitude ❤️', 'fa-heart');
    });
  });

  document.querySelectorAll('[data-open-volunteer], [data-open-partner]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawerIfOpen();
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      showToast('Please connect with our official grassroots desk below.', 'Welcome Aboard 🤝', 'fa-handshake-angle');
    });
  });
}

/* ==================== 6. NEWSLETTER & TOASTS ==================== */
function initNewsletter() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]')?.value;
      showToast(`Thank you! ${email} has been subscribed to SAF Foundation updates.`, 'Subscribed Successfully ✨', 'fa-circle-check');
      newsletterForm.reset();
    });
  }
}

let toastTimeout = null;

function showToast(message, title = 'Notification', icon = 'fa-circle-check') {
  let toast = document.getElementById('liveToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'liveToast';
    toast.className = 'toast-notification-card';
    document.body.appendChild(toast);
  }

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toast.innerHTML = `
    <div class="toast-icon-wrap">
      <i class="fa-solid ${icon}" style="color:var(--accent-gold);"></i>
    </div>
    <div class="toast-body-wrap">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close-btn" onclick="hideToast()" aria-label="Close notification">&times;</button>
  `;

  // Force reflow
  void toast.offsetWidth;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    hideToast();
  }, 4500);
}

function hideToast() {
  const toast = document.getElementById('liveToast');
  if (toast) {
    toast.classList.remove('show');
  }
}

