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
import { computed, inject } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'

defineOptions({ name: 'ClassesGroupesProf' })

const props = withDefaults(defineProps<{
  sectionProf?: SectionProf
  listFonctions?: any[]
  sectionEleve?: SectionEleve
}>(), {
  sectionProf: undefined,
  listFonctions: () => [],
  sectionEleve: undefined,
})

const i18n = inject(I18nInjectionKey)
function tProf(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`classes-groupes-prof.${key}`) : key
}
function tGeneral(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`info-general.${key}`) : key
}

const sections = computed(() => {
  return props.sectionProf?.etabs ? Object.entries(props.sectionProf.etabs) : []
})

const disciplinesDansSections = computed(() => {
  const matieres = new Set<string>()
  sections.value.forEach(([_, etabs]) => {
    etabs.forEach((item: any) => {
      const discipline = item.matiere ?? item.discipline
      if (discipline)
        matieres.add(discipline)
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
  return item?.matiere || item?.discipline || tProf('discipline-unknown')
}

const hasNoData = computed(() => {
  const hasProfEtab = props.sectionProf?.etabs && Object.keys(props.sectionProf.etabs).length > 0
  return !hasProfEtab && props.listFonctions.length === 0
})
</script>

<template>
  <div class="card-wrapper">
    <section
      class="profile-card"
      aria-labelledby="classes-groupes-prof-heading"
    >
      <div class="card-header">
        <h3
          id="classes-groupes-prof-heading"
          class="collapse-title"
          tabindex="0"
        >
          {{ tGeneral('title-classe-groupe') }}
        </h3>
      </div>

      <!-- Aucune donnée -->
      <div
        v-if="hasNoData"
        class="card-body"
      >
        <p class="info-value">
          {{ tProf('no-data') }}
        </p>
      </div>

      <!-- Contenu -->
      <div
        v-else
        class="card-body"
      >
        <!-- Blocs sectionProf -->
        <template
          v-for="([nomEtab, listeItems]) in sections"
          :key="nomEtab"
        >
          <div class="etab-block">
            <div class="etab-info-side">
              <span class="info-label">{{ tProf('etablissement') }}</span>
              <div class="info-value info-value--bold">
                {{ nomEtab }}
              </div>
            </div>

            <div class="teachings-list">
              <div
                v-for="(item, indexItem) in listeItems"
                :key="indexItem"
                class="teaching-entry"
              >
                <div class="info-item">
                  <span class="info-label">{{ tProf('discipline') }}</span>
                  <span class="info-value info-value--bold">{{ getMatiere(item) }}</span>
                </div>

                <div
                  v-if="getSectionClasses(item, nomEtab).length || getSectionGroupes(item, nomEtab).length"
                  class="badge-row"
                  role="none"
                >
                  <span
                    v-for="c in getSectionClasses(item, nomEtab)"
                    :key="c"
                    class="badge-tag"
                  >{{ c }}</span>
                  <span
                    v-for="g in getSectionGroupes(item, nomEtab)"
                    :key="g"
                    class="badge-tag"
                  >{{ g }}</span>
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
                {{ f.struct?.name || tProf('not-available') }}
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
                  class="badge-row"
                  role="none"
                >
                  <span
                    v-for="c in getFonctionClasses(f)"
                    :key="c"
                    class="badge-tag"
                  >{{ c }}</span>
                  <span
                    v-for="g in getFonctionGroupes(f)"
                    :key="g"
                    class="badge-tag"
                  >{{ g }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use '../assets/mce-shared' as *;

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

  @media (width < map.get($grid-breakpoints, sm)) {
    padding: 1rem;
  }
}

.etab-block {
  @include mce-row-separator;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

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
  @include mce-sub-card;
  justify-content: space-between;

  @media (width < map.get($grid-breakpoints, sm)) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.info-item {
  @include mce-info-item;
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

.badge-row {
  @include mce-tags-list;
  justify-content: flex-end;

  @media (width < map.get($grid-breakpoints, sm)) {
    justify-content: flex-start;
  }
}

.badge-tag {
  @include mce-discipline-tag;
}
</style>
