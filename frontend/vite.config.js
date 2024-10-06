import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as env from './env.config.js';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  env:{
    VITE_API_URL: env.VITE_API_URL
  }
});
