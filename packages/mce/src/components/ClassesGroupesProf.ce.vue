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

defineOptions({ name: 'ClassesGroupesProf' })

defineProps<{
  sectionProf: SectionProf | undefined
  labelTitre: string
  labelClass: string
  labelGroup: string
}>()
</script>

<template>
  <section class="page-container">
    <div class="profile-card">
      <header class="card-header">
        <h2>{{ labelTitre }}</h2>
      </header>

      <div class="card-body-grid">
        <template v-for="(classgroup, index) in sectionProf" :key="index">
          <div v-for="(etabItems, indexEtab) in classgroup" :key="indexEtab" class="etab-row-item">
            <!-- Bloc Établissement (Sert de grand label de ligne) -->
            <div class="info-item etab-header-container">
              <span class="info-label">Établissement</span>
              <span class="info-value etab-name-bold">{{ indexEtab }}</span>
            </div>

            <!-- Grille interne fluide pour afficher les matières et leurs badges associés -->
            <div class="teaching-contents-group">
              <div v-for="(item, indexItem) in etabItems" :key="indexItem" class="teaching-entry">
                <div class="info-item matiere-block">
                  <span class="info-label">Discipline / Matière</span>
                  <span class="info-value name-bold">{{ item.matiere }}</span>
                </div>

                <div class="badges-inline-container">
                  <!-- Classes affectées -->
                  <span v-for="(classes, i) in item.cg?.classes" :key="i" class="pill-tag">
                    {{ labelClass }} : {{ classes }}
                  </span>
                  <!-- Groupes affectés -->
                  <span v-for="(groupes, i) in item.cg?.groupes" :key="i" class="pill-tag">
                    {{ labelGroup }} : {{ groupes }}
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
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.page-container {
  padding: 0.75rem;
  display: flex;
}

.profile-card {
  width: 100%;
  background-color: var(--#{$prefix}body-bg, #ffffff);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.1));
}

.card-header {
  padding: 1.5rem 1.25rem 0;
  background-color: var(--#{$prefix}body-bg, #ffffff);

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--#{$prefix}body-color, #212529);
    text-transform: none;
    letter-spacing: normal;
  }
}

.card-body-grid {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  background-color: var(--#{$prefix}body-bg, #ffffff);

  @media (width >= map.get($grid-breakpoints, md)) {
    grid-template-columns: repeat(1, 1fr);
    padding: 1.5rem 2rem 2rem;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  color: var(--#{$prefix}secondary-color, #6c757d);
}

.info-value {
  font-size: 0.95rem;
  color: var(--#{$prefix}body-color, #212529);

  &.etab-name-bold,
  &.name-bold {
    font-weight: 700;
  }
}

.etab-row-item {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 0.25rem;
  border-top: 1px dashed var(--#{$prefix}border-color, #dee2e6);
  padding-top: 1.25rem;

  &:first-of-type {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }

  @media (width >= map.get($grid-breakpoints, md)) {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
}

.etab-header-container {
  min-width: 200px;
}

.teaching-contents-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.teaching-entry {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
  }
}

.matiere-block {
  flex: 1;
}

.badges-inline-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 1rem;
  border-radius: var(--#{$prefix}border-radius, 8px);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--#{$prefix}body-color, #212529);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  background-color: transparent;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    border-color: var(--#{$prefix}secondary-color, #6c757d);
  }
}
</style>
