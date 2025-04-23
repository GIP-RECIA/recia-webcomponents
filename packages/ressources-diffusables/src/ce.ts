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
import CarteRessourceSFC from '@/components/CarteRessource.ce.vue'
import I18nHostSFC from '@/components/I18nHost.ce.vue'
import ListeRessourcesSFC from '@/components/ListeRessources.ce.vue'
import PageRessourceSFC from '@/components/PageRessource.ce.vue'
import RechercheRessourceSFC from '@/components/RechercheRessource.ce.vue'
import RessourcesPaginationSFC from '@/components/RessourcesPagination.ce.vue'
import { defineCustomElement } from 'vue'
import RechercheAvanceeRessourceSFC from './components/RechercheAvanceeRessource.ce.vue'
import RechercheTypeToggleSFC from './components/RechercheTypeToggle.ce.vue'

const CarteRessource = defineCustomElement(CarteRessourceSFC)
const I18nHost = defineCustomElement(I18nHostSFC)
const ListeRessources = defineCustomElement(ListeRessourcesSFC)
const PageRessource = defineCustomElement(PageRessourceSFC)
const RessourcesPagination = defineCustomElement(RessourcesPaginationSFC)
const RechercheRessource = defineCustomElement(RechercheRessourceSFC)
const RechercheAvanceeRessource = defineCustomElement(RechercheAvanceeRessourceSFC)
const RechercheTypeToggle = defineCustomElement(RechercheTypeToggleSFC)

declare module 'vue' {
  export interface GlobalComponents {
    CarteRessource: typeof CarteRessource
    I18nHost: typeof I18nHost
    ListeRessources: typeof ListeRessources
    PageRessource: typeof PageRessource
    RessourcesPagination: typeof RessourcesPagination
    RechercheRessource: typeof RechercheRessource
    RechercheAvanceeRessource: typeof RechercheAvanceeRessource
    RechercheTypeToggle: typeof RechercheTypeToggle
  }
}

function register() {
  customElements.define('carte-ressource', CarteRessource)
  customElements.define('ui-ressources-gar', I18nHost)
  customElements.define('liste-ressources', ListeRessources)
  customElements.define('page-ressource', PageRessource)
  customElements.define('ressources-pagination', RessourcesPagination)
  customElements.define('recherche-ressource', RechercheRessource)
  customElements.define('recherche-avancee-ressource', RechercheAvanceeRessource)
  customElements.define('recherche-type-toggle', RechercheTypeToggle)
}

export {
  CarteRessource,
  I18nHost,
  ListeRessources,
  PageRessource,
  RechercheAvanceeRessource,
  RechercheRessource,
  RechercheTypeToggle,
  register,
  RessourcesPagination,
}
