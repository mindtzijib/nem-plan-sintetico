import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/nem-plan-sintetico/' : '/',
  build: {
    // Optimizaciones básicas de build
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    // Minificación estándar
    minify: true,
    // Optimizar CSS
    cssMinify: true,
    // No generar source maps en producción
    sourcemap: false,
    // Configurar límite de advertencia de chunk
    chunkSizeWarningLimit: 1000
  },
  // Optimizaciones de desarrollo
  server: {
    hmr: true
  },
  // Optimizar dependencias
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
