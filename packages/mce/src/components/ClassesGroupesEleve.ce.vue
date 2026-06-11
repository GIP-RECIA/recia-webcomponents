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
    <!-- Carte classes & groupes -->
    <section class="profile-card" aria-labelledby="title-classe-groupe">
      <header class="card-header">
        <h3 id="title-classe-groupe">
          {{ tGeneral('title-classe-groupe') }}
        </h3>
      </header>

      <div class="card-body">
        <div
          v-for="(classgroup, index) in etabs"
          :key="index"
          class="etab-row-item"
        >
          <!-- Établissement -->
          <div class="info-item etab-header-container">
            <span :id="`etab-label-${index}`" class="info-label">{{ tEleve('etablissement') }}</span>
            <span class="info-value info-value--bold" :aria-labelledby="`etab-label-${index}`">
              {{ classgroup.nameEtab }}
            </span>
          </div>

          <div class="classes-data-group">
            <!-- Classes -->
            <div class="info-item">
              <span :id="`classes-label-${index}`" class="info-label">{{ tGeneral('class') }}</span>
              <ul v-if="classgroup.classes?.length" class="pills-list" :aria-labelledby="`classes-label-${index}`">
                <li v-for="(cls, i) in classgroup.classes" :key="i" class="pill-tag">
                  {{ cls }}
                </li>
              </ul>
              <p v-else class="info-value">
                {{ tEleve('no-class') }}
              </p>
            </div>

            <!-- Groupes -->
            <div class="info-item">
              <span :id="`groupes-label-${index}`" class="info-label">{{ tGeneral('group') }}</span>
              <ul v-if="classgroup.groupes?.length" class="pills-list" :aria-labelledby="`groupes-label-${index}`">
                <li v-for="(grp, i) in classgroup.groupes" :key="i" class="pill-tag">
                  {{ grp }}
                </li>
              </ul>
              <p v-else class="info-value">
                {{ tEleve('no-group') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Aucun établissement -->
        <p v-if="!etabs?.length" class="info-value">
          {{ tEleve('no-etab') }}
        </p>
      </div>
    </section>

    <!-- Carte matières suivies -->
    <section class="profile-card" aria-labelledby="title-courses">
      <header class="card-header">
        <h3 id="title-courses">
          {{ tGeneral('title-courses') }}
        </h3>
      </header>

      <div class="card-body">
        <div class="enseignements-row">
          <div class="info-item label-container">
            <span id="matieres-label" class="info-label">{{ tEleve('matieres-suivies') }}</span>
          </div>
          <ul v-if="sectionEleve?.enseignementSuivis?.length" class="enseignements-list" aria-labelledby="matieres-label">
            <li v-for="(ens, index) in sectionEleve.enseignementSuivis" :key="index" class="pill-tag">
              {{ ens }}
            </li>
          </ul>
          <p v-else class="info-value">
            {{ tEleve('no-course') }}
          </p>
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
@use './mce-shared' as *;

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
  @include mce-card-base;
}

.card-header {
  @include mce-card-header;
}

.card-body {
  @include mce-card-body;
}

.info-item {
  @include mce-info-item;
}

.info-label {
  @include mce-info-label;
}

.info-value {
  @include mce-info-value;

  &--bold {
    @include mce-info-value-bold;
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
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 2px 0 0;
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
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill-tag {
  @include mce-pill-tag;

  &:hover {
    background-color: var(--#{$prefix}hover);
    border-color: var(--#{$prefix}basic-black-lighter);
  }
}
</style>
