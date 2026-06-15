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

const isOpen = ref(true)

const headerId = 'classes-groupes-prof-title'
const bodyId = 'classes-groupes-prof-body'

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

const collapseButtonLabel = computed(() => {
  return isOpen.value ? tProf('collapse-close') : tProf('collapse-open')
})

function toggleOpen() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <section class="profile-card" tabindex="0" aria-labelledby="classes-groupes-prof-heading">
    <!-- En-tête cliquable : titre et bouton pour plier/déplier -->
    <div class="card-header">
      <h3 id="classes-groupes-prof-heading" class="collapse-title">
        {{ tGeneral('title-classe-groupe') }}
      </h3>
      <button
        :id="headerId"
        type="button"
        class="btn-primary small"
        :aria-expanded="isOpen"
        :aria-controls="bodyId"
        :aria-label="collapseButtonLabel"
        :title="collapseButtonLabel"
        @click="toggleOpen"
      >
        <span aria-hidden="true">{{ isOpen ? '-' : '+' }}</span>
      </button>
    </div>

    <!-- Aucune donnée -->
    <div v-if="hasNoData" class="card-body">
      <p class="info-value">
        {{ tProf('no-data') }}
      </p>
    </div>

    <!-- Contenu dépliable -->
    <div
      v-else
      v-show="isOpen"
      :id="bodyId"
      class="card-body"
    >
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
            <div
              v-for="(item, indexItem) in listeItems"
              :key="indexItem"
              class="teaching-entry"
            >
              <dl class="info-item">
                <dt class="info-label">
                  {{ tProf('discipline') }}
                </dt>
                <dd class="info-value info-value--bold">
                  {{ getMatiere(item) }}
                </dd>
              </dl>

              <ul
                v-if="getSectionClasses(item, nomEtab).length || getSectionGroupes(item, nomEtab).length"
                class="badges-row"
                :aria-label="`${tProf('discipline')} ${getMatiere(item)} — ${tGeneral('class')} / ${tGeneral('group')}`"
              >
                <li
                  v-for="c in getSectionClasses(item, nomEtab)"
                  :key="c"
                  class="pill-tag pill-tag--class"
                >
                  {{ c }}
                </li>
                <li
                  v-for="g in getSectionGroupes(item, nomEtab)"
                  :key="g"
                  class="pill-tag pill-tag--group"
                >
                  {{ g }}
                </li>
              </ul>
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
                <span :id="`discipline-label-fn-${f.idFonction}`" class="info-label">
                  {{ tProf('discipline') }}
                </span>
                <span
                  class="info-value info-value--bold"
                  :aria-labelledby="`discipline-label-fn-${f.idFonction}`"
                >
                  {{ f.discipline }}
                </span>
              </div>

              <ul
                v-if="getFonctionClasses(f).length > 0 || getFonctionGroupes(f).length > 0"
                class="badges-row"
                :aria-label="`${tProf('discipline')} ${f.discipline} — ${tGeneral('class')} / ${tGeneral('group')}`"
              >
                <li
                  v-for="c in getFonctionClasses(f)"
                  :key="c"
                  class="pill-tag pill-tag--class"
                >
                  {{ c }}
                </li>
                <li
                  v-for="g in getFonctionGroupes(f)"
                  :key="g"
                  class="pill-tag pill-tag--group"
                >
                  {{ g }}
                </li>
              </ul>
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
@use './mce-shared' as *;

.profile-card {
  @include mce-card-base;
}

.card-header {
  @include mce-card-header;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.collapse-title {
}

.collapse-btn {
}

.collapse-icon {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--#{$prefix}body-inverted);
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
}

.card-body {
  @include mce-card-body;

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

// Reset liste pour les badges classes/groupes
.badges-row {
  @include mce-tags-list;
  justify-content: flex-end;

  @media (width < map.get($grid-breakpoints, sm)) {
    justify-content: flex-start;
  }
}

.pill-tag {
  @include mce-pill-tag(
    0.25rem 0.75rem,
    6px,
    var(--#{$prefix}font-size-xs),
    var(--#{$prefix}basic-black),
    transparent,
    none
  );
  font-weight: 700;

  &--class {
    @include mce-pill-class;
  }

  &--group {
    @include mce-pill-group;
  }
}
</style>
