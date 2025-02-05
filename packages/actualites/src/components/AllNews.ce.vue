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
import type { ItemVO } from '@/types/ItemVO.ts'
import type { PaginatedResult } from '@/types/PaginatedResult.ts'
import i18n from '@/plugins/i18n.ts'
import { getNewsReadingInformations, getPaginatedNews } from '@/services/NewsService.ts'
import { initToken } from '@/utils/axiosUtils.ts'
import { currentUser } from '@/utils/soffitUtils.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onBeforeMount, ref } from 'vue'

const props = defineProps<{
  baseUrl: string
  getItemByIdUrl: string
  userInfoApiUrl: string
  getUserNewsUrl: string
  getNewsReadingInformationsUrl: string
  setReadingUrl: string
}>()

const result = ref<PaginatedResult>()
const readingInfos = ref<Map<string, boolean>>()
const source = ref()
const rubriques = ref<Array<number>>()
const currentPage = ref()
const totalPages = ref()
const readingState = ref<boolean | undefined>(undefined)
const loading = ref(true) // État de chargement

const { t } = i18n.global

onBeforeMount(async () => {
  try {
    await initToken(props.userInfoApiUrl)
    if (currentUser) {
      const objectResult = await getNewsReadingInformations(props.getNewsReadingInformationsUrl)
      readingInfos.value = new Map(Object.entries(objectResult))
    }
    // await getprops.userInfoApiUrlConfig(props.baseApiUrl)
    result.value = await getPaginatedNews(props.getUserNewsUrl, currentPage.value > 1 ? currentPage.value : undefined, source.value ? source.value : undefined, (rubriques.value) ? rubriques.value : undefined, readingState.value)
    currentPage.value = result.value?.pageIndex
    totalPages.value = result.value?.totalPages
  }
  catch (e: any) {
  }
  finally {
    loading.value = false // Fin du chargement
  }
})

function handleToggleChange(e: CustomEvent) {
  readingState.value = e.detail[0]
  fetchPaginatedNews()
}

function handleFilterChange(s: CustomEvent) {
  source.value = s.detail[0]
  rubriques.value = Array.from(s.detail[1])
  currentPage.value = undefined
  fetchPaginatedNews()
}

function handlePageChange(page: CustomEvent) {
  currentPage.value = page.detail[0]
  fetchPaginatedNews()
}

async function fetchPaginatedNews() {
  try {
    result.value = await getPaginatedNews(
      props.getUserNewsUrl,
      currentPage.value > 1 ? currentPage.value : undefined,
      source.value ? source.value : undefined,
      (rubriques.value) ? rubriques.value : undefined,
      readingState.value,
    )
    totalPages.value = result.value?.totalPages || 1
  }
  catch (e: any) {
    console.error(e)
  }
}

async function updateReadingInfos() {
  const objectResult = await getNewsReadingInformations(props.getNewsReadingInformationsUrl)
  readingInfos.value = new Map(Object.entries(objectResult))
}

function getRubriques(codesRubriques: number[]) {
  return result.value ? result.value.actualite.rubriques.filter(r => codesRubriques.includes(Number(r.uuid))) : []
}

function showItemDependsOnReadingState(item: ItemVO) {
  if (readingState.value !== undefined) {
    if (readingState.value) {
      return readingInfos.value?.has(item.uuid) && readingInfos.value?.get(item.uuid) === true
    }
    else {
      return !readingInfos.value?.has(item.uuid) || readingInfos.value?.get(item.uuid) === false
    }
  }
  else {
    return true
  }
}
</script>

<template>
  <i18n-host>
    <div id="allNews" class="allNews-container">
      <div class="allNews-header">
        <div class="allNews-header-title">
          <button class="carousel-header-see-all-news">
            <FontAwesomeIcon class="arrow-left" :icon="['fas', 'arrow-left']" />
          </button>
          <div class="title-allNews">
            {{ t('text.title.all-news') }}
          </div>
        </div>

        <custom-toggle-switch
          :states="['all', 'read', 'not-read']"
          @read-status="handleToggleChange"
        />
      </div>

      <div v-if="result" class="allNews-filter">
        <news-filter-section :actualites="result.actualite" @update-model-value="handleFilterChange" />
      </div>

      <div v-if="loading" class="allNews-body">
        <div v-for="index in 10" :key="index" class="skeleton-card" />
      </div>

      <div v-if="result && !loading" class="allNews-body">
        <template v-for="(item, index) in result.actualite?.items" :key="index">
          <div v-if="showItemDependsOnReadingState(item)" class="card-wrapper">
            <news-card
              :base-url="baseUrl"
              :item="item" :rubriques="getRubriques(item.rubriques)"
              :page-origin="true"
              :set-reading-url="setReadingUrl"
              :get-item-by-id-url="props.getItemByIdUrl"
              :is-read="readingInfos?.has(item.uuid) ? readingInfos?.get(item.uuid) : false"
              @update-reading-infos="updateReadingInfos()"
            />
          </div>
        </template>
      </div>

      <div v-if="result && result.totalItems > 10" class="allNews-footer">
        <page-selector
          :total-pages="totalPages"
          :max-visible-pages="5"
          @update-model-value="handlePageChange"
        />
      </div>
    </div>
  </i18n-host>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

.allNews-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-items: center;
}

.allNews-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
}

custom-toggle-switch {
  display: inline-flex;
  justify-content: center;
}

.allNews-header-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.carousel-header-see-all-news {
  border: none;
  background: none;
}

.arrow-left {
  width: 0.8rem;
  border: none;
  background: none;
  cursor: pointer;
  padding-top: 5px;
}

.title-allNews {
  color: $standard-colour-black;
  font-size: 24px;
  font-family: $sora;
  font-weight: 700;
}

.allNews-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.allNews-footer {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.skeleton-card {
  width: 100%;
  height: 170px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 8px;
  margin-bottom: 1em;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}

@media only screen and (min-width: 1024px) {
  .allNews-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0;
  }

  .allNews-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .card-wrapper {
  }

  .skeleton-card {
    height: 150px;
  }
}
</style>
