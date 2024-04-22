import { fileURLToPath, URL } from 'node:url'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    base: process.env.VITE_BASE_URI,
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => ['change-etab', 'page-change-etab'].includes(tag)
          }
        }
      }),
      vueI18n({})
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
