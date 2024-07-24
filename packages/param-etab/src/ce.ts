import DetailEtabSFC from './components/DetailEtab.ce.vue';
import I18nHostSFC from './components/I18nHost.ce.vue';
import ImageCropperSFC from './components/ImageCropper.ce.vue';
import ListEtabSFC from './components/ListEtab.ce.vue';
import PageParamEtabSFC from './components/PageParamEtab.ce.vue';
import { defineCustomElement } from 'vue';

const DetailEtab = defineCustomElement(DetailEtabSFC);
const I18nHost = defineCustomElement(I18nHostSFC);
const ImageCropper = defineCustomElement(ImageCropperSFC);
const ListEtab = defineCustomElement(ListEtabSFC);
const PageParamEtab = defineCustomElement(PageParamEtabSFC);

declare module 'vue' {
  export interface GlobalComponents {
    DetailEtab: typeof DetailEtab;
    I18nHost: typeof I18nHost;
    ImageCropper: typeof ImageCropper;
    ListEtab: typeof ListEtab;
    PageParamEtab: typeof PageParamEtab;
  }
}

const register = () => {
  customElements.define('detail-etab', DetailEtab);
  customElements.define('page-param-etab', PageParamEtab);
  customElements.define('list-etab', ListEtab);
  customElements.define('image-cropper', ImageCropper);
  customElements.define('param-etab', I18nHost);
};

export { DetailEtab, I18nHost, ImageCropper, ListEtab, PageParamEtab, register };
