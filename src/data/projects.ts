/**
 * Project structure. Titles and prose live in the dictionaries
 * (`projects.items.<id>`); this file holds flags, technology names and links.
 *
 * Missing values are `null` and their UI is omitted entirely — no placeholder
 * text, no example link (docs/prompt_portfolio.md).
 */
export type Project = {
  id: string
  /** The flagship project renders as a wide card above the grid. */
  featured: boolean
  /**
   * Technology groups. `labelKey` is a translation key — the group headings are
   * interface text, so they must not stay hardcoded in French. `items` are
   * technology names, which are never translated.
   */
  stack: { labelKey: string; items: string[] }[]
  repoUrl: string | null
  demoUrl: string | null
  /** 16:10 capture, per docs/design.md §9. Null until screenshots exist. */
  image: string | null
  imageAlt: string | null
}

export const PROJECTS: Project[] = [
  {
    id: 'tiainfobuild',
    featured: true,
    stack: [
      { labelKey: 'stack.frontend', items: ['React', 'TypeScript', 'Vite'] },
      { labelKey: 'stack.backend', items: ['Python', 'API REST', 'JWT'] },
      { labelKey: 'stack.desktop', items: ['Tauri 2', 'Rust'] },
      { labelKey: 'stack.data', items: ['SQLite', 'SQLCipher'] },
      { labelKey: 'stack.tests', items: ['pytest', 'cargo test'] },
    ],
    repoUrl: 'https://github.com/Zaraniaina/TiaInfoBuild',
    // No public demo URL and no screenshots are available yet; both are
    // rendered as absent rather than as placeholders.
    demoUrl: null,
    image: null,
    imageAlt: null,
  },
  {
    id: 'epicerie',
    featured: false,
    stack: [],
    repoUrl: null,
    demoUrl: null,
    image: null,
    imageAlt: null,
  },
  {
    id: 'cyberlanga',
    featured: false,
    stack: [],
    repoUrl: null,
    demoUrl: null,
    image: null,
    imageAlt: null,
  },
]
