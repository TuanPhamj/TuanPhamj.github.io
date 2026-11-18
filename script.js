/**
 * Phạm Anh Tuấn (Tuan Pham) — Portfolio Interactive Logic, Bilingual Engine,
 * Lucide Vector Icon System, Scroll Progress / ScrollSpy & IntersectionObserver
 * Clean Engineering Light Blue Theme
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'tuanpham_portfolio_lang';
  const EMAIL_ADDRESS = 'phamanhtuan802@gmail.com';

  /* ========================================================================
     0. Built-in Lucide Vector SVG Paths (Fallback if CDN is offline/blocked)
     ======================================================================== */
  const LUCIDE_FALLBACK_PATHS = {
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'folder-kanban':
      '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/>',
    cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
    briefcase:
      '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    globe:
      '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    'file-down':
      '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    palette:
      '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
    layers:
      '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    'refresh-cw':
      '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
    database:
      '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    'check-circle-2': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    settings:
      '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    'bar-chart-3': '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    'building-2':
      '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    'graduation-cap':
      '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    'map-pin':
      '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'shield-check':
      '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'
  };

  function refreshLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
      return;
    }

    // Fallback SVG renderer if CDN script has not yet initialized
    document.querySelectorAll('i[data-lucide]').forEach((el) => {
      const iconName = el.getAttribute('data-lucide');
      const innerPaths = LUCIDE_FALLBACK_PATHS[iconName];
      if (!innerPaths) return;

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.setAttribute('data-lucide', iconName);
      svg.setAttribute('aria-hidden', 'true');

      const existingClass = el.getAttribute('class') || '';
      svg.setAttribute('class', `lucide lucide-${iconName} ${existingClass}`.trim());
      svg.innerHTML = innerPaths;
      el.replaceWith(svg);
    });
  }

  window.refreshLucideIcons = refreshLucideIcons;

  /* ========================================================================
     1. Bilingual Translation Dictionary (EN <-> VI)
     ======================================================================== */
  const I18N = {
    en: {
      pageTitle: 'Phạm Anh Tuấn (Tuan Pham) — Production Planning, Lean & Data Analytics Portfolio',
      skipToContent: 'Skip to main content',
      brandSub: 'IE · Planning · BI',
      navAbout: 'Overview',
      navProjects: 'Case Studies',
      navSkills: 'Skills Matrix',
      navTimeline: 'Experience',
      navContact: 'Contact',
      navCv: 'Download CV',

      heroEyebrow: 'PRODUCTION PLANNING · LEAN SYSTEMS · DATA ANALYTICS',
      heroRole: 'Final-year student (Production Planning, Lean & Data Analytics)',
      heroEducation: 'Ho Chi Minh City University of Technology – VNU-HCM (HCMUT, 2022–2026)',
      heroSummary:
        'Eliminating shop-floor bottlenecks and manual planning delays through 3D Discrete-Event Simulation, Heijunka leveling, and automated WIP/BOM data pipelines.',
      focusTag1: 'Shop-Floor Lean & OEE',
      focusTag2: '3D FlexSim & Heijunka Scheduling',
      focusTag3: 'Python / SQL / VBA Automation',
      btnViewProjects: 'Explore Case Studies',
      btnDownloadCv: 'Download CV',
      btnCopyEmail: 'Copy Email',
      btnCopied: 'Copied!',
      toolingLabel: 'Core Stack:',

      dossierHeader: 'OPERATIONS SNAPSHOT // KPI',
      dossierStatus: 'OPEN TO WORK · 2026',
      metric1Label: 'Color SKUs Sequenced',
      metric1Sub: 'Heijunka Art Marker Line',
      metric2Label: 'Line Balancing Scope',
      metric2Sub: 'FlexSim 3D & JS DES',
      metric3Label: 'Automated BOM Sync',
      metric3Sub: 'Real-Time WIP & Alerts',
      metric4Label: 'Shop-Floor Auditing',
      metric4Sub: 'Time-Study & 5 Whys RCA',
      metaLocationKey: 'Region',
      metaEmailKey: 'Direct',

      aboutEyebrow: '01 // ENGINEERING APPROACH',
      aboutTitle: 'Engineering Operations with a Quantitative Mindset',
      aboutSubhead: 'Connecting Shop-Floor Industrial Engineering to Automated Analytics',
      aboutPara1:
        'As a final-year student at Ho Chi Minh City University of Technology (HCMUT, 2022–2026) with manufacturing internships at Thien Long Group (Long Thanh Plant) and Duy Tan Recycling, I focus on transforming messy factory records and constrained production lines into predictable, measurable operations.',
      aboutPara2:
        'Whether balancing a 4-stage marker assembly line across 217 color SKUs in FlexSim 3D, automating ink-to-unit BOM explosion across multi-stage WIP buffers, or isolating unplanned downtime with Pareto & 5 Whys RCA, every system I build is grounded in verifiable cycle times and zero-bottleneck flow logic.',
      step1Title: 'Measure & Standardize',
      step1Desc:
        'Stopwatch time-studies, OEE loss decomposition, 5S workstation audits, and structured 5 Whys root-cause diagnostics on the shop floor.',
      step2Title: 'Model & Simulate',
      step2Desc:
        '3D Discrete-Event Simulation in FlexSim and custom JavaScript DES engines to stress-test Heijunka schedules and inter-stage buffers.',
      step3Title: 'Automate & Control',
      step3Desc:
        'End-to-end BOM explosion, SQL/Power Query ETL, Apps Script WIP tracking, and dynamic shortage alerting for planners.',

      projectsEyebrow: '02 // VERIFIED CASE STUDIES',
      projectsTitle: 'Industrial & Analytics Case Studies',
      projectsSubtitle:
        'Filter by engineering domain and select any card to inspect the Executive Takeaway, 4-part system architecture, and NDA-sanitized technical blueprint.',
      filterAll: 'All',
      filterSimulation: 'Simulation & Scheduling',
      filterAutomation: 'Data & BI Automation',
      filterLean: 'Lean & OEE',
      inspectAction: 'Inspect Case',

      skillsEyebrow: '03 // CAPABILITIES MATRIX',
      skillsTitle: 'Technical & Operational Skillset',
      skillsSubtitle:
        'Three integrated pillars uniting Industrial Engineering, Simulation Modeling, and Production Data Automation.',

      timelineEyebrow: '04 // CAREER & EDUCATION TIMELINE',
      timelineTitle: 'Industrial Experience & Academic Track',
      timelineSubtitle:
        "Hands-on plant operations, student leadership, and quantitative management education in Vietnam's southern industrial hub.",

      contactEyebrow: '05 // CONNECT & COLLABORATE',
      contactTitle: 'Open to Production Planning, IE & Operations Analytics Opportunities',
      contactDesc:
        'Available across Ho Chi Minh City, Dong Nai, and Binh Duong industrial zones. Reach out directly via email or phone, or download my full curriculum vitae.',
      btnSendEmail: 'Send Email',
      contactEmailLabel: 'Email Address',
      contactPhoneLabel: 'Phone / Zalo',
      contactLocationLabel: 'Preferred Work Region',
      contactLocationValue: 'Ho Chi Minh City / Dong Nai / Binh Duong',
      contactEduLabel: 'University',

      footerCopy: '© 2026 Phạm Anh Tuấn (Tuan Pham). Static Portfolio ready for GitHub Pages.',
      backToTop: 'Back to top ↑',

      ndaLabel: 'Sanitized Mock Data – NDA Compliant',
      execBannerTitle: 'Executive Summary // Key Engineering Takeaway',
      modalPrev: 'Prev Case Study',
      modalNext: 'Next Case Study',
      toastCopied: 'Copied phamanhtuan802@gmail.com to clipboard',
      modalSectionTitles: {
        problem: '01 // Bottleneck & Problem Statement',
        methodology: '02 // IE Methodology & Tech Stack',
        architecture: '03 // System Architecture & Logic',
        outcomes: '04 // Verified Outcomes'
      }
    },

    vi: {
      pageTitle: 'Phạm Anh Tuấn (Tuan Pham) — Hồ sơ Hoạch định Sản xuất, Lean & Phân tích Dữ liệu',
      skipToContent: 'Chuyển đến nội dung chính',
      brandSub: 'IE · Hoạch định · BI',
      navAbout: 'Tổng quan',
      navProjects: 'Dự án',
      navSkills: 'Kỹ năng',
      navTimeline: 'Kinh nghiệm',
      navContact: 'Liên hệ',
      navCv: 'Tải CV',

      heroEyebrow: 'HOẠCH ĐỊNH SẢN XUẤT · HỆ THỐNG LEAN · PHÂN TÍCH DỮ LIỆU',
      heroRole: 'Sinh viên năm cuối (Hoạch định Sản xuất, Lean & Phân tích Dữ liệu)',
      heroEducation: 'Trường Đại học Bách khoa – ĐHQG TP.HCM (HCMUT, 2022–2026)',
      heroSummary:
        'Giải quyết triệt để điểm nghẽn chuyền sản xuất và độ trễ lập kế hoạch thông qua Mô phỏng 3D (DES), điều độ Heijunka và tự động hóa dữ liệu WIP/BOM.',
      focusTag1: 'Lean Hiện trường & OEE',
      focusTag2: 'Mô phỏng 3D FlexSim & Điều độ Heijunka',
      focusTag3: 'Tự động hóa Python / SQL / VBA',
      btnViewProjects: 'Khám phá Dự án',
      btnDownloadCv: 'Tải CV',
      btnCopyEmail: 'Sao chép Email',
      btnCopied: 'Đã sao chép!',
      toolingLabel: 'Công cụ chính:',

      dossierHeader: 'CHỈ SỐ VẬN HÀNH // KPI',
      dossierStatus: 'SẴN SÀNG NHẬN VIỆC · 2026',
      metric1Label: 'Mã màu được điều độ',
      metric1Sub: 'Dây chuyền Art Marker Heijunka',
      metric2Label: 'Công đoạn cân bằng chuyền',
      metric2Sub: 'FlexSim 3D & JS DES',
      metric3Label: 'Đồng bộ định mức BOM',
      metric3Sub: 'Theo dõi WIP & Cảnh báo',
      metric4Label: 'Kiểm soát hiện trường',
      metric4Sub: 'Time-Study & 5 Whys RCA',
      metaLocationKey: 'Khu vực',
      metaEmailKey: 'Email',

      aboutEyebrow: '01 // PHƯƠNG PHÁP KỸ THUẬT',
      aboutTitle: 'Tư duy Định lượng trong Vận hành & Kỹ thuật Công nghiệp',
      aboutSubhead: 'Kết nối Kỹ thuật Hiện trường với Tự động hóa Dữ liệu Sản xuất',
      aboutPara1:
        'Là sinh viên năm cuối tại Trường Đại học Bách khoa – ĐHQG TP.HCM (HCMUT, 2022–2026) với kinh nghiệm thực tập thực tế tại Tập đoàn Thiên Long (Nhà máy Long Thành) và Duy Tân Recycling, tôi tập trung chuyển hóa dữ liệu rời rạc tại xưởng thành quy trình vận hành ổn định, đo lường được.',
      aboutPara2:
        'Từ việc cân bằng dây chuyền lắp ráp 4 công đoạn cho 217 mã màu trên FlexSim 3D, tự động hóa bóc tách định mức mực sang sản phẩm qua tồn kho đệm WIP, đến truy tìm nguyên nhân dừng máy bằng Pareto & 5 Whys RCA — mọi giải pháp đều dựa trên dữ liệu thời gian chu kỳ kiểm chứng.',
      step1Title: 'Đo lường & Chuẩn hóa',
      step1Desc:
        'Bấm giờ Time-Study, phân rã tổn thất OEE, kiểm tra 5S tại trạm và chẩn đoán nguyên nhân gốc rễ 5 Whys trên chuyền sản xuất.',
      step2Title: 'Mô hình hóa & Mô phỏng',
      step2Desc:
        'Xây dựng mô hình Mô phỏng Sự kiện Rời rạc 3D trên FlexSim và JS DES Engine để kiểm thử lịch Heijunka và tồn kho đệm liên trạm.',
      step3Title: 'Tự động hóa & Kiểm soát',
      step3Desc:
        'Tự động bóc tách BOM, xử lý dữ liệu SQL/Power Query, theo dõi WIP qua Apps Script và phát cảnh báo thiếu hụt động.',

      projectsEyebrow: '02 // DỰ ÁN TIÊU BIỂU',
      projectsTitle: 'Các Dự án Cốt lõi tại Nhà máy & Phân tích Dữ liệu',
      projectsSubtitle:
        'Lọc theo lĩnh vực chuyên môn và nhấp vào từng thẻ để xem Tóm tắt kết quả cốt lõi, kiến trúc hệ thống 4 phần cùng sơ đồ kỹ thuật chuẩn NDA.',
      filterAll: 'Tất cả',
      filterSimulation: 'Mô phỏng & Điều độ',
      filterAutomation: 'Tự động hóa Dữ liệu & BI',
      filterLean: 'Lean & OEE',
      inspectAction: 'Xem Chi tiết',

      skillsEyebrow: '03 // MA TRẬN NĂNG LỰC',
      skillsTitle: 'Năng lực Kỹ thuật & Vận hành 3 Trụ cột',
      skillsSubtitle:
        'Sự kết hợp đồng bộ giữa Kỹ thuật Công nghiệp (IE/Lean), Mô phỏng Điều độ và Tự động hóa Dữ liệu.',

      timelineEyebrow: '04 // KINH NGHIỆM & HỌC VẤN',
      timelineTitle: 'Quá trình Thực tập Doanh nghiệp & Đào tạo',
      timelineSubtitle:
        'Kinh nghiệm thực chiến tại nhà máy sản xuất lớn, vai trò điều phối câu lạc bộ và nền tảng quản trị định lượng tại HCMUT.',

      contactEyebrow: '05 // KẾT NỐI & HỢP TÁC',
      contactTitle: 'Sẵn sàng cho vị trí Production Planning, IE & Operations Analytics',
      contactDesc:
        'Sẵn sàng làm việc tại khu vực TP.HCM, Đồng Nai và Bình Dương. Vui lòng liên hệ trực tiếp qua email, điện thoại hoặc tải CV đầy đủ.',
      btnSendEmail: 'Gửi Email',
      contactEmailLabel: 'Địa chỉ Email',
      contactPhoneLabel: 'Điện thoại / Zalo',
      contactLocationLabel: 'Khu vực làm việc',
      contactLocationValue: 'TP. Hồ Chí Minh / Đồng Nai / Bình Dương',
      contactEduLabel: 'Trường Đại học',

      footerCopy: '© 2026 Phạm Anh Tuấn (Tuan Pham). Giao diện Portfolio tĩnh chuẩn GitHub Pages.',
      backToTop: 'Lên đầu trang ↑',

      ndaLabel: 'Dữ liệu Giả lập Đã Ẩn danh – Tuân thủ NDA',
      execBannerTitle: 'Tóm tắt kết quả cốt lõi // Giá trị Kỹ thuật',
      modalPrev: 'Dự án trước',
      modalNext: 'Dự án tiếp theo',
      toastCopied: 'Đã sao chép phamanhtuan802@gmail.com vào bộ nhớ tạm',
      modalSectionTitles: {
        problem: '01 // Điểm nghẽn & Bài toán Thực tế',
        methodology: '02 // Phương pháp IE & Công nghệ Áp dụng',
        architecture: '03 // Kiến trúc Hệ thống & Logic Vận hành',
        outcomes: '04 // Kết quả Kiểm chứng'
      }
    }
  };

  /* ========================================================================
     2. Three Core Projects Data (EN & VI) with Scannable Bullets & Executive Summary
     ======================================================================== */
  const PROJECTS = [
    {
      id: 'project-1',
      code: 'PRJ-01 // HEIJUNKA-DES',
      categoryKey: 'simulation',
      domainIcon: 'cpu',
      imageSrc: 'assets/images/project-1-heijunka-des.png',
      blueprintRef: 'FIG. 01 // 4-STAGE ART MARKER DES & HEIJUNKA FLOW',
      techStack: ['FlexSim 3D', 'JavaScript DES Engine', 'Heijunka', 'SMED', 'Line Balancing'],
      en: {
        categoryLabel: 'Simulation & Scheduling',
        org: 'Thien Long Group · Long Thanh Plant',
        title: '3D Discrete-Event Simulation & Heijunka Web Scheduler',
        kpis: ['217 Color SKUs Sequenced', '4-Stage Line Balancing', 'Zero-Bottleneck Scheduling'],
        cardBullets: [
          'Modeled a <strong>4-stage sequential Art Marker line</strong> (barrel heat-transfer printing, cap printing, cap assembly, final assembly) in <strong>FlexSim 3D &amp; JavaScript DES Engine</strong>.',
          'Sequenced <strong>217 color SKUs</strong> via <strong>Heijunka leveling</strong> and SMED color-family grouping to minimize changeover loss.',
          'Controlled inter-stage <strong>Kanban safety buffers</strong> to achieve <strong>zero-bottleneck scheduling</strong> across shifts.'
        ],
        executiveTakeaway:
          'Synchronized a <strong>4-stage Art Marker manufacturing line</strong> across <strong>217 color SKUs</strong> by combining a <strong>FlexSim 3D</strong> digital twin with a custom <strong>JavaScript DES Web Scheduler</strong>—eliminating inter-stage WIP bottlenecks and standardizing Heijunka color changeover sequences.',
        sections: {
          problem:
            'The Art Marker manufacturing line links 4 sequential workcenters: (1) Barrel Heat-Transfer Printing, (2) Cap Printing, (3) Cap Assembly, and (4) Final Assembly. Managing 217 distinct color SKUs with uncoordinated batching caused repetitive SMED color-changeover downtime, cycle-time imbalance across cells, and WIP congestion before final assembly.',
          methodology:
            'Applied Heijunka level-scheduling, SMED changeover family clustering, and multi-stage Line Balancing. Developed a high-fidelity 3D digital twin in FlexSim 3D alongside a browser-native JavaScript Discrete-Event Simulation (DES) Engine for rapid scenario testing.',
          architecture:
            'Orders spanning 217 color SKUs pass through a sequencing rule that minimizes shade-transition setup penalties while smoothing shift volume mix. The DES clock steps across arrival, setup, processing, and transfer events through Stages 1–4, enforcing Kanban safety buffer caps to keep downstream stations balanced.',
          outcomes:
            'Established a synchronized 4-stage scheduling framework handling all 217 color SKUs with zero bottleneck buildup across simulated shifts. Standardized inter-stage safety buffer thresholds and equipped planners with an interactive web scheduler cross-validated against FlexSim 3D.'
        }
      },
      vi: {
        categoryLabel: 'Mô phỏng & Điều độ',
        org: 'Tập đoàn Thiên Long · Nhà máy Long Thành',
        title: 'Mô phỏng Sự kiện Rời rạc 3D & Hệ thống Điều độ Web Heijunka',
        kpis: ['Điều độ 217 Mã màu SKU', 'Cân bằng Chuyền 4 Công đoạn', 'Lịch Sản xuất Không Điểm nghẽn'],
        cardBullets: [
          'Mô hình hóa <strong>dây chuyền Art Marker 4 công đoạn nối tiếp</strong> (in chuyển nhiệt thân, in nắp, lắp nắp, lắp ráp hoàn chỉnh) trên <strong>FlexSim 3D &amp; JS DES Engine</strong>.',
          'Tối ưu thứ tự chuyển đổi <strong>217 mã màu SKU</strong> theo nguyên lý <strong>Heijunka</strong> và gom nhóm dải màu SMED.',
          'Kiểm soát ngưỡng <strong>tồn kho đệm (safety buffer)</strong> liên trạm, đảm bảo <strong>lịch điều độ không phát sinh điểm nghẽn</strong>.'
        ],
        executiveTakeaway:
          'Đồng bộ hóa <strong>dây chuyền sản xuất Art Marker 4 công đoạn</strong> cho <strong>217 mã màu SKU</strong> bằng mô hình song sinh số <strong>FlexSim 3D</strong> kết hợp <strong>JavaScript DES Web Scheduler</strong>—triệt tiêu ứ đọng bán thành phẩm (WIP) và chuẩn hóa quy tắc chuyển đổi màu Heijunka.',
        sections: {
          problem:
            'Dây chuyền sản xuất Art Marker gồm 4 công đoạn nối tiếp: (1) In chuyển nhiệt thân, (2) In nắp, (3) Lắp nắp và (4) Lắp ráp hoàn chỉnh. Việc sắp xếp thủ công 217 mã màu khác nhau gây phát sinh nhiều lần dừng máy chuyển đổi SMED, mất cân bằng nhịp độ giữa các trạm và dồn ứ bán thành phẩm (WIP).',
          methodology:
            'Áp dụng nguyên lý san bằng sản xuất Heijunka, gom nhóm chuyển đổi SMED theo dải màu và kỹ thuật Cân bằng Chuyền (Line Balancing). Xây dựng mô hình song sinh số trên FlexSim 3D kết hợp với bộ máy mô phỏng JavaScript DES chạy trực tiếp trên web.',
          architecture:
            'Danh sách 217 mã màu đi qua thuật toán sắp xếp tối ưu hóa chi phí chuyển đổi màu và chia đều sản lượng theo ca. Bộ máy JS DES mô phỏng từng sự kiện gia công qua Công đoạn 1–4, đồng thời giới hạn ngưỡng tồn kho đệm (safety buffer) liên trạm để ngăn tắc nghẽn.',
          outcomes:
            'Xây dựng thành công lịch điều độ đồng bộ 4 công đoạn cho toàn bộ 217 mã màu với trạng thái không phát sinh điểm nghẽn trong kịch bản kiểm thử. Chuẩn hóa mức tồn đệm giữa các trạm và bàn giao công cụ điều độ web tương tác đã đối chiếu chuẩn với FlexSim 3D.'
        }
      }
    },

    {
      id: 'project-2',
      code: 'PRJ-02 // WIP-BOM-SYNC',
      categoryKey: 'automation',
      domainIcon: 'database',
      imageSrc: 'assets/images/project-2-wip-bom.png',
      blueprintRef: 'FIG. 02 // AUTOMATED BOM EXPLOSION & WIP PIPELINE',
      techStack: ['Excel VBA', 'Power Query', 'Google Apps Script', 'Google QUERY', 'SQL Logic'],
      en: {
        categoryLabel: 'Data & BI Automation',
        org: 'Thien Long Group · Long Thanh Plant',
        title: 'Automated WIP, BOM & Multi-Stage Production Tracking System',
        kpis: ['100% Automated BOM Sync', 'Dynamic Safety Buffer', 'Real-Time WIP Tracking'],
        cardBullets: [
          'Engineered <strong>100% automated BOM explosion</strong> converting raw ink weight (kg) into exact marker unit counts across SKUs.',
          'Built <strong>real-time multi-stage WIP tracking</strong> across production cells using <strong>Excel VBA, Power Query, Google Apps Script &amp; SQL logic</strong>.',
          'Deployed <strong>dynamic safety buffer alerts</strong> to flag component shortages before downstream line starvation.'
        ],
        executiveTakeaway:
          'Replaced error-prone manual spreadsheet reconciliation with a <strong>100% automated BOM &amp; multi-stage WIP pipeline</strong> powered by <strong>Excel VBA, Power Query, Google Apps Script, and SQL logic</strong>—converting ink weight to unit counts and triggering real-time shortage alerts.',
        sections: {
          problem:
            'Material dispatch logged raw ink issuance by weight (kg), whereas cell scheduling required exact semi-finished unit counts per SKU across multiple workstations. Manual cross-sheet reconciliation introduced reporting latency, BOM conversion errors, and unflagged WIP shortages.',
          methodology:
            'Combined MRP / BOM Explosion and multi-echelon WIP inventory control with automated ETL pipelines: Excel VBA & Power Query for structured ingestion, Google Apps Script & QUERY() for live shop-floor synchronization, and SQL relational join logic.',
          architecture:
            'Shop-floor output logs feed a normalized SKU-component schema that automatically converts ink mass into equivalent marker unit quantities. Multi-stage WIP balances recalculate available net coverage in real time and compare remaining runway against dynamic safety buffer thresholds to raise instant shortage alerts.',
          outcomes:
            'Delivered 100% automated BOM synchronization across production stages, eliminating manual spreadsheet conversion work. Provided supervisors and planners with real-time WIP visibility and proactive dynamic shortage alerts ahead of line starvation.'
        }
      },
      vi: {
        categoryLabel: 'Tự động hóa Dữ liệu & BI',
        org: 'Tập đoàn Thiên Long · Nhà máy Long Thành',
        title: 'Hệ thống Tự động Theo dõi WIP, Quy đổi BOM & Sản xuất Đa công đoạn',
        kpis: ['100% Tự động Đồng bộ BOM', 'Tồn kho Đệm Động', 'Theo dõi WIP Thời gian thực'],
        cardBullets: [
          'Tự động hóa <strong>100% bóc tách định mức BOM</strong>, quy đổi chính xác khối lượng mực (kg) sang số lượng đơn vị sản phẩm theo SKU.',
          'Theo dõi <strong>tồn kho bán thành phẩm (WIP) thời gian thực</strong> giữa các tổ bằng <strong>Excel VBA, Power Query, Google Apps Script &amp; SQL</strong>.',
          'Thiết lập <strong>cảnh báo thiếu hụt động (Dynamic Safety Buffer)</strong> giúp ngăn ngừa đứt gãy vật tư trên chuyền.'
        ],
        executiveTakeaway:
          'Thay thế hoàn toàn việc đối chiếu bảng tính thủ công bằng <strong>hệ thống đồng bộ BOM &amp; theo dõi WIP đa công đoạn tự động 100%</strong> trên nền tảng <strong>Excel VBA, Power Query, Google Apps Script và SQL</strong>—quy đổi tức thời khối lượng mực sang đơn vị sản phẩm và cảnh báo sớm thiếu hụt.',
        sections: {
          problem:
            'Dữ liệu cấp phát mực tại xưởng ghi nhận theo khối lượng (kg), trong khi điều độ lắp ráp cần số lượng bán thành phẩm (cái/chiếc) theo từng mã màu. Việc đối chiếu thủ công giữa nhiều bảng tính rời rạc gây độ trễ thông tin, sai số quy đổi BOM và thiếu cảnh báo sớm khi hụt tồn kho WIP.',
          methodology:
            'Kết hợp phương pháp bóc tách định mức MRP / BOM Explosion và kiểm soát WIP đa công đoạn bằng bộ công cụ tự động hóa: Excel VBA & Power Query chuẩn hóa dữ liệu nguồn, Google Apps Script & hàm QUERY() đồng bộ trực tuyến và logic SQL liên kết bảng.',
          architecture:
            'Nhật ký sản lượng từ các tổ đi vào mô hình bảng chuẩn hóa, tự động quy đổi trọng lượng mực tiêu hao sang số đơn vị sản phẩm tương ứng theo hệ số SKU. Số dư WIP từng công đoạn được tính toán liên tục và so sánh với ngưỡng tồn kho đệm động để phát cảnh báo thiếu hụt.',
          outcomes:
            'Đạt 100% tự động hóa quy trình đồng bộ từ BOM sang tồn kho WIP đa công đoạn, loại bỏ hoàn toàn thao tác tính toán thủ công. Giúp bộ phận sản xuất nắm bắt tồn kho thời gian thực và chủ động ứng phó trước khi phát sinh đứt gãy chuyền.'
        }
      }
    },

    {
      id: 'project-3',
      code: 'PRJ-03 // OEE-TIME-5S',
      categoryKey: 'lean',
      domainIcon: 'gauge',
      imageSrc: 'assets/images/project-3-oee-5s.png',
      blueprintRef: 'FIG. 03 // OEE DECOMPOSITION, PARETO & 5S RCA',
      techStack: ['OEE Analysis', 'Time & Work Study', 'Pareto Chart', '5 Whys RCA', '5S Visual Mgmt'],
      en: {
        categoryLabel: 'Lean & OEE',
        org: 'Duy Tan Recycling',
        title: 'Machinery OEE, Time-Study & 5S Root-Cause Optimization',
        kpis: ['OEE Bottleneck Mapping', 'Time-Study Standardization', '5 Whys RCA & 5S'],
        cardBullets: [
          'Conducted <strong>stopwatch Time-Study measurements</strong> and full <strong>OEE loss decomposition</strong> (Availability × Performance × Quality).',
          'Isolated top unplanned downtime drivers using <strong>Pareto 80/20 charts</strong> and structured <strong>5 Whys Root-Cause Analysis (RCA)</strong>.',
          'Standardized operator SOPs and deployed <strong>5S visual management controls</strong> across shop-floor workstations.'
        ],
        executiveTakeaway:
          'Diagnosed critical recycling line losses through <strong>stopwatch Time-Study</strong> and <strong>OEE bottleneck mapping</strong>, applying <strong>Pareto 80/20 ranking &amp; 5 Whys RCA</strong> to eliminate recurring micro-stops and enforce <strong>5S visual standards</strong> on the shop floor.',
        sections: {
          problem:
            'Plastic recycling lines suffered from frequent unplanned micro-stops, fluctuating shift throughput, and undocumented cycle-time standards. Lack of structured downtime categorization and workstation 5S standards obscured the core drivers of equipment utilization loss.',
          methodology:
            'Executed formal Stopwatch Time & Work Study protocols, full OEE loss tree mapping (Availability × Performance × Quality), Pareto 80/20 downtime ranking, 5 Whys Root-Cause Analysis (RCA), Standard Work documentation, and 5S workplace organization.',
          architecture:
            'Shift-level stoppage logs and cycle-time samples were aggregated into structured loss buckets (Unplanned Breakdowns, Setup/Changeover, Micro-Stops, Quality Rejects). Pareto filtering isolated top loss contributors for 5 Whys fault-tree analysis, driving targeted engineering countermeasures and 5S visual zone layouts.',
          outcomes:
            'Built an actionable OEE bottleneck map highlighting critical machine constraints, established standardized cycle-time baselines for operator workflows, eliminated recurring downtime triggers via 5 Whys RCA, and instituted 5S visual controls across workstations.'
        }
      },
      vi: {
        categoryLabel: 'Lean & OEE',
        org: 'Duy Tân Recycling',
        title: 'Tối ưu OEE Thiết bị, Đo Thời gian & Cải tiến 5S / RCA',
        kpis: ['Bản đồ Điểm nghẽn OEE', 'Chuẩn hóa Time-Study', 'Phân tích 5 Whys & 5S'],
        cardBullets: [
          'Thực hiện <strong>bấm giờ chu kỳ máy (Time-Study)</strong> và phân rã tổn thất <strong>OEE toàn diện</strong> (Khả dụng × Hiệu suất × Chất lượng).',
          'Khoanh vùng nguyên nhân dừng máy ngoài kế hoạch bằng <strong>biểu đồ Pareto 80/20</strong> và truy vết <strong>5 Whys RCA</strong>.',
          'Chuẩn hóa thao tác vận hành (SOP) và triển khai <strong>quản lý trực quan 5S</strong> tại các trạm sản xuất.'
        ],
        executiveTakeaway:
          'Khoanh vùng chính xác tổn thất thiết bị trên chuyền tái chế thông qua <strong>bấm giờ Time-Study</strong> và <strong>bản đồ điểm nghẽn OEE</strong>, kết hợp <strong>Pareto 80/20 &amp; 5 Whys RCA</strong> để khắc phục lỗi dừng máy lặp lại và thiết lập chuẩn <strong>5S trực quan</strong> tại xưởng.',
        sections: {
          problem:
            'Hệ thống máy tái chế nhựa gặp tình trạng dừng vặt ngoài kế hoạch, sản lượng biến động giữa các ca và chưa có định mức thời gian chu kỳ chuẩn. Thiếu hệ thống phân loại lỗi dừng máy và chuẩn hóa mặt bằng 5S khiến việc xử lý tổn thất thiết bị thiếu trọng tâm.',
          methodology:
            'Triển khai Nghiên cứu Thời gian & Thao tác bằng bấm giờ (Time & Work Study), đo lường 3 thành phần OEE (Khả dụng × Hiệu suất × Chất lượng), xếp hạng Pareto 80/20, phân tích nguyên nhân gốc rễ 5 Whys RCA, chuẩn hóa thao tác chuẩn (SOP) và 5S hiện trường.',
          architecture:
            'Dữ liệu nhật ký ca và mẫu bấm giờ được chuẩn hóa thành các nhóm tổn thất thiết bị. Biểu đồ Pareto khoanh vùng nhóm sự cố chiếm tỷ trọng cao nhất để đi sâu truy vết bằng cây lỗi 5 Whys, gắn liền với cải tiến bố trí dụng cụ và vạch kẻ trực quan 5S.',
          outcomes:
            'Hoàn thiện bản đồ điểm nghẽn OEE cho cụm máy trọng yếu, thiết lập bộ chuẩn thời gian chu kỳ vận hành cho công nhân, khắc phục các nguyên nhân dừng máy lặp lại nhờ 5 Whys RCA và nâng cao tính ngăn nắp, an toàn tại xưởng theo tiêu chuẩn 5S.'
        }
      }
    }
  ];

  /* ========================================================================
     3. 3-Column Technical Skills Matrix Data (EN & VI) with Header Icons
     ======================================================================== */
  const SKILLS_MATRIX = [
    {
      code: '01 // IE & LEAN',
      icon: 'settings',
      en: {
        title: 'Industrial Engineering & Lean',
        desc: 'Shop-floor standardization, bottleneck diagnostics, and continuous waste elimination.',
        skills: ['Heijunka', 'SMED', 'VSM', 'OEE', 'Time & Work Study', '5S', '5 Whys RCA']
      },
      vi: {
        title: 'Kỹ thuật Công nghiệp & Lean',
        desc: 'Chuẩn hóa hiện trường sản xuất, chẩn đoán điểm nghẽn và loại bỏ lãng phí liên tục.',
        skills: ['Heijunka', 'SMED', 'VSM', 'OEE', 'Time & Work Study', '5S', '5 Whys RCA']
      }
    },
    {
      code: '02 // SIM & PLAN',
      icon: 'box',
      en: {
        title: 'Simulation & Scheduling',
        desc: 'Stochastic line modeling, capacity validation, and multi-stage material planning.',
        skills: [
          'FlexSim 3D',
          'Discrete-Event Simulation',
          'Capacity Planning',
          'MRP / BOM Explosion',
          'Line Balancing'
        ]
      },
      vi: {
        title: 'Mô phỏng & Hoạch định Điều độ',
        desc: 'Mô hình hóa chuyền sản xuất, kiểm chứng công suất và hoạch định vật tư đa công đoạn.',
        skills: [
          'FlexSim 3D',
          'Discrete-Event Simulation',
          'Capacity Planning',
          'MRP / BOM Explosion',
          'Line Balancing'
        ]
      }
    },
    {
      code: '03 // DATA & BI',
      icon: 'bar-chart-3',
      en: {
        title: 'Data Analytics & Automation',
        desc: 'Automated ETL workflows, relational querying, and live operational KPI dashboards.',
        skills: ['Python', 'SQL', 'Excel VBA & Power Query', 'Google Apps Script', 'Power BI']
      },
      vi: {
        title: 'Phân tích Dữ liệu & Tự động hóa',
        desc: 'Xây dựng luồng xử lý dữ liệu tự động, truy vấn quan hệ và bảng điều khiển KPI trực quan.',
        skills: ['Python', 'SQL', 'Excel VBA & Power Query', 'Google Apps Script', 'Power BI']
      }
    }
  ];

  /* ========================================================================
     4. Experience & Education Timeline Data (EN & VI) with Bold Metrics/Tools
     ======================================================================== */
  const TIMELINE_ITEMS = [
    {
      date: '05/2026 – 11/2026',
      icon: 'building-2',
      en: {
        role: 'Production Planning & Scheduling Intern',
        org: 'Thien Long Group — Long Thanh Manufacturing Plant',
        type: 'Internship',
        bullets: [
          'Modeled a <strong>4-stage Art Marker manufacturing line</strong> using <strong>FlexSim 3D &amp; a custom JavaScript DES Engine</strong> to validate shift capacity and line balancing.',
          'Sequenced <strong>217 color SKUs</strong> via <strong>Heijunka leveling &amp; SMED grouping</strong>, maintaining balanced inter-stage safety buffers with <strong>zero bottleneck buildup</strong>.',
          'Engineered <strong>100% automated BOM explosion</strong> (ink weight to units) and real-time WIP shortage alerts using <strong>Excel VBA, Power Query, Google Apps Script &amp; SQL logic</strong>.'
        ]
      },
      vi: {
        role: 'Thực tập sinh Hoạch định & Điều độ Sản xuất',
        org: 'Tập đoàn Thiên Long — Nhà máy Long Thành',
        type: 'Thực tập',
        bullets: [
          'Xây dựng mô hình <strong>dây chuyền Art Marker 4 công đoạn</strong> trên <strong>FlexSim 3D &amp; JavaScript DES Engine</strong> để kiểm chứng công suất và cân bằng chuyền.',
          'Điều độ <strong>217 mã màu SKU</strong> theo nguyên lý <strong>Heijunka &amp; gom nhóm SMED</strong>, duy trì tồn kho đệm liên trạm ổn định với <strong>0 điểm nghẽn</strong>.',
          'Tự động hóa <strong>100% quy đổi BOM</strong> (khối lượng mực sang đơn vị sản phẩm) và cảnh báo thiếu hụt WIP thời gian thực bằng <strong>Excel VBA, Power Query, Google Apps Script &amp; SQL</strong>.'
        ]
      }
    },
    {
      date: '06/2025 – 08/2025',
      icon: 'building-2',
      en: {
        role: 'Production & Lean Intern',
        org: 'Duy Tan Recycling',
        type: 'Internship',
        bullets: [
          'Conducted <strong>stopwatch Time-Study measurements</strong> across plastic recycling machinery to establish standardized cycle-time baselines.',
          'Evaluated <strong>Overall Equipment Effectiveness (OEE)</strong> and isolated top unplanned downtime drivers via <strong>Pareto 80/20 charts &amp; 5 Whys RCA</strong>.',
          'Standardized operator workflows (SOPs) and deployed <strong>5S visual management controls</strong> across shop-floor workstations.'
        ]
      },
      vi: {
        role: 'Thực tập sinh Sản xuất & Lean',
        org: 'Duy Tân Recycling',
        type: 'Thực tập',
        bullets: [
          'Thực hiện <strong>bấm giờ đo chu kỳ máy (Time-Study)</strong> trên dây chuyền tái chế nhựa nhằm thiết lập bộ định mức thời gian chuẩn.',
          'Đánh giá <strong>hiệu suất thiết bị tổng thể (OEE)</strong> và khoanh vùng nguyên nhân dừng máy ngoài kế hoạch bằng <strong>biểu đồ Pareto 80/20 &amp; 5 Whys RCA</strong>.',
          'Chuẩn hóa quy trình thao tác chuẩn (SOP) cho công nhân và triển khai <strong>quản lý trực quan 5S</strong> tại hiện trường xưởng.'
        ]
      }
    },
    {
      date: '2025 – 2026',
      icon: 'building-2',
      en: {
        role: 'President',
        org: 'E-Marketing Action Club (EMA HCMUT)',
        type: 'Leadership',
        bullets: [
          'Directed <strong>club-wide operations, cross-functional project execution</strong>, and talent development at <strong>Ho Chi Minh City University of Technology (HCMUT)</strong>.',
          'Coordinated <strong>academic alliance programs &amp; corporate partnerships</strong>, tracking milestone KPIs and deliverable quality.'
        ]
      },
      vi: {
        role: 'Chủ nhiệm Câu lạc bộ',
        org: 'CLB E-Marketing Action (EMA HCMUT)',
        type: 'Lãnh đạo',
        bullets: [
          'Điều hành <strong>chiến lược hoạt động, quản trị dự án đa chức năng</strong> và phát triển nhân sự tại <strong>Trường Đại học Bách khoa – ĐHQG TP.HCM (HCMUT)</strong>.',
          'Điều phối <strong>các chương trình liên minh học thuật &amp; đối tác doanh nghiệp</strong>, kiểm soát KPI tiến độ và chất lượng đầu ra.'
        ]
      }
    },
    {
      date: '2022 – 2026',
      icon: 'graduation-cap',
      en: {
        role: 'Bachelor of Business Administration',
        org: 'Ho Chi Minh City University of Technology (HCMUT)',
        type: 'Education',
        bullets: [
          'Undergraduate training at <strong>Ho Chi Minh City University of Technology – VNU-HCM (HCMUT, 2022–2026)</strong>.',
          'Specialized in <strong>Production Planning &amp; Scheduling, Lean Manufacturing Systems, Operations Research</strong>, and <strong>Quantitative Data Analytics</strong>.'
        ]
      },
      vi: {
        role: 'Cử nhân Quản trị Kinh doanh',
        org: 'Trường Đại học Bách khoa – ĐHQG TP.HCM (HCMUT)',
        type: 'Học vấn',
        bullets: [
          'Đào tạo chính quy tại <strong>Trường Đại học Bách khoa – ĐHQG TP.HCM (HCMUT, 2022–2026)</strong>.',
          'Chuyên sâu về <strong>Hoạch định &amp; Điều độ Sản xuất, Hệ thống Sản xuất Tinh gọn (Lean), Vận trù học</strong> và <strong>Phân tích Dữ liệu Định lượng</strong>.'
        ]
      }
    }
  ];

  /* ========================================================================
     5. Light-Blue Technical SVG Blueprint Generator (onerror fallback)
     ======================================================================== */
  function buildTechnicalBlueprintSvg(projectId, lang) {
    const isVi = lang === 'vi';

    if (projectId === 'project-1') {
      const labels = isVi
        ? {
            title: 'MÔ HÌNH CÂN BẰNG CHUYỀN 4 CÔNG ĐOẠN & ĐIỀU ĐỘ HEIJUNKA (217 MÃ MÀU)',
            subtitle: 'FLEXSIM 3D SONG SINH SỐ + JAVASCRIPT DES ENGINE',
            s1: 'CÔNG ĐOẠN 01',
            s1Sub: 'In chuyển nhiệt thân',
            s2: 'CÔNG ĐOẠN 02',
            s2Sub: 'In nắp bút',
            s3: 'CÔNG ĐOẠN 03',
            s3Sub: 'Lắp nắp',
            s4: 'CÔNG ĐOẠN 04',
            s4Sub: 'Lắp ráp hoàn chỉnh',
            matrixTitle: 'TRÌNH TỰ HEIJUNKA · 217 SKU MÀU (TỐI ƯU SMED)',
            w1: 'NHÓM A · MÀU NHẠT',
            w2: 'NHÓM B · TRUNG TÍNH',
            w3: 'NHÓM C · MÀU ĐẬM',
            status: 'ĐIỂM NGHẼN: 0 | CÂN BẰNG: ĐẠT'
          }
        : {
            title: '4-STAGE SEQUENTIAL LINE BALANCING & HEIJUNKA SCHEDULER (217 SKUs)',
            subtitle: 'FLEXSIM 3D DIGITAL TWIN + JAVASCRIPT DES ENGINE',
            s1: 'STAGE 01',
            s1Sub: 'Barrel Heat-Transfer',
            s2: 'STAGE 02',
            s2Sub: 'Cap Printing',
            s3: 'STAGE 03',
            s3Sub: 'Cap Assembly',
            s4: 'STAGE 04',
            s4Sub: 'Final Assembly',
            matrixTitle: 'HEIJUNKA LEVELING SEQUENCE · 217 COLOR SKUs (SMED GROUPED)',
            w1: 'WAVE A · LIGHT INK',
            w2: 'WAVE B · MID TONE',
            w3: 'WAVE C · DEEP INK',
            status: 'BOTTLENECK QUEUE: 0 | BALANCED'
          };

      return `
        <svg viewBox="0 0 880 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${labels.title}">
          <defs>
            <pattern id="bp-grid-1" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DBEAFE" stroke-width="0.8"/>
            </pattern>
            <marker id="arrow-blue-1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB"/>
            </marker>
          </defs>
          <rect width="880" height="340" fill="#F8FAFC"/>
          <rect width="880" height="340" fill="url(#bp-grid-1)"/>
          <rect x="14" y="14" width="852" height="312" rx="10" fill="none" stroke="#93C5FD" stroke-width="1.4"/>

          <!-- Blueprint Header Strip -->
          <rect x="14" y="14" width="852" height="40" rx="10" fill="#EFF6FF"/>
          <line x1="14" y1="54" x2="866" y2="54" stroke="#93C5FD" stroke-width="1.2"/>
          <text x="30" y="34" font-family="JetBrains Mono, monospace" font-size="11.5" font-weight="700" fill="#1D4ED8">${labels.title}</text>
          <text x="30" y="48" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0284C7">${labels.subtitle}</text>
          <rect x="640" y="22" width="212" height="24" rx="12" fill="#DBEAFE" stroke="#93C5FD"/>
          <text x="746" y="38" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" font-weight="700" fill="#1D4ED8">${labels.status}</text>

          <!-- 4 Sequential Stages + Inter-stage Buffers -->
          <g font-family="Inter, sans-serif">
            <!-- Stage 1 -->
            <rect x="28" y="78" width="152" height="78" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8"/>
            <rect x="28" y="78" width="152" height="22" rx="8" fill="#DBEAFE"/>
            <text x="104" y="93" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#1D4ED8">${labels.s1}</text>
            <text x="104" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#0F172A">${labels.s1Sub}</text>
            <text x="104" y="140" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0284C7">DES Node #1</text>

            <!-- Buffer 1 -->
            <line x1="180" y1="117" x2="196" y2="117" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow-blue-1)"/>
            <rect x="200" y="96" width="44" height="42" rx="6" fill="#EFF6FF" stroke="#0284C7" stroke-dasharray="3 2"/>
            <text x="222" y="113" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#0284C7">B1</text>
            <text x="222" y="128" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7.5" fill="#475569">WIP BUF</text>
            <line x1="244" y1="117" x2="260" y2="117" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow-blue-1)"/>

            <!-- Stage 2 -->
            <rect x="264" y="78" width="144" height="78" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8"/>
            <rect x="264" y="78" width="144" height="22" rx="8" fill="#DBEAFE"/>
            <text x="336" y="93" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#1D4ED8">${labels.s2}</text>
            <text x="336" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#0F172A">${labels.s2Sub}</text>
            <text x="336" y="140" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0284C7">DES Node #2</text>

            <!-- Buffer 2 -->
            <line x1="408" y1="117" x2="424" y2="117" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow-blue-1)"/>
            <rect x="428" y="96" width="44" height="42" rx="6" fill="#EFF6FF" stroke="#0284C7" stroke-dasharray="3 2"/>
            <text x="450" y="113" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#0284C7">B2</text>
            <text x="450" y="128" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7.5" fill="#475569">WIP BUF</text>
            <line x1="472" y1="117" x2="488" y2="117" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow-blue-1)"/>

            <!-- Stage 3 -->
            <rect x="492" y="78" width="144" height="78" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8"/>
            <rect x="492" y="78" width="144" height="22" rx="8" fill="#DBEAFE"/>
            <text x="564" y="93" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#1D4ED8">${labels.s3}</text>
            <text x="564" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#0F172A">${labels.s3Sub}</text>
            <text x="564" y="140" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0284C7">DES Node #3</text>

            <!-- Buffer 3 -->
            <line x1="636" y1="117" x2="652" y2="117" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow-blue-1)"/>
            <rect x="656" y="96" width="44" height="42" rx="6" fill="#EFF6FF" stroke="#0284C7" stroke-dasharray="3 2"/>
            <text x="678" y="113" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#0284C7">B3</text>
            <text x="678" y="128" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7.5" fill="#475569">WIP BUF</text>
            <line x1="700" y1="117" x2="716" y2="117" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow-blue-1)"/>

            <!-- Stage 4 -->
            <rect x="720" y="78" width="132" height="78" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8"/>
            <rect x="720" y="78" width="132" height="22" rx="8" fill="#2563EB"/>
            <text x="786" y="93" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#FFFFFF">${labels.s4}</text>
            <text x="786" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#0F172A">${labels.s4Sub}</text>
            <text x="786" y="140" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0284C7">DES Output</text>
          </g>

          <!-- Heijunka Leveling Schedule Gantt Matrix -->
          <rect x="30" y="176" width="822" height="134" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.2"/>
          <text x="46" y="198" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#0F172A">${labels.matrixTitle}</text>

          <!-- Gantt Rows -->
          <rect x="46" y="212" width="230" height="24" rx="5" fill="#DBEAFE" stroke="#93C5FD"/>
          <text x="161" y="228" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#1D4ED8">${labels.w1} (SKU 001–072)</text>

          <rect x="292" y="212" width="265" height="24" rx="5" fill="#EFF6FF" stroke="#2563EB"/>
          <text x="424" y="228" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#1D4ED8">${labels.w2} (SKU 073–148)</text>

          <rect x="573" y="212" width="262" height="24" rx="5" fill="#2563EB"/>
          <text x="704" y="228" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#FFFFFF">${labels.w3} (SKU 149–217)</text>

          <!-- Balanced Cycle Bars & Takt Line -->
          <line x1="46" y1="264" x2="835" y2="264" stroke="#0284C7" stroke-width="1.4" stroke-dasharray="5 4"/>
          <text x="835" y="258" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#0284C7">TAKT TARGET LINE</text>

          <rect x="65" y="266" width="60" height="30" rx="3" fill="#93C5FD"/>
          <rect x="145" y="268" width="60" height="28" rx="3" fill="#93C5FD"/>
          <rect x="225" y="265" width="60" height="31" rx="3" fill="#60A5FA"/>
          <rect x="305" y="267" width="60" height="29" rx="3" fill="#60A5FA"/>
          <rect x="385" y="265" width="60" height="31" rx="3" fill="#3B82F6"/>
          <rect x="465" y="266" width="60" height="30" rx="3" fill="#3B82F6"/>
          <rect x="545" y="268" width="60" height="28" rx="3" fill="#2563EB"/>
          <rect x="625" y="265" width="60" height="31" rx="3" fill="#2563EB"/>
          <rect x="705" y="266" width="60" height="30" rx="3" fill="#1D4ED8"/>
        </svg>
      `;
    }

    if (projectId === 'project-2') {
      const labels = isVi
        ? {
            title: 'KIẾN TRÚC TỰ ĐỘNG HÓA QUY ĐỔI BOM & THEO DÕI WIP ĐA CÔNG ĐOẠN',
            subtitle: 'EXCEL VBA · POWER QUERY · GOOGLE APPS SCRIPT · QUERY & SQL LOGIC',
            n1: 'NGUỒN MỰC (KG)',
            n1Sub: 'Nhật ký cấp phát',
            n2: 'ĐỘNG CƠ BOM',
            n2Sub: 'Quy đổi kg → Đơn vị',
            n3: 'SỔ CÁI WIP',
            n3Sub: 'Apps Script / SQL',
            n4: 'CẢNH BÁO ĐỘNG',
            n4Sub: 'Ngưỡng tồn đệm',
            chartTitle: 'GIÁM SÁT ĐỘ PHỦ WIP SO VỚI NGƯỠNG TỒN KHO ĐỆM AN TOÀN (DỮ LIỆU MẪU)',
            threshold: 'NGƯỠNG ĐỆM AN TOÀN',
            alertText: 'CẢNH BÁO BÙ VẬT TƯ'
          }
        : {
            title: 'AUTOMATED BOM EXPLOSION & MULTI-STAGE WIP TRACKING ARCHITECTURE',
            subtitle: 'EXCEL VBA · POWER QUERY · GOOGLE APPS SCRIPT · QUERY & SQL LOGIC',
            n1: 'INK MASS LOG (KG)',
            n1Sub: 'Raw Material Input',
            n2: 'BOM ENGINE',
            n2Sub: 'Weight → Unit Sync',
            n3: 'WIP LEDGER',
            n3Sub: 'Apps Script / SQL',
            n4: 'SHORTAGE ALERT',
            n4Sub: 'Dynamic Buffer',
            chartTitle: 'MULTI-STAGE WIP COVERAGE VS. DYNAMIC SAFETY BUFFER (SANITIZED MOCK)',
            threshold: 'DYNAMIC SAFETY BUFFER',
            alertText: 'REPLENISH TRIGGER'
          };

      return `
        <svg viewBox="0 0 880 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${labels.title}">
          <defs>
            <pattern id="bp-grid-2" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DBEAFE" stroke-width="0.8"/>
            </pattern>
            <marker id="arrow-blue-2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB"/>
            </marker>
          </defs>
          <rect width="880" height="340" fill="#F8FAFC"/>
          <rect width="880" height="340" fill="url(#bp-grid-2)"/>
          <rect x="14" y="14" width="852" height="312" rx="10" fill="none" stroke="#93C5FD" stroke-width="1.4"/>

          <!-- Header -->
          <rect x="14" y="14" width="852" height="40" rx="10" fill="#EFF6FF"/>
          <line x1="14" y1="54" x2="866" y2="54" stroke="#93C5FD" stroke-width="1.2"/>
          <text x="30" y="34" font-family="JetBrains Mono, monospace" font-size="11.5" font-weight="700" fill="#1D4ED8">${labels.title}</text>
          <text x="30" y="48" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0284C7">${labels.subtitle}</text>
          <rect x="676" y="22" width="176" height="24" rx="12" fill="#DBEAFE" stroke="#93C5FD"/>
          <text x="764" y="38" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" font-weight="700" fill="#1D4ED8">100% BOM SYNC</text>

          <!-- 4 Pipeline Nodes -->
          <g font-family="Inter, sans-serif">
            <rect x="30" y="76" width="175" height="76" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.6"/>
            <rect x="30" y="76" width="175" height="22" rx="8" fill="#DBEAFE"/>
            <text x="117" y="91" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#1D4ED8">01 · ${labels.n1}</text>
            <text x="117" y="119" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0F172A">${labels.n1Sub}</text>
            <text x="117" y="138" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#64748B">Power Query ETL</text>

            <line x1="205" y1="114" x2="238" y2="114" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow-blue-2)"/>

            <rect x="242" y="76" width="180" height="76" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.6"/>
            <rect x="242" y="76" width="180" height="22" rx="8" fill="#DBEAFE"/>
            <text x="332" y="91" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#1D4ED8">02 · ${labels.n2}</text>
            <text x="332" y="119" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0F172A">${labels.n2Sub}</text>
            <text x="332" y="138" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#64748B">Excel VBA Matrix</text>

            <line x1="422" y1="114" x2="455" y2="114" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow-blue-2)"/>

            <rect x="459" y="76" width="180" height="76" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.6"/>
            <rect x="459" y="76" width="180" height="22" rx="8" fill="#DBEAFE"/>
            <text x="549" y="91" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#1D4ED8">03 · ${labels.n3}</text>
            <text x="549" y="119" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0F172A">${labels.n3Sub}</text>
            <text x="549" y="138" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#64748B">Real-Time QUERY()</text>

            <line x1="639" y1="114" x2="672" y2="114" stroke="#2563EB" stroke-width="2" marker-end="url(#arrow-blue-2)"/>

            <rect x="676" y="76" width="176" height="76" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.8"/>
            <rect x="676" y="76" width="176" height="22" rx="8" fill="#2563EB"/>
            <text x="764" y="91" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#FFFFFF">04 · ${labels.n4}</text>
            <text x="764" y="119" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0F172A">${labels.n4Sub}</text>
            <text x="764" y="138" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0284C7">Automated Trigger</text>
          </g>

          <!-- WIP Coverage Monitor Chart -->
          <rect x="30" y="172" width="822" height="138" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.2"/>
          <text x="48" y="194" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#0F172A">${labels.chartTitle}</text>

          <!-- Threshold Line -->
          <line x1="48" y1="242" x2="834" y2="242" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="6 4"/>
          <text x="834" y="236" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#0284C7">${labels.threshold}</text>

          <!-- SKU Family Bars -->
          <rect x="75" y="210" width="90" height="76" rx="4" fill="#2563EB"/>
          <text x="120" y="300" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#475569">CELL 01 · BARREL</text>

          <rect x="235" y="218" width="90" height="68" rx="4" fill="#3B82F6"/>
          <text x="280" y="300" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#475569">CELL 02 · CAP</text>

          <rect x="395" y="252" width="90" height="34" rx="4" fill="#93C5FD" stroke="#0284C7" stroke-width="1.5"/>
          <rect x="395" y="228" width="90" height="18" rx="4" fill="#DBEAFE" stroke="#2563EB"/>
          <text x="440" y="241" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700" fill="#1D4ED8">${labels.alertText}</text>
          <text x="440" y="300" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#475569">CELL 03 · INK LOT</text>

          <rect x="555" y="212" width="90" height="74" rx="4" fill="#2563EB"/>
          <text x="600" y="300" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#475569">CELL 04 · FINAL</text>

          <rect x="715" y="222" width="90" height="64" rx="4" fill="#60A5FA"/>
          <text x="760" y="300" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#475569">FG BUFFER</text>
        </svg>
      `;
    }

    // Project 3: OEE, Pareto, 5 Whys & 5S Blueprint
    const labels = isVi
      ? {
          title: 'BẢN ĐỒ ĐIỂM NGHẼN OEE, PARETO DỪNG MÁY & CHUẨN HÓA 5S',
          subtitle: 'TIME-STUDY BẤM GIỜ · PHÂN TÍCH 5 WHYS RCA · QUẢN LÝ TRỰC QUAN 5S',
          paretoTitle: 'PARETO NGUYÊN NHÂN DỪNG MÁY NGOÀI KẾ HOẠCH (GIẢ LẬP)',
          oeeTitle: 'PHÂN RÃ CHỈ SỐ OEE & CHUẨN HÓA HIỆN TRƯỜNG',
          c1: 'Kẹt phôi',
          c2: 'Chuyển đổi',
          c3: 'Cảm biến',
          c4: 'Dừng vặt',
          f1: 'KHẢ DỤNG (AVAILABILITY)',
          f2: 'HIỆU SUẤT (PERFORMANCE)',
          f3: 'CHẤT LƯỢNG (QUALITY)',
          rca: '5 WHYS RCA → CHUẨN HÓA SOP & 5S'
        }
      : {
          title: 'MACHINERY OEE BOTTLENECK MAP, PARETO DOWNTIME & 5S STANDARD',
          subtitle: 'STOPWATCH TIME-STUDY · 5 WHYS ROOT-CAUSE ANALYSIS · 5S SHOP FLOOR',
          paretoTitle: 'PARETO UNPLANNED DOWNTIME DRIVERS (SANITIZED MOCK)',
          oeeTitle: 'OEE DECOMPOSITION & 5S WORKSTATION CONTROLS',
          c1: 'Feed Jam',
          c2: 'Setup',
          c3: 'Sensor',
          c4: 'Micro-Stop',
          f1: 'AVAILABILITY',
          f2: 'PERFORMANCE',
          f3: 'QUALITY',
          rca: '5 WHYS RCA → STANDARD WORK & 5S'
        };

    return `
      <svg viewBox="0 0 880 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${labels.title}">
        <defs>
          <pattern id="bp-grid-3" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DBEAFE" stroke-width="0.8"/>
          </pattern>
        </defs>
        <rect width="880" height="340" fill="#F8FAFC"/>
        <rect width="880" height="340" fill="url(#bp-grid-3)"/>
        <rect x="14" y="14" width="852" height="312" rx="10" fill="none" stroke="#93C5FD" stroke-width="1.4"/>

        <!-- Header -->
        <rect x="14" y="14" width="852" height="40" rx="10" fill="#EFF6FF"/>
        <line x1="14" y1="54" x2="866" y2="54" stroke="#93C5FD" stroke-width="1.2"/>
        <text x="30" y="34" font-family="JetBrains Mono, monospace" font-size="11.5" font-weight="700" fill="#1D4ED8">${labels.title}</text>
        <text x="30" y="48" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0284C7">${labels.subtitle}</text>

        <!-- Left Box: Pareto Chart -->
        <rect x="30" y="72" width="420" height="238" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.2"/>
        <text x="48" y="96" font-family="JetBrains Mono, monospace" font-size="10.2" font-weight="700" fill="#0F172A">${labels.paretoTitle}</text>

        <!-- 80% Cumulative Line -->
        <line x1="56" y1="138" x2="424" y2="138" stroke="#0284C7" stroke-width="1.3" stroke-dasharray="5 3"/>
        <text x="424" y="132" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#0284C7">80% CUTOFF</text>

        <!-- Pareto Bars -->
        <rect x="70" y="128" width="60" height="142" rx="4" fill="#2563EB"/>
        <text x="100" y="286" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#475569">${labels.c1}</text>

        <rect x="158" y="168" width="60" height="102" rx="4" fill="#3B82F6"/>
        <text x="188" y="286" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#475569">${labels.c2}</text>

        <rect x="246" y="206" width="60" height="64" rx="4" fill="#60A5FA"/>
        <text x="276" y="286" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#475569">${labels.c3}</text>

        <rect x="334" y="232" width="60" height="38" rx="4" fill="#93C5FD"/>
        <text x="364" y="286" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#475569">${labels.c4}</text>

        <!-- Cumulative Curve -->
        <polyline points="100,192 188,148 276,124 364,114" fill="none" stroke="#0F172A" stroke-width="2"/>
        <circle cx="100" cy="192" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/>
        <circle cx="188" cy="148" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/>
        <circle cx="276" cy="124" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/>
        <circle cx="364" cy="114" r="4" fill="#FFFFFF" stroke="#2563EB" stroke-width="2"/>

        <!-- Right Box: OEE Decomposition & 5S -->
        <rect x="468" y="72" width="382" height="238" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.2"/>
        <text x="486" y="96" font-family="JetBrains Mono, monospace" font-size="10.2" font-weight="700" fill="#0F172A">${labels.oeeTitle}</text>

        <!-- OEE Factors -->
        <rect x="486" y="114" width="346" height="34" rx="6" fill="#EFF6FF" stroke="#DBEAFE"/>
        <text x="500" y="135" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#1D4ED8">${labels.f1}</text>
        <rect x="690" y="125" width="126" height="10" rx="5" fill="#DBEAFE"/>
        <rect x="690" y="125" width="96" height="10" rx="5" fill="#2563EB"/>

        <rect x="486" y="156" width="346" height="34" rx="6" fill="#EFF6FF" stroke="#DBEAFE"/>
        <text x="500" y="177" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#1D4ED8">${labels.f2}</text>
        <rect x="690" y="167" width="126" height="10" rx="5" fill="#DBEAFE"/>
        <rect x="690" y="167" width="104" height="10" rx="5" fill="#0284C7"/>

        <rect x="486" y="198" width="346" height="34" rx="6" fill="#EFF6FF" stroke="#DBEAFE"/>
        <text x="500" y="219" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#1D4ED8">${labels.f3}</text>
        <rect x="690" y="209" width="126" height="10" rx="5" fill="#DBEAFE"/>
        <rect x="690" y="209" width="118" height="10" rx="5" fill="#2563EB"/>

        <!-- 5 Whys & 5S Visual Strip -->
        <rect x="486" y="246" width="346" height="46" rx="6" fill="#DBEAFE" stroke="#93C5FD"/>
        <text x="659" y="266" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#1D4ED8">${labels.rca}</text>
        <text x="659" y="282" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0F172A">1S SORT · 2S SET · 3S SHINE · 4S STD · 5S SUSTAIN</text>
      </svg>
    `;
  }

  /* ========================================================================
     6. Application State & DOM References
     ======================================================================== */
  let currentLang = 'en';
  let currentFilter = 'all';
  let activeProjectId = null;
  let lastFocusedElement = null;
  let toastTimeout = null;
  let revealObserver = null;

  const dom = {
    html: document.documentElement,
    scrollProgressBar: document.getElementById('scroll-progress-bar'),
    navLinks: document.querySelectorAll('.main-nav .nav-link'),
    mobileNavLinks: document.querySelectorAll('.mobile-drawer .mobile-nav-link'),
    langBtnEn: document.getElementById('lang-btn-en'),
    langBtnVi: document.getElementById('lang-btn-vi'),
    projectsGrid: document.getElementById('projects-grid'),
    filterButtons: document.querySelectorAll('#project-filters .filter-btn'),
    skillsGrid: document.getElementById('skills-grid'),
    timelineList: document.getElementById('timeline-list'),
    modalBackdrop: document.getElementById('case-study-modal'),
    modalBody: document.getElementById('modal-body'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalCategory: document.getElementById('modal-category'),
    modalOrg: document.getElementById('modal-org'),
    modalTitle: document.getElementById('modal-title'),
    modalKpiPills: document.getElementById('modal-kpi-pills'),
    modalNdaLabel: document.getElementById('modal-nda-label'),
    modalBlueprintRef: document.getElementById('modal-blueprint-ref'),
    modalPreviewImg: document.getElementById('modal-preview-img'),
    modalSvgBlueprint: document.getElementById('modal-svg-blueprint'),
    modalExecTitle: document.getElementById('modal-exec-title'),
    modalExecText: document.getElementById('modal-exec-text'),
    modalSectionsGrid: document.getElementById('modal-sections-grid'),
    modalStack: document.getElementById('modal-stack'),
    modalPrevBtn: document.getElementById('modal-prev-btn'),
    modalNextBtn: document.getElementById('modal-next-btn'),
    copyTriggers: document.querySelectorAll('.copy-email-trigger'),
    copyToast: document.getElementById('copy-toast'),
    copyToastText: document.getElementById('copy-toast-text'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileDrawer: document.getElementById('mobile-drawer')
  };

  /* ========================================================================
     7. Helper Utilities & Blueprint Fallback Handler (onerror)
     ======================================================================== */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderSvgFallbackIntoModal(projectId) {
    if (!dom.modalSvgBlueprint) return;
    dom.modalSvgBlueprint.innerHTML = buildTechnicalBlueprintSvg(projectId, currentLang);
    dom.modalSvgBlueprint.hidden = false;
  }

  /**
   * Automatic Light-Blue SVG Technical Blueprint Fallback Function.
   * Invoked via `onerror` if actual PNG screenshots are not yet placed in assets/images/.
   */
  window.handleBlueprintFallback = function (imgElement) {
    if (!imgElement) return;
    imgElement.hidden = true;
    imgElement.style.display = 'none';
    imgElement.setAttribute('aria-hidden', 'true');
    const projectId = imgElement.getAttribute('data-project-id') || activeProjectId || 'project-1';
    renderSvgFallbackIntoModal(projectId);
  };

  /* ========================================================================
     8. IntersectionObserver Scroll-Reveal & ScrollProgress / ScrollSpy
     ======================================================================== */
  function initRevealObserver() {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal-item').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.08
        }
      );
    }

    document.querySelectorAll('.reveal-item:not(.is-visible)').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.96) {
        el.classList.add('is-visible');
      } else {
        revealObserver.observe(el);
      }
    });
  }

  function updateScrollProgressAndSpy() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      ) - window.innerHeight;

    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    if (dom.scrollProgressBar) {
      dom.scrollProgressBar.style.width = `${pct.toFixed(2)}%`;
    }

    // Ensure any reveal item at or above the current scroll viewport is visible
    document.querySelectorAll('.reveal-item:not(.is-visible)').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.96) {
        el.classList.add('is-visible');
        if (revealObserver) revealObserver.unobserve(el);
      }
    });

    // ScrollSpy active section detection
    const sectionIds = ['about', 'projects', 'skills', 'timeline', 'contact'];
    const spyOffset = scrollTop + 160;
    let activeSection = sectionIds[0];

    for (const id of sectionIds) {
      const sec = document.getElementById(id);
      if (sec && sec.offsetTop <= spyOffset) {
        activeSection = id;
      }
    }

    if (docHeight > 0 && scrollTop >= docHeight - 30) {
      activeSection = 'contact';
    }

    dom.navLinks.forEach((link) => {
      const isMatch = link.getAttribute('data-section') === activeSection;
      link.classList.toggle('is-active', isMatch);
      if (isMatch) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    dom.mobileNavLinks.forEach((link) => {
      const isMatch = link.getAttribute('data-section') === activeSection;
      link.classList.toggle('is-active', isMatch);
    });
  }

  /* ========================================================================
     9. Renderers (Projects, Skills Matrix, Timeline, Static Translations)
     ======================================================================== */
  function applyStaticTranslations(lang) {
    const dict = I18N[lang];
    dom.html.setAttribute('lang', lang);
    document.title = dict.pageTitle;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    const isEn = lang === 'en';
    dom.langBtnEn.classList.toggle('is-active', isEn);
    dom.langBtnEn.setAttribute('aria-pressed', String(isEn));
    dom.langBtnVi.classList.toggle('is-active', !isEn);
    dom.langBtnVi.setAttribute('aria-pressed', String(!isEn));
  }

  function renderProjects(immediateReveal = false) {
    if (!dom.projectsGrid) return;
    const dict = I18N[currentLang];

    const filtered =
      currentFilter === 'all'
        ? PROJECTS
        : PROJECTS.filter((project) => project.categoryKey === currentFilter);

    dom.projectsGrid.classList.toggle('is-single', filtered.length === 1);

    dom.projectsGrid.innerHTML = filtered
      .map((project, index) => {
        const content = project[currentLang];
        const delayMs = index * 80;
        const kpiMarkup = content.kpis
          .map(
            (kpi, kpiIdx) => `
              <span class="kpi-pill">
                <i data-lucide="${kpiIdx === 0 ? 'trending-up' : 'check-circle-2'}" aria-hidden="true"></i>
                <span>${escapeHtml(kpi)}</span>
              </span>
            `
          )
          .join('');

        const bulletsMarkup = content.cardBullets.map((item) => `<li>${item}</li>`).join('');

        const stackMarkup = project.techStack
          .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
          .join('');

        return `
          <article
            class="project-card reveal-item${immediateReveal ? ' is-visible' : ''}"
            style="--reveal-delay: ${delayMs}ms;"
            tabindex="0"
            role="button"
            data-project-id="${escapeHtml(project.id)}"
            aria-label="${escapeHtml(content.title)} — ${escapeHtml(dict.inspectAction)}"
          >
            <div class="project-card-top">
              <span class="project-category">
                <i data-lucide="${escapeHtml(project.domainIcon)}" class="icon-xs" aria-hidden="true"></i>
                <span>${escapeHtml(content.categoryLabel)}</span>
              </span>
              <span class="project-org">
                <i data-lucide="building-2" class="icon-xs" aria-hidden="true"></i>
                <span>${escapeHtml(content.org)}</span>
              </span>
            </div>

            <h3 class="project-title">${escapeHtml(content.title)}</h3>

            <div class="kpi-pills" aria-label="Quantitative KPIs">
              ${kpiMarkup}
            </div>

            <ul class="project-bullets">
              ${bulletsMarkup}
            </ul>

            <div class="project-tags">
              ${stackMarkup}
            </div>

            <div class="project-card-footer">
              <span class="project-inspect-link">
                <span>${escapeHtml(dict.inspectAction)}</span>
                <i data-lucide="arrow-up-right" class="icon-sm" aria-hidden="true"></i>
              </span>
              <span class="project-code">${escapeHtml(project.code)}</span>
            </div>
          </article>
        `;
      })
      .join('');

    refreshLucideIcons();
    initRevealObserver();
  }

  function renderSkillsMatrix(immediateReveal = false) {
    if (!dom.skillsGrid) return;

    dom.skillsGrid.innerHTML = SKILLS_MATRIX.map((col, index) => {
      const content = col[currentLang];
      const delayMs = index * 80;
      const skillItems = content.skills
        .map(
          (skill) => `
            <li class="skill-chip">
              <i data-lucide="check-circle-2" aria-hidden="true"></i>
              <span>${escapeHtml(skill)}</span>
            </li>
          `
        )
        .join('');

      return `
        <section
          class="skill-column reveal-item${immediateReveal ? ' is-visible' : ''}"
          style="--reveal-delay: ${delayMs}ms;"
        >
          <div class="skill-col-top">
            <span class="skill-col-icon" aria-hidden="true">
              <i data-lucide="${escapeHtml(col.icon)}" class="icon-md"></i>
            </span>
            <span class="skill-col-code">${escapeHtml(col.code)}</span>
          </div>
          <h3 class="skill-col-title">${escapeHtml(content.title)}</h3>
          <p class="skill-col-desc">${escapeHtml(content.desc)}</p>
          <ul class="skill-list">
            ${skillItems}
          </ul>
        </section>
      `;
    }).join('');

    refreshLucideIcons();
    initRevealObserver();
  }

  function renderTimeline(immediateReveal = false) {
    if (!dom.timelineList) return;

    dom.timelineList.innerHTML = TIMELINE_ITEMS.map((item, index) => {
      const content = item[currentLang];
      const delayMs = index * 80;
      const bullets = content.bullets.map((b) => `<li>${b}</li>`).join('');

      return `
        <article
          class="timeline-item reveal-item${immediateReveal ? ' is-visible' : ''}"
          style="--reveal-delay: ${delayMs}ms;"
        >
          <div class="timeline-header">
            <div class="timeline-heading-group">
              <span class="timeline-badge-icon" aria-hidden="true">
                <i data-lucide="${escapeHtml(item.icon)}" class="icon-sm"></i>
              </span>
              <div>
                <h3 class="timeline-role">${escapeHtml(content.role)}</h3>
                <div class="timeline-org">${escapeHtml(content.org)}</div>
              </div>
            </div>
            <div class="timeline-meta">
              <span class="timeline-type">${escapeHtml(content.type)}</span>
              <span class="timeline-date">${escapeHtml(item.date)}</span>
            </div>
          </div>
          <ul class="timeline-bullets">
            ${bullets}
          </ul>
        </article>
      `;
    }).join('');

    refreshLucideIcons();
    initRevealObserver();
  }

  /* ========================================================================
     10. 4-Part Case Study Modal Management
     ======================================================================== */
  const MODAL_SECTION_ICONS = {
    problem: 'activity',
    methodology: 'settings',
    architecture: 'layers',
    outcomes: 'check-circle-2'
  };

  function populateModal(projectId) {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project) return;

    activeProjectId = project.id;
    const dict = I18N[currentLang];
    const content = project[currentLang];

    dom.modalCategory.innerHTML = `
      <i data-lucide="${escapeHtml(project.domainIcon)}" class="icon-xs" aria-hidden="true"></i>
      <span>${escapeHtml(content.categoryLabel)}</span>
    `;
    dom.modalOrg.innerHTML = `
      <i data-lucide="building-2" class="icon-xs" aria-hidden="true"></i>
      <span>${escapeHtml(content.org)}</span>
    `;
    dom.modalTitle.textContent = content.title;
    dom.modalNdaLabel.textContent = dict.ndaLabel;
    dom.modalBlueprintRef.textContent = project.blueprintRef;

    dom.modalKpiPills.innerHTML = content.kpis
      .map(
        (kpi, idx) => `
          <span class="kpi-pill">
            <i data-lucide="${idx === 0 ? 'trending-up' : 'check-circle-2'}" aria-hidden="true"></i>
            <span>${escapeHtml(kpi)}</span>
          </span>
        `
      )
      .join('');

    // Render Light-Blue SVG blueprint fallback immediately and attempt loading real PNG
    renderSvgFallbackIntoModal(project.id);

    dom.modalPreviewImg.hidden = true;
    dom.modalPreviewImg.style.display = 'none';
    dom.modalPreviewImg.removeAttribute('src');
    dom.modalPreviewImg.removeAttribute('aria-hidden');
    dom.modalPreviewImg.setAttribute('data-project-id', project.id);
    dom.modalPreviewImg.alt = `${content.title} — ${dict.ndaLabel}`;
    dom.modalPreviewImg.onload = function () {
      dom.modalPreviewImg.hidden = false;
      dom.modalPreviewImg.style.display = '';
      dom.modalSvgBlueprint.hidden = true;
    };
    dom.modalPreviewImg.src = project.imageSrc;

    // Executive Takeaway Banner
    if (dom.modalExecTitle) {
      dom.modalExecTitle.textContent = dict.execBannerTitle;
    }
    if (dom.modalExecText) {
      dom.modalExecText.innerHTML = content.executiveTakeaway;
    }

    // 4-Part Structured Engineering Sections
    const sectionOrder = ['problem', 'methodology', 'architecture', 'outcomes'];
    dom.modalSectionsGrid.innerHTML = sectionOrder
      .map((key) => {
        const iconName = MODAL_SECTION_ICONS[key] || 'check-circle-2';
        return `
          <section class="case-part">
            <h3 class="case-part-title">
              <i data-lucide="${iconName}" class="icon-xs" aria-hidden="true"></i>
              <span>${escapeHtml(dict.modalSectionTitles[key])}</span>
            </h3>
            <p class="case-part-body">${escapeHtml(content.sections[key])}</p>
          </section>
        `;
      })
      .join('');

    dom.modalStack.innerHTML = project.techStack
      .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
      .join('');

    refreshLucideIcons();
  }

  function openModal(projectId, triggerElement) {
    lastFocusedElement = triggerElement || document.activeElement;
    populateModal(projectId);
    dom.modalBackdrop.hidden = false;
    document.body.classList.add('modal-open');
    if (dom.modalBody) dom.modalBody.scrollTop = 0;
    dom.modalCloseBtn.focus();
  }

  function closeModal() {
    if (dom.modalBackdrop.hidden) return;
    dom.modalBackdrop.hidden = true;
    document.body.classList.remove('modal-open');
    activeProjectId = null;

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function cycleModal(step) {
    if (!activeProjectId) return;
    const idx = PROJECTS.findIndex((p) => p.id === activeProjectId);
    if (idx === -1) return;
    const nextIdx = (idx + step + PROJECTS.length) % PROJECTS.length;
    populateModal(PROJECTS[nextIdx].id);
    if (dom.modalBody) dom.modalBody.scrollTop = 0;
  }

  /* ========================================================================
     11. Language Switching & Persistence
     ======================================================================== */
  function setLanguage(lang, persist = true, isInitial = false) {
    if (lang !== 'en' && lang !== 'vi') return;
    currentLang = lang;

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (_) {
        // Ignore storage restrictions
      }
    }

    applyStaticTranslations(lang);
    renderProjects(!isInitial);
    renderSkillsMatrix(!isInitial);
    renderTimeline(!isInitial);

    if (activeProjectId && !dom.modalBackdrop.hidden) {
      populateModal(activeProjectId);
    }

    refreshLucideIcons();
  }

  /* ========================================================================
     12. Copy Email Functionality with Copy <-> Check Icon & Toast Feedback
     ======================================================================== */
  function setCopyButtonsIcon(iconName) {
    dom.copyTriggers.forEach((btn) => {
      const slot = btn.querySelector('.copy-icon-slot');
      if (slot) {
        slot.innerHTML = `<i data-lucide="${iconName}" class="icon-sm"></i>`;
      }
    });
    refreshLucideIcons();
  }

  async function copyEmailToClipboard() {
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
      const tempInput = document.createElement('textarea');
      tempInput.value = EMAIL_ADDRESS;
      tempInput.setAttribute('readonly', '');
      tempInput.style.position = 'fixed';
      tempInput.style.left = '-9999px';
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        copied = document.execCommand('copy');
      } catch (_) {
        copied = false;
      }
      document.body.removeChild(tempInput);
    }

    const dict = I18N[currentLang];
    dom.copyTriggers.forEach((btn) => {
      const labelEl = btn.querySelector('.copy-email-label');
      btn.classList.add('is-copied');
      if (labelEl) labelEl.textContent = dict.btnCopied;
    });
    setCopyButtonsIcon('check');

    if (dom.copyToast && dom.copyToastText) {
      dom.copyToastText.textContent = dict.toastCopied;
      dom.copyToast.hidden = false;
    }

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      dom.copyTriggers.forEach((btn) => {
        btn.classList.remove('is-copied');
        const labelEl = btn.querySelector('.copy-email-label');
        if (labelEl) labelEl.textContent = I18N[currentLang].btnCopyEmail;
      });
      setCopyButtonsIcon('copy');
      if (dom.copyToast) dom.copyToast.hidden = true;
    }, 2400);
  }

  /* ========================================================================
     13. Event Listeners & Initialization
     ======================================================================== */
  function bindEvents() {
    // Language Toggle
    dom.langBtnEn.addEventListener('click', () => setLanguage('en', true, false));
    dom.langBtnVi.addEventListener('click', () => setLanguage('vi', true, false));

    // Scroll Progress & ScrollSpy
    window.addEventListener('scroll', updateScrollProgressAndSpy, { passive: true });
    window.addEventListener('resize', updateScrollProgressAndSpy, { passive: true });

    // Project Domain Filters
    dom.filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        if (!filter) return;
        currentFilter = filter;

        dom.filterButtons.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle('is-active', isActive);
          b.setAttribute('aria-selected', String(isActive));
        });

        renderProjects(true);
      });
    });

    // Project Card Click & Keyboard Activation (Event Delegation)
    dom.projectsGrid.addEventListener('click', (event) => {
      const card = event.target.closest('.project-card');
      if (!card) return;
      const projectId = card.getAttribute('data-project-id');
      if (projectId) openModal(projectId, card);
    });

    dom.projectsGrid.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('.project-card');
      if (!card) return;
      event.preventDefault();
      const projectId = card.getAttribute('data-project-id');
      if (projectId) openModal(projectId, card);
    });

    // Modal Controls
    dom.modalCloseBtn.addEventListener('click', closeModal);
    dom.modalPrevBtn.addEventListener('click', () => cycleModal(-1));
    dom.modalNextBtn.addEventListener('click', () => cycleModal(1));

    dom.modalBackdrop.addEventListener('click', (event) => {
      if (event.target === dom.modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (dom.modalBackdrop.hidden) return;
      if (event.key === 'Escape') {
        closeModal();
      } else if (event.key === 'ArrowLeft') {
        cycleModal(-1);
      } else if (event.key === 'ArrowRight') {
        cycleModal(1);
      }
    });

    // Copy Email Buttons
    dom.copyTriggers.forEach((btn) => {
      btn.addEventListener('click', copyEmailToClipboard);
    });

    // Mobile Navigation Drawer
    if (dom.mobileMenuBtn && dom.mobileDrawer) {
      dom.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = dom.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        dom.mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
        dom.mobileDrawer.hidden = isOpen;
      });

      dom.mobileNavLinks.forEach((link) => {
        link.addEventListener('click', () => {
          dom.mobileMenuBtn.setAttribute('aria-expanded', 'false');
          dom.mobileDrawer.hidden = true;
        });
      });
    }

    // Re-run Lucide icon creation once external script completes loading
    window.addEventListener('load', () => {
      refreshLucideIcons();
      updateScrollProgressAndSpy();
    });
  }

  function init() {
    let savedLang = 'en';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'vi' || stored === 'en') {
        savedLang = stored;
      }
    } catch (_) {
      savedLang = 'en';
    }

    bindEvents();
    setLanguage(savedLang, false, true);
    initRevealObserver();
    updateScrollProgressAndSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
