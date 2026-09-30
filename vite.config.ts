import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base so the built site works from any path (GitHub Pages project
  // sites, Netlify subpaths, or a local file server).
  base: './',
})
