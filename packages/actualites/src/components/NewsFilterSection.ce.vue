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
import type { Rubrique } from '@/types/Rubrique.ts'
import { computed, ref, onUnmounted, onMounted } from 'vue'
import type { Actualite } from "@/types/Actualite.ts";
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  actualites: Actualite
  loading: boolean
}>()

const emit = defineEmits(['updateModelValue'])
const { t } = useI18n()

let currentSource = ref<string | undefined>(undefined)
let currentSection = ref<Set<number>>(new Set<number>())
const isMenuFilterOpen = ref(false)
const filterCounter = ref(0)
const disableButton = ref(false)

const allSections: Rubrique = {
  uuid: '0',
  name: t('text.filter.all-sections'),
  color: '',
  mediaUrl: null,
  highlight: false,
  hiddenIfEmpty: false
}

const sources = computed<Array<string | undefined>>(() => props.actualites ? [undefined, ...props.actualites.sources] : [])

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

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  isMenuFilterOpen.value = window.innerWidth > 1024
  disableButton.value = window.innerWidth > 1024
}

function setSource(source: string) {
  currentSource.value = source
  if (currentSource.value === undefined) {
    currentSource.value = undefined
    filterCounter.value = 0

  } else {
    filterCounter.value = 1
  }

  currentSection.value.clear()
  emit('updateModelValue', currentSource.value, currentSection.value)
}

function setSection(section: Rubrique) {
  if (section.uuid === '0') {
    currentSection.value.clear()
  } else {
    currentSection.value.has(section.uuid)
    ? currentSection.value.delete(section.uuid)
    : currentSection.value.add(section.uuid)
  }
  filterCounter.value = 1 + currentSection.value.size
  emit('updateModelValue', currentSource.value, currentSection.value)
}

function openMenuFilter() {
  isMenuFilterOpen.value = !isMenuFilterOpen.value
}
</script>

<template>
    <div class="filter-section-container">
      <div v-if="disableButton" class="filter-title">
        {{ t('text.title.filters') }}
      </div>
      <button v-if="!disableButton" class="filter-section-container-header" @click="openMenuFilter">
        <div class="filter-section-container-header-left">
          <div class="filter-title">
            {{ t('text.title.filters') }}
          </div>
          <div v-if="filterCounter > 0" class="filter-counter">{{ filterCounter }}</div>
        </div>

        <div class="caret-button">
          <font-awesome-icon :icon="`fa-solid fa-caret-${ isMenuFilterOpen ? 'up' : 'down'}`" />
        </div>
      </button>

      <div class="grid-container">
        <template v-if="isMenuFilterOpen">
          <div class="filter-section-title">
            {{ t('text.filter.by-sources') }}
          </div>

          <div class="filter-section">
            <ul class="filter-section-span-container">
              <li v-for="source in sources" :key="source">
                <button
                  class="filter-section-span"
                  :class="{
                    active: source === currentSource,
                    mobile: !disableButton
                   }"
                  @click="setSource(source!)"
                >
                  {{ source ?? t('text.filter.all-sources') }}
                </button>
              </li>
            </ul>
          </div>
        </template>

        <template v-if="currentSource && isMenuFilterOpen">
          <div class="separator"></div>

          <div class="filter-section-title">
            {{ t('text.filter.by-sections') }}
          </div>
          <div class="filter-section">
            <ul class="filter-section-span-container">
              <li v-for="(section, index) in (loading ? [allSections] : rubriques)" :key="index">
                <button
                  class="filter-section-span"
                  :class="{
                    active: currentSection.size === 0
                      ? section.name === t('text.filter.all-sections')
                      : currentSection.has(section.uuid),
                    mobile: !disableButton
                   }"
                  @click="setSection(section)"
                >
                  {{ section.name }}
                </button>
              </li>
            </ul>
          </div>
        </template>

      </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

.filter-section-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $white;
  box-shadow: $shadow-neutral rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 10px;

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: none;
    background-color: transparent;
    padding: 1em;
    align-items: center;

    &:focus-visible {
      outline: 4px solid $primary;
      border-radius: 10px;
    }

    &-left {
      display: inline-flex;
      gap: 1em;
      align-items: center;
      align-content: center;
    }
  }

  .filter-title {
    font-family: $dm-sans;
    font-size: 16px;
    font-weight: 700;
    padding: 3px 0px 0px 0px;
  }

  .filter-counter {
    font-family: $dm-sans;
    font-size: 14px;
    font-weight: 700;
    padding: 1px 10px 1px 10px;
    border-radius: 20px;
    color: $white;
    background-color: $primary;
  }

  .grid-container {
    display: grid;
    grid-template-rows: auto;
  }

  .separator {
    width: 100%;
    height: 1px;
    background-color: #d9d9d9; // Gris clair
    border: none;
  }

  .filter-section {
    display: flex;

    > ul {
      list-style: none;
    }

    &-title {
      display: inline-flex;
      text-wrap: nowrap;
      font-family: $dm-sans;
      font-size: 12px;
      padding-top: 1em;
      padding-left: 1em;
    }

    &-span {
      @extend %tag;

      &.mobile:not(.active) {
        background-color: $primary-05;
        color: $primary;
      }

      &-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7em;
        padding: 1em;
      }
    }
  }

  .caret-button {
    border: none;
    background-color: transparent;
    padding-top: 1px;
  }
}

@media only screen and (width > 1024px) {
  .filter-section-container {
    background-color: transparent;
    box-shadow: none;
    padding: 1em 0;
    gap: 1em;

    &-header {
      padding: 0;
    }

    .filter-title.disabled {
      color: $basic-black, 100%;
    }

    .filter-counter {
      display: none;
    }

    .grid-container {
      display: grid;
      grid-template-columns: auto 1fr;
      padding: 0;
      gap: 1em;
    }

    .separator {
      grid-column: 1 / 3;
    }

    .filter-section {
      padding: 0;
      align-items: start;

      &-title {
        padding: 0;
        padding-top: 6px;
      }

      &-span-container {
        padding: 0;
      }
    }

    .caret-button {
      display: none;
    }

    .sources {
      padding: 0;
      grid: inherit;
    }
  }
}
</style>
