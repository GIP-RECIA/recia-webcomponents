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
import type { TitleI18nKey } from '@/types/TitleI18nKeyType'
import { computed, onMounted, ref } from 'vue'
import i18n from '@/plugins/i18n.ts'
import { dnmaService } from '@/services/dnmaService'
import { getNewsReadingInformations, getPaginatedNews } from '@/services/NewsService.ts'
import { initToken, instance } from '@/utils/axiosUtils.ts'
import { dnmaFname, titleI18nKey, useReadingState } from '@/utils/store'

const props = withDefaults(defineProps<{
  getItemByIdUrl: string
  userInfoApiUrl: string
  getUserNewsUrl: string
  setReadingUrl: string
  getNewsReadingInformationsUrl: string
  allNewsPageUrl: string
  localeKey?: TitleI18nKey
  useReadingState: boolean
  dnmaFname: string
}>(), {
  localeKey: 'News',
})

const result = ref<PaginatedResult>()
const readingInfos = ref<Map<string, boolean>>()
const loading = ref(true)

const { t } = i18n.global

onMounted(async () => {
  try {
    if (!instance.defaults.headers.Authorization)
      await initToken(props.userInfoApiUrl)
    result.value = await getPaginatedNews(props.getUserNewsUrl, undefined, undefined, undefined)
    const objectResult = await getNewsReadingInformations(props.getNewsReadingInformationsUrl)
    readingInfos.value = new Map(Object.entries(objectResult))
  }
  catch (e: any) {
    console.error(e)
  }
  finally {
    loading.value = false
  }
  document.addEventListener(
    'recia-actu-modal',
    (e) => { handleModalEvent(e) },
  )
  dnmaFname.value = props.dnmaFname
  titleI18nKey.value = props.localeKey
  useReadingState.value = props.useReadingState
})

function handleModalEvent(e: any) {
  if (e instanceof CustomEvent) {
    if (e.detail?.uuid) {
      if (typeof (e.detail.uuid) === 'string' && e.detail.uuid.length > 0) {
        openModal(e.detail.uuid)
      }
    }
  }
}

const currentIndex = ref(0)

const visibleItems = computed(() => {
  return result.value?.actualite.items
    ? result.value.actualite.items.slice(currentIndex.value, currentIndex.value + 3)
    : []
})

const isAvailableNews = computed(() => visibleItems.value.length > 0)

function prev() {
  if (currentIndex.value > 0)
    currentIndex.value--
}

function next(): void {
  if (!result.value || !result.value.actualite)
    return
  if (currentIndex.value < result.value.actualite.items.length - 3)
    currentIndex.value++
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
    <div class="carousel">
      <div class="carousel-header">
        <h2>
          {{ t('text.title.news') }}
        </h2>
        <div class="carousel-header-see-all-news computer">
          <a class="carousel-header-see-all-news-button" :href="allNewsPageUrl" @click="dnmaService.openAll(props.dnmaFname)">
            {{ t('text.normal.see-all-news') }}
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </a>
        </div>
      </div>

      <div v-if="loading" class="carousel-content">
        <div v-for="index in 3" :key="index" class="skeleton-card" />
      </div>

      <div v-else class="carousel-content-container">
        <div v-show="isAvailableNews" class="arrow left">
          <button :disabled="currentIndex === 0" @click="prev">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
          </button>
        </div>

        <div class="carousel-content">
          <news-card
            v-for="(item, index) in visibleItems"
            :key="index"
            :item="item"
            :page-origin="false"
            :get-item-by-id-url="props.getItemByIdUrl"
            :set-reading-url="props.setReadingUrl"
            :is-read="readingInfos?.has(item.uuid) ? readingInfos.get(item.uuid) : false"
            @update-reading-infos="updateReadingInfos()"
            @click="openModal(item.uuid)"
            @keydown.enter="openModal(item.uuid)"
          />
          <div v-if="!isAvailableNews" class="empty">
            <h3 class="h4">
              {{ t('text.no-News') }}
            </h3>
          </div>
        </div>

        <div v-show="isAvailableNews" class="arrow right">
          <button :disabled="currentIndex >= (result?.actualite?.items?.length ?? 0) - 3" @click="next">
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>

      <div class="carousel-header-see-all-news mobile">
        <a class="carousel-header-see-all-news-button" :href="allNewsPageUrl">
          {{ t('text.normal.see-all-news') }}
          <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </a>
      </div>
    </div>

    <bottom-sheet
      v-if="result && showModal"
      :is-read="readingInfos?.has(itemIdOpenModal) ? readingInfos?.get(itemIdOpenModal) : false"
      :item-id="itemIdOpenModal"
      :rubriques="result.actualite.rubriques"
      :set-reading-url="setReadingUrl"
      :get-item-by-id-url="getItemByIdUrl"
      @close-modal="closeModal"
    />
  </i18n-host>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

.carousel {
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;

  &-header {
    display: flex;

    &-see-all-news {
      display: flex;

      &.mobile {
        justify-content: right;
      }

      &.computer {
        display: none;
      }

      &-button {
        @extend %button-tertiary;
      }
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: transparent;
  }

  .empty {
    background-color: $basic-grey;
    border-radius: 10px;
    display: flex;
    height: 175px;
    width: auto;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition:
      outline 0.15s ease-out,
      box-shadow 0.15s ease-out,
      background-color 0.15s ease-out,
      box-shadow 0.15s ease-out;

    h3 {
      transition: color 0.15s ease-out;
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

@media only screen and (width > 1024px) {
  .carousel {
    display: flex;
    grid-template-columns: auto 1fr auto;
    grid-auto-rows: auto;
    position: relative;

    &-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;

      &-see-all-news {
        &.mobile {
          display: none;
        }

        &.computer {
          display: unset;
        }
      }
    }

    &-content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      width: 100%;
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      grid-column-end: 3;
      flex-direction: row;

      &-container {
        position: relative;
      }
    }

    .arrow {
      display: block;
    }
  }

  .skeleton-card {
    height: 175px;
  }
}
</style>
