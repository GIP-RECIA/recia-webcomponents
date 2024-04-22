import { defineCustomElement } from 'vue';

declare module 'vue' {
  export interface GlobalComponents {}
}

// https://fr.vuejs.org/guide/extras/web-components#tips-for-a-vue-custom-elements-library
const register = () => {};

export { register };
