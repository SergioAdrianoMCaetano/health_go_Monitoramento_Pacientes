import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Detecta se é ambiente de produção (ex: Vercel) ou desenvolvimento (local)
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: !isProduction
    ? {
        proxy: {
          "/api": {
            target: "http://127.0.0.1:8000",
            changeOrigin: true,
            secure: false,
          },
        },
      }
    : undefined,

  // ⚙️ Configurações de build (ajustes automáticos para produção)
  build: {
    outDir: "dist",
    sourcemap: !isProduction, 
    emptyOutDir: true,
    minify: isProduction ? "esbuild" : false,
    // ✅ ADICIONAR resolve.alias para polyfills
    rollupOptions: isProduction
      ? {
          external: ["buffer", "stream", "assert"],
          output: {
            manualChunks: {
              vendor: ["react", "react-dom"],
              charts: ["plotly.js", "react-plotly.js"],
              maps: ["leaflet", "react-leaflet"],
            },
          },
        }
      : undefined,
  },
  // ✅ CONFIGURAÇÃO GLOBAL CORRIGIDA
  define: {
    global: "globalThis",
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
  // ✅ RESOLVE ALIAS PARA MÓDULOS NODE
  resolve: {
    alias: {
      buffer: "buffer/",
      stream: "stream-browserify",
      assert: "assert/",
    },
  },
});