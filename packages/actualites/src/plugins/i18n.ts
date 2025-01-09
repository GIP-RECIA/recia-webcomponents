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

import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
import { findLanguage } from '@/utils/i18nUtils.ts'
import { createI18n } from 'vue-i18n'

export default createI18n({
  legacy: false,
  locale: findLanguage('en'),
  fallbackLocale: 'en',
  messages: {
    en,
    'en-US': en,
    fr,
    'fr-FR': fr,
  },
  datetimeFormats: {
    en: {
      medium: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'long',
      },
      datetime: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      },
    },
    fr: {
      medium: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'long',
      },
      datetime: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      },
    },
  },
})
