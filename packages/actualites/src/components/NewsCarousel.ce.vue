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
import type { PaginatedResult } from '@/types/PaginatedResult.ts'
import i18n from '@/plugins/i18n.ts'
import { getNewsReadingInformations, getPaginatedNews } from '@/services/NewsService.ts'
import { PageOrigin } from '@/types/PageOrigin.ts'
import { initToken, instance } from '@/utils/axiosUtils.ts'
import { currentUser } from '@/utils/soffitUtils.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  userInfoApiUrl: string
}>()

const result = ref<PaginatedResult>()
const readingInfos = ref<Map<string, boolean>>()

const { t } = i18n.global

onMounted(async () => {
  try {
    if (!instance.defaults.headers.Authorization) {
      await initToken(props.userInfoApiUrl)
    }
    // await getprops.userInfoApiUrlConfig(props.baseApiUrl)
    result.value = await getPaginatedNews(2, undefined, undefined, undefined)
    if (currentUser) {
      const objectResult = await getNewsReadingInformations()
      readingInfos.value = new Map(Object.entries(objectResult))
    }
  }
  catch (e: any) {
    console.error(e)
  }
})

const currentIndex = ref(0)

// Calcul des cartes visibles
const visibleItems = computed(() => {
  return result.value.actualite.items ? result.value.actualite.items.slice(currentIndex.value, currentIndex.value + 3) : []
})

// Fonction pour passer à l'élément précédent
function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// Fonction pour passer à l'élément suivant
function next(): void {
  if (!result.value.actualite)
    return
  if (currentIndex.value < result.value.actualite.items.length - 3) {
    currentIndex.value++
  }
}

function allActualites() {

}

function getRubriques(codesRubriques: number[]) {
  return result.value ? result.value.actualite.rubriques.filter(r => codesRubriques.includes(Number(r.uuid))) : []
}

async function updateReadingInfos() {
  const objectResult = await getNewsReadingInformations()
  readingInfos.value = new Map(Object.entries(objectResult))
}
</script>

<template>
  <i18n-host>
    <div v-if="result?.actualite?.items" class="carousel-container">
      <div class="carousel-header">
        <h1 class="carousel-header-title">
          {{ t('text.title.news') }}
        </h1>
        <button class="carousel-header-see-all-news" @click="allActualites">
          {{ t('text.normal.see-all-news') }}
          <FontAwesomeIcon class="arrow-rigth" :icon="['fas', 'arrow-right']" />
        </button>
      </div>

      <button class="arrow left" :disabled="currentIndex === 0" @click="prev">
        <FontAwesomeIcon class="circle-arrow-left" :icon="['fas', 'circle-arrow-left']" />
      </button>

      <div class="carousel-track">
        <div v-for="(item, index) in visibleItems" :key="index" class="card-wrapper">
          <news-card
            :item="item" :rubriques="getRubriques(item.rubriques)" :page-origin="PageOrigin.CARROUSEL"
            :is-read="readingInfos?.has(item.uuid) ? readingInfos.get(item.uuid) : false"
            @update-reading-infos="updateReadingInfos()"
          />
        </div>
      </div>

      <button class="arrow right" :disabled="currentIndex >= result?.actualite?.items?.length - 3" @click="next">
        <FontAwesomeIcon class="circle-arrow-right" :icon="['fas', 'circle-arrow-right']" />
      </button>
    </div>
  </i18n-host>
</template>

<style lang="scss">
.carousel-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-auto-rows: auto;
}

.carousel-track {
  display: flex;
  background: none;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
}

.arrow {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  padding: 0.5rem;
  grid-row-start: 2;
  grid-row-end: 3;
}

.circle-arrow-left {
  width: 2rem;
  height: 2rem;
}

.circle-arrow-right {
  width: 2rem;
  height: 2rem;
}

.arrow-rigth {
  width: 11px;
}

.arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-track {
  display: flex;
  overflow: hidden;
  flex: 1;
}

.card-wrapper {
  flex: 1;
  min-width: calc(100% / 3); /* Divise l'espace en trois parties égales */
  box-sizing: border-box;
  padding: 0.5rem;
}

.carousel-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: space-between; /* Écarte les enfants */
  padding: 0 16px;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

.carousel-header-title {
  font-family: 'Sora', sans-serif;
  font-size: 24px;
}

.carousel-header-see-all-news {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  background: none;
  border: none;
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 8px;
  color: #1e1e1e;
}

.carousel-header-see-all-news .arrow-right {
  transition: color 0.3s ease; /* Transition pour la flèche */
}

.carousel-header-see-all-news:hover {
  color: #28666e; /* Teinte le texte en bleu */
}

.carousel-header-see-all-news:hover .arrow-right {
  color: #28666e; /* Teinte la flèche en bleu */
}
</style>
