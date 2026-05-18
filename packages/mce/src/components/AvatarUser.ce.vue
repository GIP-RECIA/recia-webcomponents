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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Cropper from 'cropperjs'
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AvatarUser' })

defineProps<{
  avatar: string
  user: string
}>()

const { t } = useI18n()
const m = (key: string): string => t(`avatar-user.${key}`)

const open = ref<boolean>(false)
const selectedFile = ref<any>(null)
const img = ref<any>(null)
const imageInput = ref<any>(null)
const imageCrop = ref<string | ArrayBuffer | null>()
const prevImg = ref<any>(null)
const fileReader = new FileReader()
let cropper: any = null

fileReader.onload = (event: ProgressEvent<FileReader>) => {
  imageCrop.value = event?.target?.result
}

function fileChanged(e: any) {
  const files = e.target.files || e.dataTransfer.files
  if (files.length) {
    selectedFile.value = files[0]
  }
}

onMounted(() => {
  if (img.value) {
    cropper = new Cropper(img.value, {
      aspectRatio: 1,
      viewMode: 2,
      background: false,
      preview: '#previewImg',
    })
  }
})

onUnmounted(() => {
  if (cropper) {
    cropper.destroy()
    cropper = null
  }
})

watchEffect(() => {
  if (selectedFile.value) {
    fileReader.readAsDataURL(selectedFile.value)
  }
  else {
    imageCrop.value = null
  }
})

watch(
  imageCrop,
  () => {
    if (imageCrop.value && img.value) {
      if (cropper) {
        cropper.replace(imageCrop.value)
      }
      else {
        cropper = new Cropper(img.value, {
          aspectRatio: 1,
          viewMode: 2,
          background: false,
          zoomable: true,
          preview: prevImg.value,
          modal: false,
        })
      }
    }
  },
  {
    flush: 'post',
  },
)

function modifAvatar() {
  open.value = true
}

function closeModal() {
  open.value = false
  selectedFile.value = null
  if (cropper) {
    cropper.destroy()
    cropper = null
  }
}
</script>

<template>
  <div class="avatar-component-wrapper">
    <div class="image-container" @click="modifAvatar">
      <img class="avatar" :src="avatar" alt="Avatar utilisateur">
      <input
        ref="imageInput"
        type="file"
        accept=".jpg, .png, .jpeg"
        :style="{ display: 'none' }"
        @change="fileChanged"
      >
      <button class="edit-picture" aria-label="Modifier la photo de profil">
        <FontAwesomeIcon :icon="['fas', 'pen']" class="edit-picture-icon" />
      </button>
    </div>

    <div v-if="open" class="modal-mask" @click="closeModal">
      <input id="uidUser" type="hidden" name="uidUser" :value="user">

      <div class="modal-component" @click.stop>
        <header>
          <h2 class="modal-title">
            {{ m('title-header') }}
          </h2>
          <button class="btn-close" aria-label="Fermer" @click="closeModal">
            <FontAwesomeIcon :icon="['fa', 'xmark']" />
          </button>
        </header>

        <div class="images-body">
          <div v-show="imageCrop" class="crop-area">
            <img ref="img" :src="imageCrop" alt="Zone de recadrage" class="crop-preview-target">
          </div>

          <div class="preview-wrapper">
            <div id="previewImg" ref="prevImg" class="circular-preview">
              <img :src="avatar" alt="Aperçu circulaire" width="72" height="72">
            </div>
          </div>
        </div>

        <footer>
          <button class="btn-action btn-secondary" @click="imageInput.click()">
            {{ m('select-image') }}
          </button>
          <button v-show="imageCrop" class="btn-action btn-primary">
            {{ m('apply') }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

@import 'cropperjs/dist/cropper.css';

.avatar-component-wrapper {
  display: block;
  position: relative;
}

.image-container {
  position: relative !important;
  display: block;
  width: 130px;
  height: 130px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: var(--#{$prefix}body-bg);
  border: 4px solid var(--#{$prefix}border-color);
  box-shadow: var(--#{$prefix}shadow-sm);
  cursor: pointer;
  transition: all 0.25s ease;
  flex-shrink: 0;

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }

  .edit-picture {
    position: absolute !important;
    bottom: 0px !important;
    right: 0px !important;
    width: 36px;
    height: 36px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    background-color: var(--#{$prefix}primary) !important;
    color: var(--#{$prefix}body-inverted, #fff) !important;
    border: 3px solid var(--#{$prefix}body-bg) !important;
    border-radius: 50% !important;
    box-shadow: var(--#{$prefix}shadow-md);
    padding: 0;
    margin: 0;
    z-index: 10;
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    border-color: var(--#{$prefix}primary);
    box-shadow: var(--#{$prefix}shadow-hover);

    .avatar {
      opacity: 0.85;
    }

    .edit-picture {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  @media (max-width: 815px) {
    .edit-picture {
      opacity: 1 !important;
      bottom: -2px !important;
      right: -2px !important;
    }
  }
}

@media (width >= map.get($grid-breakpoints, md)) {
  .image-container {
    width: 140px;
    height: 140px;

    .edit-picture {
      bottom: 2px !important;
      right: 2px !important;
    }
  }
}

.modal-mask {
  position: fixed !important;
  inset: 0 !important;
  background-color: rgba(0, 0, 0, 0.65) !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  z-index: 99999 !important;
  padding: 12px;
}

.modal-component {
  background-color: var(--#{$prefix}body-bg, #fff);
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
  z-index: 100000 !important;

  header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--#{$prefix}border-color, #dee2e6);

    .modal-title {
      font-family: $sora, Arial, sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--#{$prefix}text-primary, #212529);
      margin: 0;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.25rem;
      color: var(--#{$prefix}text-secondary, #6c757d);
      cursor: pointer;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .images-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    min-width: 0;
    overflow-y: auto;
    max-height: calc(80vh - 120px);
  }

  .crop-area {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    background-color: #f1f3f5;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    .crop-preview-target {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }

  .preview-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;

    .circular-preview {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid var(--#{$prefix}border-color, #dee2e6);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  footer {
    padding: 16px;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: flex-end;
    border-top: 1px solid var(--#{$prefix}border-color, #dee2e6);
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);

    .btn-action {
      padding: 10px 20px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      flex: 1;
    }

    .btn-secondary {
      background-color: var(--#{$prefix}secondary-bg, #e9ecef);
      color: var(--#{$prefix}secondary-color, #495057);
    }

    .btn-primary {
      background-color: var(--#{$prefix}primary, #0d6efd);
      color: var(--#{$prefix}body-inverted, #fff);
    }
  }
}

@media (max-width: 360px) {
  .modal-component {
    header .modal-title {
      font-size: 1rem;
    }

    footer {
      flex-direction: column;
      gap: 8px;

      .btn-action {
        width: 100%;
      }
    }
  }
}
</style>
