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

import { CustomError } from '@/utils/CustomError.ts'
import oidc, { type JWT } from '@uportal/open-id-connect'

let currentUser: string | undefined

async function getToken(apiUrl: string): Promise<{ encoded: string, decoded: JWT }> {
  const { encoded, decoded } = await oidc({
    userInfoApiUrl: apiUrl,
  })
  if (decoded.sub.startsWith('guest')) {
    currentUser = undefined
    throw new CustomError('You are not logged', 401)
  }
  else {
    currentUser = decoded.sub
  }

  return { encoded, decoded }
}

export { currentUser, getToken }
