import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Serves the playground, used to try the components while building them (`npm run dev`)
export default defineConfig({
  root: 'playground',
  plugins: [react(), tailwindcss()],
})
