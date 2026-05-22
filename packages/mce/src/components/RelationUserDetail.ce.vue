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

const props = defineProps<{
  personne: any
  isLoading: boolean
  hasError: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const i18n = inject(I18nInjectionKey)
function t(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`relation-user-detail.${key}`) : key
}

const formatDate = computed(() => {
  if (!props.personne?.bod)
    return ''
  const parts = props.personne.bod.split('-')
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : props.personne.bod
})

const initials = computed(() => {
  const name = props.personne?.userName?.trim() ?? ''
  if (!name)
    return '?'
  // eslint-disable-next-line e18e/prefer-static-regex
  const parts = name.split(/\s+/)
  return parts.length > 1
    ? `${parts[0].charAt(0)}${parts.at(-1).charAt(0)}`.toUpperCase()
    : name.charAt(0).toUpperCase()
})

const sectionEleve = computed(() => {
  return props.personne?.fonctionClassesGroupe?.sectionClassesGroupes?.sectionEleve ?? null
})

const classesList = computed(() => {
  if (!sectionEleve.value?.etabs || !Array.isArray(sectionEleve.value.etabs))
    return []

  const classes: string[] = []
  sectionEleve.value.etabs.forEach((etab: any) => {
    if (etab.classes && Array.isArray(etab.classes)) {
      classes.push(...etab.classes)
    }
    else if (etab.classe) {
      classes.push(etab.classe)
    }
  })
  return [...new Set(classes)]
})

const groupesList = computed(() => {
  if (!sectionEleve.value?.etabs || !Array.isArray(sectionEleve.value.etabs))
    return []

  const groupes: string[] = []
  sectionEleve.value.etabs.forEach((etab: any) => {
    if (etab.listGroupes && Array.isArray(etab.listGroupes)) {
      groupes.push(...etab.listGroupes)
    }
    else if (etab.groupes && Array.isArray(etab.groupes)) {
      groupes.push(...etab.groupes)
    }
    else if (etab.groupe) {
      groupes.push(etab.groupe)
    }
  })
  return [...new Set(groupes)]
})

const enseignementsList = computed(() => {
  return sectionEleve.value?.enseignementSuivis ?? []
})
</script>

