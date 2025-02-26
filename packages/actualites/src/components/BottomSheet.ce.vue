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
import type { Item } from '@/types/Item.ts'
import type { Rubrique } from '@/types/Rubrique.ts'
import type { AxiosResponse } from 'axios'
import i18n from '@/plugins/i18n.ts'
import { getItemById, setReading } from '@/services/NewsService.ts'
import { isLightColor } from '@/utils/ContrasteUtils.ts'
import { isUserConnected } from '@/utils/soffitUtils.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useWindowSize } from '@vueuse/core'
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Props
const props = defineProps<{
  itemId: string
  baseUrl: string
  setReadingUrl: string
  getItemByIdUrl: string
  rubriques: Array<Rubrique>
  isRead: boolean
}>()

const emit = defineEmits(['closeModal', 'fullImage'])

const {
  VITE_USER_READING_DELAY,
} = import.meta.env

const item = ref<Item>()
const { t, d } = i18n.global
const isReadingButton = ref(props.isRead)
const showMoreInfosModal = ref(false)
const isMobileFullImage = ref(false)
const isDesktopFullImage = ref<boolean | undefined>(undefined)
const isSelfBottomSheetOpen = ref(true)
const bottomsheet = ref<HTMLElement>()
const bottomsheetContentHeaderImageContainer = ref<HTMLElement>()
const loading = ref(true)
const showTooltip = ref(false)

let idTimout: number
let startY = 0
let currentY = 0
let isDragging = false

onBeforeMount(async () => {
  try {
    item.value = await getItemById(props.getItemByIdUrl, props.itemId)
    htmlContentTreatement()
    if (!props.isRead) {
      idTimout = setTimeout(() => {
        changeReadingState(true)
      }, VITE_USER_READING_DELAY)
    }
    bottomsheetContentHeaderImageContainer.value?.focus()
  }
  catch (e: any) {
    console.error(e)
  }
  finally {
    loading.value = false
  }
})

