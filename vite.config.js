import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Use the repo name as base ONLY for production builds (GitHub Pages)
  base: command === 'build' ? '/-Todo-Management-System/' : '/',
  plugins: [react()],
}))
