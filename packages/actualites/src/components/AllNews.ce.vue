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
import type { PageType } from '@/types/PageType'
import type { PaginatedResult } from '@/types/PaginatedResult.ts'
import { onBeforeMount, ref } from 'vue'
import i18n from '@/plugins/i18n.ts'
import { dnmaService } from '@/services/dnmaService'
import { getNewsReadingInformations, getPaginatedNews } from '@/services/NewsService.ts'
import { initToken } from '@/utils/axiosUtils.ts'
import { itemvoFilter } from '@/utils/itemvoFilter'
import { isUserConnected } from '@/utils/soffitUtils.ts'

const props = withDefaults(defineProps<{
  getItemByIdUrl: string
  userInfoApiUrl: string
  getUserNewsUrl: string
  getNewsReadingInformationsUrl: string
  setReadingUrl: string
  pageType?: PageType
  backUrl: string
}>(), {
  pageType: 'News',
})

const result = ref<PaginatedResult>()
const readingInfos = ref<Map<string, boolean>>()
const source = ref()
const rubriques = ref<Array<number>>()
const currentPage = ref<number | undefined>()
const totalPages = ref()
const readingState = ref<boolean | undefined>(undefined)
const initialLoading = ref(true)
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
    initialLoading.value = false
  }
})

function handleToggleChange(e: CustomEvent) {
  readingState.value = e.detail[0]
  currentPage.value = undefined
  fetchPaginatedNews()
}

function handleFilterChange(s: CustomEvent) {
  if (source.value !== s.detail[0]) {
    dnmaService.openAll(props.pageType, s.detail[0])
  }
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
  loading.value = true
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
  finally {
    loading.value = false
  }
}

async function updateReadingInfos() {
  const objectResult = await getNewsReadingInformations(props.getNewsReadingInformationsUrl)
  readingInfos.value = new Map(Object.entries(objectResult))
}

// Modal

const showModal = ref(false)
const openFullImage = ref(false)
const itemIdOpenModal = ref<string>('')

function openModal(uuid: string) {
  itemIdOpenModal.value = uuid
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
          <h1>{{ t(`text.title.all-${pageType}`) }}</h1>
        </div>

        <custom-toggle-switch
          v-if="(result && result.actualite.sources.length > 0 && !initialLoading)
            || (result && result.actualite.sources.length === 0 && !initialLoading && readingState !== undefined)"
          @read-status="handleToggleChange"
        />
      </div>

      <news-filter-section
        v-if="result && result.actualite.sources.length > 0"
        :actualites="result.actualite"
        :loading="loading"
        @update-model-value="handleFilterChange"
      />

      <div v-if="initialLoading" class="allNews-body">
        <div v-for="index in 10" :key="index" class="skeleton-card" />
      </div>
      <div v-else-if="result && result.actualite.items.length > 0" class="allNews-body">
        <template v-for="(item, index) in result.actualite?.items" :key="index">
          <news-card
            v-if="itemvoFilter.isNews(item)"
            :item="item"
            :page-origin="true"
            :set-reading-url="setReadingUrl"
            :get-item-by-id-url="props.getItemByIdUrl"
            :is-read="readingInfos?.has(item.uuid) ? readingInfos?.get(item.uuid) : false"
            @update-reading-infos="updateReadingInfos()"
            @click="openModal(item.uuid)"
            @keydown.enter="openModal(item.uuid)"
          />
          <document-card
            v-if="itemvoFilter.isDocument(item)"
            :item="item"
            :page-origin="true"
            :set-reading-url="setReadingUrl"
            :get-item-by-id-url="props.getItemByIdUrl"
            :is-read="readingInfos?.has(item.uuid) ? readingInfos?.get(item.uuid) : false"
            @update-reading-infos="updateReadingInfos()"
            @click="openModal(item.uuid)"
            @keydown.enter="openModal(item.uuid)"
          />
        </template>
      </div>
      <div v-else class="allNews-empty">
        <h3 class="h4">
          {{ t(`text.no-${pageType}`) }}
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
      v-if="result && showModal"
      :is-read="readingInfos?.has(itemIdOpenModal) ? readingInfos?.get(itemIdOpenModal) : false"
      :item-id="itemIdOpenModal"
      :rubriques="result.actualite.rubriques"
      :set-reading-url="setReadingUrl"
      :get-item-by-id-url="getItemByIdUrl"
      :page-type="pageType"
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
