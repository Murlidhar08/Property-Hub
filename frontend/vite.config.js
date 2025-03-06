import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port: 4000
  },
  resolve: {
    alias: [
      // eslint-disable-next-line no-undef
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
