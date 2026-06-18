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
    <div class="profile-card">
      <div class="card-header">
        <h3 id="title-classe-groupe" tabindex="0">
          {{ tGeneral('title-classe-groupe') }}
        </h3>
      </div>

      <div class="card-body">
        <div
          v-for="(classgroup, index) in etabs"
          :key="index"
          class="etab-row-item"
        >
          <div class="etab-header-container">
            <span class="info-label">{{ tEleve('etablissement') }}</span>
            <span class="info-value info-value--bold">{{ classgroup.nameEtab }}</span>
          </div>

          <div class="classes-data-group">
            <!-- Classes -->
            <div class="info-item">
              <span class="info-label">{{ tGeneral('class') }}</span>
              <ul v-if="classgroup.classes?.length" class="pills-list" role="none">
                <li v-for="(cls, i) in classgroup.classes" :key="i" class="pill-tag" role="presentation">
                  {{ cls }}
                </li>
              </ul>
              <span v-else class="info-value">{{ tEleve('no-class') }}</span>
            </div>

            <!-- Groupes -->
            <div class="info-item">
              <span class="info-label">{{ tGeneral('group') }}</span>
              <ul v-if="classgroup.groupes?.length" class="pills-list" role="none">
                <li v-for="(grp, i) in classgroup.groupes" :key="i" class="pill-tag" role="presentation">
                  {{ grp }}
                </li>
              </ul>
              <span v-else class="info-value">{{ tEleve('no-group') }}</span>
            </div>
          </div>
        </div>

        <!-- Aucun établissement -->
        <p v-if="!etabs?.length" class="info-value">
          {{ tEleve('no-etab') }}
        </p>
      </div>
    </div>

    <!-- Carte matières suivies -->
    <div class="profile-card">
      <div class="card-header">
        <h3 id="title-courses" tabindex="0">
          {{ tGeneral('title-courses') }}
        </h3>
      </div>

      <div class="card-body">
        <div class="enseignements-row">
          <div class="enseignements-container">
            <span class="info-label">{{ tEleve('matieres-suivies') }}</span>
            <ul
              v-if="sectionEleve?.enseignementSuivis?.length"
              class="enseignements-list"
              role="none"
            >
              <li v-for="(ens, index) in sectionEleve.enseignementSuivis" :key="index" class="pill-tag" role="presentation">
                {{ ens }}
              </li>
            </ul>
            <span v-else class="info-value">{{ tEleve('no-course') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  @include mce-row-separator;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (width < map.get($grid-breakpoints, md)) {
    gap: 1rem;
  }

  @media (width < map.get($grid-breakpoints, sm)) {
    flex-direction: column;
    gap: 0.75rem;
  }
}

.etab-header-container {
  display: flex;
  flex-direction: column;
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
  @include mce-tags-list;
  margin: 2px 0 0;
}

.enseignements-row {
  display: flex;
  flex-direction: column;
}

.enseignements-list {
  @include mce-tags-list;
  margin: 2px 0 0;
}

.pill-tag {
  @include mce-discipline-tag;
}
</style>
