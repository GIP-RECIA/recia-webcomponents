import { defineCustomElement } from 'vue'
import I18nHostCe from './components/I18nHost.ce.vue'

const I18nHost = defineCustomElement(I18nHostCe)

declare module 'vue' {
  export interface GlobalComponents {
    I18nHost: typeof I18nHost
  }
}

const register = () => {
  customElements.define('change-etab', I18nHost)
}

export { I18nHost, register }
