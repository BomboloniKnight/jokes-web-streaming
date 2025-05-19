import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],          // Mengaktifkan plugin React untuk mendukung JSX dan fitur React di Vite
  optimizeDeps: {
    exclude: ['lucide-react'],  // Mengecualikan package 'lucide-react' dari proses pre-bundling Vite
  },
});
