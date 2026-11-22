# TuanPhamj.github.io

Bilingual (VI | EN) 2-section portfolio of Phạm Anh Tuấn — Production Planning, Lean & Operations Analytics.
Static site for GitHub Pages: `index.html`, `style.css`, `script.js`. No build step.

## Architecture

1. **Section 1 (`#overview`)** — Asymmetric 3-card Bento Grid: Profile & Shop-Floor Experience, Education/Certification/Leadership, and Functionally Grouped Core Tools.
2. **Section 2 (`#projects`)** — 2×2 Outcome-First Featured Projects Grid with an accessible 4-part Detail Modal (`Context & Objective`, `Tools & Methodology`, `Deliverables`, `Key Outcomes`).

## Adding your CV PDF

- Add `assets/cv/Pham-Anh-Tuan-CV.pdf`, then set `ASSETS.cvAvailable = true` at the top of `script.js`.
- While `ASSETS.cvAvailable` is `false`, CV buttons route to a prefilled CV request email so visitors never hit a 404.

## Editing Content

All bilingual UI strings (`I18N`) and project data (`PROJECTS`) live in `script.js` with full `vi` and `en` parity.

## Project Visuals & Motion

- Each project card has an animated mini-chart built in `script.js` (`renderViz` → `vizSmed`, `vizOee`, `vizGantt`, `vizQr`), selected by the `visual` field in `PROJECTS`. Charts are hydrated when the card scrolls into view, replay on hover, and render in their final state under `prefers-reduced-motion`.
- Chart numbers come from the source documents: PRJ-01 SMED proposal (internal changeover ≈16.5′ → target ≤10′, 11 → 9 steps) and PRJ-02 OEE report (A 79.78% × P 60% × Q 85%). PRJ-03/04 charts are illustrative.
- Project images live in `assets/images/projects/` (WebP) and are listed in a project's `gallery` array with bilingual `alt`/`caption`; they appear in the detail modal. Item types: a plain photo (2-column grid), `wide: true` for screenshots shown uncropped at full width, and `kind: 'pair'` with `before`/`after` images for 5S before/after evidence. An optional `galleryNote` adds a one-line context sentence.
- `demoUrl` on a project adds a "Live demo" button to its card and modal (PRJ-03 → productionscheduler.vercel.app).
- Motion tokens (`--ease-*`, `--dur-*`) and data-viz colors (`--viz-*`) are defined in `:root` in `style.css`.

