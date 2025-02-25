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

import AvatarUserCe from '@/components/AvatarUser.ce.vue'
import I18nHostCe from '@/components/I18nHost.ce.vue'
import InfoGeneralCe from '@/components/InfoGeneral.ce.vue'
import ListOngletCe from '@/components/ListOnglet.ce.vue'
import ModalContentCe from '@/components/ModalContent.ce.vue'
import OngletContentCe from '@/components/OngletContent.ce.vue'
import PageMceCe from '@/components/PageMce.ce.vue'
import RelationUserCe from '@/components/RelationUser.ce.vue'
import SectionOngletCe from '@/components/SectionOnglet.ce.vue'
import ServicesEntCe from '@/components/ServicesEnt.ce.vue'
import UserInfoCe from '@/components/UserInfo.ce.vue'
import { defineCustomElement } from 'vue'

const AvatarUser = defineCustomElement(AvatarUserCe)
const I18nHost = defineCustomElement(I18nHostCe)
const InfoGeneral = defineCustomElement(InfoGeneralCe)
const ListOnglet = defineCustomElement(ListOngletCe)
const ModalContent = defineCustomElement(ModalContentCe)
const OngletContent = defineCustomElement(OngletContentCe)
const PageMce = defineCustomElement(PageMceCe)
const RelationUser = defineCustomElement(RelationUserCe)
const SectionOnglet = defineCustomElement(SectionOngletCe)
const ServicesEnt = defineCustomElement(ServicesEntCe)
const UserInfo = defineCustomElement(UserInfoCe)

declare module 'vue' {
  export interface GlobalComponents {
    AvatarUser: typeof AvatarUser
    I18nHost: typeof I18nHost
    InfoGeneral: typeof InfoGeneral
    ListOnglet: typeof ListOnglet
    ModalContent: typeof ModalContent
    OngletContent: typeof OngletContent
    PageMce: typeof PageMce
    RelationUser: typeof RelationUser
    SectionOnglet: typeof SectionOnglet
    ServicesEnt: typeof ServicesEnt
    UserInfo: typeof UserInfo
  }
}

function register() {
  customElements.define('avatar-user', AvatarUser)
  customElements.define('i18n-host', I18nHost)
  customElements.define('info-general', InfoGeneral)
  customElements.define('list-onglet', ListOnglet)
  customElements.define('modal-content', ModalContent)
  customElements.define('onglet-content', OngletContent)
  customElements.define('mce-ui', PageMce)
  customElements.define('relation-user', RelationUser)
  customElements.define('section-onglet', SectionOnglet)
  customElements.define('services-ent', ServicesEnt)
  customElements.define('user-info', UserInfo)
}

export {
  AvatarUser,
  I18nHost,
  InfoGeneral,
  ListOnglet,
  ModalContent,
  OngletContent,
  PageMce,
  register,
  RelationUser,
  SectionOnglet,
  ServicesEnt,
  UserInfo,
}
