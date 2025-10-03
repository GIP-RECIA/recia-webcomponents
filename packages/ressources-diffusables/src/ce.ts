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
import CarteRessourceSFC from '@/components/CarteRessource.ce.vue'
import FontAwesomeIconSFC from '@/components/FontAwsomeIcon.ce.vue'
import ListeRessourcesSFC from '@/components/ListeRessources.ce.vue'
import PageRessourceSFC from '@/components/PageRessource.ce.vue'
import RechercheRessourceSFC from '@/components/RechercheRessource.ce.vue'
import RessourcesPaginationSFC from '@/components/RessourcesPagination.ce.vue'

const CarteRessource = defineCustomElement(CarteRessourceSFC)
const FontAwesomeIcon = defineCustomElement(FontAwesomeIconSFC)
const ListeRessources = defineCustomElement(ListeRessourcesSFC)
const PageRessource = defineCustomElement(PageRessourceSFC)
const RessourcesPagination = defineCustomElement(RessourcesPaginationSFC)
const RechercheRessource = defineCustomElement(RechercheRessourceSFC)

declare module 'vue' {
  export interface GlobalComponents {
    CarteRessource: typeof CarteRessource
    FontAwesomeIcon: typeof FontAwesomeIcon
    ListeRessources: typeof ListeRessources
    PageRessource: typeof PageRessource
    RessourcesPagination: typeof RessourcesPagination
    RechercheRessource: typeof RechercheRessource
  }
}

function register() {
  customElements.define('carte-ressource', CarteRessource)
  customElements.define('font-awesome-icon', FontAwesomeIcon)
  customElements.define('liste-ressources', ListeRessources)
  customElements.define('ui-ressources-gar', PageRessource)
  customElements.define('ressources-pagination', RessourcesPagination)
  customElements.define('recherche-ressource', RechercheRessource)
}

export {
  CarteRessource,
  FontAwesomeIcon,
  ListeRessources,
  PageRessource,
  RechercheRessource,
  register,
  RessourcesPagination,
}
