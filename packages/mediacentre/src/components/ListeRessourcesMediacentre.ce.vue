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
import type { Ressource } from '@/types/RessourceType'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  filtre: string
  ressources: Array<Ressource>
  chargement: boolean
  baseApiUrl: string
  userInfoApiUrl: string
  erreur: string
  nbResources: number
  dnmaEventName: string
}>()

const emit = defineEmits(['updateFavorite', 'openModal'])

const { t } = useI18n()

const nbHiddenCards = ref<number>(0)
const nbShownCards = ref<number>(props.nbResources)
const nbCards = computed<number>(() => {
  return props.nbResources
})

watch(
  () => props.filtre,
  () => {
    nbHiddenCards.value = 0
    nbShownCards.value = props.nbResources
  },
)

watch(
  () => nbCards.value,
  () => {
    nbShownCards.value = props.nbResources
  },
)

const isError = computed<boolean>(() => {
  return props.erreur !== ''
})

function isEmptyFavoritesList(): void {
  nbHiddenCards.value++
  nbShownCards.value = props.nbResources - nbHiddenCards.value
}

function openModal(event: CustomEvent): void {
  const isModalOpen = true
  const resourceTitle = event.detail[0]
  const resourceEditor = event.detail[1]
  const resourceDescription = event.detail[2]
  const resourceReference = event.detail[3]
  emit('openModal', isModalOpen, resourceTitle, resourceEditor, resourceDescription, resourceReference)
}

function sendUpdateFavorite(event: CustomEvent) {
  const idResource = event.detail[0]
  const isFavorite = event.detail[1]
  emit('updateFavorite', idResource, isFavorite)
}
</script>

<template>
  <div v-if="ressources.length > 0 && nbShownCards > 0" class="cadre-liste-ressources-mediacentre" tabindex="-1" disabled>
    <carte-ressource
      v-for="ressource in ressources"
      v-show="filtre !== 'favoris' || ressource.isFavorite !== false"
      :key="ressource.idRessource"
      :ressource="ressource"
      :base-api-url="baseApiUrl"
      :user-info-api-url="userInfoApiUrl"
      :filtre="filtre"
      :dnma-event-name="dnmaEventName"
      @update-visibility="isEmptyFavoritesList"
      @open-modal="openModal"
      @update-fav="sendUpdateFavorite"
    />
  </div>

  <div v-else class="cadre-liste-ressources-mediacentre">
    <p v-if="isError">
      {{ erreur }}
    </p>
    <p v-else-if="filtre === 'favoris'">
      {{ t('liste-ressources-mediacentre.no-favorite-resources') }}
    </p>
    <p v-else>
      {{ t('liste-ressources-mediacentre.no-resources') }}
    </p>
  </div>
</template>

<style>
.cadre-liste-ressources-mediacentre {
  overflow-x: hidden;

  height: auto;
  box-sizing: border-box;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em;
  padding: 0 2em 2em 2em;
  p {
    text-align: justify;
    padding: 1em;
  }
}

@media only screen and (max-width: 650px) {
  .cadre-liste-ressources-mediacentre {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    margin: 0;
    padding: 2em;
    justify-content: flex-start;
  }
}
</style>
