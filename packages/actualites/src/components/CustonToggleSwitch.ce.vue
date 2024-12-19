<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'

// Définir les props
const props = defineProps({
  states: {
    type: Array,
    required: true,
    default: () => ['all', 'read', 'unread'],
  },
})

// Définir les événements émis
const emit = defineEmits(['readStatus'])

// État actuel
const currentState = ref(props.states[0])

// Fonction pour définir un nouvel état
function setState(state: string) {
  if (props.states.includes(state)) {
    currentState.value = state
    emit('readStatus', currentState.value) // Émet l'événement avec la nouvelle valeur
  }
}
</script>

<template>
  <div class="toggle-switch">
    <span
      v-for="(state, index) in props.states"
      :key="index"
      class="toggle-option"
      :class="{ active: currentState === state }"
      @click="setState(state)"
    >
      <div class="toggle-option-more">{{ state }}</div>

    </span>
  </div>
</template>

<style scoped>
.toggle-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 15rem;
  height: 15px;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 8px;
  user-select: none;
  border: none;
  gap: 10px;
}

.toggle-option {
  flex: 1;
  text-align: center;
  min-width: 2rem;
  color: #666;
  font-weight: bold;
  transition:
    color 0.3s,
    background-color 0.3s;
  padding: 5px 0;
  border-radius: 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;
  width: auto;
  justify-content: center;
}

.toggle-option-more {
  padding-right: 1rem;
  padding-left: 1rem;
}

/* Style pour l'état actif */
.toggle-option.active {
  background-color: #1e1e1e;
  color: white;
  font-weight: bold;
}

/* Empêche les options actives d'avoir un effet au survol */
.toggle-option.active:hover {
  background-color: #1e1e1e;
  color: white;
}

/* Effet de survol pour les options non actives */
.toggle-option:not(.active):hover {
  background-color: rgba(0, 123, 255, 0.1); /* Bleu transparent */
  color: #007bff; /* Texte bleu */
}
</style>
