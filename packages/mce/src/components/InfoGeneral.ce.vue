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
import type { Etabs, General, SectionEleve, SectionProf } from '@/types/generalType'
import { computed, inject } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import ClassesGroupesEleve from './ClassesGroupesEleve.ce.vue'
import ClassesGroupesProf from './ClassesGroupesProf.ce.vue'

defineOptions({ name: 'InfoGeneral' })

const props = defineProps<{
  details: General
  listFonctions: any[]
  userInfoApiUrl?: string
  listMenu: string
  mceApi: string
  parentEleve: any
  apprentis: any
  relationEleve?: any
}>()

const sectionEleve = computed<SectionEleve | undefined>(
  () => props.details?.sectionClassesGroupes?.sectionEleve,
)
const sectionProf = computed<SectionProf | undefined>(
  () => props.details?.sectionClassesGroupes?.sectionProf,
)
const etabs = computed<Array<Etabs>>(
  () => sectionEleve.value?.etabs ?? [],
)

const i18n = inject(I18nInjectionKey)
function tListMenu(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`list-onglet.${key}`) : key
}

const sectionTitle = computed(() => tListMenu(props.listMenu))

// Condition pour savoir si on a des relations parents / enfants à afficher
const hasParentEleve = computed<boolean>(() => {
  // On regarde dans parentEleve OU dans relationEleve (qui contient tes données réelles)
  const dataParent = props.parentEleve ?? []
  const dataRelation = props.relationEleve ?? []

  const hasDataParent = Array.isArray(dataParent) ? dataParent.length > 0 : Object.keys(dataParent).length > 0
  const hasDataRelation = Array.isArray(dataRelation) ? dataRelation.length > 0 : Object.keys(dataRelation).length > 0

  return hasDataParent || hasDataRelation
})

// Permet de fusionner ou de prioriser la source de données qui contient l'élève
const computedParentDetails = computed(() => {
  if (Array.isArray(props.relationEleve) && props.relationEleve.length > 0)
    return props.relationEleve
  return props.parentEleve ?? []
})

const hasSectionProf = computed<boolean>(() => {
  const etabsProf = sectionProf.value?.etabs
  return !!etabsProf && Object.keys(etabsProf).length > 0
})

const hasSectionEleve = computed<boolean>(() => {
  const hasEtabs = etabs.value.length > 0
  const hasEnseignements = (sectionEleve.value?.enseignementSuivis?.length ?? 0) > 0
  return hasEtabs || hasEnseignements
})

const hasApprentis = computed<boolean>(() => {
  if (!props.apprentis)
    return false
  if (Array.isArray(props.apprentis))
    return props.apprentis.length > 0
  return Object.keys(props.apprentis).length > 0
})
</script>

<template>
  <div class="sectionPersonnelles" role="region" aria-labelledby="info-general-title">
    <h3 id="info-general-title" class="sr-only">
      {{ sectionTitle }}
    </h3>
    <relation-user
      v-if="hasParentEleve"
      :details="computedParentDetails"
      titre="student"
      :onglet="listMenu"
      :mce-api="mceApi"
      :user-info-api-url="userInfoApiUrl"
    />

    <relation-user
      v-if="hasApprentis"
      :details="apprentis"
      titre="master"
      :onglet="listMenu"
      :mce-api="mceApi"
      :user-info-api-url="userInfoApiUrl"
    />

    <ClassesGroupesProf
      v-if="hasSectionProf"
      :section-prof="sectionProf"
      :list-fonctions="listFonctions"
      :section-eleve="sectionEleve"
    />

    <ClassesGroupesEleve
      v-else-if="hasSectionEleve"
      :etabs="etabs"
      :section-eleve="sectionEleve"
    />
  </div>
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use './mce-shared' as *;

.sectionPersonnelles {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.sr-only {
  @include mce-sr-only;
}
</style>
