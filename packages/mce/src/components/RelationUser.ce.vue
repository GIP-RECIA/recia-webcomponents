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
import type { Relation } from '@/types/relationType'
import { computed, inject, ref } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import { getDetailEnfant } from '@/services/serviceMce'
import RelationUserDetail from './RelationUserDetail.ce.vue'

defineOptions({ name: 'RelationUser' })

const props = withDefaults(defineProps<{
  mceApi: string
  userInfoApiUrl: string
  details?: Relation[]
  titre: string
  onglet: string
}>(), {
  details: () => [],
})

const i18n = inject(I18nInjectionKey)
function m(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`relation-user.${key}`) : key
}

const relations = computed(() => props.details ?? [])

const selectedUid = ref<string | null>(null)
const personne = ref<any>(null)
const isLoading = ref(false)
const hasError = ref(false)
const showDetail = ref(false)
const currentAbortController = ref<AbortController | null>(null)

async function selectRelation(uid: string): Promise<void> {
  if (selectedUid.value === uid) {
    closeDetail()
    return
  }

  // Annule un éventuel appel précédent encore en vol
  currentAbortController.value?.abort()
  const controller = new AbortController()
  currentAbortController.value = controller

  isLoading.value = true
  hasError.value = false
  showDetail.value = true
  selectedUid.value = uid // optimiste : active la ligne immédiatement

  try {
    const response = await getDetailEnfant(props.mceApi + uid, props.userInfoApiUrl)
    // Ignore le résultat si un clic plus récent a déjà remplacé la sélection
    if (controller.signal.aborted)
      return
    personne.value = response.data
  }
  catch (error) {
    if (controller.signal.aborted)
      return
    console.error('[RelationUser] Erreur getDetailEnfant :', error)
    hasError.value = true
  }
  finally {
    if (!controller.signal.aborted)
      isLoading.value = false
  }
}

function closeDetail(): void {
  currentAbortController.value?.abort()
  currentAbortController.value = null
  selectedUid.value = null
  personne.value = null
  hasError.value = false
  isLoading.value = false
  showDetail.value = false
}
</script>

<template>
  <section class="profile-card" :aria-labelledby="`relation-title-${titre}`">
    <header class="card-header">
      <h3 :id="`relation-title-${titre}`">
        {{ m(`title-relation-${titre}`) }}
      </h3>
    </header>

    <div class="card-body">
      <!-- Liste vide -->
      <p v-if="relations.length === 0" class="relation-empty">
        {{ m('no-relation') }}
      </p>

      <ul v-else class="relation-list" role="list">
        <li
          v-for="val in relations"
          :key="val.uidRelation"
          class="relation-list-item"
        >
          <!--
            IDs uniques par relation :
            - aria-controls pointe vers le bon panneau de détail
            - pas d'id fixe partagé entre tous les boutons
          -->
          <div
            :id="`rel-btn-${val.uidRelation}`"
            role="button"
            tabindex="0"
            class="relation-row-item"
            :class="{ 'relation-row-item--active': selectedUid === val.uidRelation }"
            :aria-expanded="selectedUid === val.uidRelation"
            :aria-controls="`rel-detail-${val.uidRelation}`"
            :aria-label="`${val.typeRelation || m('relation-default')} ${val.displayNameRelation}`"
            @click.prevent="selectRelation(val.uidRelation)"
            @keydown.enter.prevent="selectRelation(val.uidRelation)"
            @keydown.space.prevent="selectRelation(val.uidRelation)"
          >
            <span class="info-item">
              <span class="info-label">{{ val.typeRelation || m('relation-default') }}</span>
              <span class="info-value info-value--bold">{{ val.displayNameRelation }}</span>
            </span>

            <span class="relation-row-actions">
              <span v-if="val.autoriteParental" class="tag-container">
                <span class="ap-tag">{{ m('parental-authority') }}</span>
              </span>
              <span
                class="chevron"
                :class="{ 'chevron--open': selectedUid === val.uidRelation }"
                aria-hidden="true"
              >›</span>
            </span>
          </div>

          <!--
            Panneau de détail dans le <li>, adjacent au bouton qui le contrôle.
            Avec N relations, chaque détail apparaît exactement sous sa propre ligne.
            aria-controls et cet id sont cohérents et uniques.
          -->
          <div
            v-if="selectedUid === val.uidRelation && showDetail"
            :id="`rel-detail-${val.uidRelation}`"
            class="relation-detail-panel"
            role="region"
            :aria-labelledby="`rel-btn-${val.uidRelation}`"
            aria-live="polite"
          >
            <RelationUserDetail
              :personne="personne"
              :is-loading="isLoading"
              :has-error="hasError"
              @close="closeDetail"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use './mce-shared' as *;

.profile-card {
  @include mce-card-base;
}

.card-header {
  @include mce-card-header;
}

.card-body {
  @include mce-card-body;
}

.relation-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.relation-list-item {
  margin: 0;
  padding: 0;
}

.info-item {
  @include mce-info-item;
  display: flex; // nécessaire car span est inline par défaut
}

.relation-row-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
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

.relation-row-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px dashed var(--#{$prefix}stroke);
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
  min-width: 0;
  width: 100%;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:hover,
  &--active {
    background-color: var(--#{$prefix}hover);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--#{$prefix}primary) 20%, transparent);
  }

  @media (width <= 400px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    position: relative;
    padding-right: 2rem;
  }
}

.tag-container {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (width <= 400px) {
    width: 100%;
  }
}

.chevron {
  font-size: var(--#{$prefix}font-size-lg);
  color: var(--#{$prefix}basic-black-lighter);
  transform: rotate(0deg);
  transition: transform 0.2s;
  line-height: 1;
  flex-shrink: 0;

  &--open {
    transform: rotate(90deg);
  }

  @media (width <= 400px) {
    position: absolute;
    right: 8px;
    top: 1rem;
  }
}

.ap-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: var(--#{$prefix}font-size-xxs);
  font-weight: 700;
  text-transform: uppercase;
  background-color: color-mix(in srgb, var(--#{$prefix}system-blue) 10%, transparent);
  color: var(--#{$prefix}system-blue);
  border: 1px solid color-mix(in srgb, var(--#{$prefix}system-blue) 30%, transparent);
}

.relation-detail-panel {
  margin-top: 0.5rem;
}

.relation-empty {
  padding: 1.25rem;
  color: var(--#{$prefix}basic-black-lighter);
  font-size: var(--#{$prefix}font-size-sm);
  text-align: center;
  margin: 0;
}
</style>
