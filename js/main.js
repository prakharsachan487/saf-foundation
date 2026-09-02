/**
 * SAF FOUNDATION (S. A. FOUNDATION) - JAVASCRIPT CONTROLLER
 * Unified 3D Entrance, Interactive Mouse Parallax Tilt, Live Counters & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  init3DScrollObserver();
  init3DCardTilt();
  initCounters();
  initInteractiveGallery();
  initActionButtons();
  initNewsletter();
});

window.init3DCardTilt = init3DCardTilt;
window.initActionButtons = initActionButtons;
window.initCounters = initCounters;
window.initInteractiveGallery = initInteractiveGallery;

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

/* ==================== 5.5. INTERACTIVE 3D GALLERY & LIGHTBOX ==================== */
function initInteractiveGallery() {
  const stageCards = document.querySelectorAll('.gallery-3d-card');
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');
  const counterEl = document.getElementById('gallerySlideCounter');
  const autoplayBtn = document.getElementById('galleryAutoplayBtn');
  
  const mode3DBtn = document.getElementById('mode3DShowcaseBtn');
  const modeGridBtn = document.getElementById('modeFullGridBtn');
  const exploreAllBtn = document.getElementById('exploreAllBtn');
  const collapse3DBtn = document.getElementById('collapse3DBtn');

  const stageWrap = document.getElementById('gallery3DStageWrap');
  const gridView = document.getElementById('galleryFullGridView');

  const filterBtns = document.querySelectorAll('.gallery-full-grid-view .gallery-filter-btn');
  const gridCards = document.querySelectorAll('.gallery-item-card');

  const modal = document.getElementById('galleryLightboxModal');
  const modalImg = document.getElementById('galleryModalImg');
  const modalTitle = document.getElementById('galleryModalTitle');
  const modalDesc = document.getElementById('galleryModalDesc');
  const modalLocation = document.getElementById('galleryModalLocation');
  const closeBtn = document.getElementById('galleryModalClose');
  const closeBtn2 = document.getElementById('galleryModalCloseBtn');

  let currentIndex = 0;
  const totalCards = stageCards.length;
  let autoplayTimer = null;
  let isAutoplaying = true;

  // 1. Update 3D Stage Positions
  function update3DStage() {
    if (!stageCards.length) return;

    stageCards.forEach((card, idx) => {
      // Remove all position classes
      card.classList.remove('pos-center', 'pos-left', 'pos-right', 'pos-far-left', 'pos-far-right', 'pos-hidden');

      // Relative index calculation
      let diff = (idx - currentIndex) % totalCards;
      if (diff < 0) diff += totalCards;

      if (diff === 0) {
        card.classList.add('pos-center');
      } else if (diff === 1) {
        card.classList.add('pos-right');
      } else if (diff === 2) {
        card.classList.add('pos-far-right');
      } else if (diff === totalCards - 1) {
        card.classList.add('pos-left');
      } else if (diff === totalCards - 2) {
        card.classList.add('pos-far-left');
      } else {
        card.classList.add('pos-hidden');
      }
    });

    if (counterEl) {
      counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalCards).padStart(2, '0')}`;
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    update3DStage();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    update3DStage();
  }

  // 2. 3D Card Interactions
  stageCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('pos-center')) {
        // Open Lightbox
        openLightbox({
          img: card.getAttribute('data-img'),
          title: card.getAttribute('data-title'),
          desc: card.getAttribute('data-desc'),
          location: card.getAttribute('data-location')
        });
      } else if (card.classList.contains('pos-left') || card.classList.contains('pos-far-left')) {
        prevSlide();
      } else if (card.classList.contains('pos-right') || card.classList.contains('pos-far-right')) {
        nextSlide();
      }
    });
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    pauseAutoplayTemporarily();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    pauseAutoplayTemporarily();
  });

  // 3. Autoplay Loop
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, 4000);
    isAutoplaying = true;
    if (autoplayBtn) {
      autoplayBtn.classList.add('playing');
      autoplayBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Auto 3D';
    }
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    isAutoplaying = false;
    if (autoplayBtn) {
      autoplayBtn.classList.remove('playing');
      autoplayBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play 3D';
    }
  }

  function pauseAutoplayTemporarily() {
    if (isAutoplaying) {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        nextSlide();
      }, 5500);
    }
  }

  autoplayBtn?.addEventListener('click', () => {
    if (isAutoplaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Initialize 3D carousel
  update3DStage();
  startAutoplay();

  // 4. View Mode Switching (3D Showcase <-> Full Grid)
  function show3DMode() {
    mode3DBtn?.classList.add('active');
    modeGridBtn?.classList.remove('active');
    if (stageWrap) stageWrap.style.display = 'block';
    if (gridView) gridView.classList.remove('active');
    startAutoplay();
  }

  function showGridMode() {
    modeGridBtn?.classList.add('active');
    mode3DBtn?.classList.remove('active');
    if (stageWrap) stageWrap.style.display = 'none';
    if (gridView) gridView.classList.add('active');
    stopAutoplay();
  }

  mode3DBtn?.addEventListener('click', show3DMode);
  modeGridBtn?.addEventListener('click', showGridMode);
  exploreAllBtn?.addEventListener('click', () => {
    showGridMode();
    gridView?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  collapse3DBtn?.addEventListener('click', () => {
    show3DMode();
    stageWrap?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // 5. Grid View Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      gridCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter || (filter === 'health' && (cat === 'health' || cat === 'community'))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Grid Card click for Lightbox
  gridCards.forEach(card => {
    card.addEventListener('click', () => {
      openLightbox({
        img: card.getAttribute('data-img'),
        title: card.getAttribute('data-title'),
        desc: card.getAttribute('data-desc'),
        location: card.getAttribute('data-location')
      });
    });
  });

  // 6. Lightbox Helper
  function openLightbox({ img, title, desc, location }) {
    if (modal && modalImg && modalTitle && modalDesc) {
      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      if (modalLocation) {
        modalLocation.innerHTML = `<i class="fa-solid fa-location-dot" style="color:var(--accent-gold);"></i> ${location}`;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      stopAutoplay();
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (stageWrap && stageWrap.style.display !== 'none') {
        startAutoplay();
      }
    }
  }

  closeBtn?.addEventListener('click', closeModal);
  closeBtn2?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    } else if (e.key === 'ArrowRight' && (!modal || !modal.classList.contains('active'))) {
      nextSlide();
    } else if (e.key === 'ArrowLeft' && (!modal || !modal.classList.contains('active'))) {
      prevSlide();
    }
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

