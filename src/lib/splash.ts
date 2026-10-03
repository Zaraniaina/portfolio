/**
 * Retire l'écran de chargement défini dans index.html.
 *
 * Le splash est du HTML statique : il s'affiche instantanément, avant même le
 * téléchargement du bundle. L'écran complet (5 s) n'est montré qu'à la
 * première visite de la session — un marqueur en `sessionStorage` en garde la
 * mémoire — ; toutes les visites suivantes sont abrégées à 1 s.
 *
 * La durée est décidée par le script inline du `<head>` de index.html, avant le
 * premier rendu, pour que l'animation CSS de la barre, le pourcentage et ce
 * module partagent exactement la même valeur (window.__splashDurationMs). À la
 * sortie, la barre et le pourcentage passent à 100 % via le hook
 * `__splashFinish` exposé par le même script. Un filet de sécurité existe côté
 * HTML (`splash-stuck`) au cas où ce module ne s'exécuterait jamais.
 */

/** Clé du marqueur de session : un splash complet a déjà été affiché. */
const SEEN_KEY = 'zaraniaina:splash-seen'
/** Durée de l'écran complet, à la première visite de la session. */
const FIRST_VISIT_MS = 5000
/** Durée des visites suivantes. */
const RETURN_VISIT_MS = 1000

const startedAt = performance.now()

declare global {
  interface Window {
    /** Hook du script inline de index.html : affiche 100 % avant la sortie. */
    __splashFinish?: () => void
    /** Durée retenue par le script inline de index.html (5000 ou 1000). */
    __splashDurationMs?: number
    /** true si le splash complet est affiché (première visite de la session). */
    __splashFirstVisit?: boolean
  }
}

/** Rejoue la décision du script inline si celui-ci n'a pas pu s'exécuter. */
function resolveDuration(): number {
  if (window.__splashDurationMs === undefined) {
    let firstVisit = true
    try {
      firstVisit = window.sessionStorage.getItem(SEEN_KEY) === null
      if (firstVisit) window.sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* sessionStorage indisponible : on garde le splash complet. */
    }
    window.__splashFirstVisit = firstVisit
    window.__splashDurationMs = firstVisit ? FIRST_VISIT_MS : RETURN_VISIT_MS
  }
  // Le marqueur n'est posé que si le script inline ne l'a pas déjà fait.
  if (window.__splashFirstVisit) {
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* rien à faire : le splash complet s'affichera à chaque visite */
    }
  }
  return window.__splashDurationMs
}

export function removeSplash(): void {
  const splash = document.getElementById('splash')
  if (!splash) return

  document.documentElement.classList.remove('splash-stuck')

  const wait = Math.max(0, resolveDuration() - (performance.now() - startedAt))
  window.setTimeout(() => {
    window.__splashFinish?.()
    splash.classList.add('splash-leaving')
    window.setTimeout(() => splash.remove(), 450)
  }, wait)
}
