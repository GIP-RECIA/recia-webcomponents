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

import type { PersistenceError } from '@gip-recia/wisemapping-editor/dist/editor.js'
import { $assert } from '@gip-recia/wisemapping-core-js'
import { PersistenceManager } from '@gip-recia/wisemapping-editor/dist/editor.js'
import { instance as axios } from '../utils/axiosUtils.ts'

class CustomPersistenceManager extends PersistenceManager {
  private documentUrl: string

  private onSave: boolean

  private clearTimeout

  constructor(options: { documentUrl: string }) {
    $assert(options.documentUrl, 'documentUrl can not be null')
    super()

    this.documentUrl = options.documentUrl
    this.onSave = false
  }

  discardChanges(_mapId: string): void {}

  async loadMapDom(mapId: string): Promise<Document> {
    const response = await axios.get(this.documentUrl.replace('{id}', mapId))
    return new DOMParser().parseFromString(response.data.data, 'text/xml')
  }

  async saveMapXml(mapId: string, mapXml: Document, _pref?: string, _saveHistory?: boolean, events?): Promise<void> {
    const body = {
      data: new XMLSerializer().serializeToString(mapXml),
    }

    if (!this.onSave) {
      // Mark save in process and fire a event unlocking the save ...
      this.onSave = true
      this.clearTimeout = setTimeout(() => {
        this.clearTimeout = null
        this.onSave = false
      }, 10000)

      // eslint-disable-next-line ts/no-this-alias
      const persistence = this

      try {
        await axios.put(this.documentUrl.replace('{id}', mapId), body)
        events.onSuccess()
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        const userMsg: PersistenceError = {
          severity: 'SEVERE',
          message: 'SAVE_COULD_NOT_BE_COMPLETED',
          errorType: 'generic',
        }
        this.triggerError(userMsg)
        events.onError(userMsg)

        // Clear event timeout ...
        if (persistence.clearTimeout) {
          clearTimeout(persistence.clearTimeout)
        }
        persistence.onSave = false
      }
    }
  }

  unlockMap(_mapId: string): void {}
}

export default CustomPersistenceManager
