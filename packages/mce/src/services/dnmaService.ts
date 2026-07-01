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

export class dnmaService {
  static fname = 'MonCompteENT'

  static consult() {
    this.sendEvent('CONSULT')
  }

  static modify() {
    this.sendEvent('MODIF')
  }

  static changePassword() {
    this.sendEvent('CHANGE_PASSWORD')
  }

  static changeEmail() {
    this.sendEvent('CHANGE_EMAIL')
  }

  static changeAvatar() {
    this.sendEvent('CHANGE_AVATAR')
  }

  static toggleFonction(fonction?: string) {
    this.sendEvent('FONCTION_TOGGLE', fonction ? { FONCTION: fonction } : undefined)
  }

  static selectOnglet(onglet?: string) {
    this.sendEvent('SELECT_ONGLET', onglet ? { SOURCE: onglet } : undefined)
  }

  private static sendEvent(service: string, extra?: Record<string, string>) {
    const event = new CustomEvent(
      'click-portlet-card',
      {
        detail: {
          fname: this.fname,
          SERVICE: service,
          ...extra,
        },
      },
    )
    document.dispatchEvent(event)
  }
}
