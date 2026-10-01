import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Déploiement GitHub Pages — projet site : https://zaraniaina.github.io/portfolio/
  // Le base doit correspondre au nom du dépôt ; le basename du BrowserRouter
  // est dérivé de cette valeur dans src/App.tsx.
  base: '/portfolio/',
})
