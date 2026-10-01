import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './i18n'
import App from './App.tsx'
import './index.css'
import { removeSplash } from './lib/splash'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)

// L'interface est montée : on retire l'écran de chargement statique.
removeSplash()
