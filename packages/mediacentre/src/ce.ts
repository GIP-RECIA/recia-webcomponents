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

import CarteRessourceSFC from '@/components/CarteRessourceMediacentre.ce.vue'
import I18nHostSFC from '@/components/I18nHost.ce.vue'
import ListeRessourcesSFC from '@/components/ListeRessourcesMediacentre.ce.vue'
import MenuMediacentreSFC from '@/components/MenuMediacentre.ce.vue'
import PageMediacentreSFC from '@/components/PageMediacentre.ce.vue'
import RedirectMediacentreSFC from '@/components/RedirectMediacentre.ce.vue'
import { defineCustomElement } from 'vue'

const CarteRessource = defineCustomElement(CarteRessourceSFC)
const I18nHost = defineCustomElement(I18nHostSFC)
const ListeRessources = defineCustomElement(ListeRessourcesSFC)
const Menu = defineCustomElement(MenuMediacentreSFC)
const Page = defineCustomElement(PageMediacentreSFC)
const Redirect = defineCustomElement(RedirectMediacentreSFC)

declare module 'vue' {
  export interface GlobalComponents {
    CarteRessource: typeof CarteRessource
    I18nHost: typeof I18nHost
    ListeRessources: typeof ListeRessources
    Menu: typeof Menu
    Page: typeof Page
    Redirect: typeof Redirect
  }
}

// https://fr.vuejs.org/guide/extras/web-components#tips-for-a-vue-custom-elements-library
function registerElements() {
  customElements.define('carte-ressource', CarteRessource)
  customElements.define('i18n-host', I18nHost)
  customElements.define('liste-ressources', ListeRessources)
  customElements.define('menu-mediacentre', Menu)
  customElements.define('mediacentre-ui', Page)
  customElements.define('mediacentre-redirect', Redirect)
}

export { CarteRessource, I18nHost, ListeRessources, Menu, Page, Redirect, registerElements }
