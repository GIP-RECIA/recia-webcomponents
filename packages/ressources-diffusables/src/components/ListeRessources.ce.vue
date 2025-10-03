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
import i18n from '@/plugins/i18n'

defineProps<{
  ressources: Array<Ressource>
  erreur: string
  lectureTerminee: boolean
  chargement: boolean | null
  lastPageIndexHumanReadable: number
  currentPageIndexHumanReadable: number
}>()
const emit = defineEmits<(event: 'goToPage', payload: number) => void>()

const { t } = i18n.global

function goToPage(pageIndex: CustomEvent) {
  emit('goToPage', pageIndex.detail[0])
}
</script>

<template>
  <div class="cadre-liste-ressources">
    <div>
      <carte-ressource v-for="ressource in ressources" :key="ressource.ressource.id" :ressource="ressource" />
    </div>
    <footer>
      <p v-if="chargement" class="chargement-liste-ressources">
        {{ t('liste-ressources.chargement') }}
      </p>
      <p v-else-if="erreur !== ''">
        {{ t('liste-ressources.erreur') }}<br>
        {{ t('liste-ressources.detail-erreur') }}: <code>{{ erreur }}</code>
      </p>
      <p v-else-if="ressources.length === 0">
        {{ t('liste-ressources.aucune-ressource') }}
      </p>
      <ressources-pagination
        :last-page-index-human-readable="lastPageIndexHumanReadable"
        :current-page-index-human-readable="currentPageIndexHumanReadable"
        @go-to-page="goToPage"
      />
    </footer>
  </div>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

.cadre-liste-ressources {
  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 32px;
  }

  > footer {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;

    > .chargement-liste-ressources {
      font-size: x-large;
      font-weight: bold;
    }
  }

  @media (width >= 768px) {
    > div {
      gap: 16px;
      margin-bottom: 48px;
    }
  }
}
</style>
