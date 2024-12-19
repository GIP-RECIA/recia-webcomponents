/**
 * Copyright (C) 2023 GIP-RECIA, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable node/prefer-global/process */
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import pkg from './package.json'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    base: process.env.VITE_BASE_URI,
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => [
              'i18n-host',
              'news-card-carrousel',
              'carrousel-ui',
              'preview-ui',
              'all-news',
              'custom-toggle-switch',
              'news-card',
              'news-filter-section',
              'view-item',
              'page-selector'
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
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
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
    server: {
      proxy: {
        '^(?:/[a-zA-Z0-9_-]+){2}/api': {
          target: 'http://10.209.28.156:8080/publisher',
          changeOrigin: true,
          rewrite: (path) => {
            const rewrite = path.replace(/^(?:\/[\w-]+){2}\/api/, '')
            return rewrite
          },
        },
      },
    },
  })
}
