/**
 * Retire l'écran de chargement défini dans index.html.
 *
 * Le splash est du HTML statique : il s'affiche instantanément, avant même le
 * téléchargement du bundle. Cette fonction le fait sortir une fois l'application
 * montée, en respectant une durée minimale d'affichage de 5 secondes (demande
 * utilisateur) pour que le logo ne « clignote » pas quand tout est déjà en cache.
 * À la sortie, la barre et le pourcentage passent à 100 % via le hook
 * `__splashFinish` exposé par le script inline de index.html. Un filet de
 * sécurité existe côté HTML (`splash-stuck`) au cas où ce module ne
 * s'exécuterait jamais.
 */

/** Durée minimale d'affichage du splash, mesurée depuis le démarrage du module. */
const SPLASH_MIN_MS = 5000

const startedAt = performance.now()

declare global {
  interface Window {
    /** Hook du script inline de index.html : affiche 100 % avant la sortie. */
    __splashFinish?: () => void
  }
}

export function removeSplash(): void {
  const splash = document.getElementById('splash')
  if (!splash) return

  document.documentElement.classList.remove('splash-stuck')

  const wait = Math.max(0, SPLASH_MIN_MS - (performance.now() - startedAt))
  window.setTimeout(() => {
    window.__splashFinish?.()
    splash.classList.add('splash-leaving')
    window.setTimeout(() => splash.remove(), 450)
  }, wait)
}
