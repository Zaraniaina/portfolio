import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Journey } from '../components/Journey'
import { Nav } from '../components/Nav'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills'
import { CONTACT } from '../data/profile'
import type { Language } from '../i18n'

/**
 * One page, rendered in two languages. The same component serves `/` and `/en`;
 * only the dictionary, the `<html lang>` value and the SEO tags differ.
 */
export function Portfolio({ language }: { language: Language }) {
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
      <Helmet>
        <html lang={language} />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />

        {/* Reciprocal hreflang plus x-default pointing at the French version. */}
        <link rel="alternate" hrefLang="fr" href={`${import.meta.env.BASE_URL}`} />
        <link rel="alternate" hrefLang="en" href={`${import.meta.env.BASE_URL}en/`} />
        <link rel="alternate" hrefLang="x-default" href={`${import.meta.env.BASE_URL}`} />

        <meta property="og:type" content="profile" />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_GB'} />
        <meta name="twitter:card" content="summary" />

        {/* Structured data — design.md / spec §SEO asks for a Person entity. */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Zaraniaina Emilson',
            jobTitle:
              language === 'fr'
                ? 'Développeur logiciel et web'
                : 'Software and web developer',
            email: `mailto:${CONTACT.email}`,
            telephone: CONTACT.phoneHref,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Toamasina',
              addressCountry: 'MG',
            },
            sameAs: [CONTACT.githubHref],
            knowsLanguage: ['mg', 'fr', 'en'],
          })}
        </script>
      </Helmet>

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
