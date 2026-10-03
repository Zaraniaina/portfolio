import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Journey } from '../components/Journey'
import { Nav } from '../components/Nav'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills'
import type { Language } from '../i18n'
import { SeoHead } from '../seo/SeoHead'

/**
 * One page, rendered in two languages. The same component serves `/` and `/en`;
 * only the dictionary, the `<html lang>` value and the SEO tags differ.
 */
export function Portfolio({
  language,
  withHead = true,
}: {
  language: Language
  /**
   * Le pré-rendu statique passe `false` : les balises d'en-tête sont alors
   * écrites directement dans le HTML par scripts/prerender.mjs. Les laisser
   * rendues ici les dupliquerait dans le corps de la page.
   */
  withHead?: boolean
}) {
  const { t, i18n } = useTranslation()

  // Keep react-i18next in step when the route changes language.
  useEffect(() => {
    if (i18n.language !== language) void i18n.changeLanguage(language)
  }, [language, i18n])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <>
      {withHead && <SeoHead language={language} />}

      {/*
        First tabbable element on the page, per WCAG 2.4.1. It stays
        `sr-only` (zero size) until focused, which is why it does not show up
        in tap-target audits.
      */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-[10px] focus:bg-surface focus:px-4"
      >
        {t('nav.projects')}
      </a>

      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
