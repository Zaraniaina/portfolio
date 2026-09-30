# AGENTS.md

Personal portfolio site for Zaraniaina Emilson (software/web developer, Toamasina, Madagascar). React 19 + TypeScript + Vite 8, static site (GitHub Pages / Netlify / Vercel).

## Current state: the site is built and working

A complete bilingual single-page portfolio exists: hero, about, projects, skills, career timeline, contact, footer. `npm run build` and `npm run lint` both pass. `README.md` is real project documentation (setup, editing content, adding a language, deploying) — read it before changing structure.

Language is chosen by **route**: `/` is French, `/en` is English, and one `Portfolio` component serves both. `vite.config.ts` sets `base: './'` so the build works from any sub-path (GitHub Pages project sites).

Still missing because the source data is genuinely unavailable — do not fabricate them: TiaInfoBuild demo URL and screenshots, LinkedIn, the FR/EN CV PDFs, and an AI/MCP project. These are `null` in `src/data/` and their UI is omitted.

Unused dependencies that are installed but never imported: `framer-motion`, `@emailjs/browser`, `postcss`, `autoprefixer`. Tailwind v4 works through `@tailwindcss/vite` with no PostCSS config. Don't assume a package in `package.json` is in use — grep for it first.

## Source of truth lives in `docs/` (gitignored — read it, don't commit it)

`docs/` is listed in `.gitignore`, along with `.env` and `.opencode`. It is the brief, and it is authoritative over anything you infer from the code:

- `docs/design.md` — the full design system: exact palette, typography, spacing, components, icon mapping, a11y rules, and an explicit **"Interdits"** forbidden list.
- `docs/portfolio_zaraniaina.md` — all real content (profile, experience, education, skills, contact).
- `docs/projets.md` — the projects to display. Items in `[brackets]` are placeholders awaiting real demo links, screenshots, and figures.
- `docs/prompt_portfolio.md` — the original build spec (page order, i18n rules, quality bar, deliverables).

**Do not invent data.** If a demo link, screenshot, LinkedIn URL, or figure is missing, hide that element cleanly rather than rendering lorem ipsum, a placeholder, or a fabricated number.

## Design rules that are easy to violate by accident

From `docs/design.md` §11 and §2–§10. These are constraints, not suggestions:

- **No orange.** No terracotta, amber, coral, or any warm hue — including for warnings. `warning` is muted mustard `#B0913A`, `error` is raspberry `#B0526A`, never red.
- **Zero emoji.** Any visual information is a Lucide icon instead. Decorative icons get `aria-hidden="true"`; if an icon alone carries meaning, it needs an `aria-label`.
- **Lucide only.** Do not mix in another icon library. Stroke width `1.75`, size `18px` inline / `24px` in cards / `28px` on section headers, color `currentColor`.
- **No pure `#FFFFFF` background and no pure `#000000` text.** Even the dark theme is a softened slate blue.
- **No forced uppercase** on titles or labels, sentence case throughout. No `01 / 02 / 03` numbering outside the chronological timeline.
- **No decorative gradients, no strong shadows.** Hierarchy comes from borders and background color. The only sanctioned shadow is `0 1px 2px rgba(36, 52, 63, 0.06)`.
- **No auto-appended arrows** at the end of buttons. No hover-zoom on cards — only a border shift to `--accent-deco`.
- **Motion is minimal**: one 300ms entrance on the hero, 150ms color transitions on interactive elements, no scroll/parallax animation, and a global `prefers-reduced-motion` kill switch.
- Never convey information by color alone — pair it with an icon or text.

Theming is CSS custom properties (see §2 of `design.md` for the full light + dark block). Dark mode is driven by `:root[data-theme="dark"]` with a `prefers-color-scheme` fallback for `:root:not([data-theme="light"])`. **Reuse those variables; do not hardcode hex values in components.**

Typography: Sora (headings), Nunito Sans (body), JetBrains Mono (code), loaded from Google Fonts. Measure caps at `65ch`; everything is left-aligned, never justified. Content width `1100px`; breakpoints are mobile `≤640px`, tablet `641–1024px`, desktop `>1024px`.

## Text lives in the dictionaries, never in components

`src/i18n/fr.ts` and `src/i18n/en.ts` hold **every** user-facing string. `src/data/*.ts` holds only structure (ids, dates, links, technology names) and never a sentence. Both dictionaries are `as const` and must stay in sync — a key added to one and not the other renders as the raw key path.

Technology names are never translated; group headings (Frontend, Backend, Données/Data) are interface text and live in the dictionaries under `stack.*` / `skills.domains.*`.

FR is the default and `navigator.language` is deliberately **not** consulted: a first-time visitor sees French even if their browser asks for English. Only an explicit choice persisted in `localStorage` switches language, and every `localStorage` and `matchMedia` call is wrapped in `try/catch` because both throw in restricted modes.

## Known non-obvious constraints

