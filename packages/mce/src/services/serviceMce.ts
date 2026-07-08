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

class ApiError extends Error {
  response: { data: any, status: number }

  constructor(data: any, status: number) {
    super(`API error ${status}`)
    this.response = { data, status }
  }
}

async function getToken(userInfoApiUrl: string): Promise<string | undefined> {
  try {
    const { encoded } = await oidc({ userInfoApiUrl })
    
    return encoded
  }
  catch (error) {
    console.error('error: ', error)
  }
}

async function throwIfNotOk(response: Response): Promise<void> {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new ApiError(data, response.status)
  }
}

async function fetchJson(url: string, userInfoApiUrl: string): Promise<{ data: any }> {
  const token = await getToken(userInfoApiUrl)
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/jwt',
    },
  })
  await throwIfNotOk(response)

  const text = await response.text()
  try {
    return { data: JSON.parse(text) }
  }
  catch {
    throw new Error(`L'API a retourné une réponse invalide (attendu JSON). URL: ${url}`)
  }
}

async function getMCE(url: string, userInfoApiUrl: string) {
  return fetchJson(url, userInfoApiUrl)
}

async function getServicesEnt(url: string, userInfoApiUrl: string) {
  return fetchJson(url, userInfoApiUrl)
}

async function getDetailEnfant(url: string, userInfoApiUrl: string) {
  return fetchJson(url, userInfoApiUrl)
}

async function postPassword(
  baseUrl: string,
  userId: string,
  oldPass: string,
  newPass: string,
  confirmPass: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)
  const response = await fetch(`${baseUrl}/${userId}/change-password`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ oldPass, newPass, confirmPass }),
  })
  await throwIfNotOk(response)
  return { data: await response.json().catch(() => null) }
}

async function updateEmail(
  baseUrl: string,
  userId: string,
  email: string,
  confirmEmail: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)
  const response = await fetch(`${baseUrl}/${userId}/update-email`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, confirmEmail }),
  })
  await throwIfNotOk(response)
  return { data: await response.json().catch(() => null) }
}

async function updateFonctionDateFin(
  baseUrl: string,
  idFonction: string | number,
  active: boolean,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)
  const response = await fetch(`${baseUrl}/fonction/${idFonction}/dateFin`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(active),
  })
  await throwIfNotOk(response)
  return { data: await response.json().catch(() => null) }
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
  const response = await fetch(`${baseUrl}/${uid}/avatar`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  await throwIfNotOk(response)
  return { data: await response.json().catch(() => null) }
}

async function getPreferences(url: string, preferencesData: any, userInfoApiUrl: string) {
  const token = await getToken(userInfoApiUrl)


  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })

  await throwIfNotOk(response)

  const text = await response.text()
  try {
    return { data: JSON.parse(text) }
  }
  catch {
    return { data: text }
  }
}

async function postPreferences(url: string, preferencesData: any, userInfoApiUrl: string) {
  const token = await getToken(userInfoApiUrl)


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(preferencesData),
  })

  await throwIfNotOk(response)

  const text = await response.text()
  try {
    return { data: JSON.parse(text) }
  }
  catch {
    return { data: text }
  }
}

export {  getDetailEnfant, getMCE, getServicesEnt, postPassword, updateAvatar, updateEmail, updateFonctionDateFin, getPreferences, postPreferences }

