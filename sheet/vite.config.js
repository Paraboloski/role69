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
          name: 'Scheda D&D',
          description: 'Scheda personaggio per D&D 5e',
          theme_color: '#121212', 
          background_color: '#f3f2f1',
          display: 'standalone', 
          icons: [
            {
              src: 'icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
  build: {
    modulePreload: {
      polyfill: false
    }
  }
})