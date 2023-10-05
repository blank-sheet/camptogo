import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.camptogo.com',
        changeOrigin: true
      },
      '/media': {
        target: 'https://www.camptogo.com',
        changeOrigin: true
      }
    },
    host: 'localhost',
    hmr: true
  }
})
