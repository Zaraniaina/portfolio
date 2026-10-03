/**
 * Retire l'écran de chargement défini dans index.html.
 *
 * Le splash est du HTML statique : il s'affiche instantanément, avant même le
 * téléchargement du bundle. Il ne sert qu'à la toute première ouverture de
 * l'onglet (5 s) ; un marqueur en `sessionStorage` en garde la mémoire. Tous
 * les chargements suivants de la même session — rechargement, `/en` tapé
 * directement, retour arrière — n'affichent aucun splash : le HTML est déjà
 * pré-rendu et servi depuis le cache, et le masquer ferait perdre 1 s
 * visibles pour rien.
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
/** Durée de l'écran complet, à la première ouverture de la session. */
const FIRST_VISIT_MS = 5000
/** Visites suivantes : aucune — le splash est retiré sans animation. */
const RETURN_VISIT_MS = 0

const startedAt = performance.now()

declare global {
  interface Window {
    /** Hook du script inline de index.html : affiche 100 % avant la sortie. */
    __splashFinish?: () => void
    /** Durée retenue par le script inline de index.html (5000 ou 0). */
    __splashDurationMs?: number
    /** true si le splash complet est affiché (première ouverture de la session). */
    __splashFirstVisit?: boolean
    /** true si la session est déjà marquée : le splash ne doit pas s'afficher. */
    __splashSkip?: boolean
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

  const duration = resolveDuration()

  // Session déjà marquée : le splash a été masqué dès la première frame par
  // `html.splash-skip`. On le supprime sans animation de sortie — la page est
  // visible en dessous, il n'y a rien à faire disparaître.
  if (duration === 0) {
    splash.remove()
    return
  }

  const wait = Math.max(0, duration - (performance.now() - startedAt))
  window.setTimeout(() => {
    window.__splashFinish?.()
    splash.classList.add('splash-leaving')
    window.setTimeout(() => splash.remove(), 450)
  }, wait)
}
