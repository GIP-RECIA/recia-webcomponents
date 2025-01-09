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

import type { LinkedFileItem } from '@/types/LinkedFileItem.ts'
import type { Rubrique } from '@/types/Rubrique.ts'
import i18n from '@/plugins/i18n.ts'
import { getAttachementsById, getItemById } from '@/services/NewsService.ts'
import { isLightColor } from '@/utils/ContrasteUtils.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onBeforeMount, ref } from 'vue'

// Props
const props = defineProps<{
  itemId: string
  rubriques: Array<Rubrique>
}>()

// Emits
const emit = defineEmits(['closeModal'])

const baseUrl = import.meta.env.VITE_BASE_API_URL
const item = ref<Item>()
const attachements = ref<Set<LinkedFileItem>>()
const modal = ref(null)
const showMoreInfosModal = ref(false)
const isModalOpen = ref(true)

const { t, d } = i18n.global

onBeforeMount(async () => {
  try {
    item.value = await getItemById(props.itemId)
    attachements.value = await getAttachementsById(props.itemId)
  }
  catch (e: any) {
    console.error(e)
  }
})

function openMoreInfosModal() {
  showMoreInfosModal.value = !showMoreInfosModal.value
}

function closeModal() {
  isModalOpen.value = false
  setTimeout(() => {
    emit('closeModal')
  }, 300)
}
</script>

