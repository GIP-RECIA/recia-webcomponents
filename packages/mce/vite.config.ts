/**
 * Copyright (C) 2023 GIP-RECIA, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
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
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import { name } from './package.json'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    base: mode === 'development' ? env.VITE_BASE_URI : undefined,

    server: {
      allowedHosts: env.VITE_ALLOWED_HOSTS ? JSON.parse(env.VITE_ALLOWED_HOSTS) : [],
    },

    // ==================== CONFIGURATION VITEST ====================
    test: {
      environment: 'jsdom',
      globals: true,
      root: fileURLToPath(new URL('.', import.meta.url)),

      include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
      ],

      // Configuration correcte pour Vitest v4
      server: {
        deps: {
          inline: ['@vue/test-utils', 'vue-i18n'],
        },
      },
    },

    // ==================== PLUGINS ====================
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag: string) =>
              [
                'avatar-user',
                'font-awesome-icon',
                'i18n-host',
                'info-general',
                'list-onglet',
                'mce-ui',
                'modal-content',
                'onglet-content',
                'relation-user',
                'section-onglet',
                'user-base-info',
                'info-modal',
                'font-awesome-icon',
              ].includes(tag),
          },
        },
      }),
      VueI18nPlugin({}) as unknown as PluginOption,
    ] as PluginOption[],

    // ==================== RESOLVE ====================
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // ==================== BUILD ====================
    build: {
      sourcemap: false,
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
