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
import { computed, inject } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'

defineOptions({ name: 'RelationUserDetail' })

const props = defineProps({
  personne: { type: Object as () => any, default: null },
  isLoading: { type: Boolean },
  errorMessage: { type: String, default: undefined },
})

defineEmits<{
  (e: 'close'): void
}>()

const i18n = inject(I18nInjectionKey)
function t(key: string, params?: Record<string, unknown>): string {
  return i18n ? (i18n.global.t as (k: string, p?: Record<string, unknown>) => string)(`relation-user-detail.${key}`, params) : key
}

const formatDate = computed(() => {
  if (!props.personne?.bod)
    return ''
  const parts = props.personne.bod.split('-')
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : props.personne.bod
})

const sectionEleve = computed(() => {
  return props.personne?.fonctionClassesGroupe?.sectionClassesGroupes?.sectionEleve ?? null
})

const classesList = computed(() => {
  if (!sectionEleve.value?.etabs || !Array.isArray(sectionEleve.value.etabs))
    return []
  const classes: string[] = []
  sectionEleve.value.etabs.forEach((etab: any) => {
    if (etab.classes && Array.isArray(etab.classes))
      classes.push(...etab.classes)
    else if (etab.classe)
      classes.push(etab.classe)
  })
  return [...new Set(classes)]
})

const groupesList = computed(() => {
  if (!sectionEleve.value?.etabs || !Array.isArray(sectionEleve.value.etabs))
    return []
  const groupes: string[] = []
  sectionEleve.value.etabs.forEach((etab: any) => {
    if (etab.listGroupes && Array.isArray(etab.listGroupes))
      groupes.push(...etab.listGroupes)
    else if (etab.groupes && Array.isArray(etab.groupes))
      groupes.push(...etab.groupes)
    else if (etab.groupe)
      groupes.push(etab.groupe)
  })
  return [...new Set(groupes)]
})

const enseignementsList = computed(() => {
  return sectionEleve.value?.enseignementSuivis ?? []
})
</script>

