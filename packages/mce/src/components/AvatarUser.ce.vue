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
import type { AxiosError } from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Cropper from 'cropperjs'
import { inject, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import { updateAvatar } from '@/services/serviceMce'
import 'cropperjs/dist/cropper.css'

defineOptions({ name: 'AvatarUser' })

const props = defineProps<{
  avatar: string
  user: string
  userInfoApiUrl: string
  mceApi: string
}>()

const emit = defineEmits<{ (e: 'avatarUpdated'): void }>()

const TRAILING_SLASH = /\/$/

const i18n = inject(I18nInjectionKey)

function t(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`avatar-user.${key}`) : key
}

// --- State ---
const open = ref(false)
const selectedFile = ref<File | null>(null)
const imageSrc = ref<string | null>(null)
const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const isLoading = ref(false)

const imgEl = ref<HTMLImageElement | null>(null)
const prevImg = ref<HTMLDivElement | null>(null)
const triggerButton = ref<HTMLButtonElement | null>(null)
const modalComponent = ref<HTMLElement | null>(null)

let cropper: Cropper | null = null

// Crée un input file temporaire dans le DOM uniquement au moment du clic,
// puis le détruit aussitôt — jamais persistant dans le DOM
function pickFile() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/jpeg,image/png'
  input.addEventListener('change', onFileChange, { once: true })
  input.click()
}

function initCropper() {
  if (!imgEl.value)
    return
  cropper?.destroy()
  cropper = new Cropper(imgEl.value, {
    aspectRatio: 1,
    viewMode: 1,
    dragMode: 'crop',
    background: false,
    zoomable: true,
    preview: prevImg.value ?? undefined,
    autoCropArea: 0.7,
    responsive: true,
    restore: true,
    guides: true,
    center: true,
    highlight: true,
  })
}

