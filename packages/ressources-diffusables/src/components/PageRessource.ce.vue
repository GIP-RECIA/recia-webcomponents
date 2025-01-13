<!--
 Copyright (C) 2023 GIP-RECIA, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed t in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<script setup lang="ts">
import type { Ressource } from '@/types/ressourceType'
import {
  getRessourcesDiffusables,
  getRessourcesDiffusablesWithRechercheFilter,
  setResourcesPerPage,
  // getSize,
  // getSizeWithRechercheFilter,
} from '@/services/serviceRessourcesDiffusables'
import { initToken } from '@/utils/axiosUtils'
import { RechercheFilter } from '@/utils/RechercheFilter'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  baseApiUrl: string
  ressourcesDiffusablesApiUri: string
  ressourcesDiffusablesSizeApiUri: string
  userInfoApiUrl: string
  resourcesPerPageDefault: number
}>()

const ressources = ref<Array<Ressource>>([])
const erreur = ref<string>('')
const nombreRessourcesTotal = ref<number>(0)
const pageActuelle = ref<number>(0)
// const pageSuivante = ref<number>(0);
const lectureTerminee = ref<boolean>(false)
const chargement = ref<boolean>(false)
const recherche = ref<string>('')
const rechercheFilter = ref<RechercheFilter>()
const rechercheAvanceeActive = ref<boolean>(false)
const numerosPagesAffiches = ref<number[]>([])
const refreshKey = ref<boolean>(false)

onMounted(async (): Promise<void> => {
  await initToken(props.userInfoApiUrl)
  // await recommencerRecherche();
  setResourcesPerPage(props.resourcesPerPageDefault)
  await rechercheInitiale()
})

async function reinitialiserRecherche(): Promise<void> {
  if (rechercheAvanceeActive.value) {
    return
  }
  recherche.value = ''
  getPageSuivante(1)
}

async function reinitialiserRechercheAvancee(rechercheInput: CustomEvent): Promise<void> {
  if (!rechercheAvanceeActive.value) {
    return
  }
  rechercheFilter.value = rechercheInput.detail[0]
  getPageSuivante(1)
}

async function recommencerRechercheInput(rechercheInput: CustomEvent): Promise<void> {
  if (rechercheAvanceeActive.value) {
    return
  }
  recherche.value = rechercheInput.detail[0]
  getPageSuivante(1)
}

async function recommencerRechercheAvanceeInput(rechercheInput: CustomEvent): Promise<void> {
  if (!rechercheAvanceeActive.value) {
    return
  }
  rechercheFilter.value = rechercheInput.detail[0]
  getPageSuivante(1)
}

async function rechercheInitiale(): Promise<void> {
  erreur.value = ''
  chargement.value = true
  try {
    const response = await getRessourcesDiffusables(
      props.baseApiUrl + props.ressourcesDiffusablesApiUri,
      props.userInfoApiUrl,
      1 /* Page number, human-readable */,
      recherche.value,
    )
    console.log(props.resourcesPerPageDefault)
    if (response.status === 200) {
      const payload = response.data.payload
      handlePayload(payload)
    }
    console.log(response)
  }
  catch (e: any) {
    erreur.value = e.toString() + (e.response !== undefined ? ` | ${e.response.data.message}` : '')
  }
  chargement.value = false
}

function handlePayload(payload: any) {
  const pagination = payload.pagination
  if (typeof pagination.totalObjectsCount === 'number') {
    nombreRessourcesTotal.value = pagination.totalObjectsCount
    console.log('not undefined if')
  }

  if (typeof pagination.totalObjectsCount === 'number') {
    pageActuelle.value = pagination.pageIndexHumanReadable
    console.log('not undefined if again')
  }

  numerosPagesAffiches.value = pagesNumberToDisplay()
  refreshKey.value = true
  refreshKey.value = false
  console.log(`numero page affiche ${numerosPagesAffiches.value}`)
  console.log(pagesNumberToDisplay())

  const ressourcesDiffusables = payload.ressourcesDiffusables
  console.log(ressourcesDiffusables.length)
  ressources.value = ressourcesDiffusables
}

