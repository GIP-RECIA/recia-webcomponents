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

import oidc from '@uportal/open-id-connect'
import axios from 'axios'

async function getToken(userInfoApiUrl: string): Promise<string | undefined> {
  try {
    const { encoded } = await oidc({
      userInfoApiUrl,
    })
    return encoded
  }
  catch (error) {
    console.error('error: ', error)
  }
}

async function getChangeEtab(url: string, userInfoApiUrl: string) {
  return await axios.get(`${url}`, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  })
}

async function updateCurrentStruct(url: string, userInfoApiUrl: string) {
  return await axios.put(`${url}`, null, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  })
}

export { getChangeEtab, updateCurrentStruct }
