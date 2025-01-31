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

import type { StructureDetail } from '@/types/structureType'
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

async function getParametab(url: string, userInfoApiUrl: string) {
  return await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  })
}

async function getDetailEtab(url: string) {
  return await axios.get(url)
}

async function updateEtab(url: string, details: StructureDetail, userInfoApiUrl: string) {
  return await axios.put(url, `${JSON.stringify(details)}`, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/json',
    },
  })
}

async function uploadLogo(url: string, formData: FormData, userInfoApiUrl: string) {
  return await axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${await getToken(userInfoApiUrl)}`,
    },
  })
}

export { getDetailEtab, getParametab, updateEtab, uploadLogo }