function maxPagesCountFromObjectsCount(): number {
  console.log(`ressource per page default ${props.resourcesPerPageDefault}`)
  return Math.ceil(nombreRessourcesTotal.value / props.resourcesPerPageDefault)
}

function pagesNumberToDisplay(): number[] {
  const monSet: Set<number> = new Set<number>()

  monSet.add(1)
  if (pageActuelle.value > 1) {
    monSet.add(pageActuelle.value - 1)
  }
  monSet.add(pageActuelle.value)
  monSet.add(Math.min(pageActuelle.value + 1, maxPagesCountFromObjectsCount()))
  monSet.add(maxPagesCountFromObjectsCount())
  // const firstPageArrayLastValue = Math.min(3, maxPagesCountFromObjectsCount())

  // for (let index = 1; index <= firstPageArrayLastValue; index++) {
  //   monSet.add(index)
  // }

  // console.log(firstPageArrayLastValue)

  // const pageAroundUnder: number = Math.max(Math.min(1, pageActuelle.value - 2), 1)
  // const pageAroundUpper: number = Math.min(maxPagesCountFromObjectsCount(), pageActuelle.value + 2)

  // console.log(`${pageAroundUnder} under`)
  // console.log(`${pageAroundUpper} upper`)
  // console.log(`${pageActuelle.value + 4} pa actu +4`)
  // console.log(`${pageActuelle.value} pa actu`)

  // for (let index = pageAroundUnder; index <= pageAroundUpper; index++) {
  //   monSet.add(index)
  // }

  // const lastsPagesArrayStartValue = maxPagesCountFromObjectsCount() - 2
  // console.log(` lastsPagesArrayStartValue${lastsPagesArrayStartValue}`)

  // for (let index = lastsPagesArrayStartValue; index <= maxPagesCountFromObjectsCount(); index++) {
  //   monSet.add(index)
  // }

  return Array.from(monSet)
}

// async function recommencerRecherche(): Promise<void> {
//   ressources.value = []
//   erreur.value = ''
//   chargement.value = true
//   try {
//     // nombreRessourcesTotal.value = response.data.payload;
//     if (nombreRessourcesTotal.value === 0) {
//       lectureTerminee.value = true
//       chargement.value = false
//     }
//     else {
//       lectureTerminee.value = false
//       getPageSuivante(1)
//     }
//   }
//   catch (e: any) {
//     erreur.value = e.toString() + (e.response !== undefined ? ` | ${e.response.data.message}` : '')
//     chargement.value = false
//   }
// }

// async function recommencerRechercheAvancee(): Promise<void> {
//   ressources.value = []
//   erreur.value = ''
//   chargement.value = true
//   try {
//     const response = await getSizeWithRechercheFilter(
//       props.baseApiUrl + props.ressourcesDiffusablesSizeApiUri,
//       props.userInfoApiUrl,
//       rechercheFilter.value !== undefined ? rechercheFilter.value : new RechercheFilter(),
//     )
//     nombreRessourcesTotal.value = response.data.payload
//     if (nombreRessourcesTotal.value === 0) {
//       lectureTerminee.value = true
//       chargement.value = false
//     }
//     else {
//       lectureTerminee.value = false
//       getPageSuivanteRechercheAvancee()
//     }
//   }
//   catch (e: any) {
//     erreur.value = e.toString() + (e.response !== undefined ? ` | ${e.response.data.message}` : '')
//     chargement.value = false
//   }
// }

