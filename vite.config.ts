import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import sassPlugin from 'vite-plugin-sass'
import path from 'path'
export default defineConfig({
//   plugins: [tsconfigPaths(), sassPlugin()],
resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
    ],
    define: {
        'process.env': {}
    }
  },
})
