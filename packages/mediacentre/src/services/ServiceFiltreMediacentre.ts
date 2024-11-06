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

import type { Filtres } from '@/types/FiltresType'
import type { Filtre } from '@/types/FiltreType'
import type { Ressource } from '@/types/RessourceType'

function getFilters(resources: Array<Ressource>, filterCategories: Array<string>): Array<Filtres> {
  const filters: Array<Filtres> = []
  for (const filtre of filterCategories) {
    const values: Filtres | undefined = getFilterCategories(filtre, resources)
    if (values !== undefined) {
      filters.push(values)
    }
  }
  return filters
}

function getFilterCategories(filter: string, resources: Array<Ressource>): Filtres | undefined {
  let values

  switch (filter) {
    case 'NIVEAU_EDUCATIF_FILTER':
      values = new Set(resources.map(resource => resource.niveauEducatif).flat())
      values = Array.from(values)
      break
    case 'TYPE_PRESENTATION_FILTER':
      values = new Set(resources.map(resource => resource.typePresentation).flat())
      values = Array.from(values)
      break
    case 'DOMAINE_ENSEIGNEMENT_FILTER':
      values = new Set(resources.map(resource => resource.domaineEnseignement).flat())
      values = Array.from(values)
      break
    case 'UAI_FILTER':
      values = resources.map(resource => resource.idEtablissement).flat()
      values = [...new Set(values)]
      break
    default:
      return undefined
  }

  return convertToFiltres(values, filter)
}

function convertToFiltres(values: Array<any>, filter: string): Filtres | undefined {
  const filters: Array<Filtre> = []
  let filtres
  if (values.length === 0) {
    return
  }
  switch (filter) {
    case 'NIVEAU_EDUCATIF_FILTER':
      values.forEach((item) => {
        filters.push({
          id: item.nom,
          nom: item.nom,
        })
      })
      filtres = {
        name: 'menu-mediacentre.niveau-educatif-filter',
        filterEnum: filter,
        filters: supprimerDoublons(filters),
      }
      break
    case 'TYPE_PRESENTATION_FILTER':
      values.forEach((item) => {
        filters.push({
          id: item.code,
          nom: item.nom,
        })
      })
      filtres = {
        name: 'menu-mediacentre.type-presentation-filter',
        filterEnum: filter,
        filters: supprimerDoublons(filters),
      }
      break
    case 'DOMAINE_ENSEIGNEMENT_FILTER':
      values.forEach((item) => {
        filters.push({
          id: item.nom,
          nom: item.nom,
        })
      })
      filtres = {
        name: 'menu-mediacentre.domaine-education-filter',
        filterEnum: filter,
        filters: supprimerDoublons(filters),
      }
      break
    case 'UAI_FILTER':
      values.forEach((item) => {
        filters.push({
          id: item.UAI,
          nom: item.nom.toLowerCase(),
        })
      })
      filtres = {
        name: 'menu-mediacentre.uai-filter',
        filterEnum: filter,
        filters: supprimerDoublons(filters),
      }
      break
    default:
  }
  return filtres
}

function supprimerDoublons(filtres: Filtre[]): Filtre[] {
  const unique = new Set<string>()
  return filtres.filter((filtre) => {
    const isPresentInSet = unique.has(filtre.id)
    unique.add(filtre.id)
    return !isPresentInSet
  })
}

export { getFilters }
