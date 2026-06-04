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
async function getMCE(url: string, userInfoApiUrl: string) {
  return await axios.get(`${url}`, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  })
}

async function getContentOnglet(url: string, userInfoApiUrl: string) {
  return await axios.get(`${url}`, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  })
}

async function getServicesEnt(url: string, userInfoApiUrl: string) {
  return await axios.get(`${url}`, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  })
}

async function getDetailEnfant(url: string, userInfoApiUrl: string) {
  return await axios.get(`${url}`, {
    headers: {
      'Authorization': `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  })
}

async function postPassword(
  url: string,
  oldPass: string,
  newPass: string,
  confirmPass: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)

  return await axios.post(
    `${url}`,
    {
      oldPass,
      newPass,
      confirmPass,
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      },
    },
  )
}

async function updateEmail(
  url: string,
  email: string,
  confirmEmail: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)

  return await axios.put(
    url,
    {
      email,
      confirmEmail,
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      },
    },
  )
}

async function updateFonctionDateFin(
  url: string,
  active: boolean,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)

  return await axios.put(
    url,
    active, // IMPORTANT: boolean brut
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      },
    },
  )
}

/**
 * Met à jour l'avatar de l'utilisateur
 * @param uid Identifiant de l'utilisateur
 * @param file Le fichier image (File ou Blob)
 * @param baseUrl URL de base de l'API
 * @param userInfoApiUrl URL de configuration OIDC
 */
async function updateAvatar(
  uid: string,
  file: File | Blob,
  baseUrl: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)

  const formData = new FormData()
  formData.append('file', file)

  return axios.post(
    `${baseUrl}/${uid}/avatar`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}

export { getContentOnglet, getDetailEnfant, getMCE, getServicesEnt, postPassword, updateAvatar, updateEmail, updateFonctionDateFin }
