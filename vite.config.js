import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' = relative asset URLs, so it works under ANY repo name (no hardcoding).
export default defineConfig({ base: './', plugins: [react()] })
