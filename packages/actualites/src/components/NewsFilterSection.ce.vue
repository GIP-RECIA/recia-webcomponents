<script setup lang="ts">
import type {PaginatedResult} from '@/types/PaginatedResult.ts'
import type {Rubrique} from '@/types/Rubrique.ts'
import { ref } from 'vue'
import type {Actualite} from "@/types/Actualite.ts";

const props = defineProps<{
  actualites: Actualite
}>()

const emit = defineEmits(['updateModelValue'])

let currentSource= ref<string | undefined>('Toutes les sources')
let currentSection= ref<string | undefined>('Toutes les rubriques')

function getSources() {
  return ["Toutes les sources", ...props.actualites?.sources]
}

function getSections() {
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
  return [{uuid: 0, name: "Toutes les rubriques"}, ...Array.from(set).sort((a, b) => a.name.localeCompare(b.name))]
}


function setSource(source: string) {
  currentSource.value = source
  if (currentSource.value === 'Toutes les sources') {
    currentSource.value = ""
    //currentSection.value = []
  }
  console.log("current source =====> " + currentSource.value)
  emit('updateModelValue', currentSource.value) // Émet l'événement avec la nouvelle valeur
}

function setSection(section: string) {
  currentSection.value = section
  emit('updateModelValue', section) // Émet l'événement avec la nouvelle valeur
}
</script>

<template>
  <div class="filter-section-container">
    <div class="filter-section">
      <p class="filter-section-title">
        Par sources :
      </p>
      <span
        v-for="source in getSources()"
        class="filter-section-span"
        :class="{ active: currentSource === source }"
        @click="setSource(source)"
      >
        <div class="filter-section-span-more">
          {{ source }}
        </div>
      </span>
    </div>
    <div class="filter-section rubriques" v-if="currentSource !== 'Toutes les sources'">
      <p class="filter-section-title">
        Par rubriques :
      </p>

      <span
        v-for="section in getSections()"
        class="filter-section-span"
        :class="{ active: currentSection === section.name }"
        @click="setSection(section.name)"
      >
        <div class="filter-section-span-more">
          {{ section.name }}
        </div>
      </span>

    </div>
  </div>
</template>

<style scoped lang="scss">
.filter-section-container {
  display: grid;
  align-items: center;
  user-select: none;
  border: none;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.filter-section-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
}

.filter-section-span {
  text-align: center;
  color: #1e1e1e;

  transition:
    color 0.3s,
    background-color 0.3s;
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

/* Style pour l'état actif */
.filter-section-span.active {
  background-color: #1e1e1e;
  color: white;
  font-weight: bold;
  width: auto;
  padding: 5px 0;
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