<template>
  <i18n-host>
    <div v-if="item" class="modal-overlay">
      <div ref="modal" class="modal-container" :class="{ 'slide-up': isModalOpen, 'slide-down': !isModalOpen }" @click.stop>
        <img class="modal-container-background-image" :src="baseUrl.concat(item.enclosure)" alt="">
        <div class="modal-container-content">
          <button v-if="false" class="cross-close-btn" @click="closeModal">
            <FontAwesomeIcon class="close-btn-x" :icon="['fas', 'xmark']" />
          </button>
          <header class="modal-header">
            <div class="preview-img">
              <img class="img" :src="baseUrl.concat(item.enclosure)" alt="">
            </div>
            <div class="modal-header-informations">
              <div class="emmission">
                {{
                  t('text.creation-info.global', { name: item.createdBy.displayName }) + d(item.createdBy.createdDate, 'long')
                }}
                <button class="circle-info-btn" :class="{ active: showMoreInfosModal }" @click="openMoreInfosModal">
                  <div class="circle-info-btn-icon">
                    <div class="circle-info-btn-icon-i">
                      i
                    </div>
                  </div>
                </button>
                <more-informations
                  v-if="showMoreInfosModal" class="modal-more-infos" :item="item"
                  @close-more-infos="openMoreInfosModal"
                />
              </div>

              <div class="modal-header-title">
                {{ item.title }}
              </div>
              <div class="modal-header-rubriques">
                <span
                  v-for="section in props.rubriques"
                  :key="section.uuid"
                  class="filter-section-span"
                  :class="{ 'light-text': isLightColor(section.color), 'dark-text': !isLightColor(section.color) }"
                  :style="{ '--backgroundColor': `${section.color}` }"
                >
                  {{ section.name }}
                </span>
                <span
                  class="filter-section-span dark-text"
                  :style="{ backgroundColor: 'black' }"
                >
                  {{ t('text.creation-info.publish-by', { organization: item.organization.name }) }}
                </span>
              </div>
            </div>
          </header>
          <div class="modal-body">
            <div class="modal-content">
              <div class="modal-description" v-html="item.body" />
            </div>
            <div class="modal-files" />
          </div>
          <div class="modal-footer">
            <button class="mark-has-not-read-btn">
              {{ t('button.mark-as-not-read') }}
            </button>
            <button class="close-btn" @click="closeModal">
              {{ t('button.close') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </i18n-host>
</template>

<style lang="scss">
@use 'sass:color';

* {
  box-sizing: border-box;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 10;
}

.modal-container {
  background-color: #f2f2f2; /* Couleur de fond par défaut */
  border-radius: 10px 10px 0 0;
  width: 80%;
  height: 90%;
  max-height: 100%;
  margin-bottom: 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  //animation: slide-up 0.3s ease-out;
  overflow: hidden;
  padding: 4rem;
  gap: 5rem;
  z-index: 20;
}

.modal-container.slide-up {
  animation: slide-up 0.3s ease-out forwards;
}

.modal-container.slide-down {
  animation: slide-down 0.3s ease-in forwards;
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

.modal-container-background-image {
  position: absolute; /* Assurez-vous que l'image est relative au conteneur */
  top: 0;
  left: 0;
  width: 100%;
  height: 25%; /* Limite la hauteur de l'image */
  object-fit: cover; /* Ajuste l'image pour remplir la zone définie */
  filter: blur(5px);
  opacity: 0.3; /* Rend l'image semi-transparente */
  z-index: 10;

  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
}

.modal-container-content {
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 30;
}

.close-btn-x {
  width: 14px;
  justify-content: right;
}

.modal-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
}

.preview-img {
  width: 220px;
  height: 220px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white; /* Bordure blanche */
  border-radius: 8px; /* Facultatif : ajoute des coins arrondis */
  overflow: hidden; /* Empêche l'image de dépasser les limites du conteneur */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Facultatif : ajoute un léger ombrage */
}

.preview-img .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-header-informations {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-content: center;
  justify-content: center;
}

.modal-header-title {
  display: flex;
  font-size: 24px;
  font-family: Sora, sans-serif;
  font-weight: bold;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
}

.emmission {
  display: flex;
  gap: 1rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  align-items: center;
}

.circle-info-btn {
  display: flex;
  border: none;
  width: 36px; /* Taille du bouton */
  height: 36px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  z-index: 200;
  background-color: transparent;
}

.circle-info-btn:not(.active):hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.circle-info-btn:not(.active):hover .circle-info-btn-icon {
  border-color: #0062bc;
}

.circle-info-btn:not(.active):hover .circle-info-btn-icon-i {
  color: #0062bc;
}

.circle-info-btn.active {
  background-color: #0062bc;
}

.circle-info-btn.active .circle-info-btn-icon {
  border-color: white;
}

.circle-info-btn.active .circle-info-btn-icon-i {
  color: white;
}

.circle-info-btn-icon {
  position: relative; /* Nécessaire pour positionner le pseudo-élément */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17px; /* Taille du bouton */
  height: 17px;
  border: 2px solid black; /* Bordure noire */
  border-radius: 50%; /* Forme circulaire */
  cursor: pointer; /* Curseur pointer au survol */
  overflow: visible; /* Permet au pseudo-élément de dépasser */
}

.circle-info-btn-icon-i {
  font-size: 14px; /* Taille du "i" */
  font-weight: bold; /* Poids du "i" */
  color: black; /* Couleur du "i" */
  font-family: Arial, sans-serif; /* Police du "i" */
  line-height: 1;
}

.modal-more-infos {
  display: flex;
  position: relative;
  bottom: 30px;
  right: 330px;
}

.close-btn-x {
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.modal-header-rubriques {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-section-span {
  width: auto;
  height: auto;
  text-align: center;
  text-wrap: nowrap;
  padding: 5px 10px;
  border-radius: 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background-color: var(--backgroundColor);
}

.light-text {
  color: black;
}

.dark-text {
  color: white;
}

.modal-body {
  overflow-y: auto;
  display: flex;
}

.modal-content {
  display: flex;
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
}

.modal-content::-webkit-scrollbar {
  display: flex;
  border: none;
  color: transparent;
  width: 8px;


}

.modal-content::-webkit-scrollbar-thumb {
  background-color: #d9d9d9;
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background-color: black; /* Couleur du curseur */
}

.modal-content::-webkit-scrollbar-track {
  background-color: transparent;
}

.modal-description {
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
  gap: 1rem;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.mark-has-not-read-btn {
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  font-weight: 600;
  background-color: lightgrey;
  border-radius: 20px;
  border: none;
  padding: 0.5rem 1rem;
}

.close-btn {
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: black;
  border-radius: 20px;
  border: none;
  padding: 0.5rem 1rem;
}
</style>
