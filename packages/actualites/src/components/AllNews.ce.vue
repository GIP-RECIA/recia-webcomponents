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
import { getPaginatedNews } from '@/services/NewsService.ts'
import { PageOrigin } from '@/types/PageOrigin.ts'
import { initToken } from '@/utils/axiosUtils.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onBeforeMount, ref } from 'vue'

const props = defineProps<{
  userInfoApiUrl: string
}>()

const result = ref<PaginatedResult>()
const source = ref()
const rubriques = ref<Array<number>>()
const currentPage = ref() // Page courante
const totalPages = ref() // Nombre total de pages

const { t } = i18n.global

onBeforeMount(async () => {
  try {
    await initToken(props.userInfoApiUrl)

    // await getprops.userInfoApiUrlConfig(props.baseApiUrl)
    result.value = await getPaginatedNews(2, currentPage.value > 1 ? currentPage.value : undefined, source.value ? source.value : undefined, (rubriques.value) ? rubriques.value : undefined)
    currentPage.value = result.value?.pageIndex
    totalPages.value = result.value?.totalPages
  }
  catch (e: any) {
  }
})

function handleToggleChange(newState: string) {
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
    console.log(`rubriques.value : ${rubriques.value}`)
    result.value = await getPaginatedNews(2, currentPage.value > 1 ? currentPage.value : undefined, source.value ? source.value : undefined, (rubriques.value) ? rubriques.value : undefined)
    totalPages.value = result.value?.totalPages || 1
  }
  catch (e: any) {
    console.error(e)
  }
}

function getRubriques(codesRubriques: number[]) {
  return result.value ? result.value.actualite.rubriques.filter(r => codesRubriques.includes(Number(r.uuid))) : []
}
</script>

<template>
  <i18n-host>
    <div class="allNews-container">
      <div class="allNews-header">
        <div class="allNews-header-title">
          <button class="carousel-header-see-all-news">
            <FontAwesomeIcon class="arrow-left" :icon="['fas', 'arrow-left']" />
          </button>
          <div class="title-allNews">{{ t('text.title.all-news') }}</div>
        </div>

        <custom-toggle-switch
          v-if="result"
          :states="['all', 'read', 'unread']"
          @change="handleToggleChange"
        />
      </div>

      <div v-if="result" class="allNews-filter">
        <div class="allNews-filter-title">
          {{ t('text.title.filters') }}
        </div>

        <news-filter-section :actualites="result.actualite" @update-model-value="handleFilterChange" />
      </div>

      <div v-if="result" class="allNews-body">
        <div v-for="(item, index) in result.actualite?.items" :key="index" class="card-wrapper">
          <news-card :item="item" :rubriques="getRubriques(item.rubriques)" :page-origin="PageOrigin.ALL" />
        </div>
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

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.allNews-container {
  display: grid;
  margin-bottom: 10%;
  gap: 1rem;
}

.allNews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.allNews-header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
  font-family: 'Sora', sans-serif;
}

.carousel-header-see-all-news {
  border: none;
  background: none;
}

.arrow-left {
  width: 1rem;
  border: none;
  background: none;
  cursor: pointer;
}

.allNews-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Deux colonnes égales */
  gap: 1.5rem; /* Espacement entre les cartes */
  margin-top: 3rem;
}

.allNews-footer {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.card-wrapper {
  border: none;
  border-radius: 8px;
  background-color: #fff;
}

.allNews-filter-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 2rem;
}

.title-allNews {
  font-size: 24px;
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  line-height: 30.24px;
  padding: 2rem;
}
</style>
