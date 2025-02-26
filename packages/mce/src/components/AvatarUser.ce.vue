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

defineProps<{
  avatar: string
  user: string
}
>()
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
  <div class="image-container" @click="modifAvatar">
    <img class="avatar" :src="avatar" alt="">
    <input
      ref="imageInput"
      type="file"
      accept=".jpg, .png"
      :style="{ display: 'none' }"
      @change="fileChanged"
    >
    <button class="edit-picture">
      <FontAwesomeIcon :icon="['fas', 'pen']" class="edit-picture-icon" />
    </button>
  </div>

  <!-- Modal Cropper Avatar -->

  <div v-if="open" class="modal-mask">
    <input id="uidUser" type="hidden" name="uidUser" :value="user">
    <div class="modal-component" @click.stop>
      <header>
        <h1 class="modal-title">
          {{ m('title-header') }}
        </h1>
        <button class="btn-close" @click="closeModal">
          <FontAwesomeIcon :icon="['fa', 'xmark']" />
        </button>
      </header>

      <div class="images">
        <div v-show="imageCrop" class="crop-img">
          <img ref="img" :src="imageCrop" alt="" width="360" height="300">
        </div>
        <div class="previewImg">
          <div id="previewImg" ref="prevImg">
            <img :src="avatar" alt="" width="72" height="72">
          </div>
        </div>
      </div>

      <footer>
        <button class="btn-selectImg" @click="imageInput.click()">
          {{ m('select-image') }}
        </button>
        <button v-show="imageCrop" class="btn-cropImg">
          {{ m('apply') }}
        </button>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
@import 'cropperjs/dist/cropper.css';

.image-container {
  position: relative;
  display: flex;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  outline: solid #eef0f8;
  box-shadow: 0 0.5px 2.5px 1px #00000080;

  .avatar {
    border-radius: 50%;
    position: relative;
    background-color: #26448a;
  }

  .edit-picture {
    display: none;
  }
}

.image-container:hover {
  cursor: pointer;
  outline: 3px solid #26448a;
  box-shadow: 0 0.5px 2.5px 1px #00000080;

  .avatar {
    opacity: 0.4;
  }

  .edit-picture {
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 50px;
    bottom: 48px;
    right: 48px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: solid #eef0f8;
    box-shadow: 0 0.5px 2.5px 1px #00000080;
    position: absolute;

    .edit-picture-icon {
      width: 13px;
      height: 13px;
    }
  }
}

.modal-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1055;
  height: 100%;
  width: 100%;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;
  background-color: #a0a0a06b;

  .modal-component {
    position: absolute;
    min-width: 600px;
    width: fit-content;
    height: fit-content;
    padding: 0;
    margin: auto;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 28px;
    border: none;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: center;
    color: #333;

    @media (width < 600px) {
      min-width: 350px;
    }

    /* Style for header */
    header {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .modal-title {
        padding: 0;
        margin: 0;
        word-wrap: unset;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 20px;
      }

      .btn-close {
        opacity: 0.4;
        font-weight: bold;
        line-height: 1;
        cursor: pointer;
        margin-left: auto;
        width: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
      }

      .btn-close:hover {
        opacity: 0.5;
      }
    }

    /* Style for main */

    .images {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      overflow: hidden;

      .crop-img {
        flex: 1;
        margin: 10px;
      }

      .previewImg {
        flex: 1;
        margin: auto;
      }

      #previewImg {
        width: 72px;
        height: 72px;
        overflow: hidden;
        margin: auto;
        border: solid #d0d0d0;
        border-radius: 50%;

        img {
          background-color: #26448a;
        }
      }
    }

    /* Style for footer */
    footer {
      display: flex;
      padding: 15px;
      flex-direction: row;
      justify-content: center;
      column-gap: 5px;

      .btn-selectImg,
      .btn-cropImg {
        padding: 8px;
        cursor: pointer;
        border-radius: 10px;
        border: none;
        color: #ffffff;
      }

      .btn-selectImg {
        background-color: #a5a5a5;
      }

      .btn-selectImg:hover {
        background-color: #888888;
      }

      .btn-cropImg {
        background-color: #25b2f3;
      }
    }
  }
}

.cropper {
  margin-top: 50px;
  height: 600px;
  width: 600px;
  background: #ddd;
}

@media (max-width: 815px) {
  .image-container {
    .edit-picture {
      width: 35px;
      height: 35px;
      border: none;
      border-radius: 50px;
      left: 95px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: solid #eef0f8;
      box-shadow: 0 0.5px 2.5px 1px #00000080;
      position: absolute;

      .edit-picture-icon {
        width: 13px;
        height: 13px;
      }
    }
  }
}
</style>
