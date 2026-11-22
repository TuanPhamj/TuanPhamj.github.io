/**
 * Phạm Anh Tuấn — Production Planning, Lean & Operations Analytics Portfolio
 * Bilingual engine (VI default | EN), Lucide icon layer with inline fallback,
 * scroll reveal, reading progress + ScrollSpy, clipboard copy with toast,
 * animated project mini-charts (SMED · OEE · Gantt · QR flow), and an
 * accessible 4-part project detail modal with on-site photo gallery.
 */
(function () {
  'use strict';

  /* ========================================================================
     0. Configuration
     ======================================================================== */
  const STORAGE_KEY = 'pat_portfolio_lang';
  const EMAIL_ADDRESS = 'phamanhtuan802@gmail.com';
  const PHONE_NUMBER = '+84972693749';

  /**
   * Asset switch:
   *  - cvAvailable: add assets/cv/Pham-Anh-Tuan-CV.pdf, then set to true.
   *    While false, CV links open a prefilled CV request email to prevent a 404.
   */
  const ASSETS = {
    cvAvailable: false,
    cvPath: 'assets/cv/Pham-Anh-Tuan-CV.pdf',
    cvFileName: 'Pham-Anh-Tuan-CV.pdf'
  };

  // Live value: follows the OS setting if it changes while the page is open
  const reducedMotionQuery =
    typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  let REDUCED_MOTION = !!(reducedMotionQuery && reducedMotionQuery.matches);
  if (reducedMotionQuery) {
    const onMotionPrefChange = (event) => {
      REDUCED_MOTION = event.matches;
    };
    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', onMotionPrefChange);
    } else if (typeof reducedMotionQuery.addListener === 'function') {
      reducedMotionQuery.addListener(onMotionPrefChange);
    }
  }

  const STAGGER_MS = 70;

  /* ========================================================================
     1. Icon layer — Lucide CDN first, inline SVG fallback if offline/blocked
     ======================================================================== */
  const ICON_FALLBACK = {
    'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'folder-kanban': '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/>',
    'mail': '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    'file-down': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',
    'graduation-cap': '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    'award': '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
    'factory': '<path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M8 16h.01"/>',
    'phone': '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
    'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'building-2': '<path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>',
    'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',
    'package-check': '<path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/>',
    'clipboard-list': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    'images': '<path d="M18 22H4a2 2 0 0 1-2-2V6"/><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"/><circle cx="12" cy="8" r="2"/><rect width="16" height="16" x="6" y="2" rx="2"/>'
  };

  const Icons = (function () {
    let fallbackMode = false;
    let fallbackTimer = null;
    const SVG_NS = 'http://www.w3.org/2000/svg';

    function lucideReady() {
      return !!(window.lucide && typeof window.lucide.createIcons === 'function');
    }

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
      }, 2200);
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
     2. Bilingual Dictionary (VI default <-> EN)
     ======================================================================== */
  const I18N = {
    vi: {
      pageTitle: 'Phạm Anh Tuấn — Kế hoạch Sản xuất, Lean & Phân tích Dữ liệu Vận hành',
      skipToContent: 'Chuyển đến nội dung chính',
      brandHome: 'Phạm Anh Tuấn — về đầu trang',
      brandName: 'Phạm Anh Tuấn',
      brandSub: 'Production Planning · Lean · Operations Analytics',
      navLabel: 'Điều hướng chính',
      navOverview: 'Giới thiệu',
      navProjects: 'Dự án',
      langGroup: 'Ngôn ngữ',
      quickContactLabel: 'Liên hệ nhanh',
      quickEmailAria: 'Gửi Email tới phamanhtuan802@gmail.com',
      quickEmailTitle: 'Email: phamanhtuan802@gmail.com',
      quickPhoneAria: 'Gọi điện thoại hoặc Zalo (+84) 972 693 749',
      quickPhoneTitle: 'Điện thoại / Zalo: (+84) 972 693 749',
      quickGithubAria: 'Mở GitHub TuanPhamj',
      quickGithubTitle: 'GitHub: github.com/TuanPhamj',
      menuToggle: 'Mở menu điều hướng',
      menuClose: 'Đóng menu điều hướng',
      btnDownloadCv: 'Tải CV',
      cvRequestSubject: 'Yêu cầu CV — Phạm Anh Tuấn',

      overviewEyebrow: '01 // GIỚI THIỆU & KINH NGHIỆM THỰC TẾ',
      heroName: 'Phạm Anh Tuấn',
      heroTagline:
        'Kế hoạch & Điều độ Sản xuất (Production Planning) · Cải tiến Lean & OEE · Phân tích Dữ liệu Vận hành',
      heroStatus: 'Sẵn sàng nhận việc Full-time ngay · TP.HCM · Đồng Nai · Bình Dương',
      expBlockTitle: 'KINH NGHIỆM TẠI NHÀ MÁY',
      exp1Org: 'Tập đoàn Thiên Long – Nhà máy Long Thành',
      exp1Desc:
        '<p class="experience-role">Thực tập sinh Kế hoạch &amp; Điều độ sản xuất (KHSX) · Tổ trưởng sản xuất — Xưởng Bút Lông 2 đầu (DTM – 217 mã màu)</p><ul class="experience-points"><li>Vận hành <strong>SAP Logon</strong> (MM/PP, MB52, COGI)</li><li>Lập lịch sản xuất MPS/MRP</li><li>Đồng bộ định mức BOM/Routing</li><li>Cải tiến chuyển đổi nhanh SMED</li><li><strong>Đi Gemba xưởng, duy trì tiêu chuẩn 5S</strong> hằng ngày</li></ul>',
      exp2Org: 'Nhà máy Nhựa Tái chế Duy Tân – DUYTAN Recycling',
      exp2Desc:
        '<p class="experience-role">Thực tập sinh Bộ phận Sản xuất — cụm máy tạo hạt nhựa tái chế HDPE</p><ul class="experience-points"><li>Đo lường hiệu suất thiết bị toàn phần (OEE)</li><li>Phân tích thời gian chu kỳ (Cycle Time)</li><li>Truy tìm nguyên nhân gốc rễ bằng 5 Whys</li><li>Kiểm tra 5S</li></ul>',

      btnExploreProjects: 'Xem Dự án',
      contactBarAria: 'Thông tin liên hệ trực tiếp',
      btnCopyEmailAria: 'Sao chép email phamanhtuan802@gmail.com',
      btnCopyEmailTitle: 'Sao chép Email',
      btnCopyPhone: 'Sao chép',
      btnCopyPhoneAria: 'Sao chép số điện thoại / Zalo +84972693749',
      btnCopyPhoneTitle: 'Sao chép số Điện thoại / Zalo',
      btnCopied: 'Đã sao chép!',

      credCardTitle: 'HỌC VẤN, CHỨNG CHỈ & HOẠT ĐỘNG CLB',
      eduLabel: 'Học vấn',
      eduValue:
        '<strong>Đại học Bách khoa – ĐHQG TP.HCM (HCMUT)</strong> — Cử nhân chuyên ngành <strong>Quản trị Kinh doanh</strong> (2022–2026).',
      certLabel: 'Chứng chỉ',
      leadLabel: 'Hoạt động CLB',
      certOpenDrive: '(mở chứng chỉ trên Google Drive)',
      certViewAll: 'Xem tất cả chứng chỉ trên Google Drive',
      leadValue:
        '<strong>Chủ nhiệm CLB E-Marketing Action (EMA HCMUT)</strong> — Điều phối vận hành, chiến lược nội dung và hệ thống quản lý đối tác B2B.',

      toolsCardTitle: 'CÔNG CỤ SỬ DỤNG',
      toolsCardSub: '3 nhóm chức năng',
      toolGroup1: 'ERP & Vận hành Tinh gọn',
      toolGroup2: 'Dữ liệu & Tự động hóa',
      toolGroup3: 'Trực quan hóa Báo cáo',

      projectsEyebrow: '02 // DỰ ÁN THỰC CHIẾN',
      projectsTitle: 'Dự án Vận hành, Tự động hóa & Cải tiến',
      projectsSubtitle:
        'Bốn dự án thực tế tại nhà máy và công cụ điều độ sản xuất — nhấp vào từng thẻ để xem phân tích chi tiết 4 phần.',
      btnViewDetails: 'Xem chi tiết',
      btnGithubDemo: 'GitHub',
      btnLiveDemo: 'Demo trực tiếp',

      modalClose: 'Đóng chi tiết dự án',
      modalOutcomeKicker: 'KẾT QUẢ NỔI BẬT',
      modalPrev: 'Dự án trước',
      modalNext: 'Dự án tiếp theo',
      modalContextLabel: 'Thời gian & Bối cảnh:',
      modalObjectiveLabel: 'Vấn đề – Mục tiêu:',
      modalSectionTitles: {
        context: 'Thời gian & Bối cảnh / Vấn đề – Mục tiêu',
        tools: 'Công cụ & Phương pháp',
        deliverables: 'Sản phẩm đầu ra',
        results: 'Kết quả đạt được'
      },
      modalVizKicker: 'TRỰC QUAN HÓA',
      modalGalleryKicker: 'HÌNH ẢNH TRIỂN KHAI',
      modalGalleryOpen: 'Mở ảnh kích thước đầy đủ',
      cardMedia: 'hình ảnh',
      galleryBefore: 'TRƯỚC',
      galleryAfter: 'SAU',

      vizSmedNow: 'Hiện trạng',
      vizSmedTarget: 'Mục tiêu SMED',
      vizSmedInternal: 'Dừng máy (Internal)',
      vizSmedExternal: 'Chuẩn bị song song (External)',
      vizSmedSteps: '11 → 9 thao tác dừng máy',
      vizSmedAria:
        'Đề xuất SMED đổi màu mực: thời gian dừng máy từ khoảng 16,5 phút xuống mục tiêu 10 phút trở xuống; số thao tác khi dừng máy từ 11 còn 9.',
      vizSmedSource: 'Nguồn: Đề xuất SMED chuyển đổi màu mực – máy lắp ráp bút Art DTM (07/2026). Số liệu sau cải tiến là mục tiêu.',

      vizOeeA: 'Sẵn sàng (A)',
      vizOeeP: 'Hiệu suất (P)',
      vizOeeQ: 'Chất lượng (Q)',
      vizOeeWorld: 'Chuẩn thế giới ≥ 85%',
      vizOeeAria:
        'OEE máy tạo hạt HDPE xưởng F2: Sẵn sàng 79,78%, Hiệu suất 60%, Chất lượng 85%, OEE khoảng 40% so với chuẩn thế giới 85%.',
      vizOeeSource: 'Nguồn: Báo cáo thực tập “Đánh giá chỉ số OEE của máy tạo hạt” – DUYTAN Recycling, xưởng F2 (08/2025).',

      vizGanttLot: 'Lô sản xuất',
      vizGanttChange: 'Đổi mã (SMED)',
      vizGanttAria:
        'Biểu đồ Gantt mô phỏng lịch chạy song song 3 máy cho 217 SKU: các lô được san đều theo Heijunka, xen giữa là khoảng đổi mã SMED.',
      vizGanttSource: 'Mô phỏng minh họa — tham số nhà máy đã được ẩn danh.',

      vizQrScan: 'Quét QR tại chuyền',
      vizQrSheet: 'Google Sheets',
      vizQrDash: 'Dashboard OEE',
      vizQrAria:
        'Luồng dữ liệu tự động: quét mã QR tại chuyền đóng gói, ghi vào Google Sheets, tổng hợp lên Dashboard OEE.',
      vizQrSource: 'Mô phỏng minh họa luồng QR → Google Sheets → Dashboard OEE.',

      footerCopy: '© 2026 Phạm Anh Tuấn · Kế hoạch Sản xuất · Lean · Phân tích Dữ liệu Vận hành',
      footerNavLabel: 'Liên kết chân trang',
      backToTop: 'Lên đầu trang',

      toastEmailCopied: 'Đã sao chép email: phamanhtuan802@gmail.com',
      toastEmailCopyFailed: 'Không thể sao chép — email: phamanhtuan802@gmail.com',
      toastPhoneCopied: 'Đã sao chép SĐT / Zalo: +84972693749',
      toastPhoneCopyFailed: 'Không thể sao chép — SĐT / Zalo: (+84) 972 693 749'
    },

    en: {
      pageTitle: 'Pham Anh Tuan — Production Planning, Lean & Operations Analytics',
      skipToContent: 'Skip to main content',
      brandHome: 'Pham Anh Tuan — back to top',
      brandName: 'Pham Anh Tuan',
      brandSub: 'Production Planning · Lean · Operations Analytics',
      navLabel: 'Primary navigation',
      navOverview: 'Overview',
      navProjects: 'Projects',
      langGroup: 'Language',
      quickContactLabel: 'Quick contact',
      quickEmailAria: 'Send email to phamanhtuan802@gmail.com',
      quickEmailTitle: 'Email: phamanhtuan802@gmail.com',
      quickPhoneAria: 'Call phone or Zalo (+84) 972 693 749',
      quickPhoneTitle: 'Phone / Zalo: (+84) 972 693 749',
      quickGithubAria: 'Open GitHub TuanPhamj',
      quickGithubTitle: 'GitHub: github.com/TuanPhamj',
      menuToggle: 'Open navigation menu',
      menuClose: 'Close navigation menu',
      btnDownloadCv: 'Download CV',
      cvRequestSubject: 'CV Request — Pham Anh Tuan',

      overviewEyebrow: '01 // OVERVIEW & SHOP-FLOOR EXPERIENCE',
      heroName: 'Pham Anh Tuan',
      heroTagline:
        'Production Planning & Scheduling · Lean & OEE Improvement · Operations Data Analytics',
      heroStatus: 'Available Immediately for Full-Time Roles · HCMC · Dong Nai · Binh Duong',
      expBlockTitle: 'SHOP-FLOOR EXPERIENCE',
      exp1Org: 'Thien Long Group – Long Thanh Plant',
      exp1Desc:
        '<p class="experience-role">Production Planning &amp; Scheduling Intern · Production Team Leader — Dual Tip Marker workshop (DTM – 217 color SKUs)</p><ul class="experience-points"><li>Operated <strong>SAP Logon</strong> (MM/PP, MB52, COGI)</li><li>Managed MPS/MRP scheduling</li><li>Synchronized BOM/Routing norms</li><li>Drove SMED changeover improvements</li><li><strong>Daily shop-floor Gemba walks &amp; 5S</strong> upkeep</li></ul>',
      exp2Org: 'Duy Tan Recycling Plant – DUYTAN Recycling',
      exp2Desc:
        '<p class="experience-role">Production Department Intern — HDPE recycled-plastic pelletizing lines</p><ul class="experience-points"><li>Measured Overall Equipment Effectiveness (OEE)</li><li>Analyzed Cycle Time</li><li>Ran 5 Whys root-cause analysis</li><li>Conducted 5S audits</li></ul>',

      btnExploreProjects: 'Explore Projects',
      contactBarAria: 'Direct contact details',
      btnCopyEmailAria: 'Copy email phamanhtuan802@gmail.com',
      btnCopyEmailTitle: 'Copy Email',
      btnCopyPhone: 'Copy',
      btnCopyPhoneAria: 'Copy phone / Zalo number +84972693749',
      btnCopyPhoneTitle: 'Copy Phone / Zalo Number',
      btnCopied: 'Copied!',

      credCardTitle: 'EDUCATION, CERTIFICATES & CLUB ACTIVITIES',
      eduLabel: 'Education',
      eduValue:
        "<strong>Ho Chi Minh City University of Technology – VNU-HCM (HCMUT)</strong> — Bachelor's in <strong>Business Administration</strong> (2022–2026).",
      certLabel: 'Certificates',
      leadLabel: 'Club Activities',
      certOpenDrive: '(open certificate on Google Drive)',
      certViewAll: 'View all certificates on Google Drive',
      leadValue:
        '<strong>President, E-Marketing Action Club (EMA HCMUT)</strong> — Led club operations, content strategy, and B2B partnership workflows.',

      toolsCardTitle: 'CORE TOOLS',
      toolsCardSub: '3 functional groups',
      toolGroup1: 'ERP & Lean Operations',
      toolGroup2: 'Data & Automation',
      toolGroup3: 'Business Intelligence',

      projectsEyebrow: '02 // FEATURED PROJECTS',
      projectsTitle: 'Operations, Automation & Improvement Projects',
      projectsSubtitle:
        'Four real-world plant initiatives and scheduling systems — open any card for the 4-part structured breakdown.',
      btnViewDetails: 'View Details',
      btnGithubDemo: 'GitHub',
      btnLiveDemo: 'Live demo',

      modalClose: 'Close project details',
      modalOutcomeKicker: 'KEY OUTCOME',
      modalPrev: 'Previous Project',
      modalNext: 'Next Project',
      modalContextLabel: 'Timeframe & Context:',
      modalObjectiveLabel: 'Problem & Objective:',
      modalSectionTitles: {
        context: 'Context & Objective',
        tools: 'Tools & Methodology',
        deliverables: 'Deliverables',
        results: 'Key Outcomes'
      },
      modalVizKicker: 'AT A GLANCE',
      modalGalleryKicker: 'ON-SITE DELIVERABLES',
      modalGalleryOpen: 'Open full-size image',
      cardMedia: 'images',
      galleryBefore: 'BEFORE',
      galleryAfter: 'AFTER',

      vizSmedNow: 'Current',
      vizSmedTarget: 'SMED target',
      vizSmedInternal: 'Machine stopped (Internal)',
      vizSmedExternal: 'Prepared in parallel (External)',
      vizSmedSteps: '11 → 9 stopped-machine steps',
      vizSmedAria:
        'SMED ink-color changeover proposal: machine downtime cut from about 16.5 minutes to a target of 10 minutes or less; stopped-machine steps reduced from 11 to 9.',
      vizSmedSource: 'Source: SMED ink-color changeover proposal – Art DTM marker assembly machine (07/2026). Post-improvement figures are targets.',

      vizOeeA: 'Availability (A)',
      vizOeeP: 'Performance (P)',
      vizOeeQ: 'Quality (Q)',
      vizOeeWorld: 'World-class ≥ 85%',
      vizOeeAria:
        'OEE of the HDPE pelletizing machine in workshop F2: Availability 79.78%, Performance 60%, Quality 85%, OEE about 40% versus the 85% world-class benchmark.',
      vizOeeSource: 'Source: internship report “OEE Evaluation of the Pelletizing Machine” – DUYTAN Recycling, workshop F2 (08/2025).',

      vizGanttLot: 'Production lot',
      vizGanttChange: 'Changeover (SMED)',
      vizGanttAria:
        'Simulated Gantt chart of a 3-machine parallel schedule for 217 SKUs: lots leveled with Heijunka, separated by SMED changeover gaps.',
      vizGanttSource: 'Illustrative simulation — plant parameters anonymized.',

      vizQrScan: 'QR scan on the line',
      vizQrSheet: 'Google Sheets',
      vizQrDash: 'OEE Dashboard',
      vizQrAria:
        'Automated data flow: QR codes scanned on the packaging line, logged to Google Sheets, and rolled up into an OEE dashboard.',
      vizQrSource: 'Illustrative simulation of the QR → Google Sheets → OEE Dashboard flow.',

      footerCopy: '© 2026 Pham Anh Tuan · Production Planning · Lean · Operations Analytics',
      footerNavLabel: 'Footer navigation',
      backToTop: 'Back to top',

      toastEmailCopied: 'Copied email: phamanhtuan802@gmail.com',
      toastEmailCopyFailed: "Couldn't copy — email: phamanhtuan802@gmail.com",
      toastPhoneCopied: 'Copied Phone / Zalo: +84972693749',
      toastPhoneCopyFailed: "Couldn't copy — Phone / Zalo: (+84) 972 693 749"
    }
  };

  /* ========================================================================
     3. Featured Projects Data (4 Projects — Full VI & EN Parity)
     ======================================================================== */
  const PROJECTS = [
    {
      id: 'project-1',
      code: 'PRJ-01',
      timeframe: '05/2026 – 11/2026',
      repoUrl: null,
      visual: 'smed',
      cover: {
        kind: 'split',
        before: { src: 'assets/images/projects/prj-01-5s-aisle-before.webp', width: 400, height: 299 },
        after: { src: 'assets/images/projects/prj-01-5s-aisle-after-480.webp', width: 480, height: 360 },
        kpi: { to: 10, suffix: '/10', vi: 'lỗi 5S đã khắc phục', en: '5S findings fixed' },
        vi: { label: 'Xưởng Bút Lông · 5S 18–20/11', alt: 'Lối đi Xưởng Bút Lông trước và sau khi áp dụng 5S' },
        en: { label: 'Marker Workshop · 5S 18–20 Nov', alt: 'Marker Workshop aisle before and after the 5S clean-up' }
      },
      galleryNote: {
        vi: 'Đợt đánh giá 5S Xưởng Bút Lông 18–20/11/2026: 10/10 lỗi phát hiện đã khắc phục và đóng (Closed).',
        en: 'Marker Workshop 5S audit, 18–20 Nov 2026: 10/10 findings fixed and closed.'
      },
      gallery: [
        {
          kind: 'pair',
          before: { src: 'assets/images/projects/prj-01-5s-aisle-before.webp', width: 400, height: 299 },
          after: { src: 'assets/images/projects/prj-01-5s-aisle-after.webp', width: 800, height: 600 },
          vi: {
            alt: 'lối đi trong Xưởng Bút Lông',
            caption: 'S1 – Sàng lọc · Lối đi xưởng: thùng thành phẩm chắn lối đi được chuyển về kho'
          },
          en: {
            alt: 'Marker Workshop aisle',
            caption: 'S1 – Sort · Workshop aisle: finished-goods cartons blocking the aisle moved to the warehouse'
          }
        },
        {
          kind: 'pair',
          before: { src: 'assets/images/projects/prj-01-5s-stairs-before.webp', width: 400, height: 299 },
          after: { src: 'assets/images/projects/prj-01-5s-stairs-after.webp', width: 400, height: 300 },
          vi: {
            alt: 'khu vực dưới chân cầu thang',
            caption: 'S1 – Sàng lọc · Chân cầu thang: thùng carton và thùng nhựa tồn đọng được dọn, xếp gọn'
          },
          en: {
            alt: 'area under the staircase',
            caption: 'S1 – Sort · Under the stairs: idle cartons and plastic crates cleared and stacked'
          }
        },
        {
          kind: 'pair',
          before: { src: 'assets/images/projects/prj-01-5s-crates-before.webp', width: 400, height: 300 },
          after: { src: 'assets/images/projects/prj-01-5s-crates-after.webp', width: 400, height: 300 },
          vi: {
            alt: 'khu vực bên hông nhà máy',
            caption: 'S2 – Sắp xếp · Hông nhà máy: thùng nhựa để lộn xộn được xếp đúng vị trí quy định'
          },
          en: {
            alt: 'area beside the plant building',
            caption: 'S2 – Set in order · Beside the plant: scattered plastic crates stacked in their marked spot'
          }
        },
        {
          src: 'assets/images/projects/prj-01-dovetail-wave.webp',
          width: 1280,
          height: 502,
          wide: true,
          vi: {
            alt: 'Bảng trình tự đổi màu dove-tail Wave 1: đi từ Colorless Blender qua họ Vàng sang họ Cam, mỗi ô ghi mã màu, tên màu và số thứ tự',
            caption: 'Bảng trình tự đổi màu dove-tail (Wave 1: trong suốt → Vàng → Cam) — sắp lịch nhạt → đậm để giảm xúc rửa khi SMED'
          },
          en: {
            alt: 'Dove-tail color changeover sequence board, Wave 1: from Colorless Blender through the yellow family into the orange family, each tile showing color code, name and sequence number',
            caption: 'Dove-tail color sequence board (Wave 1: clear → yellow → orange) — light-to-dark ordering to cut purges during SMED'
          }
        }
      ],
      tools: [
        'SAP Logon (MM/PP, MB52, COGI)',
        'SMED',
        '5S & Gemba',
        'SOP Standardization',
        'Set-based Output Norms'
      ],
      vi: {
        orgShort: 'Tập đoàn Thiên Long · Nhà máy Long Thành',
        title: 'Tối ưu hóa Vận hành, Chuẩn hóa SAP ERP & Cải tiến SMED/5S tại Xưởng Bút Lông DTM',
        highlightBadge: 'Xử lý triệt để lỗi COGI · Đồng bộ BOM/Routing 217 SKU (4M SP/tháng)',
        summary:
          'Đồng bộ định mức BOM/Routing, xử lý dứt điểm lỗi treo tồn kho backflush (COGI) cho dòng Bút Lông 2 đầu (217 mã màu), đồng thời rút ngắn đổi mã bằng SMED và duy trì 5S.',
        timeframeContext:
          '05/2026 – 11/2026 | Thực tập sinh Kế hoạch & Điều độ sản xuất (KHSX) và Tổ trưởng sản xuất tại Nhà máy Long Thành, Tập đoàn Thiên Long (KCN Long Thành, Đồng Nai).',
        objective:
          'Đồng bộ định mức BOM/Routing, xử lý dứt điểm lỗi treo tồn kho khi backflush (COGI), kiểm soát luồng bán thành phẩm (BTP) từ ép nhựa đến thành phẩm cho dòng Bút Lông 2 đầu (Dual Tip Marker – 217 mã màu, mục tiêu 4.000.000 sản phẩm/tháng), đồng thời rút ngắn thời gian chuyển đổi mã hàng.',
        deliverables:
          'Bộ quy trình chuẩn SOP cho máy in tẩy và vận hành chuyền Bút Lông; hệ thống đối soát tồn kho cut-off SAP MB52/COGI; bảng tính mục tiêu sản lượng theo Set đóng gói trên chuyền.',
        results:
          'Xử lý triệt để các lỗi tồn kho COGI phát sinh trong kỳ thực tập, chuẩn hóa đồng bộ dữ liệu BOM/Routing từ phôi nhựa đến thành phẩm, rút ngắn thời gian đổi mã bằng SMED và duy trì tiêu chuẩn 5S tại xưởng.'
      },
      en: {
        orgShort: 'Thien Long Group · Long Thanh Plant',
        title: 'Operations Optimization, SAP ERP Standardization & SMED/5S Improvement at DTM Marker Workshop',
        highlightBadge: 'Eliminated COGI Errors · Standardized 217-SKU BOM/Routing (4M units/mo)',
        summary:
          'Synchronized BOM/Routing norms and eliminated backflush inventory errors (COGI) across 217 Dual Tip Marker SKUs while reducing changeover times via SMED and daily 5S.',
        timeframeContext:
          '05/2026 – 11/2026 | Production Planning & Scheduling Intern and Production Team Leader at Long Thanh Plant, Thien Long Group (Long Thanh IP, Dong Nai).',
        objective:
          'Synchronize BOM/Routing norms, resolve backflush inventory posting errors (COGI), control semi-finished goods (WIP) flow from injection molding to finished goods for Dual Tip Markers (217 color SKUs, 4,000,000 units/month target), and reduce changeover times.',
        deliverables:
          'Standard Operating Procedures (SOPs) for pad/barrel printing and marker assembly lines; SAP MB52/COGI cut-off inventory reconciliation system; line output target calculator by packaging set.',
        results:
          'Eliminated recurring COGI inventory errors during the internship, standardized end-to-end BOM/Routing data from molded blanks to finished goods, reduced SKU changeover times via SMED, and sustained daily shop-floor 5S standards.'
      }
    },

    {
      id: 'project-2',
      code: 'PRJ-02',
      timeframe: '06/2025 – 08/2025',
      repoUrl: null,
      visual: 'oee',
      cover: {
        src: 'assets/images/projects/prj-02-cover.webp',
        small: 'assets/images/projects/prj-02-cover-640.webp',
        width: 1200,
        height: 675,
        kpi: { to: 40.7, decimals: 1, prefix: 'OEE ', suffix: '%', vi: 'A × P × Q · máy tạo hạt HDPE', en: 'A × P × Q · HDPE pelletizer' },
        vi: { label: 'DUYTAN Recycling · Xưởng F2', alt: 'Phối cảnh poster truyền thông nội bộ 5S và an toàn tại xưởng F2' },
        en: { label: 'DUYTAN Recycling · Workshop F2', alt: 'Mock-up of 5S and safety communication posters in workshop F2' }
      },
      gallery: [
        {
          src: 'assets/images/projects/prj-02-f2-signage-mockup.webp',
          width: 1280,
          height: 905,
          wide: true,
          vi: {
            alt: 'Phối cảnh hệ thống poster truyền thông nội bộ 5S và an toàn lao động gắn trên cột xưởng F2, DUYTAN Recycling',
            caption: 'Đề xuất truyền thông nội bộ 5S & an toàn — phối cảnh tại xưởng F2'
          },
          en: {
            alt: 'Mock-up of 5S and workplace-safety internal communication posters mounted on the columns of workshop F2, DUYTAN Recycling',
            caption: '5S & safety internal communication proposal — workshop F2 mock-up'
          }
        },
        {
          src: 'assets/images/projects/prj-02-posters-onsite.webp',
          width: 1280,
          height: 593,
          wide: true,
          vi: {
            alt: 'Ba bảng truyền thông về phân loại nhựa và sản xuất an toàn đã in, đặt tại nhà máy DUYTAN Recycling',
            caption: 'Bảng truyền thông phân loại nhựa & an toàn đã in và đặt tại xưởng'
          },
          en: {
            alt: 'Three printed boards on plastic sorting and production safety placed at the DUYTAN Recycling plant',
            caption: 'Plastic-sorting & safety boards printed and placed on the shop floor'
          }
        }
      ],
      tools: [
        'OEE (Availability · Performance · Quality)',
        'Cycle Time Study',
        '5 Whys RCA',
        '5S Audit'
      ],
      vi: {
        orgShort: 'DUYTAN Recycling · Bộ phận Sản xuất',
        title: 'Đánh giá Hiệu suất Thiết bị Toàn phần (OEE) & Phân tích Nguyên nhân Gốc rễ Máy tạo hạt nhựa HDPE',
        highlightBadge: 'Lượng hóa 3 cấu phần tổn thất OEE · Đề xuất cải tiến bồn trộn HDPE',
        summary:
          'Đo lường OEE và thời gian chu kỳ trên cụm máy tạo hạt nhựa tái chế HDPE, truy tìm nguyên nhân gốc bằng 5 Whys để tháo gỡ điểm nghẽn nguyên liệu đầu vào và chuẩn hóa 5S.',
        timeframeContext:
          '06/2025 – 08/2025 | Thực tập sinh Bộ phận Sản xuất tại Nhà máy Nhựa Tái chế Duy Tân (DUYTAN Recycling).',
        objective:
          'Đo lường hiệu suất vận hành thực tế và truy tìm nguyên nhân gây dừng máy, thất thoát năng suất trên cụm máy tạo hạt nhựa tái chế HDPE (nhằm giải quyết điểm nghẽn nguyên liệu đầu vào).',
        deliverables:
          'Báo cáo nghiên cứu khoa học đánh giá OEE và phân tích 5 Whys cho máy tạo hạt HDPE; bộ slide đề xuất cải tiến kỹ thuật cho bồn trộn (mixing tanks) và tài liệu truyền thông 5S nội bộ.',
        results:
          'Lượng hóa 3 cấu phần tổn thất OEE của cụm máy tạo hạt HDPE, xác định nguyên nhân gốc rễ gây nghẽn nguyên liệu và hoàn thiện bộ giải pháp cải tiến bồn trộn trình ban quản lý.'
      },
      en: {
        orgShort: 'DUYTAN Recycling · Production Dept.',
        title: 'Overall Equipment Effectiveness (OEE) Evaluation & Root-Cause Analysis for HDPE Pelletizing Line',
        highlightBadge: 'Quantified 3 OEE Loss Pillars · Actionable Mixing-Tank Proposal',
        summary:
          'Measured OEE and cycle times on HDPE recycled plastic pelletizing lines, isolating raw material bottlenecks through 5 Whys RCA and delivering mixing-tank and 5S improvements.',
        timeframeContext:
          '06/2025 – 08/2025 | Production Department Intern at Duy Tan Recycling Plant (DUYTAN Recycling).',
        objective:
          'Measure actual operating efficiency and identify root causes of machine downtime and yield loss on HDPE recycled plastic pelletizing units to resolve raw material input bottlenecks.',
        deliverables:
          'Technical OEE evaluation and 5 Whys root-cause analysis report for HDPE pelletizing machinery; engineering improvement proposal deck for mixing tanks and internal 5S visual communication materials.',
        results:
          'Quantified all 3 OEE loss components on the HDPE pelletizing cluster, pinpointed root causes of raw material bottlenecks, and delivered an actionable mixing-tank improvement proposal to plant management.'
      }
    },

    {
      id: 'project-3',
      code: 'PRJ-03',
      timeframe: '11/2026',
      visual: 'gantt',
      cover: {
        src: 'assets/images/projects/prj-03-cover.webp',
        small: 'assets/images/projects/prj-03-cover-640.webp',
        width: 1200,
        height: 675,
        live: true,
        kpi: { to: 217, suffix: ' SKU', vi: 'xếp lịch song song 3 máy', en: 'parallel 3-machine scheduling' },
        vi: { label: 'productionscheduler.vercel.app', alt: 'Ứng dụng điều độ sản xuất: thẻ KPI và biểu đồ Gantt 3 máy theo ca' },
        en: { label: 'productionscheduler.vercel.app', alt: 'Production scheduler app: KPI cards and a 3-machine shift Gantt chart' }
      },
      repoUrl: 'https://github.com/TuanPhamJ/Production_Scheduler',
      repoText: 'TuanPhamJ/Production_Scheduler',
      demoUrl: 'https://productionscheduler.vercel.app/',
      galleryNote: {
        vi: 'Ảnh chụp bản deploy productionscheduler.vercel.app với bộ kế hoạch mẫu ẩn danh (mã SAP giả DEMO-xxxx).',
        en: 'Screenshots of the live productionscheduler.vercel.app build loaded with an anonymized sample plan (dummy SAP codes DEMO-xxxx).'
      },
      gallery: [
        {
          src: 'assets/images/projects/prj-03-scheduler-overview.webp',
          width: 1600,
          height: 717,
          wide: true,
          vi: {
            alt: 'Giao diện ứng dụng điều độ: thẻ KPI mô phỏng, bảng chọn ca và máy M1–M3, biểu đồ Gantt theo ca và giờ với các lô FINE màu xanh ngọc',
            caption: 'Màn hình chính: KPI mô phỏng, cấu hình ca & máy, Gantt theo ca/giờ với khoảng đổi màu được tính tự động'
          },
          en: {
            alt: 'Scheduler interface: simulated KPI cards, shift and machine M1–M3 setup, Gantt chart by shift and hour with teal FINE lots',
            caption: 'Main view: simulated KPIs, shift & machine setup, shift/hour Gantt with automatically computed changeovers'
          }
        },
        {
          src: 'assets/images/projects/prj-03-scheduler-gantt-multiday.webp',
          width: 1600,
          height: 344,
          wide: true,
          vi: {
            alt: 'Biểu đồ Gantt chế độ toàn đợt: ba máy chạy song song trong ba ngày, dòng FINE màu xanh ngọc chạy trước, dòng CHISEL màu xanh dương chạy sau',
            caption: 'Chế độ Toàn đợt: lịch song song 3 máy trong 3 ngày — FINE chạy trước, CHISEL chạy sau, ô sọc là đổi màu/đổi dòng'
          },
          en: {
            alt: 'Multi-day Gantt view: three machines running in parallel over three days, teal FINE line first, blue CHISEL line after',
            caption: 'Multi-day view: 3-machine parallel schedule over 3 days — FINE first, then CHISEL; hatched cells are changeovers'
          }
        }
      ],
      tools: [
        'HTML5',
        'CSS3',
        'Vanilla JavaScript (ui.js, engine.js, data.js)',
        'Heijunka Algorithm',
        'SMED Logic',
        'DBR / CONWIP / POLCA',
        'GitHub & Vercel'
      ],
      vi: {
        orgShort: 'Dự án Cá nhân · NDA-Sanitized',
        title: 'Ứng dụng Web Điều độ Sản xuất Song song Gantt & Heijunka (Production_Scheduler)',
        highlightBadge: 'Deploy ổn định trên Vercel · Tự động xếp lịch song song 217 SKU',
        summary:
          'Xây dựng Web App lập lịch chạy máy song song có ràng buộc SMED & Heijunka cho 217 SKU với biểu đồ Gantt tương tác, thay thế phương pháp xếp lịch thủ công dễ xung đột.',
        timeframeContext:
          '11/2026 | Dự án phần mềm điều độ sản xuất cá nhân (đã ẩn danh dữ liệu bảo mật nhà máy).',
        objective:
          'Tự động hóa việc lập lịch chạy máy song song cho danh mục 217 SKU có ràng buộc thời gian đổi mã (SMED) và cân bằng nhịp sản xuất (Heijunka), thay thế phương pháp xếp lịch thủ công dễ xung đột tài nguyên.',
        deliverables:
          'Web App điều độ sản xuất triển khai trực tuyến trên Vercel (mã nguồn: TuanPhamJ/Production_Scheduler), tích hợp biểu đồ Gantt tương tác, bộ lọc đồng bộ và tính năng nhập/xuất dữ liệu kế hoạch.',
        results:
          'Hoàn thiện và deploy thành công ứng dụng web chạy ổn định trên Vercel, tự động hóa tính toán lịch chạy máy song song và thời gian đổi mã cho dây chuyền đa SKU.'
      },
      en: {
        orgShort: 'Independent Project · NDA-Sanitized',
        title: 'Parallel Gantt & Heijunka Production Scheduling Web App (Production_Scheduler)',
        highlightBadge: 'Deployed Live on Vercel · Automated 217-SKU Parallel Scheduling',
        summary:
          'Built a web scheduler with interactive Gantt charts, SMED changeover logic, and Heijunka leveling across 217 SKUs to replace error-prone manual machine scheduling.',
        timeframeContext:
          '11/2026 | Independent production scheduling web application (NDA-sanitized factory parameters).',
        objective:
          'Automate parallel machine scheduling across a 217-SKU catalog constrained by SMED changeover times and Heijunka production leveling, replacing error-prone manual scheduling.',
        deliverables:
          'Production scheduling web app deployed live on Vercel (repo: TuanPhamJ/Production_Scheduler), featuring an interactive Gantt chart, synchronized filters, and schedule import/export.',
        results:
          'Built and deployed a production-ready web application on Vercel that automates parallel machine scheduling and changeover time calculations for multi-SKU lines.'
      }
    },

    {
      id: 'project-4',
      code: 'PRJ-04',
      timeframe: '07/2026 & 10/2026 – 11/2026',
      repoUrl: null,
      visual: 'qr',
      cover: {
        src: 'assets/images/projects/prj-04-cover.webp',
        small: 'assets/images/projects/prj-04-cover-640.webp',
        width: 1200,
        height: 675,
        kpi: { to: 100, suffix: '%', vi: 'tự động QR → Sheets → Dashboard', en: 'automated QR → Sheets → Dashboard' },
        vi: { label: 'TỔNG TGDM + OEE – BL 2026.xlsm', alt: 'Dashboard OEE và thời gian dừng máy Xưởng Bút Lông trong Excel' },
        en: { label: 'TỔNG TGDM + OEE – BL 2026.xlsm', alt: 'Marker Workshop OEE and downtime dashboard in Excel' }
      },
      gallery: [
        {
          src: 'assets/images/projects/prj-04-excel-vba-form.webp',
          width: 1280,
          height: 789,
          wide: true,
          vi: {
            alt: 'Form VBA trong Excel tên Nhập dừng máy – dữ liệu OEE với các ô tháng, ngày, ca, mã máy, sản lượng BTP đạt và lỗi, và 19 ô thời gian dừng theo nguyên nhân',
            caption: 'Form VBA “Nhập dừng máy – dữ liệu OEE” trong Excel: chọn ca, máy, BTP; nhập 19 nguyên nhân dừng máy; tự ghi vào dòng kế tiếp'
          },
          en: {
            alt: 'Excel VBA form titled Machine stop entry – OEE data with fields for month, day, shift, machine code, good and defective output, and 19 downtime-reason fields',
            caption: 'Excel VBA “Machine stop entry – OEE data” form: pick shift, machine and part; log 19 downtime reasons; auto-writes the next row'
          }
        },
        {
          src: 'assets/images/projects/prj-04-oee-dashboard.webp',
          width: 1139,
          height: 684,
          wide: true,
          vi: {
            alt: 'Dashboard OEE và thời gian dừng máy Xưởng Bút Lông: biểu đồ Pareto 10 nguyên nhân dừng, biểu đồ vòng cơ cấu thời gian kế hoạch, xu hướng OEE, A, P, Q và giờ dừng máy theo tháng',
            caption: 'Dashboard OEE & thời gian dừng máy: Pareto 10 nguyên nhân dừng, cơ cấu thời gian KHSX, xu hướng OEE · A · P · Q theo tháng'
          },
          en: {
            alt: 'Marker Workshop OEE and downtime dashboard: Pareto of the top 10 stop reasons, donut of planned-time structure, monthly OEE, A, P, Q trend and downtime hours',
            caption: 'OEE & downtime dashboard: top-10 stop-reason Pareto, planned-time structure, monthly OEE · A · P · Q trends'
          }
        },
        {
          src: 'assets/images/projects/prj-04-google-form.webp',
          width: 850,
          height: 640,
          wide: true,
          vi: {
            alt: 'Google Form Báo cáo năng suất đóng gói cuối ngày: nhân viên quét mã QR tại chuyền rồi nhập mã nhân viên và sản lượng',
            caption: 'Google Form “Báo cáo năng suất đóng gói cuối ngày” — điểm nhập liệu khi công nhân quét QR tại chuyền'
          },
          en: {
            alt: 'Google Form End-of-day packaging productivity report: workers scan the line QR code and enter their employee ID and output',
            caption: 'Google Form “End-of-day packaging productivity report” — the entry point when workers scan the line QR code'
          }
        }
      ],
      tools: [
        'Google Forms',
        'Google Sheets (Dynamic Arrays, Apps Script)',
        'Microsoft Excel (VBA Macros, openpyxl)',
        'QR Code Tracking'
      ],
      vi: {
        orgShort: 'Tập đoàn Thiên Long · Xưởng Bút Lông',
        title: 'Hệ thống Theo dõi Năng suất Đóng gói qua QR & Dashboard OEE',
        highlightBadge: 'Tự động hóa 100% luồng QR → Sheets → Dashboard OEE thời gian thực',
        summary:
          'Loại bỏ sổ giấy và tổng hợp tay cuối ca bằng quy trình quét mã QR nhập liệu liên kết Google Sheets, Excel VBA và Dashboard OEE theo dõi sản lượng theo Set.',
        timeframeContext:
          '07/2026 & 10/2026 – 11/2026 | Triển khai phục vụ quản lý vận hành tại Xưởng Bút Lông, Tập đoàn Thiên Long.',
        objective:
          'Loại bỏ khâu ghi chép giấy và tổng hợp tay cuối ca; theo dõi sản lượng thực tế theo Set đóng gói và cập nhật thời gian dừng máy (TGDM), chỉ số OEE trực quan.',
        deliverables:
          'Hệ thống quét mã QR nhập liệu sản lượng liên kết Google Sheets (QR OEE Xưởng Bút Lông, NHẬP OEE Xưởng Bút Lông); hệ thống tổng hợp và Dashboard OEE (TỔNG TGDM + OEE - BL 2026).',
        results:
          'Tự động hóa hoàn toàn luồng dữ liệu từ chuyền đóng gói lên dashboard quản trị, giúp theo dõi sản lượng theo Set và chỉ số OEE theo thời gian thực.'
      },
      en: {
        orgShort: 'Thien Long Group · Marker Workshop',
        title: 'QR-Based Packaging Productivity Tracking System & OEE Dashboard',
        highlightBadge: '100% Automated QR → Sheets → Real-Time OEE Dashboard',
        summary:
          'Eliminated paper logbooks and manual shift consolidation via QR-code production entry linked to Google Sheets, Excel VBA/openpyxl, and an OEE Dashboard.',
        timeframeContext:
          '07/2026 & 10/2026 – 11/2026 | Deployed for shop-floor operations management at the Marker Workshop, Thien Long Group.',
        objective:
          'Eliminate paper logbooks and manual end-of-shift consolidation; track real-time output by packaging set alongside machine downtime and OEE metrics.',
        deliverables:
          'QR-code production entry workflow linked to Google Sheets (QR OEE Xưởng Bút Lông, NHẬP OEE Xưởng Bút Lông); automated consolidation engine and OEE Dashboard (TỔNG TGDM + OEE - BL 2026).',
        results:
          'Fully automated the data pipeline from packaging lines to management dashboards, enabling real-time visibility into set-based output and OEE performance.'
      }
    }
  ];

  /* ========================================================================
     4. Helpers & State
     ======================================================================== */
  let currentLang = 'vi';
  let activeProjectId = null;
  let activeSection = 'overview';
  let lastFocusedElement = null;
  let emailResetTimer = null;
  let phoneResetTimer = null;
  let toastKey = null;
  let toastHideTimer = null;
  let modalCloseTimer = null;
  let modalNavBusy = false;
  let globeTurns = 0;
  let scrollTicking = false;
  let suppressVizReplay = false;

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
    projectsGrid: $('projects-grid'),
    modalRoot: $('project-modal'),
    modalDialog: $('modal-dialog'),
    modalBody: $('modal-body'),
    modalContent: $('modal-content'),
    modalCode: $('modal-code'),
    modalOrg: $('modal-org'),
    modalCounter: $('modal-counter'),
    modalTimeframe: $('modal-timeframe'),
    modalTitle: $('modal-title'),
    modalOutcomeText: $('modal-outcome-text'),
    modalExternalRow: $('modal-external-row'),
    modalExternalLink: $('modal-external-link'),
    modalExternalLabel: $('modal-external-label'),
    modalDemoLink: $('modal-demo-link'),
    modalDemoLabel: $('modal-demo-label'),
    modalGalleryNote: $('modal-gallery-note'),
    modalSections: $('modal-sections-grid'),
    modalViz: $('modal-viz'),
    modalVizStage: $('modal-viz-stage'),
    modalVizSource: $('modal-viz-source'),
    modalGallery: $('modal-gallery'),
    modalGalleryGrid: $('modal-gallery-grid'),
    modalCloseBtn: $('modal-close-btn'),
    modalPrevBtn: $('modal-prev-btn'),
    modalNextBtn: $('modal-next-btn'),
    modalPrevTitle: $('modal-prev-title'),
    modalNextTitle: $('modal-next-title'),
    copyEmailTriggers: Array.from(document.querySelectorAll('.copy-email-trigger')),
    copyPhoneTriggers: Array.from(document.querySelectorAll('.copy-phone-trigger')),
    toast: $('copy-toast'),
    toastText: $('copy-toast-text')
  };

  const SECTION_IDS = ['overview', 'projects'];
  const sections = SECTION_IDS.map((id) => $(id)).filter(Boolean);

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

  function findProject(id) {
    return PROJECTS.find((p) => p.id === id) || null;
  }

  function t(key) {
    const dict = I18N[currentLang];
    return dict && dict[key] !== undefined ? dict[key] : I18N.vi[key];
  }

  /* ========================================================================
     5. Scroll Reveal (IntersectionObserver)
     ======================================================================== */
  const Reveal = {
    observer: null,
    disabled: REDUCED_MOTION || !('IntersectionObserver' in window),

    init() {
      if (this.disabled) return;
      this.observer = new IntersectionObserver((entries) => this.onIntersect(entries), {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.08
      });
    },

    onIntersect(entries) {
      const batch = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

      const perParent = new Map();
      batch.forEach((el) => {
        const parent = el.parentElement;
        const index = perParent.get(parent) || 0;
        perParent.set(parent, index + 1);
        this.show(el, Math.min(index, 6) * STAGGER_MS);
        this.observer.unobserve(el);
      });
    },

    show(el, delay) {
      el.style.setProperty('--reveal-delay', `${delay}ms`);
      el.classList.add('is-visible');
      const motion = el.querySelector('[data-motion]:not(.is-on)');
      if (motion) window.setTimeout(() => Viz.play(motion), delay + 200);
      window.setTimeout(() => {
        el.classList.add('reveal-done');
        el.style.removeProperty('--reveal-delay');
      }, delay + 540);
    },

    observe(root) {
      (root || document).querySelectorAll('.reveal-item:not(.is-visible)').forEach((el) => {
        if (this.disabled) {
          el.classList.add('is-visible', 'reveal-done');
          const motion = el.querySelector('[data-motion]:not(.is-on)');
          if (motion) Viz.play(motion, { instant: true });
        } else {
          this.observer.observe(el);
        }
      });
    }
  };

  function revealClassFor(container) {
    return container && container.querySelector('.reveal-item.is-visible') ? ' is-visible reveal-done' : '';
  }

  /* ========================================================================
     5b. Project Visuals — animated mini-charts built from real project data
         (SMED changeover, OEE A×P×Q, Heijunka Gantt, QR → Sheets → Dashboard).
         Markup always carries the final values, so reduced motion / instant
         renders are correct; animation only adds the build-up.
     ======================================================================== */
  const NUM_LOCALE = { vi: 'vi-VN', en: 'en-US' };

  const VIZ_META = {
    smed: { aria: 'vizSmedAria', source: 'vizSmedSource' },
    oee: { aria: 'vizOeeAria', source: 'vizOeeSource' },
    gantt: { aria: 'vizGanttAria', source: 'vizGanttSource' },
    qr: { aria: 'vizQrAria', source: 'vizQrSource' }
  };

  function formatNumber(value, decimals) {
    return Number(value).toLocaleString(NUM_LOCALE[currentLang] || 'en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function countSpan(to, opts) {
    const o = opts || {};
    const decimals = o.decimals || 0;
    const prefix = o.prefix || '';
    const suffix = o.suffix || '';
    return `<span class="viz-num" data-count-to="${to}" data-decimals="${decimals}" data-prefix="${escapeHtml(prefix)}" data-suffix="${escapeHtml(suffix)}" data-count-delay="${o.delay || 0}" data-count-dur="${o.dur || 900}">${escapeHtml(prefix + formatNumber(to, decimals) + suffix)}</span>`;
  }

  function vizSmed() {
    const scale = 26;
    const pct = (min) => `${((min / scale) * 100).toFixed(2)}%`;
    return `
      <div class="smed-row">
        <span class="smed-label">${escapeHtml(t('vizSmedNow'))}</span>
        <div class="smed-track">
          <span class="smed-seg is-ext" style="left:0;width:${pct(8)}"></span>
          <span class="smed-seg is-int is-before" style="left:${pct(8)};width:${pct(16.5)}"></span>
        </div>
        <span class="smed-value">≈${formatNumber(16.5, 1)}′</span>
      </div>
      <div class="smed-row">
        <span class="smed-label">${escapeHtml(t('vizSmedTarget'))}</span>
        <div class="smed-track">
          <span class="smed-seg is-ext is-late" style="left:0;width:${pct(7.5)}"></span>
          <span class="smed-seg is-int is-after" style="left:${pct(7.5)};width:${pct(10)}"></span>
        </div>
        <span class="smed-value is-target">
          <span class="smed-value-from">${formatNumber(16.5, 1)}′</span>
          <span class="smed-value-to">≤10′</span>
        </span>
      </div>
      <div class="viz-legend">
        <span class="legend-item"><i class="legend-swatch is-int"></i>${escapeHtml(t('vizSmedInternal'))}</span>
        <span class="legend-item"><i class="legend-swatch is-ext"></i>${escapeHtml(t('vizSmedExternal'))}</span>
        <span class="viz-pill">${escapeHtml(t('vizSmedSteps'))}</span>
      </div>`;
  }

  function vizOee() {
    const r = 34;
    const circ = 2 * Math.PI * r;
    const a = 79.78;
    const p = 60;
    const q = 85;
    const oee = (a / 100) * (p / 100) * (q / 100);
    const bars = [
      ['vizOeeA', a, 2],
      ['vizOeeP', p, 0],
      ['vizOeeQ', q, 0]
    ];
    return `
      <div class="oee-ring">
        <svg viewBox="0 0 84 84" aria-hidden="true" focusable="false">
          <circle class="oee-ring-track" cx="42" cy="42" r="${r}"></circle>
          <circle class="oee-ring-fill" cx="42" cy="42" r="${r}" stroke-dasharray="${circ.toFixed(2)}" style="--c:${circ.toFixed(2)};--off:${(circ * (1 - oee)).toFixed(2)}"></circle>
          <line class="oee-ring-tick" x1="42" y1="0.5" x2="42" y2="15" transform="rotate(${0.85 * 360} 42 42)"></line>
        </svg>
        <span class="oee-ring-value">
          ${countSpan(oee * 100, { decimals: 1, suffix: '%', delay: 200, dur: 1200 })}
          <span class="oee-ring-label">OEE</span>
        </span>
      </div>
      <div class="oee-bars">
        ${bars
          .map(
            ([key, value, decimals], i) => `
          <div class="oee-bar" style="--i:${i}">
            <span class="oee-bar-label">${escapeHtml(t(key))}</span>
            <span class="oee-bar-track"><span class="oee-bar-fill" style="width:${value}%"></span></span>
            <span class="oee-bar-value">${countSpan(value, { decimals, suffix: '%', delay: 140 + i * 150 })}</span>
          </div>`
          )
          .join('')}
        <span class="oee-world"><i class="legend-swatch is-good"></i>${escapeHtml(t('vizOeeWorld'))}</span>
      </div>`;
  }

  function vizGantt() {
    const LEN = { A: 4, B: 3, C: 3.5 };
    const GAP = 0.5;
    const SCALE = 24;
    const pct = (v) => `${((v / SCALE) * 100).toFixed(2)}%`;
    const sequences = ['ABCABC', 'BCABCA', 'CABCAB'];

    const rows = sequences.map((seq, row) => {
      let cursor = 0;
      const parts = [];
      seq.split('').forEach((fam, idx) => {
        if (idx > 0) {
          parts.push(`<span class="gantt-gap" style="left:${pct(cursor)};width:${pct(GAP)}"></span>`);
          cursor += GAP;
        }
        const delay = row * 90 + idx * 110;
        parts.push(
          `<span class="gantt-lot fam-${fam.toLowerCase()}" style="left:${pct(cursor)};width:${pct(LEN[fam])};--d:${delay}ms">${fam}</span>`
        );
        cursor += LEN[fam];
      });
      return `<div class="gantt-track">${parts.join('')}</div>`;
    });

    return `
      <div class="gantt-head">
        <span class="gantt-sku">${countSpan(217, { dur: 1100 })} SKU</span>
        <span class="viz-legend">
          <span class="legend-item"><i class="legend-swatch is-lot"></i>${escapeHtml(t('vizGanttLot'))}</span>
          <span class="legend-item"><i class="legend-swatch is-change"></i>${escapeHtml(t('vizGanttChange'))}</span>
        </span>
      </div>
      <div class="gantt-body">
        <div class="gantt-machines"><span>M1</span><span>M2</span><span>M3</span></div>
        <div class="gantt-tracks">
          ${rows.join('')}
          <span class="gantt-sweep" aria-hidden="true"></span>
        </div>
      </div>`;
  }

  function vizQr() {
    const modules = [
      [9, 1], [11, 2], [9, 4], [10, 6], [12, 8], [1, 9], [3, 10], [6, 9], [9, 9], [11, 11],
      [14, 9], [16, 10], [19, 9], [18, 12], [9, 13], [12, 14], [10, 16], [14, 15], [17, 17],
      [12, 19], [15, 19], [19, 15], [16, 14], [10, 19]
    ];
    const finder = (x, y) =>
      `<rect x="${x}" y="${y}" width="7" height="7" rx="1.4"></rect><rect class="qr-hole" x="${x + 1}" y="${y + 1}" width="5" height="5" rx="0.9"></rect><rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx="0.6"></rect>`;
    const flow = '<span class="qr-flow" aria-hidden="true"><i></i><i></i><i></i></span>';
    const sheetRows = [0, 1, 2, 3]
      .map((i) => `<span class="sheet-row" style="--i:${i}"><i style="width:${[78, 56, 88, 64][i]}%"></i></span>`)
      .join('');
    const dashBars = [46, 72, 58, 88, 66]
      .map((h, i) => `<i style="height:${h}%;--i:${i}"></i>`)
      .join('');

    return `
      <div class="qr-node">
        <span class="qr-box">
          <svg viewBox="0 0 21 21" aria-hidden="true" focusable="false">
            ${finder(0, 0)}${finder(14, 0)}${finder(0, 14)}
            ${modules.map(([x, y]) => `<rect x="${x}" y="${y}" width="1.6" height="1.6" rx="0.3"></rect>`).join('')}
          </svg>
          <span class="qr-scan"></span>
        </span>
        <span class="qr-label">${escapeHtml(t('vizQrScan'))}</span>
      </div>
      ${flow}
      <div class="qr-node">
        <span class="qr-sheet">${sheetRows}</span>
        <span class="qr-label">${escapeHtml(t('vizQrSheet'))}</span>
      </div>
      ${flow}
      <div class="qr-node">
        <span class="qr-dash"><span class="qr-dash-kpi">OEE</span><span class="qr-dash-bars">${dashBars}</span></span>
        <span class="qr-label">${escapeHtml(t('vizQrDash'))}</span>
      </div>`;
  }

  const VIZ_BUILDERS = { smed: vizSmed, oee: vizOee, gantt: vizGantt, qr: vizQr };

  function renderViz(project, opts) {
    const o = opts || {};
    const build = VIZ_BUILDERS[project.visual];
    if (!build) return '';
    const classes = ['viz', `viz-${project.visual}`];
    if (o.large) classes.push('viz--lg');
    if (o.played) classes.push('is-on', 'no-anim');
    return `<div class="${classes.join(' ')}" role="img" aria-label="${escapeHtml(t(VIZ_META[project.visual].aria))}">${build()}</div>`;
  }

  const Viz = {
    format(el, progress) {
      const to = parseFloat(el.dataset.countTo);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      return `${el.dataset.prefix || ''}${formatNumber(to * progress, decimals)}${el.dataset.suffix || ''}`;
    },

    countUp(root) {
      root.querySelectorAll('[data-count-to]').forEach((el) => {
        const delay = parseInt(el.dataset.countDelay || '0', 10);
        const duration = parseInt(el.dataset.countDur || '900', 10);
        const start = performance.now() + delay;
        el.textContent = this.format(el, 0);

        const tick = (now) => {
          if (!root.isConnected || !root.classList.contains('is-on')) return;
          const p = Math.min(1, Math.max(0, (now - start) / duration));
          el.textContent = this.format(el, 1 - Math.pow(1 - p, 3));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },

    play(root, opts) {
      if (!root) return;
      const instant = REDUCED_MOTION || !!(opts && opts.instant);
      root.classList.remove('is-on');
      root.classList.toggle('no-anim', instant);
      if (instant) {
        root.classList.add('is-on');
        root.querySelectorAll('[data-count-to]').forEach((el) => {
          el.textContent = this.format(el, 1);
        });
        return;
      }
      void root.offsetWidth;
      root.classList.add('is-on');
      root.dataset.playedAt = String(Date.now());
      this.countUp(root);
    },

    replay(root) {
      if (!root || REDUCED_MOTION || !root.classList.contains('is-on')) return;
      if (Date.now() - Number(root.dataset.playedAt || 0) < 2800) return;
      this.play(root);
    }
  };

  /* ========================================================================
     5c. Tool icons — brand marks (Simple Icons, CC0) for software tools,
         Lucide line icons for methods. Excel / Power BI / Power Query have no
         open brand mark, so they use a brand-colored generic glyph.
     ======================================================================== */
  const TOOL_ICON_DATA = {"sap":{"t":"b","c":"#0FAAFF","d":"M0 6.064v11.872h12.13L24 6.064zm3.264 2.208h.005c.863.001 1.915.245 2.676.633l-.82 1.43c-.835-.404-1.255-.442-1.73-.467-.708-.038-1.064.215-1.069.488-.007.332.669.633 1.305.838.964.306 2.19.715 2.377 1.9L7.77 8.437h2.046l2.064 5.576-.007-5.575h2.37c2.257 0 3.318.764 3.318 2.519 0 1.575-1.09 2.514-2.936 2.514h-.763l-.01 2.094-3.588-.003-.25-.908c-.37.122-.787.189-1.23.189-.456 0-.885-.071-1.263-.2l-.358.919-2 .006.09-.462c-.029.025-.057.05-.087.074-.535.43-1.208.629-2.037.644l-.213.002a5.075 5.075 0 0 1-2.581-.675l.73-1.448c.79.467 1.286.572 1.956.558.347-.007.598-.07.761-.239a.557.557 0 0 0 .156-.369c.007-.376-.53-.553-1.185-.756-.531-.164-1.135-.389-1.606-.735-.559-.41-.825-.924-.812-1.65a1.99 1.99 0 0 1 .566-1.377c.519-.537 1.357-.863 2.363-.863zm10.597 1.67v1.904h.521c.694 0 1.247-.23 1.248-.964 0-.709-.554-.94-1.248-.94zm-5.087.767l-.748 2.362c.223.085.481.133.757.133.268 0 .52-.047.742-.126l-.736-2.37z"},"googlesheets":{"t":"b","c":"#34A853","d":"M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z"},"googleforms":{"t":"b","c":"#7248B9","d":"M14.727 6h6l-6-6v6zm0 .727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727h-6zM7.91 17.318a.819.819 0 1 1 .001-1.638.819.819 0 0 1 0 1.638zm0-3.273a.819.819 0 1 1 .001-1.637.819.819 0 0 1 0 1.637zm0-3.272a.819.819 0 1 1 .001-1.638.819.819 0 0 1 0 1.638zm9 6.409h-6.818v-1.364h6.818v1.364zm0-3.273h-6.818v-1.364h6.818v1.364zm0-3.273h-6.818V9.273h6.818v1.363z"},"googleappsscript":{"t":"b","c":"#4285F4","d":"M12.363 2.54a3.136 3.136 0 0 0-.376.022 2.864 2.864 0 0 0-1.589.828c-.562.58-.82 1.115-.773 1.943-.01.264.193 1.023.272 1.274 1.115 3.546 2.09 6.75 3.26 10.279.08.246.168.486.267.72.02.047.035.046.048-.004.077-.297.174-.612.29-.945.894-2.576 1.772-5.14 2.633-7.696a.345.345 0 0 0 .004-.217 163.054 163.054 0 0 0-1.49-4.572 2.603 2.603 0 0 0-.704-.933c-.55-.46-1.166-.694-1.842-.7Zm9.078.117a2.734 2.734 0 0 0-2.878 1.828l-4.576 13.289a2.734 2.734 0 0 0 1.695 3.475l.12.04a2.734 2.734 0 0 0 3.475-1.694L23.85 6.307a2.734 2.734 0 0 0-1.695-3.476c-.233-.1-.506-.124-.716-.174ZM12.375 3.96a1.396 1.396 0 1 1 0 2.791 1.395 1.395 0 0 1 0-2.79zm8.809.07a1.402 1.402 0 1 1 0 2.803 1.402 1.402 0 0 1 0-2.803zM5.419 7.605a2.853 2.853 0 0 0-.468.052 2.683 2.683 0 0 0-1.337.627 2.62 2.62 0 0 0-.924 1.833 3.808 3.808 0 0 0 0 .648 2.52 2.52 0 0 0 .673 1.52c.221.238.465.454.732.648 3.043 2.21 6.08 4.43 9.108 6.664a.78.78 0 0 0 .158.089c.03-.043.032-.098.007-.167a17.409 17.409 0 0 0-.317-1.066 532.752 532.752 0 0 1-2.02-6.251 41.91 41.91 0 0 0-.497-1.477c-.967-.849-2.078-1.6-3.023-2.302A3.848 3.848 0 0 0 6.153 7.7a2.388 2.388 0 0 0-.734-.094Zm.02 1.424a1.398 1.398 0 1 1 0 2.796 1.398 1.398 0 0 1 0-2.796zm-2.458 6.792c-.733-.006-1.375.202-1.927.622a2.72 2.72 0 0 0-.95 1.45 2.78 2.78 0 0 0-.09 1.04 2.74 2.74 0 0 0 .695 1.583c.664.578 1.26.85 2 .945 1.42-.005 2.84-.012 4.262-.02h.418c2.277-.003 4.513-.002 6.706.003.148.005.28.003.392-.01.06-.005.091-.031.092-.077a10.656 10.656 0 0 0-.834-.653 488.746 488.746 0 0 1-6.57-4.815.236.236 0 0 0-.14-.047c-1.34-.003-2.691-.01-4.054-.02zm-.19 1.418a1.402 1.402 0 1 1 0 2.803 1.402 1.402 0 0 1 0-2.803zm13.874.002a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"},"python":{"t":"b","c":"#3776AB","d":"M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"},"html5":{"t":"b","c":"#E34F26","d":"M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"},"css":{"t":"b","c":"#663399","d":"M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63"},"javascript":{"t":"b","c":"#E8C600","d":"M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"},"github":{"t":"b","c":"#181717","d":"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"},"vercel":{"t":"b","c":"#000000","d":"m12 1.608 12 20.784H0Z"},"excel":{"t":"l","c":"#217346","d":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\"/><line x1=\"3\" x2=\"21\" y1=\"9\" y2=\"9\"/><line x1=\"3\" x2=\"21\" y1=\"15\" y2=\"15\"/><line x1=\"9\" x2=\"9\" y1=\"9\" y2=\"21\"/><line x1=\"15\" x2=\"15\" y1=\"9\" y2=\"21\"/>"},"powerbi":{"t":"l","c":"#C99A00","d":"<path d=\"M3 3v16a2 2 0 0 0 2 2h16\"/><path d=\"M18 17V9\"/><path d=\"M13 17V5\"/><path d=\"M8 17v-3\"/>"},"powerquery":{"t":"l","c":"#217346","d":"<polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"/>"},"qr":{"t":"l","c":"","d":"<rect width=\"5\" height=\"5\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"16\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/><path d=\"M21 16h-3a2 2 0 0 0-2 2v3\"/><path d=\"M21 21v.01\"/><path d=\"M12 7v3a2 2 0 0 1-2 2H7\"/><path d=\"M3 12h.01\"/><path d=\"M12 3h.01\"/><path d=\"M12 16v.01\"/><path d=\"M16 12h1\"/><path d=\"M21 12v.01\"/><path d=\"M12 21v-1\"/>"},"gantt":{"t":"l","c":"","d":"<path d=\"M10 6h8\"/><path d=\"M12 16h6\"/><path d=\"M3 3v16a2 2 0 0 0 2 2h16\"/><path d=\"M8 11h7\"/>"},"timer":{"t":"l","c":"","d":"<line x1=\"10\" x2=\"14\" y1=\"2\" y2=\"2\"/><line x1=\"12\" x2=\"15\" y1=\"14\" y2=\"11\"/><circle cx=\"12\" cy=\"14\" r=\"8\"/>"},"gauge":{"t":"l","c":"","d":"<path d=\"m12 14 4-4\"/><path d=\"M3.34 19a10 10 0 1 1 17.32 0\"/>"},"sparkles":{"t":"l","c":"","d":"<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/><path d=\"M4 17v2\"/><path d=\"M5 18H3\"/>"},"search":{"t":"l","c":"","d":"<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>"},"filecheck":{"t":"l","c":"","d":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"m9 15 2 2 4-4\"/>"},"calculator":{"t":"l","c":"","d":"<rect width=\"16\" height=\"20\" x=\"4\" y=\"2\" rx=\"2\"/><line x1=\"8\" x2=\"16\" y1=\"6\" y2=\"6\"/><line x1=\"16\" x2=\"16\" y1=\"14\" y2=\"18\"/><path d=\"M16 10h.01\"/><path d=\"M12 10h.01\"/><path d=\"M8 10h.01\"/><path d=\"M12 14h.01\"/><path d=\"M8 14h.01\"/><path d=\"M12 18h.01\"/><path d=\"M8 18h.01\"/>"},"workflow":{"t":"l","c":"","d":"<rect width=\"8\" height=\"8\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M7 11v4a2 2 0 0 0 2 2h4\"/><rect width=\"8\" height=\"8\" x=\"13\" y=\"13\" rx=\"2\"/>"}};

  const TOOL_ICON_RULES = [
    [/SAP/, 'sap'],
    [/Google Sheets/, 'googlesheets'],
    [/Google Forms/, 'googleforms'],
    [/Apps Script/, 'googleappsscript'],
    [/Excel|VBA/, 'excel'],
    [/Power Query/, 'powerquery'],
    [/Power BI/, 'powerbi'],
    [/Python|openpyxl/, 'python'],
    [/HTML/, 'html5'],
    [/CSS/, 'css'],
    [/JavaScript/, 'javascript'],
    [/GitHub/, 'github'],
    [/Vercel/, 'vercel'],
    [/QR/, 'qr'],
    [/Heijunka/, 'gantt'],
    [/SMED|Cycle Time/, 'timer'],
    [/OEE/, 'gauge'],
    [/5S|Gemba/, 'sparkles'],
    [/Whys|RCA/, 'search'],
    [/SOP/, 'filecheck'],
    [/Output Norms/, 'calculator'],
    [/DBR|CONWIP|POLCA/, 'workflow'],
    [/MPS|MRP/, 'gantt'],
    [/BOM|Routing/, 'workflow']
  ];

  // Each icon's geometry lives once in a hidden <symbol> sprite; chips reference it with <use>.
  let toolSpriteReady = false;

  function ensureToolSprite() {
    if (toolSpriteReady) return;
    toolSpriteReady = true;
    const symbols = Object.entries(TOOL_ICON_DATA)
      .map(([key, icon]) =>
        icon.t === 'b'
          ? `<symbol id="ti-${key}" viewBox="0 0 24 24"><path fill="${icon.c}" d="${icon.d}"/></symbol>`
          : `<symbol id="ti-${key}" viewBox="0 0 24 24" fill="none" stroke="${icon.c || 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon.d}</symbol>`
      )
      .join('');
    document.body.insertAdjacentHTML(
      'afterbegin',
      `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">${symbols}</svg>`
    );
  }

  function toolIconSvg(label) {
    const rule = TOOL_ICON_RULES.find(([re]) => re.test(label));
    const icon = rule && TOOL_ICON_DATA[rule[1]];
    if (!icon) return '';
    ensureToolSprite();
    return `<svg class="tool-ico ${icon.t === 'b' ? 'is-brand' : 'is-line'}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ti-${rule[1]}"/></svg>`;
  }

  function toolLabel(label) {
    return `${toolIconSvg(label)}<span>${escapeHtml(label)}</span>`;
  }

  // Experience bullets: tool/method icon as the bullet marker (re-run after each translation pass)
  function decorateExperiencePoints() {
    document.querySelectorAll('.experience-points li').forEach((li) => {
      if (li.querySelector('.tool-ico, .point-dot')) return;
      const svg = toolIconSvg(li.textContent.trim());
      li.insertAdjacentHTML('afterbegin', svg || '<span class="point-dot" aria-hidden="true"></span>');
    });
  }

  function decorateStaticToolChips() {
    document.querySelectorAll('.tool-chip').forEach((chip) => {
      if (chip.querySelector('.tool-ico')) return;
      const svg = toolIconSvg(chip.textContent.trim());
      if (svg) chip.insertAdjacentHTML('afterbegin', svg);
    });
  }

  /* ========================================================================
     5d. Project cover — window-framed thumbnail with an animated KPI chip
     ======================================================================== */
  const BLANK_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  function renderCover(project, opts) {
    const cv = project.cover;
    if (!cv) return '';
    const c = cv[currentLang];
    const k = cv.kpi;
    // Sources are attached by CoverLoader when the card nears the viewport, so cover images never
    // compete with first paint (native lazy-loading starts them ~1250px early and ignores the wipe mask).
    const img = (im, cls) => {
      const srcset = im.small
        ? ` data-srcset="${escapeHtml(im.small)} 640w, ${escapeHtml(im.src)} ${im.width}w" sizes="(max-width: 860px) calc(100vw - 80px), 520px"`
        : '';
      return `<img class="${cls}" src="${BLANK_PIXEL}" data-src="${escapeHtml(im.small || im.src)}"${srcset} alt="" width="${im.width}" height="${im.height}" decoding="async" />`;
    };

    const media =
      cv.kind === 'split'
        ? `<span class="cover-split">
             <span class="cover-half is-before">
               ${img(cv.before, 'cover-img')}
               <span class="cover-tag">${escapeHtml(t('galleryBefore'))}</span>
             </span>
             <span class="cover-half is-after">
               <span class="cover-mask">
                 <span class="cover-mask-inner">
                   ${img(cv.after, 'cover-img')}
                   <span class="cover-tag is-after">${escapeHtml(t('galleryAfter'))}</span>
                 </span>
               </span>
             </span>
           </span>`
        : img(cv, 'cover-img');

    const kpi = k
      ? `<span class="cover-kpi">
           <b>${countSpan(k.to, { decimals: k.decimals || 0, prefix: k.prefix || '', suffix: k.suffix || '', delay: 350, dur: 1000 })}</b>
           <span>${escapeHtml(k[currentLang])}</span>
         </span>`
      : '';
    const live = cv.live ? '<span class="cover-live"><i aria-hidden="true"></i>LIVE</span>' : '';
    const kpiText = k
      ? `${k.prefix || ''}${formatNumber(k.to, k.decimals || 0)}${k.suffix || ''} ${k[currentLang]}`
      : '';
    const label = [c.alt, kpiText, cv.live ? 'LIVE' : ''].filter(Boolean).join(' — ');
    const state = opts && opts.played ? ' is-on no-anim' : '';

    return `
      <figure class="project-cover${state}" data-motion>
        <figcaption class="cover-bar">
          <span class="cover-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="cover-label">${escapeHtml(c.label)}</span>
        </figcaption>
        <div class="cover-media" role="img" aria-label="${escapeHtml(label)}">
          ${media}${live}${kpi}
        </div>
      </figure>`;
  }

  /* Attach cover image sources shortly before a card scrolls into view */
  const CoverLoader = {
    io: null,

    load(cover) {
      cover.querySelectorAll('img[data-src]').forEach((img) => {
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
      });
    },

    observe(root) {
      const covers = (root || document).querySelectorAll('.project-cover');
      if (!('IntersectionObserver' in window)) {
        covers.forEach((c) => this.load(c));
        return;
      }
      if (this.io) {
        this.io.disconnect(); // covers from a previous render are gone
      } else {
        this.io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              this.load(entry.target);
              this.io.unobserve(entry.target);
            });
          },
          { rootMargin: '600px 0px' }
        );
      }
      covers.forEach((c) => {
        if (c.closest('.is-visible')) this.load(c); // already revealed (e.g. re-render after a language switch)
        else this.io.observe(c);
      });
    },

    loadAll() {
      document.querySelectorAll('.project-cover').forEach((c) => this.load(c));
    }
  };

  window.addEventListener('beforeprint', () => CoverLoader.loadAll());

  /* Pause decorative looping animations when off-screen or the tab is hidden */
  const LoopGate = {
    init() {
      const loops = Array.from(document.querySelectorAll('[data-loop]'));
      if (!loops.length) return;
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => entry.target.classList.toggle('is-paused', !entry.isIntersecting));
        });
        loops.forEach((el) => io.observe(el));
      }
      document.addEventListener('visibilitychange', () => {
        loops.forEach((el) => el.classList.toggle('is-tab-hidden', document.hidden));
      });
    }
  };

  /* ========================================================================
     6. Reading Progress, Glass Header & 2-Section ScrollSpy
     ======================================================================== */
  function requestScrollUpdate() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScroll);
  }

  function updateScroll() {
    scrollTicking = false;

    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const viewport = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - viewport;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;

    const spyLine = viewport * 0.36;
    let spy = 'overview';
    sections.forEach((sec) => {
      if (sec.getBoundingClientRect().top <= spyLine) spy = sec.id;
    });
    if (maxScroll > 0 && y >= maxScroll - 8) spy = 'projects';

    if (dom.progressBar) dom.progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    if (dom.header) dom.header.classList.toggle('is-scrolled', y > 8);
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
    const width = Math.max(14, link.offsetWidth - inset * 2);
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
     7. Renderers (Bilingual Static Text & 2x2 Featured Projects Grid)
     ======================================================================== */
  function applyCvState() {
    document.querySelectorAll('[data-cv-link]').forEach((link) => {
      if (ASSETS.cvAvailable) {
        link.setAttribute('href', ASSETS.cvPath);
        link.setAttribute('download', ASSETS.cvFileName);
      } else {
        const subject = encodeURIComponent(t('cvRequestSubject'));
        link.setAttribute('href', `mailto:${EMAIL_ADDRESS}?subject=${subject}`);
        link.removeAttribute('download');
      }
    });
  }

  function applyStaticTranslations() {
    const dict = I18N[currentLang];
    dom.html.setAttribute('lang', currentLang);
    document.title = dict.pageTitle;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = dict[el.getAttribute('data-i18n')];
      if (typeof value === 'string') el.textContent = value;
    });

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

  const GITHUB_SVG_XS =
    '<svg class="icon-xs brand-svg-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>';

  function renderProjects() {
    const grid = dom.projectsGrid;
    if (!grid) return;
    const revealed = revealClassFor(grid);

    grid.innerHTML = PROJECTS.map((project) => {
      const c = project[currentLang];
      const externalMarkup = project.repoUrl
        ? `<a
             href="${escapeHtml(project.repoUrl)}"
             target="_blank"
             rel="noopener noreferrer"
             class="project-external-link"
             data-stop-card
           >
             ${GITHUB_SVG_XS}
             <span>${escapeHtml(t('btnGithubDemo'))}</span>
             <i data-lucide="arrow-up-right" class="icon-xs"></i>
           </a>`
        : '';

      const demoMarkup = project.demoUrl
        ? `<a
             href="${escapeHtml(project.demoUrl)}"
             target="_blank"
             rel="noopener noreferrer"
             class="project-external-link is-demo"
             data-stop-card
           >
             <span>${escapeHtml(t('btnLiveDemo'))}</span>
             <i data-lucide="arrow-up-right" class="icon-xs"></i>
           </a>`
        : '';

      const mediaCount = galleryCount(project);
      const mediaMarkup = mediaCount
        ? `<span class="project-media-chip">
             <i data-lucide="images" class="icon-xs"></i>
             <span>${mediaCount} ${escapeHtml(t('cardMedia'))}</span>
           </span>`
        : '';

      const visualMarkup = renderCover(project, { played: !!revealed });

      return `
        <article class="project-card reveal-item${revealed}" data-project-id="${project.id}">
          ${visualMarkup}
          <div class="project-card-meta">
            <span class="project-org-tag">
              <i data-lucide="building-2" class="icon-xs"></i>
              <span>${escapeHtml(project.timeframe)} · ${escapeHtml(c.orgShort)}</span>
            </span>
            <span class="project-index">${escapeHtml(project.code)}</span>
          </div>

          <h3 class="project-title">
            <button type="button" class="project-open" aria-haspopup="dialog">${escapeHtml(c.title)}</button>
          </h3>

          <div class="project-outcome-badge">
            <i data-lucide="circle-check" class="icon-xs"></i>
            <span>${escapeHtml(c.highlightBadge)}</span>
          </div>

          <p class="project-summary">${escapeHtml(c.summary)}</p>

          <ul class="project-tags">
            ${project.tools.map((tool) => `<li class="tech-tag">${toolLabel(tool)}</li>`).join('')}
          </ul>

          <div class="project-card-footer">
            <span class="project-inspect-link" aria-hidden="true">
              <span>${escapeHtml(t('btnViewDetails'))}</span>
              <i data-lucide="arrow-up-right" class="icon-sm"></i>
            </span>
            <span class="project-card-actions">${mediaMarkup}${externalMarkup}${demoMarkup}</span>
          </div>
        </article>`;
    }).join('');
  }

  /* ========================================================================
     8. Accessible 4-Part Project Detail Modal
     ======================================================================== */
  function neighbour(step) {
    const idx = PROJECTS.findIndex((p) => p.id === activeProjectId);
    return PROJECTS[(idx + step + PROJECTS.length) % PROJECTS.length];
  }

  function galleryCount(project) {
    return (project.gallery || []).reduce((n, item) => n + (item.kind === 'pair' ? 2 : 1), 0);
  }

  function galleryLink(img, alt, label) {
    return `<a class="gallery-link" href="${escapeHtml(img.src)}" target="_blank" rel="noopener noreferrer"
              aria-label="${escapeHtml(`${t('modalGalleryOpen')}: ${label}`)}">
              <img src="${escapeHtml(img.src)}" alt="${escapeHtml(alt)}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async" />
            </a>`;
  }

  function renderGalleryItem(item) {
    const g = item[currentLang];
    if (item.kind === 'pair') {
      const before = t('galleryBefore');
      const after = t('galleryAfter');
      return `
        <figure class="gallery-item is-pair">
          <div class="ba-pair">
            <div class="ba-side is-before">
              ${galleryLink(item.before, `${before}: ${g.alt}`, `${before} — ${g.caption}`)}
              <span class="ba-badge" aria-hidden="true">${escapeHtml(before)}</span>
            </div>
            <div class="ba-side is-after">
              ${galleryLink(item.after, `${after}: ${g.alt}`, `${after} — ${g.caption}`)}
              <span class="ba-badge" aria-hidden="true">${escapeHtml(after)}</span>
            </div>
          </div>
          <figcaption>${escapeHtml(g.caption)}</figcaption>
        </figure>`;
    }
    return `
      <figure class="gallery-item${item.wide ? ' is-wide' : ''}">
        ${galleryLink(item, g.alt, g.caption)}
        <figcaption>${escapeHtml(g.caption)}</figcaption>
      </figure>`;
  }

  function renderModalMedia(project, animateViz) {
    if (project.visual) {
      dom.modalVizStage.innerHTML = renderViz(project, { large: true, played: !animateViz });
      dom.modalVizSource.textContent = t(VIZ_META[project.visual].source);
      dom.modalViz.hidden = false;
    } else {
      dom.modalVizStage.innerHTML = '';
      dom.modalViz.hidden = true;
    }

    if (project.gallery && project.gallery.length) {
      const note = project.galleryNote ? project.galleryNote[currentLang] : '';
      dom.modalGalleryNote.textContent = note;
      dom.modalGalleryNote.hidden = !note;
      dom.modalGalleryGrid.innerHTML = project.gallery.map(renderGalleryItem).join('');
      dom.modalGallery.hidden = false;
    } else {
      dom.modalGalleryGrid.innerHTML = '';
      dom.modalGalleryNote.textContent = '';
      dom.modalGallery.hidden = true;
    }
  }

  function playModalViz(delay) {
    const viz = dom.modalVizStage.querySelector('.viz:not(.is-on)');
    if (!viz) return;
    if (REDUCED_MOTION) Viz.play(viz, { instant: true });
    else window.setTimeout(() => Viz.play(viz), delay);
  }

  function populateModal(projectId, options) {
    const project = findProject(projectId);
    if (!project) return;
    const animateViz = !!(options && options.animateViz);
    activeProjectId = project.id;
    const c = project[currentLang];
    const titles = t('modalSectionTitles');
    const index = PROJECTS.indexOf(project);

    dom.modalCode.textContent = project.code;
    dom.modalOrg.innerHTML = `<i data-lucide="building-2" class="icon-xs"></i><span>${escapeHtml(c.orgShort)}</span>`;
    dom.modalCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}`;
    dom.modalTimeframe.textContent = project.timeframe;
    dom.modalTitle.textContent = c.title;
    dom.modalOutcomeText.textContent = c.highlightBadge;

    dom.modalExternalLink.hidden = !project.repoUrl;
    dom.modalExternalLink.setAttribute('href', project.repoUrl || '#');
    dom.modalExternalLabel.textContent = `${t('btnGithubDemo')} · ${project.repoText || 'GitHub'}`;
    dom.modalDemoLink.hidden = !project.demoUrl;
    dom.modalDemoLink.setAttribute('href', project.demoUrl || '#');
    dom.modalDemoLabel.textContent = t('btnLiveDemo');
    dom.modalExternalRow.hidden = !(project.repoUrl || project.demoUrl);

    dom.modalSections.innerHTML = `
      <section class="case-part" aria-labelledby="case-part-context">
        <div class="case-part-head">
          <span class="case-part-num">01.</span>
          <h3 class="case-part-title" id="case-part-context">${escapeHtml(titles.context)}</h3>
          <i data-lucide="clipboard-list" class="icon-sm"></i>
        </div>
        <p class="case-part-body"><strong>${escapeHtml(t('modalContextLabel'))}</strong> ${escapeHtml(c.timeframeContext)}</p>
        <p class="case-part-body case-part-sub"><strong>${escapeHtml(t('modalObjectiveLabel'))}</strong> ${escapeHtml(c.objective)}</p>
      </section>

      <section class="case-part" aria-labelledby="case-part-tools">
        <div class="case-part-head">
          <span class="case-part-num">02.</span>
          <h3 class="case-part-title" id="case-part-tools">${escapeHtml(titles.tools)}</h3>
          <i data-lucide="wrench" class="icon-sm"></i>
        </div>
        <ul class="case-part-chips">
          ${project.tools.map((item) => `<li>${toolLabel(item)}</li>`).join('')}
        </ul>
      </section>

      <section class="case-part" aria-labelledby="case-part-deliverables">
        <div class="case-part-head">
          <span class="case-part-num">03.</span>
          <h3 class="case-part-title" id="case-part-deliverables">${escapeHtml(titles.deliverables)}</h3>
          <i data-lucide="package-check" class="icon-sm"></i>
        </div>
        <p class="case-part-body">${escapeHtml(c.deliverables)}</p>
      </section>

      <section class="case-part" aria-labelledby="case-part-results">
        <div class="case-part-head">
          <span class="case-part-num">04.</span>
          <h3 class="case-part-title" id="case-part-results">${escapeHtml(titles.results)}</h3>
          <i data-lucide="circle-check" class="icon-sm"></i>
        </div>
        <p class="case-part-body">${escapeHtml(c.results)}</p>
      </section>
    `;

    renderModalMedia(project, animateViz);

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

    populateModal(projectId, { animateViz: true });
    dom.modalBody.scrollTop = 0;
    dom.modalRoot.hidden = false;
    document.body.classList.add('modal-open');
    setBackgroundInert(true);

    // Grow the dialog out of the card that was clicked (transform-origin only — no layout cost)
    const card = !alreadyOpen && trigger && trigger.closest ? trigger.closest('.project-card') : null;
    if (card) {
      const from = card.getBoundingClientRect();
      const to = dom.modalDialog.getBoundingClientRect();
      const ox = from.left + from.width / 2 - to.left;
      const oy = from.top + from.height / 2 - to.top;
      dom.modalDialog.style.transformOrigin = `${Math.round(ox)}px ${Math.round(oy)}px`;
    } else if (!alreadyOpen) {
      dom.modalDialog.style.transformOrigin = '';
    }

    void dom.modalRoot.offsetWidth;
    dom.modalRoot.classList.add('is-open');
    dom.modalDialog.focus({ preventScroll: true });
    playModalViz(alreadyOpen ? 80 : 300);
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
        suppressVizReplay = true; // focus returning from the modal should not replay the chart
        lastFocusedElement.focus({ preventScroll: true });
        suppressVizReplay = false;
      }
    };

    if (REDUCED_MOTION) finish();
    else modalCloseTimer = window.setTimeout(finish, 280);
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
    await wait(140);

    populateModal(target.id, { animateViz: true });
    dom.modalBody.scrollTop = 0;
    content.classList.remove(`is-leaving-${dir}`);
    content.classList.add(`is-entering-${dir}`);
    void content.offsetWidth;
    content.classList.remove(`is-entering-${dir}`);
    playModalViz(160);
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
     9. Language Switching (VI <-> EN)
     ======================================================================== */
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
        /* ignore blocked storage */
      }
    }

    applyCvState();
    applyStaticTranslations();
    decorateExperiencePoints();
    renderProjects();
    CoverLoader.observe(dom.projectsGrid);

    if (activeProjectId && !dom.modalRoot.hidden) populateModal(activeProjectId);
    if (toastKey) dom.toastText.textContent = t(toastKey);
    if (!opts.initial) spinGlobe();

    Icons.refresh();
    Reveal.observe();

    requestAnimationFrame(() => {
      positionNavIndicator(true);
      requestScrollUpdate();
    });
  }

  /* ========================================================================
     10. Clipboard Copy (Phone/Zalo & Email) + Toast
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
    }, 360);
  }

  async function writeClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {
        /* fallback below */
      }
    }

    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    area.style.pointerEvents = 'none';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (_) {
      ok = false;
    }
    area.remove();
    return ok;
  }

  function setPhoneCopiedState(copied) {
    dom.copyPhoneTriggers.forEach((btn) => {
      btn.classList.toggle('is-copied', copied);
      const label = btn.querySelector('.copy-phone-label');
      if (!label) return;
      label.setAttribute('data-i18n', copied ? 'btnCopied' : 'btnCopyPhone');
      label.textContent = t(copied ? 'btnCopied' : 'btnCopyPhone');
    });
  }

  function setEmailCopiedState(copied) {
    dom.copyEmailTriggers.forEach((btn) => {
      btn.classList.toggle('is-copied', copied);
    });
  }

  async function copyPhone() {
    const copied = await writeClipboard(PHONE_NUMBER);

    window.clearTimeout(phoneResetTimer);
    setPhoneCopiedState(copied);
    showToast(copied ? 'toastPhoneCopied' : 'toastPhoneCopyFailed', !copied);

    phoneResetTimer = window.setTimeout(
      () => {
        setPhoneCopiedState(false);
        hideToast();
      },
      copied ? 2400 : 4800
    );
  }

  async function copyEmail() {
    const copied = await writeClipboard(EMAIL_ADDRESS);

    window.clearTimeout(emailResetTimer);
    setEmailCopiedState(copied);
    showToast(copied ? 'toastEmailCopied' : 'toastEmailCopyFailed', !copied);

    emailResetTimer = window.setTimeout(
      () => {
        setEmailCopiedState(false);
        hideToast();
      },
      copied ? 2400 : 4800
    );
  }

  /* ========================================================================
     11. Mobile Drawer
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
      REDUCED_MOTION ? 0 : 260
    );
    if (returnFocus) dom.mobileMenuBtn.focus();
  }

  /* ========================================================================
     12. Event Binding
     ======================================================================== */
  function bindEvents() {
    dom.langBtns.forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener(
      'resize',
      () => {
        requestAnimationFrame(() => {
          positionNavIndicator(true);
          updateScroll();
          if (window.innerWidth > 1024) closeDrawer(false);
        });
      },
      { passive: true }
    );

    dom.projectsGrid.addEventListener('click', (event) => {
      if (event.target.closest('[data-stop-card]')) return;
      const card = event.target.closest('.project-card');
      if (card) openModal(card.dataset.projectId, card.querySelector('.project-open'));
    });

    // Replay a card's mini-chart when the pointer (or keyboard focus) enters it
    const replayCardViz = (event) => {
      const card = event.target.closest('.project-card');
      if (suppressVizReplay || !card || (event.relatedTarget && card.contains(event.relatedTarget))) return;
      Viz.replay(card.querySelector('[data-motion]'));
    };
    if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      dom.projectsGrid.addEventListener('mouseover', replayCardViz);
    }
    dom.projectsGrid.addEventListener('focusin', replayCardViz);

    document.addEventListener('click', (event) => {
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
          !event.metaKey
        ) {
          event.preventDefault();
          cycleModal(event.key === 'ArrowRight' ? 1 : -1);
        }
        return;
      }

      if (event.key === 'Escape' && isDrawerOpen()) closeDrawer(true);
    });

    dom.copyEmailTriggers.forEach((btn) => btn.addEventListener('click', copyEmail));
    dom.copyPhoneTriggers.forEach((btn) => btn.addEventListener('click', copyPhone));

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
     13. Boot & Avatar SVG Fallback
     ======================================================================== */
  function init() {
    booted = true;

    let savedLang = 'vi';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'vi' || stored === 'en') savedLang = stored;
    } catch (_) {
      savedLang = 'vi';
    }

    document.querySelectorAll('.tool-chip').forEach((chip, i) => chip.style.setProperty('--i', String(i)));
    decorateStaticToolChips();

    Reveal.init();
    bindEvents();
    setLanguage(savedLang, { persist: false, initial: true });
    Icons.start();
    LoopGate.init();
    updateScroll();
  }

  window.handleAvatarFallback = function (imgElement) {
    if (!imgElement) return;
    imgElement.onerror = null;

    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#EFF6FF"/><rect x="2" y="2" width="60" height="60" rx="30" fill="none" stroke="#2563EB" stroke-width="3"/><text x="32" y="39" text-anchor="middle" font-family="Inter,system-ui,-apple-system,sans-serif" font-size="20" font-weight="800" letter-spacing="-0.5" fill="#2563EB">PAT</text></svg>';

    imgElement.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    imgElement.classList.add('is-avatar-fallback');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
