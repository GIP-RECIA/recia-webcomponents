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
import type { PersonneFonction } from '@/types/fonctionType'
import { inject, nextTick, ref, watch } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import { dnmaService } from '@/services/dnmaService'
import { updateFonctionDateFin } from '@/services/serviceMce.ts'

defineOptions({ name: 'FonctionsList' })

const props = defineProps<{
  fonctions: Array<PersonneFonction>
  userInfoApiUrl: string
  mceApi: string
}>()

const MCE_SUFFIX = /\/mce\/?$/

const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const alertRef = ref<HTMLDivElement | null>(null)
const messageId = 'fonctions-list-message'

const localFonctions = ref(props.fonctions.map(f => ({ ...f })))

watch(
  () => props.fonctions,
  (val) => { localFonctions.value = val.map(f => ({ ...f })) },
)

const i18n = inject(I18nInjectionKey)
function tFonctions(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`fonctions-list.${key}`) : key
}
function tGeneral(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`info-general.${key}`) : key
}

function getToggleLabel(it: PersonneFonction): string {
  const action = it.active ? tFonctions('toggle-deactivate') : tFonctions('toggle-activate')
  const etab = it.struct.name || ''
  const fonction = it.fonction || ''
  const discipline = it.discipline || ''
  return [action, etab, fonction, discipline].filter(Boolean).join(', ')
}

async function toggleFonction(it: PersonneFonction): Promise<void> {
  it.active = !it.active
  await onToggle(it)
}

async function onToggle(it: PersonneFonction): Promise<void> {
  const id = it.idFonction

  if (!id) {
    console.error('Missing idFonction', it)
    return
  }

  const newValue = it.active
  const previous = !newValue

  try {
    const baseUrl = props.mceApi.replace(MCE_SUFFIX, '')
    await updateFonctionDateFin(baseUrl, id, newValue, props.userInfoApiUrl)
    dnmaService.toggleFonction(it.fonction ?? it.discipline)
  }
  catch (error: unknown) {
    console.error(error)
    it.active = previous
    message.value = (error as { response?: { data?: { message?: string } } })?.response?.data?.message ?? tFonctions('error-default')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
  }
}
</script>

<template>
  <section
    v-if="localFonctions?.length"
    class="profile-card"
    aria-labelledby="fonctions-list-heading"
  >
    <div class="card-header">
      <h3
        id="fonctions-list-heading"
      >
        {{ tGeneral('title-fonction') }}
      </h3>
    </div>

    <div class="card-body">
      <div
        v-if="message"
        :id="messageId"
        ref="alertRef"
        class="alert-message"
        :class="`alert-message--${messageType}`"
        role="alert"
        tabindex="-1"
      >
        {{ message }}
      </div>

      <div class="grid-fonctions">
        <div
          v-for="(it, index) in localFonctions"
          :key="index"
          class="card-fonction"
          aria-hidden="false"
        >
          <div class="fonction-header">
            <span
              class="info-label"
              aria-hidden="true"
            >{{ tFonctions('card-label') }}</span>
            <div class="toggle-switch">
              <input
                v-model="it.active"
                type="checkbox"
                class="toggle-input"
                :aria-label="getToggleLabel(it)"
                @change="onToggle(it)"
                @keydown.enter.prevent="toggleFonction(it)"
                @keydown.space.prevent="toggleFonction(it)"
              >
            </div>
          </div>

          <div
            class="fonction-body"
            aria-hidden="true"
          >
            <div class="info-group">
              <span class="info-value info-value--bold">
                {{ it.struct.name }}
              </span>
              <div class="badge-container">
                <span class="badge-tag">{{ it.fonction || tGeneral('not-set') }}</span>
                <span
                  v-if="it.discipline"
                  class="badge-tag"
                >{{ it.discipline }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

.profile-card {
  @include mce-card-base;
}

.card-header {
  @include mce-card-header;
}

.card-body {
  @include mce-card-body;
}

.grid-fonctions {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (width >= map.get($grid-breakpoints, md)) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card-fonction {
  @include mce-card-base;
  display: flex;
  flex-direction: column;
}

.fonction-header {
  @include mce-sub-card;
  justify-content: space-between;
  border-radius: 0;
  border-bottom: 1px solid var(--#{$prefix}stroke);
}

.toggle-switch {
  display: inline-flex;
  align-items: center;
}

.fonction-body {
  padding: 0.75rem 1rem;
  background-color: var(--#{$prefix}basic-grey);
  flex: 1;
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.toggle-input {
  appearance: none;
  -webkit-appearance: none;
  width: 40px;
  height: 22px;
  background-color: var(--#{$prefix}stroke);
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid var(--#{$prefix}stroke);
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background-color: $white;
    box-shadow: var(--#{$prefix}shadow-low-elevation) rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  &:checked {
    background-color: var(--#{$prefix}primary);
    border-color: transparent;

    &::before {
      transform: translateX(18px);
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--#{$prefix}primary) 25%, transparent);
  }
}

.badge-container {
  @include mce-badge-container;
}

.badge-tag {
  @include mce-discipline-tag;
}
</style>
