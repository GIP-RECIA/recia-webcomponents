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
import type { Etabs, General, SectionEleve } from '@/types/generalType';
import { ref, watchEffect } from 'vue';


const props = defineProps<{
    personDetail : any 
}>()

let fonctClassGrp = ref<General>()
const sectionEleve = ref<SectionEleve>()

const etabs = ref<Array<Etabs>>()
watchEffect((): void => {
  void (() => {
    fonctClassGrp.value = props.personDetail?.fonctionClassesGroupe

    sectionEleve.value = fonctClassGrp.value?.sectionClassesGroupes.sectionEleve

    etabs.value = sectionEleve.value?.etabs     
    
  })()
})
</script>

<template>
    <div class="content">
          <div>
            <b>Email</b>
            <input type="text" :value="personDetail?.userMail">
          </div>
          <div>
            <b>Date de naissance</b>
            <input type="text" :value="personDetail?.bod">
          </div>
          <div>
            <b>Structure rattachement</b>
            <input type="text" :value="personDetail?.etab">
          </div>
          <div>
            <b>Les classes et groupes pédagogiques de {{ personDetail?.userName }}</b>
            <div class="etabs">
            <template v-for="(classgroup, index) in etabs" :key="index">
              <div class="etab">
                  <span class="etab-name">{{ classgroup.nameEtab }}</span>
                  <span class="classe">Classe : {{ classgroup.classes[0] || '-'}}</span>
                  <span class="groupe">Groupe : {{ classgroup.groupes[0] || '-' }}</span>
              </div>
            </template>
          </div>
        </div>

        <div>
          <b>Enseignements suivis par {{ personDetail?.userName }}</b>
          <div class="enseignements">
          <template v-for="(ens, index) in sectionEleve?.enseignementSuivis" :key="index">
              <div class="ens">{{ ens }}</div>
          </template>
          </div>
        </div>
    
    </div>
</template>

<style lang="scss">

.content {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: column;
      padding: 5px 0px;

      input {
        border: none;
      }

      .etabs {
        display: flex;

        .etab {
          display: flex;
          flex-direction: column;
          padding: 15px 15px;
          background-color: #eee;
          width: fit-content;
          border-radius: 12px;
          gap: 4px;

          .etab-name {
            font-weight: bold;
            font-size: 15px;
          }

          .classe {
            background-color: white;
            padding: 5px;
            border-radius: 14px;
            text-align: center;
          }

          .groupe {
            background-color: white;
            padding: 5px;
            border-radius: 14px;
            text-align: center;
          }
        }
      }

      .enseignements {
        display: grid;

        grid-template-columns: 200px 200px;
        column-gap: 20px;
        row-gap: 15px;

        .ens {
          display: flex;
          flex-direction: column;
          padding: 10px;
          background-color: #eee;
          border-radius: 12px;
          text-align: center;
          justify-content: center;
        }

        @media only screen and (max-width: 452px) {
          grid-template-columns: 1fr;
          
        }
      }

    }

}
</style>