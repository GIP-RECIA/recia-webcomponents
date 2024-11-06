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

import type { EditorRenderMode } from '@gip-recia/wisemapping-mindplot'
import { useState } from 'react'
import WisemappingEditor from './components/WisemappingEditor.tsx'
import './assets/scss/app.scss'

function App() {
  const { VITE_PERSISTANCE_API_URL, VITE_FILE_ID, VITE_USER_INFO_API_URI } = import.meta.env

  const ermValues: Array<EditorRenderMode> = [
    'edition-owner',
    'edition-editor',
    'edition-viewer',
    'viewonly-public',
    'viewonly-private',
    'showcase',
    'edition-locked',
  ]
  const [fileId, setFileId] = useState<string>(VITE_FILE_ID)
  const [token, setToken] = useState<string>('Bearer')
  const [mode, setMode] = useState<EditorRenderMode>('edition-owner')

  const [_leave, setLeave] = useState<boolean>(false)
  const [render, setRender] = useState<boolean>(false)

  const toggleRender = () => {
    if (render) {
      setLeave(true)
      setTimeout(() => setLeave(false), 200)
    }
    setTimeout(() => setRender(!render), 150)
  }

  return (
    <>
      <div className="settings">
        <div>
          <div>
            <b>Common settings</b>
          </div>
          <div>
            <input type="checkbox" checked disabled />
            persistanceApiUrl :
            {' '}
            {VITE_PERSISTANCE_API_URL}
          </div>
          <div>
            <input type="checkbox" checked disabled />
            fileId :
            {' '}
            <input type="text" value={fileId} onChange={e => setFileId(e.target.value)} />
          </div>
          <div>
            <input type="checkbox" checked={token.startsWith('Bearer ')} disabled />
            token :
            {' '}
            <input type="text" value={token} onChange={e => setToken(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div>
            <input type="checkbox" checked={!token.startsWith('Bearer ')} disabled />
            userInfoApiUrl :
            {' '}
            {VITE_USER_INFO_API_URI}
          </div>
          <div>
            <input type="checkbox" checked disabled />
            mode :
            {ermValues.map((erm, index) => {
              return (
                <label key={index}>
                  <input type="radio" checked={mode === erm} onChange={() => setMode(erm)} />
                  {erm}
                </label>
              )
            })}
          </div>
        </div>
        <div>
          <div>
            <b>Actions</b>
          </div>
          <button type="button" onClick={toggleRender}>
            {render ? 'Unmount' : 'Mount'}
          </button>
        </div>
      </div>
      <main>
        <div className="app-container">
          <div className="wisemapping__editor">
            {render && (
              <WisemappingEditor
                persistanceApiUrl={VITE_PERSISTANCE_API_URL}
                fileId={fileId}
                token={token.startsWith('Bearer ') ? token : undefined}
                userInfoApiUrl={VITE_USER_INFO_API_URI}
                mode={mode}
              />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
