/**
 * Structural content data. Prose lives in `src/i18n/fr.ts` and
 * `src/i18n/en.ts`; this file holds only ids, dates, links and technology
 * names, so no user-facing sentence is hardcoded here.
 *
 * Anything the source documents mark as unavailable is `null` and is omitted
 * from the UI rather than filled with a placeholder
 * (docs/prompt_portfolio.md: « N'invente aucune donnée »).
 */

export type Contact = {
  email: string
  phoneDisplay: string
  phoneHref: string
  whatsappHref: string
  githubHref: string
  facebookHref: string
  /** Full street address is deliberately not published — see docs/§11. */
  location: string
}

export const CONTACT: Contact = {
  email: '038zaraniaina@gmail.com',
  phoneDisplay: '032 91 676 67',
  phoneHref: 'tel:+261329167667',
  whatsappHref: 'https://wa.me/261329167667',
  githubHref: 'https://github.com/Zaraniaina',
  facebookHref: 'https://www.facebook.com/stan.lay.196400/',
  location: 'Toamasina, Madagascar',
}

export type Role = {
  id: string
  /** ISO year-month, so dates can be localised properly. */
  start: string
  end: string | null
  location: string
}

export const ROLES: Role[] = [
  { id: 'tiaInfo', start: '2026-07', end: '2026-09', location: 'Mangarano II, Toamasina' },
  { id: 'cyberLangaSupport', start: '2025-06', end: '2025-11', location: 'Morarano, Toamasina' },
  { id: 'tsararivotra', start: '2025-01', end: '2025-03', location: 'Verrery, Toamasina' },
  { id: 'cyberLangaDev', start: '2024-10', end: '2024-12', location: 'Morarano, Toamasina' },
]

export type Degree = {
  id: string
  start: string
  end: string
  inProgress?: boolean
  /** Secondary school diplomas are not tied to one institution in the source. */
  location?: string
}

export const DEGREES: Degree[] = [
  { id: 'master2', start: '2025', end: '2026', inProgress: true, location: 'Université de Toamasina' },
  { id: 'licence', start: '2023', end: '2024', location: 'Université de Toamasina' },
  { id: 'bacc', start: '2020', end: '2021' },
  { id: 'bepc', start: '2017', end: '2018' },
  { id: 'cepe', start: '2013', end: '2014' },
]

export type SkillDomainId =
  | 'languages'
  | 'web'
  | 'database'
  | 'tools'
  | 'ai'
  | 'api'
  | 'other'

/**
 * `icon` names map to Lucide components in `src/components/icons.ts`.
 * The AI domain uses the lavender badge variant (docs/design.md §7) so it is
 * visually distinguishable from the engineering domains.
 */
export type SkillDomain = {
  id: SkillDomainId
  icon: string
  /** Lavender badge treatment, per design.md §7. */
  tone?: 'lavender'
  items: string[]
}

export const SKILL_DOMAINS: SkillDomain[] = [
  { id: 'languages', icon: 'terminal', items: ['Java', 'Python', 'PHP', 'JavaScript', 'Rust'] },
  {
    id: 'web',
    icon: 'layoutTemplate',
    items: ['Spring Boot', 'FastAPI', 'React', 'Vue.js', 'Tauri', 'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS'],
  },
  { id: 'database', icon: 'database', items: ['MySQL', 'PostgreSQL', 'SQLite', 'H2', 'SQL'] },
  { id: 'tools', icon: 'gitBranch', items: ['Git', 'GitHub', 'UML', 'MERISE'] },
  {
    id: 'ai',
    icon: 'bot',
    tone: 'lavender',
    items: ['LLM', 'Prompt Engineering', 'AI Coding Agents', 'Skills & Agents IA'],
  },
  { id: 'api', icon: 'plug', items: ['API REST', 'MCP', 'JSON', 'XML'] },
  // The `other` domain is prose rather than technology names, so its items come
  // from the dictionaries (`skills.other`) instead of this file.
  { id: 'other', icon: 'wrench', items: [] },
]
