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
import { computed, inject, ref, watchEffect } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import { getContentOnglet } from '@/services/serviceMce'
import ClassesGroupesEleve from './ClassesGroupesEleve.ce.vue'
import ClassesGroupesProf from './ClassesGroupesProf.ce.vue'
import RelationUser from './RelationUser.ce.vue'

defineOptions({ name: 'OngletContent' })

const props = defineProps<{
  mceApi: string
  listMenu: string
  userInfoApiUrl: string
}>()

const i18n = inject(I18nInjectionKey)
function t(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`onglet-content.${key}`) : key
}

const details = ref<any>([])
const fonctions = ref<any>([])
const sectionProf = ref<any>([])
const sectionEleve = ref<any>([])

watchEffect((): void => {
  void (async () => {
    await fetchDetailOnglet(props.listMenu)
  })()
})

async function fetchDetailOnglet(name: string) {
  if (name !== '') {
    try {
      const response = await getContentOnglet(props.mceApi + name, props.userInfoApiUrl)
      details.value = response.data

      if (
        details.value.sectionClassesGroupes !== undefined
        && details.value.listFonctions !== undefined
      ) {
        fonctions.value = details.value.listFonctions
        sectionProf.value = details.value.sectionClassesGroupes.sectionProf
        sectionEleve.value = details.value.sectionClassesGroupes.sectionEleve
      }
    }
    catch (error) {
      console.error('error: ', error)
    }
  }
}

const isProfSectionActive = computed<boolean>(() => {
  if (sectionEleve.value?.etabs?.length && sectionEleve.value !== undefined) {
    return false
  }
  return true
})
</script>

<template>
  <div class="content-wrapper">
    <section v-if="fonctions.length" class="profile-card">
      <header class="card-header">
        <h2>{{ t('mes-fonctions') }}</h2>
      </header>

      <div class="card-body-grid">
        <div v-for="(it, index) in fonctions" :key="index" class="fonction-row-item">
          <div class="info-item">
            <span class="info-label">{{ t('etab-siren') }}</span>
            <span class="info-value name-bold">{{ it.siren }}</span>
          </div>

          <div class="info-item">
            <span class="info-label">{{ t('fonction') }}</span>
            <span class="info-value">{{ it.fonction }}</span>
          </div>

          <div class="info-item">
            <span class="info-label">{{ t('discipline') }}</span>
            <span class="info-value">{{ it.discipline || '—' }}</span>
          </div>

          <div class="info-item checkbox-container">
            <span class="info-label">{{ t('active') }}</span>
            <div class="checkbox-wrapper">
              <input
                :id="`chk-${index}-${it.discipline}`"
                type="checkbox"
                disabled
                :checked="it.active"
                class="custom-disabled-checkbox"
              >
              <label :for="`chk-${index}-${it.discipline}`" class="visually-hidden">
                {{ t('active-label') }} {{ it.discipline }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <template v-if="props.listMenu !== 'PARENT_ELEVE'">
      <!-- Vue Enseignant -->
      <ClassesGroupesProf
        v-if="isProfSectionActive && (sectionProf.length || Object.keys(sectionProf).length)"
        :section-prof="sectionProf"
        :list-fonctions="fonctions"
      />
      <ClassesGroupesEleve
        v-else-if="sectionEleve?.etabs?.length"
        :etabs="sectionEleve.etabs"
        :section-eleve="sectionEleve"
      />
    </template>

    <RelationUser
      v-if="props.listMenu === 'PARENT_ELEVE' && details.length"
      :details="details"
      :mce-api="props.mceApi"
      :user-info-api-url="props.userInfoApiUrl"
      titre="parent"
      onglet="PARENT_ELEVE"
    />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
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
    font-weight: 700;
    color: var(--#{$prefix}body-color, #212529);
    text-transform: none;
    letter-spacing: normal;
  }
}

.card-body-grid {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (width >= map.get($grid-breakpoints, md)) {
    padding: 1.5rem 2rem 2rem;
  }
}

.fonction-row-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 0.25rem;
  border-top: 1px dashed var(--#{$prefix}border-color, #dee2e6);
  padding-top: 1.25rem;

  &:first-of-type {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }

  @media (width >= map.get($grid-breakpoints, sm)) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width >= map.get($grid-breakpoints, md)) {
    grid-template-columns: 1.5fr 1.5fr 1fr 60px;
    column-gap: 2rem;
    align-items: center;
  }
}

.info-item {
  display: flex;
  flex-direction: column;

  &.checkbox-container {
    @media (width >= map.get($grid-breakpoints, md)) {
      align-items: center;
    }
  }
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

.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  height: 24px;
}

.custom-disabled-checkbox {
  width: 1.15rem;
  height: 1.15rem;
  accent-color: var(--#{$prefix}primary, #0056b3);
  cursor: not-allowed;
  border-radius: 4px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
