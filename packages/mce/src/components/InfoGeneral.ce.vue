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
import type { PersonneFonction } from '@/types/fonctionType';
import type { EnseignementProf, Etabs, General, SectionEleve, SectionProf } from '@/types/generalType';
import { ref, watchEffect } from 'vue';

const props = defineProps<{
    details: General
}>()

const infoGeneral = ref<General>({
listFonctions: [],
sectionClassesGroupes: {
    sectionEleve: {
    etabs: [],
    enseignementSuivis: []
},
    sectionProf: {
    etabs: {
    }
}
    }
})
const fonctions = ref<Array<PersonneFonction>>([])
const sectionProf = ref<SectionProf>()
const sectionEleve = ref<SectionEleve>()

const etabs = ref<Array<Etabs>>()
const etabsProf = ref<Record<string, EnseignementProf[]>>()

const isProf = ref<boolean>(true)

watchEffect((): void => {
  void (() => {
    infoGeneral.value = props.details
    fonctions.value = infoGeneral.value.listFonctions
    sectionEleve.value = infoGeneral.value.sectionClassesGroupes.sectionEleve
    sectionProf.value = infoGeneral.value.sectionClassesGroupes.sectionProf

    etabs.value = sectionEleve.value.etabs        
    etabsProf.value = sectionProf.value.etabs
 
    if (etabs.value.length) {
        isProf.value = false
    }     
    
  })()
})


</script>

<template>
    <!-- <div class="content"> -->
        <div v-if="fonctions.length" class="sectionFonction">
          <div class="heading-titre">
            <span>Mes fonctions</span>
          </div>
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
    <div v-if="isProf" class="sectionCG">
      <div class="heading-titre">
        <span>Mes classes et groupes pédagoqiues</span>
      </div>
      <dl data-title="Mes classes et groupes pédagoqiues">
        <!-- Table header for "My classes and groups" -->
        <dt class="dl-header">Établissement</dt>
        <dt class="dl-header">Enseignement</dt>
        <dt class="dl-header">Classes</dt>
        <dt class="dl-header">Groups</dt>

        <!-- Data rows -->
        <template v-for="(classgroup, index) in sectionProf" :key="index">
            <template v-for="(etabs, indexEtab) in classgroup" :key="indexEtab">
            <!-- First item row -->

            <template v-for="(item,indexItem) in etabs" :key="indexItem">
                <dd v-if="indexItem == 0">{{ indexEtab }}</dd>
                <dd v-else></dd>

                <dd>{{ item.matiere }}</dd>
                <dd>{{ item.cg?.classes?.[0] || '-'}}</dd>
                <dd>{{ item.cg?.groupes?.[0] || '-' }}</dd>

                <template v-for="(extraClass, idx) in (item.cg?.classes?.slice(1) || [])" :key="`class-${idx}`">
                    <dd></dd> <!-- Empty space for "etab" column -->
                    <dd></dd> <!-- Empty space for "matiere" column -->
                    <dd>{{ extraClass }}</dd>
                    <dd>{{ item.cg?.groupes?.[idx + 1] || '-'  }}</dd>
                </template>
                               
            </template>
          </template>
        </template>
      </dl>
    </div>

    <!-- Mes classes et groupes pédago elève section -->
    <div v-else class="sectionCG_Eleve">
      <div class="heading-titre">
        <span>Mes classes et groupes pédagoqiues</span>
      </div>
      <dl data-title="Mes classes et groupes pédagoqiues">
        <!-- Table header for "My classes and groups" -->
        <dt class="dl-header">Établissement</dt>
        <dt class="dl-header">Classes</dt>
        <dt class="dl-header">Groups</dt>

        <!-- Data rows -->
        <template v-for="(classgroup, index) in etabs" :key="index">
          <!-- First item row -->
          <dd>{{ classgroup.nameEtab }}</dd>
          <dd>{{ classgroup.classes[0] || '-'}}</dd>
          <dd>{{ classgroup.groupes[0] || '-' }}</dd>

        </template>
      </dl>

      <dl>
        <dt class="ens-suivis">Enseignements suivis</dt>
        <template v-for="(ens, index) in sectionEleve?.enseignementSuivis" :key="index">
          <dd>{{ ens }}</dd>
        </template>
      </dl>
    </div>
    <!-- </div> -->
</template>

<style lang="css">
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 5px;
  /* box-shadow:
    0 1px 2px #0000001f,
    0 1px 2px #0000001f; */
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
}

.sectionFonction dl,
.sectionCG dl,
.sectionCG_Eleve dl {
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


/* Styling for headers */
.sectionFonction dl::before,
.sectionCG dl::before,
.sectionCG_Eleve dl::before {
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

.ens-suivis {
  grid-column: span 3;

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

.heading-titre {
  padding: 10px 15px;
  background-color: #f3f3f3;
}
</style>