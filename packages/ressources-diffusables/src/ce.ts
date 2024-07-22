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
