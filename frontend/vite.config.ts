import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Detecta se é ambiente de produção (ex: Vercel) ou desenvolvimento (local)
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  // 🌍 Configuração base (importante para deploy na Vercel)
  base: "./",

  // 🖥️ Servidor local — só ativa o proxy em dev
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
    sourcemap: !isProduction, // ✅ Ativa source maps apenas em dev
    emptyOutDir: true,
    minify: isProduction ? "esbuild" : false, // Otimiza apenas em produção
    rollupOptions: isProduction
      ? {
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

  // 🔥 Variáveis de ambiente (mantém compatibilidade)
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
});
