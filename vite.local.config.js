import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:19420',
        changeOrigin: true
      },
      '/media': {
        target: 'http://localhost:19420',
        changeOrigin: true
      }
    },
    host: 'localhost',
    hmr: true
  }
})
