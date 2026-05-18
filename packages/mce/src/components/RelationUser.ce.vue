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
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { getDetailEnfant } from '@/services/serviceMce'

defineOptions({ name: 'RelationUser' })

const props = defineProps<{
  mceApi: string
  userInfoApiUrl: string
  details: Array<Relation>
  titre: string
  onglet: string
}>()

const emit = defineEmits(['openModal'])
const { t } = useI18n()
const m = (key: string): string => t(`relation-user.${key}`)

const relations = ref<Array<Relation>>([])
const personne = ref<any>()

watchEffect((): void => {
  void (() => {
    relations.value = props.details
  })()
})

async function openModal(event: Event, uid: string): Promise<void> {
  const response = await getDetailEnfant(props.mceApi + uid, props.userInfoApiUrl)
  personne.value = response.data

  const openModalCustomEvent = new CustomEvent('openModale', {
    detail: {
      title: personne.value?.userName,
      originalEvent: event.composedPath()[0] as HTMLElement,
    },
    bubbles: true,
    composed: true,
  })
  document.dispatchEvent(openModalCustomEvent)
  emit('openModal', personne.value)
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
            role="button"
            tabindex="0"
            @click.prevent="(e) => openModal(e, val.uidRelation)"
            @keydown.enter.prevent="(e) => openModal(e, val.uidRelation)"
          >
            <div class="info-item entry-container">
              <span class="info-label">{{ val.typeRelation || 'Relation' }}</span>
              <span class="info-value name-bold">{{ val.displayNameRelation }}</span>
            </div>

            <div v-if="val.autoriteParental" class="tag-container">
              <span class="ap-tag">
                {{ m('parental-authority') }}
              </span>
            </div>
          </div>
        </template>
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
}

.profile-card {
  width: 100%;
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
    color: var(--#{$prefix}body-color, #212529);
  }
}

.card-body-grid {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  background-color: var(--#{$prefix}body-bg, #ffffff);

  @media (width >= map.get($grid-breakpoints, md)) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 3rem;
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

  &.name-bold {
    font-weight: 700;
  }
}

.relation-row-item {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.25rem;
  border-top: 1px dashed var(--#{$prefix}border-color, #dee2e6);
  padding-top: 1.25rem;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  border-radius: var(--#{$prefix}border-radius, 8px);

  padding-left: 0.5rem;
  padding-right: 0.5rem;

  &:first-of-type {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    align-items: flex-end;
    gap: 1.5rem;
  }

  &:hover {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
  }

  &:focus-visible {
    outline: none;
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    box-shadow: 0 0 0 2px var(--#{$prefix}primary-focus, rgba(0, 86, 179, 0.15));
  }
}

.entry-container {
  flex: 1;
}

.tag-container {
  display: flex;
  align-items: center;
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
  white-space: nowrap;

  background-color: var(--#{$prefix}success-bg-subtle, #d1e7dd);
  color: var(--#{$prefix}success, #0f5132);
  border: 1px solid var(--#{$prefix}success-border-subtle, #badbcc);
}
</style>
