import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: false, // Disables production source maps to keep bundle small
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Prevents console logs in production builds
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Separates third-party JS into a cached vendor bundle
          }
        },
      },
    },
  },
});