import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./.certificates/localhost-key.pem'),
      cert: fs.readFileSync('./.certificates/localhost.pem'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});