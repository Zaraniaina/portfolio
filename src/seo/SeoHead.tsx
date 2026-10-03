/**
 * Balises d'en-tête pilotées à l'exécution (Helmet).
 *
 * Elles ne servent qu'aux changements de langue faits côté client : le routeur
 * bascule entre `/` et `/en` sans rechargement, alors que le HTML statique
 * écrit par `scripts/prerender.mjs` ne couvre que la page réellement servie.
 *
 * Au premier rendu elles sont donc volontairement absentes : Helmet ajouterait
 * un second `<title>` et un second bloc JSON-LD à ceux déjà présents dans le
 * document, et deux blocs de données structurées sur une même page sont
 * précisément ce que Google signale comme doublon. Elles ne sont montées que si
 * la langue demandée diffère de celle du HTML servi.
 *
 * Après une bascule de langue sans rechargement, le document contient donc les
 * balises du HTML servi et celles de la nouvelle langue en parallèle. Sans
 * conséquence pour l'indexation : un robot charge l'URL, il ne clique pas sur
 * le sélecteur de langue, et chaque URL est servie avec ses propres balises.
 */

import { Helmet } from 'react-helmet-async'
import type { Language } from '../i18n'
import { seoMeta } from './head'

/**
 * Langue du HTML servi, lue une seule fois au premier rendu. Le module est
 * réinitialisé à chaque chargement de page, la valeur ne sert donc que de
 * référence : au premier rendu la langue du routeur lui correspond, et seule
 * une bascule ultérieure la rend différente.
 */
let servedLanguage: string | undefined

function getServedLanguage(): string {
  if (servedLanguage === undefined && typeof document !== 'undefined') {
    servedLanguage = document.documentElement.lang
  }
  return servedLanguage ?? ''
}

export function SeoHead({ language }: { language: Language }) {
  const outOfSync = language !== getServedLanguage()

  if (!outOfSync) return null

  const seo = seoMeta(language)

  return (
    <Helmet>
      <html lang={language} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />

      {/* Reciprocal hreflang plus x-default pointing at the French version. */}
      {Object.entries(seo.alternates).map(([lang, href]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      <meta property="og:type" content="profile" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Structured data — design.md / spec §SEO asks for a Person entity. */}
      <script type="application/ld+json">{seo.jsonLd}</script>
    </Helmet>
  )
}
