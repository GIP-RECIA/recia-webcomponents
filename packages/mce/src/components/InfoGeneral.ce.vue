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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ClassesGroupesEleve from './ClassesGroupesEleve.ce.vue'
import ClassesGroupesProf from './ClassesGroupesProf.ce.vue'

defineOptions({ name: 'InfoGeneral' })

const props = defineProps<{
  details: General
  userInfoApiUrl?: string
  listMenu: string
  mceApi: string
  parentEleve: PersonneRelation
}>()

interface PersonneRelation {
  [key: string]: unknown
}

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

// parentEleve affiché si au moins une valeur non vide
const hasParentEleve = computed<boolean>(() =>
  Object.values(props.parentEleve ?? {}).some(v => v !== null && v !== undefined && v !== ''),
)

// sectionProf affiché si etabs contient au moins une entrée avec des enseignements
const hasSectionProf = computed<boolean>(() => {
  const etabsProf = sectionProf.value?.etabs
  return !!etabsProf && Object.keys(etabsProf).length > 0
})

// sectionEleve affiché si au moins un établissement ou un enseignement suivi
const hasSectionEleve = computed<boolean>(() => {
  const hasEtabs = etabs.value.length > 0
  const hasEnseignements = (sectionEleve.value?.enseignementSuivis?.length ?? 0) > 0
  return hasEtabs || hasEnseignements
})
</script>

<template>
  <div class="sectionPersonnelles">
    <relation-user
      v-if="hasParentEleve"
      :details="parentEleve"
      titre="student"
      :onglet="listMenu"
      :mce-api="mceApi"
      :user-info-api-url="userInfoApiUrl"
    />

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
