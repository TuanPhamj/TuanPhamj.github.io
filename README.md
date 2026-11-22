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
