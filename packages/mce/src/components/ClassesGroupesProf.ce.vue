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

// Matières déjà affichées dans les blocs sectionProf
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
    // ignore les disciplines déjà affichées
    if (disciplinesDansSections.value.has(f.discipline))
      return false

    const classes = getFonctionClasses(f)
    const groupes = getFonctionGroupes(f)

    // afficher uniquement si il y a au moins une classe ou un groupe
    return classes.length > 0 || groupes.length > 0
  })
})

// Index sectionEleve.etabs par nameEtab pour retrouver les groupes/classes d'un élève via le nom de l'étab
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

// Croise les groupes/classes depuis sectionEleve en cherchant par nom d'étab
function getEleveCgForFonction(f: any): { classes: string[], groupes: string[] } {
  const nomEtab = f.struct?.name ?? ''
  return eleveEtabsByName.value.get(nomEtab) ?? { classes: [], groupes: [] }
}

// Récupère les classes d'une fonction : priorité f.classes > f.cg?.classes > sectionEleve
function getFonctionClasses(f: any): string[] {
  if (f.classes?.length)
    return f.classes
  if (f.cg?.classes?.length)
    return f.cg.classes
  return getEleveCgForFonction(f).classes
}

// Récupère les groupes d'une fonction : priorité f.groupes > f.cg?.groupes > sectionEleve
function getFonctionGroupes(f: any): string[] {
  if (f.groupes?.length)
    return f.groupes
  if (f.cg?.groupes?.length)
    return f.cg.groupes
  return getEleveCgForFonction(f).groupes
}

function getMatiere(item: any) {
  return item.matiere ? item.matiere : (item.discipline || tProf('discipline-unknown'))
}
</script>

<template>
  <section class="page-container">
    <div class="profile-card">
      <header class="card-header clickable-header" @click="isOpen = !isOpen">
        <h2>{{ tGeneral('title-classe-groupe') }}</h2>
        <span class="collapse-icon">{{ isOpen ? '-' : '+' }}</span>
      </header>

      <div v-if="!sectionProf && listFonctions.length === 0" class="card-body-grid">
        <span class="info-value">{{ tProf('no-data') }}</span>
      </div>

      <div v-else-if="isOpen" class="card-body-grid">
        <!-- Blocs sectionProf (EPS, etc.) -->
        <template v-for="([nomEtab, listeItems]) in sections" :key="nomEtab">
          <div class="etab-block">
            <div class="etab-info-side">
              <span class="info-label">{{ tProf('etablissement') }}</span>
              <div class="info-value name-bold">
                {{ nomEtab }}
              </div>
            </div>

            <div class="teachings-list">
              <div v-for="(item, indexItem) in listeItems" :key="indexItem" class="teaching-entry">
                <div class="info-item">
                  <span class="info-label">{{ tProf('discipline') }}</span>
                  <span class="info-value name-bold">{{ getMatiere(item) }}</span>
                </div>

                <div class="badges-row">
                  <span v-for="c in item.cg?.classes" :key="c" class="pill-tag pill-class">{{ c }}</span>
                  <span v-for="g in item.cg?.groupes" :key="g" class="pill-tag pill-group">{{ g }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Fonctions restantes (ex : Espagnol) — même design que les blocs du haut -->
        <template v-if="fonctionsRestantes.length > 0">
          <div
            v-for="f in fonctionsRestantes"
            :key="f.idFonction"
            class="etab-block"
          >
            <div class="etab-info-side">
              <span class="info-label">{{ tProf('etablissement') }}</span>
              <div class="info-value name-bold">
                {{ f.struct?.name || 'N/A' }}
              </div>
            </div>

            <div class="teachings-list">
              <div class="teaching-entry">
                <div class="info-item">
                  <span class="info-label">{{ tProf('discipline') }}</span>
                  <span class="info-value name-bold">{{ f.discipline }}</span>
                </div>

                <div
                  v-if="getFonctionClasses(f).length > 0 || getFonctionGroupes(f).length > 0"
                  class="badges-row"
                >
                  <span
                    v-for="c in getFonctionClasses(f)"
                    :key="c"
                    class="pill-tag pill-class"
                  >{{ c }}</span>
                  <span
                    v-for="g in getFonctionGroupes(f)"
                    :key="g"
                    class="pill-tag pill-group"
                  >{{ g }}</span>
                </div>
              </div>
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

.page-container {
  //@media (max-width: 576px) {
  //  padding: 0 0.5rem;
  //}
}

.profile-card {
  background: var(--#{$prefix}body-bg, #ffffff);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.1));
  overflow: hidden;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--#{$prefix}border-color, #dee2e6);

  h2 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--#{$prefix}body-color, #212529);
  }
}

.card-body-grid {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    padding: 1rem;
  }
}

.etab-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--#{$prefix}border-color, #eee);
  gap: 2rem;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem 0;
  }
}

.etab-info-side {
  flex: 0 0 35%;
  @media (max-width: 768px) {
    flex: 0 0 30%;
  }
  @media (max-width: 576px) {
    flex: none;
    width: 100%;
  }
}

.teachings-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 576px) {
    width: 100%;
  }
}

.teaching-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--#{$prefix}tertiary-bg, #f8f9fa);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--#{$prefix}border-color, #eee);
  gap: 0.75rem;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

.info-item {
  @media (max-width: 576px) {
    width: 100%;
  }
}

.info-label {
  display: block;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--#{$prefix}secondary-color, #6c757d);
  margin-bottom: 4px;
}

.info-value {
  font-size: 0.95rem;
  color: var(--#{$prefix}body-color, #212529);

  &.name-bold {
    font-weight: 600;
  }
  @media (max-width: 576px) {
    font-size: 0.875rem;
  }
}

.badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
  @media (max-width: 576px) {
    justify-content: flex-start;
    width: 100%;
  }
}

.pill-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;

  &.pill-class {
    background: var(--#{$prefix}primary-bg-subtle, #e7f1ff);
    color: var(--#{$prefix}primary-text-emphasis, #084298);
  }

  &.pill-group {
    background: var(--#{$prefix}success-bg-subtle, #d1e7dd);
    color: var(--#{$prefix}success-text-emphasis, #0a3622);
  }
}

.clickable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
}

.collapse-icon {
  font-size: 1.2rem;
  font-weight: 700;
}
</style>
