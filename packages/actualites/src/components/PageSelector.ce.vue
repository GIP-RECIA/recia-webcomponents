<script setup>
import { computed, ref } from 'vue'

// Props
const props = defineProps({
  totalPages: {
    required: true,
    validator: value => value > 0,
  },

  maxVisiblePages: {
    default: 5, // Nombre maximum de pages visibles
  },
})

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
      «
    </button>

    <!-- Bouton pour reculer d'une page -->
    <button
      class="previous-page"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      ‹
    </button>

    <!-- Numéros de page -->
    <span
      v-for="page in visiblePages"
      :key="page"
      class="page-number"
      :class="{ active: page === currentPage.value }"
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
      ›
    </button>

    <!-- Bouton pour aller à la dernière page -->
    <button
      class="last-page"
      :disabled="currentPage === totalPages"
      @click="goToPage(totalPages)"
    >
      »
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 50%;
  font-size: 1rem;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-number {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.page-number.active {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
}
</style>
