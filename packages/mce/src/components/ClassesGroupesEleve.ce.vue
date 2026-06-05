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
import { inject } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'

defineOptions({ name: 'ClassesGroupesEleve' })

defineProps<{
  etabs: Array<Etabs>
  sectionEleve: SectionEleve | undefined
}>()

const i18n = inject(I18nInjectionKey)
function tEleve(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`classes-groupes-eleve.${key}`) : key
}
function tGeneral(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`info-general.${key}`) : key
}
</script>

<template>
  <div class="sections-wrapper">
    <section class="profile-card">
      <header class="card-header">
        <h3>{{ tGeneral('title-classe-groupe') }}</h3>
      </header>

      <div class="card-body">
        <div v-for="(classgroup, index) in etabs" :key="index" class="etab-row-item">
          <div class="info-item etab-header-container">
            <span class="info-label">{{ tEleve('etablissement') }}</span>
            <span class="info-value info-value--bold">{{ classgroup.nameEtab }}</span>
          </div>

          <div class="classes-data-group">
            <div>jndazjndkj</div>
            <div class="info-item">
              <span class="info-label">{{ tGeneral('class') }}</span>
              <div class="pills-list">
                <span v-for="(cls, i) in classgroup.classes" :key="i" class="pill-tag">{{ cls }}</span>
                <span v-if="!classgroup.classes?.length" class="info-value">—</span>
              </div>
            </div>

            <div class="info-item">
              <span class="info-label">{{ tGeneral('group') }}</span>
              <div class="pills-list">
                <span v-for="(grp, i) in classgroup.groupes" :key="i" class="pill-tag">{{ grp }}</span>
                <span v-if="!classgroup.groupes?.length" class="info-value">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="profile-card">
      <header class="card-header">
        <h3>{{ tGeneral('title-courses') }}</h3>
      </header>

      <div class="card-body">
        <div class="enseignements-row">
          <div class="info-item label-container">
            <span class="info-label">{{ tEleve('matieres-suivies') }}</span>
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
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';

.sections-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (width >= map.get($grid-breakpoints, lg)) {
    flex-direction: row;
    align-items: flex-start;

    .profile-card {
      flex: 1;
    }
  }
}

.profile-card {
  border: 1px solid var(--#{$prefix}stroke);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--#{$prefix}shadow-neutral) rgba(0, 0, 0, 0.1);
  background-color: var(--#{$prefix}body-bg);
}

.card-header {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid var(--#{$prefix}stroke);

  h3 {
    margin: 0;
    font-size: var(--#{$prefix}font-size-h3);
    color: var(--#{$prefix}basic-black);
  }
}

.card-body {
  padding: 1.25rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  display: block;
  font-size: var(--#{$prefix}font-size-xxs);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--#{$prefix}basic-black-lighter);
  margin-bottom: 4px;
}

.info-value {
  font-size: var(--#{$prefix}font-size-sm);
  color: var(--#{$prefix}basic-black);

  &--bold {
    font-weight: 600;
  }
}

.etab-row-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px dashed var(--#{$prefix}stroke);

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
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
  flex-wrap: wrap;

  @media (width >= map.get($grid-breakpoints, sm)) {
    gap: 3rem;
  }
}

.pills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 2px;
}

.enseignements-row {
  display: flex;
  flex-direction: column;

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }
}

.label-container {
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
  border-radius: 8px;
  font-size: var(--#{$prefix}font-size-sm);
  color: var(--#{$prefix}basic-black-lighter);
  border: 1px solid var(--#{$prefix}stroke);
  background-color: transparent;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  &:hover {
    background-color: var(--#{$prefix}hover);
    border-color: var(--#{$prefix}basic-black-lighter);
  }
}
</style>
