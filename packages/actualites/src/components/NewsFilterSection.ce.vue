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
import type {Rubrique} from '@/types/Rubrique.ts'
import {computed, ref} from 'vue'
import type {Actualite} from "@/types/Actualite.ts";
import i18n from "@/plugins/i18n.ts";

const props = defineProps<{
  actualites: Actualite
}>()

const emit = defineEmits(['updateModelValue'])
const { t } = i18n.global

let currentSource = ref<string | undefined>(undefined)
let currentSection = ref<Set<number>>(new Set<number>())

const allSections = {
  uuid: '0',
  name: t('text.filter.all-sections')
}

const sources = computed<Array<string>>(() => props.actualites ? [undefined, ...props.actualites.sources] : [])

const rubriques = computed<Array<Rubrique>>(() => {
  const rubriqueMap = new Map<string, Rubrique>()
  const set = new Set<Rubrique>()
  props.actualites.rubriques.forEach((rubrique) => {
    rubriqueMap.set(rubrique.uuid, rubrique)
  })
  props.actualites.items.forEach((item) => {
    item.rubriques.forEach((rubrique) => {
      if (rubriqueMap.has(rubrique.toString())) set.add(<Rubrique>rubriqueMap.get(rubrique.toString()))
    })
  })
  return [allSections, ...props.actualites.rubriques.sort((a, b) => a.name.localeCompare(b.name))]
})


function setSource(source: string) {
  currentSource.value = source
  if (currentSource.value === 'Toutes les sources') {
    currentSource.value = ""

  }
  currentSection.value.clear()
  emit('updateModelValue', currentSource.value, currentSection.value) // Émet l'événement avec la nouvelle valeur
}

function setSection(section: Rubrique) {

  if (section.uuid === '0') {
    currentSection.value.clear()
  } else {
    currentSection.value.has(section.uuid) ? currentSection.value.delete(section.uuid) : currentSection.value.add(section.uuid)
  }
  emit('updateModelValue', currentSource.value, currentSection.value) // Émet l'événement avec la nouvelle valeur
}

</script>

<template>
  <i18n-host>
    <div class="filter-section-container">
      <div class="filter-section-title">
        {{ t('text.filter.by-sources') }}
      </div>
      <div class="filter-section">

        <div class="filter-section-span-container">
          <div
            v-for="source in sources"
            class="filter-section-span"
            :class="{ active: source === currentSource }"
            @click="setSource(source)"
          >
            {{ source ?? t('text.filter.all-sources') }}
          </div>
        </div>
      </div>

      <template v-if="currentSource">
        <div class="separator"></div>
        <div class="filter-section-title">
          {{ t('text.filter.by-sections') }}
        </div>
        <div class="filter-section">

          <div class="filter-section-span-container">
            <div
              v-for="section in rubriques"
              class="filter-section-span"
              :class="{ active: currentSection.size === 0 ? section.name === t('text.filter.all-sections') :  currentSection.has(section.uuid)  }"
              @click="setSection(section)"
            >
              {{ section.name }}
            </div>
          </div>

        </div>
      </template>
    </div>
  </i18n-host>
</template>

<style scoped lang="scss">
.filter-section-container {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  user-select: none;
  border: none;
  gap: 1rem;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: #d9d9d9; /* Gris clair */
  border: none;
  grid-column: 1 / 3;
}

.filter-section {
  display: inline-flex;
  width: 100%;
  grid-column: auto;
  gap: 1rem;
  align-items: baseline;
}

.filter-section-title {
  display: inline-flex;
  text-wrap: nowrap;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  padding-top: 5px;
}

.filter-section-span-container {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-section-span {
  display: flex;
  text-align: center;
  text-wrap: nowrap;
  padding: 5px 10px;
  color: #1e1e1e;
  transition: color 0.3s,
  background-color 0.3s;
  border-radius: 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;
}

.filter-section-span.active {
  background-color: #1e1e1e;
  color: white;
  width: auto;
}

/* Empêche les options actives d'avoir un effet au survol */
.filter-section-span.active:hover {
  background-color: #1e1e1e;
  color: white;
}

/* Effet de survol pour les options non actives */
.filter-section-span:not(.active):hover {
  background-color: rgba(0, 123, 255, 0.1); /* Bleu transparent */
  color: #007bff; /* Texte bleu */
}
</style>
