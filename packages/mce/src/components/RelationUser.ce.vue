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

async function selectRelation(uid: string): Promise<void> {
  if (selectedUid.value === uid) {
    closeDetail()
    return
  }

  isLoading.value = true
  hasError.value = false
  showDetail.value = true

  try {
    const response = await getDetailEnfant(props.mceApi + uid, props.userInfoApiUrl)
    personne.value = response.data
    selectedUid.value = uid
  }
  catch (error) {
    console.error('[RelationUser] Erreur getDetailEnfant :', error)
    hasError.value = true
  }
  finally {
    isLoading.value = false
  }
}

function closeDetail(): void {
  selectedUid.value = null
  personne.value = null
  hasError.value = false
  isLoading.value = false
  showDetail.value = false
}
</script>

<template>
  <section class="profile-card">
    <header class="card-header">
      <h3>{{ m(`title-relation-${titre}`) }}</h3>
    </header>

    <div class="card-body">
      <template v-for="(val, index) in relations" :key="index">
        <div
          class="relation-row-item"
          :class="{ 'relation-row-item--active': selectedUid === val.uidRelation }"
          role="button"
          tabindex="0"
          @click.prevent="selectRelation(val.uidRelation)"
          @keydown.enter.prevent="selectRelation(val.uidRelation)"
        >
          <div class="info-item">
            <span class="info-label">{{ val.typeRelation || m('relation-default') }}</span>
            <span class="info-value info-value--bold">{{ val.displayNameRelation }}</span>
          </div>

          <div v-if="val.autoriteParental" class="tag-container">
            <span class="ap-tag">{{ m('parental-authority') }}</span>
          </div>

          <span class="chevron" :class="{ 'chevron--open': selectedUid === val.uidRelation }">›</span>
        </div>
      </template>

      <RelationUserDetail
        v-if="showDetail"
        :personne="personne"
        :is-loading="isLoading"
        :has-error="hasError"
        @close="closeDetail"
      />
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
  display: flex;
  flex-direction: column;
}

.info-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
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
</style>
