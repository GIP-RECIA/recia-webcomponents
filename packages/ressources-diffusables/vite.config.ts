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
import type { ConfigEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { name } from './package.json'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const { VITE_BASE_URI, VITE_ALLOWED_HOSTS } = process.env

  return defineConfig({
    base: mode === 'development' ? VITE_BASE_URI : undefined,
    server: {
      allowedHosts: JSON.parse(VITE_ALLOWED_HOSTS ?? '[]'),
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => [
              'carte-ressource',
              'font-awesome-icon',
              'liste-ressources',
              'recherche-ressource',
              'ressources-pagination',
              'ui-ressources-gar',
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
      sourcemap: true,
      lib: {
        entry: './src/main.ts',
        formats: ['es'],
        name,
      },
    },
    define: {
      'process.env': { NODE_ENV: process.env.NODE_ENV },
    },
  })
}
