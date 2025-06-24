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
import type { AxiosResponse } from 'axios'
import type { ItemVOForRead } from '@/types/ItemVOForRead.ts'
import type { PageType } from '@/types/PageType'
import type { Rubrique } from '@/types/Rubrique.ts'
import { useWindowSize } from '@vueuse/core'
import { capitalize, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import i18n from '@/plugins/i18n.ts'
import { dnmaService } from '@/services/dnmaService'
import { getItemById, setReading } from '@/services/NewsService.ts'
import { isLightColor } from '@/utils/ContrasteUtils.ts'
import { itemvoFilter } from '@/utils/itemvoFilter'
import { isUserConnected } from '@/utils/soffitUtils.ts'

const props = defineProps<{
  itemId: string
  setReadingUrl: string
  getItemByIdUrl: string
  rubriques: Array<Rubrique>
  pageType: PageType
  isRead: boolean
}>()

const emit = defineEmits(['closeModal', 'fullImage'])

const {
  VITE_USER_READING_DELAY,
} = import.meta.env

const item = ref<ItemVOForRead>()
const { t, d } = i18n.global
const isReadingButton = ref(props.isRead)
const showMoreInfosModal = ref(false)
const isMobileFullImage = ref(false)
const isDesktopFullImage = ref<boolean | undefined>(undefined)
const isSelfBottomSheetOpen = ref(true)
const bottomsheet = ref<HTMLElement>()
const loading = ref(true)
const isError = ref(false)
const showTooltip = ref(false)
const isClipped = ref(false)

let idTimout: number
let startY = 0
let currentY = 0
let isDragging = false

onBeforeMount(async () => {
  try {
    const response = await getItemById(props.getItemByIdUrl, props.itemId)
    item.value = response.data
    if (item.value !== undefined) {
      dnmaService.readItemVO(item.value)
    }
    if (!props.isRead) {
      idTimout = setTimeout(() => {
        changeReadingState(true)
      }, VITE_USER_READING_DELAY)
    }
  }
  catch (e: any) {
    isError.value = true
    console.error('Failed to load item :', e)
  }
  finally {
    loading.value = false
  }
})

onMounted(() => {
  bottomsheet.value?.focus()
})

function clipLink(link: string): void {
  navigator.clipboard.writeText(`${window.location.origin}${link}`)
  isClipped.value = true
  setTimeout(() => {
    isClipped.value = false
  }, 3500)
}

function fullImage() {
  if (window.innerWidth < 768) {
    isMobileFullImage.value = !isMobileFullImage.value
    if (isMobileFullImage.value) {
      bottomsheet.value!.style.overflow = 'visible'
    }
    else {
      bottomsheet.value!.style.overflow = 'auto'
    }
  }
  else {
    isDesktopFullImage.value = !isDesktopFullImage.value
  }
}

const { width } = useWindowSize()

watch(width, () => {
  if (width < '768') {
    isDesktopFullImage.value = false
  }
  else {
    isMobileFullImage.value = false
  }
})

onMounted(() => {
  if (bottomsheet.value) {
    bottomsheet.value.addEventListener('touchstart', handleTouchStart)
    bottomsheet.value.addEventListener('touchmove', handleTouchMove)
    bottomsheet.value.addEventListener('touchend', handleTouchEnd)
  }
})

function closeModal() {
  isSelfBottomSheetOpen.value = false
  isMobileFullImage.value = false
  clearTimeout(idTimout)
  setTimeout(() => {
    emit('closeModal')
  }, 300)
}

async function changeReadingState(b: boolean) {
  if (item.value) {
    const response: AxiosResponse = await setReading(props.setReadingUrl, item.value.article.guid, b)
    if (response.status === 200) {
      clearTimeout(idTimout)
      isReadingButton.value = b
    }
  }
}

function handleTouchStart(event: TouchEvent) {
  startY = event.touches[0].clientY
  if (isAtTop(bottomsheet.value) && !isMobileFullImage.value) {
    isDragging = true
  }
}

function handleTouchMove(event: TouchEvent) {
  if (!isDragging)
    return

  currentY = event.touches[0].clientY
  const diffY = currentY - startY

  if (bottomsheet.value) {
    // Si on est en haut du contenu et qu'on glisse vers le bas
    if (isAtTop(bottomsheet.value) && diffY > 0) {
      event.preventDefault()
      const newHeight = Math.max(window.innerHeight * 0.9 - diffY, 100) // Limite la hauteur minimale
      bottomsheet.value!.style.height = `${newHeight}px`
    }
  }
}

function handleTouchEnd() {
  isDragging = false
  const diffY = currentY - startY

  if (diffY > 200) {
    closeModal()
  }
  else {
    bottomsheet.value!.style.height = `${window.innerHeight * 0.9}px`
    bottomsheet.value!.style.transition = 'height 0.3s ease-in-out'
    setTimeout(() => {
      bottomsheet.value!.style.transition = ''
    }, 300)
  }
}

function isAtTop(element: HTMLElement): boolean {
  return element.scrollTop === 0
}

function openMoreInfosModal() {
  showMoreInfosModal.value = !showMoreInfosModal.value
  showTooltip.value = false
}

onBeforeUnmount(() => {
  if (bottomsheet.value) {
    bottomsheet.value.removeEventListener('touchstart', handleTouchStart)
    bottomsheet.value.removeEventListener('touchmove', handleTouchMove)
    bottomsheet.value.removeEventListener('touchend', handleTouchEnd)
  }
})

function isDocument(): boolean {
  return itemvoFilter.isDocument(item.value)
}

function isNews(): boolean {
  return itemvoFilter.isNews(item.value)
}
</script>

<template>
  <i18n-host>
    <div class="bottomsheet-overlay" @click="closeModal">
      <div
        ref="bottomsheet"
        tabindex="-1"
        class="bottomsheet-container"
        :class="{ 'slide-down': !isSelfBottomSheetOpen, 'slide-up': isSelfBottomSheetOpen }"
        @click.stop
        @keydown.esc="closeModal"
      >
        <div class="bottomsheet-mobile-content-grip-area">
          <div class="bottomsheet-mobile-content-grip-area-handle-bar" />
        </div>

        <div class="bottomsheet-content-header-close-btn">
          <button @click="closeModal">
            <div class="test" style="width: 20px;">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </div>
          </button>
        </div>

        <template v-if="!isError">
          <div class="bottomsheet-content-header">
            <div class="bottomsheet-container-background-desktop-image">
              <img
                v-if="item && item.article.enclosure !== null && !loading"
                :src="item.article.enclosure"
                alt=""
              >
            </div>
            <div v-show="item?.article.enclosure !== null || loading" class="bottomsheet-content-header-image-group">
              <div
                tabindex="-1"
                class="bottomsheet-content-header-image-container"
                :class="{ enlarge: isDesktopFullImage, shrink: isDesktopFullImage === false }"
                @click="fullImage"
                @keydown.enter="fullImage"
              >
                <img
                  v-if="item && item.article.enclosure !== null && !loading"
                  :src="item.article.enclosure"
                  alt=""
                  class="bottomsheet-content-header-image-container-img"
                  :class="{ enlarge: isDesktopFullImage, shrink: isDesktopFullImage === false }"
                >
                <div v-if="loading" class="bottomsheet-content-header-image-container-img">
                  <div v-for="index in 1" :key="index" class="skeleton-card" :style="{ borderRadius: '10px' }" />
                </div>
                <button v-show="!loading" class="bottomsheet-content-header-image-group-expand-container">
                  <img
                    class="bottomsheet-content-header-image-group-expand-container-icon"
                    src="/src/assets/svg/expand_content.svg" alt="icon-expand-content"
                  >
                </button>

                <button class="bottomsheet-content-header-image-group-reduce-container">
                  <img
                    class="bottomsheet-content-header-image-group-reduce-icon"
                    src="/src/assets/svg/reduce_content.svg"
                    alt="icon-reduce-content"
                  >
                </button>
              </div>
            </div>

            <div class="bottomsheet-content-header-informations">
              <div v-if="item && !loading" class="bottomsheet-content-header-informations-item-autor">
                <div>
                  {{
                    t('text.creation-info.global', { name: item.createdBy }) + d(item.createdDate, 'long')
                  }}
                </div>

                <div class="bottomsheet-content-header-informations-info-modal-container">
                  <button
                    class="bottomsheet-content-header-informations-info-modal-button"
                    :class="{ active: showMoreInfosModal }"
                    @click="openMoreInfosModal"
                    @mouseenter="showTooltip = true && !showMoreInfosModal"
                    @mouseleave="showTooltip = false "
                    @focus="showTooltip = true && !showMoreInfosModal"
                    @blur="showTooltip = false"
                  >
                    <div class="bottomsheet-content-header-informations-info-modal-icon-container">
                      <div class="bottomsheet-content-header-informations-info-modal-icon">
                        i
                      </div>
                    </div>
                  </button>
                  <div v-if="showTooltip" class="tooltip-container">
                    <div class="tooltip">
                      {{ t('text.creation-info.more-info') }}
                      <div class="arrow-down" />
                    </div>
                  </div>
                  <ul v-show="showMoreInfosModal" class="modal">
                    <li
                      v-html="t('text.creation-info.create', {
                        name: `<strong>${capitalize(item.createdBy)}</strong>`,
                        date: d(item.createdDate, 'medium'),
                        datetime: d(item.createdDate, 'datetime'),
                      })"
                    />
                    <li
                      v-html="t('text.creation-info.update', {
                        name: `<strong>${capitalize(item.lastModifiedBy)}</strong>`,
                        date: d(item.modifiedDate, 'medium'),
                        datetime: d(item.modifiedDate, 'datetime'),
                      })"
                    />
                    <li
                      v-html="t('text.creation-info.validate', {
                        name: `<strong>${capitalize(item.validatedBy)}</strong>`,
                        date: d(item.validatedDate, 'medium'),
                        datetime: d(item.validatedDate, 'datetime'),
                      })"
                    />
                    <li>
                      <button class="news-link" @click="clipLink(item.internalViewLink)">
                        <span>
                          {{ t(`text.clipboard.${isClipped ? 'copied' : `copy-${isNews() ? 'news' : 'files'}`}`) }}
                          <font-awesome-icon :icon="`fa-solid fa-clipboard${isClipped ? '-check' : ''}`" />
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div v-if="loading" class="bottomsheet-content-header-informations-item-autor">
                <div
                  v-for="index in 1"
                  :key="index"
                  class="skeleton-card"
                  :style="{ borderRadius: '10px', height: '20px', width: '40%' }"
                />
              </div>

              <h1 v-if="item && !loading">
                {{ item.article.title }}
              </h1>
              <div v-if="loading">
                <div
                  v-for="index in 1"
                  :key="index"
                  class="skeleton-card"
                  :style="{ borderRadius: '10px', height: '30px', width: '80%', marginTop: '12px', marginBottom: '8px' }"
                />
              </div>
              <div v-if="item && !loading" class="bottomsheet-content-header-informations-sections">
                <span
                  v-for="section in props.rubriques.filter((rubrique) => item?.rubriques?.map((rubrique) => rubrique.toString()).includes(rubrique.uuid))"
                  :key="section.uuid"
                  class="bottomsheet-content-header-informations-sections-tag"
                  :class="{ 'light-text': isLightColor(section.color), 'dark-background': !isLightColor(section.color) }"
                  :style="{ '--backgroundColor': `${section.color}` }"
                >
                  {{ section.name }}
                </span>
                <span
                  class="bottomsheet-content-header-informations-sections-tag dark-background"
                  :style="{ backgroundColor: 'black' }"
                >
                  {{ t('text.creation-info.publish-by', { organization: item.pubBy }) }}
                </span>
              </div>
              <div v-if="loading" class="bottomsheet-content-header-informations-sections">
                <div
                  v-for="index in 2"
                  :key="index"
                  class="skeleton-card"
                  :style="{ borderRadius: '10px', height: '20px', width: '15%' }"
                />
              </div>
            </div>
          </div>

          <!-- <template>

          </template> -->
          <div v-if="item && isNews() && !loading" class="bottomsheet-content-body ck-content toto" v-html="item.body" />
          <div v-if="item && isDocument()" class="bottomsheet-content-body ck-content">
            <div class="file-boxes-wrapper">
              <div v-for=" file in item.article.files" :key="file.uri" class="file-box">
                <span class="file-name">{{ file.fileName }}</span>
                <a :href="file.uri" :download="file.fileName" class="download-button" rel="noopener noreferrer" target="_blank">
                  <font-awesome-icon icon="fa-solid fa-download" /> <span>Télécharger</span>
                </a>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="bottomsheet-content-body bottomsheet-content-error">
          <span class="h3">
            {{ t('text.loading-error') }}
          </span>
        </div>
        <div v-if="(item && !loading) || isError" class="bottomsheet-content-footer">
          <div class="bottomsheet-content-footer-separator" />
          <div class="bottomsheet-content-footer-button-group">
            <button v-if="isUserConnected && !isError" class="mark-has-not-read-btn" @click="changeReadingState(!isReadingButton)">
              {{ t(`button.mark-as${isReadingButton ? '-not' : ''}-read`) }}
            </button>
            <div v-else />
            <button class="close-btn" @click="closeModal">
              {{ t('button.close') }}
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="isMobileFullImage && item && !isError" class="bottomsheet-content-header-image-group-full-image-overlay"
        @click.stop
      >
        <div class="bottomsheet-content-header-image-group-full-image-container" @click="fullImage">
          <img
            class="bottomsheet-content-header-image-group-full-image"
            :src="item.article.enclosure"
            alt="full-image"
            @click.stop
          >
          <button class="bottomsheet-content-header-image-group-reduce-container">
            <img
              class="bottomsheet-content-header-image-group-reduce-icon"
              src="/src/assets/svg/reduce_content.svg"
              alt="icon-reduce-content"
            >
          </button>
        </div>
      </div>
    </div>
  </i18n-host>
