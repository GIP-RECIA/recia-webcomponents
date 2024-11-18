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

import DetailEtabSFC from '@/components/DetailEtab.ce.vue'
import I18nHostSFC from '@/components/I18nHost.ce.vue'
import ListEtabSFC from '@/components/ListEtab.ce.vue'
import PageParamEtabSFC from '@/components/PageParamEtab.ce.vue'
import { defineCustomElement } from 'vue'
import ImageCropperSFC from './components/ImageCropper.ce.vue'

const DetailEtab = defineCustomElement(DetailEtabSFC)
const I18nHost = defineCustomElement(I18nHostSFC)
const ImageCropper = defineCustomElement(ImageCropperSFC)
const ListEtab = defineCustomElement(ListEtabSFC)
const PageParamEtab = defineCustomElement(PageParamEtabSFC)

declare module 'vue' {
  export interface GlobalComponents {
    DetailEtab: typeof DetailEtab
    I18nHost: typeof I18nHost
    ImageCropper: typeof ImageCropper
    ListEtab: typeof ListEtab
    PageParamEtab: typeof PageParamEtab
  }
}

function register() {
  customElements.define('detail-etab', DetailEtab)
  customElements.define('param-etab', PageParamEtab)
  customElements.define('list-etab', ListEtab)
  customElements.define('image-cropper', ImageCropper)
  customElements.define('i18n-host', I18nHost)
}

export { DetailEtab, I18nHost, ImageCropper, ListEtab, PageParamEtab, register }
