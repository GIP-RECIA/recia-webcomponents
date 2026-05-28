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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
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

const { t } = useI18n()
const m = (key: string): string => t(`relation-user.${key}`)

// Utilisation sécurisée
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
    const response = await getDetailEnfant(
      props.mceApi + uid,
      props.userInfoApiUrl,
    )
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
  <section class="page-container">
    <div class="profile-card">
      <header class="card-header">
        <h2>{{ m(`title-relation-${titre}`) }}</h2>
      </header>
      <div class="card-body-grid">
        <template v-for="(val, index) in relations" :key="index">
          <div
            class="relation-row-item"
            :class="{ active: selectedUid === val.uidRelation }"
            role="button"
            tabindex="0"
            @click.prevent="selectRelation(val.uidRelation)"
            @keydown.enter.prevent="selectRelation(val.uidRelation)"
          >
            <div class="info-item entry-container">
              <span class="info-label">{{ val.typeRelation || m('relation-default') }}</span>
              <span class="info-value name-bold">{{ val.displayNameRelation }}</span>
            </div>
            <div v-if="val.autoriteParental" class="tag-container">
              <span class="ap-tag">{{ m('parental-authority') }}</span>
            </div>
            <span class="chevron" :class="{ open: selectedUid === val.uidRelation }">›</span>
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
  width: 100%;
  box-sizing: border-box;
}

.profile-card {
  width: 100%;
  max-width: 100%;
  background-color: var(--#{$prefix}body-bg, #ffffff);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.1));
  box-sizing: border-box;
}

.card-header {
  padding: 1.5rem 1.25rem 0;
  background-color: var(--#{$prefix}body-bg, #ffffff);

  h2 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--#{$prefix}body-color, #212529);
  }

  @media (width <= 320px) {
    padding: 1rem 0.75rem 0;
    h2 {
      font-size: 1.1rem;
    }
  }
}

.card-body-grid {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  background-color: var(--#{$prefix}body-bg, #ffffff);
  box-sizing: border-box;
  min-width: 0;

  @media (width >= map.get($grid-breakpoints, md)) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 3rem;
    padding: 1.5rem 2rem 2rem;
  }

  @media (width <= 320px) {
    padding: 0.75rem 0.5rem;
    gap: 1rem;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  color: var(--#{$prefix}secondary-color, #6c757d);
  word-break: normal !important;
  white-space: normal !important;
}

.info-value {
  font-size: 0.95rem;
  color: var(--#{$prefix}body-color, #212529);
  word-break: normal !important;
  overflow-wrap: normal !important;
  white-space: normal !important;
  display: block;
  width: 100%;

  &.name-bold {
    font-weight: 700;
  }
}

.relation-row-item {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 0.25rem;
  border-top: 1px dashed var(--#{$prefix}border-color, #dee2e6);
  padding: 1rem 0.5rem 0;
  cursor: pointer;
  border-radius: var(--#{$prefix}border-radius, 8px);
  transition: background-color 0.2s;
  box-sizing: border-box;
  min-width: 0;

  &:first-of-type {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }

  &:hover,
  &.active {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--#{$prefix}primary-focus, rgba(0, 86, 179, 0.15));
  }
}

.entry-container {
  flex: 1 1 auto;
  min-width: 0;
}

.tag-container {
  display: flex;
  align-items: center;
  min-width: 0;
}

.chevron {
  font-size: 1.25rem;
  color: var(--#{$prefix}secondary-color, #6c757d);
  transform: rotate(0deg);
  transition: transform 0.2s;
  line-height: 1;
  flex-shrink: 0;

  &.open {
    transform: rotate(90deg);
  }
}

.ap-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.8rem;
  border-radius: var(--#{$prefix}border-radius, 6px);
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  background-color: var(--#{$prefix}success-bg-subtle, #d1e7dd);
  color: var(--#{$prefix}success, #0f5132);
  border: 1px solid var(--#{$prefix}success-border-subtle, #badbcc);
}

@media (width <= 400px) {
  .relation-row-item {
    flex-direction: column;
    align-items: stretch;

    gap: 0.5rem;
    position: relative;
    padding: 0.75rem 2rem 0.75rem 0.4rem;
  }

  .entry-container {
    width: 100%;
    flex: 1 1 100%;
  }

  .tag-container {
    width: 100%;
  }

  .ap-tag {
    white-space: normal;
    text-align: left;
    width: fit-content;
    padding: 0.3rem 0.6rem;
  }

  .chevron {
    position: absolute;
    right: 8px;
    top: 1rem;
    transform: rotate(0deg);

    &.open {
      transform: rotate(90deg);
    }
  }
}
</style>
