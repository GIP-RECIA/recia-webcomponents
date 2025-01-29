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
import type {PaginatedResult} from '@/types/PaginatedResult.ts'
import i18n from '@/plugins/i18n.ts'
import {getNewsReadingInformations, getPaginatedNews} from '@/services/NewsService.ts'
import {initToken, instance} from '@/utils/axiosUtils.ts'
import {currentUser} from '@/utils/soffitUtils.ts'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {computed, onMounted, ref} from 'vue'

const props = defineProps<{
  userInfoApiUrl: string
}>()

const result = ref<PaginatedResult>()
const readingInfos = ref<Map<string, boolean>>()

const {t} = i18n.global

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
  } catch (e: any) {
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
        <div class="carousel-header-title">
          {{ t('text.title.news') }}
        </div>
        <button class="carousel-header-see-all-news computer" @click="allActualites">
          {{ t('text.normal.see-all-news') }}
          <FontAwesomeIcon class="arrow-rigth" :icon="['fas', 'arrow-right']"/>
        </button>
      </div>

      <div class="carousel-content-container">
        <button class="arrow left" :disabled="currentIndex === 0" @click="prev">
          <FontAwesomeIcon class="circle-arrow-left" :icon="['fas', 'circle-arrow-left']"/>
        </button>

        <div class="carousel-content">
          <div v-for="(item, index) in visibleItems" :key="index" class="card-wrapper">
            <news-card
              :item="item" :rubriques="getRubriques(item.rubriques)" :page-origin="false"
              :is-read="readingInfos?.has(item.uuid) ? readingInfos.get(item.uuid) : false"
              @update-reading-infos="updateReadingInfos()"
            />
          </div>
        </div>

        <button class="arrow right" :disabled="currentIndex >= result?.actualite?.items?.length - 3" @click="next">
          <FontAwesomeIcon class="circle-arrow-right" :icon="['fas', 'circle-arrow-right']"/>
        </button>

      </div>

      <button class="carousel-header-see-all-news mobile" @click="allActualites">
        {{ t('text.normal.see-all-news') }}
        <FontAwesomeIcon class="arrow-rigth" :icon="['fas', 'arrow-right']"/>
      </button>
    </div>
  </i18n-host>
</template>

<style lang="scss">
@use '@/assets/colors.scss' as *;

* {
  box-sizing: border-box;
}

.carousel-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.carousel-header {
  display: flex;
}

.carousel-header-title {
  color: $standard-colour-black;
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: 700;
}

.carousel-header-see-all-news {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
}

.arrow {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
}

.arrow-rigth {
  width: 11px;
}

.circle-arrow-left {
  width: 2rem;
  height: 2rem;
}

.circle-arrow-right {
  width: 2rem;
  height: 2rem;
}

.arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: transparent;
}

.carousel-header-see-all-news.mobile {
  justify-content: right;
  color: $standard-colour-black;
}

.carousel-header-see-all-news.computer {
  display: none;
}

.arrow {
  display: none;
}

/* Large devices such as laptops (1024px and up) */
@media only screen and (min-width: 1024px) {
  .carousel-container {
    display: flex;
    grid-template-columns: auto 1fr auto;
    grid-auto-rows: auto;
    position: relative;
  }
  .arrow {
    display: block;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    user-select: none;
    padding: 0.5rem;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .carousel-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    justify-content: space-between; /* Écarte les enfants */
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .carousel-content-container {
    position: relative;
  }

  .circle-arrow-left {
    position: absolute;
    left: -2em;
    top: calc(50% - 10px);
  }

  .circle-arrow-right {
    position: absolute;
    right: -2em;
    top: calc(50% - 10px);
  }


  .carousel-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;
    flex-direction: row;
  }

  .card-wrapper {
    min-width: calc(100% / 3); /* Divise l'espace en trois parties égales */
    box-sizing: border-box;
  }

  .carousel-header-see-all-news.computer {
    justify-content: right;
    color: $primary;
  }

  .carousel-header-see-all-news.mobile {
    display: none;
  }
}
</style>
