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
import I18nHostCe from './components/I18nHost.ce.vue'
import PageMceCe from './components/PageMce.ce.vue'
import OngletContentCe from './components/OngletContent.ce.vue'
import ListOngletCe from './components/ListOnglet.ce.vue'
import SectionOngletCe from './components/SectionOnglet.ce.vue'
import InfoGeneralCe from './components/InfoGeneral.ce.vue'
import RelationUserCe from './components/RelationUser.ce.vue'
import UserInfoCe from './components/UserInfo.ce.vue'
import ServicesEntCe from './components/ServicesEnt.ce.vue'
import ModalContentCe from './components/ModalContent.ce.vue'


const I18nHost = defineCustomElement(I18nHostCe)
const PageMce = defineCustomElement(PageMceCe)
const OngletContent = defineCustomElement(OngletContentCe)
const ListOnglet = defineCustomElement(ListOngletCe)
const SectionOnglet = defineCustomElement(SectionOngletCe)
const InfoGeneral = defineCustomElement(InfoGeneralCe)
const RelationUser = defineCustomElement(RelationUserCe)
const UserInfo = defineCustomElement(UserInfoCe)
const ServicesEnt = defineCustomElement(ServicesEntCe)
const ModalContent = defineCustomElement(ModalContentCe)


declare module 'vue' {
  export interface GlobalComponents {
    I18nHost: typeof I18nHost
    PageMce: typeof PageMce
    OngletContent: typeof OngletContent
    ListOnglet: typeof ListOnglet
    SectionOnglet: typeof SectionOnglet
    InfoGeneral: typeof InfoGeneral
    RelationUser: typeof RelationUser
    UserInfo: typeof UserInfo
    ServicesEnt: typeof ServicesEnt
    ModalContent: typeof ModalContent
  }
}

const register = () => {
  customElements.define('mce-ui', I18nHost)
  customElements.define('page-mce', PageMce)
  customElements.define('onglet-content', OngletContent)
  customElements.define('list-onglet', ListOnglet)
  customElements.define('section-onglet', SectionOnglet)
  customElements.define('info-general', InfoGeneral)
  customElements.define('relation-user', RelationUser)
  customElements.define('user-info', UserInfo)
  customElements.define('services-ent', ServicesEnt)
  customElements.define('modal-content', ModalContent)
}

export {
  I18nHost,
  PageMce,
  OngletContent,
  ListOnglet,
  SectionOnglet,
  InfoGeneral,
  RelationUser,
  UserInfo,
  ServicesEnt,
  ModalContent,
  register
}
