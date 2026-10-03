/**
 * Source unique des métadonnées SEO (title, description, canonique, hreflang,
 * Open Graph, Twitter, JSON-LD).
 *
 * Elle est consommée à deux endroits :
 *  - `src/pages/Portfolio.tsx` via Helmet, pour le rendu côté client (bascule
 *    de langue sans rechargement) ;
 *  - `scripts/prerender.mjs` via le bundle serveur, pour écrire les mêmes
 *    balises dans le HTML statique de `dist/index.html` et `dist/en/index.html`.
 *
 * Aucun texte n'est inventé : titres et descriptions viennent des dictionnaires
 * (`meta.*`), coordonnées et compétences de `src/data/profile.ts`.
 */

import { CONTACT, SKILL_DOMAINS } from '../data/profile'
import type { Language } from '../i18n'
import en from '../i18n/en'
import fr from '../i18n/fr'

const DICTIONARIES = { fr, en }

/** Constantes de déploiement — seul l'hôte est propre à l'installation. */
export const SITE = {
  origin: 'https://zaraniaina.github.io',
  name: 'Zaraniaina Emilson',
  /** Carte de partage 1200×630 (formats attendus par Facebook/LinkedIn/X). */
  ogImage: { file: 'og-image.jpg', width: 1200, height: 630 },
}

/** Base publique du site (`/portfolio/` sur un site projet GitHub Pages). */
function base(): string {
  const fromVite = import.meta.env?.BASE_URL
  return fromVite && fromVite.startsWith('/') ? fromVite : '/portfolio/'
}

function absoluteUrl(path: string): string {
  return new URL(path, SITE.origin).toString()
}

/** URL canonique d'une version : `/portfolio/` (fr) et `/portfolio/en/` (en). */
export function canonicalUrl(language: Language): string {
  const prefix = base()
  return absoluteUrl(language === 'en' ? `${prefix}en/` : prefix)
}

/** Variantes linguistiques déclarées dans les balises `hreflang`. */
export function alternateUrls(): Record<string, string> {
  return {
    fr: canonicalUrl('fr'),
    en: canonicalUrl('en'),
    'x-default': canonicalUrl('fr'),
  }
}

export function ogImageUrl(): string {
  return absoluteUrl(`${base()}${SITE.ogImage.file}`)
}

/**
 * Données structurées : une `Person` (l'auteur), une `ProfilePage` (la page
 * consultée) et le `WebSite` qui l'héberge. Les identifiants sont stables pour
 * que les trois entités se rattachent au même nœud.
 */
export function jsonLd(language: Language): Record<string, unknown> {
  const { title, description } = DICTIONARIES[language].meta
  const personId = `${SITE.origin}${base()}#person`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE.name,
        jobTitle: language === 'fr' ? 'Développeur logiciel et web' : 'Software and web developer',
        description,
        url: canonicalUrl('fr'),
        image: ogImageUrl(),
        email: `mailto:${CONTACT.email}`,
        telephone: CONTACT.phoneHref,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Toamasina',
          addressCountry: 'MG',
        },
        sameAs: [CONTACT.githubHref, CONTACT.facebookHref],
        knowsLanguage: ['mg', 'fr', 'en'],
        knowsAbout: SKILL_DOMAINS.flatMap((domain) => domain.items),
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Université de Toamasina' },
        worksFor: [
          { '@type': 'Organization', name: 'Tia Info Madagascar' },
          { '@type': 'Organization', name: 'Cyber Langa' },
          { '@type': 'Organization', name: 'Épicerie Tsararivotra' },
        ],
      },
      {
        '@type': 'ProfilePage',
        '@id': canonicalUrl(language),
        url: canonicalUrl(language),
        name: title,
        description,
        inLanguage: language,
        isPartOf: { '@id': `${SITE.origin}${base()}#website` },
        mainEntity: { '@id': personId },
        primaryImageOfPage: ogImageUrl(),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.origin}${base()}#website`,
        url: canonicalUrl('fr'),
        name: SITE.name,
        inLanguage: language,
        publisher: { '@id': personId },
      },
    ],
  }
}

/** Toutes les balises d'en-tête d'une version, prête pour Helmet ou le HTML. */
export function seoMeta(language: Language) {
  const { title, description } = DICTIONARIES[language].meta
  const image = ogImageUrl()
  return {
    title,
    description,
    canonical: canonicalUrl(language),
    alternates: alternateUrls(),
    image,
    locale: language === 'fr' ? 'fr_FR' : 'en_GB',
    alternateLocale: language === 'fr' ? 'en_GB' : 'fr_FR',
    jsonLd: JSON.stringify(jsonLd(language)),
  }
}

const escapeAttribute = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

/**
 * Bloc `<head>` complet en HTML, utilisé par le pré-rendu. L'ordre suit les
 * conventions : titre, description, robots, canonique, hreflang, Open Graph,
 * Twitter, puis les données structurées.
 */
export function seoHeadHtml(language: Language): string {
  const meta = seoMeta(language)
  const alternates = Object.entries(meta.alternates)
    .map(
      ([lang, href]) =>
        `    <link rel="alternate" hreflang="${lang}" href="${escapeAttribute(href)}" />`,
    )
    .join('\n')

  return `    <title>${escapeAttribute(meta.title)}</title>
    <meta name="description" content="${escapeAttribute(meta.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${escapeAttribute(meta.canonical)}" />
${alternates}
    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="${SITE.name}" />
    <meta property="og:title" content="${escapeAttribute(meta.title)}" />
    <meta property="og:description" content="${escapeAttribute(meta.description)}" />
    <meta property="og:url" content="${escapeAttribute(meta.canonical)}" />
    <meta property="og:locale" content="${meta.locale}" />
    <meta property="og:locale:alternate" content="${meta.alternateLocale}" />
    <meta property="og:image" content="${escapeAttribute(meta.image)}" />
    <meta property="og:image:width" content="${SITE.ogImage.width}" />
    <meta property="og:image:height" content="${SITE.ogImage.height}" />
    <meta property="og:image:alt" content="${SITE.name} — ${escapeAttribute(
      DICTIONARIES[language].nav.about,
    )}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(meta.title)}" />
    <meta name="twitter:description" content="${escapeAttribute(meta.description)}" />
    <meta name="twitter:image" content="${escapeAttribute(meta.image)}" />
    <script type="application/ld+json">${meta.jsonLd}</script>`
}