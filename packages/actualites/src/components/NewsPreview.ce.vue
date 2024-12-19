<script setup lang="ts">
import type {Rubrique} from '@/types/Rubrique.ts'
import type {Item} from '@/types/Item.ts'

import {ref} from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

// Props
const props = defineProps<{
  item: Item
  rubriques: Array<Rubrique>
}>()

// Emits
const emit = defineEmits(['close'])

// Références
const modal = ref(null)

// Méthodes
function close() {
  emit('close')
}


function getSections() {
  const rubriqueMap = new Map<string, Rubrique>()
  const set = new Set<Rubrique>()
  props.rubriques.forEach((rubrique) => {
    rubriqueMap.set(rubrique.uuid, rubrique)
  })

  props.item.rubriques.forEach((rubrique) => {
    if (rubriqueMap.has(rubrique.toString())) {
      set.add(<Rubrique>rubriqueMap.get(rubrique.toString()))
    }
  })

  return Array.from(set).sort((a, b) => a.name.localeCompare(b.name))
}


</script>

<template>
  <div class="modal-overlay">
    <div ref="modal" class="modal-container">
      <button class="close-btn" @click="close">
        <font-awesome-icon class="close-btn-x" :icon="['fas', 'x']"/>
      </button>
      <header class="modal-header">
        <div class="preview-img">
          <img class="img" :src="props.item.enclosure" alt="">
        </div>
        <div>
          <div>
            <p class="emmission">{{ props.item.createdBy.displayName }}</p>
            <button class="circle-info-btn">i</button>
          </div>
          <p class="modal-header-title">{{ props.item.title }}</p>
          <div class="modal-header-rubriques">
            <span
              v-for="section in getSections()"
              class="filter-section-span"
            >
              <div class="filter-section-span-more">
                {{ section.name }}
              </div>
            </span>
          </div>
        </div>
      </header>
      <div class="modal-body">
        <div class="modal-content">
          <p class="modal-description">
            {{ props.item.body }}
          </p>
        </div>
        <div class="modal-files"></div>
      </div>
      <div class="modal-footer">

      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: #f2f2f2;

  border-radius: 10px 10px 0 0;
  width: 70%;
  height: 90%;
  max-height: 100%;
  margin-bottom: 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  animation: slide-up 0.3s ease-out;
  overflow: hidden;
  padding-left: 3%;
  padding-right: 3%;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.close-btn {
  display: flex;
  padding-top: 2%;
  justify-content: right;
}

.close-btn-x {
  width: 14px;
  justify-content: right;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 5%;
  padding: 1rem;
}

.preview-img {
  display: flex;
  width: 220px;
  height: 220px;
  background-color: white;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
}

.img {
  width: 97%;
  height: 97%;
  border-radius: 5px;
  object-fit: cover;
  justify-content: center;
  transform-origin: center;

}

.circle-info-btn {
  width: 20px;
  height: 20px;
  border-color: black;
  border-radius: 100%;
}

.modal-header-title {
  font-size: 42px;
  font-family: Sora, sans-serif;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-header-rubriques{
  display: flex;
  gap: 0.5rem;
}

.filter-section-span {
  width: auto;
  height: auto;
  text-align: center;
  color: white;
  background-color: black;

  padding: 5px 0;
  border-radius: 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;
}

.filter-section-span-more {
  padding-right: 1rem;
  padding-left: 1rem;
}

.modal-body {
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  gap: 1rem;
}

.modal-image {
  max-width: 40%;
  border-radius: 10px;
}

.modal-content {
  flex: 1;
}

.modal-author {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.modal-description {
  margin: 0;
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
}
</style>
