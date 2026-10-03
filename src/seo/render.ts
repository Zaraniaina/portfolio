/**
 * Point d'entrée du pré-rendu statique (`scripts/prerender.mjs`).
 *
 * `vite build --ssr src/seo/render.ts` produit un bundle Node qui expose :
 *  - `renderPage(language)` : le HTML de la page, texte et balisage compris ;
 *  - `seoHeadHtml(language)` : le bloc `<head>` SEO de cette version.
 *
 * Les deux s'appuient sur les vrais composants et les vrais dictionnaires, donc
 * le HTML statique ne peut pas diverger de la page affichée après hydratation.
 */

import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import i18n, { type Language } from '../i18n'
import { StaticPage } from './StaticPage'

// Re-exportés pour que le script de pré-rendu ait tout depuis un seul module.
export { seoHeadHtml, seoMeta, SITE } from './head'

/**
 * Rend la page pour une langue donnée.
 *
 * i18next est initialisé à l'import du module avec les ressources en ligne ;
 * changer de langue puis attendre garantit des chaînes déjà traduites au
 * moment du rendu.
 */
export async function renderPage(language: Language): Promise<string> {
  await i18n.changeLanguage(language)
  return renderToStaticMarkup(createElement(StaticPage, { language }))
}