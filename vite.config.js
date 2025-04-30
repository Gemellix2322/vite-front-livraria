import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['chunk-AF6XLU7P', 'chunk-PXM3KA43']
  }
});
