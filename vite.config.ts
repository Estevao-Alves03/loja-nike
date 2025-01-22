import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Exportando configuração do Vite
export default defineConfig({
  plugins: [react()],
  css: {
    // Aponta para o arquivo de configuração do PostCSS
    postcss: './postcss.config.cjs',
  },
  server: {
    // Garante que o servidor funcione bem em portas diferentes (se necessário)
    port: 5173,
    open: true, // Abre o navegador automaticamente
  },
});
