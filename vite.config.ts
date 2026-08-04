import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: false, // No separate public dir; serve static files from root via server.fs
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ['.'], // Allow serving from project root
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
