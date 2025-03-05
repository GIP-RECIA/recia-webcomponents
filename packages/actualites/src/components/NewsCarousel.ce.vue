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
import { initToken, instance } from '@/utils/axiosUtils.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  getItemByIdUrl: string
  baseUrl: string
  userInfoApiUrl: string
  getUserNewsUrl: string
  setReadingUrl: string
  getNewsReadingInformationsUrl: string
  allNewsPageUrl: string
}>()

const result = ref<PaginatedResult>()
const readingInfos = ref<Map<string, boolean>>()
const loading = ref(true) // État de chargement

const { t } = i18n.global

onMounted(async () => {
  try {
    if (!instance.defaults.headers.Authorization) {
      await initToken(props.userInfoApiUrl)
    }
    // await getprops.userInfoApiUrlConfig(props.baseApiUrl)
    result.value = await getPaginatedNews(props.getUserNewsUrl, undefined, undefined, undefined)
    const objectResult = await getNewsReadingInformations(props.getNewsReadingInformationsUrl)
    readingInfos.value = new Map(Object.entries(objectResult))
  }
  catch (e: any) {
    console.error(e)
  }
  finally {
    loading.value = false // Fin du chargement
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

function allActualites() {}

function getRubriques(codesRubriques: number[]) {
  return result.value ? result.value.actualite.rubriques.filter(r => codesRubriques.includes(Number(r.uuid))) : []
}

async function updateReadingInfos() {
  const objectResult = await getNewsReadingInformations(props.getNewsReadingInformationsUrl)
  readingInfos.value = new Map(Object.entries(objectResult))
}

// État pour la modal
const showModal = ref(false)
const openFullImage = ref(false)
const itemIdOpenModal = ref<string>()
const itemRubriquesOpenModal = ref()

// Méthodes
function openModal(uuid: string, codesRubriques: number[]) {
  itemIdOpenModal.value = uuid
  itemRubriquesOpenModal.value = getRubriques(codesRubriques)
  showModal.value = true
  document.body.style.top = `-${window.scrollY}px`
  document.body.style.position = 'fixed'
}

function closeModal() {
  updateReadingInfos()
  showModal.value = false
  openFullImage.value = false
  const scrollY = document.body.style.top
  document.body.style.position = ''
  document.body.style.top = ''
  window.scrollTo(0, Number.parseInt(scrollY || '0') * -1)
}
</script>

<template>
  <i18n-host>
    <div class="carousel-container">
      <div class="carousel-header">
        <h2>
          {{ t('text.title.news') }}
        </h2>
        <div class="carousel-header-see-all-news computer">
          <a class="carousel-header-see-all-news-button" :href="allNewsPageUrl">
            {{ t('text.normal.see-all-news') }}
            <i
              class="carousel-header-see-all-news-button-icon"
            />
          </a>
        </div>
      </div>

      <div v-if="loading" class="carousel-content">
        <div v-for="index in 3" :key="index" class="skeleton-card" />
      </div>

      <div v-if="result?.actualite?.items && !loading" class="carousel-content-container">
        <div class="arrow left">
          <button :disabled="currentIndex === 0" @click="prev">
            <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
          </button>
        </div>

        <div class="carousel-content">
          <div v-for="(item, index) in visibleItems" :key="index" class="card-wrapper">
            <news-card
              :item="item"
              :base-url="baseUrl"
              :rubriques="getRubriques(item.rubriques)"
              :page-origin="false"
              :get-item-by-id-url="props.getItemByIdUrl"
              :set-reading-url="props.setReadingUrl"
              :is-read="readingInfos?.has(item.uuid) ? readingInfos.get(item.uuid) : false"
              @update-reading-infos="updateReadingInfos()"
              @click="openModal(item.uuid, item.rubriques)"
              @keydown.enter="openModal(item.uuid, item.rubriques)"
            />
          </div>
        </div>

        <div class="arrow right">
          <button :disabled="currentIndex >= result?.actualite?.items?.length - 3" @click="next">
            <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
          </button>
        </div>
      </div>

      <div class="carousel-header-see-all-news mobile">
        <a class="carousel-header-see-all-news-button" :href="allNewsPageUrl">
          {{ t('text.normal.see-all-news') }}
          <i
            class="carousel-header-see-all-news-button-icon"
          />
        </a>
      </div>
    </div>

    <div v-if="showModal" class="open-modal" :class="{ active: showModal }">
      <bottom-sheet
        :is-read="readingInfos?.has(itemIdOpenModal) ? readingInfos?.get(itemIdOpenModal) : false"
        :item-id="itemIdOpenModal"
        :rubriques="itemRubriquesOpenModal"
        :set-reading-url="setReadingUrl"
        :get-item-by-id-url="getItemByIdUrl"
        :base-url="baseUrl"
        @close-modal="closeModal"
      />
    </div>
  </i18n-host>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

.carousel-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
}

.carousel-header {
  display: flex;
}

.carousel-header-see-all-news {
  display: flex;

  > button {
    @extend %button-tertiary;

    > svg {
      height: 18px;
      width: 18px;
    }
  }

  &.mobile {
    justify-content: right;
  }

  &.computer {
    display: none;
  }
}

.carousel-header-see-all-news-button {
  @extend %button-tertiary;
}

.carousel-header-see-all-news-button-icon {
  width: 1.25em;
  height: 1.25em;
  mask: url(@/assets/svg/arrow_right.svg);
  mask-repeat: no-repeat;
  mask-size: contain;
  background-color: $basic-black;
  aspect-ratio: 1/1;
}

button:hover {
  .carousel-header-see-all-news-button-icon {
    background-color: $primary;
  }
}

button:focus-visible {
  .carousel-header-see-all-news-button-icon {
    background-color: $primary;
  }
}

.arrow {
  display: none;

  > button {
    @extend %button-primary-circle;
    width: 42px;
    height: 42px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;

    > svg {
      height: 18px;
      width: 18px;
    }
  }

  &.left > button {
    left: 0;
    margin-left: -63px;
  }

  &.right > button {
    right: 0;
    margin-right: -63px;
  }
}

.carousel-content {
  display: flex;
  flex-direction: column;
  gap: 1em;
  background-color: transparent;
}

.skeleton-card {
  width: 100%;
  height: 138px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}

/* Large devices such as laptops (1024px and up) */
@media only screen and (min-width: 1024px) {
  .carousel-container {
    display: flex;
    grid-template-columns: auto 1fr auto;
    grid-auto-rows: auto;
    position: relative;
  }

  .skeleton-card {
    height: 175px;
  }

  .arrow {
    display: block;
  }

  .carousel-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    justify-content: space-between; // Écarte les enfants */
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .carousel-content-container {
    position: relative;
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
    min-width: calc(100% / 3); // Divise l'espace en trois parties égales
    box-sizing: border-box;
  }

  .carousel-header-see-all-news {
    &.mobile {
      display: none;
    }

    &.computer {
      display: unset;
    }
  }
}
</style>
