import pkg from './package.json'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  return defineConfig({
    build: {
      lib: {
        entry: './src/info-modal.ts',
        formats: ['es'],
        name: pkg.name
      },

      sourcemap: true
    }
  })
}
