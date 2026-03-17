import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
  
  return {
    base: isGithubActions ? '/asgaroth_dnd_sheet_apk/' : './',
    
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate', 
        manifest: {
          name: 'Asgaroth D&D Sheet',
          short_name: 'Scheda D&D',
          description: 'Scheda personaggio per D&D 5e',
          theme_color: '#121212', 
          background_color: '#f3f2f1',
          display: 'standalone', 
          start_url: './index.html',
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
    ]
  }
})