</template>

<style lang="scss">
@use 'sass:map';
@use '@/assets/global.scss' as *;
@import '@fortawesome/fontawesome-free/css/all.css';
@import '@/assets/ckeditor.css';

.mark-has-not-read-btn {
  @extend %button-secondary;
}

.close-btn {
  @extend %button-primary;
}

.bottomsheet {
  &-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 1055;
  }

  &-container {
    height: 90%;
    width: 100%;
    background-color: $white;
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 20;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 35px 16px 0;
    outline: 0;

    @each $name, $value in $grid-breakpoints {
      @if $value != 0 {
        @media screen and (width >= $value) {
          max-width: map.get($container-max-widths, $name);
        }
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &.slide-up {
      animation: slide-up 0.3s ease-out forwards;
    }

    &.slide-down {
      animation: slide-down 0.3s ease-in forwards;
    }

    &-background-desktop-image {
      display: none;
    }
  }

  &-content {
    &-header {
      &-image {
        &-group {
          &-reduce {
            &-container {
              display: none;
              width: 42px;
              height: 42px;
              border: none;
              border-radius: 50px;
              background-color: $white;
              box-shadow: $shadow-strong rgba(0, 0, 0, 0.1);
            }

            &-icon {
              width: 11px;
              height: 11px;
            }
          }

          &-expand-container {
            width: 42px;
            height: 42px;
            border: none;
            border-radius: 50px;
            background-color: $white;
            bottom: 12px;
            right: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;

            &-icon {
              width: 11px;
              height: 11px;
            }
          }

          &-full-image {
            width: auto;
            height: auto;
            border-radius: 10px;
            box-shadow: $shadow-strong rgba(0, 0, 0, 0.1);

            &-overlay {
              position: fixed;
              display: block;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 200;
              background: rgba(0, 0, 0, 0.3);
            }

            &-container {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              gap: 3em;
              justify-content: center;
              justify-items: center;
              align-items: center;

              > .bottomsheet-content-header-image-group-reduce-container {
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }

        &-container {
          position: relative;
          height: 170px;
          display: flex;

          &-img {
            position: relative;
            width: 100%;
            object-fit: cover;
          }
        }
      }

      &-informations {
        display: flex;
        flex-direction: column;
        padding: 1em;
        gap: 16px;

        &-item-autor {
          font-family: $dm-sans;
          font-weight: normal;
          font-size: 14px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 1em;
        }

        &-info-modal {
          &-container {
            position: relative;
            display: inline-block;
          }

          &-button {
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 40px;
            background-color: $primary-05;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 100;

            &.active {
              background-color: $primary;

              .bottomsheet-content-header-informations-info-modal-icon {
                color: $white;
              }

              .bottomsheet-content-header-informations-info-modal-icon-container {
                border-color: $white;
              }
            }
          }

          &-icon {
            font-family: $sora;
            font-weight: bold;
            font-size: 14px;
            color: $primary;
            padding-top: 1px;

            &-container {
              position: relative;
              width: 24px;
              height: 24px;
              border: 2px solid $primary;
              border-radius: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }

        &-sections {
          font-family: $dm-sans;
          font-weight: normal;
          font-size: 14px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 8px;

          &-tag {
            width: auto;
            height: auto;
            background-color: var(--backgroundColor);
            border-radius: 20px;
            text-wrap: nowrap;
            text-align: center;
            padding: 4px 12px 4px 12px;

            &.dark-background {
              color: $white;
            }
          }
        }
      }

      &-close-btn {
        display: none;
        position: absolute;
        top: 2em;
        right: 2em;

        > button {
          @extend %button-tertiary-circle;
          font-size: 24px;
        }
      }
    }

    &-body {
      flex-grow: 1;
      font-family: $dm-sans;
      font-size: 16px;
      padding: 1em;

      h1,
      h2,
      h3,
      p,
      blockquote,
      .media,
      ul,
      ol {
        &:not(:last-child) {
          margin-bottom: 1em;
        }
      }

      h1,
      h2,
      h3 {
        &:not(:first-child) {
          margin-top: 1em;
        }
      }

      ul,
      ol {
        margin-left: 2em;

        > li:not(:last-child) {
          margin-bottom: 0.5em;
        }
      }

      a {
        color: inherit;
        text-decoration: none;
        outline: none;

        &:has(i + span) {
          display: inline-flex;
          align-items: center;

          > i {
            line-height: 1;
          }
        }

        &:hover,
        &:focus-visible {
          color: $primary;
        }

        @media (hover: none) {
          color: $primary;
        }
      }

      img {
        max-width: 100%;
      }

      figure.media iframe {
        max-width: 100%;
      }
    }

    &-error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      white-space-collapse: preserve-breaks;
    }

    &-footer {
      display: flex;
      flex-direction: column;

      &-separator {
        width: 100%;
        height: 1px;
        background-color: $basic-grey;
        border: none;
      }

      &-button-group {
        display: flex;
        flex-direction: column;
        padding: 1em 1em 1em 1em;
        justify-content: space-between;
        gap: 0.5em;
      }
    }
  }

  &-mobile-content {
    &-grip-area {
      display: flex;
      padding: 16px;
      color: transparent;
      background-color: transparent;
      justify-content: center;

      &-handle-bar {
        width: 104px;
        height: 6px;
        background-color: $lighter-black;
        opacity: 33%;
        border-radius: 3px;
        justify-self: center;
      }
    }
  }
}

.tooltip {
  position: relative;
  padding: 0.5em;
  font-family: $dm-sans;
  font-size: 10px;
  font-weight: bold;
  text-wrap: nowrap;
  color: $white;
  background-color: $basic-black;
  border-radius: 4px;
  box-shadow: $shadow-low-elevation rgba(0, 0, 0, 0.2);

  &-container {
    position: absolute;
    top: -2.5em;
    left: -1em;
    display: block;
  }

  .arrow-down {
    position: absolute;
    left: 2.6em;
    bottom: -6px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid $basic-black;
  }
}

.bottomsheet-content-header-informations-info-modal-container {
  > .modal {
    list-style: none;
    text-wrap: nowrap;
    white-space-collapse: preserve-breaks;
    background-color: $white;
    font-size: 14px;
    line-height: 24px;
    padding: 32px;
    padding-right: 58px;
    border-radius: 10px;
    border-top-right-radius: 20px;
    box-shadow: $shadow-strong rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    position: absolute;
    top: -9px;
    right: -9px;
    min-width: none;
    @media screen and (width <= map.get($grid-breakpoints, sm)) {
      max-width: calc(100vw - 46px);
    }

    > li {
      opacity: 0.8;

      > .news-link {
        color: unset;
        text-decoration: none;
        outline: none;

        > * {
          display: inline-flex;
          gap: 8px;
        }

        &:hover,
        &:focus-visible {
          color: $primary;
        }
      }
    }
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes enlarge {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(2.5);
  }
}

@keyframes shrink {
  0% {
    transform: scale(2.5);
  }

  100% {
    transform: scale(1);
  }
}

.skeleton-card {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}

@media only screen and (width >= map.get($grid-breakpoints, md)) {
  .bottomsheet {
    &-container {
      overflow: hidden;
      position: relative;
      box-shadow: $shadow-strong rgba(#000000, 0.1);

      &-background-desktop-image {
        position: absolute;
        top: -14px;
        left: -14px;
        right: -14px;
        height: 212px;
        overflow: hidden;
        display: block;
        z-index: -1;
        filter: blur(10px);
        opacity: 0.33;

        > * {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
    }

    &-mobile-content-grip-area {
      display: none;
    }

    &-content {
      &-header {
        display: flex;
        flex-direction: row;
        gap: 1em;
        padding: 3em 3em 1em 3em;

        &-image {
          &-group {
            &-expand-container {
              display: none;
            }
          }

          &-container {
            width: 220px;
            height: 220px;
            display: flex;
            outline: 3px solid $white;
            box-shadow: $shadow-strong rgba(0, 0, 0, 0.1);
            border-radius: 10px;

            &-img {
              position: relative;
              border-radius: 10px;
              object-fit: fill;

              &.enlarge {
                transform-origin: top left;
                animation: enlarge 0.5s forwards;

                &:hover {
                  opacity: 1;
                }
              }

              &.shrink {
                transform-origin: top left;
                animation: shrink 0.3s forwards;
              }
            }

            &.enlarge {
              outline-color: $primary;

              .bottomsheet-content-header-image-container-img.enlarge {
                transform-origin: top left;
                animation: enlarge 0.3s forwards;
                border-radius: 5px;
                outline: 2px solid $white;
                box-shadow: $shadow-strong rgba(0, 0, 0, 0.1);
                z-index: 1000;
              }

              .bottomsheet-content-header-image-group-reduce {
                &-container {
                  display: block;
                  position: absolute;
                  top: 1em;
                  left: 1em;
                  width: 42px;
                  height: 42px;
                  border: none;
                  border-radius: 50px;
                  background-color: $white;
                  box-shadow: $shadow-strong rgba(0, 0, 0, 0.1);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 1001;
                }

                &-icon {
                  width: 11px;
                  height: 11px;
                }
              }
            }

            &:not(.enlarge) {
              &:hover,
              &:focus-visible {
                outline-color: $primary;

                .bottomsheet-content-header-image-container-img {
                  opacity: 0.4;
                }

                .bottomsheet-content-header-image-group-expand-container {
                  display: block;
                  position: absolute;
                  top: 90px;
                  left: 90px;
                }
              }
            }
          }
        }

        &-informations {
          display: flex;
          flex-direction: column;
          padding: 1em;
          gap: 2px;
          width: 100%;
          justify-content: center;

          &-item-autor {
            font-family: $dm-sans;
            font-weight: normal;
            font-size: 14px;
            min-height: 20px;
            display: flex;
            flex-direction: row;
            justify-content: left;
            align-items: center;
            padding-right: 2em;
            gap: 1em;
          }

          &-info-modal {
            &-container {
              position: relative;
              display: inline-block;
            }

            &-button {
              background-color: transparent;

              &:hover,
              &:focus-visible {
                background-color: $primary-05;

                .bottomsheet-content-header-informations-info-modal-icon {
                  color: $primary;
                }

                .bottomsheet-content-header-informations-info-modal-icon-container {
                  border: 2px solid $primary;
                }
              }

              &.active {
                background-color: $primary;
                box-shadow: $shadow-hover $primary-20;

                .bottomsheet-content-header-informations-info-modal-icon {
                  color: $white;
                }

                .bottomsheet-content-header-informations-info-modal-icon-container {
                  border-color: $white;
                }
              }
            }

            &-icon {
              color: $basic-black;

              &-container {
                border: 2px solid $basic-black;
              }
            }
          }

          &-sections {
            padding-top: 0.5em;
          }
        }

        &-close-btn {
          display: unset;
        }
      }

      &-body {
        margin-left: 2em;
        margin-right: 2em;
        overflow: auto;
        margin-bottom: 120px;

        p {
          padding: 0;
        }

        &::-webkit-scrollbar-track {
          background-color: transparent;
          border-radius: 10px;
          color: transparent;
          margin-right: 1em;
        }

        &::-webkit-scrollbar {
          width: 8px;
          background-color: transparent;
          color: transparent;
          padding-right: 1em;
          margin-right: 1em;
          scroll-padding-right: 1em;
        }

        &::-webkit-scrollbar-button {
          display: none;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          background-color: $stroke;
        }
      }

      &-footer {
        width: 100%;
        background-color: $white;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        padding: 2em 3em 3em 3em;

        &-separator {
          display: none;
        }

        &-button-group {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-self: center;
          justify-content: space-between;
          padding: 0;
        }
      }
    }
  }
}

.file-boxes-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.file-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
  border-radius: 8px;
  box-shadow: $shadow-neutral rgba(0, 0, 0, 0.1);
  border: 1px solid $stroke;
  text-align: center;
  word-break: break-word;
  .file-name {
    font-family: 'sora';
    font-weight: 600;
  }
  .download-button {
    @extend %button-secondary;
    @media (hover: none) {
      background-color: $secondary-hover;
      color: $primary;
    }
  }
}

@media only screen and (width >= map.get($grid-breakpoints, md)) {
  .file-box {
    flex-direction: row;
    justify-content: end;
  }
}
</style>
