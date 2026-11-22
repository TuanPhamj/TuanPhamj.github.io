/**
 * Phạm Anh Tuấn — Production Planning, Lean & Operations Analytics Portfolio
 * Bilingual engine (VI default | EN), Lucide icon layer with inline fallback,
 * scroll reveal, reading progress + ScrollSpy, clipboard copy with toast,
 * and accessible 4-part project detail modal.
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

  const REDUCED_MOTION =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    'clipboard-list': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>'
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
        'Thực tập sinh Kế hoạch &amp; Điều độ sản xuất (KHSX) và Tổ trưởng sản xuất tại Xưởng Bút Lông 2 đầu (DTM – 217 mã màu); vận hành <strong>SAP Logon</strong> (MM/PP, MB52, COGI), lập lịch MPS/MRP, đồng bộ BOM/Routing, cải tiến chuyển đổi nhanh SMED và <strong>đi Gemba xưởng, duy trì tiêu chuẩn 5S hằng ngày</strong>.',
      exp2Org: 'Nhà máy Nhựa Tái chế Duy Tân – DUYTAN Recycling',
      exp2Desc:
        'Thực tập sinh Bộ phận Sản xuất; đo lường hiệu suất thiết bị toàn phần (OEE), phân tích thời gian chu kỳ (Cycle Time), truy tìm nguyên nhân gốc rễ 5 Whys và kiểm tra 5S cho cụm máy tạo hạt nhựa tái chế HDPE.',

      btnExploreProjects: 'Xem Dự án',
      contactBarAria: 'Thông tin liên hệ trực tiếp',
      btnCopyEmailAria: 'Sao chép email phamanhtuan802@gmail.com',
      btnCopyEmailTitle: 'Sao chép Email',
      btnCopyPhone: 'Sao chép',
      btnCopyPhoneAria: 'Sao chép số điện thoại / Zalo +84972693749',
      btnCopyPhoneTitle: 'Sao chép số Điện thoại / Zalo',
      btnCopied: 'Đã sao chép!',

      credCardTitle: 'HỌC VẤN, CHỨNG CHỈ & LÃNH ĐẠO',
      eduLabel: 'Học vấn',
      eduValue:
        '<strong>Đại học Bách khoa – ĐHQG TP.HCM (HCMUT)</strong> — Cử nhân chuyên ngành <strong>Quản trị Kinh doanh</strong> (2022–2026).',
      certLabel: 'Chứng chỉ',
      leadLabel: 'Hoạt động Lãnh đạo',
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
      btnGithubDemo: 'GitHub / Demo',

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
        'Production Planning &amp; Scheduling Intern and Production Team Leader at the Dual Tip Marker (DTM – 217 color SKUs) workshop; operated <strong>SAP Logon</strong> (MM/PP, MB52, COGI), managed MPS/MRP scheduling, synchronized BOM/Routing, drove SMED changeover improvements, and <strong>conducted daily shop-floor Gemba walks &amp; 5S maintenance</strong>.',
      exp2Org: 'Duy Tan Recycling Plant – DUYTAN Recycling',
      exp2Desc:
        'Production Department Intern; measured Overall Equipment Effectiveness (OEE), analyzed Cycle Time, performed 5 Whys root-cause analysis, and conducted 5S audits on HDPE pelletizing lines.',

      btnExploreProjects: 'Explore Projects',
      contactBarAria: 'Direct contact details',
      btnCopyEmailAria: 'Copy email phamanhtuan802@gmail.com',
      btnCopyEmailTitle: 'Copy Email',
      btnCopyPhone: 'Copy',
      btnCopyPhoneAria: 'Copy phone / Zalo number +84972693749',
      btnCopyPhoneTitle: 'Copy Phone / Zalo Number',
      btnCopied: 'Copied!',

      credCardTitle: 'EDUCATION, CERTIFICATION & LEADERSHIP',
      eduLabel: 'Education',
      eduValue:
        "<strong>Ho Chi Minh City University of Technology – VNU-HCM (HCMUT)</strong> — Bachelor's in <strong>Business Administration</strong> (2022–2026).",
      certLabel: 'Certification',
      leadLabel: 'Leadership',
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
      btnGithubDemo: 'GitHub / Demo',

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
      repoUrl: 'https://github.com/TuanPhamJ/Production_Scheduler',
      repoText: 'TuanPhamJ/Production_Scheduler',
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
      tools: [
        'Google Forms',
        'Google Sheets (Dynamic Arrays, Apps Script)',
        'Microsoft Excel (VBA Macros, openpyxl)',
        'QR Code Tracking'
      ],
      vi: {
        orgShort: 'Tập đoàn Thiên Long · Xưởng Bút Lông',
        title: 'Hệ thống Theo dõi Năng suất Đóng gói qua QR & Dashboard OEE Dark-Mode',
        highlightBadge: 'Tự động hóa 100% luồng QR → Sheets → Dashboard OEE thời gian thực',
        summary:
          'Loại bỏ sổ giấy và tổng hợp tay cuối ca bằng quy trình quét mã QR nhập liệu liên kết Google Sheets, Excel VBA và Dashboard OEE Dark-Mode theo dõi sản lượng theo Set.',
        timeframeContext:
          '07/2026 & 10/2026 – 11/2026 | Triển khai phục vụ quản lý vận hành tại Xưởng Bút Lông, Tập đoàn Thiên Long.',
        objective:
          'Loại bỏ khâu ghi chép giấy và tổng hợp tay cuối ca; theo dõi sản lượng thực tế theo Set đóng gói và cập nhật thời gian dừng máy (TGDM), chỉ số OEE trực quan.',
        deliverables:
          'Hệ thống quét mã QR nhập liệu sản lượng liên kết Google Sheets (QR OEE Xưởng Bút Lông, NHẬP OEE Xưởng Bút Lông); hệ thống tổng hợp và Dashboard OEE giao diện Dark-Mode (TỔNG TGDM + OEE - BL 2026).',
        results:
          'Tự động hóa hoàn toàn luồng dữ liệu từ chuyền đóng gói lên dashboard quản trị, giúp theo dõi sản lượng theo Set và chỉ số OEE theo thời gian thực.'
      },
      en: {
        orgShort: 'Thien Long Group · Marker Workshop',
        title: 'QR-Based Packaging Productivity Tracking System & Dark-Mode OEE Dashboard',
        highlightBadge: '100% Automated QR → Sheets → Real-Time Dark-Mode OEE Dashboard',
        summary:
          'Eliminated paper logbooks and manual shift consolidation via QR-code production entry linked to Google Sheets, Excel VBA/openpyxl, and a Dark-Mode OEE Dashboard.',
        timeframeContext:
          '07/2026 & 10/2026 – 11/2026 | Deployed for shop-floor operations management at the Marker Workshop, Thien Long Group.',
        objective:
          'Eliminate paper logbooks and manual end-of-shift consolidation; track real-time output by packaging set alongside machine downtime and OEE metrics.',
        deliverables:
          'QR-code production entry workflow linked to Google Sheets (QR OEE Xưởng Bút Lông, NHẬP OEE Xưởng Bút Lông); automated consolidation engine and Dark-Mode OEE Dashboard (TỔNG TGDM + OEE - BL 2026).',
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
    modalSections: $('modal-sections-grid'),
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
      window.setTimeout(() => {
        el.classList.add('reveal-done');
        el.style.removeProperty('--reveal-delay');
      }, delay + 540);
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

  function revealClassFor(container) {
    return container && container.querySelector('.reveal-item.is-visible') ? ' is-visible reveal-done' : '';
  }

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

      return `
        <article class="project-card reveal-item${revealed}" data-project-id="${project.id}">
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
            ${project.tools.map((tool) => `<li class="tech-tag">${escapeHtml(tool)}</li>`).join('')}
          </ul>

          <div class="project-card-footer">
            <span class="project-inspect-link" aria-hidden="true">
              <span>${escapeHtml(t('btnViewDetails'))}</span>
              <i data-lucide="arrow-up-right" class="icon-sm"></i>
            </span>
            ${externalMarkup}
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

  function populateModal(projectId) {
    const project = findProject(projectId);
    if (!project) return;
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

    if (project.repoUrl) {
      dom.modalExternalLink.setAttribute('href', project.repoUrl);
      dom.modalExternalLabel.textContent = `${t('btnGithubDemo')} · ${project.repoText || 'GitHub'}`;
      dom.modalExternalRow.hidden = false;
    } else {
      dom.modalExternalLink.setAttribute('href', '#');
      dom.modalExternalRow.hidden = true;
    }

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
          ${project.tools.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
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

    void dom.modalRoot.offsetWidth;
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
    renderProjects();

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

    Reveal.init();
    bindEvents();
    setLanguage(savedLang, { persist: false, initial: true });
    Icons.start();
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
