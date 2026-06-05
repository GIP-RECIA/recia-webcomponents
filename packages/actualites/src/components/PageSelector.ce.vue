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
import { computed, ref, watch } from 'vue'
import i18n from '@/plugins/i18n'

const props = withDefaults(
  defineProps<{
    currentPagee?: number
    totalPages: number
    maxVisiblePages?: number
  }>(),
  {
    currentPagee: 1,
    maxVisiblePages: 5,
  },
)

const emit = defineEmits(['updateModelValue'])

const { t } = i18n.global

const currentPage = ref(props.currentPagee ? props.currentPagee : 1)

watch(
  () => props.currentPagee,
  () => { currentPage.value = props.currentPagee ? props.currentPagee : 1 },
)

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page
    emit('updateModelValue', page)
  }
}

const visiblePages = computed(() => {
  const half = Math.floor(props.maxVisiblePages / 2)
  let start = Math.max(currentPage.value - half, 1)
  const end = Math.min(start + props.maxVisiblePages - 1, props.totalPages)

  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(end - props.maxVisiblePages + 1, 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>

<template>
  <nav
    role="navigation"
    :aria-label="t('text.pagination')"
  >
    <ul>
      <li>
        <button
          :aria-label="t('button.firstPage')"
          :disabled="currentPage === 1"
          class="tag circle"
          @click="goToPage(1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </button>
      </li>
      <li>
        <button
          :aria-label="t('button.previousPage')"
          :disabled="currentPage === 1"
          class="tag circle"
          @click="goToPage(currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>
      </li>
      <li
        v-for="page in visiblePages"
        :key="page"
      >
        <button
          :aria-label="t('button.page', { page })"
          :aria-current="page === currentPage"
          class="tag circle"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </li>
      <li>
        <button
          :aria-label="t('button.nextPage')"
          :disabled="currentPage === totalPages"
          class="tag circle"
          @click="goToPage(currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>
      </li>
      <li>
        <button
          :aria-label="t('button.lastPage')"
          :disabled="currentPage === totalPages"
          class="tag circle"
          @click="goToPage(totalPages)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@use '@/assets/scss/global.scss' as *;

ul {
  list-style-type: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;

  > li > button {
    &[aria-current='true'] {
      cursor: default;
      pointer-events: none;
    }
  }
}
</style>
