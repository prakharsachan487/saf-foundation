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

/* ==================== 5. ACTIONS & PAYMENT GATEWAY ==================== */
function initActionButtons() {
  function closeDrawerIfOpen() {
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open Payment Gateway Modal
  document.querySelectorAll('[data-open-donate]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawerIfOpen();
      const campaign = btn.getAttribute('data-campaign-title') || 'Grassroots Impact Fund';
      openPaymentGateway(campaign);
    });
  });

  // Hero Donation QR Card: UPI Copy Button
  const copyHeroUpiBtn = document.getElementById('copyHeroUpiBtn');
  copyHeroUpiBtn?.addEventListener('click', () => {
    const upiId = document.getElementById('upiIdValue')?.textContent?.trim() || 'safoundation@sbi';
    navigator.clipboard.writeText(upiId).then(() => {
      showToast(`UPI ID "${upiId}" copied to clipboard! Paste it in Google Pay, PhonePe or Paytm to donate.`, 'Copied to Clipboard 📋', 'fa-circle-check');
      const span = copyHeroUpiBtn.querySelector('span');
      if (span) {
        const orig = span.textContent;
        span.textContent = 'Copied!';
        setTimeout(() => { span.textContent = orig; }, 2000);
      }
    }).catch(() => {
      showToast(`Official UPI ID: ${upiId}`, 'UPI ID', 'fa-wallet');
    });
  });

  // Hero Donation QR Card: Quick Amount Buttons
  document.querySelectorAll('.quick-amt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amt = btn.getAttribute('data-amt');
      document.querySelectorAll('.quick-amt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      openPaymentGateway('General Grassroots Fund', amt);
    });
  });
}

/* ==================== 5.2. INTERACTIVE UPI DONATION & DYNAMIC QR ENGINE ==================== */
let currentDonationState = {
  amount: 1000,
  campaign: 'Grassroots Development',
  name: '',
  email: '',
  phone: ''
};

function ensurePaymentModalExists() {
  let modal = document.getElementById('donationPaymentModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'donationPaymentModal';
    modal.className = 'modal-backdrop';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.style.display = 'none';

    modal.innerHTML = `
      <div class="payment-modal-dialog">
        <!-- Compact Header -->
        <div class="payment-modal-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <img src="assets/images/logo-icon.png" alt="SAF Logo" style="height:26px; width:26px; border-radius:50%; background:#fff;">
            <h3 id="payModalCampaignTitle" style="font-size:0.98rem; font-weight:700; color:#FFFFFF; margin:0;">Support S. A. Foundation</h3>
          </div>
          <button class="modal-close-btn" id="payModalClose" aria-label="Close dialog">&times;</button>
        </div>

        <!-- Body Container -->
        <div class="payment-modal-body" id="payModalBody">
          <!-- Rendered by JS -->
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#payModalClose')?.addEventListener('click', closePaymentGateway);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePaymentGateway();
    });
  }
  return modal;
}

function openPaymentGateway(campaign = 'Grassroots Development', prefilledAmount = 1000) {
  const modal = ensurePaymentModalExists();
  currentDonationState.campaign = campaign;
  currentDonationState.amount = Number(prefilledAmount) || 1000;
  
  const titleEl = modal.querySelector('#payModalCampaignTitle');
  if (titleEl) titleEl.textContent = `${campaign}`;

  renderInteractiveDonationModal();
  modal.style.display = 'flex';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePaymentGateway() {
  const modal = document.getElementById('donationPaymentModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function drawDynamicModalQR(amt, campaign = 'Grassroots Aid') {
  const canvas = document.getElementById('modalDynamicQrCanvas');
  if (!canvas) return;

  const upiPayload = `upi://pay?pa=safoundation@sbi&pn=S.%20A.%20Foundation&am=${amt}&cu=INR&tn=${encodeURIComponent('Donation for ' + campaign)}`;

  if (window.QRCode && typeof window.QRCode.toCanvas === 'function') {
    window.QRCode.toCanvas(canvas, upiPayload, {
      width: 140,
      margin: 1,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    }, function (error) {
      if (error) {
        console.error('QR Render Error:', error);
        return;
      }
      // Draw centered logo badge
      const ctx = canvas.getContext('2d');
      const logo = new Image();
      logo.onload = () => {
        const size = 30;
        const center = (canvas.width - size) / 2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, (size / 2) + 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#F59E0B';
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logo, center, center, size, size);
        ctx.restore();
      };
      logo.src = 'assets/images/logo-icon.png';
    });
  }
}

