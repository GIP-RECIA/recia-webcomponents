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
import AvatarUserCe from '@/components/AvatarUser.ce.vue'
import ChangeEmailCe from '@/components/ChangeEmail.ce.vue'
import ChangePasswordCe from '@/components/ChangePassword.ce.vue'
import I18nHostCe from '@/components/I18nHost.ce.vue'
import InfoGeneralCe from '@/components/InfoGeneral.ce.vue'
import ListOngletCe from '@/components/ListOnglet.ce.vue'
import PageMceCe from '@/components/PageMce.ce.vue'
import RelationUserCe from '@/components/RelationUser.ce.vue'
import SectionOngletCe from '@/components/SectionOnglet.ce.vue'
import UserBaseInfoCe from '@/components/UserBaseInfo.ce.vue'
import FontAwesomeIconSFC from '@/components/FontAwsomeIcon.ce.vue'

const AvatarUser = defineCustomElement(AvatarUserCe)
const ChangeEmail = defineCustomElement(ChangeEmailCe)
const ChangePassword = defineCustomElement(ChangePasswordCe)
const I18nHost = defineCustomElement(I18nHostCe)
const InfoGeneral = defineCustomElement(InfoGeneralCe)
const ListOnglet = defineCustomElement(ListOngletCe)
const PageMce = defineCustomElement(PageMceCe)
const RelationUser = defineCustomElement(RelationUserCe)
const SectionOnglet = defineCustomElement(SectionOngletCe)
const UserBaseInfo = defineCustomElement(UserBaseInfoCe)
const FontAwesomeIcon = defineCustomElement(FontAwesomeIconSFC)

declare module 'vue' {
  export interface GlobalComponents {
    AvatarUser: typeof AvatarUser
    ChangeEmail: typeof ChangeEmail
    ChangePassword: typeof ChangePassword
    I18nHost: typeof I18nHost
    InfoGeneral: typeof InfoGeneral
    ListOnglet: typeof ListOnglet
    PageMce: typeof PageMce
    RelationUser: typeof RelationUser
    SectionOnglet: typeof SectionOnglet
    UserBaseInfo: typeof UserBaseInfo
    FontAwesomeIcon: typeof FontAwesomeIcon
  }
}

function register() {
  customElements.define('avatar-user', AvatarUser)
  customElements.define('change-email', ChangeEmail)
  customElements.define('change-password', ChangePassword)
  customElements.define('i18n-host', I18nHost)
  customElements.define('info-general', InfoGeneral)
  customElements.define('list-onglet', ListOnglet)
  customElements.define('mce-ui', PageMce)
  customElements.define('relation-user', RelationUser)
  customElements.define('section-onglet', SectionOnglet)
  customElements.define('user-base-info', UserBaseInfo)
  customElements.define('font-awesome-icon', FontAwesomeIcon)

}

export {
  AvatarUser,
  ChangeEmail,
  ChangePassword,
  I18nHost,
  InfoGeneral,
  ListOnglet,
  PageMce,
  register,
  RelationUser,
  SectionOnglet,
  FontAwesomeIcon,
  UserBaseInfo,
}
