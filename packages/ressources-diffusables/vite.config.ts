import pkg from './package.json';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_BASE_URI,
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) =>
              [
                'carte-ressource',
                'ui-ressources-gar',
                'legende-ressource',
                'liste-ressources',
                'page-ressource',
                'recherche-ressource',
              ].includes(tag),
          },
        },
      }),
      VueI18nPlugin({}),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      lib: {
        entry: './src/main.ts',
        name: pkg.name,
      },
    },
    define: {
      'process.env': process.env,
    },
  });
};
