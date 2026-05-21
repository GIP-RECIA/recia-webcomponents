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
import type { SectionProf } from '@/types/generalType'
import { computed, ref } from 'vue'

defineOptions({ name: 'ClassesGroupesProf' })

const props = defineProps<{
  sectionProf: SectionProf | undefined
  listFonctions: any[]
  labelTitre: string
  labelClass: string
  labelGroup: string
}>()

const sections = computed(() => {
  return props.sectionProf ? Object.entries(props.sectionProf) : []
})
const isOpen = ref(true)

function getMatiere(etabId: string) {
  if (!props.listFonctions)
    return 'Discipline inconnue'
  const found = props.listFonctions.find(f => f.struct?.id === etabId)
  return found ? found.discipline : 'Discipline non renseignée'
}
</script>

<template>
  <section class="page-container">
    <div class="profile-card">
      <header
        class="card-header clickable-header"
        @click="isOpen = !isOpen"
      >
        <h2>{{ labelTitre }}</h2>

        <span class="collapse-icon">
          {{ isOpen ? '-' : '+' }}
        </span>
      </header>

      <div v-if="!sectionProf" class="card-body-grid">
        <span class="info-value">Aucune donnée chargée.</span>
      </div>

      <div v-else-if="isOpen" class="card-body-grid">
        <template v-for="([, classgroup], index) in sections" :key="index">
          <div
            v-for="(etabItems, indexEtab) in (classgroup as any)"
            :key="indexEtab"
            class="etab-block"
          >
            <div class="etab-info-side">
              <span class="info-label">Établissement</span>
              <div class="info-value name-bold">
                {{ indexEtab }}
              </div>
            </div>

            <div class="teachings-list">
              <div
                v-for="(item, indexItem) in (etabItems as any[])"
                :key="indexItem"
                class="teaching-entry"
              >
                <div class="info-item">
                  <span class="info-label">Discipline / Matière</span>
                  <span class="info-value name-bold">{{ getMatiere(item.cg?.nameEtab) }}</span>
                </div>

                <div class="badges-row">
                  <span v-for="(c, i) in item.cg?.classes" :key="`c${i}`" class="pill-tag pill-class">
                    {{ c }}
                  </span>
                  <span v-for="(g, i) in item.cg?.groupes" :key="`g${i}`" class="pill-tag pill-group">
                    {{ g }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;

.page-container {
  padding: 0 1rem;

  @media (max-width: 576px) {
    padding: 0 0.5rem;
  }
}

.profile-card {
  background: var(--#{$prefix}body-bg, #ffffff);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.1));
  overflow: hidden;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--#{$prefix}border-color, #dee2e6);

  h2 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--#{$prefix}body-color, #212529);
  }
}

.card-body-grid {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    padding: 1rem;
  }
}

.etab-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--#{$prefix}border-color, #eee);
  gap: 2rem;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem 0;
  }
}

.etab-info-side {
  flex: 0 0 35%;
  @media (max-width: 768px) {
    flex: 0 0 30%;
  }
  @media (max-width: 576px) {
    flex: none;
    width: 100%;
  }
}

.teachings-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 576px) {
    width: 100%;
  }
}

.teaching-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--#{$prefix}tertiary-bg, #f8f9fa);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--#{$prefix}border-color, #eee);
  gap: 0.75rem;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

.info-item {
  @media (max-width: 576px) {
    width: 100%;
  }
}

.info-label {
  display: block;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--#{$prefix}secondary-color, #6c757d);
  margin-bottom: 4px;
}

.info-value {
  font-size: 0.95rem;
  color: var(--#{$prefix}body-color, #212529);

  &.name-bold {
    font-weight: 600;
  }
  @media (max-width: 576px) {
    font-size: 0.875rem;
  }
}

.badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
  @media (max-width: 576px) {
    justify-content: flex-start;
    width: 100%;
  }
}

.pill-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;

  &.pill-class {
    background: var(--#{$prefix}primary-bg-subtle, #e7f1ff);
    color: var(--#{$prefix}primary-text-emphasis, #084298);
  }

  &.pill-group {
    background: var(--#{$prefix}success-bg-subtle, #d1e7dd);
    color: var(--#{$prefix}success-text-emphasis, #0a3622);
  }
}
.clickable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
}

.collapse-icon {
  font-size: 1.2rem;
  font-weight: 700;
}
</style>