function launchUpiApp(appName) {
  const amt = currentDonationState.amount || 1000;
  const campaign = currentDonationState.campaign || 'Grassroots Aid';
  const encodedCampaign = encodeURIComponent('Donation for ' + campaign);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isMobile = isAndroid || isIOS || window.innerWidth <= 768;

  const genericUpi = `upi://pay?pa=safoundation@sbi&pn=S.%20A.%20Foundation&am=${amt}&cu=INR&tn=${encodedCampaign}`;

  let targetUrl = genericUpi;

  if (isAndroid) {
    if (appName === 'gpay') {
      targetUrl = `intent://pay?pa=safoundation@sbi&pn=S.%20A.%20Foundation&am=${amt}&cu=INR&tn=${encodedCampaign}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end;`;
    } else if (appName === 'phonepe') {
      targetUrl = `intent://pay?pa=safoundation@sbi&pn=S.%20A.%20Foundation&am=${amt}&cu=INR&tn=${encodedCampaign}#Intent;scheme=upi;package=com.phonepe.app;end;`;
    } else if (appName === 'paytm') {
      targetUrl = `intent://pay?pa=safoundation@sbi&pn=S.%20A.%20Foundation&am=${amt}&cu=INR&tn=${encodedCampaign}#Intent;scheme=upi;package=net.one97.paytm;end;`;
    } else if (appName === 'bhim') {
      targetUrl = `intent://pay?pa=safoundation@sbi&pn=S.%20A.%20Foundation&am=${amt}&cu=INR&tn=${encodedCampaign}#Intent;scheme=upi;package=in.org.npci.upiapp;end;`;
    }
  } else if (isIOS) {
    if (appName === 'gpay') {
      targetUrl = `tez://upi/pay?pa=safoundation@sbi&pn=S.%20A.%20Foundation&am=${amt}&cu=INR&tn=${encodedCampaign}`;
    } else if (appName === 'phonepe') {
      targetUrl = `phonepe://pay?pa=safoundation@sbi&pn=S.%20A.%20Foundation&am=${amt}&cu=INR&tn=${encodedCampaign}`;
    } else if (appName === 'paytm') {
      targetUrl = `paytmmp://pay?pa=safoundation@sbi&pn=S.%20A.%20Foundation&am=${amt}&cu=INR&tn=${encodedCampaign}`;
    } else {
      targetUrl = genericUpi;
    }
  }

  if (isMobile) {
    const start = Date.now();
    window.location.href = targetUrl;
    
    // Fallback to standard UPI picker if specific app doesn't launch
    setTimeout(() => {
      if (Date.now() - start < 1500 && targetUrl !== genericUpi) {
        window.location.href = genericUpi;
      }
    }, 900);
  } else {
    // Desktop: copy UPI ID and show helpful guidance
    navigator.clipboard.writeText('safoundation@sbi').catch(() => {});
    showToast(`Amount ₹${amt.toLocaleString('en-IN')} & UPI ID safoundation@sbi ready! Scan the QR with ${appName.toUpperCase()} on your phone.`, `${appName.toUpperCase()} Ready 📱`, 'fa-mobile-screen-button');
  }
}