function destroyCropper() {
  cropper?.destroy()
  cropper = null
}

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return
  selectedFile.value = file
  message.value = ''
  const reader = new FileReader()
  reader.onload = (e) => {
    imageSrc.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

function openModal() {
  open.value = true
  imageSrc.value = null
  selectedFile.value = null
  message.value = ''
}

function handleKeydown(event: KeyboardEvent) {
  if (!open.value)
    return

  // 1. Gestion Echap
  if (event.key === 'Escape') {
    closeModal()
  }

  // 2. Focus Trap (Interception de la touche TAB)
  if (event.key === 'Tab') {
    const modal = modalComponent.value
    if (!modal)
      return

    const focusableElements = Array.from(
      modal.querySelectorAll('button, [tabindex="0"]'),
    ) as HTMLElement[]

    if (focusableElements.length === 0)
      return

    const first = focusableElements[0]
    const last = focusableElements.at(-1) as HTMLElement

    if (event.shiftKey) {
      // Si on est sur le premier et qu'on fait Shift+Tab, on va au dernier
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    }
    else {
      // Si on est sur le dernier et qu'on fait Tab, on revient au premier
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}

function handleFocusIn(event: FocusEvent) {
  if (!open.value)
    return

  const modal = modalComponent.value
  const target = event.target as HTMLElement

  if (modal && !modal.contains(target)) {
    event.preventDefault()
    event.stopImmediatePropagation()

    const closeBtn = modal.querySelector('.btn-close') as HTMLElement
    closeBtn?.focus()
  }
}

onMounted(() => document.addEventListener('keydown', handleKeydown, true)) // Le 'true' est le mode capture
onUnmounted(() => document.removeEventListener('keydown', handleKeydown, true))

function closeModal() {
  open.value = false
  destroyCropper()
  imageSrc.value = null
  selectedFile.value = null
  message.value = ''

  // Utilisation d'un accès sécurisé au DOM
  nextTick(() => {
    try {
      if (triggerButton.value && typeof triggerButton.value.focus === 'function') {
        triggerButton.value.focus()
      }
    }
    catch (e) {
      console.warn('Impossible de restaurer le focus', e)
    }
  })
}

async function applyCrop() {
  if (!cropper || !selectedFile.value || isLoading.value)
    return
  isLoading.value = true
  message.value = ''
  try {
    const canvas = cropper.getCroppedCanvas({ width: 512, height: 512 })
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => {
        if (b)
          resolve(b)
        else
          reject(new Error('toBlob failed'))
      }, 'image/jpeg', 0.85),
    )
    const file = new File([blob], selectedFile.value.name, { type: 'image/jpeg' })

    const baseUrl = props.mceApi.replace(TRAILING_SLASH, '')
    await updateAvatar(props.user, file, baseUrl, props.userInfoApiUrl)
    message.value = t('success')
    messageType.value = 'success'
    emit('avatarUpdated')
    setTimeout(closeModal, 1600)
  }
  catch (error) {
    message.value = (error as AxiosError<{ message?: string }>).response?.data?.message ?? t('error-default')
    messageType.value = 'error'
  }
  finally {
    isLoading.value = false
  }
}

watch(imageSrc, async (src) => {
  if (!src)
    return
  await nextTick()
  initCropper()
})

function focusFirst() {
  const modal = modalComponent.value
  const focusable = modal?.querySelectorAll('button, [tabindex="0"]')
  if (focusable && focusable.length > 1) {
    (focusable[1] as HTMLElement).focus()
  }
}

function focusLast() {
  const modal = modalComponent.value
  const focusable = modal?.querySelectorAll('button, [tabindex="0"]')
  if (focusable && focusable.length > 2) {
    (focusable[focusable.length - 2] as HTMLElement).focus()
  }
}
</script>

<template>
  <div class="avatar-component-wrapper">
    <!-- Avatar cliquable -->
    <button
      ref="triggerButton"
      type="button"
      class="image-container"
      :aria-label="t('edit-avatar')"
      @click="openModal"
    >
      <img class="avatar" :src="avatar" :alt="t('avatar-alt')">
      <span class="edit-picture" aria-hidden="true">
        <FontAwesomeIcon :icon="['fas', 'pen']" />
      </span>
    </button>

    <!-- Modale -->
    <div
      v-if="open"
      class="modal-mask"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      @click.self="closeModal"
      @focusin="handleFocusIn"
    >
      <div ref="modalComponent" class="modal-component">
        <div tabindex="0" @focus="focusLast" />
        <header class="modal-header">
          <h3 id="modal-title" class="modal-title">
            {{ t('title-header') }}
          </h3>
          <button class="btn-primary small" :aria-label="t('close')" @click="closeModal">
            ✕
          </button>
        </header>

        <div class="modal-body">
          <!-- Zone crop -->
          <div class="crop-area">
            <img v-if="imageSrc" ref="imgEl" :src="imageSrc" :alt="t('crop-alt')">
            <div
              v-else class="crop-empty" role="button" tabindex="0"
              @click="pickFile()"
              @keydown.enter="pickFile()"
              @keydown.space.prevent="pickFile()"
            >
              <p>{{ t('select-image-hint') }}</p>
            </div>
          </div>

          <!-- Preview circulaire -->
          <div class="preview-wrapper">
            <div ref="prevImg" class="circular-preview" />
          </div>

          <!-- Message -->
          <div
            v-if="message"
            class="alert-message"
            :class="`alert-message--${messageType}`"
            role="alert"
            aria-live="assertive"
          >
            {{ message }}
          </div>
        </div>

        <footer class="modal-footer">
          <button class="btn-primary small" :disabled="isLoading" @click="pickFile()">
            {{ t('select-image') }}
          </button>
          <button v-if="imageSrc" class="btn-primary small" :disabled="isLoading" @click="applyCrop">
            {{ isLoading ? t('loading') : t('apply') }}
          </button>
        </footer>
        <div tabindex="0" @focus="focusFirst" />
      </div>
    </div>
  </div>
</template>

<!-- Scoped : uniquement l'avatar -->
<style lang="scss" scoped>
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';

.avatar-component-wrapper {
  display: block;
  position: relative;
}

.image-container {
  position: relative;
  display: block;
  width: clamp(90px, 20vw, 130px);
  height: clamp(90px, 20vw, 130px);
  margin: 0 auto;
  border-radius: 50%;
  background-color: var(--#{$prefix}body-bg);
  border: 4px solid var(--#{$prefix}stroke);
  box-shadow: var(--#{$prefix}shadow-low-elevation) rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s ease;

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }

  .edit-picture {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: clamp(28px, 6vw, 36px);
    height: clamp(28px, 6vw, 36px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--#{$prefix}primary);
    color: var(--#{$prefix}btn-primary);
    border: 3px solid var(--#{$prefix}body-bg);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    pointer-events: none;
  }

  &:hover,
  &:focus-visible {
    .avatar {
      opacity: 0.85;
    }

    .edit-picture {
      opacity: 1;
      transform: scale(1.08);
    }
  }

  @media (width < map.get($grid-breakpoints, sm)) {
    border-width: 3px;

    .edit-picture {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 3px solid var(--#{$prefix}primary);
    outline-offset: 4px;
    border-radius: 50%;
  }
}
</style>

<!-- Global : modale + cropper (doit rester non-scoped) -->
<style lang="scss">
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/components/buttons';
@use './mce-shared' as *;
@import 'cropperjs/dist/cropper.css';

.modal-mask {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-component {
  background-color: var(--#{$prefix}body-bg);
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--#{$prefix}shadow-strong) rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid var(--#{$prefix}stroke);
  flex-shrink: 0;
}

.modal-title {
  margin: 0;
  font-size: var(--#{$prefix}font-size-h3);
  font-weight: 700;
  color: var(--#{$prefix}basic-black);
}

.modal-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  flex: 1;
  overflow: auto;
}

.crop-area {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 400px;
  min-height: 180px;
  background-color: var(--#{$prefix}basic-grey);
  border-radius: 10px;
  border: 1px solid var(--#{$prefix}stroke);
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.crop-empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--#{$prefix}basic-black-lighter);
  font-size: var(--#{$prefix}font-size-sm);
  text-align: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.crop-empty:focus-visible {
  outline: 3px solid var(--#{$prefix}primary);
  outline-offset: 2px;
}

.preview-wrapper {
  display: flex;
  justify-content: center;
}

.circular-preview {
  width: clamp(60px, 15vw, 90px);
  height: clamp(60px, 15vw, 90px);
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--#{$prefix}stroke);
}

.modal-footer {
  padding: 1.25rem;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  border-top: 1px solid var(--#{$prefix}stroke);
  background-color: var(--#{$prefix}basic-grey);
  flex-shrink: 0;
}

.alert-message {
  @include mce-alert-message;
  width: 100%;
  text-align: center;
}
</style>