async function getPageSuivante(nbr: number): Promise<void> {
  // if (!lectureTerminee.value) {
  if (nbr <= maxPagesCountFromObjectsCount()) {
    erreur.value = ''
    chargement.value = true
    try {
      let response

      if (rechercheAvanceeActive.value === true) {
        response = await getRessourcesDiffusablesWithRechercheFilter(
          props.baseApiUrl + props.ressourcesDiffusablesApiUri,
          props.userInfoApiUrl,
          nbr,
          rechercheFilter.value !== undefined ? rechercheFilter.value : new RechercheFilter(),
        )
      }
      else {
        response = await getRessourcesDiffusables(
          props.baseApiUrl + props.ressourcesDiffusablesApiUri,
          props.userInfoApiUrl,
          nbr,
          recherche.value,
        )
      }

      const payload = response.data.payload
      handlePayload(payload)
    }
    catch (e: any) {
      erreur.value = e.toString() + (e.response !== undefined ? ` | ${e.response.data.message}` : '')
    }
    chargement.value = false
  }
}

// async function getPageSuivanteRechercheAvancee(): Promise<void> {
//   if (!lectureTerminee.value) {
//     erreur.value = ''
//     chargement.value = true
//     try {
//       const response = await getRessourcesDiffusablesWithRechercheFilter(
//         props.baseApiUrl + props.ressourcesDiffusablesApiUri,
//         props.userInfoApiUrl,
//         pageActuelle.value + 1,
//         rechercheFilter.value !== undefined ? rechercheFilter.value : new RechercheFilter(),
//       )
//       ressources.value = ressources.value.concat(response.data.payload)
//       if (ressources.value.length === nombreRessourcesTotal.value) {
//         lectureTerminee.value = true
//       }
//     }
//     catch (e: any) {
//       erreur.value = e.toString() + (e.response !== undefined ? ` | ${e.response.data.message}` : '')
//     }
//     chargement.value = false
//   }
// }

function swapRechercheTypeToggle(rechercheInput: CustomEvent): void {
  rechercheAvanceeActive.value = rechercheInput.detail[0]
  getPageSuivante(1)
}

function clickfct(targetPageNbr: number) {
  // if (targetPageNbr === pageActuelle.value) {
  //   return
  // }
  console.log(`click ${targetPageNbr}`)
  getPageSuivante(targetPageNbr)
}
</script>

<template>
  <div class="cadre-page-ressource">
    <aside class="aside-page-ressource">
      <recherche-type-toggle @swap-recherche-type-toggle="swapRechercheTypeToggle" />
      <recherche-ressource
        v-show="!rechercheAvanceeActive"
        ref="rechercheRessource"
        :nombre-ressources-total="nombreRessourcesTotal"
        :nombre-ressources-affichees="ressources.length"
        @recommencer-recherche-input="recommencerRechercheInput"
        @reinitialiser-recherche="reinitialiserRecherche"
      />
      <recherche-avancee-ressource
        v-show="rechercheAvanceeActive"
        ref="rechercheAvanceeRessource"
        :nombre-ressources-total="nombreRessourcesTotal"
        :nombre-ressources-affichees="ressources.length"
        @recommencer-recherche-avancee-input="recommencerRechercheAvanceeInput"
        @reinitialiser-recherche-avancee="reinitialiserRechercheAvancee"
      />
      <legende-ressource class="legende-ressource-page-ressource" />
    </aside>
    <main class="main-page-ressource">
      <liste-ressources
        ref="listeRessource"
        :ressources="ressources"
        :erreur="erreur"
        :lecture-terminee="lectureTerminee"
        :chargement="chargement"
        :last-page-index-human-readable="maxPagesCountFromObjectsCount()"
        :current-page-index-human-readable="pageActuelle"
      />
    </main>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.cadre-page-ressource {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-page-ressource {
  height: 100%;
}

.legende-ressource-page-ressource {
  display: none;
}

@media (min-width: 1024px) {
  .cadre-page-ressource {
    flex-direction: row;
  }

  .aside-page-ressource {
    max-height: 100%;
    min-width: 20%;
    overflow-y: hidden;
    margin-right: -$margin;
  }

  .main-page-ressource {
    min-width: 80%;
  }

  .legende-ressource-page-ressource {
    display: block;
  }

  .current {
    background-color: $button-background-color;
    color: $button-text-color;
    border-radius: 5px;
    border-color: transparent;
  }

  button:not(.current) {
    cursor: pointer;
  }
}
</style>
