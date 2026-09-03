import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the project from /<repo>/, so assets can't be
  // absolute-rooted. This also moves the dev server to /new-myslice/.
  base: '/new-myslice/',
})
