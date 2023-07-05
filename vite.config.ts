import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import sassPlugin from 'vite-plugin-sass'
import path from 'path'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
    ],
    define: {
        'process.env': {}
    },
    
  },
})
