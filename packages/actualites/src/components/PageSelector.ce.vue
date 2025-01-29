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
import { computed, ref } from 'vue'

// Props

const props = withDefaults(
  defineProps<{
    totalPages: number
    maxVisiblePages: number
  }>(),
  {
    maxVisiblePages: 5,
  },
)

// Émission d'événements
const emit = defineEmits(['updateModelValue'])

// Variables et état
const currentPage = ref(1)

// Navigation entre pages
function goToPage(page) {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page
    emit('updateModelValue', page)
  }
}

// Pages visibles (dynamique)
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
  <div class="pagination">
    <!-- Bouton pour aller à la première page -->
    <button
      class="first-page"
      :disabled="currentPage === 1"
      @click="goToPage(1)"
    >
      <FontAwesomeIcon class="icon" :icon="['fas', 'angles-left']" />
    </button>

    <!-- Bouton pour reculer d'une page -->
    <button
      class="previous-page"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <FontAwesomeIcon class="icon" :icon="['fas', 'angle-left']" />
    </button>

    <!-- Numéros de page -->
    <span
      v-for="page in visiblePages"
      :key="page"
      class="page-number"
      :class="{ active: page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </span>

    <!-- Bouton pour avancer d'une page -->
    <button
      class="next-page"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <FontAwesomeIcon class="icon" :icon="['fas', 'angle-right']" />
    </button>

    <!-- Bouton pour aller à la dernière page -->
    <button
      class="last-page"
      :disabled="currentPage === totalPages"
      @click="goToPage(totalPages)"
    >
      <FontAwesomeIcon class="icon extrem" :icon="['fas', 'angles-right']" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/colors.scss' as *;

.pagination {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

button {
  display: flex;
  padding: 0.6rem;
  background: none;
  border: hidden;
  justify-content: center;
  border-radius: 50%;
  font-family: 'DM Sans', sans-serif;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.9;
}

.icon {
  width: 9px;
  height: 9px;
}


.page-number {
  display: flex;
  cursor: pointer;
  width: 9px;
  height: 9px;
  padding: 0.6rem;
  justify-content: center;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  border-radius: 50%;
}

.page-number.active {
  background-color: $standard-colour-black;
  color: $standard-colour-white;
}

</style>
