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
import { inject } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import { updateFonctionDateFin } from '@/services/serviceMce.ts'

defineOptions({ name: 'FonctionsList' })

const props = defineProps<{
  fonctions: Array<PersonneFonction>
  userInfoApiUrl: string
  mceApi: string
}>()

const i18n = inject(I18nInjectionKey)
function tFonctions(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`fonctions-list.${key}`) : key
}
function tGeneral(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`info-general.${key}`) : key
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
    // eslint-disable-next-line e18e/prefer-static-regex
    const baseUrl = props.mceApi.replace(/\/mce\/?$/, '')
    const fullUrl = `${baseUrl}/fonction/${id}/dateFin`
    await updateFonctionDateFin(fullUrl, newValue, props.userInfoApiUrl)
  }
  catch (e) {
    console.error(e)
    it.active = previous
  }
}
</script>

<template>
  <div v-if="fonctions?.length" class="section-fonction">
    <div class="heading-titre">
      <h2 class="titre">
        {{ tGeneral('title-fonction') }}
      </h2>
    </div>

    <div class="grid-fonctions">
      <div v-for="(it, index) in fonctions" :key="index" class="card-fonction">
        <div class="card-header">
          <span class="card-label">{{ tFonctions('card-label') }}</span>
          <input
            v-model="it.active"
            type="checkbox"
            class="toggle-input"
            @change="onToggle(it)"
          >
        </div>

        <div class="card-content">
          <div class="info-group">
            <span class="struct-name">{{ it.struct.name }} <small>({{ it.struct.type }})</small></span>
            <div class="badge-container">
              <span class="fonction-tag">{{ it.fonction || '-' }}</span>
              <span v-if="it.discipline" class="discipline-tag">{{ it.discipline }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.section-fonction {
  padding: 0.75rem;

  .heading-titre {
    margin-bottom: 1rem;

    .titre {
      margin: 0;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      color: var(--#{$prefix}secondary-color, #6c757d);
    }
  }
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
  background-color: var(--#{$prefix}body-bg, #ffffff);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  box-shadow: 0 4px 12px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.05));
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--#{$prefix}border-color, #dee2e6);
    padding-bottom: 0.5rem;

    .card-label {
      font-weight: 800;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--#{$prefix}secondary-color, #6c757d);
    }
  }

  .card-content {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    border-radius: 8px;
    padding: 0.75rem;
    border: 1px solid var(--#{$prefix}border-color, #dee2e6);

    .info-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .struct-name {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.8rem;
        color: var(--#{$prefix}body-color, #212529);

        small {
          font-weight: 400;
          text-transform: none;
          color: var(--#{$prefix}secondary-color, #6c757d);
        }
      }
    }
  }
}

.toggle-input {
  appearance: none;
  -webkit-appearance: none;
  width: 40px;
  height: 22px;
  background-color: var(--#{$prefix}secondary-bg, #ced4da);
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
  outline: none;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50px;
    top: 2px;
    left: 2px;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  &:checked {
    background-color: var(--#{$prefix}primary, #0056b3);
    border-color: transparent;

    &::before {
      transform: translateX(18px);
    }
  }

  &:focus {
    box-shadow: 0 0 0 3px var(--#{$prefix}primary-focus, rgba(0, 86, 179, 0.25));
  }
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.fonction-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--#{$prefix}body-color, #212529);
}

.discipline-tag {
  background-color: var(--#{$prefix}primary-bg, #e7f1ff);
  color: var(--#{$prefix}primary, #0056b3);
  border: 1px solid var(--#{$prefix}primary-border-subtle, #b6d4fe);
  padding: 0.2rem 0.6rem;
  border-radius: var(--#{$prefix}border-radius, 6px);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
}

@media (width <= 320px) {
  .section-fonction {
    padding: 0.5rem;
  }
  .card-fonction {
    padding: 0.75rem;
    border-radius: 8px;

    .card-content {
      padding: 0.5rem;
    }
  }
}
</style>
