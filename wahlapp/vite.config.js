import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    hmr: true, // Aktiviert HMR
  },
  test: {
    globals: true,
    environment: 'happy-dom', // Verwenden einer DOM-ähnlichen Umgebung für Tests
    setupFiles: './tests/unit/vitest.setup.js', // Setup-Datei für Mocking
  },
})

