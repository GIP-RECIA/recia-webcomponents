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

import { defineCustomElement } from 'vue'
import I18nHostSFC from '@/components/I18nHost.ce.vue'
import PageEsupSympaSFC from '@/components/PageEsupSympa.ce.vue'

const I18nHost = defineCustomElement(I18nHostSFC)
const PageEsupSympa = defineCustomElement(PageEsupSympaSFC)

declare module 'vue' {
  export interface GlobalComponents {
    I18nHost: typeof I18nHost
    PageEsupSympa: typeof PageEsupSympa
  }
}

// https://fr.vuejs.org/guide/extras/web-components#tips-for-a-vue-custom-elements-library
function registerElements() {
  customElements.define('i18n-host', I18nHost)
  customElements.define('esup-sympa', PageEsupSympa)
}

export { I18nHost, PageEsupSympa, registerElements }
