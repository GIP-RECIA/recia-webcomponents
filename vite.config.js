import pkg from './package.json';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig, loadEnv} from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default ({ mode }) =>  {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({

  base: '/indah/ui',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => [
            'detail-etab',
            'page-param-etab',
            'list-etab',
            'image-cropper',
            'param-etab'
          ].includes(tag),
        },
      },
    }),
    vueI18n({}),
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: './src/main.ts',
      name: pkg.name
    }
  },
  define: {
    'process.env': process.env,
  },
})
}

