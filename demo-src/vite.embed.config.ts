import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Builds the hero demo to ../assets/demo (a classic script, no module needed).
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: '../assets/demo', emptyOutDir: true, cssCodeSplit: false, target: 'es2019',
    lib: { entry: 'src/embed.tsx', formats: ['iife'], name: 'MirloDemo', fileName: () => 'mirlo-demo.js' },
    rollupOptions: { output: { assetFileNames: 'mirlo-demo[extname]' } },
  },
})
