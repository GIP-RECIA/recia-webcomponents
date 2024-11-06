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

import type { MultiplayerEditorProps } from '../types/MultiplayerEditorProps.ts'
import { Tldraw } from '@gip-recia/tldraw-v1'
import { useMultiplayer } from '../hooks/useMultiplayer.ts'
import { CustomCursor } from './Cursor.tsx'

const components = {
  Cursor: CustomCursor,
}

export default function MultiplayerEditor({
  persistanceApiUrl,
  assetsApiUrl,
  token,
  websocketApiUrl,
  roomId,
  initUrl,
  owner,
  clearOnLeave,
  leave,
  setProvider,
  ...params
}: Readonly<MultiplayerEditorProps>) {
  const { debug, autoSave, autoSaveDelay, open, isReady, setIsSaving, setIsLoading, setIsError, setIsReady } = params

  const props = {
    ...params,
    ...useMultiplayer(
      debug,
      persistanceApiUrl,
      assetsApiUrl,
      token,
      websocketApiUrl,
      roomId,
      initUrl,
      owner,
      clearOnLeave,
      leave,
      autoSave,
      autoSaveDelay,
      open,
      isReady,
      setIsSaving,
      setIsLoading,
      setIsError,
      setIsReady,
      setProvider,
    ),
  }

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      hideNewReleaseLink
      hideSocialLinks
      hideSponsorLink
      {...props}
    />
  )
}
