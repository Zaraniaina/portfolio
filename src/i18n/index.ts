import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import fr from './fr'

export const LANGUAGES = ['fr', 'en'] as const
export type Language = (typeof LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = 'fr'
const STORAGE_KEY = 'zaraniaina.lang'

/**
 * Reading the stored preference is wrapped because localStorage throws in
 * private-browsing modes and when cookies/storage are blocked. A read failure
 * must degrade to the default language, never crash the app.
 *
 * Note we deliberately do NOT consult `navigator.language`: French is the
 * default for a first-time visitor even if their browser asks for English.
 * Only an explicit choice stored here switches the language.
 */
function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(stored as Language) ? (stored as Language) : null
  } catch {
    return null
  }
}

export function persistLanguage(language: Language): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, language)
  } catch {
    /* Storage unavailable — the choice simply won't survive a reload. */
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: readStoredLanguage() ?? DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...LANGUAGES],
  interpolation: { escapeValue: false },
  returnNull: false,
})

/** Switch language and remember it. */
export function setLanguage(language: Language): void {
  void i18n.changeLanguage(language)
  persistLanguage(language)
}

export default i18n
