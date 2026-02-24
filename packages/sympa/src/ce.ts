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
import ButtonDropdownAdminCardSympaUpdateSFC from '@/components/ButtonDropdownAdminCardSympaUpdate.ce.vue'
import CardAdminSympaCreateSFC from '@/components/CardAdminSympaCreate.ce.vue'
import CardAdminSympaUpdateSFC from '@/components/CardAdminSympaUpdate.ce.vue'
import CardSympaSFC from '@/components/CardSympa.ce.vue'
import FilterAdminSympaSFC from '@/components/FilterAdminSympa.ce.vue'
import FilterSympaSFC from '@/components/FilterSympa.ce.vue'
import I18nHostSFC from '@/components/I18nHost.ce.vue'
import ListAdminSympaSFC from '@/components/ListAdminSympa.ce.vue'
import ListSympSFC from '@/components/ListSympa.ce.vue'
import PageAdminSympaSFC from '@/components/PageAdminSympa.ce.vue'
import PageSympaSFC from '@/components/PageSympa.ce.vue'
import SympaAdminRedirectSFC from '@/components/SympaAdminRedirect.ce.vue'

const ButtonDropdownAdminCardSympaUpdate = defineCustomElement(ButtonDropdownAdminCardSympaUpdateSFC)
const CardAdminSympaCreate = defineCustomElement(CardAdminSympaCreateSFC)
const CardAdminSympaUpdate = defineCustomElement(CardAdminSympaUpdateSFC)
const CardSympa = defineCustomElement(CardSympaSFC)
const FilterAdminSympa = defineCustomElement(FilterAdminSympaSFC)
const FilterSympa = defineCustomElement(FilterSympaSFC)
const I18nHost = defineCustomElement(I18nHostSFC)
const ListAdminSympa = defineCustomElement(ListAdminSympaSFC)
const ListSympa = defineCustomElement(ListSympSFC)
const PageSympa = defineCustomElement(PageSympaSFC)
const SympaAdminRedirect = defineCustomElement(SympaAdminRedirectSFC)
const PageAdminSympa = defineCustomElement(PageAdminSympaSFC)

declare module 'vue' {
  export interface GlobalComponents {
    ButtonDropdownAdminCardSympaUpdate: typeof ButtonDropdownAdminCardSympaUpdate
    CardAdminSympaCreate: typeof CardAdminSympaCreate
    CardAdminSympaUpdate: typeof CardAdminSympaUpdate
    CardSympa: typeof CardSympa
    FilterAdminSympa: typeof FilterAdminSympa
    FilterSympa: typeof FilterSympa
    I18nHost: typeof I18nHost
    ListAdminSympa: typeof ListAdminSympa
    ListSympa: typeof ListSympa
    PageSympa: typeof PageSympa
    SympaAdminRedirect: typeof SympaAdminRedirect
    PageAdminSympa: typeof PageAdminSympa
  }
}

// https://fr.vuejs.org/guide/extras/web-components#tips-for-a-vue-custom-elements-library
function registerElements() {
  customElements.define('button-dropdown-admin-card-sympa-update', ButtonDropdownAdminCardSympaUpdate)
  customElements.define('card-admin-sympa-create', CardAdminSympaCreate)
  customElements.define('card-admin-sympa-update', CardAdminSympaUpdate)
  customElements.define('card-sympa', CardSympa)
  customElements.define('filter-admin-sympa', FilterAdminSympa)
  customElements.define('filter-sympa', FilterSympa)
  customElements.define('i18n-host', I18nHost)
  customElements.define('list-admin-sympa', ListAdminSympa)
  customElements.define('list-sympa', ListSympa)
  customElements.define('page-sympa', PageSympa)
  customElements.define('page-admin-sympa', PageAdminSympa)
  customElements.define('sympa-admin-redirect', SympaAdminRedirect)
}

export { ButtonDropdownAdminCardSympaUpdate, CardAdminSympaCreate, CardAdminSympaUpdate, CardSympa, FilterSympa, I18nHost, ListAdminSympa, ListSympa, PageAdminSympa, PageSympa, registerElements, SympaAdminRedirect }
