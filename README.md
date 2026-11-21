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

## LinkedIn / GitHub

Set `ASSETS.linkedinUrl` / `ASSETS.githubUrl` in `script.js` to a full `https://` URL and the matching row
appears in Contact. While `null`, the row stays hidden. When you add LinkedIn, also add it as
`"sameAs": ["<url>"]` in the JSON-LD block in `index.html`.

## Sharing a language-specific link

`?lang=vi` (or `?lang=en`) opens the page in that language, e.g. `https://tuanphamj.github.io/?lang=vi` for
Vietnamese-speaking HR. Without it, the visitor's last choice (or English) is used.

## Link preview image

`assets/images/og-cover.png` (1200×630) is what LinkedIn, Zalo and Facebook show when the link is shared.
Regenerate it if your headline changes. Social apps cache previews, so re-scrape the URL in their
debug tools after updating.

## The PRJ-01 interactive illustration

The Heijunka vs. random line widget under the case studies uses **illustrative values**, not plant data, and
says so on screen. Its stage utilisations are kept consistent with the line-balance KPI
(line balance = mean ÷ max utilisation). If you change one, update the other (`syncSimModeDom` in `script.js`
and the `stage*Metric*` strings).

## Editing content

All copy lives in `script.js`: `I18N` (UI strings), `PROJECTS`, `SKILLS_MATRIX`, `TIMELINE_ITEMS`.
Every entry has `en` and `vi` versions — keep both in sync.

## Icons

Lucide is loaded from unpkg, pinned to `lucide@1.66.0` so a new release can't rename or drop an icon.
If the CDN is slow or blocked, `script.js` renders the same icons from a built-in fallback set after 2.5 s.
When adding a new icon name, check it exists in the pinned version and add its paths to `ICON_FALLBACK`.
Lucide no longer ships brand logos (LinkedIn, GitHub), so those rows use the generic `link` / `code-xml` icons.
