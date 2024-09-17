import CarteRessourceSFC from './components/CarteRessourceMediacentre.ce.vue';
import I18nHostSFC from './components/I18nHost.ce.vue';
import ListeRessourcesSFC from './components/ListeRessourcesMediacentre.ce.vue';
import MenuMediacentreSFC from './components/MenuMediacentre.ce.vue';
import PageMediacentreSFC from './components/PageMediacentre.ce.vue';
import { defineCustomElement } from 'vue';

const CarteRessource = defineCustomElement(CarteRessourceSFC);
const I18nHost = defineCustomElement(I18nHostSFC);
const ListeRessources = defineCustomElement(ListeRessourcesSFC);
const Menu = defineCustomElement(MenuMediacentreSFC);
const Page = defineCustomElement(PageMediacentreSFC);

declare module 'vue' {
  export interface GlobalComponents {
    CarteRessource: typeof CarteRessource;
    I18nHost: typeof I18nHost;
    ListeRessources: typeof ListeRessources;
    Menu: typeof Menu;
    Page: typeof Page;
  }
}

// https://fr.vuejs.org/guide/extras/web-components#tips-for-a-vue-custom-elements-library
const register = () => {
  customElements.define('carte-ressource', CarteRessource);
  customElements.define('mediacentre-ui', I18nHost);
  customElements.define('liste-ressources', ListeRessources);
  customElements.define('menu-mediacentre', Menu);
  customElements.define('page-mediacentre', Page);
};

export { CarteRessource, I18nHost, ListeRessources, Menu, Page, register };
