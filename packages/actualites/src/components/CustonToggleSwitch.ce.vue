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
import i18n from '@/plugins/i18n.ts'
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

const { t } = i18n.global

// Fonction pour définir un nouvel état
function setState(state: string) {
  if (props.states.includes(state)) {
    currentState.value = state
    emit('readStatus', state === 'all' ? undefined : (state === 'read')) // Émet l'événement avec la nouvelle valeur
  }
}
</script>

<template>
  <i18n-host>
    <div class="toggle-switch">
      <span
        v-for="(state, index) in props.states"
        :key="index"
        :class="{ active: currentState === state }"
        class="toggle-option"
        @click="setState(state)"
        tabindex="0"
        @keydown.enter="setState(state)"
      >
        <div v-if="state === 'all'" class="toggle-option-more">{{ t('switch.all') }}</div>
        <div v-if="state === 'read'" class="toggle-option-more">{{ t('switch.read') }}</div>
        <div v-if="state === 'unread'" class="toggle-option-more">{{ t('switch.not-read') }}</div>
      </span>
    </div>
  </i18n-host>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

.toggle-switch {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 3px;
  user-select: none;
  border: none;
  gap: 0.5rem;
}

.toggle-option {
  text-align: center;
  color: #666;
  transition:
    color 0.3s,
    background-color 0.3s;
  padding: 5px 0;
  border-radius: 20px;
  font-family: $dm-sans;
  font-size: 14px;
  cursor: pointer;
  width: auto;
  justify-content: center;
}

.toggle-option:focus-visible {
  background-color: $primary-transparent;
  color: $primary;
  outline: 3px solid $primary;
}

.toggle-option.active:focus-visible {
  background-color: $primary;
  color: $standard-colour-white;
  outline: 3px solid $primary-transparent;
}

.toggle-option-more {
  display: inline-flex;
  padding-right: 1rem;
  padding-left: 1rem;
  width: auto;
}

/* Style pour l'état actif */
.toggle-option.active {
  background-color: #1e1e1e;
  color: white;
}

/* Empêche les options actives d'avoir un effet au survol */
.toggle-option.active:hover {
  background-color: #1e1e1e;
  color: $standard-colour-white;
}

/* Effet de survol pour les options non actives */
.toggle-option:not(.active):hover {
  background-color: rgba(0, 123, 255, 0.1); // Bleu transparent
  color: $primary; // Texte bleu
}
</style>
