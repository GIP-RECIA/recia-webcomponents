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
import { isUserConnected } from '@/utils/soffitUtils.ts'
import { onBeforeMount, ref } from 'vue'

const props = defineProps<{
  baseUrl: string
  getItemByIdUrl: string
  userInfoApiUrl: string
  getUserNewsUrl: string
  getNewsReadingInformationsUrl: string
  setReadingUrl: string
  backUrl: string
}>()

const result = ref<PaginatedResult>()
const readingInfos = ref<Map<string, boolean>>()
const source = ref()
const rubriques = ref<Array<number>>()
const currentPage = ref<number | undefined>()
const totalPages = ref()
const readingState = ref<boolean | undefined>(undefined)
const loading = ref(true)

const { t } = i18n.global

onBeforeMount(async () => {
  try {
    await initToken(props.userInfoApiUrl)
    if (isUserConnected) {
      const objectResult = await getNewsReadingInformations(props.getNewsReadingInformationsUrl)
      readingInfos.value = new Map(Object.entries(objectResult))
    }
    await fetchPaginatedNews()
  }
  catch (e) {
    console.error(e)
  }
  finally {
    loading.value = false
  }
})

function handleToggleChange(e: CustomEvent) {
  readingState.value = e.detail[0]
  currentPage.value = undefined
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
      currentPage.value,
      source.value ? source.value : undefined,
      rubriques.value ? rubriques.value : undefined,
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
  return result.value
    ? result.value.actualite.rubriques.filter(r => codesRubriques.includes(Number(r.uuid)))
    : []
}

function showItemDependsOnReadingState(item: ItemVO) {
  if (readingState.value !== undefined) {
    if (readingState.value)
      return readingInfos.value?.has(item.uuid) && readingInfos.value?.get(item.uuid) === true
    else
      return !readingInfos.value?.has(item.uuid) || readingInfos.value?.get(item.uuid) === false
  }
  else {
    return true
  }
}

// Modal

const showModal = ref(false)
const openFullImage = ref(false)
const itemIdOpenModal = ref<string>('')
const itemRubriquesOpenModal = ref()

function openModal(uuid: string, codesRubriques: number[]) {
  itemIdOpenModal.value = uuid
  itemRubriquesOpenModal.value = getRubriques(codesRubriques)
  showModal.value = true
  document.documentElement.style.overflowY = 'hidden'
}

function closeModal() {
  updateReadingInfos()
  showModal.value = false
  openFullImage.value = false
  document.documentElement.style.overflowY = ''
}
</script>

<template>
  <i18n-host>
    <div id="allNews" class="allNews">
      <div class="allNews-header">
        <div class="allNews-header-title">
          <a
            class="allNews-header-title-button"
            :href="backUrl"
            title="Retour à l'acceuil"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
          </a>
          <h1>{{ t('text.title.all-news') }}</h1>
        </div>

        <custom-toggle-switch @read-status="handleToggleChange" />
      </div>

      <news-filter-section
        v-if="result"
        :actualites="result.actualite"
        @update-model-value="handleFilterChange"
      />

      <div v-if="loading" class="allNews-body">
        <div v-for="index in 10" :key="index" class="skeleton-card" />
      </div>

      <div v-if="result && !loading" class="allNews-body">
        <template v-for="(item, index) in result.actualite?.items" :key="index">
          <news-card
            v-if="showItemDependsOnReadingState(item)"
            :base-url="baseUrl"
            :item="item"
            :page-origin="true"
            :set-reading-url="setReadingUrl"
            :get-item-by-id-url="props.getItemByIdUrl"
            :is-read="readingInfos?.has(item.uuid) ? readingInfos?.get(item.uuid) : false"
            @update-reading-infos="updateReadingInfos()"
            @click="openModal(item.uuid, item.rubriques)"
            @keydown.enter="openModal(item.uuid, item.rubriques)"
          />
        </template>
      </div>
      <div v-else class="allNews-empty">
        <h3 class="h4">
          {{ t('text.no-news') }}
        </h3>
      </div>

      <page-selector
        v-if="result && result.totalItems > 10"
        :current-pagee="currentPage"
        :total-pages="totalPages"
        :max-visible-pages="5"
        @update-model-value="handlePageChange"
      />
    </div>

    <bottom-sheet
      v-if="showModal"
      :is-read="readingInfos?.has(itemIdOpenModal) ? readingInfos?.get(itemIdOpenModal) : false"
      :item-id="itemIdOpenModal"
      :rubriques="itemRubriquesOpenModal"
      :set-reading-url="setReadingUrl"
      :get-item-by-id-url="getItemByIdUrl"
      :base-url="baseUrl"
      @close-modal="closeModal"
    />
  </i18n-host>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

.allNews {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  justify-items: center;

  &-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;

    &-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1em;
      padding-top: 1em;
      padding-bottom: 1em;

      &-button {
        @extend %button-tertiary-circle;
        font-size: 16px; // 1rem
      }
    }
  }

  &-body {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  &-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3 * 138px;
  }
}

page-selector {
  display: flex;
  justify-content: center;
  padding: 2em;
}

custom-toggle-switch {
  display: inline-flex;
  justify-content: center;
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

@media only screen and (width > 1024px) {
  .allNews {
    &-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0;
    }

    &-body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5em;
      margin-top: 2em;
    }
  }

  .skeleton-card {
    height: 150px;
  }
}
</style>
