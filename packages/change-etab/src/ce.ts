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

import I18nHostSFC from '@/components/I18nHost.ce.vue'
import PageChangeEtabSFC from '@/components/PageChangeEtab.ce.vue'
import { defineCustomElement } from 'vue'

const I18nHost = defineCustomElement(I18nHostSFC)
const PageChangeEtab = defineCustomElement(PageChangeEtabSFC)

declare module 'vue' {
  export interface GlobalComponents {
    I18nHost: typeof I18nHost
    PageChangeEtab: typeof PageChangeEtab
  }
}

function register() {
  customElements.define('i18n-host', I18nHost)
  customElements.define('change-etab', PageChangeEtab)
}

export { I18nHost, PageChangeEtab, register }