function renderInteractiveDonationModal() {
  const body = document.getElementById('payModalBody');
  if (!body) return;

  const amt = currentDonationState.amount;

  body.innerHTML = `
    <div>
      <!-- 1. Central Dynamic QR Scanner Card (TOP) -->
      <div class="qr-display-card">
        <div class="qr-code-frame">
          <canvas id="modalDynamicQrCanvas" width="140" height="140" style="display:block; border-radius:6px;"></canvas>
          <div class="qr-laser-line"></div>
        </div>

        <div style="font-size:0.92rem; font-weight:800; color:var(--navy-heading); margin-bottom:0.35rem;">
          Scan to Pay <span style="color:#059669;" id="qrAmtDisplay">₹${amt.toLocaleString('en-IN')}</span>
        </div>

        <!-- Verified UPI ID with One-Click Copy -->
        <div>
          <div class="upi-copy-pill" id="modalCopyUpiBtn" title="Click to copy official UPI ID">
            <span style="color:var(--text-muted); font-size:0.75rem;">UPI:</span>
            <span id="modalUpiText" style="font-family:monospace; font-size:0.82rem; font-weight:700;">safoundation@sbi</span>
            <div class="upi-copy-btn-icon" id="modalCopyIcon">
              <i class="fa-solid fa-copy"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Amount Selection (BELOW QR) -->
      <div class="amount-select-section">
        <div class="amount-pill-grid">
          <button type="button" class="amt-pill-btn ${amt === 500 ? 'active' : ''}" data-amt="500">₹500</button>
          <button type="button" class="amt-pill-btn ${amt === 1000 ? 'active' : ''}" data-amt="1000">₹1,000</button>
          <button type="button" class="amt-pill-btn ${amt === 2500 ? 'active' : ''}" data-amt="2500">₹2,500</button>
          <button type="button" class="amt-pill-btn ${amt === 5000 ? 'active' : ''}" data-amt="5000">₹5,000</button>
        </div>

        <!-- Custom Amount Input -->
        <div class="custom-amt-input-wrap">
          <span class="custom-amt-symbol">₹</span>
          <input type="number" id="modalCustomAmtInput" class="custom-amt-field" placeholder="Custom amount" value="${amt}" min="50">
        </div>
      </div>

      <!-- 3. Direct 1-Tap Mobile UPI Launcher -->
      <div class="upi-app-launcher-row">
        <button type="button" class="upi-app-btn" data-app="gpay">
          <i class="fa-brands fa-google-pay" style="font-size:1.15rem; color:#4285F4;"></i>
          <span>GPay</span>
        </button>
        <button type="button" class="upi-app-btn" data-app="phonepe">
          <i class="fa-solid fa-mobile-screen-button" style="font-size:1rem; color:#5F259F;"></i>
          <span>PhonePe</span>
        </button>
        <button type="button" class="upi-app-btn" data-app="paytm">
          <i class="fa-solid fa-wallet" style="font-size:1rem; color:#00B9F5;"></i>
          <span>Paytm</span>
        </button>
        <button type="button" class="upi-app-btn" data-app="bhim">
          <i class="fa-solid fa-building-columns" style="font-size:1rem; color:#EC4624;"></i>
          <span>BHIM</span>
        </button>
      </div>

      <!-- 4. Action & Bank Details -->
      <div style="display:flex; flex-direction:column; gap:6px; margin-top:0.75rem;">
        <button type="button" id="btnToggleBankDetails" style="background:none; border:none; color:var(--text-muted); font-size:0.75rem; font-weight:600; cursor:pointer; text-decoration:underline; padding:2px;">
          Need Direct Bank Transfer (NEFT / RTGS) Details?
        </button>

        <!-- Hidden Bank Details Box -->
        <div id="bankDetailsBox" style="display:none; background:#FFFFFF; border:1px solid #CBD5E1; border-radius:10px; padding:0.75rem; margin-top:0.25rem; font-size:0.78rem;">
          <h5 style="margin:0 0 4px 0; color:var(--navy-heading); font-size:0.82rem;">Official Charitable Bank Account:</h5>
          <div style="line-height:1.5; color:var(--text-body);">
            <strong>Account Name:</strong> S. A. FOUNDATION<br>
            <strong>Bank:</strong> State Bank of India<br>
            <strong>Account Number:</strong> 39820194821<br>
            <strong>IFSC Code:</strong> SBIN0001234
          </div>
        </div>

        <div style="font-size:0.73rem; color:var(--text-muted); text-align:center; margin-top:0.3rem;">
          <i class="fa-solid fa-shield-halved" style="color:#059669;"></i> 100% Direct Grassroots Impact &bull; S. A. Foundation
        </div>
      </div>
    </div>
  `;

  // Draw Dynamic QR Code with selected amount
  drawDynamicModalQR(amt, currentDonationState.campaign);

  // Attach Amount Pill Click Handlers
  body.querySelectorAll('.amt-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedAmt = parseInt(btn.getAttribute('data-amt'));
      currentDonationState.amount = selectedAmt;
      
      body.querySelectorAll('.amt-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const customInput = document.getElementById('modalCustomAmtInput');
      if (customInput) customInput.value = selectedAmt;

      updateLiveModalAmounts(selectedAmt);
    });
  });

  // Attach Custom Amount Input Handler
  const customInput = document.getElementById('modalCustomAmtInput');
  customInput?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value) || 0;
    currentDonationState.amount = val;
    
    body.querySelectorAll('.amt-pill-btn').forEach(b => {
      if (parseInt(b.getAttribute('data-amt')) === val) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    updateLiveModalAmounts(val);
  });

  // Attach 1-Tap App Launcher Handlers
  body.querySelectorAll('.upi-app-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const app = btn.getAttribute('data-app');
      launchUpiApp(app);
    });
  });

  // Attach UPI Copy Button Handler
  const copyBtn = document.getElementById('modalCopyUpiBtn');
  copyBtn?.addEventListener('click', () => {
    const upi = 'safoundation@sbi';
    navigator.clipboard.writeText(upi).then(() => {
      const icon = document.getElementById('modalCopyIcon');
      const text = document.getElementById('modalUpiText');
      if (icon) icon.innerHTML = `<i class="fa-solid fa-check" style="color:#059669;"></i>`;
      if (text) text.innerHTML = `<span style="color:#059669; font-weight:800;">Copied!</span>`;
      showToast('UPI ID "safoundation@sbi" copied to clipboard.', 'Copied! 📋', 'fa-circle-check');
      
      setTimeout(() => {
        if (icon) icon.innerHTML = `<i class="fa-solid fa-copy"></i>`;
        if (text) text.textContent = 'safoundation@sbi';
      }, 2500);
    }).catch(() => {
      showToast('UPI ID: safoundation@sbi', 'UPI ID', 'fa-wallet');
    });
  });

  // Toggle Bank Details
  document.getElementById('btnToggleBankDetails')?.addEventListener('click', () => {
    const box = document.getElementById('bankDetailsBox');
    if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
  });
}

