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
import type { Rubrique } from '@/types/Rubrique.ts'
import i18n from '@/plugins/i18n.ts'
import { defineProps, onUnmounted, ref } from 'vue'
// Props
const props = defineProps<{
  item: ItemVO
  rubriques: Array<Rubrique>
  pageOrigin: boolean
  isRead: boolean
}>()

const emit = defineEmits(['updateReadingInfos'])

const baseUrl = import.meta.env.VITE_BASE_API_URL

// État pour la modal
const showModal = ref(false)
const openFullImage = ref(false)

const { t, d } = i18n.global

onUnmounted(() => {

})

// Méthodes
function openModal() {
  showModal.value = true
  document.body.style.top = `-${window.scrollY}px`
  document.body.style.position = 'fixed'
}

function closeModal() {
  emit('updateReadingInfos')
  showModal.value = false
  openFullImage.value = false
  const scrollY = document.body.style.top
  document.body.style.position = ''
  document.body.style.top = ''
  window.scrollTo(0, Number.parseInt(scrollY || '0') * -1)
}

function isPageOriginCarrousel() {
  return !props.pageOrigin
}

function isPageOriginAll() {
  return props.pageOrigin
}
</script>

<template>
  <i18n-host>
    <article tabindex="0" :class="{ active: !isRead, pageOrigin }" @click="openModal" @keydown.enter="openModal">
      <div class="card-img">
        <img class="image" :src="baseUrl.concat(props.item.article.enclosure)" alt="">
      </div>
      <div class="article-wrapper">
        <div v-if="isPageOriginCarrousel()" class="source">
          <div>{{ props.item.source }}</div>
        </div>

        <div v-if="isPageOriginAll()" class="infos">
          <div>{{ d(props.item.pubDate, 'short') }}</div>
          <div class="article-wrapper-lecture">
            <div v-if="isRead">
              {{ t('text.normal.read') }}
            </div>
            <div v-if="!isRead">
              {{ t('text.normal.not-read') }}
            </div>
          </div>
        </div>

        <div class="card-body-title">
          {{ props.item.article.title }}
        </div>
        <div class="card-body-description">
          <div class="description">
            {{ props.item.article.description }}
          </div>
        </div>
        <div v-if="isPageOriginAll()" class="source all">
          <div>{{ props.item.source }}</div>
        </div>
      </div>
    </article>

    <div v-if="showModal" class="open-modal" :class="{ active: showModal }">
      <bottom-sheet
        :is-read="props.isRead" :item-id="props.item.uuid" :rubriques="props.rubriques"
        @close-modal="closeModal"
      />
    </div>
  </i18n-host>
</template>

<style lang="scss">
@use '@/assets/colors.scss' as *;
@use '@/assets/global.scss' as *;


* {
  box-sizing: border-box;
}

article {
  background-color: $standard-colour-white;
  border-radius: 10px;
  display: flex;
  height: 138px;
  width: auto;
  flex-direction: row;
  box-shadow: rgba(0, 0, 0, 0.06) 0 0 10px 2px;
  cursor: pointer;
  overflow: hidden;
}

article:focus-visible {
  outline: 2px solid $primary;

  .card-body-title {
    color: $primary;
  }
}

article:not(.active) {
  background-color: $standard-colour-grey;

  .card-img {
    filter: saturate(0%);
    opacity: 40%;
  }
}

.card-img {
  display: flex;
  flex: 0 0 auto;
  width: 92px;
  height: 100%;
  overflow: hidden;
  position: relative;
  justify-content: center;
}

.image {
  height: 100%; /* Remplit complètement la div */
  object-fit: cover;
  transform-origin: center;
}

.full-image-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.full-image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 3em;
  padding: 1em;
}

.image.full-image {
  width: 100%;
  border-radius: 10px;
  object-fit: fill;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.24);
}

.expand.reduce {
  display: flex;
  border: none;
  background-color: $standard-colour-white;
  width: 42px;
  height: 42px;
  border-radius: 50px;
  bottom: 10px;
  right: 10px;
  padding: 0.5em;
  justify-content: center;
  cursor: pointer;
}

.icon-expand-content {
  width: 14px;
  height: 14px;
  justify-self: center;
  align-self: center;
}

.article-wrapper {
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 0.3rem;
}

.source {
  flex-shrink: 0;
  display: flex;
  font-family: $dm-sans;
  color: $standard-colour-black;
  font-size: 12px;
  opacity: 50%;
  justify-content: space-between;
  align-items: center;
}

.source.all {
  justify-content: right;
}

.infos {
  flex-shrink: 0;
  display: flex;
  font-family: $dm-sans;
  color: $standard-colour-black;
  font-size: 12px;
  opacity: 75%;
  justify-content: space-between;
  align-items: center;
}

.card-body-title {
  font-family: $sora;
  font-size: 14px;
  font-weight: 600;
  color: $standard-colour-black;
  transition: color;
}

.card-body-description {
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  text-wrap: wrap;
}

.description {
  font-family: $dm-sans;
  font-size: 13px;
  font-weight: 400;
  -webkit-box-orient: vertical;
  line-height: var(--description-font-line-heigth);
  text-overflow: ellipsis;
  overflow: hidden;
}

article.pageOrigin {
  height: 170px;
}

article.pageOrigin.active {
  .card-body-title {
    color: $primary;
  }
}

@media only screen and (min-width: 720px) {
  .full-image-overlay {
    display: none;
  }
}

@media only screen and (min-width: 1024px) {
  article:not(.pageOrigin) {
    height: 175px;
  }

  .card-body-title {
    color: $standard-colour-black;
  }

  article.pageOrigin.active {
    .card-body-title {
      color: $standard-colour-black;
    }
  }

  article:hover {
    outline: 2px solid $primary;
    box-shadow: color-mix(in srgb, $primary, #0000 80%) 0 4px 26px 0;
    .card-body-title {
      color: $primary;
    }
  }

  article:focus-visible {
    outline: 2px solid $primary;
    box-shadow: color-mix(in srgb, $primary, #0000 80%) 0 4px 26px 0;
    .card-body-title {
      color: $primary;
    }
  }

  article.pageOrigin {
    height: 150px;
  }
}
</style>
