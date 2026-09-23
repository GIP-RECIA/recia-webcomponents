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

const MCE_API_SEGMENT = '/api/personne/mce'
const CHARTE_REQUIRED_CODE = 'CHARTE_REQUIRED'

/**
 * Calcule l'URL de la page d'activation (où la charte est signée) à partir d'une URL d'API MCE
 * (ex. '/ismail/api/personne/mce/...' → '/ismail/activation').
 */
function activationPageUrl(apiUrl: string): string {
  const base = apiUrl.split(MCE_API_SEGMENT)[0]
  return `${base}/activation`
}

/**
 * Clé de stockage du jeton OIDC transmis au SPA d'activation. Le widget et la page
 * d'activation étant servis sur le même hôte, `sessionStorage` (par onglet) est partagé
 * et permet de transmettre le jeton sans le faire transiter dans l'URL (logs, proxies,
 * limites de taille). Le SPA le consomme puis l'efface.
 */
const CHARTE_TOKEN_STORAGE_KEY = 'mce-charte-token'

/**
 * Redirige le navigateur vers la page d'activation (où la charte est signée).
 * On transmet l'URL courante (l'ENT) en paramètre `returnTo` afin d'y revenir après
 * signature, et le jeton OIDC courant via `sessionStorage` : le SPA d'activation n'a pas
 * d'autre moyen de s'authentifier, sans quoi il affiche l'écran LOGIN au lieu du seul
 * bloc charte (fallback : paramètre `token` de l'URL si le stockage est indisponible).
 * La charte est acceptée sur /activation : le compte étant déjà activé et l'utilisateur
 * connecté (SSO), seul le bloc charte s'affiche, sans identifiant ni mot de passe.
 */
async function redirectToCharte(apiUrl?: string, userInfoApiUrl?: string): Promise<void> {
  const dest = apiUrl ? activationPageUrl(apiUrl) : '/activation'
  const token = userInfoApiUrl ? await getToken(userInfoApiUrl) : undefined

  const params = new URLSearchParams({ returnTo: window.location.href })
  if (token) {
    try {
      sessionStorage.setItem(CHARTE_TOKEN_STORAGE_KEY, token)
    }
    catch (error) {
      console.error('SessionStorage indisponible, repli sur le paramètre d\'URL.', error)
      params.set('token', token)
    }
  }
  window.location.assign(`${dest}?${params.toString()}`)
}

async function throwIfNotOk(response: Response, requestUrl?: string, userInfoApiUrl?: string): Promise<void> {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    if (response.status === 403 && data?.code === CHARTE_REQUIRED_CODE) {
      await redirectToCharte(requestUrl, userInfoApiUrl)
    }
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
  await throwIfNotOk(response, url, userInfoApiUrl)

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
  oldPass: string,
  newPass: string,
  confirmPass: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)
  const response = await fetch(`${baseUrl}/change-password`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ oldPass, newPass, confirmPass }),
  })
  await throwIfNotOk(response, `${baseUrl}/change-password`, userInfoApiUrl)
  return { data: await response.json().catch(() => null) }
}

export interface NetworkPasswordResetStatus {
  eligible: boolean
}

/**
 * Statut du parcours « mot de passe réseau » (compte CVDL ntPass sans mot de passe local).
 * L'éligibilité étant calculée côté serveur (groupes LDAP), ce GET détermine l'écran à afficher.
 */
async function getNetworkPasswordStatus(
  baseUrl: string,
  userInfoApiUrl: string,
): Promise<{ data: NetworkPasswordResetStatus }> {
  const url = `${baseUrl}/network-password/status`
  return getMCE(url, userInfoApiUrl)
}

/** Change le mot de passe réseau directement (compte authentifié, sans ancien mot de passe ni code). */
async function resetNetworkPassword(
  baseUrl: string,
  newPass: string,
  confirmPass: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)
  const response = await fetch(`${baseUrl}/network-password/reset`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ newPassword: newPass, confirmPassword: confirmPass }),
  })
  await throwIfNotOk(response, `${baseUrl}/network-password/reset`, userInfoApiUrl)
  return { data: await response.json().catch(() => null) }
}

async function updateEmail(
  baseUrl: string,
  email: string,
  confirmEmail: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)
  const response = await fetch(`${baseUrl}/update-email`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, confirmEmail }),
  })
  await throwIfNotOk(response, `${baseUrl}/update-email`, userInfoApiUrl)
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
  await throwIfNotOk(response, `${baseUrl}/fonction/${idFonction}/dateFin`, userInfoApiUrl)
  return { data: await response.json().catch(() => null) }
}

/**
 * Met à jour l'avatar de l'utilisateur
 * @param file Le fichier image (File ou Blob)
 * @param baseUrl URL de base de l'API
 * @param userInfoApiUrl URL de configuration OIDC
 */
async function updateAvatar(
  file: File | Blob,
  baseUrl: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(`${baseUrl}/avatar`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  await throwIfNotOk(response, `${baseUrl}/avatar`, userInfoApiUrl)
  return { data: await response.json().catch(() => null) }
}

async function verifyEmail(
  baseUrl: string,
  code: string,
  userInfoApiUrl: string,
) {
  const token = await getToken(userInfoApiUrl)
  const response = await fetch(`${baseUrl}/verify-email`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })
  await throwIfNotOk(response, `${baseUrl}/verify-email`, userInfoApiUrl)
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

  await throwIfNotOk(response, url, userInfoApiUrl)

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

  await throwIfNotOk(response, url, userInfoApiUrl)

  const text = await response.text()
  try {
    return { data: JSON.parse(text) }
  }
  catch {
    return { data: text }
  }
}

export { getDetailEnfant, getMCE, getNetworkPasswordStatus, getPreferences, getServicesEnt, postPassword, postPreferences, resetNetworkPassword, updateAvatar, updateEmail, updateFonctionDateFin, verifyEmail }
