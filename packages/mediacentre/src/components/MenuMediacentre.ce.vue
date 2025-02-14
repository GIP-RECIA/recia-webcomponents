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
import type { Filtres } from '@/types/FiltresType'
import type { GestionAffectation } from '@/utils/GestionAffectation'
import { displayedEtablissementSiren, etablissementsData, filtre, gestionAffectations } from '@/utils/store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Multiselect from '@vueform/multiselect'
import { useBreakpoints } from '@vueuse/core'
import { capitalize, ref, watch } from 'vue'

import { useI18n } from 'vue-i18n'

defineOptions({ name: 'MenuMedia' })

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{
  checked: string
  filtres: Array<Filtres>
}>()

const emit = defineEmits(['updateChecked', 'openGestionModal'])

const { t } = useI18n()
const activeCategory = ref('tout')
const activeCategoryName = ref(t('menu-mediacentre.all-resources'))
const isUnfolded = ref(false)
const multiselectOptions = ref()
const multiselectCurrentValue = ref()
const breakpoints = useBreakpoints({
  mobile: 770,
  laptop: 1024,
})

function changementFiltre(idFiltre: string, idCategorie: string, categoryName: string) {
  filtre.value = idFiltre
  if (idFiltre === 'tout' || idFiltre === 'favoris') {
    showSubCategories(idCategorie)
  }
  activeCategoryName.value = categoryName
  showCategoriesContainer()
  emit('updateChecked', idFiltre, idCategorie)
}

function showCategoriesContainer(): void {
  isUnfolded.value = isUnfolded.value !== true
}

function showSubCategories(idCategory: string): void {
  if (idCategory !== 'tout' && idCategory !== 'favoris' && activeCategory.value === idCategory) {
    activeCategory.value = ''
  }
  else {
    activeCategory.value = idCategory
  }
}

watch(() => etablissementsData.value, async () => {
  const valueLabelObjects = []
  for (const [key, value] of etablissementsData.value.tout) {
    valueLabelObjects.push({ value: key, label: value })
  }
  multiselectOptions.value = valueLabelObjects
  multiselectCurrentValue.value = etablissementsData.value.courant
}, { immediate: true })

watch(() => filtre.value, async (newFiltre) => {
  if (newFiltre === 'tout') {
    activeCategory.value = 'tout'
    activeCategoryName.value = 'Toutes les ressources'
  }
})

function etablissementSelected(e: string) {
  displayedEtablissementSiren.value = e
}

function openGestionModal(gestion: GestionAffectation, event: Event): void {
  const openModalCustomEvent = new CustomEvent('openModale', {
    detail: {
      title: gestion.title,
      originalEvent: event.composedPath()[0] as HTMLElement,
    },
    bubbles: true, // Permet à l'événement de remonter dans le DOM
    composed: true, // Permet à l'événement de sortir du shadow DOM
  })
  document.dispatchEvent(openModalCustomEvent)
  emit(
    'openGestionModal',
    gestion.description,
  )
}
</script>

