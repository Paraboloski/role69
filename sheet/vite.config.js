import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './', 
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Asgaroth D&D Sheet',
        short_name: 'Scheda D&D',
        display: 'standalone',
        start_url: 'index.html',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' }]
      }
    })
  ],
  build: {
    modulePreload: {
      polyfill: false
    }
  }
})