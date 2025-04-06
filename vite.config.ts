import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path'; // 👈 importa o path aqui

// Exportando configuração do Vite
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 define o alias @ apontando para src
    },
  },
});
