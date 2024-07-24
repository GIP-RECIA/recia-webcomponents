import I18nHostCe from './components/I18nHost.ce.vue';
import PageChangeEtabCe from './components/PageChangeEtab.ce.vue';
import { defineCustomElement } from 'vue';

const I18nHost = defineCustomElement(I18nHostCe);
const PageChangeEtab = defineCustomElement(PageChangeEtabCe);

declare module 'vue' {
  export interface GlobalComponents {
    I18nHost: typeof I18nHost;
    PageChangeEtab: typeof PageChangeEtab;
  }
}

const register = () => {
  customElements.define('change-etab', I18nHost);
  customElements.define('page-change-etab', PageChangeEtab);
};

export { I18nHost, PageChangeEtab, register };
