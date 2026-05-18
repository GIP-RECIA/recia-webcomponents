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
import type { Etabs, SectionEleve } from '@/types/generalType'

defineOptions({ name: 'ClassesGroupesEleve' })

defineProps<{
  etabs: Array<Etabs>
  sectionEleve: SectionEleve | undefined
  labelTitre: string
  labelTitreCours: string
  labelClass: string
  labelGroup: string
}>()
</script>

<template>
  <div class="sections-wrapper">
    <!-- BLOC CLASSES ET GROUPES -->
    <section class="profile-card">
      <header class="card-header">
        <h2>{{ labelTitre }}</h2>
      </header>

      <div class="card-body-grid">
        <div v-for="(classgroup, index) in etabs" :key="index" class="etab-row-item">
          <!-- Nom de l'établissement qui sert de libellé principal de la ligne -->
          <div class="info-item etab-header-container">
            <span class="info-label">Établissement</span>
            <span class="info-value etab-name-bold">{{ classgroup.nameEtab }}</span>
          </div>

          <!-- Grille interne pour aligner Classe et Groupe comme les infos perso -->
          <div class="classes-data-group">
            <div class="info-item">
              <span class="info-label">{{ labelClass }}</span>
              <span class="info-value">{{ classgroup.classes[0] || '—' }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">{{ labelGroup }}</span>
              <span class="info-value">{{ classgroup.groupes[0] || '—' }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOC ENSEIGNEMENTS -->
    <section class="profile-card">
      <header class="card-header">
        <h2>{{ labelTitreCours }}</h2>
      </header>

      <div class="card-body-grid">
        <div class="enseignements-row">
          <div class="info-item label-container">
            <span class="info-label">Matières suivies</span>
          </div>
          <div class="enseignements-list">
            <span v-for="(ens, index) in sectionEleve?.enseignementSuivis" :key="index" class="pill-tag">
              {{ ens }}
            </span>
            <span v-if="!sectionEleve?.enseignementSuivis?.length" class="info-value">—</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.sections-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.75rem;
  margin: 0 auto;

  @media (width >= map.get($grid-breakpoints, lg)) {
    flex-direction: row;
    align-items: flex-start;

    .profile-card {
      flex: 1;
    }
  }
}

.profile-card {
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

  &.etab-name-bold {
    font-weight: 700;
  }
}

.etab-row-item {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.25rem;
  border-top: 1px dashed var(--#{$prefix}border-color, #dee2e6);
  padding-top: 1.25rem;

  &:first-of-type {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    align-items: flex-end;
    gap: 2rem;
  }
}

.etab-header-container {
  flex: 1;
}

.classes-data-group {
  display: flex;
  gap: 1.5rem;

  @media (width >= map.get($grid-breakpoints, sm)) {
    gap: 3rem;
  }
}

.enseignements-row {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }
}

.label-container {
  min-width: 120px;
  @media (width >= map.get($grid-breakpoints, sm)) {
    padding-top: 0.35rem;
  }
}

.enseignements-list {
  flex: 1;
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

  &:hover {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    border-color: var(--#{$prefix}secondary-color, #6c757d);
  }
}
</style>
