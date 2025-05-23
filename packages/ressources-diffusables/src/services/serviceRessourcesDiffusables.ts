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
import type { RechercheFilter } from '@/utils/RechercheFilter'
import { instance } from '@/utils/axiosUtils'
import { ref } from 'vue'

const resourcesPerPage = ref<number>(20)

function setResourcesPerPage(nbr: number) {
  resourcesPerPage.value = nbr
}

function getUrlParams(recherche: string): string {
  return recherche !== ''
    ? `&operator=OR&idRessource=${recherche}&nomRessource=${recherche}&idEditeur=${recherche}&nomEditeur=${recherche}&distributeurCom=${recherche}&nomDistributeurCom=${recherche}&distributeurTech=${recherche}&nomDistributeurTech=${recherche}`
    : ''
}
function getUrlParamsWithRechercheFilter(rechercheFilter: RechercheFilter): string {
  if (rechercheFilter.isEmpty()) {
    return ''
  }
  let params: string = '&operator=AND'
  if (rechercheFilter.nomRessource.length > 0)
    params += `&nomRessource=${rechercheFilter.nomRessource}`
  if (rechercheFilter.nomEditeur.length > 0)
    params += `&nomEditeur=${rechercheFilter.nomEditeur}`
  return params
}

async function getRessourcesDiffusables(url: string, userInfoApiUrl: string, page: number, recherche: string) {
  return await instance.get(`${url}?ressourcesPerPage=${resourcesPerPage.value}&page=${page}${getUrlParams(recherche)}`, {})
}

async function getRessourcesDiffusablesWithRechercheFilter(url: string, userInfoApiUrl: string, page: number, recherche: RechercheFilter) {
  return await instance.get(
    `${url}?ressourcesPerPage=${resourcesPerPage.value}&page=${page}${getUrlParamsWithRechercheFilter(recherche)}`,
    {},
  )
}

export {
  getRessourcesDiffusables,
  getRessourcesDiffusablesWithRechercheFilter /* , getSize, getSizeWithRechercheFilter */,
  setResourcesPerPage,
}