<template>
  <section
    class="detail-panel"
    :aria-labelledby="personne ? 'relation-detail-title' : undefined"
    :aria-label="!personne ? t('detail-panel-label') : undefined"
  >
    <!-- Chargement -->
    <output
      v-if="isLoading"
      class="alert-message alert-message--info"
      aria-live="polite"
    >
      {{ t('loading') }}
    </output>

    <!-- Erreur -->
    <div
      v-else-if="errorMessage"
      class="alert-message alert-message--error"
      role="alert"
      aria-live="assertive"
    >
      {{ errorMessage }}
    </div>

    <!-- Contenu -->
    <template v-else-if="personne">
      <!-- En-tête -->
      <div class="detail-header">
        <div class="detail-header-meta">
          <h3
            id="relation-detail-title"
            class="detail-name"
          >
            {{ personne.userName }}
          </h3>
          <div class="badge-container">
            <span
              v-if="personne.etat"
              class="status-badge"
              :class="`status-badge--${personne.etat.toLowerCase()}`"
            >
              {{ personne.etat }}
            </span>
            <span
              v-if="personne.mdp === false"
              class="status-badge status-badge--external"
            >
              {{ t('external-account') }}
            </span>
          </div>
        </div>

        <button
          type="button"
          class="btn-primary small"
          :aria-label="t('close')"
          @click="$emit('close')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="detail-grid">
        <div
          v-if="personne.etab"
          class="info-item info-item--full"
        >
          <span class="info-label">{{ t('etab') }}</span>
          <span class="info-value-box">{{ personne.etab }}</span>
        </div>

        <div
          v-if="formatDate"
          class="info-item"
        >
          <span class="info-label">{{ t('bod') }}</span>
          <span class="info-value-box">
            <time :datetime="personne.bod">{{ formatDate }}</time>
          </span>
        </div>

        <div
          v-if="personne.uid"
          class="info-item"
        >
          <span class="info-label">{{ t('uid') }}</span>
          <span class="info-value-box">{{ personne.uid }}</span>
        </div>
      </div>

      <!-- Classes & groupes -->
      <div
        v-if="classesList.length || groupesList.length"
        class="sub-section"
      >
        <h4 class="sub-section-title">
          {{ t('classes-groupes') }}
        </h4>

        <div class="detail-grid">
          <div
            v-if="classesList.length"
            class="info-item"
          >
            <span class="info-label">{{ t('classes') }}</span>
            <div class="info-value-box info-value-box--tags">
              <span
                v-for="(classe, i) in classesList"
                :key="i"
                class="badge-tag"
              >
                {{ classe }}
              </span>
            </div>
          </div>

          <div
            v-if="groupesList.length"
            class="info-item"
          >
            <span class="info-label">{{ t('groupes') }}</span>
            <div class="info-value-box info-value-box--tags">
              <span
                v-for="(groupe, i) in groupesList"
                :key="i"
                class="badge-tag"
              >
                {{ groupe }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Enseignements -->
      <div
        v-if="enseignementsList.length"
        class="sub-section"
      >
        <h4 class="sub-section-title">
          {{ t('enseignements') }}
        </h4>
        <div class="enseignements-grid">
          <span
            v-for="(matiere, i) in enseignementsList"
            :key="i"
            class="badge-tag"
          >
            {{ matiere }}
          </span>
        </div>
      </div>

      <!-- Personnes en relation -->
      <div
        v-if="personne.parentEleve?.length"
        class="sub-section"
      >
        <h4 class="sub-section-title">
          {{ t('personnes-relation') }}
        </h4>
        <div class="relations-list">
          <div
            v-for="(parent, i) in personne.parentEleve"
            :key="i"
            class="relation-card"
          >
            <div class="relation-info">
              <span class="info-value info-value--bold">{{ parent.displayNameRelation }}</span>
              <span
                v-if="parent.lienParente"
                class="relation-type"
              >
                {{ t('lien-label', { lien: parent.lienParente }) }}
              </span>
            </div>
            <span
              v-if="parent.autoriteParental"
              class="ap-tag"
            >
              {{ t('autorite-parentale') }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use '../assets/mce-shared' as *;

.detail-panel {
  @include mce-card-base($overflow: visible);
  @include mce-fade-in(0.2s);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (width >= map.get($grid-breakpoints, md)) {
    padding: 1.5rem;
    gap: 1.5rem;
  }
}

.detail-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
}

.detail-header-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;

  @media (width < map.get($grid-breakpoints, sm)) {
    align-items: center;
    text-align: center;
  }
}

.detail-name {
  margin: 0;
  font-weight: 700;
  font-size: var(--#{$prefix}font-size-sm);
  color: var(--#{$prefix}basic-black);
  overflow-wrap: break-word;
}

.badge-container {
  @include mce-badge-container;

  @media (width < map.get($grid-breakpoints, sm)) {
    justify-content: center;
  }
}

.status-badge {
  @include mce-status-badge;
}

.badge-tag {
  @include mce-discipline-tag;
}

.ap-tag {
  @include mce-ap-tag;
  flex-shrink: 0;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (width >= map.get($grid-breakpoints, sm)) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-item {
  @include mce-info-item;

  &--full {
    grid-column: 1 / -1;
  }
}

.info-label {
  @include mce-info-label;
}

.info-value-box {
  @include mce-value-box;
  font-size: var(--#{$prefix}font-size-sm);
  overflow-wrap: break-word;

  &--tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

.info-value {
  @include mce-info-value;
  display: block;
  overflow-wrap: break-word;

  &--bold {
    @include mce-info-value-bold;
  }
}

.sub-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid var(--#{$prefix}stroke);
  padding-top: 1.25rem;
  min-width: 0;
}

.sub-section-title {
  @include mce-label-style;
  margin: 0;
  color: var(--#{$prefix}basic-black-lighter);
  letter-spacing: 0.05em;
}

.enseignements-grid {
  @include mce-tags-list;
}

.relations-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.relation-card {
  @include mce-sub-card;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (width < map.get($grid-breakpoints, sm)) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.relation-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.relation-type {
  font-size: var(--#{$prefix}font-size-xs);
  color: var(--#{$prefix}basic-black-lighter);
}

.alert-message {
  @include mce-alert-message;
  text-align: center;

  &--info {
    background-color: var(--#{$prefix}basic-grey);
    color: var(--#{$prefix}basic-black-lighter);
    border: 1px solid var(--#{$prefix}stroke);
  }
}
</style>
