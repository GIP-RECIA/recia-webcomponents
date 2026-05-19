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
import { computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import ClassesGroupesEleve from './ClassesGroupesEleve.ce.vue'
import ClassesGroupesProf from './ClassesGroupesProf.ce.vue'

defineOptions({ name: 'InfoGeneral' })

const props = defineProps<{
  details: General
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

const { t } = useI18n()
const tInfo = (key: string): string => t(`info-general.${key}`)

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
  if (Array.isArray(props.relationEleve) && props.relationEleve.length > 0) {
    return props.relationEleve
  }
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

// [DEBUG]
watchEffect(() => {
  console.warn('[DEBUG InfoGeneral] ========= DATA VERIFICATION =========')
  console.warn('[DEBUG] relationEleve reçu :', props.relationEleve)
  console.warn('[DEBUG] parentEleve reçu :', props.parentEleve)
  console.warn('[DEBUG]hasParentEleve final calculé :', hasParentEleve.value)
  console.warn('[DEBUG] Données finales envoyées au composant :', computedParentDetails.value)
})
</script>

<template>
  <div class="sectionPersonnelles">
    <!-- VERSION 1 : Parent / Responsable d'élève (Alimenté par relationEleve ou parentEleve) -->
    <relation-user
      v-if="hasParentEleve"
      :details="computedParentDetails"
      titre="student"
      :onglet="listMenu"
      :mce-api="mceApi"
      :user-info-api-url="userInfoApiUrl"
    />

    <!-- VERSION 2 : Maître d'apprentissage / Apprentis -->
    <relation-user
      v-if="hasApprentis"
      :details="apprentis"
      titre="master"
      :onglet="listMenu"
      :mce-api="mceApi"
      :user-info-api-url="userInfoApiUrl"
    />

    <!-- Reste des sections (Prof / Élève) -->
    <ClassesGroupesProf
      v-if="hasSectionProf"
      :section-prof="sectionProf"
      :label-titre="tInfo('title-classe-groupe')"
      :label-class="tInfo('class')"
      :label-group="tInfo('group')"
    />

    <ClassesGroupesEleve
      v-else-if="hasSectionEleve"
      :etabs="etabs"
      :section-eleve="sectionEleve"
      :label-titre="tInfo('title-classe-groupe')"
      :label-titre-cours="tInfo('title-courses')"
      :label-class="tInfo('class')"
      :label-group="tInfo('group')"
    />
  </div>
</template>

<style lang="scss">
</style>
