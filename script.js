/**
 * Phạm Anh Tuấn (Tuan Pham) — Portfolio
 * Bilingual engine (EN | VI), Lucide icon layer with offline fallback,
 * scroll reveal, reading progress + ScrollSpy, animated filtering,
 * and an accessible case-study modal.
 */
(function () {
  'use strict';

  /* ========================================================================
     0. Configuration
     ======================================================================== */
  const STORAGE_KEY = 'tuanpham_portfolio_lang';
  const EMAIL_ADDRESS = 'phamanhtuan802@gmail.com';

  /**
   * Asset switches. Flip these only after the files exist in the repo,
   * otherwise visitors hit a 404 (and the console logs an error).
   *  - cvAvailable: add assets/cv/Pham-Anh-Tuan-CV.pdf, then set to true.
   *    While false, every CV button becomes a "Request CV" email link.
   *  - Per-project screenshots: set `image` on a project in PROJECTS below.
   *    While null, the modal shows the generated SVG blueprint.
   */
  const ASSETS = {
    cvAvailable: false,
    cvPath: 'assets/cv/Pham-Anh-Tuan-CV.pdf',
    cvFileName: 'Pham-Anh-Tuan-CV.pdf',
    // Profile links: paste the full URL to show the row in Contact (null = hidden).
    linkedinUrl: null, // e.g. 'https://www.linkedin.com/in/your-handle/'
    githubUrl: null // e.g. 'https://github.com/TuanPhamj'
  };

  const REDUCED_MOTION =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STAGGER_MS = 80;

  /* ========================================================================
     1. Icon layer — Lucide CDN first, inline fallback if it never arrives
     ======================================================================== */
  const ICON_FALLBACK = {
    'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'folder-kanban': '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/>',
    'cpu': '<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
    'briefcase': '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    'mail': '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    'file-down': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/>',
    'file-text': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    'palette': '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',
    'layers': '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
    'refresh-cw': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    'activity': '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
    'database': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
    'gauge': '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',
    'boxes': '<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>',
    'chart-column': '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    'building-2': '<path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>',
    'graduation-cap': '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    'phone': '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
    'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'factory': '<path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M8 16h.01"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
    'search-check': '<path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'workflow': '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
    'triangle-alert': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    'layout-grid': '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    'send': '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    'move-horizontal': '<path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/>',
    'shuffle': '<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/>',
    'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'code-xml': '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
    'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
  };

  const Icons = (function () {
    let fallbackMode = false;
    let fallbackTimer = null;
    const SVG_NS = 'http://www.w3.org/2000/svg';

    function lucideReady() {
      return !!(window.lucide && typeof window.lucide.createIcons === 'function');
    }

    /* createIcons() re-processes every [data-lucide] node, including SVGs it
       already rendered. Renaming the attribute after each pass means repeat
       calls only touch new placeholders — rendered icons (and any transition
       running on them) are left alone. */
    function markRendered() {
      document.querySelectorAll('svg[data-lucide]').forEach((svg) => {
        svg.setAttribute('data-icon', svg.getAttribute('data-lucide'));
        svg.removeAttribute('data-lucide');
      });
    }

    function renderFallback() {
      document.querySelectorAll('i[data-lucide]').forEach((el) => {
        const name = el.getAttribute('data-lucide');
        const inner = ICON_FALLBACK[name];
        if (!inner) return;
        const svg = document.createElementNS(SVG_NS, 'svg');
        Array.from(el.attributes).forEach((attr) => {
          if (attr.name !== 'data-lucide' && attr.name !== 'class') {
            svg.setAttribute(attr.name, attr.value);
          }
        });
        svg.setAttribute('xmlns', SVG_NS);
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('data-icon', name);
        svg.setAttribute('class', `lucide lucide-${name} ${el.getAttribute('class') || ''}`.trim());
        svg.innerHTML = inner;
        el.replaceWith(svg);
      });
    }

    /* Draw-in: each stroke inside a scroll-reveal card gets its own length (--len) and
       order (--draw-i), so CSS can trace the icon when the card reveals. A shape whose
       length can't be measured is simply left as-is (always fully drawn). */
    const DRAWABLE = 'path, circle, rect, line, polyline, polygon, ellipse';

    function prepareDraw() {
      if (REDUCED_MOTION) return;
      document.querySelectorAll('.reveal-item svg[data-icon]:not([data-draw-ready])').forEach((svg) => {
        svg.setAttribute('data-draw-ready', '');
        svg.querySelectorAll(DRAWABLE).forEach((shape, index) => {
          let length = 0;
          try {
            length = typeof shape.getTotalLength === 'function' ? shape.getTotalLength() : 0;
          } catch (_) {
            length = 0;
          }
          if (!(length > 0) || !isFinite(length)) return;
          // +1 so rounding never leaves a hairline gap at the end of the stroke.
          shape.style.setProperty('--len', (length + 1).toFixed(2));
          shape.style.setProperty('--draw-i', String(Math.min(index, 5)));
          shape.setAttribute('data-draw', '');
        });
      });
    }

    /** Call after any DOM update that adds <i data-lucide> placeholders. */
    function refresh() {
      if (lucideReady()) {
        try {
          window.lucide.createIcons();
        } catch (_) {
          fallbackMode = true;
        }
      }
      if (fallbackMode) renderFallback();
      markRendered();
      prepareDraw();
    }

    function enableFallback() {
      if (fallbackMode) return;
      fallbackMode = true;
      refresh();
    }

    function start() {
      refresh();
      if (lucideReady()) return;
      if (window.__lucideState === 'error') {
        enableFallback();
        return;
      }
      fallbackTimer = window.setTimeout(() => {
        if (!lucideReady()) enableFallback();
      }, 2500);
    }

    function onCdnReady() {
      window.clearTimeout(fallbackTimer);
      refresh();
    }

    return { refresh, start, onCdnReady, enableFallback };
  })();

  let booted = false;
  window.__onLucideReady = function () {
    if (booted) Icons.onCdnReady();
  };
  window.__onLucideError = function () {
    if (booted) Icons.enableFallback();
  };

  /* ========================================================================
     2. Bilingual dictionary (EN <-> VI)
     ======================================================================== */
  const I18N = {
    en: {
      pageTitle: 'Phạm Anh Tuấn (Tuan Pham) — Production Planning, Lean & Data Analytics Portfolio',
      skipToContent: 'Skip to main content',
      brandHome: 'Phạm Anh Tuấn — back to top',
      brandSub: 'Planning · Lean · BI',
      navLabel: 'Primary',
      navAbout: 'Overview',
      navProjects: 'Case Studies',
      navSkills: 'Skills',
      navTimeline: 'Experience',
      navContact: 'Contact',
      langGroup: 'Language',
      menuToggle: 'Open navigation menu',
      menuClose: 'Close navigation menu',
      btnDownloadCv: 'Download CV',
      btnRequestCv: 'Request CV',
      cvRequestSubject: 'CV request — Phạm Anh Tuấn',

      heroEyebrow: 'PRODUCTION PLANNING · LEAN · DATA AUTOMATION',
      heroRole: 'Production Planning & Operations Analytics · 2 manufacturing internships',
      heroEducation: 'BBA · School of Industrial Management, HCMUT – VNU-HCM · 2022–2026',
      heroSummary:
        'I model, schedule, and automate production lines — sequencing <strong>217 color SKUs</strong> on a <strong>4-stage line</strong> in FlexSim 3D, and replacing manual BOM reconciliation with <strong>Excel VBA &amp; Apps Script</strong> pipelines.',
      focusLabel: 'Focus areas',
      focusTag1: 'Shop-floor Lean & OEE',
      focusTag2: 'Simulation & Heijunka Scheduling',
      focusTag3: 'BOM / WIP Data Automation',
      btnViewProjects: 'Explore Case Studies',
      btnCopyEmail: 'Copy Email',
      btnCopied: 'Copied!',
      toolingLabel: 'Core stack',

      dossierLabel: 'Operations snapshot',
      portraitBadge: "HCMUT '26 • Ops & Data",
      dossierHeader: 'OPERATIONS SNAPSHOT',
      dossierStatus: 'OPEN TO WORK · 2026',
      metric1Label: 'Color SKUs sequenced',
      metric1Sub: 'Heijunka · SMED color families',
      metric2Unit: 'stages',
      metric2Label: 'Sequential line modeled',
      metric2Sub: 'FlexSim 3D + JS DES',
      metric3Label: 'BOM sync automated',
      metric3Sub: 'Excel VBA · Apps Script · SQL',
      metric4Label: 'OEE loss decomposition',
      metric4Sub: 'Time-study · Pareto · 5 Whys · 5S',
      metaLocationKey: 'Region',
      regionShort: 'HCMC (incl. former Binh Duong) · Dong Nai',
      metaEmailKey: 'Email',

      simHeaderTitle: 'PRJ-01 · ILLUSTRATIVE LINE MODEL // HEIJUNKA vs. RANDOM',
      simNdaBadge: 'Illustrative values · not plant data',
      simModeGroupAria: 'Production scheduling mode',
      simModeLabel: 'Mode:',
      simModeRandom: 'Random Sequence',
      simModeHeijunka: 'Heijunka Leveled',
      simKpiChangeoverHeijunka: 'Changeover: 4.1% of shift (Random: 18.4%)',
      simKpiChangeoverRandom: 'Changeover: 18.4% of shift (High)',
      simKpiBalanceHeijunka: 'Line Balance: 94.8%',
      simKpiBalanceRandom: 'Line Balance: 72.0%',
      simKpiStatusHeijunka: 'Status: Constraint Protected (217 SKUs)',
      simKpiStatusRandom: 'Status: Changeover Friction',
      stage1Name: '01. Barrel Printing',
      stage1Sub: 'Heat-Transfer Foil · 217 SKUs',
      stage1MetricHeijunka: 'Util: 89.2% · SMED Grouped',
      stage1MetricRandom: 'Util: 66.3% · Frequent Wash',
      stage2Name: '02. Cap Printing',
      stage2Sub: 'Pad Printing · Batch Sync',
      stage2MetricHeijunka: 'Util: 87.6% · Synced Takt',
      stage2MetricRandom: 'Util: 61.8% · Color Mismatch',
      stage3Name: '03. Cap Assembly',
      stage3Sub: 'Sub-Assembly · WIP Feeder',
      stage3MetricHeijunka: 'Util: 90.1% · Buffer Stable',
      stage3MetricRandom: 'Util: 58.4% · Starved / Blocked',
      stage4Name: '04. Final Assembly',
      stage4Sub: 'Nib + Ink + Barrel + Cap',
      stage4MetricHeijunka: 'Util: 95.6% · Constraint Protected',
      stage4MetricRandom: 'Util: 99.2% · BOTTLENECK QUEUE',
      stage4AlertHeijunka: 'Constraint · Buffered',
      stage4AlertRandom: 'Bottleneck Alert',
      wipPanelTitle: 'Dynamic WIP Safety Buffer Monitor',
      wipPanelSub: 'Inter-Stage Safety Stock & Automated BOM Replenishment',
      wipReadoutDefault: 'Current WIP Buffer: 2,450 / 3,000 units',
      wipReadoutFormat: (val) => `Current WIP Buffer: ${val.toLocaleString('en-US')} / 3,000 units`,
      wipThresholdTag: 'Threshold: 1,800',
      wipSafetyMark: 'Safety Min: 1,800',
      wipScaleMax: '3,000 units',
      wipSyncPillText: 'Safety Buffer Threshold -> Auto-Sync Triggered',
      oeePanelTitle: 'OEE Loss Decomposition',
      oeePanelSub: 'Availability × Performance × Quality',
      oee5sBadge: 'Worked example',
      oeeRingSub: 'OEE',
      oeeRingAria: 'Example OEE: 76.3%',
      oeeAvailLabel: 'Availability: 90.0%',
      oeePerfLabel: 'Performance: 87.0%',
      oeeQualLabel: 'Quality: 97.5%',

      aboutEyebrow: '01 // ENGINEERING APPROACH',
      aboutTitle: 'A Quantitative Approach to Operations',
      aboutSubhead: 'From shop-floor stopwatch to automated dashboard',
      aboutLead:
        'HCMUT Class of 2026 (Business Administration, School of Industrial Management) with two manufacturing internships. I turn constrained lines and messy factory records into schedules and data that planners can trust.',
      aboutProof1:
        '<strong>Thien Long Group</strong> (Long Thanh Plant) &amp; <strong>Duy Tan Recycling</strong> internships',
      aboutProof2:
        '<strong>217 color SKUs</strong> sequenced on a <strong>4-stage line</strong> in FlexSim 3D &amp; JS DES',
      aboutProof3: '<strong>100% automated</strong> ink-to-unit BOM sync with Excel VBA &amp; Apps Script',
      aboutProof4:
        'Downtime isolated with <strong>OEE</strong>, <strong>Pareto</strong> &amp; <strong>5 Whys RCA</strong>; <strong>5S</strong> standards deployed',
      step1Kicker: '01 // SHOP-FLOOR IE',
      step1Title: 'Measure & Standardize',
      step1Desc: 'Time-studies, OEE loss decomposition, 5S audits, and 5 Whys RCA at the workstation.',
      step2Kicker: '02 // 3D SIMULATION & DES',
      step2Title: 'Model & Simulate',
      step2Desc: 'FlexSim 3D and a JavaScript DES engine to stress-test Heijunka schedules and inter-stage buffers.',
      step3Kicker: '03 // DATA PIPELINES',
      step3Title: 'Automate & Control',
      step3Desc: 'BOM explosion, Power Query / SQL ETL, Apps Script WIP tracking, and shortage alerts.',

      projectsEyebrow: '02 // CASE STUDIES',
      projectsTitle: 'Industrial & Analytics Case Studies',
      projectsSubtitle:
        'Filter by domain, then open any card for the executive takeaway, a 4-part breakdown, and an NDA-safe system blueprint.',
      filterLabel: 'Filter case studies by domain',
      filterAll: 'All',
      filterSimulation: 'Simulation & Scheduling',
      filterAutomation: 'Data & BI Automation',
      filterLean: 'Lean & OEE',
      filterStatus: (shown, total) => `Showing ${shown} of ${total} case studies`,
      inspectAction: 'View case study',
      kpiLabel: 'Key results',

      skillsEyebrow: '03 // CAPABILITIES MATRIX',
      skillsTitle: 'Technical & Operational Skills',
      skillsSubtitle: 'Three pillars — each one backed by a case study above.',
      proofLabel: 'Proven in',
      openCaseAria: (code, title) => `Open case study ${code}: ${title}`,

      timelineEyebrow: '04 // EXPERIENCE & EDUCATION',
      timelineTitle: 'Plant Experience & Academic Track',
      timelineSubtitle: 'Shop-floor internships, student leadership, and a quantitative management degree.',
      relatedCases: 'Related case studies',

      contactEyebrow: '05 // CONTACT',
      contactTitle: 'Open to Production Planning, IE & Operations Analytics Roles',
      contactDesc:
        'Based in Ho Chi Minh City and available for plants across HCMC — including the former Binh Duong industrial parks — and Dong Nai. Reach me by email or phone / Zalo.',
      btnSendEmail: 'Send Email',
      contactEmailLabel: 'Email',
      contactPhoneLabel: 'Phone / Zalo',
      contactLinkedinLabel: 'LinkedIn',
      contactGithubLabel: 'GitHub',
      contactLocationLabel: 'Preferred region',
      contactLocationValue: 'Ho Chi Minh City (incl. former Binh Duong) · Dong Nai',
      contactEduLabel: 'University',
      contactEduValue: 'HCMUT – VNU-HCM · 2022–2026',

      footerCopy: '© 2026 Phạm Anh Tuấn (Tuan Pham) · Production Planning · Lean · Data Analytics',
      footerNavLabel: 'Footer',
      backToTop: 'Back to top',

      modalClose: 'Close case study',
      execBannerTitle: 'Executive Takeaway',
      ndaLabel: 'Sanitized mock data · NDA-safe',
      blueprintRegion: 'System blueprint (scrollable)',
      blueprintHint: 'Swipe to explore the blueprint',
      stackLabel: 'Tech stack',
      modalPrev: 'Previous Case Study',
      modalNext: 'Next Case Study',
      modalSectionTitles: {
        problem: 'Bottleneck',
        methodology: 'Methodology',
        architecture: 'Architecture',
        outcomes: 'Results'
      },
      toastCopied: 'Copied phamanhtuan802@gmail.com',
      toastCopyFailed: "Couldn't copy — email: phamanhtuan802@gmail.com"
    },

    vi: {
      pageTitle: 'Phạm Anh Tuấn (Tuan Pham) — Hồ sơ Hoạch định Sản xuất, Lean & Phân tích Dữ liệu',
      skipToContent: 'Chuyển đến nội dung chính',
      brandHome: 'Phạm Anh Tuấn — về đầu trang',
      brandSub: 'Hoạch định · Lean · BI',
      navLabel: 'Điều hướng chính',
      navAbout: 'Tổng quan',
      navProjects: 'Dự án',
      navSkills: 'Kỹ năng',
      navTimeline: 'Kinh nghiệm',
      navContact: 'Liên hệ',
      langGroup: 'Ngôn ngữ',
      menuToggle: 'Mở menu điều hướng',
      menuClose: 'Đóng menu điều hướng',
      btnDownloadCv: 'Tải CV',
      btnRequestCv: 'Yêu cầu CV',
      cvRequestSubject: 'Yêu cầu CV — Phạm Anh Tuấn',

      heroEyebrow: 'HOẠCH ĐỊNH SẢN XUẤT · LEAN · TỰ ĐỘNG HÓA DỮ LIỆU',
      heroRole: 'Hoạch định Sản xuất & Phân tích Vận hành · 2 kỳ thực tập nhà máy',
      heroEducation: 'QTKD · Khoa Quản lý Công nghiệp, ĐH Bách khoa – ĐHQG TP.HCM · 2022–2026',
      heroSummary:
        'Tôi mô hình hóa, điều độ và tự động hóa dây chuyền sản xuất — điều độ <strong>217 mã màu SKU</strong> trên <strong>chuyền 4 công đoạn</strong> bằng FlexSim 3D, và thay thế đối chiếu BOM thủ công bằng luồng <strong>Excel VBA &amp; Apps Script</strong>.',
      focusLabel: 'Lĩnh vực trọng tâm',
      focusTag1: 'Lean hiện trường & OEE',
      focusTag2: 'Mô phỏng & Điều độ Heijunka',
      focusTag3: 'Tự động hóa dữ liệu BOM / WIP',
      btnViewProjects: 'Xem các Dự án',
      btnCopyEmail: 'Sao chép Email',
      btnCopied: 'Đã sao chép!',
      toolingLabel: 'Công cụ chính',

      dossierLabel: 'Tóm tắt chỉ số vận hành',
      portraitBadge: "Bách Khoa '26 • Vận hành & Data",
      dossierHeader: 'CHỈ SỐ VẬN HÀNH',
      dossierStatus: 'SẴN SÀNG NHẬN VIỆC · 2026',
      metric1Label: 'Mã màu SKU được điều độ',
      metric1Sub: 'Heijunka · Gom nhóm màu SMED',
      metric2Unit: 'công đoạn',
      metric2Label: 'Chuyền nối tiếp được mô hình hóa',
      metric2Sub: 'FlexSim 3D + JS DES',
      metric3Label: 'Tự động đồng bộ BOM',
      metric3Sub: 'Excel VBA · Apps Script · SQL',
      metric4Label: 'Phân rã tổn thất OEE',
      metric4Sub: 'Bấm giờ · Pareto · 5 Whys · 5S',
      metaLocationKey: 'Khu vực',
      regionShort: 'TP.HCM (gồm Bình Dương cũ) · Đồng Nai',
      metaEmailKey: 'Email',

      simHeaderTitle: 'PRJ-01 · MÔ HÌNH CHUYỀN MINH HỌA // HEIJUNKA vs. NGẪU NHIÊN',
      simNdaBadge: 'Số liệu minh họa · không phải dữ liệu nhà máy',
      simModeGroupAria: 'Chế độ điều độ sản xuất',
      simModeLabel: 'Chế độ:',
      simModeRandom: 'Điều độ Ngẫu nhiên',
      simModeHeijunka: 'Cân bằng Heijunka',
      simKpiChangeoverHeijunka: 'Chuyển mã: 4.1% thời gian ca (Ngẫu nhiên: 18.4%)',
      simKpiChangeoverRandom: 'Chuyển mã: 18.4% thời gian ca (Cao)',
      simKpiBalanceHeijunka: 'Cân bằng Chuyền: 94.8%',
      simKpiBalanceRandom: 'Cân bằng Chuyền: 72.0%',
      simKpiStatusHeijunka: 'Trạng thái: Đã bảo vệ điểm ràng buộc (217 SKU)',
      simKpiStatusRandom: 'Trạng thái: Nghẽn Chuyển đổi Mã',
      stage1Name: '01. In chuyển nhiệt thân',
      stage1Sub: 'Màng nhiệt · 217 mã màu SKU',
      stage1MetricHeijunka: 'Hiệu suất: 89.2% · Gom nhóm SMED',
      stage1MetricRandom: 'Hiệu suất: 66.3% · Đổi màu liên tục',
      stage2Name: '02. In nắp',
      stage2Sub: 'In tampon · Đồng bộ lô',
      stage2MetricHeijunka: 'Hiệu suất: 87.6% · Đồng bộ nhịp Takt',
      stage2MetricRandom: 'Hiệu suất: 61.8% · Lệch mã màu',
      stage3Name: '03. Lắp nắp',
      stage3Sub: 'Lắp cụm phụ · Cấp phôi WIP',
      stage3MetricHeijunka: 'Hiệu suất: 90.1% · Đệm ổn định',
      stage3MetricRandom: 'Hiệu suất: 58.4% · Chờ phôi / Ứ đọng',
      stage4Name: '04. Lắp ráp hoàn chỉnh',
      stage4Sub: 'Ngòi + Mực + Thân + Nắp',
      stage4MetricHeijunka: 'Hiệu suất: 95.6% · Ràng buộc được bảo vệ',
      stage4MetricRandom: 'Hiệu suất: 99.2% · NGHẼN HÀNG ĐỢI',
      stage4AlertHeijunka: 'Ràng buộc · Có đệm',
      stage4AlertRandom: 'Cảnh báo Điểm nghẽn',
      wipPanelTitle: 'Giám sát Tồn kho Đệm WIP Động',
      wipPanelSub: 'Tồn kho Đệm Liên trạm & Tự động Bù vật tư BOM',
      wipReadoutDefault: 'Tồn kho Đệm WIP Hiện tại: 2,450 / 3,000 đơn vị',
      wipReadoutFormat: (val) => `Tồn kho Đệm WIP Hiện tại: ${val.toLocaleString('en-US')} / 3,000 đơn vị`,
      wipThresholdTag: 'Ngưỡng: 1,800',
      wipSafetyMark: 'Tối thiểu: 1,800',
      wipScaleMax: '3,000 đơn vị',
      wipSyncPillText: 'Chạm Ngưỡng Đệm An toàn -> Đã Kích hoạt Tự động Đồng bộ',
      oeePanelTitle: 'Phân rã Tổn thất OEE',
      oeePanelSub: 'Khả dụng × Hiệu suất × Chất lượng',
      oee5sBadge: 'Ví dụ tính toán',
      oeeRingSub: 'OEE',
      oeeRingAria: 'OEE ví dụ: 76.3%',
      oeeAvailLabel: 'Khả dụng (Availability): 90.0%',
      oeePerfLabel: 'Hiệu suất (Performance): 87.0%',
      oeeQualLabel: 'Chất lượng (Quality): 97.5%',

      aboutEyebrow: '01 // PHƯƠNG PHÁP KỸ THUẬT',
      aboutTitle: 'Tư duy Định lượng trong Vận hành',
      aboutSubhead: 'Từ đồng hồ bấm giờ tại xưởng đến dashboard tự động',
      aboutLead:
        'Khóa 2022–2026 ngành Quản trị Kinh doanh (Khoa Quản lý Công nghiệp, Bách khoa) với hai kỳ thực tập tại nhà máy. Tôi biến chuyền sản xuất nhiều ràng buộc và dữ liệu xưởng rời rạc thành lịch điều độ và số liệu mà kế hoạch viên có thể tin cậy.',
      aboutProof1:
        'Thực tập tại <strong>Tập đoàn Thiên Long</strong> (Nhà máy Long Thành) &amp; <strong>Duy Tân Recycling</strong>',
      aboutProof2:
        'Điều độ <strong>217 mã màu SKU</strong> trên <strong>chuyền 4 công đoạn</strong> bằng FlexSim 3D &amp; JS DES',
      aboutProof3: 'Đồng bộ BOM mực → sản phẩm <strong>tự động 100%</strong> bằng Excel VBA &amp; Apps Script',
      aboutProof4:
        'Khoanh vùng dừng máy bằng <strong>OEE</strong>, <strong>Pareto</strong> &amp; <strong>5 Whys RCA</strong>; triển khai chuẩn <strong>5S</strong>',
      step1Kicker: '01 // IE HIỆN TRƯỜNG',
      step1Title: 'Đo lường & Chuẩn hóa',
      step1Desc: 'Bấm giờ, phân rã tổn thất OEE, đánh giá 5S và 5 Whys RCA ngay tại trạm.',
      step2Kicker: '02 // MÔ PHỎNG 3D & DES',
      step2Title: 'Mô hình hóa & Mô phỏng',
      step2Desc: 'FlexSim 3D và JavaScript DES engine để kiểm thử lịch Heijunka và tồn đệm liên trạm.',
      step3Kicker: '03 // LUỒNG DỮ LIỆU',
      step3Title: 'Tự động hóa & Kiểm soát',
      step3Desc: 'Bóc tách BOM, ETL bằng Power Query / SQL, theo dõi WIP bằng Apps Script và cảnh báo thiếu hụt.',

      projectsEyebrow: '02 // DỰ ÁN TIÊU BIỂU',
      projectsTitle: 'Dự án Sản xuất & Phân tích Dữ liệu',
      projectsSubtitle:
        'Lọc theo lĩnh vực, rồi mở từng thẻ để xem tóm tắt cốt lõi, phân tích 4 phần và sơ đồ hệ thống đã ẩn danh theo NDA.',
      filterLabel: 'Lọc dự án theo lĩnh vực',
      filterAll: 'Tất cả',
      filterSimulation: 'Mô phỏng & Điều độ',
      filterAutomation: 'Tự động hóa Dữ liệu & BI',
      filterLean: 'Lean & OEE',
      filterStatus: (shown, total) => `Đang hiển thị ${shown}/${total} dự án`,
      inspectAction: 'Xem chi tiết',
      kpiLabel: 'Kết quả chính',

      skillsEyebrow: '03 // MA TRẬN NĂNG LỰC',
      skillsTitle: 'Kỹ năng Kỹ thuật & Vận hành',
      skillsSubtitle: 'Ba trụ cột năng lực — mỗi trụ cột đều có dự án minh chứng ở trên.',
      proofLabel: 'Minh chứng',
      openCaseAria: (code, title) => `Mở dự án ${code}: ${title}`,

      timelineEyebrow: '04 // KINH NGHIỆM & HỌC VẤN',
      timelineTitle: 'Kinh nghiệm Nhà máy & Quá trình Học tập',
      timelineSubtitle: 'Thực tập tại xưởng sản xuất, vai trò lãnh đạo sinh viên và nền tảng quản trị định lượng.',
      relatedCases: 'Dự án liên quan',

      contactEyebrow: '05 // LIÊN HỆ',
      contactTitle: 'Sẵn sàng cho vị trí Hoạch định Sản xuất, IE & Phân tích Vận hành',
      contactDesc:
        'Sinh sống tại TP.HCM, sẵn sàng làm việc tại các khu công nghiệp trên địa bàn TP.HCM (gồm Bình Dương cũ) và Đồng Nai. Liên hệ qua email hoặc điện thoại / Zalo.',
      btnSendEmail: 'Gửi Email',
      contactEmailLabel: 'Email',
      contactPhoneLabel: 'Điện thoại / Zalo',
      contactLinkedinLabel: 'LinkedIn',
      contactGithubLabel: 'GitHub',
      contactLocationLabel: 'Khu vực mong muốn',
      contactLocationValue: 'TP. Hồ Chí Minh (gồm Bình Dương cũ) · Đồng Nai',
      contactEduLabel: 'Trường Đại học',
      contactEduValue: 'Bách khoa (HCMUT) – ĐHQG TP.HCM · 2022–2026',

      footerCopy: '© 2026 Phạm Anh Tuấn (Tuan Pham) · Hoạch định Sản xuất · Lean · Phân tích Dữ liệu',
      footerNavLabel: 'Liên kết chân trang',
      backToTop: 'Lên đầu trang',

      modalClose: 'Đóng dự án',
      execBannerTitle: 'Tóm tắt cốt lõi',
      ndaLabel: 'Dữ liệu mô phỏng · Tuân thủ NDA',
      blueprintRegion: 'Sơ đồ hệ thống (có thể cuộn ngang)',
      blueprintHint: 'Vuốt ngang để xem toàn bộ sơ đồ',
      stackLabel: 'Công nghệ',
      modalPrev: 'Dự án trước',
      modalNext: 'Dự án tiếp theo',
      modalSectionTitles: {
        problem: 'Điểm nghẽn',
        methodology: 'Phương pháp',
        architecture: 'Kiến trúc',
        outcomes: 'Kết quả'
      },
      toastCopied: 'Đã sao chép phamanhtuan802@gmail.com',
      toastCopyFailed: 'Không thể sao chép — email: phamanhtuan802@gmail.com'
    }
  };

  /* ========================================================================
     3. Case studies (EN & VI)
     ======================================================================== */
  const DOMAIN_ICONS = { simulation: 'boxes', automation: 'database', lean: 'gauge' };
  const DOMAIN_LABEL_KEYS = {
    simulation: 'filterSimulation',
    automation: 'filterAutomation',
    lean: 'filterLean'
  };

  const PROJECTS = [
    {
      id: 'project-1',
      code: 'PRJ-01',
      fullCode: 'PRJ-01 // HEIJUNKA-DES',
      domain: 'simulation',
      image: null, // e.g. 'assets/images/project-1-heijunka-des.png'
      blueprintRef: {
        en: 'FIG. 01 // 4-STAGE DES & HEIJUNKA FLOW',
        vi: 'HÌNH 01 // LUỒNG DES 4 CÔNG ĐOẠN & HEIJUNKA'
      },
      techStack: ['FlexSim 3D', 'JavaScript DES', 'Heijunka', 'SMED', 'Kanban'],
      en: {
        org: 'Thien Long Group · Long Thanh Plant',
        title: '3D Discrete-Event Simulation & Heijunka Scheduler',
        kpis: [
          { v: '217', l: 'color SKUs sequenced' },
          { v: '4-stage', l: 'line balanced' },
          { v: '0', l: 'Kanban buffer overflows (simulated)' }
        ],
        cardBullets: [
          'Modeled a <strong>4-stage sequential Art Marker line</strong> — barrel printing → cap printing → cap assembly → final assembly — in <strong>FlexSim 3D</strong> and a custom <strong>JS DES engine</strong>.',
          'Sequenced <strong>217 color SKUs</strong> with <strong>Heijunka</strong> leveling and <strong>SMED</strong> color-family grouping to cut changeover loss.',
          'Identified <strong>final assembly</strong> as the constraint and protected it with capped <strong>Kanban buffers</strong> — <strong>0 buffer overflows</strong> across simulated shifts.'
        ],
        executiveTakeaway:
          'Synchronized a <strong>4-stage Art Marker line</strong> across <strong>217 color SKUs</strong> by pairing a <strong>FlexSim 3D</strong> simulation model with a browser-based <strong>JavaScript DES scheduler</strong> — the final-assembly constraint stays fed without inter-stage WIP build-up in simulated shifts, and planners get a standardized Heijunka changeover sequence they can reuse.',
        sections: {
          problem: [
            '4 sequential workcenters: barrel heat-transfer printing, cap printing, cap assembly, final assembly.',
            '217 color SKUs batched without coordination → repeated SMED changeovers.',
            'Cycle-time imbalance between cells caused WIP congestion before final assembly.'
          ],
          methodology: [
            'Heijunka level-scheduling with SMED color-family clustering.',
            'Multi-stage line balancing against takt time.',
            'FlexSim 3D simulation model + browser-native JavaScript DES engine for fast what-if runs.'
          ],
          architecture: [
            'Sequencing rule orders 217 SKUs to minimize shade-transition setups while smoothing shift volume.',
            'DES clock steps arrival → setup → process → transfer events through Stages 1–4.',
            'Kanban buffer caps between stages keep downstream stations fed but never flooded.'
          ],
          outcomes: [
            'Synchronized 4-stage schedule covering all 217 SKUs — final-assembly constraint protected, 0 buffer overflows in simulated shifts.',
            'Standardized inter-stage safety-buffer thresholds.',
            'Interactive web scheduler for planners, cross-validated against the FlexSim 3D model.'
          ]
        }
      },
      vi: {
        org: 'Tập đoàn Thiên Long · Nhà máy Long Thành',
        title: 'Mô phỏng Sự kiện Rời rạc 3D & Bộ Điều độ Heijunka',
        kpis: [
          { v: '217', l: 'mã màu SKU được điều độ' },
          { v: '4', l: 'công đoạn được cân bằng' },
          { v: '0', l: 'lần tràn tồn đệm Kanban (mô phỏng)' }
        ],
        cardBullets: [
          'Mô hình hóa <strong>chuyền Art Marker 4 công đoạn nối tiếp</strong> — in thân → in nắp → lắp nắp → lắp ráp hoàn chỉnh — trên <strong>FlexSim 3D</strong> và <strong>JS DES engine</strong> tự phát triển.',
          'Điều độ <strong>217 mã màu SKU</strong> theo <strong>Heijunka</strong> và gom nhóm màu <strong>SMED</strong> để giảm tổn thất chuyển đổi.',
          'Xác định <strong>lắp ráp hoàn chỉnh</strong> là điểm ràng buộc và bảo vệ bằng <strong>tồn đệm Kanban</strong> có giới hạn — <strong>0 lần tràn đệm</strong> trong các ca mô phỏng.'
        ],
        executiveTakeaway:
          'Đồng bộ <strong>chuyền Art Marker 4 công đoạn</strong> cho <strong>217 mã màu SKU</strong> bằng mô hình mô phỏng <strong>FlexSim 3D</strong> kết hợp <strong>bộ điều độ JavaScript DES</strong> chạy trên web — điểm ràng buộc ở lắp ráp hoàn chỉnh luôn đủ hàng mà không dồn ứ WIP liên trạm trong các ca mô phỏng, cùng trình tự chuyển đổi màu Heijunka chuẩn hóa để kế hoạch viên tái sử dụng.',
        sections: {
          problem: [
            '4 công đoạn nối tiếp: in chuyển nhiệt thân, in nắp, lắp nắp, lắp ráp hoàn chỉnh.',
            '217 mã màu được xếp lô thiếu phối hợp → chuyển đổi SMED lặp lại nhiều lần.',
            'Mất cân bằng nhịp giữa các trạm gây dồn ứ WIP trước công đoạn lắp ráp.'
          ],
          methodology: [
            'Điều độ san bằng Heijunka kết hợp gom nhóm màu SMED.',
            'Cân bằng chuyền đa công đoạn theo nhịp takt.',
            'Mô hình mô phỏng FlexSim 3D + JavaScript DES engine chạy trên trình duyệt để thử nhanh kịch bản.'
          ],
          architecture: [
            'Quy tắc sắp xếp 217 SKU giảm thiểu chuyển đổi sắc độ màu, đồng thời san đều sản lượng theo ca.',
            'Đồng hồ DES chạy tuần tự sự kiện đến → chuyển đổi → gia công → chuyển tiếp qua Công đoạn 1–4.',
            'Ngưỡng tồn đệm Kanban liên trạm giữ trạm sau luôn đủ hàng nhưng không bị dồn ứ.'
          ],
          outcomes: [
            'Lịch điều độ đồng bộ 4 công đoạn cho toàn bộ 217 SKU — bảo vệ điểm ràng buộc ở lắp ráp hoàn chỉnh, 0 lần tràn đệm trong các ca mô phỏng.',
            'Chuẩn hóa ngưỡng tồn đệm an toàn giữa các trạm.',
            'Bàn giao công cụ điều độ web tương tác, đã đối chiếu với mô hình FlexSim 3D.'
          ]
        }
      }
    },

    {
      id: 'project-2',
      code: 'PRJ-02',
      fullCode: 'PRJ-02 // WIP-BOM-SYNC',
      domain: 'automation',
      image: null, // e.g. 'assets/images/project-2-wip-bom.png'
      blueprintRef: {
        en: 'FIG. 02 // BOM EXPLOSION & WIP PIPELINE',
        vi: 'HÌNH 02 // LUỒNG BÓC TÁCH BOM & WIP'
      },
      techStack: ['Excel VBA', 'Power Query', 'Google Apps Script', 'QUERY()', 'SQL'],
      en: {
        org: 'Thien Long Group · Long Thanh Plant',
        title: 'Automated BOM Explosion & Multi-Stage WIP Tracker',
        kpis: [
          { v: '100%', l: 'BOM sync automated' },
          { v: 'kg → units', l: 'ink-to-marker conversion' },
          { v: 'Real-time', l: 'WIP shortage alerts' }
        ],
        cardBullets: [
          'Automated <strong>100% of BOM explosion</strong>, converting issued ink weight (kg) into exact marker unit counts per SKU.',
          'Tracked <strong>multi-stage WIP</strong> across production cells with <strong>Excel VBA, Power Query, Google Apps Script &amp; SQL</strong>.',
          'Raised <strong>dynamic safety-buffer alerts</strong> before shortages could starve downstream stations.'
        ],
        executiveTakeaway:
          'Replaced manual cross-sheet reconciliation with a <strong>100% automated BOM &amp; multi-stage WIP pipeline</strong> (<strong>Excel VBA, Power Query, Google Apps Script, SQL</strong>) — ink weight converts to unit counts automatically, and shortages are flagged before the line starves.',
        sections: {
          problem: [
            'Dispatch logged ink issuance by weight (kg); cell scheduling needed unit counts per SKU.',
            'Manual cross-sheet reconciliation added reporting lag and BOM conversion errors.',
            'WIP shortages went unflagged until a station ran dry.'
          ],
          methodology: [
            'MRP-style BOM explosion and multi-echelon WIP control.',
            'Excel VBA + Power Query for structured ingestion and cleansing.',
            'Google Apps Script + QUERY() for live shop-floor sync; SQL join logic across tables.'
          ],
          architecture: [
            'Output logs feed a normalized SKU–component schema.',
            'A conversion layer turns ink mass into equivalent marker units via per-SKU factors.',
            'Stage-level WIP balances recalculate continuously and alert below dynamic buffer thresholds.'
          ],
          outcomes: [
            '100% automated BOM synchronization across production stages.',
            'Manual spreadsheet conversion work eliminated.',
            'Real-time WIP visibility and proactive shortage alerts for supervisors and planners.'
          ]
        }
      },
      vi: {
        org: 'Tập đoàn Thiên Long · Nhà máy Long Thành',
        title: 'Hệ thống Tự động Bóc tách BOM & Theo dõi WIP Đa công đoạn',
        kpis: [
          { v: '100%', l: 'đồng bộ BOM tự động' },
          { v: 'kg → cái', l: 'quy đổi mực sang sản phẩm' },
          { v: 'Tức thời', l: 'cảnh báo thiếu hụt WIP' }
        ],
        cardBullets: [
          'Tự động <strong>100% quy trình bóc tách BOM</strong>, quy đổi khối lượng mực cấp phát (kg) thành số lượng bút chính xác theo SKU.',
          'Theo dõi <strong>WIP đa công đoạn</strong> giữa các tổ bằng <strong>Excel VBA, Power Query, Google Apps Script &amp; SQL</strong>.',
          'Phát <strong>cảnh báo tồn đệm động</strong> trước khi thiếu hụt làm đứt chuyền ở trạm sau.'
        ],
        executiveTakeaway:
          'Thay thế đối chiếu thủ công giữa nhiều bảng tính bằng <strong>luồng tự động 100% cho BOM &amp; WIP đa công đoạn</strong> (<strong>Excel VBA, Power Query, Google Apps Script, SQL</strong>) — khối lượng mực tự quy đổi sang số lượng sản phẩm, và thiếu hụt được cảnh báo trước khi chuyền bị đứt.',
        sections: {
          problem: [
            'Kho cấp phát ghi nhận mực theo khối lượng (kg); điều độ tổ cần số lượng sản phẩm theo SKU.',
            'Đối chiếu thủ công giữa nhiều bảng tính gây chậm báo cáo và sai số quy đổi BOM.',
            'Thiếu hụt WIP không được cảnh báo cho đến khi trạm hết hàng.'
          ],
          methodology: [
            'Bóc tách BOM theo logic MRP và kiểm soát WIP đa cấp.',
            'Excel VBA + Power Query để nạp và chuẩn hóa dữ liệu nguồn.',
            'Google Apps Script + QUERY() đồng bộ trực tiếp với xưởng; logic SQL liên kết bảng.'
          ],
          architecture: [
            'Nhật ký sản lượng đổ vào mô hình dữ liệu SKU–linh kiện đã chuẩn hóa.',
            'Lớp quy đổi chuyển khối lượng mực sang số bút tương đương theo hệ số từng SKU.',
            'Số dư WIP từng công đoạn được tính lại liên tục và cảnh báo khi xuống dưới ngưỡng tồn đệm động.'
          ],
          outcomes: [
            'Tự động 100% đồng bộ BOM xuyên suốt các công đoạn.',
            'Loại bỏ thao tác quy đổi thủ công trên bảng tính.',
            'Tổ trưởng và kế hoạch viên nắm WIP theo thời gian thực, nhận cảnh báo thiếu hụt chủ động.'
          ]
        }
      }
    },

    {
      id: 'project-3',
      code: 'PRJ-03',
      fullCode: 'PRJ-03 // OEE-TIME-5S',
      domain: 'lean',
      image: null, // e.g. 'assets/images/project-3-oee-5s.png'
      blueprintRef: {
        en: 'FIG. 03 // OEE DECOMPOSITION, PARETO & 5S',
        vi: 'HÌNH 03 // PHÂN RÃ OEE, PARETO & 5S'
      },
      techStack: ['OEE', 'Time Study', 'Pareto 80/20', '5 Whys RCA', '5S'],
      en: {
        org: 'Duy Tan Recycling',
        title: 'OEE, Time-Study & 5S Root-Cause Improvement',
        kpis: [
          { v: 'A×P×Q', l: 'OEE loss map' },
          { v: '80/20', l: 'Pareto downtime ranking' },
          { v: '5 Whys', l: 'RCA → SOP & 5S' }
        ],
        cardBullets: [
          'Ran <strong>stopwatch time-studies</strong> and decomposed <strong>OEE</strong> into Availability × Performance × Quality losses.',
          'Ranked unplanned downtime with <strong>Pareto 80/20</strong> and traced root causes via <strong>5 Whys RCA</strong>.',
          'Standardized operator <strong>SOPs</strong> and rolled out <strong>5S visual controls</strong> at each workstation.'
        ],
        executiveTakeaway:
          'Located the real equipment losses on a plastic-recycling line with <strong>stopwatch time-study</strong> and an <strong>OEE bottleneck map</strong>, then used <strong>Pareto 80/20 &amp; 5 Whys RCA</strong> to remove recurring micro-stop triggers and lock in <strong>SOP &amp; 5S visual standards</strong>.',
        sections: {
          problem: [
            'Frequent unplanned micro-stops and fluctuating shift throughput.',
            'No documented cycle-time standards for operators.',
            'Downtime was not categorized, hiding the main utilization losses.'
          ],
          methodology: [
            'Stopwatch Time & Work Study for cycle-time baselines.',
            'OEE loss tree: Availability × Performance × Quality.',
            'Pareto 80/20 ranking, 5 Whys RCA, Standard Work, and 5S.'
          ],
          architecture: [
            'Shift stoppage logs and cycle samples bucketed into breakdowns, setup, micro-stops, and quality rejects.',
            'A Pareto filter isolates the top loss buckets for 5 Whys fault-tree analysis.',
            'Each root cause maps to a countermeasure: SOP update, tooling layout, or 5S visual zone.'
          ],
          outcomes: [
            'OEE bottleneck map of the critical machine cluster.',
            'Standardized cycle-time baselines for operator workflows.',
            'Recurring downtime triggers removed via 5 Whys; 5S visual controls in place at workstations.'
          ]
        }
      },
      vi: {
        org: 'Duy Tân Recycling',
        title: 'Cải tiến OEE, Bấm giờ & 5S theo Nguyên nhân Gốc',
        kpis: [
          { v: 'A×P×Q', l: 'bản đồ tổn thất OEE' },
          { v: '80/20', l: 'xếp hạng dừng máy Pareto' },
          { v: '5 Whys', l: 'RCA → SOP & 5S' }
        ],
        cardBullets: [
          'Bấm giờ <strong>Time-Study</strong> và phân rã <strong>OEE</strong> thành tổn thất Khả dụng × Hiệu suất × Chất lượng.',
          'Xếp hạng dừng máy ngoài kế hoạch bằng <strong>Pareto 80/20</strong> và truy nguyên nhân gốc với <strong>5 Whys RCA</strong>.',
          'Chuẩn hóa <strong>SOP</strong> thao tác và triển khai <strong>quản lý trực quan 5S</strong> tại từng trạm.'
        ],
        executiveTakeaway:
          'Xác định đúng tổn thất thiết bị trên chuyền tái chế nhựa bằng <strong>bấm giờ Time-Study</strong> và <strong>bản đồ điểm nghẽn OEE</strong>, sau đó dùng <strong>Pareto 80/20 &amp; 5 Whys RCA</strong> để loại bỏ nguyên nhân dừng vặt lặp lại và duy trì <strong>chuẩn SOP &amp; 5S trực quan</strong>.',
        sections: {
          problem: [
            'Dừng vặt ngoài kế hoạch thường xuyên, sản lượng dao động giữa các ca.',
            'Chưa có định mức thời gian chu kỳ chuẩn cho công nhân.',
            'Dừng máy chưa được phân loại nên tổn thất chính bị che khuất.'
          ],
          methodology: [
            'Nghiên cứu Thời gian & Thao tác (bấm giờ) để lập định mức chu kỳ.',
            'Cây tổn thất OEE: Khả dụng × Hiệu suất × Chất lượng.',
            'Xếp hạng Pareto 80/20, 5 Whys RCA, Thao tác chuẩn và 5S.'
          ],
          architecture: [
            'Nhật ký dừng máy theo ca và mẫu bấm giờ được gom vào các nhóm: hỏng hóc, chuyển đổi, dừng vặt, phế phẩm.',
            'Bộ lọc Pareto khoanh vùng nhóm tổn thất lớn nhất để phân tích cây lỗi 5 Whys.',
            'Mỗi nguyên nhân gốc gắn với một biện pháp: cập nhật SOP, bố trí dụng cụ hoặc vùng trực quan 5S.'
          ],
          outcomes: [
            'Bản đồ điểm nghẽn OEE cho cụm máy trọng yếu.',
            'Bộ định mức thời gian chu kỳ chuẩn cho thao tác công nhân.',
            'Loại bỏ nguyên nhân dừng máy lặp lại nhờ 5 Whys; áp dụng quản lý trực quan 5S tại trạm.'
          ]
        }
      }
    }
  ];

  /* ========================================================================
     4. Skills matrix (EN & VI) — each pillar links to its proof
     ======================================================================== */
  const SKILLS_MATRIX = [
    {
      domain: 'lean',
      icon: 'gauge',
      proof: ['project-3', 'project-1'],
      en: {
        code: '01 // IE & LEAN',
        title: 'Industrial Engineering & Lean',
        desc: 'Measure the floor, find the constraint, remove the waste.',
        skills: ['Heijunka', 'SMED', 'VSM', 'OEE', 'Time & Work Study', '5S', '5 Whys RCA', 'Standard Work (SOP)']
      },
      vi: {
        code: '01 // IE & LEAN',
        title: 'Kỹ thuật Công nghiệp & Lean',
        desc: 'Đo lường hiện trường, tìm điểm nghẽn, loại bỏ lãng phí.',
        skills: ['Heijunka', 'SMED', 'VSM', 'OEE', 'Bấm giờ (Time Study)', '5S', '5 Whys RCA', 'Thao tác chuẩn (SOP)']
      }
    },
    {
      domain: 'simulation',
      icon: 'boxes',
      proof: ['project-1', 'project-2'],
      en: {
        code: '02 // SIM & PLAN',
        title: 'Simulation & Scheduling',
        desc: 'Stress-test schedules and buffers before they reach the line.',
        skills: ['FlexSim 3D', 'Discrete-Event Simulation (JS)', 'Line Balancing', 'Capacity Planning', 'MRP / BOM Explosion']
      },
      vi: {
        code: '02 // MÔ PHỎNG & HOẠCH ĐỊNH',
        title: 'Mô phỏng & Điều độ',
        desc: 'Kiểm thử lịch sản xuất và tồn đệm trước khi đưa xuống chuyền.',
        skills: ['FlexSim 3D', 'Mô phỏng DES (JS)', 'Cân bằng chuyền', 'Hoạch định công suất', 'MRP / Bóc tách BOM']
      }
    },
    {
      domain: 'automation',
      icon: 'chart-column',
      proof: ['project-2'],
      en: {
        code: '03 // DATA & BI',
        title: 'Data Analytics & Automation',
        desc: 'Replace manual reconciliation with pipelines and live KPIs.',
        skills: ['Excel VBA', 'Power Query', 'Google Apps Script', 'SQL', 'Python', 'Power BI']
      },
      vi: {
        code: '03 // DỮ LIỆU & BI',
        title: 'Phân tích Dữ liệu & Tự động hóa',
        desc: 'Thay đối chiếu thủ công bằng luồng dữ liệu tự động và KPI trực tiếp.',
        skills: ['Excel VBA', 'Power Query', 'Google Apps Script', 'SQL', 'Python', 'Power BI']
      }
    }
  ];

  /* ========================================================================
     5. Experience & education timeline (EN & VI)
     ======================================================================== */
  const TIMELINE_ITEMS = [
    {
      date: '05/2026 – 11/2026',
      icon: 'factory',
      cases: ['project-1', 'project-2'],
      en: {
        role: 'Production Planning & Scheduling Intern',
        org: 'Thien Long Group — Long Thanh Manufacturing Plant',
        type: 'Internship',
        bullets: [
          'Modeled a <strong>4-stage Art Marker line</strong> in <strong>FlexSim 3D</strong> and a custom <strong>JavaScript DES engine</strong> to validate shift capacity and line balance.',
          'Sequenced <strong>217 color SKUs</strong> with <strong>Heijunka &amp; SMED grouping</strong> — final-assembly constraint protected, <strong>0 buffer overflows</strong> in simulated shifts.',
          'Automated <strong>100% of BOM explosion</strong> (ink kg → units) and real-time WIP shortage alerts with <strong>Excel VBA, Power Query, Apps Script &amp; SQL</strong>.'
        ]
      },
      vi: {
        role: 'Thực tập sinh Hoạch định & Điều độ Sản xuất',
        org: 'Tập đoàn Thiên Long — Nhà máy Long Thành',
        type: 'Thực tập',
        bullets: [
          'Mô hình hóa <strong>chuyền Art Marker 4 công đoạn</strong> trên <strong>FlexSim 3D</strong> và <strong>JavaScript DES engine</strong> tự phát triển để kiểm chứng công suất ca và cân bằng chuyền.',
          'Điều độ <strong>217 mã màu SKU</strong> theo <strong>Heijunka &amp; gom nhóm SMED</strong> — bảo vệ điểm ràng buộc ở lắp ráp hoàn chỉnh, <strong>0 lần tràn đệm</strong> trong các ca mô phỏng.',
          'Tự động <strong>100% bóc tách BOM</strong> (kg mực → sản phẩm) và cảnh báo thiếu hụt WIP tức thời bằng <strong>Excel VBA, Power Query, Apps Script &amp; SQL</strong>.'
        ]
      }
    },
    {
      date: '06/2025 – 08/2025',
      icon: 'factory',
      cases: ['project-3'],
      en: {
        role: 'Production & Lean Intern',
        org: 'Duy Tan Recycling',
        type: 'Internship',
        bullets: [
          'Timed plastic-recycling machinery with <strong>stopwatch time-studies</strong> to set standard cycle-time baselines.',
          'Measured <strong>OEE</strong> and ranked unplanned downtime drivers with <strong>Pareto 80/20 &amp; 5 Whys RCA</strong>.',
          'Standardized operator <strong>SOPs</strong> and deployed <strong>5S visual controls</strong> across workstations.'
        ]
      },
      vi: {
        role: 'Thực tập sinh Sản xuất & Lean',
        org: 'Duy Tân Recycling',
        type: 'Thực tập',
        bullets: [
          'Bấm giờ <strong>Time-Study</strong> cho máy tái chế nhựa để lập định mức thời gian chu kỳ chuẩn.',
          'Đo <strong>OEE</strong> và xếp hạng nguyên nhân dừng máy ngoài kế hoạch bằng <strong>Pareto 80/20 &amp; 5 Whys RCA</strong>.',
          'Chuẩn hóa <strong>SOP</strong> thao tác và triển khai <strong>quản lý trực quan 5S</strong> tại các trạm.'
        ]
      }
    },
    {
      date: '2025 – 2026',
      icon: 'users',
      cases: [],
      en: {
        role: 'President',
        org: 'E-Marketing Action Club (EMA) · HCMUT',
        type: 'Leadership',
        bullets: [
          'Led <strong>club operations</strong>, cross-functional project teams, and member development at <strong>HCMUT</strong>.',
          'Managed <strong>academic alliances &amp; corporate partnerships</strong>, tracking milestone KPIs and deliverable quality.'
        ]
      },
      vi: {
        role: 'Chủ nhiệm Câu lạc bộ',
        org: 'CLB E-Marketing Action (EMA) · HCMUT',
        type: 'Lãnh đạo',
        bullets: [
          'Điều hành <strong>hoạt động CLB</strong>, các nhóm dự án liên chức năng và phát triển thành viên tại <strong>HCMUT</strong>.',
          'Quản lý <strong>liên kết học thuật &amp; đối tác doanh nghiệp</strong>, theo dõi KPI tiến độ và chất lượng đầu ra.'
        ]
      }
    },
    {
      date: '2022 – 2026',
      icon: 'graduation-cap',
      cases: [],
      en: {
        role: 'Bachelor of Business Administration',
        org: 'School of Industrial Management · Ho Chi Minh City University of Technology – VNU-HCM',
        type: 'Education',
        bullets: [
          'Focus: <strong>Production Planning &amp; Scheduling</strong>, <strong>Lean Manufacturing</strong>, <strong>Operations Research</strong>, and <strong>Quantitative Data Analytics</strong>.'
        ]
      },
      vi: {
        role: 'Cử nhân Quản trị Kinh doanh',
        org: 'Khoa Quản lý Công nghiệp · Trường Đại học Bách khoa – ĐHQG TP.HCM',
        type: 'Học vấn',
        bullets: [
          'Trọng tâm: <strong>Hoạch định &amp; Điều độ Sản xuất</strong>, <strong>Sản xuất Tinh gọn (Lean)</strong>, <strong>Vận trù học</strong> và <strong>Phân tích Dữ liệu Định lượng</strong>.'
        ]
      }
    }
  ];

  /* ========================================================================
     6. Helpers
     ======================================================================== */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  function findProject(id) {
    return PROJECTS.find((p) => p.id === id) || null;
  }

  function t(key) {
    const dict = I18N[currentLang];
    return dict[key] !== undefined ? dict[key] : I18N.en[key];
  }

  /* ========================================================================
     7. Localized SVG blueprints (NDA-safe stand-ins for screenshots)
     ======================================================================== */
  function buildBlueprintSvg(projectId, lang) {
    const vi = lang === 'vi';
    const e = escapeHtml;
    const MONO = 'JetBrains Mono, ui-monospace, monospace';

    const frame = (id, title, subtitle, badge, badgeX, badgeW) => `
      <defs>
        <pattern id="bp-grid-${id}" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DBEAFE" stroke-width="0.8"/>
        </pattern>
        <marker id="bp-arrow-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB"/>
        </marker>
      </defs>
      <rect width="880" height="340" fill="#F8FAFC"/>
      <rect width="880" height="340" fill="url(#bp-grid-${id})"/>
      <rect x="14" y="14" width="852" height="312" rx="10" fill="none" stroke="#93C5FD" stroke-width="1.4"/>
      <rect x="14" y="14" width="852" height="40" rx="10" fill="#EFF6FF"/>
      <line x1="14" y1="54" x2="866" y2="54" stroke="#93C5FD" stroke-width="1.2"/>
      <text x="30" y="34" font-family="${MONO}" font-size="11.5" font-weight="700" fill="#1D4ED8">${e(title)}</text>
      <text x="30" y="48" font-family="${MONO}" font-size="9.5" fill="#0369A1">${e(subtitle)}</text>
      ${
        badge
          ? `<rect x="${badgeX}" y="22" width="${badgeW}" height="24" rx="12" fill="#DBEAFE" stroke="#93C5FD"/>
             <text x="${badgeX + badgeW / 2}" y="38" text-anchor="middle" font-family="${MONO}" font-size="9.5" font-weight="700" fill="#1D4ED8">${e(badge)}</text>`
          : ''
      }`;

    if (projectId === 'project-1') {
      const L = vi
        ? {
            title: 'CÂN BẰNG CHUYỀN 4 CÔNG ĐOẠN & ĐIỀU ĐỘ HEIJUNKA (217 MÃ MÀU)',
            subtitle: 'SONG SINH SỐ FLEXSIM 3D + JAVASCRIPT DES ENGINE',
            badge: 'HÀNG CHỜ NGHẼN (MÔ PHỎNG): 0',
            stage: 'CÔNG ĐOẠN',
            s: ['In chuyển nhiệt thân', 'In nắp bút', 'Lắp nắp', 'Lắp ráp hoàn chỉnh'],
            node: 'NÚT DES',
            output: 'ĐẦU RA DES',
            buf: 'ĐỆM WIP',
            matrix: 'TRÌNH TỰ HEIJUNKA · 217 SKU MÀU (GOM NHÓM SMED)',
            w: ['NHÓM A · MÀU NHẠT', 'NHÓM B · TRUNG TÍNH', 'NHÓM C · MÀU ĐẬM'],
            takt: 'NHỊP TAKT MỤC TIÊU'
          }
        : {
            title: '4-STAGE SEQUENTIAL LINE BALANCING & HEIJUNKA SCHEDULER (217 SKUs)',
            subtitle: 'FLEXSIM 3D DIGITAL TWIN + JAVASCRIPT DES ENGINE',
            badge: 'SIM BOTTLENECK QUEUE: 0',
            stage: 'STAGE',
            s: ['Barrel Heat-Transfer', 'Cap Printing', 'Cap Assembly', 'Final Assembly'],
            node: 'DES NODE',
            output: 'DES OUTPUT',
            buf: 'WIP BUF',
            matrix: 'HEIJUNKA LEVELING SEQUENCE · 217 COLOR SKUs (SMED GROUPED)',
            w: ['WAVE A · LIGHT INK', 'WAVE B · MID TONE', 'WAVE C · DEEP INK'],
            takt: 'TAKT TARGET LINE'
          };

      const stages = [
        { x: 28, w: 152 },
        { x: 264, w: 144 },
        { x: 492, w: 144 },
        { x: 720, w: 132 }
      ];
      const stageSvg = stages
        .map((st, i) => {
          const cx = st.x + st.w / 2;
          const last = i === stages.length - 1;
          return `
            <rect x="${st.x}" y="78" width="${st.w}" height="78" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8"/>
            <rect x="${st.x}" y="78" width="${st.w}" height="22" rx="8" fill="${last ? '#2563EB' : '#DBEAFE'}"/>
            <text x="${cx}" y="93" text-anchor="middle" font-family="${MONO}" font-size="10.5" font-weight="700" fill="${last ? '#FFFFFF' : '#1D4ED8'}">${e(L.stage)} 0${i + 1}</text>
            <text x="${cx}" y="122" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#0F172A">${e(L.s[i])}</text>
            <text x="${cx}" y="141" text-anchor="middle" font-family="${MONO}" font-size="9.5" fill="#0369A1">${e(last ? L.output : `${L.node} 0${i + 1}`)}</text>`;
        })
        .join('');
      const buffers = [180, 408, 636]
        .map((x, i) => `
            <line x1="${x}" y1="117" x2="${x + 16}" y2="117" stroke="#2563EB" stroke-width="2" marker-end="url(#bp-arrow-1)"/>
            <rect x="${x + 20}" y="96" width="44" height="42" rx="6" fill="#EFF6FF" stroke="#0284C7" stroke-dasharray="3 2"/>
            <text x="${x + 42}" y="113" text-anchor="middle" font-family="${MONO}" font-size="9" font-weight="700" fill="#0369A1">B${i + 1}</text>
            <text x="${x + 42}" y="128" text-anchor="middle" font-family="${MONO}" font-size="7.5" fill="#475569">${e(L.buf)}</text>
            <line x1="${x + 64}" y1="117" x2="${x + 80}" y2="117" stroke="#2563EB" stroke-width="2" marker-end="url(#bp-arrow-1)"/>`)
        .join('');
      const bars = [
        [65, 266, 30, '#93C5FD'], [145, 268, 28, '#93C5FD'], [225, 265, 31, '#60A5FA'],
        [305, 267, 29, '#60A5FA'], [385, 265, 31, '#3B82F6'], [465, 266, 30, '#3B82F6'],
        [545, 268, 28, '#2563EB'], [625, 265, 31, '#2563EB'], [705, 266, 30, '#1D4ED8']
      ]
        .map(([x, y, h, c]) => `<rect x="${x}" y="${y}" width="60" height="${h}" rx="3" fill="${c}"/>`)
        .join('');

      return `
        <svg viewBox="0 0 880 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${e(L.title)}">
          <title>${e(L.title)}</title>
          ${frame(1, L.title, L.subtitle, L.badge, 630, 222)}
          ${stageSvg}
          ${buffers}
          <rect x="30" y="176" width="822" height="134" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.2"/>
          <text x="46" y="198" font-family="${MONO}" font-size="10.5" font-weight="700" fill="#0F172A">${e(L.matrix)}</text>
          <rect x="46" y="212" width="230" height="24" rx="5" fill="#DBEAFE" stroke="#93C5FD"/>
          <text x="161" y="228" text-anchor="middle" font-family="${MONO}" font-size="10" font-weight="700" fill="#1D4ED8">${e(L.w[0])} (001–072)</text>
          <rect x="292" y="212" width="265" height="24" rx="5" fill="#EFF6FF" stroke="#2563EB"/>
          <text x="424" y="228" text-anchor="middle" font-family="${MONO}" font-size="10" font-weight="700" fill="#1D4ED8">${e(L.w[1])} (073–148)</text>
          <rect x="573" y="212" width="262" height="24" rx="5" fill="#2563EB"/>
          <text x="704" y="228" text-anchor="middle" font-family="${MONO}" font-size="10" font-weight="700" fill="#FFFFFF">${e(L.w[2])} (149–217)</text>
          <line x1="46" y1="264" x2="835" y2="264" stroke="#0284C7" stroke-width="1.4" stroke-dasharray="5 4"/>
          <text x="835" y="258" text-anchor="end" font-family="${MONO}" font-size="9" font-weight="700" fill="#0369A1">${e(L.takt)}</text>
          ${bars}
        </svg>`;
    }

    if (projectId === 'project-2') {
      const L = vi
        ? {
            title: 'KIẾN TRÚC TỰ ĐỘNG BÓC TÁCH BOM & THEO DÕI WIP ĐA CÔNG ĐOẠN',
            subtitle: 'EXCEL VBA · POWER QUERY · GOOGLE APPS SCRIPT · QUERY() · SQL',
            badge: '100% ĐỒNG BỘ BOM',
            n: [
              ['NHẬT KÝ MỰC (KG)', 'Dữ liệu cấp phát', 'Power Query ETL'],
              ['ĐỘNG CƠ BOM', 'Quy đổi kg → cái', 'Ma trận Excel VBA'],
              ['SỔ CÁI WIP', 'Apps Script / SQL', 'QUERY() thời gian thực'],
              ['CẢNH BÁO THIẾU', 'Ngưỡng tồn đệm động', 'Kích hoạt tự động']
            ],
            chart: 'ĐỘ PHỦ WIP ĐA CÔNG ĐOẠN SO VỚI NGƯỠNG TỒN ĐỆM ĐỘNG (DỮ LIỆU MẪU)',
            threshold: 'NGƯỠNG TỒN ĐỆM ĐỘNG',
            alert: 'CẢNH BÁO BÙ VẬT TƯ',
            cells: ['TỔ 01 · THÂN BÚT', 'TỔ 02 · NẮP', 'TỔ 03 · LÔ MỰC', 'TỔ 04 · HOÀN THIỆN', 'ĐỆM THÀNH PHẨM']
          }
        : {
            title: 'AUTOMATED BOM EXPLOSION & MULTI-STAGE WIP TRACKING ARCHITECTURE',
            subtitle: 'EXCEL VBA · POWER QUERY · GOOGLE APPS SCRIPT · QUERY() · SQL',
            badge: '100% BOM SYNC',
            n: [
              ['INK MASS LOG (KG)', 'Raw material input', 'Power Query ETL'],
              ['BOM ENGINE', 'Weight → unit sync', 'Excel VBA matrix'],
              ['WIP LEDGER', 'Apps Script / SQL', 'Real-time QUERY()'],
              ['SHORTAGE ALERT', 'Dynamic buffer', 'Automated trigger']
            ],
            chart: 'MULTI-STAGE WIP COVERAGE VS. DYNAMIC SAFETY BUFFER (SANITIZED MOCK)',
            threshold: 'DYNAMIC SAFETY BUFFER',
            alert: 'REPLENISH TRIGGER',
            cells: ['CELL 01 · BARREL', 'CELL 02 · CAP', 'CELL 03 · INK LOT', 'CELL 04 · FINAL', 'FG BUFFER']
          };

      const nodes = [
        { x: 30, w: 175 },
        { x: 242, w: 180 },
        { x: 459, w: 180 },
        { x: 676, w: 176 }
      ];
      const nodeSvg = nodes
        .map((nd, i) => {
          const cx = nd.x + nd.w / 2;
          const last = i === nodes.length - 1;
          const arrow =
            i < nodes.length - 1
              ? `<line x1="${nd.x + nd.w}" y1="114" x2="${nodes[i + 1].x - 4}" y2="114" stroke="#2563EB" stroke-width="2" marker-end="url(#bp-arrow-2)"/>`
              : '';
          return `
            <rect x="${nd.x}" y="76" width="${nd.w}" height="76" rx="8" fill="#FFFFFF" stroke="${last ? '#0284C7' : '#2563EB'}" stroke-width="1.7"/>
            <rect x="${nd.x}" y="76" width="${nd.w}" height="22" rx="8" fill="${last ? '#2563EB' : '#DBEAFE'}"/>
            <text x="${cx}" y="91" text-anchor="middle" font-family="${MONO}" font-size="9.5" font-weight="700" fill="${last ? '#FFFFFF' : '#1D4ED8'}">0${i + 1} · ${e(L.n[i][0])}</text>
            <text x="${cx}" y="119" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#0F172A">${e(L.n[i][1])}</text>
            <text x="${cx}" y="138" text-anchor="middle" font-family="${MONO}" font-size="9.5" fill="${last ? '#0369A1' : '#5B6B80'}">${e(L.n[i][2])}</text>
            ${arrow}`;
        })
        .join('');
      const cellBars = [
        [75, 210, 76, '#2563EB'],
        [235, 218, 68, '#3B82F6'],
        null,
        [555, 212, 74, '#2563EB'],
        [715, 222, 64, '#60A5FA']
      ]
        .map((b, i) => {
          const cx = [120, 280, 440, 600, 760][i];
          const bar = b
            ? `<rect x="${b[0]}" y="${b[1]}" width="90" height="${b[2]}" rx="4" fill="${b[3]}"/>`
            : `<rect x="395" y="252" width="90" height="34" rx="4" fill="#93C5FD" stroke="#0284C7" stroke-width="1.5"/>
               <rect x="389" y="226" width="102" height="20" rx="4" fill="#DBEAFE" stroke="#2563EB"/>
               <text x="440" y="240" text-anchor="middle" font-family="${MONO}" font-size="8" font-weight="700" fill="#1D4ED8">${e(L.alert)}</text>`;
          return `${bar}<text x="${cx}" y="300" text-anchor="middle" font-family="${MONO}" font-size="9.5" fill="#475569">${e(L.cells[i])}</text>`;
        })
        .join('');

      return `
        <svg viewBox="0 0 880 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${e(L.title)}">
          <title>${e(L.title)}</title>
          ${frame(2, L.title, L.subtitle, L.badge, 676, 176)}
          ${nodeSvg}
          <rect x="30" y="172" width="822" height="138" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.2"/>
          <text x="48" y="194" font-family="${MONO}" font-size="10.5" font-weight="700" fill="#0F172A">${e(L.chart)}</text>
          <line x1="48" y1="242" x2="834" y2="242" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="6 4"/>
          <text x="834" y="236" text-anchor="end" font-family="${MONO}" font-size="9" font-weight="700" fill="#0369A1">${e(L.threshold)}</text>
          ${cellBars}
        </svg>`;
    }

    // project-3 — OEE, Pareto, 5 Whys & 5S
    const L = vi
      ? {
          title: 'BẢN ĐỒ ĐIỂM NGHẼN OEE, PARETO DỪNG MÁY & CHUẨN HÓA 5S',
          subtitle: 'BẤM GIỜ TIME-STUDY · PHÂN TÍCH 5 WHYS RCA · QUẢN LÝ TRỰC QUAN 5S',
          pareto: 'PARETO NGUYÊN NHÂN DỪNG MÁY NGOÀI KẾ HOẠCH (GIẢ LẬP)',
          oee: 'PHÂN RÃ OEE & CHUẨN HÓA HIỆN TRƯỜNG',
          c: ['Kẹt phôi', 'Chuyển đổi', 'Cảm biến', 'Dừng vặt'],
          cutoff: 'NGƯỠNG 80%',
          f: ['KHẢ DỤNG (A)', 'HIỆU SUẤT (P)', 'CHẤT LƯỢNG (Q)'],
          rca: '5 WHYS RCA → CHUẨN HÓA SOP & 5S',
          fiveS: 'SÀNG LỌC · SẮP XẾP · SẠCH SẼ · SĂN SÓC · SẴN SÀNG'
        }
      : {
          title: 'MACHINERY OEE BOTTLENECK MAP, PARETO DOWNTIME & 5S STANDARD',
          subtitle: 'STOPWATCH TIME-STUDY · 5 WHYS ROOT-CAUSE ANALYSIS · 5S SHOP FLOOR',
          pareto: 'PARETO OF UNPLANNED DOWNTIME DRIVERS (SANITIZED MOCK)',
          oee: 'OEE DECOMPOSITION & 5S WORKSTATION CONTROLS',
          c: ['Feed Jam', 'Setup', 'Sensor', 'Micro-Stop'],
          cutoff: '80% CUTOFF',
          f: ['AVAILABILITY (A)', 'PERFORMANCE (P)', 'QUALITY (Q)'],
          rca: '5 WHYS RCA → STANDARD WORK & 5S',
          fiveS: 'SORT · SET IN ORDER · SHINE · STANDARDIZE · SUSTAIN'
        };

    const paretoBars = [
      [70, 128, 142, '#2563EB'],
      [158, 168, 102, '#3B82F6'],
      [246, 206, 64, '#60A5FA'],
      [334, 232, 38, '#93C5FD']
    ]
      .map(
        ([x, y, h, c], i) => `
        <rect x="${x}" y="${y}" width="60" height="${h}" rx="4" fill="${c}"/>
        <text x="${x + 30}" y="286" text-anchor="middle" font-family="${MONO}" font-size="9.5" fill="#475569">${e(L.c[i])}</text>`
      )
      .join('');
    const oeeRows = [
      [114, 96, '#2563EB'],
      [156, 104, '#0284C7'],
      [198, 118, '#2563EB']
    ]
      .map(
        ([y, w, c], i) => `
        <rect x="486" y="${y}" width="346" height="34" rx="6" fill="#EFF6FF" stroke="#DBEAFE"/>
        <text x="500" y="${y + 21}" font-family="${MONO}" font-size="10" font-weight="700" fill="#1D4ED8">${e(L.f[i])}</text>
        <rect x="690" y="${y + 11}" width="126" height="10" rx="5" fill="#DBEAFE"/>
        <rect x="690" y="${y + 11}" width="${w}" height="10" rx="5" fill="${c}"/>`
      )
      .join('');

    return `
      <svg viewBox="0 0 880 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${e(L.title)}">
        <title>${e(L.title)}</title>
        ${frame(3, L.title, L.subtitle, '', 0, 0)}
        <rect x="30" y="72" width="420" height="238" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.2"/>
        <text x="48" y="96" font-family="${MONO}" font-size="10" font-weight="700" fill="#0F172A">${e(L.pareto)}</text>
        <line x1="56" y1="138" x2="424" y2="138" stroke="#0284C7" stroke-width="1.3" stroke-dasharray="5 3"/>
        <text x="424" y="132" text-anchor="end" font-family="${MONO}" font-size="9" font-weight="700" fill="#0369A1">${e(L.cutoff)}</text>
        ${paretoBars}
        <polyline points="100,192 188,148 276,124 364,114" fill="none" stroke="#0F172A" stroke-width="2"/>
        <circle cx="100" cy="192" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/>
        <circle cx="188" cy="148" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/>
        <circle cx="276" cy="124" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/>
        <circle cx="364" cy="114" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/>
        <rect x="468" y="72" width="382" height="238" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.2"/>
        <text x="486" y="96" font-family="${MONO}" font-size="10" font-weight="700" fill="#0F172A">${e(L.oee)}</text>
        ${oeeRows}
        <rect x="486" y="246" width="346" height="46" rx="6" fill="#DBEAFE" stroke="#93C5FD"/>
        <text x="659" y="266" text-anchor="middle" font-family="${MONO}" font-size="10.5" font-weight="700" fill="#1D4ED8">${e(L.rca)}</text>
        <text x="659" y="282" text-anchor="middle" font-family="${MONO}" font-size="8.6" fill="#0F172A">${e(L.fiveS)}</text>
      </svg>`;
  }

  /* ========================================================================
     8. State & DOM references
     ======================================================================== */
  let currentLang = 'en';
  let currentFilter = 'all';
  let activeProjectId = null;
  let activeSection = null;
  let lastFocusedElement = null;
  let copyResetTimer = null;
  let toastKey = null;
  let toastHideTimer = null;
  let modalCloseTimer = null;
  let modalNavBusy = false;
  let filterToken = 0;
  let globeTurns = 0;
  let scrollTicking = false;

  const $ = (id) => document.getElementById(id);
  const dom = {
    html: document.documentElement,
    header: $('site-header'),
    main: $('main-content'),
    footer: $('site-footer'),
    progressBar: $('scroll-progress-bar'),
    nav: $('main-nav'),
    navIndicator: $('nav-indicator'),
    navLinks: Array.from(document.querySelectorAll('.main-nav .nav-link')),
    mobileNavLinks: Array.from(document.querySelectorAll('.mobile-drawer .mobile-nav-link')),
    langBtns: Array.from(document.querySelectorAll('.lang-btn')),
    langGlobe: $('lang-globe'),
    mobileMenuBtn: $('mobile-menu-btn'),
    mobileDrawer: $('mobile-drawer'),
    filterButtons: Array.from(document.querySelectorAll('#project-filters .filter-btn')),
    projectsStatus: $('projects-status'),
    projectsGrid: $('projects-grid'),
    skillsGrid: $('skills-grid'),
    timeline: document.querySelector('.timeline'),
    timelineList: $('timeline-list'),
    timelineFill: $('timeline-rail-fill'),
    modalRoot: $('case-study-modal'),
    modalDialog: $('modal-dialog'),
    modalBody: $('modal-body'),
    modalContent: $('modal-content'),
    modalCategory: $('modal-category'),
    modalOrg: $('modal-org'),
    modalCounter: $('modal-counter'),
    modalCode: $('modal-code'),
    modalTitle: $('modal-title'),
    modalKpis: $('modal-kpi-pills'),
    modalExecText: $('modal-exec-text'),
    modalSections: $('modal-sections-grid'),
    modalBlueprintRef: $('modal-blueprint-ref'),
    modalImg: $('modal-preview-img'),
    modalSvg: $('modal-svg-blueprint'),
    modalStack: $('modal-stack'),
    modalCloseBtn: $('modal-close-btn'),
    modalPrevBtn: $('modal-prev-btn'),
    modalNextBtn: $('modal-next-btn'),
    modalPrevTitle: $('modal-prev-title'),
    modalNextTitle: $('modal-next-title'),
    copyTriggers: Array.from(document.querySelectorAll('.copy-email-trigger')),
    toast: $('copy-toast'),
    toastText: $('copy-toast-text')
  };

  const SECTION_IDS = ['about', 'projects', 'skills', 'timeline', 'contact'];
  const sections = SECTION_IDS.map((id) => $(id)).filter(Boolean);

  /* ========================================================================
     9. Scroll reveal — IntersectionObserver with batched 80ms stagger
     ======================================================================== */
  const Reveal = {
    observer: null,
    disabled: REDUCED_MOTION || !('IntersectionObserver' in window),

    init() {
      if (this.disabled) return;
      this.observer = new IntersectionObserver((entries) => this.onIntersect(entries), {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12
      });
    },

    onIntersect(entries) {
      const batch = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

      // Stagger siblings that enter together; nested items wait for their parent.
      const perParent = new Map();
      batch.forEach((el) => {
        const parent = el.parentElement;
        const index = perParent.get(parent) || 0;
        perParent.set(parent, index + 1);
        const nestedOffset = parent && parent.closest('.reveal-item') ? 200 : 0;
        this.show(el, Math.min(index, 8) * STAGGER_MS + nestedOffset);
        this.observer.unobserve(el);
      });
    },

    show(el, delay) {
      el.style.setProperty('--reveal-delay', `${delay}ms`);
      el.classList.add('is-visible');
      window.setTimeout(() => {
        el.classList.add('reveal-done');
        el.style.removeProperty('--reveal-delay');
      }, delay + 620);
    },

    observe(root) {
      (root || document).querySelectorAll('.reveal-item:not(.is-visible)').forEach((el) => {
        if (this.disabled) {
          el.classList.add('is-visible', 'reveal-done');
        } else {
          this.observer.observe(el);
        }
      });
    }
  };

  /** Re-rendered groups keep their revealed state (no replay on EN | VI switch). */
  function revealClassFor(container) {
    return container && container.querySelector('.reveal-item.is-visible') ? ' is-visible reveal-done' : '';
  }

  /* ========================================================================
     10. Reading progress, glass header, ScrollSpy & timeline rail
     ======================================================================== */
  function requestScrollUpdate() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScroll);
  }

  function updateScroll() {
    scrollTicking = false;

    // Reads first …
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const viewport = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - viewport;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;

    const spyLine = viewport * 0.35;
    let spy = null;
    sections.forEach((sec) => {
      if (sec.getBoundingClientRect().top <= spyLine) spy = sec.id;
    });
    if (maxScroll > 0 && y >= maxScroll - 4) spy = 'contact';

    let railProgress = 0;
    if (dom.timeline) {
      const rect = dom.timeline.getBoundingClientRect();
      railProgress = Math.min(1, Math.max(0, (viewport * 0.62 - rect.top) / rect.height));
    }

    // … then writes.
    if (dom.progressBar) dom.progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    if (dom.header) dom.header.classList.toggle('is-scrolled', y > 8);
    if (dom.timelineFill) dom.timelineFill.style.transform = `scaleY(${railProgress.toFixed(4)})`;
    setActiveSection(spy);
  }

  function setActiveSection(id, force) {
    if (id === activeSection && !force) return;
    activeSection = id;

    dom.navLinks.forEach((link) => {
      const match = link.dataset.section === id;
      link.classList.toggle('is-active', match);
      if (match) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    dom.mobileNavLinks.forEach((link) => {
      const match = link.dataset.section === id;
      link.classList.toggle('is-active', match);
      if (match) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });

    positionNavIndicator(false);
  }

  function positionNavIndicator(instant) {
    const indicator = dom.navIndicator;
    if (!indicator || !dom.nav) return;
    const link = dom.navLinks.find((l) => l.dataset.section === activeSection);

    if (!link || dom.nav.offsetParent === null) {
      indicator.classList.remove('is-visible');
      return;
    }

    const inset = 10;
    const x = link.offsetLeft + inset;
    const width = Math.max(12, link.offsetWidth - inset * 2);
    const transform = `translateX(${x}px) scaleX(${(width / 100).toFixed(4)})`;

    if (instant || !indicator.classList.contains('is-visible')) {
      indicator.style.transition = 'none';
      indicator.style.transform = transform;
      void indicator.offsetWidth;
      indicator.style.transition = '';
    } else {
      indicator.style.transform = transform;
    }
    indicator.classList.add('is-visible');
  }

  /* ========================================================================
     11. Renderers
     ======================================================================== */
  function applyStaticTranslations() {
    const dict = I18N[currentLang];
    dom.html.setAttribute('lang', currentLang);
    document.title = dict.pageTitle;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = dict[el.getAttribute('data-i18n')];
      if (typeof value === 'string') el.textContent = value;
    });

    // Trusted, static strings authored in this file only.
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const value = dict[el.getAttribute('data-i18n-html')];
      if (typeof value === 'string') el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.getAttribute('data-i18n-attr')
        .split(';')
        .forEach((pair) => {
          const [attr, key] = pair.split(':').map((s) => s && s.trim());
          if (attr && key && typeof dict[key] === 'string') el.setAttribute(attr, dict[key]);
        });
    });

    dom.langBtns.forEach((btn) => {
      const active = btn.dataset.lang === currentLang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function kpiMarkup(kpis) {
    return kpis
      .map(
        (k) => `<li class="kpi-pill"><strong class="kpi-value">${escapeHtml(k.v)}</strong><span>${escapeHtml(k.l)}</span></li>`
      )
      .join('');
  }

  function renderProjects() {
    const grid = dom.projectsGrid;
    if (!grid) return;
    const revealed = revealClassFor(grid);

    grid.innerHTML = PROJECTS.map((project) => {
      const c = project[currentLang];
      return `
        <article class="project-card card lift reveal-item${revealed}" data-project-id="${project.id}" data-domain="${project.domain}">
          <div class="project-card-head">
            <span class="project-domain-icon" aria-hidden="true">
              <i data-lucide="${DOMAIN_ICONS[project.domain]}" class="icon-md"></i>
            </span>
            <div class="project-head-text">
              <span class="project-category">${escapeHtml(t(DOMAIN_LABEL_KEYS[project.domain]))}</span>
              <span class="project-org">
                <i data-lucide="building-2" class="icon-xs"></i>
                <span>${escapeHtml(c.org)}</span>
              </span>
            </div>
          </div>
          <h3 class="project-title">
            <button type="button" class="project-open" aria-haspopup="dialog">${escapeHtml(c.title)}</button>
          </h3>
          <ul class="kpi-pills" aria-label="${escapeHtml(t('kpiLabel'))}">${kpiMarkup(c.kpis)}</ul>
          <ul class="project-bullets">${c.cardBullets.map((b) => `<li>${b}</li>`).join('')}</ul>
          <ul class="project-tags">${project.techStack.map((s) => `<li class="tech-tag">${escapeHtml(s)}</li>`).join('')}</ul>
          <div class="project-card-footer" aria-hidden="true">
            <span class="project-inspect-link">
              <span>${escapeHtml(t('inspectAction'))}</span>
              <i data-lucide="arrow-up-right" class="icon-sm"></i>
            </span>
            <span class="project-code">${escapeHtml(project.code)}</span>
          </div>
        </article>`;
    }).join('');

    applyFilter(currentFilter, false);
  }

  function proofLinksMarkup(ids) {
    return ids
      .map((id) => {
        const p = findProject(id);
        if (!p) return '';
        return `<button type="button" class="proof-link" data-open-project="${p.id}" aria-label="${escapeHtml(
          t('openCaseAria')(p.code, p[currentLang].title)
        )}">${escapeHtml(p.code)}<i data-lucide="arrow-up-right" class="icon-xs"></i></button>`;
      })
      .join('');
  }

  function renderSkills() {
    const grid = dom.skillsGrid;
    if (!grid) return;
    const revealed = revealClassFor(grid);

    grid.innerHTML = SKILLS_MATRIX.map((pillar) => {
      const c = pillar[currentLang];
      return `
        <section class="skill-panel card lift reveal-item${revealed}" data-domain="${pillar.domain}">
          <div class="skill-panel-head">
            <span class="skill-icon" aria-hidden="true"><i data-lucide="${pillar.icon}" class="icon-md"></i></span>
            <span class="skill-code">${escapeHtml(c.code)}</span>
          </div>
          <h3 class="skill-title">${escapeHtml(c.title)}</h3>
          <p class="skill-desc">${escapeHtml(c.desc)}</p>
          <ul class="skill-list">${c.skills.map((s) => `<li class="skill-chip">${escapeHtml(s)}</li>`).join('')}</ul>
          <div class="skill-proof">
            <span class="skill-proof-label">${escapeHtml(t('proofLabel'))}</span>
            ${proofLinksMarkup(pillar.proof)}
          </div>
        </section>`;
    }).join('');
  }

  function renderTimeline() {
    const list = dom.timelineList;
    if (!list) return;
    const revealed = revealClassFor(list);

    list.innerHTML = TIMELINE_ITEMS.map((item) => {
      const c = item[currentLang];
      const links = item.cases.length
        ? `<div class="timeline-links">
             <span class="skill-proof-label">${escapeHtml(t('relatedCases'))}</span>
             ${proofLinksMarkup(item.cases)}
           </div>`
        : '';
      return `
        <li class="timeline-item card lift reveal-item${revealed}">
          <span class="timeline-node" aria-hidden="true"></span>
          <div class="timeline-header">
            <div class="timeline-heading-group">
              <span class="timeline-badge-icon" aria-hidden="true"><i data-lucide="${item.icon}" class="icon-sm"></i></span>
              <div>
                <h3 class="timeline-role">${escapeHtml(c.role)}</h3>
                <p class="timeline-org">${escapeHtml(c.org)}</p>
              </div>
            </div>
            <div class="timeline-meta">
              <span class="timeline-type">${escapeHtml(c.type)}</span>
              <span class="timeline-date">${escapeHtml(item.date)}</span>
            </div>
          </div>
          <ul class="timeline-bullets">${c.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
          ${links}
        </li>`;
    }).join('');
  }

  function renderFilterCounts() {
    document.querySelectorAll('[data-count-for]').forEach((el) => {
      const key = el.getAttribute('data-count-for');
      el.textContent = String(key === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.domain === key).length);
    });
  }

  /* ========================================================================
     12. Animated category filtering (fade-out → FLIP → staggered fade-up)
     ======================================================================== */
  function matchesFilter(card, filter) {
    return filter === 'all' || card.dataset.domain === filter;
  }

  function announceFilter() {
    if (!dom.projectsStatus) return;
    const shown = PROJECTS.filter((p) => currentFilter === 'all' || p.domain === currentFilter).length;
    dom.projectsStatus.textContent = t('filterStatus')(shown, PROJECTS.length);
  }

  async function applyFilter(filter, animate) {
    const cards = Array.from(dom.projectsGrid.querySelectorAll('.project-card'));
    const token = ++filterToken;

    if (!animate || REDUCED_MOTION) {
      cards.forEach((card) => {
        card.hidden = !matchesFilter(card, filter);
        card.classList.remove('is-filter-out', 'is-filter-in', 'is-filter-entering', 'is-flipping');
        card.style.transform = '';
      });
      return;
    }

    // The user is looking at the grid: settle any pending reveal first.
    cards.forEach((card) => card.classList.add('is-visible', 'reveal-done'));

    const leaving = cards.filter((c) => !c.hidden && !matchesFilter(c, filter));
    const staying = cards.filter((c) => !c.hidden && matchesFilter(c, filter));
    const entering = cards.filter((c) => c.hidden && matchesFilter(c, filter));

    leaving.forEach((c) => c.classList.add('is-filter-out'));
    if (leaving.length) await wait(190);
    if (token !== filterToken) return;

    const first = new Map(staying.map((c) => [c, c.getBoundingClientRect()]));
    leaving.forEach((c) => {
      c.hidden = true;
      c.classList.remove('is-filter-out');
    });
    entering.forEach((c) => {
      c.classList.add('is-filter-in');
      c.hidden = false;
    });

    staying.forEach((c) => {
      const before = first.get(c);
      const after = c.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      if (dx || dy) {
        c.classList.remove('is-flipping');
        c.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    });

    await nextFrame();
    if (token !== filterToken) return;

    staying.forEach((c) => {
      if (c.style.transform) {
        c.classList.add('is-flipping');
        c.style.transform = '';
      }
    });
    entering.forEach((c, i) => {
      c.style.setProperty('--filter-delay', `${i * STAGGER_MS}ms`);
      c.classList.add('is-filter-entering');
      c.classList.remove('is-filter-in');
    });

    await wait(560 + entering.length * STAGGER_MS);
    if (token !== filterToken) return;
    cards.forEach((c) => {
      c.classList.remove('is-filter-entering', 'is-flipping');
      c.style.removeProperty('--filter-delay');
    });
  }

  function setFilter(filter) {
    if (filter === currentFilter) return;
    currentFilter = filter;
    dom.filterButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.filter === filter);
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter));
    });
    applyFilter(filter, true);
    announceFilter();
  }

  /* ========================================================================
     13. Case-study modal — choreography, focus trap, Prev / Next
     ======================================================================== */
  const SECTION_ORDER = ['problem', 'methodology', 'architecture', 'outcomes'];
  const SECTION_ICONS = {
    problem: 'triangle-alert',
    methodology: 'workflow',
    architecture: 'layers',
    outcomes: 'circle-check'
  };

  function neighbour(step) {
    const idx = PROJECTS.findIndex((p) => p.id === activeProjectId);
    return PROJECTS[(idx + step + PROJECTS.length) % PROJECTS.length];
  }

  function showBlueprint(project) {
    dom.modalSvg.innerHTML = buildBlueprintSvg(project.id, currentLang);
    dom.modalSvg.hidden = false;
    dom.modalImg.hidden = true;
    dom.modalImg.onload = null;
    dom.modalImg.onerror = null;
    dom.modalImg.removeAttribute('src');

    if (!project.image) return;

    // Optional real screenshot: shown only once it loads; blueprint stays as fallback.
    dom.modalImg.dataset.projectId = project.id;
    dom.modalImg.alt = `${project[currentLang].title} — ${t('ndaLabel')}`;
    dom.modalImg.onload = () => {
      if (dom.modalImg.dataset.projectId !== activeProjectId) return;
      dom.modalImg.hidden = false;
      dom.modalSvg.hidden = true;
    };
    dom.modalImg.onerror = () => {
      dom.modalImg.hidden = true;
      dom.modalSvg.hidden = false;
    };
    dom.modalImg.src = project.image;
  }

  function populateModal(projectId) {
    const project = findProject(projectId);
    if (!project) return;
    activeProjectId = project.id;
    const c = project[currentLang];
    const titles = t('modalSectionTitles');
    const index = PROJECTS.indexOf(project);

    dom.modalDialog.dataset.domain = project.domain;
    dom.modalCategory.innerHTML = `<i data-lucide="${DOMAIN_ICONS[project.domain]}" class="icon-xs"></i><span>${escapeHtml(
      t(DOMAIN_LABEL_KEYS[project.domain])
    )}</span>`;
    dom.modalOrg.innerHTML = `<i data-lucide="building-2" class="icon-xs"></i><span>${escapeHtml(c.org)}</span>`;
    dom.modalCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}`;
    dom.modalCode.textContent = project.fullCode;
    dom.modalTitle.textContent = c.title;
    dom.modalKpis.setAttribute('aria-label', t('kpiLabel'));
    dom.modalKpis.innerHTML = kpiMarkup(c.kpis);
    dom.modalExecText.innerHTML = c.executiveTakeaway;

    dom.modalSections.innerHTML = SECTION_ORDER.map(
      (key, i) => `
        <section class="case-part" aria-labelledby="case-part-${key}">
          <div class="case-part-head">
            <span class="case-part-num" aria-hidden="true">0${i + 1}</span>
            <h3 class="case-part-title" id="case-part-${key}">${escapeHtml(titles[key])}</h3>
            <i data-lucide="${SECTION_ICONS[key]}" class="icon-sm"></i>
          </div>
          <ul class="case-part-list">${c.sections[key].map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul>
        </section>`
    ).join('');

    dom.modalBlueprintRef.textContent = project.blueprintRef[currentLang];
    showBlueprint(project);
    dom.modalStack.innerHTML = project.techStack.map((s) => `<li class="tech-tag">${escapeHtml(s)}</li>`).join('');

    const prev = neighbour(-1);
    const next = neighbour(1);
    dom.modalPrevTitle.textContent = prev[currentLang].title;
    dom.modalNextTitle.textContent = next[currentLang].title;
    dom.modalPrevBtn.setAttribute('aria-label', `${t('modalPrev')}: ${prev[currentLang].title}`);
    dom.modalNextBtn.setAttribute('aria-label', `${t('modalNext')}: ${next[currentLang].title}`);

    Icons.refresh();
  }

  function setBackgroundInert(inert) {
    [dom.header, dom.main, dom.footer].forEach((el) => {
      if (!el) return;
      if (inert) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }

  function openModal(projectId, trigger) {
    if (!findProject(projectId)) return;
    window.clearTimeout(modalCloseTimer);
    closeDrawer(false);

    const alreadyOpen = !dom.modalRoot.hidden && dom.modalRoot.classList.contains('is-open');
    if (!alreadyOpen) lastFocusedElement = trigger || document.activeElement;

    populateModal(projectId);
    dom.modalBody.scrollTop = 0;
    dom.modalRoot.hidden = false;
    document.body.classList.add('modal-open');
    setBackgroundInert(true);

    void dom.modalRoot.offsetWidth; // commit the closed state so the transition plays
    dom.modalRoot.classList.add('is-open');
    dom.modalDialog.focus({ preventScroll: true });
  }

  function closeModal() {
    if (dom.modalRoot.hidden || !dom.modalRoot.classList.contains('is-open')) return;
    dom.modalRoot.classList.remove('is-open');

    const finish = () => {
      dom.modalRoot.hidden = true;
      document.body.classList.remove('modal-open');
      setBackgroundInert(false);
      activeProjectId = null;
      if (lastFocusedElement && document.contains(lastFocusedElement)) {
        lastFocusedElement.focus({ preventScroll: true });
      }
    };

    if (REDUCED_MOTION) finish();
    else modalCloseTimer = window.setTimeout(finish, 320);
  }

  async function cycleModal(step) {
    if (!activeProjectId || modalNavBusy) return;
    const target = neighbour(step);

    if (REDUCED_MOTION) {
      populateModal(target.id);
      dom.modalBody.scrollTop = 0;
      return;
    }

    modalNavBusy = true;
    const dir = step > 0 ? 'next' : 'prev';
    const content = dom.modalContent;
    content.classList.add(`is-leaving-${dir}`);
    await wait(150);

    populateModal(target.id);
    dom.modalBody.scrollTop = 0;
    content.classList.remove(`is-leaving-${dir}`);
    content.classList.add(`is-entering-${dir}`);
    void content.offsetWidth;
    content.classList.remove(`is-entering-${dir}`);
    modalNavBusy = false;
  }

  function trapFocus(event) {
    const focusables = Array.from(
      dom.modalDialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((el) => el.getClientRects().length > 0);
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === dom.modalDialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ========================================================================
     14. Language switching
     ======================================================================== */
  function applyCvState() {
    // Icon matches the action: a file download when the PDF exists, an email otherwise.
    const iconName = ASSETS.cvAvailable ? 'file-down' : 'mail';
    document.querySelectorAll('[data-cv-link]').forEach((link) => {
      const label = link.querySelector('[data-i18n]');
      const icon = link.querySelector('[data-cv-icon]');
      if (icon && icon.getAttribute('data-cv-icon') !== iconName) {
        const fresh = document.createElement('i');
        fresh.setAttribute('data-lucide', iconName);
        fresh.setAttribute('data-cv-icon', iconName);
        fresh.className = 'icon-sm';
        icon.replaceWith(fresh);
      }
      if (ASSETS.cvAvailable) {
        link.setAttribute('href', ASSETS.cvPath);
        link.setAttribute('download', ASSETS.cvFileName);
        if (label) label.setAttribute('data-i18n', 'btnDownloadCv');
      } else {
        const subject = encodeURIComponent(t('cvRequestSubject'));
        link.setAttribute('href', `mailto:${EMAIL_ADDRESS}?subject=${subject}`);
        link.removeAttribute('download');
        if (label) label.setAttribute('data-i18n', 'btnRequestCv');
      }
    });
  }

  /** Show the LinkedIn / GitHub rows in Contact only once a URL is configured in ASSETS. */
  function applyProfileLinks() {
    [
      ['contact-linkedin', ASSETS.linkedinUrl],
      ['contact-github', ASSETS.githubUrl]
    ].forEach(([id, url]) => {
      const row = $(id);
      if (!row) return;
      const valid = typeof url === 'string' && /^https:\/\//.test(url);
      row.hidden = !valid;
      const anchor = row.querySelector('a');
      if (valid && anchor) {
        anchor.href = url;
        anchor.textContent = url.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '');
      }
    });
  }

  function spinGlobe() {
    if (!dom.langGlobe) return;
    globeTurns += 1;
    dom.langGlobe.style.setProperty('--globe-turns', String(globeTurns));
  }

  function setLanguage(lang, options) {
    const opts = options || {};
    if (!I18N[lang]) return;
    if (lang === currentLang && !opts.initial) return;
    currentLang = lang;

    if (opts.persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (_) {
        /* storage blocked — language still applies for this visit */
      }
    }

    applyCvState();
    applyStaticTranslations();
    syncSimModeDom();
    updateWipReadoutText();
    renderProjects();
    renderSkills();
    renderTimeline();

    if (activeProjectId && !dom.modalRoot.hidden) populateModal(activeProjectId);
    if (toastKey) dom.toastText.textContent = t(toastKey);
    if (!opts.initial) spinGlobe();

    // Re-create icons immediately after DOM text updates so none go missing.
    Icons.refresh();
    Reveal.observe();

    requestAnimationFrame(() => {
      positionNavIndicator(true);
      requestScrollUpdate();
    });
  }

  /* ========================================================================
     14b. Main-Page Live Production Line & Heijunka Simulator + WIP Monitor
     ======================================================================== */
  let currentSimMode = 'heijunka';
  let currentWipUnits = 2450;
  let wipIntervalId = null;
  let showcaseOnScreen = true;

  /* The line flow, SKU pulses and bottleneck glow loop forever: pause them (and the WIP
     ticker below) while the card is off screen so phones don't burn battery on them. */
  function initShowcaseVisibility() {
    const card = $('telemetry-showcase');
    if (!card || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(
      (entries) => {
        showcaseOnScreen = entries[entries.length - 1].isIntersecting;
        card.classList.toggle('is-offscreen', !showcaseOnScreen);
      },
      { rootMargin: '120px 0px' }
    ).observe(card);
  }

  function syncSimModeDom() {
    const showcase = $('telemetry-showcase');
    if (!showcase) return;

    const isRandom = currentSimMode === 'random';
    showcase.setAttribute('data-sim-state', currentSimMode);

    const btnRandom = $('sim-btn-random');
    const btnHeijunka = $('sim-btn-heijunka');
    if (btnRandom) {
      btnRandom.classList.toggle('is-active', isRandom);
      btnRandom.setAttribute('aria-pressed', String(isRandom));
    }
    if (btnHeijunka) {
      btnHeijunka.classList.toggle('is-active', !isRandom);
      btnHeijunka.setAttribute('aria-pressed', String(!isRandom));
    }

    const suffix = isRandom ? 'Random' : 'Heijunka';
    const kpiBindings = [
      ['sim-kpi-changeover', `simKpiChangeover${suffix}`],
      ['sim-kpi-balance', `simKpiBalance${suffix}`],
      ['sim-kpi-status', `simKpiStatus${suffix}`],
      ['stage-metric-1', `stage1Metric${suffix}`],
      ['stage-metric-2', `stage2Metric${suffix}`],
      ['stage-metric-3', `stage3Metric${suffix}`],
      ['stage-metric-4', `stage4Metric${suffix}`],
      ['stage-4-alert', `stage4Alert${suffix}`]
    ];

    kpiBindings.forEach(([elId, i18nKey]) => {
      const el = $(elId);
      if (!el) return;
      el.setAttribute('data-i18n', i18nKey);
      el.textContent = t(i18nKey);
    });

    // Line balance KPI = mean / max of these (Heijunka 94.8%, Random 72.0%).
    const stageWidths = isRandom ? [66.3, 61.8, 58.4, 99.2] : [89.2, 87.6, 90.1, 95.6];
    stageWidths.forEach((w, idx) => {
      const fill = $(`stage-fill-${idx + 1}`);
      if (fill) fill.style.width = `${w}%`;
    });
  }

  function setSimMode(mode) {
    const normalized = mode === 'random' ? 'random' : 'heijunka';
    if (normalized === currentSimMode) return;
    currentSimMode = normalized;
    syncSimModeDom();
  }

  function updateWipReadoutText() {
    const readout = $('wip-buffer-readout');
    if (!readout) return;
    const dict = I18N[currentLang];
    if (dict && typeof dict.wipReadoutFormat === 'function') {
      readout.textContent = dict.wipReadoutFormat(currentWipUnits);
    }
  }

  function setWipUnits(units, triggered) {
    currentWipUnits = units;
    const fill = $('wip-gauge-fill');
    const bar = $('wip-progressbar');
    const pill = $('wip-sync-pill');
    const pct = Math.min(100, Math.max(0, (units / 3000) * 100));

    if (fill) {
      fill.style.width = `${pct.toFixed(2)}%`;
      fill.classList.toggle('is-near-threshold', units <= 1860);
    }
    if (bar) {
      bar.setAttribute('aria-valuenow', String(units));
    }
    if (pill) {
      pill.classList.toggle('is-triggered', Boolean(triggered));
    }
    updateWipReadoutText();
  }

  function initWipBufferMonitor() {
    setWipUnits(2450, false);
    if (REDUCED_MOTION) return;

    const sequence = [
      { units: 2450, triggered: false },
      { units: 2340, triggered: false },
      { units: 2120, triggered: false },
      { units: 1890, triggered: false },
      { units: 1785, triggered: true },
      { units: 2290, triggered: true },
      { units: 2540, triggered: false },
      { units: 2450, triggered: false }
    ];
    let stepIndex = 0;

    window.setTimeout(() => {
      wipIntervalId = window.setInterval(() => {
        if (!showcaseOnScreen || document.hidden) return;
        stepIndex = (stepIndex + 1) % sequence.length;
        const step = sequence[stepIndex];
        setWipUnits(step.units, step.triggered);
      }, 2200);
    }, 1800);
  }

  function initHeroCountUp() {
    const els = document.querySelectorAll('.hero-telemetry-strip [data-countup]');
    if (!els.length) return;

    if (REDUCED_MOTION) {
      els.forEach((el) => {
        const target = Number(el.getAttribute('data-countup')) || 0;
        const suffix = el.getAttribute('data-countup-suffix') || '';
        el.textContent = `${target}${suffix}`;
      });
      return;
    }

    const duration = 680;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, Math.max(0, elapsed / duration));
      const eased = 1 - Math.pow(1 - progress, 3);

      els.forEach((el) => {
        const target = Number(el.getAttribute('data-countup')) || 0;
        const suffix = el.getAttribute('data-countup-suffix') || '';
        const current = progress >= 1 ? target : Math.round(target * eased);
        el.textContent = `${current}${suffix}`;
      });

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  /* ========================================================================
     15. Copy email (Copy → Check scale-pop) & toast
     ======================================================================== */
  function showToast(key, isError) {
    window.clearTimeout(toastHideTimer);
    toastKey = key;
    dom.toastText.textContent = t(key);
    dom.toast.classList.toggle('is-error', !!isError);
    dom.toast.classList.remove('is-visible');
    void dom.toast.offsetWidth;
    dom.toast.classList.add('is-visible');
  }

  function hideToast() {
    toastKey = null;
    dom.toast.classList.remove('is-visible');
    toastHideTimer = window.setTimeout(() => {
      if (!toastKey) dom.toastText.textContent = '';
    }, 400);
  }

  function setCopiedState(copied) {
    dom.copyTriggers.forEach((btn) => {
      btn.classList.toggle('is-copied', copied);
      const label = btn.querySelector('.copy-email-label');
      if (!label) return;
      label.setAttribute('data-i18n', copied ? 'btnCopied' : 'btnCopyEmail');
      label.textContent = t(copied ? 'btnCopied' : 'btnCopyEmail');
    });
  }

  async function copyEmail() {
    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        copied = true;
      } catch (_) {
        copied = false;
      }
    }

    if (!copied) {
      const area = document.createElement('textarea');
      area.value = EMAIL_ADDRESS;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      area.style.pointerEvents = 'none';
      document.body.appendChild(area);
      area.select();
      try {
        copied = document.execCommand('copy');
      } catch (_) {
        copied = false;
      }
      area.remove();
    }

    window.clearTimeout(copyResetTimer);
    setCopiedState(copied);
    showToast(copied ? 'toastCopied' : 'toastCopyFailed', !copied);

    copyResetTimer = window.setTimeout(
      () => {
        setCopiedState(false);
        hideToast();
      },
      copied ? 2400 : 5000
    );
  }

  /* ========================================================================
     16. Mobile drawer
     ======================================================================== */
  function isDrawerOpen() {
    return dom.mobileMenuBtn && dom.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
  }

  function setMenuButtonLabel(open) {
    const key = open ? 'menuClose' : 'menuToggle';
    dom.mobileMenuBtn.setAttribute('data-i18n-attr', `aria-label:${key}`);
    dom.mobileMenuBtn.setAttribute('aria-label', t(key));
  }

  function openDrawer() {
    dom.mobileDrawer.hidden = false;
    dom.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    setMenuButtonLabel(true);
    void dom.mobileDrawer.offsetWidth;
    dom.mobileDrawer.classList.add('is-open');
  }

  function closeDrawer(returnFocus) {
    if (!dom.mobileDrawer || !isDrawerOpen()) return;
    dom.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    setMenuButtonLabel(false);
    dom.mobileDrawer.classList.remove('is-open');
    window.setTimeout(
      () => {
        if (!isDrawerOpen()) dom.mobileDrawer.hidden = true;
      },
      REDUCED_MOTION ? 0 : 280
    );
    if (returnFocus) dom.mobileMenuBtn.focus();
  }

  /* ========================================================================
     17. Events
     ======================================================================== */
  function bindEvents() {
    dom.langBtns.forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    document.querySelectorAll('.sim-mode-btn').forEach((btn) => {
      btn.addEventListener('click', () => setSimMode(btn.getAttribute('data-sim-mode')));
    });

    const wipPill = $('wip-sync-pill');
    if (wipPill) {
      wipPill.addEventListener('click', () => {
        setWipUnits(1785, true);
        window.setTimeout(() => setWipUnits(2450, false), 1400);
      });
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener(
      'resize',
      () => {
        requestAnimationFrame(() => {
          positionNavIndicator(true);
          updateScroll();
          if (window.innerWidth > 1000) closeDrawer(false);
        });
      },
      { passive: true }
    );

    dom.filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });

    dom.projectsGrid.addEventListener('click', (event) => {
      const card = event.target.closest('.project-card');
      if (card) openModal(card.dataset.projectId, card.querySelector('.project-open'));
    });

    document.addEventListener('click', (event) => {
      const proof = event.target.closest('[data-open-project]');
      if (proof) {
        openModal(proof.getAttribute('data-open-project'), proof);
        return;
      }
      if (isDrawerOpen() && !event.target.closest('#site-header')) closeDrawer(false);
    });

    dom.modalCloseBtn.addEventListener('click', closeModal);
    dom.modalPrevBtn.addEventListener('click', () => cycleModal(-1));
    dom.modalNextBtn.addEventListener('click', () => cycleModal(1));
    dom.modalRoot.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-modal-dismiss')) closeModal();
    });

    document.addEventListener('keydown', (event) => {
      const modalOpen = !dom.modalRoot.hidden && dom.modalRoot.classList.contains('is-open');

      if (modalOpen) {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeModal();
        } else if (event.key === 'Tab') {
          trapFocus(event);
        } else if (
          (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.target.closest('.visual-canvas')
        ) {
          event.preventDefault();
          cycleModal(event.key === 'ArrowRight' ? 1 : -1);
        }
        return;
      }

      if (event.key === 'Escape' && isDrawerOpen()) closeDrawer(true);
    });

    dom.copyTriggers.forEach((btn) => btn.addEventListener('click', copyEmail));

    if (dom.mobileMenuBtn && dom.mobileDrawer) {
      dom.mobileMenuBtn.addEventListener('click', () => {
        if (isDrawerOpen()) closeDrawer(false);
        else openDrawer();
      });
      dom.mobileDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => closeDrawer(false));
      });
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => positionNavIndicator(true));
    }

    window.addEventListener('load', () => {
      positionNavIndicator(true);
      requestScrollUpdate();
    });
  }

  /* ========================================================================
     18. Boot
     ======================================================================== */
  function init() {
    booted = true;

    let savedLang = 'en';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'vi' || stored === 'en') savedLang = stored;
    } catch (_) {
      savedLang = 'en';
    }

    // A shared link such as ?lang=vi opens in that language (overrides the stored choice).
    let urlLang = null;
    try {
      urlLang = new URLSearchParams(window.location.search).get('lang');
    } catch (_) {
      urlLang = null;
    }
    if (urlLang === 'vi' || urlLang === 'en') savedLang = urlLang;

    Reveal.init();
    renderFilterCounts();
    bindEvents();
    applyProfileLinks();
    setLanguage(savedLang, { persist: false, initial: true });
    initHeroCountUp();
    initShowcaseVisibility();
    initWipBufferMonitor();
    Icons.start();
    updateScroll();
  }

  /**
   * Light-Blue SVG Monogram Fallback (`TP` on #EFF6FF with #2563EB border & typography).
   * Invoked via `onerror` if assets/images/avatar.jpg is not yet present.
   */
  window.handleAvatarFallback = function (imgElement) {
    if (!imgElement) return;
    imgElement.onerror = null;

    const isNav = imgElement.classList.contains('nav-avatar');
    const svg = isNav
      ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#EFF6FF"/><rect x="2" y="2" width="60" height="60" rx="30" fill="none" stroke="#2563EB" stroke-width="3"/><text x="32" y="40" text-anchor="middle" font-family="Inter,system-ui,-apple-system,sans-serif" font-size="24" font-weight="800" letter-spacing="-0.5" fill="#2563EB">TP</text></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 350"><defs><pattern id="tp-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#DBEAFE" stroke-width="1"/></pattern></defs><rect width="280" height="350" fill="#EFF6FF"/><rect width="280" height="350" fill="url(#tp-grid)"/><rect x="14" y="14" width="252" height="322" rx="16" fill="none" stroke="#93C5FD" stroke-width="1.5" stroke-dasharray="6 4"/><circle cx="140" cy="148" r="64" fill="#FFFFFF" stroke="#2563EB" stroke-width="3"/><text x="140" y="166" text-anchor="middle" font-family="Inter,system-ui,-apple-system,sans-serif" font-size="48" font-weight="800" letter-spacing="-1.5" fill="#2563EB">TP</text><text x="140" y="250" text-anchor="middle" font-family="JetBrains Mono,ui-monospace,monospace" font-size="11.5" font-weight="700" letter-spacing="1.2" fill="#1D4ED8">TUAN PHAM // HCMUT</text><text x="140" y="270" text-anchor="middle" font-family="JetBrains Mono,ui-monospace,monospace" font-size="10" fill="#0284C7">PORTRAIT SLOT READY</text></svg>';

    imgElement.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    imgElement.classList.add('is-avatar-fallback');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
