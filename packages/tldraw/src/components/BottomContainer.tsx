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

import type { WebsocketProvider } from 'y-websocket'
import { faCircleNotch, faFloppyDisk, faTriangleExclamation, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUsers } from 'y-presence'

interface BottomContainerProps {
  isLoading: boolean
  isError: boolean
  isSaving: boolean
  provider?: WebsocketProvider
  darkMode: boolean | undefined
}

export default function BottomContainer({
  isLoading,
  isError,
  isSaving,
  provider,
  darkMode,
}: Readonly<BottomContainerProps>) {
  return (
    <div className="bottom-container" style={{ color: darkMode ? '#f8f9fa' : 'var(--colors-text)' }}>
      {provider && <UserCounter provider={provider} />}
      {isLoading && !isError && <FontAwesomeIcon icon={faCircleNotch} spin />}
      {isError && !isSaving && <FontAwesomeIcon icon={faTriangleExclamation} shake />}
      {isSaving && <FontAwesomeIcon icon={faFloppyDisk} beatFade />}
    </div>
  )
}

interface UserCounterProps {
  provider: WebsocketProvider
}

function UserCounter({ provider }: Readonly<UserCounterProps>) {
  const users = useUsers(provider.awareness)

  return (
    <div>
      <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
      {users.size}
    </div>
  )
}
