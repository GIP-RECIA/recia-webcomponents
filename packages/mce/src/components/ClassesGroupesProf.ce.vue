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
import type { SectionEleve, SectionProf } from '@/types/generalType'
import { computed, inject, ref } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'

defineOptions({ name: 'ClassesGroupesProf' })

const props = defineProps<{
  sectionProf: SectionProf | undefined
  listFonctions: any[]
  sectionEleve: SectionEleve | undefined
}>()

const i18n = inject(I18nInjectionKey)
function tProf(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`classes-groupes-prof.${key}`) : key
}
function tGeneral(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`info-general.${key}`) : key
}

const isOpen = ref(true)

const sections = computed(() => {
  return props.sectionProf?.etabs ? Object.entries(props.sectionProf.etabs) : []
})

const disciplinesDansSections = computed(() => {
  const matieres = new Set<string>()
  sections.value.forEach(([_, etabs]) => {
    etabs.forEach((item: any) => {
      if (item.matiere)
        matieres.add(item.matiere)
    })
  })
  return matieres
})

const fonctionsRestantes = computed(() => {
  return props.listFonctions.filter((f) => {
    if (disciplinesDansSections.value.has(f.discipline))
      return false
    const classes = getFonctionClasses(f)
    const groupes = getFonctionGroupes(f)
    return classes.length > 0 || groupes.length > 0
  })
})

const eleveEtabsByName = computed(() => {
  const map = new Map<string, { classes: string[], groupes: string[] }>()
  props.sectionEleve?.etabs?.forEach((etab: any) => {
    map.set(etab.nameEtab, {
      classes: etab.classes ?? [],
      groupes: etab.groupes ?? [],
    })
  })
  return map
})

function getEleveCgForFonction(f: any): { classes: string[], groupes: string[] } {
  const nomEtab = f.struct?.name ?? ''
  return eleveEtabsByName.value.get(nomEtab) ?? { classes: [], groupes: [] }
}

function getFonctionClasses(f: any): string[] {
  if (f.classes?.length)
    return f.classes
  if (f.cg?.classes?.length)
    return f.cg.classes
  return getEleveCgForFonction(f).classes
}

function getFonctionGroupes(f: any): string[] {
  if (f.groupes?.length)
    return f.groupes
  if (f.cg?.groupes?.length)
    return f.cg.groupes
  return getEleveCgForFonction(f).groupes
}

function getSectionClasses(item: any, nomEtab: string): string[] {
  if (item.classes?.length)
    return item.classes
  if (item.cg?.classes?.length)
    return item.cg.classes
  return eleveEtabsByName.value.get(nomEtab)?.classes ?? []
}

function getSectionGroupes(item: any, nomEtab: string): string[] {
  if (item.groupes?.length)
    return item.groupes
  if (item.cg?.groupes?.length)
    return item.cg.groupes
  return eleveEtabsByName.value.get(nomEtab)?.groupes ?? []
}

function getMatiere(item: any) {
  return item.matiere ? item.matiere : (item.discipline || tProf('discipline-unknown'))
}
</script>

<template>
  <section class="profile-card">
    <header class="card-header clickable-header" @click="isOpen = !isOpen">
      <h3>{{ tGeneral('title-classe-groupe') }}</h3>
      <span class="collapse-icon">{{ isOpen ? '-' : '+' }}</span>
    </header>

    <div v-if="!sectionProf && listFonctions.length === 0" class="card-body">
      <span class="info-value">{{ tProf('no-data') }}</span>
    </div>

    <div v-else-if="isOpen" class="card-body">
      <!-- Blocs sectionProf -->
      <template v-for="([nomEtab, listeItems]) in sections" :key="nomEtab">
        <div class="etab-block">
          <div class="etab-info-side">
            <span class="info-label">{{ tProf('etablissement') }}</span>
            <div class="info-value info-value--bold">
              {{ nomEtab }}
            </div>
          </div>

          <div class="teachings-list">
            <div v-for="(item, indexItem) in listeItems" :key="indexItem" class="teaching-entry">
              <div class="info-item">
                <span class="info-label">{{ tProf('discipline') }}</span>
                <span class="info-value info-value--bold">{{ getMatiere(item) }}</span>
              </div>

              <div class="badges-row">
                <span v-for="c in getSectionClasses(item, nomEtab)" :key="c" class="pill-tag pill-tag--class">{{ c }}</span>
                <span v-for="g in getSectionGroupes(item, nomEtab)" :key="g" class="pill-tag pill-tag--group">{{ g }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Fonctions restantes -->
      <template v-if="fonctionsRestantes.length > 0">
        <div
          v-for="f in fonctionsRestantes"
          :key="f.idFonction"
          class="etab-block"
        >
          <div class="etab-info-side">
            <span class="info-label">{{ tProf('etablissement') }}</span>
            <div class="info-value info-value--bold">
              {{ f.struct?.name || 'N/A' }}
            </div>
          </div>

          <div class="teachings-list">
            <div class="teaching-entry">
              <div class="info-item">
                <span class="info-label">{{ tProf('discipline') }}</span>
                <span class="info-value info-value--bold">{{ f.discipline }}</span>
              </div>

              <div
                v-if="getFonctionClasses(f).length > 0 || getFonctionGroupes(f).length > 0"
                class="badges-row"
              >
                <span
                  v-for="c in getFonctionClasses(f)"
                  :key="c"
                  class="pill-tag pill-tag--class"
                >{{ c }}</span>
                <span
                  v-for="g in getFonctionGroupes(f)"
                  :key="g"
                  class="pill-tag pill-tag--group"
                >{{ g }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
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
  box-shadow: var(--#{$prefix}shadow-neutral) rgba(0, 0, 0, 0.1);
  overflow: hidden;
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

.clickable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: var(--#{$prefix}hover);
  }
}

.collapse-icon {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--#{$prefix}basic-black-lighter);
}

.card-body {
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;

  @media (width < map.get($grid-breakpoints, sm)) {
    padding: 1rem;
  }
}

.etab-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--#{$prefix}stroke);
  gap: 2rem;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (width < map.get($grid-breakpoints, md)) {
    gap: 1rem;
  }

  @media (width < map.get($grid-breakpoints, sm)) {
    flex-direction: column;
    gap: 0.75rem;
  }
}

.etab-info-side {
  flex: 0 0 35%;

  @media (width < map.get($grid-breakpoints, md)) {
    flex: 0 0 30%;
  }

  @media (width < map.get($grid-breakpoints, sm)) {
    flex: none;
    width: 100%;
  }
}

.teachings-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.teaching-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--#{$prefix}hover);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--#{$prefix}stroke);
  gap: 0.75rem;

  @media (width < map.get($grid-breakpoints, sm)) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
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

.badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;

  @media (width < map.get($grid-breakpoints, sm)) {
    justify-content: flex-start;
  }
}

.pill-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: var(--#{$prefix}font-size-xs);
  font-weight: 700;

  &--class {
    background-color: var(--#{$prefix}primary);
    color: var(--#{$prefix}body-inverted);
  }

  &--group {
    background-color: var(--#{$prefix}basic-grey);
    color: var(--#{$prefix}basic-black);
    border: 1px solid var(--#{$prefix}stroke);
  }
}
</style>