- **Tailwind v4 tokens are declared with `@theme inline`** in `src/index.css`, referencing the `:root` variables. That indirection is what makes the theme switch work — hardcoding a hex in a component silently breaks dark mode. There is no `tailwind.config.js` and no PostCSS config; do not add one expecting it to be read.
- **Both dark-theme blocks must carry the same tokens.** There are two: `:root[data-theme="dark"]` (explicit choice) and `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`. Adding a token to one and not the other makes it disappear when the OS preference is the source.
- **`--lavender` is decorative only.** It fails contrast as text on a light background, which `design.md` §2 forbids. Text-safe lavender is the separate `--lavender-ink` token.
- **The mobile menu panel is a sibling of `<header>`, not a child.** The header sets `backdrop-filter`, which makes it the containing block for `position: fixed` descendants — nesting the panel inside traps it in the 64px header.
- **Hero photo is a square WebP crop** (`src/assets/moi.webp`, 499×499) derived from a 499×876 portrait source. `design.md` §9 asks for 800×800 minimum; the source is too small to reach that without upscaling, so the crop is kept at native resolution. Replace the file if a larger original becomes available, and keep it square.
- **`icon` names in data files are strings** (`'terminal'`, `'bot'`) resolved through the registry in `src/components/Icon.tsx`. A typo is a runtime lookup failure, not a type error. Note Lucide v1 has no `github`/`linkedin` brand icons; repository links reuse `code-xml`.
- **`react-helmet-async` owns `<html lang>`, the title, meta and JSON-LD.** `src/pages/Portfolio.tsx` sets `data-*` language via `document.documentElement.lang`; don't duplicate head tags in `index.html` beyond the static defaults.

## TypeScript config traps

`tsconfig.app.json` is **not** the stock Vite template. It omits `strict` — do not assume strict null checks are on, and do not "fix" this silently.

- `verbatimModuleSyntax: true` → type-only imports **must** use `import type { X }`, otherwise `tsc -b` fails.
- `erasableSyntaxOnly: true` → **no** `enum`, no constructor parameter properties, no `namespace`. Use const objects + union types.
- `noUnusedLocals` / `noUnusedParameters` → an unused import fails the build.
- **No `paths` / `baseUrl`** → there are no import aliases. Use relative imports.
- `tsc -b` is a build reference project (`tsconfig.json` → `.app.json` + `.node.json`).

## Commands

```bash
npm run dev       # vite dev server
npm run build     # tsc -b && vite build  — typecheck gates the build
npm run preview   # serve dist/
npm run lint      # eslint . (flat config, non-type-aware)
```

`npm run build` and `npm run lint` both pass on the current tree. There is **no test script and no test framework installed** — don't invent a test command, and don't claim tests pass.

ESLint uses `typescript-eslint` **recommended** (not type-checked rules) with `react-hooks` and `react-refresh`. React Compiler is deliberately not enabled. Single file check: `npx eslint src/path/file.tsx`.

## i18n requirements

The spec (`docs/prompt_portfolio.md`) requires `/` and `/en`, `hreflang` tags, per-language `<html lang>`, translated title and description, and a `FR | EN` nav selector visible on mobile. All of this exists.

Translate naturally, not literally — job titles are adapted to English ("Assistant projet informatique" → "IT Project Assistant"), technology names are left alone. The CV download button needs two targets (FR PDF on `/`, EN PDF on `/en`) once the PDFs exist; the button is currently omitted because the files don't exist.

## graphify

`graphify-out/` holds a knowledge graph **of the `docs/` spec corpus** (132 nodes, 202 edges, 14 communities) — design tokens, forbidden rules, content entities, and the cross-document conflicts. The previous config-only graph is preserved in `graphify-out/_prev-config-graph/`.

It's a docs graph, not a code graph: the `src/` files are not in it, so use it to answer questions about the *brief* and its internal contradictions, not about the implementation. Query it with `graphify query "<question>"` rather than re-running extraction.

## Environment quirks

- The project path **contains a space** (`D:\ZID projet\...`). Quote it in shell commands or set it as the working directory.
- **This is not a git repository.** There are no branch, commit, or PR conventions to follow, and nothing is tracked — `docs/` is gitignored anyway.
- The contact form has **no backend**: it opens a prefilled `mailto:` via `window.location.assign`. A Formspree or similar endpoint can be swapped in when one exists, but don't invent an endpoint ID.
- Only "Toamasina, Madagascar" is published — never the full street address from `docs/portfolio_zaraniaina.md` §11, which carries an explicit confidentiality warning.
- `public/` holds only `favicon.svg` and `icons.svg` (both from the Vite template, `icons.svg` currently unreferenced). The profile photo is bundled from `src/assets/moi.webp` because it needs hashing and transforms — assets under `public/` are served as-is and cannot be imported from JS.
- Photo specs: square, `border-radius: 20px` (not a circle), WebP. Project screenshots 16:10, `loading="lazy"` below the fold, descriptive `alt`.
- The user's content and design docs are in **French**. Reply in French unless asked otherwise, and keep all user-facing site copy in French by default.