function updateLiveModalAmounts(amt) {
  const qrDisplay = document.getElementById('qrAmtDisplay');
  if (qrDisplay) qrDisplay.textContent = `₹${amt.toLocaleString('en-IN')}`;

  // Redraw QR Code with new amount encoded inside payload
  drawDynamicModalQR(amt, currentDonationState.campaign);
}

/* ==================== 5.5. INTERACTIVE 3D GALLERY & LIGHTBOX ==================== */
function initInteractiveGallery() {
  const stageCards = document.querySelectorAll('.gallery-3d-card');
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');

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

  // 1. Update 3D Stage Positions
  function update3DStage() {
    if (!stageCards.length) return;

    stageCards.forEach((card, idx) => {
      card.classList.remove('pos-center', 'pos-left', 'pos-right', 'pos-far-left', 'pos-far-right', 'pos-hidden');

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
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    update3DStage();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    update3DStage();
  }

  // 2. Card click interaction
  stageCards.forEach((card) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('pos-center')) {
        openLightbox({
          img: card.getAttribute('data-img'),
          title: card.getAttribute('data-title'),
          desc: card.getAttribute('data-desc'),
          location: card.getAttribute('data-location')
        });
      } else if (card.classList.contains('pos-left') || card.classList.contains('pos-far-left')) {
        prevSlide();
        resetAutoplay();
      } else if (card.classList.contains('pos-right') || card.classList.contains('pos-far-right')) {
        nextSlide();
        resetAutoplay();
      }
    });
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  // 3. Smooth Autoplay Loop
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, 4500);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  function resetAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, 6000);
  }

  update3DStage();
  startAutoplay();

  // 4. Lightbox Helper
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
      startAutoplay();
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
      resetAutoplay();
    } else if (e.key === 'ArrowLeft' && (!modal || !modal.classList.contains('active'))) {
      prevSlide();
      resetAutoplay();
    }
  });
}

/* ==================== 6. NEWSLETTER & TOASTS ==================== */
function initNewsletter() {
  const newsletterForms = document.querySelectorAll('#newsletterForm');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput?.value?.trim();
      if (!email) return;

      const subscribers = JSON.parse(localStorage.getItem('saf_subscribers') || '[]');
      if (!subscribers.find(s => s.email === email)) {
        subscribers.unshift({
          email: email,
          date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
        });
        localStorage.setItem('saf_subscribers', JSON.stringify(subscribers));
      }

      showToast(`Thank you! ${email} has been registered for official SAF Foundation dispatches.`, 'Subscribed Successfully ✨', 'fa-circle-check');
      form.reset();
    });
  });
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
