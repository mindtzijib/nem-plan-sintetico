import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/nem-plan-sintetico/' : '/',
  build: {
    // Optimizaciones de build
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor libraries en chunks separados
          vendor: ['react', 'react-dom'],
          // Separar datos en su propio chunk
          data: ['./src/data.ts']
        }
      }
    },
    // Comprimir assets
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs en producción
        drop_debugger: true
      }
    },
    // Optimizar CSS
    cssMinify: true,
    // Generar source maps para debugging
    sourcemap: false
  },
  // Optimizaciones de desarrollo
  server: {
    hmr: {
      overlay: false
    }
  },
  // Preload de módulos críticos
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