function fullImage() {
  if (window.innerWidth < 720) {
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
  if (width < '720') {
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

function htmlContentTreatement() {
  const parser = new DOMParser()

  if (item.value) {
    const doc = parser.parseFromString(item.value.body, 'text/html')

    const images = doc.querySelectorAll('img')

    images.forEach((img) => {
      const currentSrc = img.getAttribute('src')
      if (currentSrc) {
        // Prepend the prefix to the src
        img.setAttribute('src', `${props.baseUrl.concat(`/${currentSrc}`)}`)
      }
    })

    const links = Array.from(doc.querySelectorAll('a'))
    links.forEach(link => link.remove())

    item.value.body = doc.body.innerHTML
  }
}

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
    const response: AxiosResponse = await setReading(props.setReadingUrl, item.value?.id, b)
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
        <template v-if="true">
          <div class="bottomsheet-mobile-content-grip-area">
            <div class="bottomsheet-mobile-content-grip-area-handle-bar" />
          </div>

          <div class="bottomsheet-content-header-close-btn">
            <button @click="closeModal">
              <FontAwesomeIcon :icon="['fas', 'xmark']" />
            </button>
          </div>

          <div class="bottomsheet-content-header">
            <div class="bottomsheet-container-background-desktop-image">
              <img
                v-if="item && !loading"
                :src="baseUrl.concat(`/${item.enclosure}`)"
                alt=""
              >
            </div>
            <div class="bottomsheet-content-header-image-group">
              <div
                ref="bottomsheetContentHeaderImageContainer"
                tabindex="-1"
                class="bottomsheet-content-header-image-container"
                :class="{ enlarge: isDesktopFullImage, shrink: isDesktopFullImage === false }"
                @click="fullImage"
                @keydown.enter="fullImage"
              >
                <img
                  v-if="item && !loading"
                  :src="baseUrl.concat(`/${item.enclosure}`)"
                  alt=""
                  class="bottomsheet-content-header-image-container-img"
                  :class="{ enlarge: isDesktopFullImage, shrink: isDesktopFullImage === false }"
                >
                <div v-if="loading" class="bottomsheet-content-header-image-container-img">
                  <div v-for="index in 1" :key="index" class="skeleton-card" :style="{ borderRadius: '10px' }" />
                </div>
                <button class="bottomsheet-content-header-image-group-expand-container">
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
                    t('text.creation-info.global', { name: item.createdBy.displayName }) + d(item.createdBy.createdDate, 'long')
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
                  <more-informations
                    v-if="showMoreInfosModal"
                    class="modal-more-infos"
                    :item="item"
                  />
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
                {{ item.title }}
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
                  v-for="section in props.rubriques"
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
                  {{ t('text.creation-info.publish-by', { organization: item.organization.name }) }}
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

          <div v-if="item && !loading" class="bottomsheet-content-body" v-html="item.body" />
        </template>
        <div v-if="item && !loading" class="bottomsheet-content-footer">
          <div class="bottomsheet-content-footer-separator" />
          <div class="bottomsheet-content-footer-button-group">
            <button v-if="isUserConnected" class="mark-has-not-read-btn" @click="changeReadingState(!isReadingButton)">
              {{ t(`button.mark-as${isReadingButton ? '-not' : ''}-read`) }}
            </button>
            <button class="close-btn" @click="closeModal">
              {{ t('button.close') }}
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="isMobileFullImage && item" class="bottomsheet-content-header-image-group-full-image-overlay"
        @click.stop
      >
        <div class="bottomsheet-content-header-image-group-full-image-container" @click="fullImage">
          <img
            class="bottomsheet-content-header-image-group-full-image"
            :src="baseUrl.concat(`/${item.enclosure}`)"
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
@use '@/assets/global.scss' as *;

.mark-has-not-read-btn {
  @extend %button-secondary;
}

.close-btn {
  @extend %button-primary;
}

.bottomsheet-content-body {
  p:not(:last-child) {
    margin-bottom: 1em;
  }
}

.bottomsheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 10;

  .bottomsheet-container {
    width: 88%;
    height: 90%;
    max-height: 90%;
    background-color: $standard-colour-white;
    border-radius: 10px 10px 0 0;

    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 20;

    overflow: auto;

    .bottomsheet-container-background-desktop-image {
      display: none;
    }

    .bottomsheet-mobile-content-grip-area {
      display: flex;
      padding: 16px;
      color: transparent;
      background-color: transparent;
      justify-content: center;

      .bottomsheet-mobile-content-grip-area-handle-bar {
        width: 104px;
        height: 6px;
        background-color: $standard-colour-ligth-black;
        opacity: 33%;
        border-radius: 3px;
        justify-self: center;
      }
    }

    .bottomsheet-content-header-close-btn {
      display: none;
      position: absolute;
      top: 2em;
      right: 2em;

      > button {
        @extend %button-tertiary-circle;

        > svg {
          height: 24px;
          width: 24px;
        }
      }
    }

    .bottomsheet-content-header {
      .bottomsheet-content-header-image-group {
        .bottomsheet-content-header-image-container {
          position: relative;
          height: 170px;

          display: flex;

          .bottomsheet-content-header-image-container-img {
            position: relative;
            width: 100%;
            object-fit: cover;
          }

          .bottomsheet-content-header-image-group-reduce-container {
            display: none;
          }
        }

        .bottomsheet-content-header-image-group-expand-container {
          width: 42px;
          height: 42px;
          border: none;
          border-radius: 50px;
          background-color: $standard-colour-white;
          bottom: 12px;
          right: 12px;

          display: flex;
          justify-content: center;
          align-items: center;

          position: absolute;

          .bottomsheet-content-header-image-group-expand-container-icon {
            width: 11px;
            height: 11px;
          }
        }
      }

      .bottomsheet-content-header-informations {
        display: flex;
        flex-direction: column;
        padding: 1em;
        gap: 16px;

        .bottomsheet-content-header-informations-item-autor {
          font-family: $dm-sans;
          font-weight: normal;
          font-size: 14px;

          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          gap: 1em;

          .bottomsheet-content-header-informations-info-modal-container {
            position: relative;
            display: inline-block;

            .bottomsheet-content-header-informations-info-modal-button {
              width: 40px;
              height: 40px;
              border: none;
              border-radius: 40px;
              background-color: $primary-transparent;

              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;

              z-index: 100;

              .bottomsheet-content-header-informations-info-modal-icon-container {
                position: relative;

                width: 24px;
                height: 24px;
                border: 2px solid $primary;
                border-radius: 20px;
                display: flex;
                justify-content: center;
                align-items: center;

                .bottomsheet-content-header-informations-info-modal-icon {
                  font-family: $sora;
                  font-weight: bold;
                  font-size: 14px;
                  color: $primary;
                  padding-top: 1px;
                }
              }
            }

            .tooltip-container {
              position: absolute;

              top: -2.5em;
              left: -1em;

              display: block;

              .tooltip-wrapper {
              }

              .tooltip {
                position: relative;
                padding: 0.5em;
                font-family: $dm-sans;
                font-size: 10px;
                font-weight: bold;
                text-wrap: nowrap;
                color: $standard-colour-white;
                background-color: $standard-colour-black;
                border-radius: 4px;
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);

                .arrow-down {
                  position: absolute;
                  left: 2.6em;
                  bottom: -6px;
                  width: 0;
                  height: 0;
                  border-left: 6px solid transparent;
                  border-right: 6px solid transparent;

                  border-top: 6px solid $standard-colour-black;
                }
              }
            }

            .bottomsheet-content-header-informations-info-modal-button.active {
              background-color: $primary;

              .bottomsheet-content-header-informations-info-modal-icon-container {
                border-color: $standard-colour-white;
              }

              .bottomsheet-content-header-informations-info-modal-icon {
                color: $standard-colour-white;
              }
            }

            .modal-more-infos {
              position: absolute;
              top: -0.4em;
              right: -0.4em;
            }
          }
        }

        .bottomsheet-content-header-informations-sections {
          font-family: $dm-sans;
          font-weight: normal;
          font-size: 14px;

          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 8px;

          .bottomsheet-content-header-informations-sections-tag {
            width: auto;
            height: auto;
            background-color: var(--backgroundColor);
            border-radius: 20px;
            text-wrap: nowrap;
            text-align: center;
            padding: 4px 12px 4px 12px;
          }

          .bottomsheet-content-header-informations-sections-tag.dark-background {
            color: $standard-colour-white;
          }
        }
      }
    }

    .bottomsheet-content-body {
      flex-grow: 1;
      font-family: $dm-sans;
      font-size: 16px;
      padding: 1em;

      img {
        width: 100%;
      }
    }

    .bottomsheet-content-footer {
      display: flex;
      flex-direction: column;

      .bottomsheet-content-footer-separator {
        width: 100%;
        height: 1px;
        background-color: $standard-colour-ligth-grey;
        border: none;
      }

      .bottomsheet-content-footer-button-group {
        display: flex;
        flex-direction: column;
        padding: 1em 1em 1em 1em;
        justify-content: space-between;
        gap: 0.5em;
      }
    }
  }

  .bottomsheet-container::-webkit-scrollbar {
    display: none;
  }

  .bottomsheet-container.slide-up {
    animation: slide-up 0.3s ease-out forwards;
  }

  .bottomsheet-container.slide-down {
    animation: slide-down 0.3s ease-in forwards;
  }

  .bottomsheet-content-header-image-group-full-image-overlay {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.3);

    .bottomsheet-content-header-image-group-full-image-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 3em;
      justify-content: center;
      justify-items: center;
      align-items: center;

      .bottomsheet-content-header-image-group-full-image {
        width: auto;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
      }

      .bottomsheet-content-header-image-group-reduce-container {
        width: 42px;
        height: 42px;
        border: none;
        border-radius: 50px;
        background-color: $standard-colour-white;
        box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);

        display: flex;
        justify-content: center;
        align-items: center;

        .bottomsheet-content-header-image-group-reduce-icon {
          width: 11px;
          height: 11px;
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

/* Agrandir */
@keyframes enlarge {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(2.5); // Taille augmentée de 50%
  }
}

/* Réduire */
@keyframes shrink {
  0% {
    transform: scale(2.5); // Taille initialement augmentée
  }

  100% {
    transform: scale(1); // Retour à la taille normale
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

@media only screen and (min-width: 720px) {
  .bottomsheet-overlay {
    .bottomsheet-container {
      overflow: hidden;
      position: relative;

      .bottomsheet-container-background-desktop-image {
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

      .bottomsheet-mobile-content-grip-area {
        display: none;
      }

      .bottomsheet-content-header-close-btn {
        display: unset;
      }

      .bottomsheet-content-header {
        display: flex;
        flex-direction: row;
        gap: 1em;
        padding: 3em 3em 1em 3em;

        .bottomsheet-content-header-image-group {
          .bottomsheet-content-header-image-container {
            width: 220px;
            height: 220px;
            display: flex;
            outline: 4px solid $standard-colour-white;
            box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
            border-radius: 10px;

            .bottomsheet-content-header-image-container-img {
              position: relative;
              border-radius: 10px;
              object-fit: fill;
            }

            .bottomsheet-content-header-image-container-img.enlarge:hover {
              opacity: 1;
            }

            .bottomsheet-content-header-image-container-img.enlarge {
              transform-origin: top left;
              animation: enlarge 0.5s forwards;
            }

            .bottomsheet-content-header-image-group-expand-container {
              display: none;
            }
          }

          .bottomsheet-content-header-image-container:not(.enlarge):focus-visible {
            outline-color: $primary;
          }

          .bottomsheet-content-header-image-container:not(.enlarge):hover {
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

          .bottomsheet-content-header-image-container.shrink {
            .bottomsheet-content-header-image-container-img.shrink {
              transform-origin: top left;
              animation: shrink 0.3s forwards;
            }
          }

          .bottomsheet-content-header-image-container.enlarge {
            outline-color: $primary;

            .bottomsheet-content-header-image-container-img.enlarge {
              transform-origin: top left;
              animation: enlarge 0.3s forwards;
              border-radius: 5px;
              outline: 2px solid $standard-colour-white;
              box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
              z-index: 1000;
            }

            .bottomsheet-content-header-image-group-reduce-container {
              display: block;
              position: absolute;
              top: 1em;
              left: 1em;

              width: 42px;
              height: 42px;
              border: none;
              border-radius: 50px;
              background-color: $standard-colour-white;
              box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);

              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1001;

              .bottomsheet-content-header-image-group-reduce-icon {
                width: 11px;
                height: 11px;
              }
            }

            .bottomsheet-content-header-image-group-expand-container {
              display: none;
            }
          }
        }

        .bottomsheet-content-header-informations {
          display: flex;
          flex-direction: column;
          padding: 1em;
          gap: 2px;
          width: 100%;

          justify-content: center;

          .bottomsheet-content-header-informations-item-autor {
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

            .bottomsheet-content-header-informations-info-modal-container {
              position: relative;
              display: inline-block;

              .bottomsheet-content-header-informations-info-modal-button {
                background-color: transparent;

                .bottomsheet-content-header-informations-info-modal-icon-container {
                  border: 2px solid $standard-colour-black;

                  .bottomsheet-content-header-informations-info-modal-icon {
                    color: $standard-colour-black;
                  }
                }
              }

              .bottomsheet-content-header-informations-info-modal-button:hover,
              .bottomsheet-content-header-informations-info-modal-button:focus-visible {
                background-color: $primary-transparent;

                .bottomsheet-content-header-informations-info-modal-icon-container {
                  border: 2px solid $primary;

                  .bottomsheet-content-header-informations-info-modal-icon {
                    color: $primary;
                  }
                }
              }

              .bottomsheet-content-header-informations-info-modal-button.active {
                background-color: $primary;

                .bottomsheet-content-header-informations-info-modal-icon-container {
                  border-color: $standard-colour-white;

                  .bottomsheet-content-header-informations-info-modal-icon {
                    color: $standard-colour-white;
                  }
                }
              }

              .modal-more-infos {
                position: absolute;
                top: -0.4em;
                right: -0.4em;
              }
            }
          }

          .bottomsheet-content-header-informations-sections {
            padding-top: 0.5em;

            .bottomsheet-content-header-informations-sections-tag {
            }

            .bottomsheet-content-header-informations-sections-tag.dark-background {
            }
          }
        }
      }

      .bottomsheet-content-body {
        margin-left: 2em;
        margin-right: 2em;

        overflow: auto;

        margin-bottom: 120px;

        p {
          padding: 0;
        }
      }

      .bottomsheet-content-body {
      }

      .bottomsheet-content-body::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 10px;
        color: transparent;
        margin-right: 1em;
      }

      .bottomsheet-content-body::-webkit-scrollbar {
        width: 8px;
        background-color: transparent;
        color: transparent;
        padding-right: 1em;
        margin-right: 1em;

        scroll-padding-right: 1em;
      }

      .bottomsheet-content-body::-webkit-scrollbar-button {
        display: none;
      }

      .bottomsheet-content-body::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: $standard-colour-grey;
      }

      .bottomsheet-content-footer {
        width: 100%;
        background-color: $standard-colour-white;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        padding: 2em 3em 3em 3em;

        .bottomsheet-content-footer-separator {
          display: none;
        }

        .bottomsheet-content-footer-button-group {
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
</style>
