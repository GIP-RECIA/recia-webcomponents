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
import CardSympaSFC from '@/components/CardSympa.ce.vue'
import FilterSympaSFC from '@/components/FilterSympa.ce.vue'
import I18nHostSFC from '@/components/I18nHost.ce.vue'
import ListSympSFC from '@/components/ListSympa.ce.vue'
import PageSympaSFC from '@/components/PageSympa.ce.vue'
import SympaAdminRedirectSFC from '@/components/SympaAdminRedirect.ce.vue'

const CardSympa = defineCustomElement(CardSympaSFC)
const FilterSympa = defineCustomElement(FilterSympaSFC)
const I18nHost = defineCustomElement(I18nHostSFC)
const ListSympa = defineCustomElement(ListSympSFC)
const PageSympa = defineCustomElement(PageSympaSFC)
const SympaAdminRedirect = defineCustomElement(SympaAdminRedirectSFC)

declare module 'vue' {
  export interface GlobalComponents {
    CardSympa: typeof CardSympa
    FilterSympa: typeof FilterSympa
    I18nHost: typeof I18nHost
    ListSympa: typeof ListSympa
    PageSympa: typeof PageSympa
    SympaAdminRedirect: typeof SympaAdminRedirect
  }
}

// https://fr.vuejs.org/guide/extras/web-components#tips-for-a-vue-custom-elements-library
function registerElements() {
  customElements.define('card-sympa', CardSympa)
  customElements.define('filter-sympa', FilterSympa)
  customElements.define('i18n-host', I18nHost)
  customElements.define('list-sympa', ListSympa)
  customElements.define('page-sympa', PageSympa)
  customElements.define('sympa-admin-redirect', SympaAdminRedirect)
}

export { CardSympa, FilterSympa, I18nHost, ListSympa, PageSympa, registerElements, SympaAdminRedirect }
