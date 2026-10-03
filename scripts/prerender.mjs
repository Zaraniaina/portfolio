/**
 * Pré-rendu statique du portfolio (après `vite build`).
 *
 * Ce que la SPA seule ne peut pas donner :
 *  - `/portfolio/` et `/portfolio/en/` deviennent deux fichiers HTML réels, donc
 *    deux URL indexables en HTTP 200 (avant, `/en` répondait 404 via le
 *    fallback GitHub Pages, ce qui est une erreur de crawl) ;
 *  - le HTML servi contient le texte, le `<h1>` et les liens, donc il est
 *    lisible sans JavaScript et par les extracteurs sociaux (Facebook,
 *    LinkedIn, WhatsApp, X…) qui n'exécutent jamais le bundle ;
 *  - les balises SEO (canonique, hreflang, Open Graph, Twitter, JSON-LD) sont
 *    présentes dès la première réponse, au lieu d'être injectées au runtime.
 *
 * Le contenu vient des vrais composants et des vrais dictionnaires : il ne peut
 * pas diverger de ce qui est affiché après hydratation.
 *
 * Usage : `node scripts/prerender.mjs` (appelé par `npm run build`).
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SSR_DIR = join(ROOT, '.seo-ssr')
const LANGUAGES = ['fr', 'en']

/** 1. Compile l'entrée serveur (TSX + composants) avec le Vite du projet. */
function buildServerBundle() {
  const vite = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js')
  if (!existsSync(vite)) throw new Error('Vite introuvable — lancez `npm ci` avant.')
  rmSync(SSR_DIR, { recursive: true, force: true })
  execFileSync(
    process.execPath,
    [vite, 'build', '--ssr', 'src/seo/render.ts', '--outDir', SSR_DIR, '--logLevel', 'warn'],
    { cwd: ROOT, stdio: ['ignore', 'inherit', 'inherit'] },
  )
  const entry = readdirSync(SSR_DIR).find((file) => file.endsWith('.js'))
  if (!entry) throw new Error(`Aucune sortie JS dans ${SSR_DIR}`)
  return pathToFileURL(join(SSR_DIR, entry)).href
}

/** Remplace le contenu entre deux marqueurs (ou le marqueur seul). */
function replaceBlock(html, marker, replacement) {
  const pattern = new RegExp(
    `<!--\\s*${marker}:start\\s*-->.*?<!--\\s*${marker}:end\\s*-->`,
    's',
  )
  if (!pattern.test(html)) {
    throw new Error(`Marqueur « ${marker} » introuvable dans dist/index.html`)
  }
  return html.replace(pattern, replacement)
}

/** Injecte le contenu rendu dans <div id="root"> de la page statique. */
function injectRoot(html, markup) {
  const pattern = /(<div id="root"[^>]*>)([\s\S]*?)(<\/div>)/
  if (!pattern.test(html)) throw new Error('<div id="root"> introuvable dans dist/index.html')
  return html.replace(pattern, (_match, open, _inner, close) => `${open}${markup}${close}`)
}

async function main() {
  const module = await import(await buildServerBundle())
  const template = readFileSync(join(DIST, 'index.html'), 'utf8')

  for (const language of LANGUAGES) {
    const head = module.seoHeadHtml(language)
    const body = await module.renderPage(language)
    let page = replaceBlock(template, 'seo', head)
    page = injectRoot(page, body)
    page = page.replace('<html lang="fr">', `<html lang="${language}">`)

    const target = language === 'en' ? join(DIST, 'en', 'index.html') : join(DIST, 'index.html')
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, page, 'utf8')
    console.log(`[prerender] ${language} → ${target.replace(ROOT, '.')} (${body.length} octets de contenu)`)
  }

  // Fallback SPA de GitHub Pages : servi sur toute URL inconnue, donc jamais
  // indexable — `noindex` explicite, canonique vers la page française.
  const notFound = replaceBlock(
    template,
    'seo',
    `    <title>Page introuvable — ${module.SITE.name}</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${module.seoMeta('fr').canonical}" />
    <meta http-equiv="refresh" content="0; url=${module.seoMeta('fr').canonical}" />`,
  )
  writeFileSync(join(DIST, '404.html'), notFound, 'utf8')
  console.log('[prerender] 404.html (noindex, redirection vers la page française)')

  // Sitemap : uniquement les deux URL canoniques, avec un `lastmod` mis à jour
  // à chaque déploiement plutôt qu'une date figée dans le dépôt.
  const today = new Date().toISOString().slice(0, 10)
  const urls = LANGUAGES.map((language) => {
    const canonical = module.seoMeta(language).canonical
    return `  <url>
    <loc>${canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${language === 'fr' ? '1.0' : '0.9'}</priority>
  </url>`
  }).join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8')
  console.log(`[prerender] sitemap.xml (${LANGUAGES.length} URL, lastmod ${today})`)

  rmSync(SSR_DIR, { recursive: true, force: true })
}

await main()