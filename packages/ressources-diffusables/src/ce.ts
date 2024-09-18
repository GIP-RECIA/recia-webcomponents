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
import CarteRessourceSFC from '@/components/CarteRessource.ce.vue';
import I18nHostSFC from '@/components/I18nHost.ce.vue';
import LegendeRessourceSFC from '@/components/LegendeRessource.ce.vue';
import ListeRessourcesSFC from '@/components/ListeRessources.ce.vue';
import PageRessourceSFC from '@/components/PageRessource.ce.vue';
import RechercheRessourceSFC from '@/components/RechercheRessource.ce.vue';
import { defineCustomElement } from 'vue';

const CarteRessource = defineCustomElement(CarteRessourceSFC);
const I18nHost = defineCustomElement(I18nHostSFC);
const LegendeRessource = defineCustomElement(LegendeRessourceSFC);
const ListeRessources = defineCustomElement(ListeRessourcesSFC);
const PageRessource = defineCustomElement(PageRessourceSFC);
const RechercheRessource = defineCustomElement(RechercheRessourceSFC);

declare module 'vue' {
  export interface GlobalComponents {
    CarteRessource: typeof CarteRessource;
    I18nHost: typeof I18nHost;
    LegendeRessource: typeof LegendeRessource;
    ListeRessources: typeof ListeRessources;
    PageRessource: typeof PageRessource;
    RechercheRessource: typeof RechercheRessource;
  }
}

const register = () => {
  customElements.define('carte-ressource', CarteRessource);
  customElements.define('ui-ressources-gar', I18nHost);
  customElements.define('legende-ressource', LegendeRessource);
  customElements.define('liste-ressources', ListeRessources);
  customElements.define('page-ressource', PageRessource);
  customElements.define('recherche-ressource', RechercheRessource);
};

export { CarteRessource, I18nHost, LegendeRessource, ListeRessources, PageRessource, RechercheRessource, register };
