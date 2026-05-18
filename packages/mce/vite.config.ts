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
import type { ConfigEnv, PluginOption } from 'vite'
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { name } from './package.json'

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    base: mode === 'development' ? env.VITE_BASE_URI : undefined,
    server: {
      allowedHosts: env.VITE_ALLOWED_HOSTS ? JSON.parse(env.VITE_ALLOWED_HOSTS) : [],
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => [
              'avatar-user',
              'i18n-host',
              'info-general',
              'list-onglet',
              'mce-ui',
              'modal-content',
              'onglet-content',
              'relation-user',
              'section-onglet',
              'services-ent',
              'user-base-info',
              'info-modal',
            ].includes(tag),
          },
        },
      }),
      VueI18nPlugin({}) as unknown as PluginOption,
    ] as PluginOption[],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    build: {
      sourcemap: true,
      lib: {
        entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
        formats: ['es'],
        name,
      },
    },

    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  })
}
