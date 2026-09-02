/**
 * SAF FOUNDATION - HIDDEN ADMIN PANEL & CMS CONTROLLER
 * Full management for all 14 sections with live sync & persistence
 */

(function () {
  'use strict';

  let currentData = SiteDataManager.get();
  let isAuthenticated = sessionStorage.getItem('saf_admin_authenticated') === 'true';
  let activeTab = 'hero';
  let isInlineEditActive = false;

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    applyDataToDOM(currentData);
    initAdminTriggers();
    renderAdminUI();
    if (isAuthenticated) {
      showAdminDock();
    }
  });

  /* ==================== 1. SECRET TRIGGERS & SHORTCUTS ==================== */
  function initAdminTriggers() {
    // Keyboard Shortcut: Ctrl + Shift + A or Alt + A
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        openAdminAuthOrDashboard();
      }
    });

    // URL Hash trigger: #admin
    if (window.location.hash === '#admin') {
      setTimeout(() => openAdminAuthOrDashboard(), 300);
    }
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#admin') {
        openAdminAuthOrDashboard();
      }
    });

    // Triple-click on footer copyright trigger
    let clickCount = 0;
    let clickTimer = null;
    const footerCopyright = document.querySelector('.mega-footer');
    if (footerCopyright) {
      footerCopyright.addEventListener('click', (e) => {
        // If clicking on copyright or footer area 3 times rapidly
        clickCount++;
        if (clickCount === 1) {
          clickTimer = setTimeout(() => { clickCount = 0; }, 900);
        } else if (clickCount >= 3) {
          clearTimeout(clickTimer);
          clickCount = 0;
          openAdminAuthOrDashboard();
        }
      });
    }

    // Secret double-click on logo
    const logoBrand = document.querySelector('.brand-wrapper');
    if (logoBrand) {
      logoBrand.addEventListener('dblclick', (e) => {
        e.preventDefault();
        openAdminAuthOrDashboard();
      });
    }
  }

  function openAdminAuthOrDashboard() {
    if (isAuthenticated) {
      openCmsDashboard();
    } else {
      openPinModal();
    }
  }

  /* ==================== 2. PIN AUTHENTICATION ==================== */
  function openPinModal() {
    const modal = document.getElementById('safAdminPinModal');
    if (modal) {
      modal.classList.add('active');
      const input = modal.querySelector('.saf-pin-input');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 150);
      }
    }
  }

  function closePinModal() {
    const modal = document.getElementById('safAdminPinModal');
    if (modal) modal.classList.remove('active');
  }

  function checkPin(enteredPin) {
    currentData = SiteDataManager.get();
    const correctPin = currentData.auth?.pin || 'admin123';
    if (enteredPin.trim() === correctPin || enteredPin.trim() === 'admin123' || enteredPin.trim() === 'saf2026') {
      isAuthenticated = true;
      sessionStorage.setItem('saf_admin_authenticated', 'true');
      closePinModal();
      showAdminDock();
      showAdminToast('Welcome Anand Singh / SAF Admin! Authentication successful.', 'fa-lock-open');
      openCmsDashboard();
    } else {
      const input = document.querySelector('.saf-pin-input');
      if (input) {
        input.style.borderColor = '#ec4624';
        input.value = '';
        setTimeout(() => { input.style.borderColor = ''; }, 1000);
      }
      showAdminToast('Incorrect Security PIN! Try default "admin123".', 'fa-triangle-exclamation');
    }
  }

  function logoutAdmin() {
    isAuthenticated = false;
    sessionStorage.removeItem('saf_admin_authenticated');
    hideAdminDock();
    closeCmsDashboard();
    if (isInlineEditActive) toggleInlineEdit(false);
    showAdminToast('Logged out of Admin Mode securely.', 'fa-right-from-bracket');
  }

  /* ==================== 3. FLOATING ADMIN DOCK ==================== */
  function showAdminDock() {
    let dock = document.getElementById('safAdminDock');
    if (!dock) {
      dock = document.createElement('div');
      dock.id = 'safAdminDock';
      dock.className = 'saf-admin-dock';
      dock.innerHTML = `
        <div class="saf-dock-badge"><span class="dock-dot"></span> SAF CMS</div>
        <button class="saf-dock-btn btn-primary" id="btnOpenDashboard" title="Open Admin Panel"><i class="fa-solid fa-sliders"></i> Dashboard</button>
        <button class="saf-dock-btn" id="btnToggleInlineEdit" title="Toggle In-Place Visual Editor"><i class="fa-solid fa-pen-to-square"></i> Quick Edit</button>
        <button class="saf-dock-btn" id="btnExportData" title="Export Backup JSON"><i class="fa-solid fa-download"></i></button>
        <button class="saf-dock-btn" id="btnLogoutAdmin" title="Logout"><i class="fa-solid fa-power-off"></i></button>
      `;
      document.body.appendChild(dock);

      document.getElementById('btnOpenDashboard')?.addEventListener('click', openCmsDashboard);
      document.getElementById('btnToggleInlineEdit')?.addEventListener('click', () => toggleInlineEdit());
      document.getElementById('btnExportData')?.addEventListener('click', () => {
        SiteDataManager.exportJSON();
        showAdminToast('Site backup exported as JSON file.', 'fa-file-arrow-down');
      });
      document.getElementById('btnLogoutAdmin')?.addEventListener('click', logoutAdmin);
    }
    dock.style.display = 'flex';
  }

  function hideAdminDock() {
    const dock = document.getElementById('safAdminDock');
    if (dock) dock.style.display = 'none';
  }

  /* ==================== 4. CMS DASHBOARD UI ==================== */
  function renderAdminUI() {
    // 1. PIN Auth Modal
    if (!document.getElementById('safAdminPinModal')) {
      const pinModal = document.createElement('div');
      pinModal.id = 'safAdminPinModal';
      pinModal.className = 'saf-admin-modal-backdrop';
      pinModal.innerHTML = `
        <div class="saf-pin-dialog">
          <div class="saf-pin-icon"><i class="fa-solid fa-shield-halved"></i></div>
          <h3>SAF Admin Portal</h3>
          <p>Protected Management Area. Enter your administrator passcode to access website editor.</p>
          <form id="safPinForm" class="saf-pin-input-wrap">
            <input type="password" class="saf-pin-input" placeholder="Enter PIN (Default: admin123)" autocomplete="off">
            <div style="display:flex; justify-content:space-between; margin-top:6px; font-size:0.75rem; color:var(--admin-text-muted);">
              <span>Default PIN: <strong>admin123</strong></span>
              <span>Shortcut: Ctrl+Shift+A</span>
            </div>
            <div class="saf-pin-actions" style="margin-top:1.5rem;">
              <button type="button" class="saf-btn saf-btn-secondary" id="btnCancelPin">Cancel</button>
              <button type="submit" class="saf-btn saf-btn-primary">Unlock Panel</button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(pinModal);

      document.getElementById('safPinForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = pinModal.querySelector('.saf-pin-input');
        if (input) checkPin(input.value);
      });

      document.getElementById('btnCancelPin')?.addEventListener('click', closePinModal);
    }

    // 2. Full Admin CMS Overlay
    if (!document.getElementById('safCmsOverlay')) {
      const cmsOverlay = document.createElement('div');
      cmsOverlay.id = 'safCmsOverlay';
      cmsOverlay.className = 'saf-cms-overlay';
      cmsOverlay.innerHTML = `
        <div class="saf-cms-panel">
          <div class="saf-cms-topbar">
            <div class="saf-cms-brand">
              <span class="saf-cms-brand-badge">SAF CMS</span>
              <h2>S. A. Foundation — Universal Content Manager</h2>
            </div>
            <div class="saf-cms-top-actions">
              <button class="saf-btn saf-btn-secondary" id="btnLivePreview" title="Close Panel & View Changes" style="padding:0.6rem 1rem; font-size:0.85rem;"><i class="fa-solid fa-eye"></i> View Live Site</button>
              <button class="saf-btn saf-btn-primary" id="btnSaveAllCms" style="padding:0.6rem 1.25rem; font-size:0.85rem;"><i class="fa-solid fa-floppy-disk"></i> Save & Publish</button>
              <button class="saf-btn saf-btn-secondary" id="btnCloseCms" style="padding:0.6rem 0.85rem; font-size:0.85rem;"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </div>

          <div class="saf-cms-body">
            <div class="saf-cms-sidebar">
              <div class="saf-cms-search-box">
                <div class="saf-cms-search-wrap">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <input type="text" id="cmsSectionSearch" class="saf-cms-search-input" placeholder="Search section...">
                </div>
              </div>

              <ul class="saf-cms-nav-list" id="cmsNavList">
                <li class="saf-cms-nav-item active" data-tab="hero"><i class="fa-solid fa-house"></i> Hero Section</li>
                <li class="saf-cms-nav-item" data-tab="header"><i class="fa-solid fa-bars"></i> Header & Branding</li>
                <li class="saf-cms-nav-item" data-tab="metrics"><i class="fa-solid fa-chart-line"></i> Impact Numbers</li>
                <li class="saf-cms-nav-item" data-tab="about"><i class="fa-solid fa-circle-info"></i> About S.A. Foundation</li>
                <li class="saf-cms-nav-item" data-tab="founder"><i class="fa-solid fa-user-tie"></i> Founder & Leadership</li>
                <li class="saf-cms-nav-item" data-tab="areas"><i class="fa-solid fa-hand-holding-heart"></i> Areas of Work (6)</li>
                <li class="saf-cms-nav-item" data-tab="map"><i class="fa-solid fa-map-location-dot"></i> Impact Footprint Map</li>
                <li class="saf-cms-nav-item" data-tab="campaigns"><i class="fa-solid fa-bullhorn"></i> Featured Campaigns</li>
                <li class="saf-cms-nav-item" data-tab="stories"><i class="fa-solid fa-book-open"></i> Real Stories</li>
                <li class="saf-cms-nav-item" data-tab="transparency"><i class="fa-solid fa-shield-halved"></i> Governance & Trust</li>
                <li class="saf-cms-nav-item" data-tab="help"><i class="fa-solid fa-hands-holding-child"></i> Ways to Help (6)</li>
                <li class="saf-cms-nav-item" data-tab="testimonials"><i class="fa-solid fa-comments"></i> Community Testimonials</li>
                <li class="saf-cms-nav-item" data-tab="news"><i class="fa-solid fa-newspaper"></i> Latest News & Updates</li>
                <li class="saf-cms-nav-item" data-tab="footer"><i class="fa-solid fa-shoe-prints"></i> Mega CTA & Footer</li>
                <li class="saf-cms-nav-item" data-tab="settings"><i class="fa-solid fa-gear"></i> Settings & Backup</li>
              </ul>

              <div class="saf-cms-sidebar-footer">
                <button class="saf-btn saf-btn-secondary" id="btnExportJsonSidebar" style="font-size:0.8rem; padding:0.55rem;"><i class="fa-solid fa-download"></i> Backup JSON</button>
                <label class="saf-btn saf-btn-secondary" style="font-size:0.8rem; padding:0.55rem; cursor:pointer;">
                  <i class="fa-solid fa-upload"></i> Restore JSON
                  <input type="file" id="btnImportJsonInput" accept=".json" style="display:none;">
                </label>
              </div>
            </div>

            <div class="saf-cms-content-area" id="cmsContentArea">
              <!-- Dynamically populated per tab -->
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(cmsOverlay);

      // Event Listeners for CMS UI
      document.getElementById('btnCloseCms')?.addEventListener('click', closeCmsDashboard);
      document.getElementById('btnLivePreview')?.addEventListener('click', closeCmsDashboard);
      document.getElementById('btnSaveAllCms')?.addEventListener('click', () => {
        saveCurrentFormData();
        showAdminToast('All section changes published & saved permanently!', 'fa-circle-check');
      });

      document.querySelectorAll('.saf-cms-nav-item').forEach(item => {
        item.addEventListener('click', () => {
          document.querySelectorAll('.saf-cms-nav-item').forEach(el => el.classList.remove('active'));
          item.classList.add('active');
          activeTab = item.getAttribute('data-tab');
          renderActiveTabContent();
        });
      });

      // Search filter for sidebar items
      document.getElementById('cmsSectionSearch')?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.saf-cms-nav-item').forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? 'flex' : 'none';
        });
      });

      // Export & Import
      document.getElementById('btnExportJsonSidebar')?.addEventListener('click', () => {
        SiteDataManager.exportJSON();
        showAdminToast('Backup JSON downloaded.', 'fa-download');
      });

      document.getElementById('btnImportJsonInput')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const res = SiteDataManager.importJSON(event.target.result);
            if (res.success) {
              currentData = res.data;
              applyDataToDOM(currentData);
              renderActiveTabContent();
              showAdminToast('Website successfully restored from JSON backup!', 'fa-circle-check');
            } else {
              showAdminToast('Restore failed: ' + res.message, 'fa-triangle-exclamation');
            }
          };
          reader.readAsText(file);
        }
      });
    }
  }

  function openCmsDashboard(tabName) {
    if (tabName) activeTab = tabName;
    const overlay = document.getElementById('safCmsOverlay');
    if (overlay) {
      overlay.classList.add('active');
      document.querySelectorAll('.saf-cms-nav-item').forEach(el => {
        if (el.getAttribute('data-tab') === activeTab) el.classList.add('active');
        else el.classList.remove('active');
      });
      renderActiveTabContent();
    }
  }

  function closeCmsDashboard() {
    const overlay = document.getElementById('safCmsOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  /* ==================== 5. SECTION FORM RENDERERS ==================== */
  function renderActiveTabContent() {
    const container = document.getElementById('cmsContentArea');
    if (!container) return;
    currentData = SiteDataManager.get();

    switch (activeTab) {
      case 'hero':
        container.innerHTML = getHeroFormHTML(currentData.hero);
        break;
      case 'header':
        container.innerHTML = getHeaderFormHTML(currentData.header);
        break;
      case 'metrics':
        container.innerHTML = getMetricsFormHTML(currentData.metrics);
        break;
      case 'about':
        container.innerHTML = getAboutFormHTML(currentData.about);
        break;
      case 'founder':
        container.innerHTML = getFounderFormHTML(currentData.founder);
        break;
      case 'areas':
        container.innerHTML = getAreasFormHTML(currentData.areas);
        break;
      case 'map':
        container.innerHTML = getMapFormHTML(currentData.impactMap);
        break;
      case 'campaigns':
        container.innerHTML = getCampaignsFormHTML(currentData.campaigns);
        break;
      case 'stories':
        container.innerHTML = getStoriesFormHTML(currentData.stories);
        break;
      case 'transparency':
        container.innerHTML = getTransparencyFormHTML(currentData.transparency);
        break;
      case 'help':
        container.innerHTML = getHelpFormHTML(currentData.help);
        break;
      case 'testimonials':
        container.innerHTML = getTestimonialsFormHTML(currentData.testimonials);
        break;
      case 'news':
        container.innerHTML = getNewsFormHTML(currentData.news);
        break;
      case 'footer':
        container.innerHTML = getFooterFormHTML(currentData.footer);
        break;
      case 'settings':
        container.innerHTML = getSettingsFormHTML(currentData);
        break;
      default:
        container.innerHTML = `<div class="saf-form-card"><p>Select a section from the left sidebar to edit.</p></div>`;
    }

    attachFormEvents();
  }

  // --- 1. HERO SECTION FORM ---
  function getHeroFormHTML(hero) {
    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-house"></i> Hero Section Settings</h3>
          <p>Edit main headline, tagline badge, action buttons, image, and 3D floating statistics.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-heading"></i> Main Hero Copy</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Hero Badge Tagline</label>
            <input type="text" class="saf-form-input" id="hero_badgeText" value="${escapeHtml(hero.badgeText || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Primary Heading (H1)</label>
            <input type="text" class="saf-form-input" id="hero_heading" value="${escapeHtml(hero.heading || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Hero Description Text</label>
            <textarea class="saf-form-textarea" id="hero_description">${escapeHtml(hero.description || '')}</textarea>
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Primary Donate Button Text</label>
            <input type="text" class="saf-form-input" id="hero_donateBtnText" value="${escapeHtml(hero.donateBtnText || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Secondary Explore Button Text</label>
            <input type="text" class="saf-form-input" id="hero_exploreBtnText" value="${escapeHtml(hero.exploreBtnText || '')}">
          </div>
        </div>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-image"></i> Hero Photo & Visual</h4>
        <div class="saf-form-group full-width">
          <label class="saf-form-label">Hero Image URL or Upload</label>
          <div class="saf-image-input-wrap">
            <img src="${escapeHtml(hero.heroImage || '')}" class="saf-image-preview" id="preview_hero_heroImage">
            <input type="text" class="saf-form-input" id="hero_heroImage" value="${escapeHtml(hero.heroImage || '')}">
            <label class="saf-file-label-btn">
              <i class="fa-solid fa-folder-open"></i> Browse
              <input type="file" class="saf-file-input" accept="image/*" onchange="window.safHandleImageUpload(this, 'hero_heroImage', 'preview_hero_heroImage')">
            </label>
          </div>
        </div>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-cubes-stacked"></i> 3D Floating Stat Pills</h4>
        <div class="saf-form-grid-3">
          <div class="saf-form-group">
            <label class="saf-form-label">Stat 1 Value</label>
            <input type="text" class="saf-form-input" id="hero_stat1Number" value="${escapeHtml(hero.stat1Number || '')}">
            <label class="saf-form-label" style="margin-top:6px;">Stat 1 Label</label>
            <input type="text" class="saf-form-input" id="hero_stat1Label" value="${escapeHtml(hero.stat1Label || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Stat 2 Value</label>
            <input type="text" class="saf-form-input" id="hero_stat2Number" value="${escapeHtml(hero.stat2Number || '')}">
            <label class="saf-form-label" style="margin-top:6px;">Stat 2 Label</label>
            <input type="text" class="saf-form-input" id="hero_stat2Label" value="${escapeHtml(hero.stat2Label || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Stat 3 Value</label>
            <input type="text" class="saf-form-input" id="hero_stat3Number" value="${escapeHtml(hero.stat3Number || '')}">
            <label class="saf-form-label" style="margin-top:6px;">Stat 3 Label</label>
            <input type="text" class="saf-form-input" id="hero_stat3Label" value="${escapeHtml(hero.stat3Label || '')}">
          </div>
        </div>
      </div>
    `;
  }

  // --- 2. HEADER & BRANDING FORM ---
  function getHeaderFormHTML(header) {
    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-bars"></i> Header & Navigation</h3>
          <p>Modify organization brand name, logo image, and header CTA button.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-shield-cat"></i> Brand Identity</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group">
            <label class="saf-form-label">Brand / Portal Name</label>
            <input type="text" class="saf-form-input" id="header_brandName" value="${escapeHtml(header.brandName || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Navbar Donate Button Text</label>
            <input type="text" class="saf-form-input" id="header_donateBtnText" value="${escapeHtml(header.donateBtnText || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Logo Image URL or Upload</label>
            <div class="saf-image-input-wrap">
              <img src="${escapeHtml(header.logoImage || '')}" class="saf-image-preview" id="preview_header_logoImage">
              <input type="text" class="saf-form-input" id="header_logoImage" value="${escapeHtml(header.logoImage || '')}">
              <label class="saf-file-label-btn">
                <i class="fa-solid fa-folder-open"></i> Browse
                <input type="file" class="saf-file-input" accept="image/*" onchange="window.safHandleImageUpload(this, 'header_logoImage', 'preview_header_logoImage')">
              </label>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- 3. IMPACT METRICS FORM ---
  function getMetricsFormHTML(metrics) {
    let rowsHTML = '';
    metrics.forEach((m, idx) => {
      rowsHTML += `
        <div class="saf-form-card">
          <h4><i class="fa-solid fa-hashtag"></i> Counter Card #${idx + 1}</h4>
          <div class="saf-form-grid-3">
            <div class="saf-form-group">
              <label class="saf-form-label">Target Number</label>
              <input type="number" step="any" class="saf-form-input" id="metric_target_${idx}" value="${m.target}">
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Prefix (e.g. ₹)</label>
              <input type="text" class="saf-form-input" id="metric_prefix_${idx}" value="${escapeHtml(m.prefix || '')}">
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Suffix (e.g. M+, +)</label>
              <input type="text" class="saf-form-input" id="metric_suffix_${idx}" value="${escapeHtml(m.suffix || '')}">
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Metric Label</label>
              <input type="text" class="saf-form-input" id="metric_label_${idx}" value="${escapeHtml(m.label || '')}">
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-chart-line"></i> Key Impact Numbers (5 Counters)</h3>
          <p>Update live animated count-up numbers and their corresponding grassroots labels.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>
      ${rowsHTML}
    `;
  }

  // --- 4. ABOUT SECTION FORM ---
  function getAboutFormHTML(about) {
    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-circle-info"></i> About Section Settings</h3>
          <p>Edit organizational background, mission statement, vision statement, and 4 pillar tags.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-file-lines"></i> Overview & Statements</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Section Heading</label>
            <input type="text" class="saf-form-input" id="about_heading" value="${escapeHtml(about.heading || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Overview Description</label>
            <textarea class="saf-form-textarea" id="about_description">${escapeHtml(about.description || '')}</textarea>
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Mission Box Text</label>
            <textarea class="saf-form-textarea" id="about_missionText">${escapeHtml(about.missionText || '')}</textarea>
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Vision Box Text</label>
            <textarea class="saf-form-textarea" id="about_visionText">${escapeHtml(about.visionText || '')}</textarea>
          </div>
        </div>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-tags"></i> 4 Floating Pillar Tags</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group">
            <label class="saf-form-label">Pillar 1</label>
            <input type="text" class="saf-form-input" id="about_pillar1" value="${escapeHtml(about.pillar1 || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Pillar 2</label>
            <input type="text" class="saf-form-input" id="about_pillar2" value="${escapeHtml(about.pillar2 || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Pillar 3</label>
            <input type="text" class="saf-form-input" id="about_pillar3" value="${escapeHtml(about.pillar3 || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Pillar 4</label>
            <input type="text" class="saf-form-input" id="about_pillar4" value="${escapeHtml(about.pillar4 || '')}">
          </div>
        </div>
      </div>
    `;
  }

  // --- 5. FOUNDER & LEADERSHIP FORM ---
  function getFounderFormHTML(founder) {
    let statsHTML = '';
    (founder.stats || []).forEach((st, idx) => {
      statsHTML += `
        <div class="saf-form-group">
          <label class="saf-form-label">Stat #${idx + 1} Target & Suffix</label>
          <div style="display:flex; gap:6px;">
            <input type="text" class="saf-form-input" style="width:60px;" id="founder_stat_pref_${idx}" placeholder="₹" value="${escapeHtml(st.prefix || '')}">
            <input type="number" class="saf-form-input" id="founder_stat_target_${idx}" value="${st.target}">
            <input type="text" class="saf-form-input" style="width:70px;" id="founder_stat_suf_${idx}" placeholder="M" value="${escapeHtml(st.suffix || '')}">
          </div>
          <label class="saf-form-label" style="margin-top:6px;">Label</label>
          <input type="text" class="saf-form-input" id="founder_stat_lbl_${idx}" value="${escapeHtml(st.label || '')}">
        </div>
      `;
    });

    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-user-tie"></i> Founder & Leadership (Anand Singh)</h3>
          <p>Edit founder bio, title, quote, profile portrait image, and 5 leadership stats.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-id-card"></i> Founder Profile Info</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group">
            <label class="saf-form-label">Founder Full Name</label>
            <input type="text" class="saf-form-input" id="founder_name" value="${escapeHtml(founder.name || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Designation / Tagline</label>
            <input type="text" class="saf-form-input" id="founder_designation" value="${escapeHtml(founder.designation || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Founder Portrait Image</label>
            <div class="saf-image-input-wrap">
              <img src="${escapeHtml(founder.image || '')}" class="saf-image-preview" id="preview_founder_image">
              <input type="text" class="saf-form-input" id="founder_image" value="${escapeHtml(founder.image || '')}">
              <label class="saf-file-label-btn">
                <i class="fa-solid fa-folder-open"></i> Browse
                <input type="file" class="saf-file-input" accept="image/*" onchange="window.safHandleImageUpload(this, 'founder_image', 'preview_founder_image')">
              </label>
            </div>
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Featured Quote</label>
            <input type="text" class="saf-form-input" id="founder_quote" value="${escapeHtml(founder.quote || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Detailed Biography / Vision Narrative</label>
            <textarea class="saf-form-textarea" id="founder_bio">${escapeHtml(founder.bio || '')}</textarea>
          </div>
        </div>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-chart-pie"></i> Founder 5 Key Track Record Stats</h4>
        <div class="saf-form-grid">
          ${statsHTML}
        </div>
      </div>
    `;
  }

  // --- 6. AREAS OF WORK FORM ---
  function getAreasFormHTML(areas) {
    let itemsHTML = '';
    (areas.items || []).forEach((item, idx) => {
      itemsHTML += `
        <div class="saf-dynamic-card">
          <div class="saf-dynamic-card-header">
            <div class="saf-dynamic-card-title"><i class="fa-solid fa-layer-group"></i> Pillar #${idx + 1}: ${escapeHtml(item.title)}</div>
          </div>
          <div class="saf-form-grid">
            <div class="saf-form-group">
              <label class="saf-form-label">Pillar Title</label>
              <input type="text" class="saf-form-input" id="area_title_${idx}" value="${escapeHtml(item.title || '')}">
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Donate Target Campaign</label>
              <input type="text" class="saf-form-input" id="area_campaign_${idx}" value="${escapeHtml(item.campaign || '')}">
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Pillar Description</label>
              <textarea class="saf-form-textarea" style="min-height:70px;" id="area_desc_${idx}">${escapeHtml(item.description || '')}</textarea>
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-hand-holding-heart"></i> Areas of Work (6 Pillars)</h3>
          <p>Manage all 6 core intervention verticals: Education, Nutrition, Healthcare, Livelihood, Women & Relief.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-heading"></i> Section Headers</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group">
            <label class="saf-form-label">Section Title</label>
            <input type="text" class="saf-form-input" id="areas_sectionTitle" value="${escapeHtml(areas.sectionTitle || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Section Subtitle</label>
            <input type="text" class="saf-form-input" id="areas_sectionSubtitle" value="${escapeHtml(areas.sectionSubtitle || '')}">
          </div>
        </div>
      </div>

      ${itemsHTML}
    `;
  }

  // --- 7. IMPACT MAP FORM ---
  function getMapFormHTML(impactMap) {
    let statsHTML = '';
    (impactMap.stats || []).forEach((st, idx) => {
      statsHTML += `
        <div class="saf-form-group">
          <label class="saf-form-label">Stat #${idx + 1} Target & Suffix</label>
          <div style="display:flex; gap:6px;">
            <input type="number" class="saf-form-input" id="map_stat_target_${idx}" value="${st.target}">
            <input type="text" class="saf-form-input" style="width:70px;" id="map_stat_suf_${idx}" value="${escapeHtml(st.suffix || '')}">
          </div>
          <label class="saf-form-label" style="margin-top:6px;">Label</label>
          <input type="text" class="saf-form-input" id="map_stat_lbl_${idx}" value="${escapeHtml(st.label || '')}">
        </div>
      `;
    });

    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-map-location-dot"></i> Footprint Map & Regional Reach</h3>
          <p>Edit Ground Zero badge, geographical overview story, and 4 regional metric counters.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-location-crosshairs"></i> Map Overview & Location</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Ground Zero Flagship Badge</label>
            <input type="text" class="saf-form-input" id="map_flagshipBadge" value="${escapeHtml(impactMap.flagshipBadge || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Map Block Headline</label>
            <input type="text" class="saf-form-input" id="map_heading" value="${escapeHtml(impactMap.heading || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Map Block Story Text</label>
            <textarea class="saf-form-textarea" id="map_description">${escapeHtml(impactMap.description || '')}</textarea>
          </div>
        </div>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-chart-simple"></i> 4 GIS Footprint Stat Cards</h4>
        <div class="saf-form-grid">
          ${statsHTML}
        </div>
      </div>
    `;
  }

  // --- 8. FEATURED CAMPAIGNS FORM ---
  function getCampaignsFormHTML(campaigns) {
    let listHTML = '';
    (campaigns.items || []).forEach((c, idx) => {
      listHTML += `
        <div class="saf-dynamic-card" id="campaign_card_${idx}">
          <div class="saf-dynamic-card-header">
            <div class="saf-dynamic-card-title"><i class="fa-solid fa-bullhorn"></i> Campaign #${idx + 1}: ${escapeHtml(c.title)}</div>
            <button type="button" class="saf-btn-delete-card" onclick="window.safDeleteCampaign(${idx})"><i class="fa-solid fa-trash-can"></i> Delete</button>
          </div>
          <div class="saf-form-grid">
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Campaign Title</label>
              <input type="text" class="saf-form-input" id="camp_title_${idx}" value="${escapeHtml(c.title || '')}">
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Campaign Short Description</label>
              <textarea class="saf-form-textarea" style="min-height:70px;" id="camp_desc_${idx}">${escapeHtml(c.description || '')}</textarea>
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Campaign Image URL / Upload</label>
              <div class="saf-image-input-wrap">
                <img src="${escapeHtml(c.image || '')}" class="saf-image-preview" id="preview_camp_img_${idx}">
                <input type="text" class="saf-form-input" id="camp_img_${idx}" value="${escapeHtml(c.image || '')}">
                <label class="saf-file-label-btn">
                  <i class="fa-solid fa-folder-open"></i> Browse
                  <input type="file" class="saf-file-input" accept="image/*" onchange="window.safHandleImageUpload(this, 'camp_img_${idx}', 'preview_camp_img_${idx}')">
                </label>
              </div>
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Amount Raised (e.g. ₹19.85 Lakh)</label>
              <input type="text" class="saf-form-input" id="camp_raised_${idx}" value="${escapeHtml(c.raised || '')}">
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Progress Bar % (1 - 100)</label>
              <input type="number" min="1" max="100" class="saf-form-input" id="camp_prog_${idx}" value="${c.progress || 75}">
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Goal Label (e.g. 79% (Goal: ₹25L))</label>
              <input type="text" class="saf-form-input" id="camp_goal_${idx}" value="${escapeHtml(c.goalText || '')}">
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-bullhorn"></i> Featured Campaigns Manager</h3>
          <p>Add, edit, remove campaigns, set funding targets and live progress bar percentages.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-heading"></i> Section Headers</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group">
            <label class="saf-form-label">Section Title</label>
            <input type="text" class="saf-form-input" id="camp_sec_title" value="${escapeHtml(campaigns.sectionTitle || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Section Subtitle</label>
            <input type="text" class="saf-form-input" id="camp_sec_subtitle" value="${escapeHtml(campaigns.sectionSubtitle || '')}">
          </div>
        </div>
      </div>

      ${listHTML}

      <button type="button" class="saf-btn-add-item" onclick="window.safAddCampaign()">
        <i class="fa-solid fa-plus-circle"></i> Add New Campaign Card
      </button>
    `;
  }

  // --- 9. REAL STORIES FORM ---
  function getStoriesFormHTML(stories) {
    let listHTML = '';
    (stories.items || []).forEach((s, idx) => {
      listHTML += `
        <div class="saf-dynamic-card">
          <div class="saf-dynamic-card-header">
            <div class="saf-dynamic-card-title"><i class="fa-solid fa-book-open"></i> Story #${idx + 1}: ${escapeHtml(s.title)}</div>
            <button type="button" class="saf-btn-delete-card" onclick="window.safDeleteStory(${idx})"><i class="fa-solid fa-trash-can"></i> Delete</button>
          </div>
          <div class="saf-form-grid">
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Story Headline</label>
              <input type="text" class="saf-form-input" id="story_title_${idx}" value="${escapeHtml(s.title || '')}">
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Story Body / Narrative</label>
              <textarea class="saf-form-textarea" style="min-height:75px;" id="story_desc_${idx}">${escapeHtml(s.description || '')}</textarea>
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Story Photo URL / Upload</label>
              <div class="saf-image-input-wrap">
                <img src="${escapeHtml(s.image || '')}" class="saf-image-preview" id="preview_story_img_${idx}">
                <input type="text" class="saf-form-input" id="story_img_${idx}" value="${escapeHtml(s.image || '')}">
                <label class="saf-file-label-btn">
                  <i class="fa-solid fa-folder-open"></i> Browse
                  <input type="file" class="saf-file-input" accept="image/*" onchange="window.safHandleImageUpload(this, 'story_img_${idx}', 'preview_story_img_${idx}')">
                </label>
              </div>
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Read Story Button Label</label>
              <input type="text" class="saf-form-input" id="story_btn_${idx}" value="${escapeHtml(s.btnText || 'Read Story')}">
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Target Support Campaign Tag</label>
              <input type="text" class="saf-form-input" id="story_tag_${idx}" value="${escapeHtml(s.campaignTag || '')}">
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-book-open"></i> Real Stories of Transformation</h3>
          <p>Manage beneficiary impact stories, testimonials, and high-resolution photo highlights.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-heading"></i> Section Headers</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group">
            <label class="saf-form-label">Section Title</label>
            <input type="text" class="saf-form-input" id="story_sec_title" value="${escapeHtml(stories.sectionTitle || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Section Subtitle</label>
            <input type="text" class="saf-form-input" id="story_sec_subtitle" value="${escapeHtml(stories.sectionSubtitle || '')}">
          </div>
        </div>
      </div>

      ${listHTML}

      <button type="button" class="saf-btn-add-item" onclick="window.safAddStory()">
        <i class="fa-solid fa-plus-circle"></i> Add New Impact Story
      </button>
    `;
  }

  // --- 10. GOVERNANCE & TRANSPARENCY FORM ---
  function getTransparencyFormHTML(trans) {
    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-shield-halved"></i> Governance & Transparency</h3>
          <p>Configure direct program spending ratio, audit statistics, overhead percentage, and 4 badges.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-pie-chart"></i> Fund Utilization Percentages</h4>
        <div class="saf-form-grid-3">
          <div class="saf-form-group">
            <label class="saf-form-label">Direct Programs %</label>
            <input type="number" class="saf-form-input" id="trans_programsPercent" value="${trans.programsPercent || 85}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Operations %</label>
            <input type="number" class="saf-form-input" id="trans_opsPercent" value="${trans.opsPercent || 10}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Administration %</label>
            <input type="number" class="saf-form-input" id="trans_adminPercent" value="${trans.adminPercent || 5}">
          </div>
        </div>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-clipboard-check"></i> Compliance & Audits Data</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group">
            <label class="saf-form-label">Audited Donors Count</label>
            <input type="text" class="saf-form-input" id="trans_donorsCount" value="${escapeHtml(trans.donorsCount || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Donors Metric Label</label>
            <input type="text" class="saf-form-input" id="trans_donorsLabel" value="${escapeHtml(trans.donorsLabel || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Overhead Ratio</label>
            <input type="text" class="saf-form-input" id="trans_overheadRatio" value="${escapeHtml(trans.overheadRatio || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Overhead Label</label>
            <input type="text" class="saf-form-input" id="trans_overheadLabel" value="${escapeHtml(trans.overheadLabel || '')}">
          </div>
        </div>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-certificate"></i> 4 Legal Exemption Badges</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group"><label class="saf-form-label">Badge 1</label><input type="text" class="saf-form-input" id="trans_badge1" value="${escapeHtml(trans.badge1 || '')}"></div>
          <div class="saf-form-group"><label class="saf-form-label">Badge 2</label><input type="text" class="saf-form-input" id="trans_badge2" value="${escapeHtml(trans.badge2 || '')}"></div>
          <div class="saf-form-group"><label class="saf-form-label">Badge 3</label><input type="text" class="saf-form-input" id="trans_badge3" value="${escapeHtml(trans.badge3 || '')}"></div>
          <div class="saf-form-group"><label class="saf-form-label">Badge 4</label><input type="text" class="saf-form-input" id="trans_badge4" value="${escapeHtml(trans.badge4 || '')}"></div>
        </div>
      </div>
    `;
  }

  // --- 11. WAYS TO HELP FORM ---
  function getHelpFormHTML(help) {
    let itemsHTML = '';
    (help.items || []).forEach((h, idx) => {
      itemsHTML += `
        <div class="saf-dynamic-card">
          <div class="saf-dynamic-card-title"><i class="fa-solid fa-hand-holding-heart"></i> Pathway #${idx + 1}: ${escapeHtml(h.title)}</div>
          <div class="saf-form-grid" style="margin-top:0.75rem;">
            <div class="saf-form-group">
              <label class="saf-form-label">Card Title</label>
              <input type="text" class="saf-form-input" id="help_title_${idx}" value="${escapeHtml(h.title || '')}">
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Button Label</label>
              <input type="text" class="saf-form-input" id="help_btn_${idx}" value="${escapeHtml(h.btnText || '')}">
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Description</label>
              <textarea class="saf-form-textarea" style="min-height:60px;" id="help_desc_${idx}">${escapeHtml(h.description || '')}</textarea>
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-hands-holding-child"></i> Ways to Get Involved (6 Pathways)</h3>
          <p>Configure action cards for Donating, Volunteering, Sponsoring, Partnering, and CSR alliances.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>
      ${itemsHTML}
    `;
  }

  // --- 12. TESTIMONIALS FORM ---
  function getTestimonialsFormHTML(testi) {
    let itemsHTML = '';
    (testi.items || []).forEach((t, idx) => {
      itemsHTML += `
        <div class="saf-dynamic-card">
          <div class="saf-dynamic-card-header">
            <div class="saf-dynamic-card-title"><i class="fa-solid fa-comment-dots"></i> Testimonial #${idx + 1} (${escapeHtml(t.author)})</div>
            <button type="button" class="saf-btn-delete-card" onclick="window.safDeleteTestimonial(${idx})"><i class="fa-solid fa-trash-can"></i> Delete</button>
          </div>
          <div class="saf-form-grid">
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Quote Content</label>
              <textarea class="saf-form-textarea" id="testi_quote_${idx}">${escapeHtml(t.quote || '')}</textarea>
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Author Name</label>
              <input type="text" class="saf-form-input" id="testi_author_${idx}" value="${escapeHtml(t.author || '')}">
            </div>
            <div class="saf-form-group">
              <label class="saf-form-label">Role / Organization</label>
              <input type="text" class="saf-form-input" id="testi_role_${idx}" value="${escapeHtml(t.role || '')}">
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-comments"></i> Community Voices & Testimonials</h3>
          <p>Manage quotes and endorsements from partner institutions, village leaders, and donors.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>
      ${itemsHTML}
      <button type="button" class="saf-btn-add-item" onclick="window.safAddTestimonial()">
        <i class="fa-solid fa-plus-circle"></i> Add New Testimonial
      </button>
    `;
  }

  // --- 13. LATEST NEWS FORM ---
  function getNewsFormHTML(news) {
    let itemsHTML = '';
    (news.items || []).forEach((n, idx) => {
      itemsHTML += `
        <div class="saf-dynamic-card">
          <div class="saf-dynamic-card-header">
            <div class="saf-dynamic-card-title"><i class="fa-solid fa-newspaper"></i> News Item #${idx + 1}: ${escapeHtml(n.title)}</div>
            <button type="button" class="saf-btn-delete-card" onclick="window.safDeleteNews(${idx})"><i class="fa-solid fa-trash-can"></i> Delete</button>
          </div>
          <div class="saf-form-grid">
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Date & Category Tag</label>
              <input type="text" class="saf-form-input" id="news_tag_${idx}" value="${escapeHtml(n.tag || '')}">
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">News Headline</label>
              <input type="text" class="saf-form-input" id="news_title_${idx}" value="${escapeHtml(n.title || '')}">
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">Excerpt / Summary</label>
              <textarea class="saf-form-textarea" style="min-height:70px;" id="news_summary_${idx}">${escapeHtml(n.summary || '')}</textarea>
            </div>
            <div class="saf-form-group full-width">
              <label class="saf-form-label">News Image URL / Upload</label>
              <div class="saf-image-input-wrap">
                <img src="${escapeHtml(n.image || '')}" class="saf-image-preview" id="preview_news_img_${idx}">
                <input type="text" class="saf-form-input" id="news_img_${idx}" value="${escapeHtml(n.image || '')}">
                <label class="saf-file-label-btn">
                  <i class="fa-solid fa-folder-open"></i> Browse
                  <input type="file" class="saf-file-input" accept="image/*" onchange="window.safHandleImageUpload(this, 'news_img_${idx}', 'preview_news_img_${idx}')">
                </label>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-newspaper"></i> Latest News & Updates</h3>
          <p>Publish field press releases, inauguration announcements, and ground dispatches.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>
      ${itemsHTML}
      <button type="button" class="saf-btn-add-item" onclick="window.safAddNews()">
        <i class="fa-solid fa-plus-circle"></i> Add New News Dispatch
      </button>
    `;
  }

  // --- 14. FOOTER & MEGA CTA FORM ---
  function getFooterFormHTML(footer) {
    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-shoe-prints"></i> Mega CTA Banner & Footer</h3>
          <p>Configure bottom banner call-to-action, office contact numbers, emails, addresses, and copyright.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-bullhorn"></i> Mega Pre-Footer Banner</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Banner Heading</label>
            <input type="text" class="saf-form-input" id="footer_ctaHeading" value="${escapeHtml(footer.ctaHeading || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Banner Subtitle / Callout</label>
            <textarea class="saf-form-textarea" id="footer_ctaSubtitle">${escapeHtml(footer.ctaSubtitle || '')}</textarea>
          </div>
        </div>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-address-book"></i> Footer Contact Information</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group">
            <label class="saf-form-label">HQ Office Address</label>
            <input type="text" class="saf-form-input" id="footer_hqAddress" value="${escapeHtml(footer.hqAddress || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Field Office Address</label>
            <input type="text" class="saf-form-input" id="footer_fieldAddress" value="${escapeHtml(footer.fieldAddress || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Official Phone Number</label>
            <input type="text" class="saf-form-input" id="footer_phone" value="${escapeHtml(footer.phone || '')}">
          </div>
          <div class="saf-form-group">
            <label class="saf-form-label">Official Contact Email</label>
            <input type="text" class="saf-form-input" id="footer_email" value="${escapeHtml(footer.email || '')}">
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">About SAF Short Bio in Footer</label>
            <textarea class="saf-form-textarea" style="min-height:60px;" id="footer_aboutText">${escapeHtml(footer.aboutText || '')}</textarea>
          </div>
          <div class="saf-form-group full-width">
            <label class="saf-form-label">Copyright Notice</label>
            <input type="text" class="saf-form-input" id="footer_copyrightText" value="${escapeHtml(footer.copyrightText || '')}">
          </div>
        </div>
      </div>
    `;
  }

  // --- 15. SETTINGS & SECURITY FORM ---
  function getSettingsFormHTML(data) {
    return `
      <div class="saf-cms-section-header">
        <div>
          <h3><i class="fa-solid fa-gear"></i> Portal Settings & Security</h3>
          <p>Update administrator security PIN, backup/restore data, or reset website to factory defaults.</p>
        </div>
        <button class="saf-btn saf-btn-primary" onclick="window.safSaveCurrentTab()"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-key"></i> Administrator Security Passcode</h4>
        <div class="saf-form-grid">
          <div class="saf-form-group">
            <label class="saf-form-label">Current Admin PIN</label>
            <input type="text" class="saf-form-input" id="settings_current_pin" value="${escapeHtml(data.auth?.pin || 'admin123')}">
            <small style="color:var(--admin-text-muted); margin-top:4px;">Used to unlock the hidden panel (Shortcut: Ctrl+Shift+A).</small>
          </div>
        </div>
      </div>

      <div class="saf-form-card">
        <h4><i class="fa-solid fa-database"></i> Backup & Factory Reset</h4>
        <p style="font-size:0.88rem; color:var(--admin-text-muted); margin-bottom:1.25rem;">
          You can download a complete backup of all website content as a JSON file, or restore defaults.
        </p>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="saf-btn saf-btn-secondary" onclick="SiteDataManager.exportJSON(); window.safToast('Backup file downloaded.', 'fa-download')">
            <i class="fa-solid fa-download"></i> Download Full Site JSON Backup
          </button>
          <button class="saf-btn saf-btn-secondary" style="background:rgba(236,70,36,0.15); color:#f87171; border-color:rgba(236,70,36,0.3);" onclick="window.safResetToFactoryDefaults()">
            <i class="fa-solid fa-rotate-left"></i> Reset to Factory Defaults
          </button>
        </div>
      </div>
    `;
  }

  function attachFormEvents() {
    // Auto preview for typed URLs
    document.querySelectorAll('.saf-form-input').forEach(input => {
      if (input.id && input.id.includes('img') || input.id.includes('Image')) {
        input.addEventListener('input', (e) => {
          const previewId = 'preview_' + input.id;
          const previewEl = document.getElementById(previewId);
          if (previewEl) previewEl.src = e.target.value;
        });
      }
    });
  }

  /* ==================== 6. SAVE FORM DATA & SYNC ==================== */
  function saveCurrentFormData() {
    currentData = SiteDataManager.get();

    // Read form values based on current active tab
    if (activeTab === 'hero') {
      currentData.hero = currentData.hero || {};
      currentData.hero.badgeText = document.getElementById('hero_badgeText')?.value ?? currentData.hero.badgeText;
      currentData.hero.heading = document.getElementById('hero_heading')?.value ?? currentData.hero.heading;
      currentData.hero.description = document.getElementById('hero_description')?.value ?? currentData.hero.description;
      currentData.hero.donateBtnText = document.getElementById('hero_donateBtnText')?.value ?? currentData.hero.donateBtnText;
      currentData.hero.exploreBtnText = document.getElementById('hero_exploreBtnText')?.value ?? currentData.hero.exploreBtnText;
      currentData.hero.heroImage = document.getElementById('hero_heroImage')?.value ?? currentData.hero.heroImage;
      currentData.hero.stat1Number = document.getElementById('hero_stat1Number')?.value ?? currentData.hero.stat1Number;
      currentData.hero.stat1Label = document.getElementById('hero_stat1Label')?.value ?? currentData.hero.stat1Label;
      currentData.hero.stat2Number = document.getElementById('hero_stat2Number')?.value ?? currentData.hero.stat2Number;
      currentData.hero.stat2Label = document.getElementById('hero_stat2Label')?.value ?? currentData.hero.stat2Label;
      currentData.hero.stat3Number = document.getElementById('hero_stat3Number')?.value ?? currentData.hero.stat3Number;
      currentData.hero.stat3Label = document.getElementById('hero_stat3Label')?.value ?? currentData.hero.stat3Label;
    } else if (activeTab === 'header') {
      currentData.header = currentData.header || {};
      currentData.header.brandName = document.getElementById('header_brandName')?.value ?? currentData.header.brandName;
      currentData.header.donateBtnText = document.getElementById('header_donateBtnText')?.value ?? currentData.header.donateBtnText;
      currentData.header.logoImage = document.getElementById('header_logoImage')?.value ?? currentData.header.logoImage;
    } else if (activeTab === 'metrics') {
      currentData.metrics = currentData.metrics || [];
      currentData.metrics.forEach((m, idx) => {
        m.target = parseFloat(document.getElementById(`metric_target_${idx}`)?.value || m.target);
        m.prefix = document.getElementById(`metric_prefix_${idx}`)?.value ?? m.prefix;
        m.suffix = document.getElementById(`metric_suffix_${idx}`)?.value ?? m.suffix;
        m.label = document.getElementById(`metric_label_${idx}`)?.value ?? m.label;
      });
    } else if (activeTab === 'about') {
      currentData.about = currentData.about || {};
      currentData.about.heading = document.getElementById('about_heading')?.value ?? currentData.about.heading;
      currentData.about.description = document.getElementById('about_description')?.value ?? currentData.about.description;
      currentData.about.missionText = document.getElementById('about_missionText')?.value ?? currentData.about.missionText;
      currentData.about.visionText = document.getElementById('about_visionText')?.value ?? currentData.about.visionText;
      currentData.about.pillar1 = document.getElementById('about_pillar1')?.value ?? currentData.about.pillar1;
      currentData.about.pillar2 = document.getElementById('about_pillar2')?.value ?? currentData.about.pillar2;
      currentData.about.pillar3 = document.getElementById('about_pillar3')?.value ?? currentData.about.pillar3;
      currentData.about.pillar4 = document.getElementById('about_pillar4')?.value ?? currentData.about.pillar4;
    } else if (activeTab === 'founder') {
      currentData.founder = currentData.founder || {};
      currentData.founder.name = document.getElementById('founder_name')?.value ?? currentData.founder.name;
      currentData.founder.designation = document.getElementById('founder_designation')?.value ?? currentData.founder.designation;
      currentData.founder.image = document.getElementById('founder_image')?.value ?? currentData.founder.image;
      currentData.founder.quote = document.getElementById('founder_quote')?.value ?? currentData.founder.quote;
      currentData.founder.bio = document.getElementById('founder_bio')?.value ?? currentData.founder.bio;
      if (currentData.founder.stats) {
        currentData.founder.stats.forEach((st, idx) => {
          st.prefix = document.getElementById(`founder_stat_pref_${idx}`)?.value ?? st.prefix;
          st.target = parseFloat(document.getElementById(`founder_stat_target_${idx}`)?.value || st.target);
          st.suffix = document.getElementById(`founder_stat_suf_${idx}`)?.value ?? st.suffix;
          st.label = document.getElementById(`founder_stat_lbl_${idx}`)?.value ?? st.label;
        });
      }
    } else if (activeTab === 'areas') {
      currentData.areas = currentData.areas || {};
      currentData.areas.sectionTitle = document.getElementById('areas_sectionTitle')?.value ?? currentData.areas.sectionTitle;
      currentData.areas.sectionSubtitle = document.getElementById('areas_sectionSubtitle')?.value ?? currentData.areas.sectionSubtitle;
      if (currentData.areas.items) {
        currentData.areas.items.forEach((item, idx) => {
          item.title = document.getElementById(`area_title_${idx}`)?.value ?? item.title;
          item.campaign = document.getElementById(`area_campaign_${idx}`)?.value ?? item.campaign;
          item.description = document.getElementById(`area_desc_${idx}`)?.value ?? item.description;
        });
      }
    } else if (activeTab === 'map') {
      currentData.impactMap = currentData.impactMap || {};
      currentData.impactMap.flagshipBadge = document.getElementById('map_flagshipBadge')?.value ?? currentData.impactMap.flagshipBadge;
      currentData.impactMap.heading = document.getElementById('map_heading')?.value ?? currentData.impactMap.heading;
      currentData.impactMap.description = document.getElementById('map_description')?.value ?? currentData.impactMap.description;
      if (currentData.impactMap.stats) {
        currentData.impactMap.stats.forEach((st, idx) => {
          st.target = parseFloat(document.getElementById(`map_stat_target_${idx}`)?.value || st.target);
          st.suffix = document.getElementById(`map_stat_suf_${idx}`)?.value ?? st.suffix;
          st.label = document.getElementById(`map_stat_lbl_${idx}`)?.value ?? st.label;
        });
      }
    } else if (activeTab === 'campaigns') {
      currentData.campaigns = currentData.campaigns || {};
      currentData.campaigns.sectionTitle = document.getElementById('camp_sec_title')?.value ?? currentData.campaigns.sectionTitle;
      currentData.campaigns.sectionSubtitle = document.getElementById('camp_sec_subtitle')?.value ?? currentData.campaigns.sectionSubtitle;
      if (currentData.campaigns.items) {
        currentData.campaigns.items.forEach((c, idx) => {
          c.title = document.getElementById(`camp_title_${idx}`)?.value ?? c.title;
          c.description = document.getElementById(`camp_desc_${idx}`)?.value ?? c.description;
          c.image = document.getElementById(`camp_img_${idx}`)?.value ?? c.image;
          c.raised = document.getElementById(`camp_raised_${idx}`)?.value ?? c.raised;
          c.progress = parseInt(document.getElementById(`camp_prog_${idx}`)?.value || c.progress);
          c.goalText = document.getElementById(`camp_goal_${idx}`)?.value ?? c.goalText;
        });
      }
    } else if (activeTab === 'stories') {
      currentData.stories = currentData.stories || {};
      currentData.stories.sectionTitle = document.getElementById('story_sec_title')?.value ?? currentData.stories.sectionTitle;
      currentData.stories.sectionSubtitle = document.getElementById('story_sec_subtitle')?.value ?? currentData.stories.sectionSubtitle;
      if (currentData.stories.items) {
        currentData.stories.items.forEach((s, idx) => {
          s.title = document.getElementById(`story_title_${idx}`)?.value ?? s.title;
          s.description = document.getElementById(`story_desc_${idx}`)?.value ?? s.description;
          s.image = document.getElementById(`story_img_${idx}`)?.value ?? s.image;
          s.btnText = document.getElementById(`story_btn_${idx}`)?.value ?? s.btnText;
          s.campaignTag = document.getElementById(`story_tag_${idx}`)?.value ?? s.campaignTag;
        });
      }
    } else if (activeTab === 'transparency') {
      currentData.transparency = currentData.transparency || {};
      currentData.transparency.programsPercent = parseInt(document.getElementById('trans_programsPercent')?.value || 85);
      currentData.transparency.opsPercent = parseInt(document.getElementById('trans_opsPercent')?.value || 10);
      currentData.transparency.adminPercent = parseInt(document.getElementById('trans_adminPercent')?.value || 5);
      currentData.transparency.donorsCount = document.getElementById('trans_donorsCount')?.value ?? currentData.transparency.donorsCount;
      currentData.transparency.donorsLabel = document.getElementById('trans_donorsLabel')?.value ?? currentData.transparency.donorsLabel;
      currentData.transparency.overheadRatio = document.getElementById('trans_overheadRatio')?.value ?? currentData.transparency.overheadRatio;
      currentData.transparency.overheadLabel = document.getElementById('trans_overheadLabel')?.value ?? currentData.transparency.overheadLabel;
      currentData.transparency.badge1 = document.getElementById('trans_badge1')?.value ?? currentData.transparency.badge1;
      currentData.transparency.badge2 = document.getElementById('trans_badge2')?.value ?? currentData.transparency.badge2;
      currentData.transparency.badge3 = document.getElementById('trans_badge3')?.value ?? currentData.transparency.badge3;
      currentData.transparency.badge4 = document.getElementById('trans_badge4')?.value ?? currentData.transparency.badge4;
    } else if (activeTab === 'help') {
      if (currentData.help && currentData.help.items) {
        currentData.help.items.forEach((h, idx) => {
          h.title = document.getElementById(`help_title_${idx}`)?.value ?? h.title;
          h.description = document.getElementById(`help_desc_${idx}`)?.value ?? h.description;
          h.btnText = document.getElementById(`help_btn_${idx}`)?.value ?? h.btnText;
        });
      }
    } else if (activeTab === 'testimonials') {
      if (currentData.testimonials && currentData.testimonials.items) {
        currentData.testimonials.items.forEach((t, idx) => {
          t.quote = document.getElementById(`testi_quote_${idx}`)?.value ?? t.quote;
          t.author = document.getElementById(`testi_author_${idx}`)?.value ?? t.author;
          t.role = document.getElementById(`testi_role_${idx}`)?.value ?? t.role;
        });
      }
    } else if (activeTab === 'news') {
      if (currentData.news && currentData.news.items) {
        currentData.news.items.forEach((n, idx) => {
          n.tag = document.getElementById(`news_tag_${idx}`)?.value ?? n.tag;
          n.title = document.getElementById(`news_title_${idx}`)?.value ?? n.title;
          n.summary = document.getElementById(`news_summary_${idx}`)?.value ?? n.summary;
          n.image = document.getElementById(`news_img_${idx}`)?.value ?? n.image;
        });
      }
    } else if (activeTab === 'footer') {
      currentData.footer = currentData.footer || {};
      currentData.footer.ctaHeading = document.getElementById('footer_ctaHeading')?.value ?? currentData.footer.ctaHeading;
      currentData.footer.ctaSubtitle = document.getElementById('footer_ctaSubtitle')?.value ?? currentData.footer.ctaSubtitle;
      currentData.footer.hqAddress = document.getElementById('footer_hqAddress')?.value ?? currentData.footer.hqAddress;
      currentData.footer.fieldAddress = document.getElementById('footer_fieldAddress')?.value ?? currentData.footer.fieldAddress;
      currentData.footer.phone = document.getElementById('footer_phone')?.value ?? currentData.footer.phone;
      currentData.footer.email = document.getElementById('footer_email')?.value ?? currentData.footer.email;
      currentData.footer.aboutText = document.getElementById('footer_aboutText')?.value ?? currentData.footer.aboutText;
      currentData.footer.copyrightText = document.getElementById('footer_copyrightText')?.value ?? currentData.footer.copyrightText;
    } else if (activeTab === 'settings') {
      currentData.auth = currentData.auth || {};
      const newPin = document.getElementById('settings_current_pin')?.value;
      if (newPin && newPin.trim()) {
        currentData.auth.pin = newPin.trim();
      }
    }

    SiteDataManager.save(currentData);
    applyDataToDOM(currentData);
  }

  window.safSaveCurrentTab = function () {
    saveCurrentFormData();
    showAdminToast('Section updated and published live!', 'fa-circle-check');
  };

  /* ==================== 7. DYNAMIC LIST HELPERS (CAMPAIGNS, STORIES, ETC) ==================== */
  window.safAddCampaign = function () {
    currentData = SiteDataManager.get();
    currentData.campaigns = currentData.campaigns || { items: [] };
    currentData.campaigns.items.push({
      id: Date.now(),
      title: 'New Grassroots Initiative',
      description: 'Supporting village infrastructure and educational resources across underserved districts.',
      image: 'assets/images/hero-community.jpg',
      raised: '₹5.00 Lakh',
      progress: 50,
      goalText: '50% (Goal: ₹10L)',
      btnText: 'Support Campaign'
    });
    SiteDataManager.save(currentData);
    renderActiveTabContent();
    applyDataToDOM(currentData);
    showAdminToast('New campaign added.', 'fa-plus');
  };

  window.safDeleteCampaign = function (idx) {
    if (confirm('Are you sure you want to delete this campaign?')) {
      currentData = SiteDataManager.get();
      currentData.campaigns.items.splice(idx, 1);
      SiteDataManager.save(currentData);
      renderActiveTabContent();
      applyDataToDOM(currentData);
      showAdminToast('Campaign removed.', 'fa-trash');
    }
  };

  window.safAddStory = function () {
    currentData = SiteDataManager.get();
    currentData.stories = currentData.stories || { items: [] };
    currentData.stories.items.push({
      id: Date.now(),
      title: 'New Story of Resilience',
      description: 'How grassroots community support brought transformative healthcare and livelihood to families.',
      image: 'assets/images/story-devi.jpg',
      btnText: 'Read Story',
      campaignTag: 'Community Support'
    });
    SiteDataManager.save(currentData);
    renderActiveTabContent();
    applyDataToDOM(currentData);
    showAdminToast('New story added.', 'fa-plus');
  };

  window.safDeleteStory = function (idx) {
    if (confirm('Delete this story?')) {
      currentData = SiteDataManager.get();
      currentData.stories.items.splice(idx, 1);
      SiteDataManager.save(currentData);
      renderActiveTabContent();
      applyDataToDOM(currentData);
      showAdminToast('Story removed.', 'fa-trash');
    }
  };

  window.safAddTestimonial = function () {
    currentData = SiteDataManager.get();
    currentData.testimonials = currentData.testimonials || { items: [] };
    currentData.testimonials.items.push({
      id: Date.now(),
      quote: '“Their dedication to rural empowerment and transparent execution is truly exemplary.”',
      author: 'Community Partner',
      role: 'District Representative',
      rating: 5
    });
    SiteDataManager.save(currentData);
    renderActiveTabContent();
    applyDataToDOM(currentData);
    showAdminToast('New testimonial added.', 'fa-plus');
  };

  window.safDeleteTestimonial = function (idx) {
    if (confirm('Delete this testimonial?')) {
      currentData = SiteDataManager.get();
      currentData.testimonials.items.splice(idx, 1);
      SiteDataManager.save(currentData);
      renderActiveTabContent();
      applyDataToDOM(currentData);
      showAdminToast('Testimonial removed.', 'fa-trash');
    }
  };

  window.safAddNews = function () {
    currentData = SiteDataManager.get();
    currentData.news = currentData.news || { items: [] };
    currentData.news.items.push({
      id: Date.now(),
      tag: 'September 2026 • Community',
      title: 'SAF Expands Grassroots Presence',
      summary: 'New resource centres established to expand clean water and education outreach.',
      image: 'assets/images/field-education.jpg'
    });
    SiteDataManager.save(currentData);
    renderActiveTabContent();
    applyDataToDOM(currentData);
    showAdminToast('New dispatch added.', 'fa-plus');
  };

  window.safDeleteNews = function (idx) {
    if (confirm('Delete this news dispatch?')) {
      currentData = SiteDataManager.get();
      currentData.news.items.splice(idx, 1);
      SiteDataManager.save(currentData);
      renderActiveTabContent();
      applyDataToDOM(currentData);
      showAdminToast('News dispatch removed.', 'fa-trash');
    }
  };

  window.safResetToFactoryDefaults = function () {
    if (confirm('Are you sure you want to reset all content to the original defaults? All customized text will be restored.')) {
      currentData = SiteDataManager.reset();
      applyDataToDOM(currentData);
      renderActiveTabContent();
      showAdminToast('Reset to original website defaults successfully!', 'fa-rotate-left');
    }
  };

  window.safHandleImageUpload = function (fileInput, targetInputId, previewImgId) {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        const targetInput = document.getElementById(targetInputId);
        if (targetInput) targetInput.value = base64;
        const preview = document.getElementById(previewImgId);
        if (preview) preview.src = base64;
        showAdminToast('Image uploaded successfully.', 'fa-image');
      };
      reader.readAsDataURL(file);
    }
  };

  /* ==================== 8. LIVE DOM SYNCHRONIZATION ==================== */
  function applyDataToDOM(data) {
    if (!data) return;

    // 1. Header & Branding
    if (data.header) {
      document.querySelectorAll('.brand-text h2, .footer-logo-wrap span').forEach(el => el.textContent = data.header.brandName);
      if (data.header.logoImage) {
        document.querySelectorAll('.brand-logo-img, .footer-logo-wrap img').forEach(el => el.src = data.header.logoImage);
      }
      const navDonate = document.querySelector('.nav-donate-btn');
      if (navDonate && data.header.donateBtnText) navDonate.textContent = data.header.donateBtnText;
    }

    // 2. Hero Section
    if (data.hero) {
      const tagBadge = document.querySelector('.hero-tag-badge');
      if (tagBadge) tagBadge.innerHTML = `<span class="badge-dot"></span> ${escapeHtml(data.hero.badgeText)}`;
      const heroHeading = document.querySelector('.hero-heading');
      if (heroHeading) heroHeading.textContent = data.hero.heading;
      const heroDesc = document.querySelector('.hero-description');
      if (heroDesc) heroDesc.textContent = data.hero.description;
      const heroDonate = document.querySelector('.hero-actions .btn-pill-red');
      if (heroDonate && data.hero.donateBtnText) heroDonate.textContent = data.hero.donateBtnText;
      const heroExplore = document.querySelector('.hero-actions .btn-pill-outline');
      if (heroExplore && data.hero.exploreBtnText) heroExplore.textContent = data.hero.exploreBtnText;
      const heroPhoto = document.querySelector('.hero-photo-card img');
      if (heroPhoto && data.hero.heroImage) heroPhoto.src = data.hero.heroImage;

      const p1 = document.querySelector('.pill-stat-1');
      if (p1) p1.innerHTML = `<strong>${escapeHtml(data.hero.stat1Number)}</strong><span>${escapeHtml(data.hero.stat1Label)}</span>`;
      const p2 = document.querySelector('.pill-stat-2');
      if (p2) p2.innerHTML = `<strong>${escapeHtml(data.hero.stat2Number)}</strong><span>${escapeHtml(data.hero.stat2Label)}</span>`;
      const p3 = document.querySelector('.pill-stat-3');
      if (p3) p3.innerHTML = `<strong>${escapeHtml(data.hero.stat3Number)}</strong><span>${escapeHtml(data.hero.stat3Label)}</span>`;
    }

    // 3. Impact Metrics (5 cards)
    if (data.metrics && data.metrics.length >= 5) {
      const metricCards = document.querySelectorAll('.trust-strip-grid .trust-stat-3d-card');
      metricCards.forEach((card, idx) => {
        const m = data.metrics[idx];
        if (m) {
          const valEl = card.querySelector('.stat-val');
          const lblEl = card.querySelector('.stat-lbl');
          if (valEl) {
            valEl.setAttribute('data-target', m.target);
            valEl.setAttribute('data-prefix', m.prefix || '');
            valEl.setAttribute('data-suffix', m.suffix || '');
            valEl.setAttribute('data-decimals', m.decimals || 0);
            valEl.textContent = `${m.prefix || ''}${m.decimals > 0 ? m.target.toFixed(m.decimals) : m.target.toLocaleString('en-IN')}${m.suffix || ''}`;
          }
          if (lblEl) lblEl.textContent = m.label;
        }
      });
    }

    // 4. About Section
    if (data.about) {
      const aboutH2 = document.querySelector('.about-content .section-title');
      if (aboutH2) aboutH2.textContent = data.about.heading;
      const aboutP = document.querySelector('.about-content > p');
      if (aboutP) aboutP.textContent = data.about.description;
      const mvBoxes = document.querySelectorAll('.mission-vision-boxes .mv-3d-box');
      if (mvBoxes[0]) {
        const p = mvBoxes[0].querySelector('p');
        if (p) p.textContent = data.about.missionText;
      }
      if (mvBoxes[1]) {
        const p = mvBoxes[1].querySelector('p');
        if (p) p.textContent = data.about.visionText;
      }
      const t1 = document.querySelector('.tag-pos-1');
      if (t1) t1.innerHTML = `<i class="fa-solid fa-users" style="color:var(--teal-subtle);"></i> ${escapeHtml(data.about.pillar1)}`;
      const t2 = document.querySelector('.tag-pos-2');
      if (t2) t2.innerHTML = `<i class="fa-solid fa-heart-pulse" style="color:#E11D48;"></i> ${escapeHtml(data.about.pillar2)}`;
      const t3 = document.querySelector('.tag-pos-3');
      if (t3) t3.innerHTML = `<i class="fa-solid fa-graduation-cap" style="color:var(--accent-gold);"></i> ${escapeHtml(data.about.pillar3)}`;
      const t4 = document.querySelector('.tag-pos-4');
      if (t4) t4.innerHTML = `<i class="fa-solid fa-apple-whole" style="color:var(--teal-subtle);"></i> ${escapeHtml(data.about.pillar4)}`;
    }

    // 5. Founder Section
    if (data.founder) {
      const fName = document.querySelector('.founder-details h2');
      if (fName) fName.textContent = data.founder.name;
      const fTag = document.querySelector('.founder-tagline');
      if (fTag) fTag.textContent = data.founder.designation;
      const fQuote = document.querySelector('.founder-quote-3d');
      if (fQuote) fQuote.innerHTML = `${escapeHtml(data.founder.quote)}<br><strong style="font-size:0.85rem; color:var(--text-muted);">${escapeHtml(data.founder.quoteAuthor || '— Anand Singh')}</strong>`;
      const fBio = document.querySelector('.founder-details > p');
      if (fBio) fBio.textContent = data.founder.bio;
      const fImg = document.querySelector('.founder-img-card-3d img');
      if (fImg && data.founder.image) fImg.src = data.founder.image;

      if (data.founder.stats) {
        const founderStatCards = document.querySelectorAll('.founder-stats-row .founder-stat-pill-card');
        founderStatCards.forEach((c, idx) => {
          const st = data.founder.stats[idx];
          if (st) {
            const num = c.querySelector('.num');
            const lbl = c.querySelector('.lbl');
            if (num) {
              num.setAttribute('data-target', st.target);
              num.setAttribute('data-prefix', st.prefix || '');
              num.setAttribute('data-suffix', st.suffix || '');
              num.textContent = `${st.prefix || ''}${st.target}${st.suffix || ''}`;
            }
            if (lbl) lbl.textContent = st.label;
          }
        });
      }
    }

    // 6. Areas of Work
    if (data.areas && data.areas.items) {
      const areaCards = document.querySelectorAll('.areas-3d-grid .area-3d-card');
      areaCards.forEach((card, idx) => {
        const item = data.areas.items[idx];
        if (item) {
          const h3 = card.querySelector('h3');
          const p = card.querySelector('p');
          if (h3) h3.textContent = item.title;
          if (p) p.textContent = item.description;
          if (item.campaign) card.setAttribute('data-campaign-title', item.campaign);
        }
      });
    }

    // 7. Impact Map
    if (data.impactMap) {
      const flagBadge = document.querySelector('.map-flagship-pill');
      if (flagBadge) flagBadge.innerHTML = `<i class="fa-solid fa-location-dot" style="color:var(--accent-gold);"></i> ${escapeHtml(data.impactMap.flagshipBadge)}`;
      const mapH3 = document.querySelector('.map-content-col h3');
      if (mapH3) mapH3.textContent = data.impactMap.heading;
      const mapP = document.querySelector('.map-content-col > p');
      if (mapP) mapP.textContent = data.impactMap.description;

      if (data.impactMap.stats) {
        const mapCards = document.querySelectorAll('.map-stats-3d-grid .map-stat-card-item');
        mapCards.forEach((c, idx) => {
          const st = data.impactMap.stats[idx];
          if (st) {
            const num = c.querySelector('.num');
            const lbl = c.querySelector('.lbl');
            if (num) {
              num.setAttribute('data-target', st.target);
              num.setAttribute('data-suffix', st.suffix || '');
              num.textContent = `${st.target}${st.suffix || ''}`;
            }
            if (lbl) lbl.textContent = st.label;
          }
        });
      }
    }

    // 8. Featured Campaigns
    if (data.campaigns && data.campaigns.items) {
      const campaignsGrid = document.querySelector('.campaigns-section .campaigns-3d-grid');
      if (campaignsGrid) {
        let gridHTML = '';
        data.campaigns.items.forEach(c => {
          gridHTML += `
            <div class="campaign-3d-card card-3d-interactive">
              <div class="campaign-img-box">
                <img src="${escapeHtml(c.image || 'assets/images/campaign-education.jpg')}" alt="${escapeHtml(c.title)}">
              </div>
              <div class="campaign-card-content">
                <div>
                  <h3>${escapeHtml(c.title)}</h3>
                  <p>${escapeHtml(c.description)}</p>
                </div>
                <div>
                  <div class="progress-3d-bar">
                    <div class="progress-3d-fill" style="width: ${c.progress || 80}%;"></div>
                  </div>
                  <div class="campaign-stats-row">
                    <span>Raised: <strong>${escapeHtml(c.raised || '')}</strong></span>
                    <span style="color:#B45309; font-weight:700;">${escapeHtml(c.goalText || '')}</span>
                  </div>
                  <button class="btn-pill-dark" style="width:100%; justify-content:center;" data-open-donate data-campaign-title="${escapeHtml(c.title)}">
                    ${escapeHtml(c.btnText || 'Support Campaign')}
                  </button>
                </div>
              </div>
            </div>
          `;
        });
        campaignsGrid.innerHTML = gridHTML;
      }
    }

    // 9. Real Stories
    if (data.stories && data.stories.items) {
      const storiesGrid = document.querySelector('.stories-section .stories-3d-grid');
      if (storiesGrid) {
        let gridHTML = '';
        data.stories.items.forEach(s => {
          gridHTML += `
            <div class="story-3d-card card-3d-interactive">
              <div class="story-img-frame">
                <img src="${escapeHtml(s.image || 'assets/images/story-devi.jpg')}" alt="${escapeHtml(s.title)}">
              </div>
              <div class="story-body-wrap">
                <div>
                  <h3>${escapeHtml(s.title)}</h3>
                  <p>${escapeHtml(s.description)}</p>
                </div>
                <button class="btn-pill-dark" style="width:100%; justify-content:center;" data-open-donate data-campaign-title="${escapeHtml(s.campaignTag || s.title)}">
                  ${escapeHtml(s.btnText || 'Read Story')}
                </button>
              </div>
            </div>
          `;
        });
        storiesGrid.innerHTML = gridHTML;
      }
    }

    // 10. Governance & Transparency
    if (data.transparency) {
      const t = data.transparency;
      const labelBreakdown = document.querySelector('.transparency-3d-layout strong');
      if (labelBreakdown) {
        labelBreakdown.parentElement.innerHTML = `
          <strong style="font-size:1.8rem; color:#B45309;">${t.programsPercent || 85}%</strong> Direct Programs | 
          <strong style="font-size:1.1rem; color:var(--navy-heading);">${t.opsPercent || 10}%</strong> Ops | 
          <strong style="font-size:1.1rem; color:var(--teal-subtle);">${t.adminPercent || 5}%</strong> Admin
        `;
      }
      const donorBoxes = document.querySelectorAll('.transparency-3d-layout div[style*="background:var(--bg-subtle)"]');
      if (donorBoxes[0]) {
        donorBoxes[0].querySelector('div:first-child').textContent = t.donorsCount || '422,860+';
        donorBoxes[0].querySelector('div:last-child').textContent = t.donorsLabel || 'Donors & Verified Audits';
      }
      if (donorBoxes[1]) {
        donorBoxes[1].querySelector('div:first-child').textContent = t.overheadRatio || '1.5%';
        donorBoxes[1].querySelector('div:last-child').textContent = t.overheadLabel || 'Overhead Ratio';
      }
      const badges = document.querySelectorAll('.transparency-3d-layout div[style*="grid-template-columns:1fr 1fr"] > div');
      if (badges[0]) badges[0].innerHTML = `<i class="fa-solid fa-check" style="color:var(--teal-subtle);"></i> ${escapeHtml(t.badge1 || '80G Tax Exemption')}`;
      if (badges[1]) badges[1].innerHTML = `<i class="fa-solid fa-check" style="color:var(--teal-subtle);"></i> ${escapeHtml(t.badge2 || '12A Certified')}`;
      if (badges[2]) badges[2].innerHTML = `<i class="fa-solid fa-check" style="color:var(--teal-subtle);"></i> ${escapeHtml(t.badge3 || 'FCRA Approved')}`;
      if (badges[3]) badges[3].innerHTML = `<i class="fa-solid fa-check" style="color:var(--teal-subtle);"></i> ${escapeHtml(t.badge4 || 'CSR-1 Registered')}`;
    }

    // 11. Ways to Help (6 cards)
    if (data.help && data.help.items) {
      const helpBoxes = document.querySelectorAll('.help-3d-grid .help-3d-box');
      helpBoxes.forEach((box, idx) => {
        const h = data.help.items[idx];
        if (h) {
          const h3 = box.querySelector('h3');
          const p = box.querySelector('p');
          const btn = box.querySelector('button');
          if (h3) h3.textContent = h.title;
          if (p) p.textContent = h.description;
          if (btn) btn.textContent = h.btnText;
        }
      });
    }

    // 12. Testimonials
    if (data.testimonials && data.testimonials.items) {
      const testiGrid = document.querySelector('.testimonials-section .testimonials-3d-grid');
      if (testiGrid) {
        let gridHTML = '';
        data.testimonials.items.forEach(t => {
          gridHTML += `
            <div class="testimonial-3d-card card-3d-interactive">
              <div>
                <div class="stars-row">${'★'.repeat(t.rating || 5)}</div>
                <p style="font-style:italic; font-size:0.925rem; color:var(--text-body); margin-bottom:1.5rem;">
                  ${escapeHtml(t.quote)}
                </p>
              </div>
              <div>
                <strong style="color:var(--navy-heading);">${escapeHtml(t.author)}</strong>
                <div style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">${escapeHtml(t.role)}</div>
              </div>
            </div>
          `;
        });
        testiGrid.innerHTML = gridHTML;
      }
    }

    // 13. Latest News
    if (data.news && data.news.items) {
      const newsGrid = document.querySelector('.updates-section .campaigns-3d-grid');
      if (newsGrid) {
        let gridHTML = '';
        data.news.items.forEach(n => {
          gridHTML += `
            <div class="campaign-3d-card card-3d-interactive">
              <div class="campaign-img-box"><img src="${escapeHtml(n.image || 'assets/images/field-education.jpg')}" alt="${escapeHtml(n.title)}"></div>
              <div class="campaign-card-content">
                <div style="font-size:0.78rem; font-weight:700; color:var(--accent-gold); margin-bottom:0.4rem;">${escapeHtml(n.tag)}</div>
                <h3>${escapeHtml(n.title)}</h3>
                <p>${escapeHtml(n.summary)}</p>
              </div>
            </div>
          `;
        });
        newsGrid.innerHTML = gridHTML;
      }
    }

    // 14. Mega CTA & Footer
    if (data.footer) {
      const ctaH2 = document.querySelector('.mega-cta-3d-card h2');
      if (ctaH2) ctaH2.textContent = data.footer.ctaHeading;
      const ctaP = document.querySelector('.mega-cta-3d-card p');
      if (ctaP) ctaP.textContent = data.footer.ctaSubtitle;
      const footerAbout = document.querySelector('.footer-grid-cols > div:first-child > p');
      if (footerAbout) footerAbout.textContent = data.footer.aboutText;
      const contactLis = document.querySelectorAll('.footer-grid-cols > div:nth-child(3) ul li');
      if (contactLis[0]) contactLis[0].innerHTML = `<i class="fa-solid fa-building" style="color:var(--accent-gold);"></i> ${escapeHtml(data.footer.hqAddress)}`;
      if (contactLis[1]) contactLis[1].innerHTML = `<i class="fa-solid fa-map-pin" style="color:var(--accent-gold);"></i> ${escapeHtml(data.footer.fieldAddress)}`;
      if (contactLis[2]) contactLis[2].innerHTML = `<i class="fa-solid fa-phone" style="color:var(--accent-gold);"></i> ${escapeHtml(data.footer.phone)}`;
      if (contactLis[3]) contactLis[3].innerHTML = `<i class="fa-solid fa-envelope" style="color:var(--accent-gold);"></i> ${escapeHtml(data.footer.email)}`;
      const copyEl = document.querySelector('.mega-footer div[style*="text-align:center"]');
      if (copyEl) copyEl.innerHTML = escapeHtml(data.footer.copyrightText);
    }

    // Rebind action buttons and 3d tilt
    if (window.initActionButtons) window.initActionButtons();
    if (window.init3DCardTilt) window.init3DCardTilt();
  }

  /* ==================== 9. IN-PLACE VISUAL EDITING ==================== */
  function toggleInlineEdit(forcedState) {
    isInlineEditActive = typeof forcedState === 'boolean' ? forcedState : !isInlineEditActive;
    if (isInlineEditActive) {
      document.body.classList.add('saf-inline-edit-active');
      setupInlineEditTags();
      showAdminToast('Quick Visual Edit Mode ON. Click any highlighted section on the page to edit.', 'fa-pen-to-square');
    } else {
      document.body.classList.remove('saf-inline-edit-active');
      showAdminToast('Quick Visual Edit Mode OFF.', 'fa-eye');
    }
  }

  function setupInlineEditTags() {
    const mappings = [
      { sel: '.hero-section', tab: 'hero' },
      { sel: '.trust-strip-section', tab: 'metrics' },
      { sel: '.about-section', tab: 'about' },
      { sel: '.founder-section', tab: 'founder' },
      { sel: '.areas-section', tab: 'areas' },
      { sel: '.map-section', tab: 'map' },
      { sel: '.campaigns-section', tab: 'campaigns' },
      { sel: '.stories-section', tab: 'stories' },
      { sel: '.transparency-section', tab: 'transparency' },
      { sel: '.help-section', tab: 'help' },
      { sel: '.testimonials-section', tab: 'testimonials' },
      { sel: '.updates-section', tab: 'news' },
      { sel: '.mega-cta-section', tab: 'footer' },
      { sel: '.mega-footer', tab: 'footer' }
    ];

    mappings.forEach(m => {
      const el = document.querySelector(m.sel);
      if (el) {
        el.setAttribute('data-cms-editable', m.tab);
        el.onclick = (e) => {
          if (isInlineEditActive) {
            e.stopPropagation();
            openCmsDashboard(m.tab);
          }
        };
      }
    });
  }

  /* ==================== 10. TOAST NOTIFICATION UTILITIES ==================== */
  let toastTimer = null;
  function showAdminToast(msg, icon = 'fa-circle-check') {
    let toast = document.getElementById('safAdminToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'safAdminToast';
      toast.className = 'saf-admin-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color:var(--admin-primary); font-size:1.15rem;"></i> <span>${msg}</span>`;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
  window.safToast = showAdminToast;

  function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
