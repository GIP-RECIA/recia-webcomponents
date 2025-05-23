<!--
 Copyright (C) 2023 GIP-RECIA, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<script setup lang="ts">
import type { Ressource } from '@/types/ressourceType'
import { onMounted, ref } from 'vue'
import {
  getRessourcesDiffusables,
  getRessourcesDiffusablesWithRechercheFilter,
  setResourcesPerPage,
} from '@/services/serviceRessourcesDiffusables'
import { initToken } from '@/utils/axiosUtils'
import { RechercheFilter } from '@/utils/RechercheFilter'

const props = defineProps<{
  baseApiUrl: string
  ressourcesDiffusablesApiUri: string
  userInfoApiUrl: string
  resourcesPerPageDefault: number
}>()

const ressources = ref<Array<Ressource>>([])
const erreur = ref<string>('')
const nombreRessourcesTotal = ref<number>(0)
const currentPageIndexHumanReadable = ref<number>(0)
const lectureTerminee = ref<boolean>(false)
const chargement = ref<boolean>(false)
const recherche = ref<string>('')
const rechercheFilter = ref<RechercheFilter>()
const rechercheAvanceeActive = ref<boolean>(false)
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
  getRessourcesDiffusablesFromPage(1)
}

async function reinitialiserRechercheAvancee(rechercheInput: CustomEvent): Promise<void> {
  if (!rechercheAvanceeActive.value) {
    return
  }
  rechercheFilter.value = rechercheInput.detail[0]
  getRessourcesDiffusablesFromPage(1)
}

async function recommencerRechercheInput(rechercheInput: CustomEvent): Promise<void> {
  if (rechercheAvanceeActive.value) {
    return
  }
  recherche.value = rechercheInput.detail[0]
  getRessourcesDiffusablesFromPage(1)
}

async function recommencerRechercheAvanceeInput(rechercheInput: CustomEvent): Promise<void> {
  if (!rechercheAvanceeActive.value) {
    return
  }
  rechercheFilter.value = rechercheInput.detail[0]
  getRessourcesDiffusablesFromPage(1)
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
    if (response.status === 200) {
      const payload = response.data.payload
      handlePayload(payload)
    }
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
  }

  if (typeof pagination.pageIndexHumanReadable === 'number') {
    currentPageIndexHumanReadable.value = pagination.pageIndexHumanReadable
  }

  refreshKey.value = true
  refreshKey.value = false
  const ressourcesDiffusables = payload.ressourcesDiffusables
  ressources.value = ressourcesDiffusables
}

function maxPagesCountFromObjectsCount(): number {
  if (currentPageIndexHumanReadable.value === -1) {
    return 0
  }
  return Math.ceil(nombreRessourcesTotal.value / props.resourcesPerPageDefault)
}

async function getRessourcesDiffusablesFromPage(pageIndexHumanReadable: number): Promise<void> {
  if (pageIndexHumanReadable <= maxPagesCountFromObjectsCount() || pageIndexHumanReadable === 1) {
    erreur.value = ''
    chargement.value = true
    try {
      let response

      if (rechercheAvanceeActive.value === true) {
        response = await getRessourcesDiffusablesWithRechercheFilter(
          props.baseApiUrl + props.ressourcesDiffusablesApiUri,
          props.userInfoApiUrl,
          pageIndexHumanReadable,
          rechercheFilter.value !== undefined ? rechercheFilter.value : new RechercheFilter(),
        )
      }
      else {
        response = await getRessourcesDiffusables(
          props.baseApiUrl + props.ressourcesDiffusablesApiUri,
          props.userInfoApiUrl,
          pageIndexHumanReadable,
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

function goToPage(event: CustomEvent) {
  getRessourcesDiffusablesFromPage(event.detail[0])
}

function swapRechercheTypeToggle(rechercheInput: CustomEvent): void {
  rechercheAvanceeActive.value = rechercheInput.detail[0]
  getRessourcesDiffusablesFromPage(1)
}
</script>

<template>
  <div class="cadre-page-ressource">
    <aside class="aside-page-ressource">
      <recherche-type-toggle @swap-recherche-type-toggle="swapRechercheTypeToggle" />
      <recherche-ressource
        v-show="!rechercheAvanceeActive"
        :nombre-ressources-total="nombreRessourcesTotal"
        :nombre-ressources-affichees="ressources.length"
        @recommencer-recherche-input="recommencerRechercheInput"
        @reinitialiser-recherche="reinitialiserRecherche"
      />
      <recherche-avancee-ressource
        v-show="rechercheAvanceeActive"
        :nombre-ressources-total="nombreRessourcesTotal"
        :nombre-ressources-affichees="ressources.length"
        @recommencer-recherche-avancee-input="recommencerRechercheAvanceeInput"
        @reinitialiser-recherche-avancee="reinitialiserRechercheAvancee"
      />
    </aside>
    <div class="main-page-ressource">
      <liste-ressources
        :ressources="ressources"
        :erreur="erreur"
        :lecture-terminee="lectureTerminee"
        :chargement="chargement"
        :last-page-index-human-readable="maxPagesCountFromObjectsCount()"
        :current-page-index-human-readable="currentPageIndexHumanReadable"
        @go-to-page="goToPage"
      />
    </div>
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
}
</style>