<template>
  <div class="cadre-menu-mediacentre" :class="[isUnfolded === true ? 'unfold' : '']">
    <div class="menu-title">
      <button id="menu-titre" class="menu-toggle" :class="{ active: isUnfolded }" @click="showCategoriesContainer()">
        <FontAwesomeIcon class="menu-icon" :icon="['fas', 'bars']" />
      </button>
      <div class="category-name-badge">
        {{ capitalize(activeCategoryName) }}
      </div>
    </div>

    <div class="menu-wrapper">
      <label v-if="multiselectOptions.length > 0" for="mediacentre-ui-schoolselect" class="displayed-etab">
        {{ t('menu-mediacentre.displayed-etab') }}
      </label>
      <Multiselect
        v-if="multiselectOptions.length > 0"
        id="mediacentre-ui-schoolSelect"
        mode="single"
        class="multiselect"
        name="mediacentre-ui-schoolSelect"
        :value="multiselectCurrentValue"
        :close-on-select="false"
        :can-deselect="false"
        :can-clear="false"
        :options="multiselectOptions"
        @select="etablissementSelected"
      />
      <div
        class="categories-container"
        :class="[breakpoints.active() !== undefined && breakpoints.active() === ref('mobile') ? 'toggle' : '']"
      >
        <button
          id="tout"
          active
          :class="[activeCategory === 'tout' ? 'active' : '']"
          class="sub-categories-container without-sub-cat"
          value="tout"
          @click="changementFiltre('tout', 'tout', t('menu-mediacentre.all-resources'))"
        >
          <h3>{{ capitalize(t('menu-mediacentre.all-resources')) }}</h3>
        </button>

        <button
          id="favoris"
          :class="[activeCategory === 'favoris' ? 'active' : '']"
          class="sub-categories-container without-sub-cat"
          value="favoris"
          @click="changementFiltre('favoris', 'favoris', t('menu-mediacentre.my-favorites'))"
        >
          <h3>{{ capitalize(t('menu-mediacentre.my-favorites')) }}</h3>
        </button>

        <div
          v-for="(category, index) in filtres"
          :id="category.filterEnum"
          :key="index"
          class="dynamic-categories-container"
        >
          <button
            :id="category.name"
            class="sub-categories-container"
            :class="[activeCategory === category.name ? 'active' : '']"
            @click="showSubCategories(category.name)"
          >
            <h3>{{ capitalize(t(category.name)) }}</h3>
            <FontAwesomeIcon class="caret-menu-icon" :icon="['fas', 'caret-right']" />
          </button>
          <div class="container" :class="[activeCategory === category.name ? 'active' : '']">
            <div v-for="(subCat, idx) of category.filters" :key="idx">
              <button
                :class="{ active: filtre === subCat.id }"
                class="sub-category-container"
                aria-haspopup="dialog"
                aria-controls="modal"
                @click.prevent="changementFiltre(subCat.id, category.filterEnum, subCat.nom)"
              >
                <span>
                  {{ capitalize(subCat.nom) }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="gestionAffectations.length > 0" class="gestion-gar">
      <h2 class="gestion-label">
        {{ t("gestion.menu-label") }}
      </h2>
      <template v-for="gestionAffectation in gestionAffectations" :key="gestionAffectation.id">
        <template v-if="gestionAffectation.link">
          <p><a :href="gestionAffectation.description">{{ gestionAffectation.title }}</a></p>
        </template>
        <template v-else>
          <button class="gestion-button" @click.prevent="openGestionModal(gestionAffectation, $event)">
            {{ gestionAffectation.title }}
          </button>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@import '@vueform/multiselect/themes/default.css';

.gestion-button {
  @extend %button-primary;
  border: none;
  font-size: 14px;
}

.gestion-label {
  font-size: 18px;
}

.cadre-menu-mediacentre {
  max-height: 100%;
  text-align: center;
  background-color: #fff;
  width: 320px;
  box-shadow: 0px 10px 15px -7px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  height: fit-content;
  border-radius: 0.5em;
  & :only-child {
    box-sizing: border-box;
  }

  .menu-title {
    display: none;
  }
}

.sub-categories-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: start;
  justify-content: space-between;
  background-color: #fff;
  width: 100%;
  padding: 0 1em;
  border: none;
  border-left: 0.5em solid transparent;
  color: $font-color;
  flex-shrink: 0;
  &:hover {
    background-color: $category-hover-background-color;
    cursor: pointer;
  }
  &.active {
    border-color: $border-color;
    background-color: $category-active-background-color;
    &:has(~ div.container.active *.sub-category-container.active) {
      border-color: transparent;
      background-color: $background-color;
    }

    .caret-menu-icon {
      transform: rotate(90deg);
      transition: transform 0.3s ease;
    }
  }

  &:has(~ div.container *.sub-category-container.active) {
    border-color: $border-color;
  }
}

.without-sub-cat {
  padding-left: 1em;
  justify-content: start;
}

.caret-menu-icon {
  height: 20px;
  width: 20px;
  transition: transform 0.3s ease;
}

.sub-category-container {
  background-color: #fff;
  width: 100%;
  border-collapse: collapse;
  border: none;
  padding: 1em 1em;
  color: $font-color;
  border: none;
  border-left: 0.5em solid transparent;
  &:hover {
    background-color: $category-hover-background-color;
    cursor: pointer;
  }
  &.active {
    border-color: $border-color;
    background-color: $category-active-background-color;
    color: $font-color;
  }
}

.container {
  padding: 0;
  height: 0;
  visibility: hidden;
  opacity: 0;
  overflow-y: scroll;
  transition:
    height 0.1s ease-in-out,
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
}

