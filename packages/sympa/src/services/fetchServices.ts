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

import type { CreateOrUpdateListFormDataResponsePayload, GroupTreeNode } from '@/types/createListFormTypes'
import type { AdminSympaApiListsResponse } from '@/types/sympaTypes'
import { HttpError } from '@/classes/httpError'

async function getAdditionalGroups(
  url: string,
  timeout: number,
): Promise<Array<GroupTreeNode>> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      signal: AbortSignal.timeout(timeout),
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status)
    }
    return await response.json()
  }
  catch (error) {
    if (error instanceof HttpError) {
      console.error(error.code)
    }
    throw error
  }
}

async function getFormDataForModel(
  url: string,
  timeout: number,
  modelId: string,
  modelParam: string,
): Promise<CreateOrUpdateListFormDataResponsePayload> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modelId, modelParam }),
      credentials: 'include',
      signal: AbortSignal.timeout(timeout),
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status)
    }
    return await response.json()
  }
  catch (error) {
    if (error instanceof HttpError) {
      console.error(error.code)
    }
    throw error
  }
}

async function getAllCreatableAndUpdatableLists(
  url: string,
  timeout: number,
): Promise<AdminSympaApiListsResponse> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      signal: AbortSignal.timeout(timeout),
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status)
    }
    return await response.json()
  }
  catch (error) {
    if (error instanceof HttpError) {
      console.error(error.code)
    }
    throw error
  }
}

async function postCreateOrUpdateList(
  url: string,
  timeout: number,
  modelId: string,
  type: string,
  editorsAliases: string | null,
  editorGroups: string | null,
  typeParam: string | null,

): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelId, type, editorsAliases, editorGroups, typeParam }),
      credentials: 'include',
      signal: AbortSignal.timeout(timeout),
      redirect: 'follow',
    })

    const responseBody: { messageKey?: string } = await response.json()

    if (!response.ok) {
      console.error('Response body:', responseBody)
      throw new HttpError(
        response.statusText || 'Error',
        response.status,
        responseBody,
      )
    }
    // messageKey.value = responseBody.messageKey ?? null
    return responseBody.messageKey ?? ''
  }
  catch (error) {
    if (error instanceof HttpError) {
      console.error(`HTTP Error ${error.code}: ${error.message}`)
      if (error.body) {
        console.error('Body:', error.body)
        return error.body.messageKey ?? ''
        // messageKey.value = error.body.messageKey ?? null
      }
    }
    else {
      console.error('Fetch failed:', error)
    }
    throw error
  }
}

async function postCloseList(
  url: string,
  timeout: number,
  listName: string,

): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listName }),
      credentials: 'include',
      signal: AbortSignal.timeout(timeout),
      redirect: 'follow',
    })

    const responseBody: { messageKey: string } = await response.json()

    if (!response.ok) {
      console.error('Response body:', responseBody)
      throw new HttpError(
        response.statusText || 'Error',
        response.status,
        responseBody,
      )
    }
    messageKey.value = responseBody.messageKey ?? null
    return responseBody.messageKey
  }
  catch (error) {
    if (error instanceof HttpError) {
      console.error(`HTTP Error ${error.code}: ${error.message}`)
      if (error.body) {
        console.error('Body:', error.body)
        return error.body.messageKey
      }
    }
    else {
      console.error('Fetch failed:', error)
    }
    throw error
  }
}

export {
  getAdditionalGroups,
  getAllCreatableAndUpdatableLists,
  getFormDataForModel,
  postCloseList,
  postCreateOrUpdateList,
}
