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

import { instance } from '@/utils/axiosUtils.ts'

async function getPaginatedNews(
  getUserNewsUrl: string,
  pageIndex?: number | undefined,
  source?: string | undefined,
  rubriques?: Array<number> | undefined,
  lecture?: boolean | undefined,
) {
  try {
    const params: Record<string, any> = {}
    // Ajoute les paramètres uniquement s'ils sont définis
    if (pageIndex !== undefined)
      params.pageIndex = pageIndex - 1
    if (source)
      params.source = source
    if (rubriques && rubriques.length > 0) {
      params.rubriques = rubriques.join(',')
    }
    params.lecture = lecture

    const response = await instance.get(getUserNewsUrl, { params })
    return response.data
  }
  catch (e: any) {
    console.error(e)
  }
}

async function getItemById(getItemByIdUrl: string, itemId: string) {
  try {
    const response = await instance.get(`${getItemByIdUrl + itemId.toString()}`)
    return response.data
  }
  catch (error) {
    console.error('Failed to load item :', error)
  }
}

async function getNewsReadingInformations(getNewsReadingInformations: string) {
  try {
    const response = await instance.get(getNewsReadingInformations)
    return response.data
  }
  catch (error) {
    console.error('Failed to load item :', error)
  }
}

async function setReading(setReadingUrl: string, itemId: number | undefined, isRead: boolean) {
  try {
    if (itemId) {
      return (await instance.patch(`${setReadingUrl + itemId.toString()}/${isRead.toString()}`))
    }
  }
  catch (error) {
    console.error('Failed to load item :', error)
  }
}

export {
  getItemById,
  getNewsReadingInformations,
  getPaginatedNews,
  setReading,
}
