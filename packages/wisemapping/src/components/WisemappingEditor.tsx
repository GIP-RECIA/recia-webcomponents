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

import type {
  Designer,
  EditorOptions,
  MapInfo,
  PersistenceManager,
} from '@gip-recia/wisemapping-editor/dist/editor.js'
import type { WisemappingEditorProps } from '../types/WisemappingEditorProps'
import Editor, {
  useEditor,
} from '@gip-recia/wisemapping-editor/dist/editor.js'
import MapInfoImpl from '../models/MapInfoImpl'
import CustomPersistenceManager from '../services/CustomPersistenceManager'
import { setToken } from '../utils/axiosUtils'
import { findLanguage } from '../utils/i18nUtils'
import { setUserInfoApiUrl } from '../utils/soffitUtils'

export default function WisemappingEditor({
  persistanceApiUrl,
  fileId,
  token,
  userInfoApiUrl,
  mode,
}: Readonly<WisemappingEditorProps>) {
  if (!token && !userInfoApiUrl)
    throw new Error('Token or userInfoApiUrl is required')

  if (token?.startsWith('Bearer '))
    setToken(token)
  else if (token)
    throw new Error('Invalid token')
  if (userInfoApiUrl)
    setUserInfoApiUrl(userInfoApiUrl)

  const mapInfo: MapInfo = new MapInfoImpl(fileId, '', '', false)
  const options: EditorOptions = {
    mode,
    locale: findLanguage('fr'),
    enableKeyboardEvents: true,
    enableAppBar: false,
  }
  const persistenceManager: PersistenceManager = new CustomPersistenceManager({
    documentUrl: `${persistanceApiUrl}/{id}`,
  })

  const initialization = (designer: Designer) => {
    designer.addEvent('loadSuccess', () => {
      document.getElementById('mindmap-comp')?.classList.add('ready')
    })
  }

  const editor = useEditor({
    mapInfo,
    options,
    persistenceManager,
  })

  return <Editor config={editor} onLoad={initialization} onAction={() => {}} />
}
