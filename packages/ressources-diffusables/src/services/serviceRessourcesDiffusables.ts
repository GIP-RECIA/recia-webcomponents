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

async function getToken(userInfoApiUrl: string): Promise<string> {
  const { encoded } = await oidc({ userInfoApiUrl })

  return encoded
}

function getUrlParams(recherche: string): string {
  return recherche !== ''
    ? `&operator=OR&idRessource=${recherche}&nomRessource=${recherche}&idEditeur=${recherche}&nomEditeur=${recherche}&distributeurCom=${recherche}&nomDistributeurCom=${recherche}&distributeurTech=${recherche}&nomDistributeurTech=${recherche}`
    : ''
}

async function getRessourcesDiffusables(url: string, userInfoApiUrl: string, page: number, recherche: string) {
  return await axios.get(`${url}?ressourcesPerPage=20&page=${page}${getUrlParams(recherche)}`, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  })
}

async function getSize(url: string, userInfoApiUrl: string, recherche: string) {
  return await axios.get(`${url}?${getUrlParams(recherche)}`, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  })
}

export { getRessourcesDiffusables, getSize }
