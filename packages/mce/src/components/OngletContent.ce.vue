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
import { getContentOnglet } from '@/services/serviceMce'
import { ref, watchEffect, computed } from 'vue'

const props = defineProps<{
  mceApi: string
  listMenu: string
  userInfoApiUrl: string
}>()

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
  if (name != '') {
    try {
      console.log('mceApi: ', props.mceApi)
      const response = await getContentOnglet(props.mceApi + name, props.userInfoApiUrl)
      details.value = response.data

      if (
        details.value.sectionClassesGroupes != undefined &&
        details.value.listFonctions != undefined
      ) {
        fonctions.value = details.value.listFonctions

        sectionProf.value = details.value.sectionClassesGroupes.sectionProf
        sectionEleve.value = details.value.sectionClassesGroupes.sectionEleve
      }
    } catch (error) {
      console.error('error: ', error)
    }
  }
}

const ongletActive = computed<boolean>(() => {
  if (sectionEleve.value.etabs.length && sectionEleve.value != undefined) {
    return false
  }

  return true
})

</script>
<template>
  <div class="content">
    <!-- Mes fonctions prof uniquement section -->
    <div v-if="fonctions.length" class="sectionFonction">
      <dl data-title="Mes fonctions">
        <!-- Table header for "My fonctions" -->
        <dt class="dl-header">Établissement</dt>
        <dt class="dl-header">Fonction</dt>
        <dt class="dl-header">Discipline</dt>
        <dt class="dl-header">Activé</dt>

        <!-- Data rows -->
        <template v-for="(it, index) in fonctions" :key="index">
          <dd>{{ it.siren }}</dd>
          <dd>{{ it.fonction }}</dd>
          <dd>{{ it.discipline }}</dd>
          <dd>
            <input
              type="checkbox"
              name=""
              :id="it.discipline"
              :value="it.discipline"
              :checked="it.active"
            />
          </dd>
        </template>
      </dl>
    </div>

    <!-- Mes classes et groupes pédago prof section -->
    <div v-if="ongletActive" class="sectionCG">
      <dl data-title="Mes classes et groupes pédagoqiues">
        <!-- Table header for "My classes and groups" -->
        <dt class="dl-header">Établissement</dt>
        <dt class="dl-header">Enseignement</dt>
        <dt class="dl-header">Classes</dt>
        <dt class="dl-header">Groups</dt>

        <!-- Data rows -->
        <template v-for="(classgroup, index) in sectionProf.etabs" :key="index">
          <!-- First item row -->
          <dd>{{ index }}</dd>

          <template v-for="item in classgroup" :key="item">
            <dd>{{ item.matiere }}</dd>
            <dd v-for="classe in item.cg.classes" :key="classe">{{ classe || '-' }}</dd>
            <dd v-for="groupe in item.cg.groupes" :key="groupe">{{ groupe || '-' }}</dd>
          </template>
        </template>
      </dl>
    </div>

    <!-- Mes classes et groupes pédago elève section -->
    <div v-else class="sectionCG_Eleve">
      <dl data-title="Mes classes et groupes pédagoqiues">
        <!-- Table header for "My classes and groups" -->
        <dt class="dl-header">Établissement</dt>
        <dt class="dl-header">Classes</dt>
        <dt class="dl-header">Groups</dt>

        <!-- Data rows -->
        <template v-for="(classgroup, index) in sectionEleve.etabs" :key="index">
          <!-- First item row -->
          <dd>{{ classgroup.nameEtab }}</dd>
          <dd>{{ classgroup.classes[0] }}</dd>
          <dd>{{ classgroup.groupes[0] }}</dd>
        </template>
      </dl>

      <dl>
        <dt>Enseignement suivis</dt>
        <template v-for="(ens, index) in sectionEleve.enseignementSuivis" :key="index">
          <dd>{{ ens }}</dd>
        </template>
      </dl>
    </div>

    <!-- Mes responsable section -->
    <div v-if="props.listMenu == 'PARENT_ELEVE'" class="section_eleve">
      <span>Personne en relation avec moi</span>
      <dl>
        <dt class="dl-header">Nom</dt>
        <dt class="dl-header">Relation</dt>
        <dt></dt>

        <template v-for="(val, index) in details" :key="index">
          <dd>{{ val.displayNameRelation }}</dd>
          <dd>{{ val.typeRelation }}</dd>
          <dd>{{ val.autoriteParental }}</dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<style lang="css">
/* General layout for the sections */
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow:
    0 1px 2px #0000001f,
    0 1px 2px #0000001f;
}

.sectionFonction dl,
.sectionCG dl,
.sectionCG_Eleve dl,
.section_eleve dl {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 3 columns for "My fonctions" */
  gap: 5px;
}

.sectionCG dl {
  grid-template-columns: repeat(4, 1fr); /* 4 columns for "My classes and groups" */
}

.sectionCG_Eleve dl {
  grid-template-columns: repeat(3, 1fr); /* 4 columns for "My classes and groups" */
}

.section_eleve dl {
  grid-template-columns: repeat(3, 1fr); /* 3 columns for "My classes and groups" */
}

/* Styling for headers */
.sectionFonction dl::before,
.sectionCG dl::before,
.sectionCG_Eleve dl::before,
.section_eleve dl::before {
  /* content: attr(data-title); */
  font-weight: bold;
  font-size: 1.5em;
  display: block;
  margin-bottom: 10px;
}

/* Ensuring dt acts like table headers */
dt {
  font-weight: bold;
  grid-column: span 1;
}

/* dd (content cells) align with dt */
dd {
  margin: 0;
  padding: 5px;
  grid-column: span 1;
}

/* Optional: Adding a border and padding to emulate a table look */
dl,
dt,
dd {
  border-bottom: 1px solid #ccc;
}

dt,
dd {
  padding: 5px;
  text-align: left;
}

/* Styling for headers within the table */
.dl-header {
  font-weight: bold;
  background-color: #25b2f3;
  color: white;
  padding: 8px;
  border-bottom: 2px solid #000;
  grid-column: span 1;
}

/* Optional: Head row styling */
dl.dl-header {
  display: contents; /* Ensure header row spans full width */
}
</style>
