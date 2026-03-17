import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isGithub = process.env.GITHUB_ACTIONS === 'true';

  return {
    base: isGithub ? '/asgaroth_dnd_sheet_apk/' : './',
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Asgaroth D&D Sheet',
          short_name: 'Scheda D&D',
          display: 'standalone',
          start_url: '.', 
          icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' }]
        }
      })
    ],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true 
    }
  }
})