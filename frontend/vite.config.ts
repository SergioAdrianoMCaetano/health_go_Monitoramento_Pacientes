import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  // 🔥 ADICIONAR CONFIGURAÇÃO DE BUILD PARA PRODUÇÃO
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Otimizações para produção
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['plotly.js', 'react-plotly.js'],
          maps: ['leaflet', 'react-leaflet']
        }
      }
    }
  },
  // 🔥 CONFIGURAÇÃO PARA VARIÁVEIS DE AMBIENTE
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
})
