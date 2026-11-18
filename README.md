# TuanPhamj.github.io

Bilingual (EN | VI) portfolio of Phạm Anh Tuấn (Tuan Pham) — Production Planning, Lean & Data Analytics.
Static site for GitHub Pages: `index.html`, `style.css`, `script.js`. No build step.

## Adding your CV and screenshots

Both are off by default so visitors never hit a 404.

- **CV** — add `assets/cv/Pham-Anh-Tuan-CV.pdf`, then set `ASSETS.cvAvailable = true` at the top of `script.js`.
  While it is `false`, every CV button reads **Request CV** and opens an email with a prefilled subject.
- **Case-study screenshots** — add a PNG to `assets/images/` and set `image: 'assets/images/<file>.png'`
  on that project in `PROJECTS` (`script.js`). While `image` is `null`, the modal shows the generated,
  localized SVG blueprint.

## Editing content

All copy lives in `script.js`: `I18N` (UI strings), `PROJECTS`, `SKILLS_MATRIX`, `TIMELINE_ITEMS`.
Every entry has `en` and `vi` versions — keep both in sync.

## Icons

Lucide is loaded from `https://unpkg.com/lucide@latest`. If the CDN is slow or blocked, `script.js`
renders the same icons from a built-in fallback set after 2.5 s. When adding a new icon name, also add its
paths to `ICON_FALLBACK`.
