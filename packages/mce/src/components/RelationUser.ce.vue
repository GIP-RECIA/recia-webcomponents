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

  currentAbortController.value?.abort()
  const controller = new AbortController()
  currentAbortController.value = controller

  isLoading.value = true
  hasError.value = false
  showDetail.value = true
  selectedUid.value = uid

  try {
    const response = await getDetailEnfant(props.mceApi + uid, props.userInfoApiUrl)
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
  <div class="card-wrapper">
    <section class="profile-card" :aria-labelledby="`relation-title-${titre}`">
      <div class="card-header">
        <h3 :id="`relation-title-${titre}`" tabindex="0">
          {{ m(`title-relation-${titre}`) }}
        </h3>
      </div>

      <div class="card-body">
        <p v-if="relations.length === 0" class="relation-empty">
          {{ m('no-relation') }}
        </p>

        <ul v-else class="relation-list">
          <li
            v-for="val in relations"
            :key="val.uidRelation"
          >
            <button
              :id="`rel-btn-${val.uidRelation}`"
              type="button"
              class="relation-row-item"
              :class="{ 'relation-row-item--active': selectedUid === val.uidRelation }"
              :aria-expanded="selectedUid === val.uidRelation"
              :aria-controls="`rel-detail-${val.uidRelation}`"
              :aria-label="`${val.typeRelation || m('relation-default')} : ${val.displayNameRelation}${val.autoriteParental ? ` — ${m('parental-authority')}` : ''}`"
              @click.prevent="selectRelation(val.uidRelation)"
            >
              <span class="info-item" aria-hidden="true">
                <span class="info-label">{{ val.typeRelation || m('relation-default') }}</span>
                <span class="info-value info-value--bold">{{ val.displayNameRelation }}</span>
              </span>

              <span class="relation-row-actions" aria-hidden="true">
                <span v-if="val.autoriteParental" class="tag-container">
                  <span class="ap-tag">{{ m('parental-authority') }}</span>
                </span>
                <span
                  class="chevron"
                  :class="{ 'chevron--open': selectedUid === val.uidRelation }"
                >›</span>
              </span>
            </button>

            <div
              v-show="selectedUid === val.uidRelation && showDetail"
              :id="`rel-detail-${val.uidRelation}`"
              :inert="selectedUid !== val.uidRelation"
              class="relation-detail-panel"
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
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use './mce-shared' as *;

.card-wrapper {
  display: block;
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

.relation-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.info-item {
  @include mce-info-item;
  display: flex;
}

.relation-row-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;

  @media (width < map.get($grid-breakpoints, sm)) {
    margin-left: 0;
    justify-content: flex-start;
  }
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
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.2s;
  min-width: 0;
  width: 100%;
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  text-align: left;
  font: inherit;
  color: inherit;

  &:hover,
  &--active {
    background-color: var(--#{$prefix}hover);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--#{$prefix}primary) 20%, transparent);
  }

  @media (width < map.get($grid-breakpoints, sm)) {
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
}

.ap-tag {
  @include mce-ap-tag;
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
