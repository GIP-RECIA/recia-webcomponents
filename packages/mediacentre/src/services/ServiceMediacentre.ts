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

import type { ConfigType } from '@/types/ConfigType'
import type { GestionAffectation } from '@/utils/GestionAffectation'
import { instance } from '@/utils/axiosUtils'
import { CustomError } from '@/utils/CustomError'

let config: Array<ConfigType> = []
let userGroups: Array<string>

async function flushMediacentreFavorites(putUrl: string, fname: string) {
  try {
    await instance.put(`${putUrl}${fname}`, { mediacentreFavorites: [] })
  }
  catch (e: any) {
    throw new CustomError(e.message, e.code)
  }
}

async function getGestionAffectations(gestionAffectationUrl: string, groupsApiUrl: string): Promise<Array<GestionAffectation> | undefined> {
  try {
    if (userGroups === undefined) {
      userGroups = await getGroups(groupsApiUrl)
    }
    const response = await instance.post(gestionAffectationUrl, { isMemberOf: userGroups })
    return response.data
  }
  catch (e: any) {
    if (e.response) {
      throw new CustomError(e.response.data.message, e.response.status)
    }
    else if (e.code === 'ECONNABORTED') {
      throw new CustomError(e.message, e.code)
    }
  }
}

async function getConfig(configApiUrl: string) {
  try {
    const response = await instance.get(configApiUrl)
    config = response.data
  }
  catch (e: any) {
    if (e.response) {
      throw new CustomError(e.response.data.message, e.response.status)
    }
    else if (e.code === 'ECONNABORTED') {
      throw new CustomError(e.message, e.code)
    }
  }
}

async function getGroups(groupsApiUrl: string) {
  try {
    const resp = await instance.get(groupsApiUrl)
    const groupsConfigValues: string[] = config
      .filter((element) => {
        if (element.key === 'groups') {
          return element
        }
        return null
      })
      .map((element) => {
        return element.value
      })
    const regexesGroups: RegExp[] = groupsConfigValues.map((element) => {
      return new RegExp(element)
    })
    const userGroups = new Array<string>()
    for (const element of resp.data.groups) {
      for (const regex of regexesGroups) {
        if (regex.test(element.name)) {
          userGroups.push(element.name)
        }
      }
    }
    return userGroups
  }
  catch (e: any) {
    if (e.response) {
      throw new CustomError(e.response.data.message, e.response.status)
    }
    else if (e.code === 'ECONNABORTED') {
      throw new CustomError(e.message, e.code)
    }
    else {
      throw new Error(e.response)
    }
  }
}

async function getResources(baseApiUrl: string, groupsApiUrl: string) {
  try {
    if (userGroups === undefined) {
      userGroups = await getGroups(groupsApiUrl)
    }
    const response = await instance.post(baseApiUrl, { isMemberOf: userGroups })
    return response.data
  }
  catch (e: any) {
    if (e.response) {
      throw new CustomError(e.response.data.message, e.response.status)
    }
    else if (e.code === 'ECONNABORTED') {
      throw new CustomError(e.message, e.code)
    }
  }
}

async function getFilters(baseApiUrl: string) {
  try {
    const response = await instance.get(`${baseApiUrl}/filters`)
    return response.data
  }
  catch (e: any) {
    if (e.response) {
      throw new CustomError(e.response.data.message, e.response.status)
    }
    else if (e.code === 'ECONNABORTED') {
      throw new CustomError(e.message, e.code)
    }
  }
}

async function getFavorites(getUserFavoriteResourcesUrl: string, fnameMediacentreUi: string) {
  try {
    const response = await instance.get(`${getUserFavoriteResourcesUrl}${fnameMediacentreUi}`)
    const data = response.data
    if (Object.keys(data).length === 0) {
      return new Array<string>()
    }
    return response.data.mediacentreFavorites
  }
  catch (e: any) {
    throw new CustomError(e.response.data.message, e.response.status)
  }
}

async function putFavorites(putUserFavoriteResourcesUrl: string, idResource: string, isFavorite: boolean, resourceFavoriteIds: string[], fnameMediacentreUi: string) {
  try {
    let res: Array<string> = []
    if (isFavorite) {
      res = resourceFavoriteIds.length > 0 ? [...resourceFavoriteIds, idResource] : [idResource]
    }
    else {
      res = resourceFavoriteIds.filter(id => id !== idResource)
    }

    const response = await instance.put(`${putUserFavoriteResourcesUrl}${fnameMediacentreUi}`, {
      mediacentreFavorites: res,
    })

    return response.data
  }
  catch (e: any) {
    throw new CustomError(e.response.data.message, e.response.status)
  }
}

export { flushMediacentreFavorites, getConfig, getFavorites, getFilters, getGestionAffectations, getResources, putFavorites }
