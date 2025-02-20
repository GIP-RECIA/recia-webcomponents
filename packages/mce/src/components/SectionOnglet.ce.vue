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
defineOptions({ name: 'SectionOnglet' })

defineProps<{
  mceApi: string
  listMenu: string
  userInfoApiUrl: string
  fonctionClassesGroupe: any
  parentEleve: any
  relationEleve: any
  apprentis: any
  services: Array<string>
  etabCurrent: string
}>()

const emit = defineEmits(['open-modal'])

function openModal(event: CustomEvent): void {
  const isModalOpen = true
  const personDetail = event.detail[0]
  emit('open-modal', isModalOpen, personDetail)
}
</script>

<template>
  <div v-if="listMenu === 'GENERALE'">
    <info-general
      :details="fonctionClassesGroupe"
      titre-cls-grp="Mes classes et groupes pédagogiques"
      titre-ens="Enseignements suivis"
    />
  </div>

  <div v-else-if="listMenu === 'PARENT_ELEVE'">
    <relation-user
      :details="parentEleve"
      titre="Personne en rélation avec moi"
      :onglet="listMenu"
    />
  </div>

  <div v-else-if="listMenu === 'RELATION_ELEVE'">
    <relation-user
      :mce-api="mceApi"
      :user-info-api-url="userInfoApiUrl"
      :details="relationEleve"
      titre="Les élèves de mes relations."
      :onglet="listMenu"
      @open-modal="openModal"
    />
  </div>

  <div v-else-if="listMenu === 'APPRENTIS'">
    <relation-user
      :mce-api="mceApi"
      :user-info-api-url="userInfoApiUrl"
      :details="apprentis"
      titre="Mes apprentis"
      :onglet="listMenu"
    />
  </div>

  <div v-else-if="listMenu === 'SERVICE'">
    <services-ent
      :details="services"
      :etab="etabCurrent"
      :onglet="listMenu"
    />
  </div>
</template>