.container.active {
  height: 100%;
  visibility: visible;
  opacity: 1;
}
.categories-container {
  border-collapse: collapse;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  // border-radius: 1em;
  overflow-y: scroll;
}

.dynamic-categories-container {
  max-height: 50vh;
  height: auto;
  display: flex;
  flex-direction: column;
  transition: height 0.3s ease-in-out;
}

.menu-wrapper {
  text-align: start;
  background-color: #fff;
  padding: 1px;
}

.displayed-etab {
  text-align: start;
  padding-left: 0.2em;
  font-weight: bold;
}

@media (max-width: 650px) {
  .displayed-etab {
    padding-left: 0.6em;
  }

  .cadre-menu-mediacentre {
    text-align: center;
    width: 100%;
    margin: 0;
    padding: 0;
    border-radius: unset;
    height: 5em;
    transition: height 0.3s ease-in-out;

    .menu-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: $menu-title-background-color;
      padding: 1em;
      gap: 0.5em;
      height: 5em;
      flex-shrink: 0;
    }

    .category-name-badge {
      text-align: center;
      // border-radius: 1em;
      background-color: $background-color;
      font-weight: bold;
      font-size: 1em;
      padding: 0.5em 1em;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: unset;
      white-space: nowrap;
      height: 2.5em;
    }
  }
  .menu-toggle {
    cursor: pointer;
    background: none;
    border: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    .menu-icon {
      height: 2em;
      width: 2em;
      color: #212121;
      transition: transform 0.3s ease;
    }

    &.active {
      .menu-icon {
        transform: rotate(90deg);
      }
    }

    & h3 {
      padding-top: 0;
    }
  }

  .unfold {
    height: 100vh;
    min-height: 100vh;
    .categories-container {
      visibility: visible;

      border-radius: 0;
      width: 100%;
      background: none;

      height: 90%;
      & .toggle {
        display: none;
      }
    }
  }
  .categories-container {
    visibility: hidden;

    height: 0;
    transition:
      visibility 0.3s ease-in-out,
      height 0.3s ease-in-out;
  }

  .sub-category-container {
    border-radius: 0;
    cursor: pointer;
  }
  .sub-categories-container {
    cursor: pointer;
    flex-shrink: 0;
  }

  .dynamic-categories-container {
    max-height: 50vh;
    height: fit-content;
    display: flex;
    flex-direction: column;
    transition: height 0.3s ease-in-out;
  }

  .container.active {
    height: 100%;
    visibility: visible;
  }
  .multiselect {
    margin-left: 0.5em;
    margin-right: 0.5em;
    width: auto;
  }
}

.multiselect {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 28px;
}

.multiselect-wrapper {
  font-weight: bold;
}

.multiselect-option {
  &.is-selected {
    font-weight: bold;
  }
}

p {
  padding-left: 5px;
  text-align: start;
  &.gar-description {
    font-size: 12px;
  }
}

:host {
  --ms-font-size: 14px;
  --ms-line-height: 1.375;
  --ms-bg: #ffffff;
  --ms-bg-disabled: #f3f4f6;
  --ms-border-color: #d1d5db;
  --ms-border-width: 0px;
  --ms-border-color-active: #d1d5db;
  --ms-border-width-active: 0px;
  --ms-radius: 4px;
  --ms-py: 0.5rem;
  --ms-px: 0.875rem;
  --ms-ring-width: 0px;
  --ms-ring-color: #10b98130;
  --ms-placeholder-color: #9ca3af;
  --ms-max-height: 10rem;

  --ms-option-font-size: 14px;
  --ms-option-line-height: 1.375;
  --ms-option-bg-pointed: #ffffff;
  --ms-option-color-pointed: #1f2937;
  --ms-option-bg-selected: #{$vueform-option-selected-background};
  --ms-option-color-selected: #{$vueform-option-selected};
  --ms-option-bg-disabled: #ffffff;
  --ms-option-color-disabled: #d1d5db;
  --ms-option-bg-selected-pointed: #{$vueform-option-selected-background};
  --ms-option-color-selected-pointed: #{$vueform-option-selected};
  --ms-option-bg-selected-disabled: #ffffff;
  --ms-option-color-selected-disabled: #d1fae5;
  --ms-option-py: 0.5rem;
  --ms-option-px: 0.75rem;
}
</style>
