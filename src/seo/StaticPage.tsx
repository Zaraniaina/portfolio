/**
 * Enveloppe de rendu statique : la page du portfolio montée avec les
 * fournisseurs dont elle a besoin (dictionnaire, routeur, Helmet).
 *
 * Utilisée uniquement par le pré-rendu (`scripts/prerender.mjs`) — jamais
 * dans le bundle client. Aucun composant n'accède au DOM pendant le rendu
 * (les usages de `window`/`document` sont tous dans des `useEffect` ou des
 * gestionnaires d'événement), donc le rendu statique est complet.
 */

import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18n, { type Language } from '../i18n'
import { Portfolio } from '../pages/Portfolio'

export function StaticPage({ language }: { language: Language }) {
  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[language === 'en' ? '/en' : '/']}>
          {/* `withHead={false}` : l'en-tête est écrit par le script de
              pré-rendu, pas dans le corps de la page. */}
          <Portfolio language={language} withHead={false} />
        </MemoryRouter>
      </I18nextProvider>
    </HelmetProvider>
  )
}