<template>
  <div class="detail-panel">
    <div v-if="isLoading" class="detail-loading alert-message info">
      {{ t('loading') }}
    </div>

    <div v-else-if="hasError" class="detail-error alert-message error">
      {{ t('error') }}
    </div>

    <template v-else-if="personne">
      <div class="detail-header">
        <div class="avatar-container">
          <img
            v-if="personne.avatar"
            :src="personne.avatar"
            :alt="personne.userName"
            class="avatar-img"
          >
          <div v-else class="avatar-fallback">
            {{ initials }}
          </div>
        </div>

        <div class="detail-header-meta">
          <span class="detail-name">{{ personne.userName }}</span>
          <div class="badge-container">
            <span v-if="personne.etat" class="status-badge" :class="personne.etat.toLowerCase()">
              {{ personne.etat }}
            </span>
            <span v-if="personne.mdp === false" class="status-badge external">
              {{ t('external-account') }}
            </span>
          </div>
        </div>

        <button class="btn-close" :aria-label="t('close')" @click="$emit('close')">
          ✕
        </button>
      </div>

      <div class="detail-grid">
        <div v-if="personne.userMail" class="info-item full-width">
          <span class="info-label">{{ t('email') }}</span>
          <div class="info-value-container">
            <span class="info-value">{{ personne.userMail }}</span>
          </div>
        </div>

        <div v-if="personne.etab" class="info-item full-width">
          <span class="info-label">{{ t('etab') }}</span>
          <div class="info-value-container">
            <span class="info-value">{{ personne.etab }}</span>
          </div>
        </div>

        <div v-if="formatDate" class="info-item">
          <span class="info-label">{{ t('bod') }}</span>
          <div class="info-value-container">
            <span class="info-value">{{ formatDate }}</span>
          </div>
        </div>

        <div v-if="personne.uid" class="info-item">
          <span class="info-label">{{ t('uid') }}</span>
          <div class="info-value-container">
            <span class="info-value">{{ personne.uid }}</span>
          </div>
        </div>
      </div>

      <div v-if="classesList.length || groupesList.length" class="sub-section">
        <h3 class="section-title">
          {{ t('classes-groupes') }}
        </h3>

        <div class="detail-grid">
          <div v-if="classesList.length" class="info-item">
            <span class="info-label">{{ t('classes') }}</span>
            <div class="info-value-container tags-container">
              <span v-for="(classe, i) in classesList" :key="i" class="data-tag classe">
                {{ classe }}
              </span>
            </div>
          </div>

          <div v-if="groupesList.length" class="info-item">
            <span class="info-label">{{ t('groupes') }}</span>
            <div class="info-value-container tags-container">
              <span v-for="(groupe, i) in groupesList" :key="i" class="data-tag groupe">
                {{ groupe }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="enseignementsList.length" class="sub-section">
        <h3 class="section-title">
          {{ t('enseignements') }}
        </h3>
        <div class="info-value-container matrix-container">
          <div class="disciplines-grid">
            <span v-for="(matiere, i) in enseignementsList" :key="i" class="discipline-tag">
              {{ matiere }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="personne.parentEleve?.length" class="sub-section">
        <h3 class="section-title">
          {{ t('personnes-relation') }}
        </h3>
        <div class="relations-list">
          <div
            v-for="(parent, i) in personne.parentEleve"
            :key="i"
            class="relation-card"
          >
            <div class="relation-info">
              <span class="relation-name">{{ parent.displayNameRelation }}</span>
              <small v-if="parent.lienParente" class="relation-type">
                {{ t('lien') }} : {{ parent.lienParente }}
              </small>
            </div>
            <span v-if="parent.autoriteParental" class="status-badge valide">
              {{ t('autorite-parentale') }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.detail-panel {
  grid-column: 1 / -1;
  background-color: var(--#{$prefix}body-bg, #ffffff);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 10px 25px -5px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.05));
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  animation: fadeIn 0.2s ease;

  @media (width >= map.get($grid-breakpoints, md)) {
    padding: 1.5rem;
    gap: 1.5rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sub-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid var(--#{$prefix}border-color, #dee2e6);
  padding-top: 1.25rem;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

.section-title {
  margin: 0;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  color: var(--#{$prefix}secondary-color, #6c757d);
}

.alert-message {
  padding: 0.75rem;
  border-radius: var(--#{$prefix}border-radius, 8px);
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;

  &.info {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    color: var(--#{$prefix}secondary-color, #6c757d);
    border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  }

  &.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;
  width: 100%;
}

.avatar-container {
  flex-shrink: 0;
}

.avatar-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
}

.avatar-fallback {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--#{$prefix}primary-bg, #e7f1ff);
  color: var(--#{$prefix}primary, #0056b3);
  border: 1px solid var(--#{$prefix}primary-border-subtle, #b6d4fe);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
}

.detail-header-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.detail-name {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.95rem;
  color: var(--#{$prefix}body-color, #212529);
  overflow-wrap: break-word;
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

.status-badge {
  background-color: var(--#{$prefix}secondary-bg, #ced4da);
  color: var(--#{$prefix}secondary-color, #6c757d);
  padding: 0.2rem 0.6rem;
  border-radius: var(--#{$prefix}border-radius, 6px);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  white-space: normal;
  text-align: center;
  max-width: 100%;

  &.valide,
  &.active {
    background-color: var(--#{$prefix}success-bg-subtle, #d1e7dd);
    color: var(--#{$prefix}success, #0f5132);
    border: 1px solid var(--#{$prefix}success-border-subtle, #badbcc);
  }

  &.external {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    color: var(--#{$prefix}secondary-color, #6c757d);
  }
}

.btn-close {
  background: transparent;
  color: var(--#{$prefix}body-color, #212529);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: var(--#{$prefix}border-radius, 8px);
  flex-shrink: 0;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  &:hover {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    border-color: var(--#{$prefix}secondary-color, #6c757d);
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;

  @media (width >= map.get($grid-breakpoints, sm)) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;

  &.full-width {
    grid-column: 1 / -1;
  }
}

.info-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
  color: var(--#{$prefix}secondary-color, #6c757d);
}

.info-value-container {
  background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  min-width: 0;
  width: 100%;
  box-sizing: border-box;

  &.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

.info-value {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--#{$prefix}body-color, #212529);
  display: block;
  overflow-wrap: break-word;
  word-break: normal;
}

.btn-external-link {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--#{$prefix}primary-bg-subtle, #e8f0fe);
  color: var(--#{$prefix}primary, #1a73e8);
  border: 1px dashed var(--#{$prefix}primary-border-subtle, #b6d4fe);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.2s;

  span {
    font-size: 0.9rem;
  }
  &:hover {
    background-color: var(--#{$prefix}border-color, #dee2e6);
  }
}

.data-tag {
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  background-color: var(--#{$prefix}body-bg, #ffffff);
  color: var(--#{$prefix}body-color, #212529);
  max-width: 100%;
  overflow-wrap: break-word;
}

.disciplines-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  width: 100%;

  @media (width >= map.get($grid-breakpoints, sm)) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.discipline-tag {
  background-color: var(--#{$prefix}primary-bg, #e7f1ff);
  color: var(--#{$prefix}primary, #0056b3);
  border: 1px solid var(--#{$prefix}primary-border-subtle, #b6d4fe);
  padding: 0.4rem 0.6rem;
  border-radius: var(--#{$prefix}border-radius, 6px);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  max-width: 100%;
  overflow-wrap: break-word;
}

.relations-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.relation-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  padding: 0.75rem;
  border-radius: 8px;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;

  .relation-info {
    display: flex;
    flex-direction: column;
    min-width: 0;

    .relation-name {
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--#{$prefix}body-color, #212529);
      overflow-wrap: break-word;
      word-break: normal;
    }
    .relation-type {
      font-size: 0.75rem;
      color: var(--#{$prefix}secondary-color, #6c757d);
    }
  }

  .status-badge {
    flex-shrink: 0;
  }
}

@media (width <= 400px) {
  .detail-panel {
    padding: 0.5rem;
    border-radius: 8px;
    gap: 0.85rem;
    width: 100% !important;
    left: 0 !important;
    right: 0 !important;
  }

  .info-value-container {
    padding: 0.5rem;
  }

  .info-value {
    font-size: 0.8rem;
  }

  .detail-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;

    .btn-close {
      position: absolute;
      top: -4px;
      right: -4px;
      padding: 0.25rem 0.4rem;
      font-size: 0.7rem;
    }
  }

  .detail-header-meta {
    width: 100%;
    align-items: center;
    padding-right: 0;
  }

  .badge-container {
    justify-content: center;
    width: 100%;
  }

  .relation-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;

    .status-badge {
      align-self: center;
      width: auto;
    }
  }
}

:deep(*) {
  box-sizing: border-box !important;
}
</style>
