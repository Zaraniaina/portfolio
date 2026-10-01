/**
 * Retire l'écran de chargement défini dans index.html.
 *
 * Le splash est du HTML statique : il s'affiche instantanément, avant même le
 * téléchargement du bundle. Cette fonction le fait sortir une fois l'application
 * montée, en respectant une durée minimale d'affichage pour que le logo ne
 * « clignote » pas quand tout est déjà en cache. Un filet de sécurité existe
 * côté HTML (`splash-stuck`) au cas où ce module ne s'exécuterait jamais.
 */

/** Durée minimale d'affichage du splash, mesurée depuis le démarrage du module. */
const SPLASH_MIN_MS = import.meta.env.DEV ? 400 : 900

const startedAt = performance.now()

export function removeSplash(): void {
  const splash = document.getElementById('splash')
  if (!splash) return

  document.documentElement.classList.remove('splash-stuck')

  const wait = Math.max(0, SPLASH_MIN_MS - (performance.now() - startedAt))
  window.setTimeout(() => {
    splash.classList.add('splash-leaving')
    window.setTimeout(() => splash.remove(), 450)
  }, wait)
}
