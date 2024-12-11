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
        <div v-if="fonctions.length" class="sectionFonction">
          <div class="heading-titre">
            <span class="titre">Mes fonctions</span>
          </div>
          <div class="etabs-fonctions">
            <template v-for="(it, index) in fonctions" :key="index">
              <div class="etab-fonction">
                  <span>{{ it.struct.name }} ({{ it.struct.type }})</span>
                  <div class="fonctions">
                      <span class="fonction">{{ it.fonction || '-'}}</span>
                      <span class="discipline">{{ it.discipline || '-' }}</span>
                  </div>
              </div>
            </template>
          </div>
        </div>


    <!-- Mes classes et groupes pédago prof section -->
    <div v-if="isProf" class="sectionCG">
      <div class="heading-titre">
        <span class="titre">Mes classes et groupes pédagogiques</span>
      </div>
      <div class="etabs-cg">
        <template v-for="(classgroup, index) in sectionProf" :key="index">
            <template v-for="(etabs, indexEtab) in classgroup" :key="indexEtab">
            <!-- First item row -->
            <div class="classe-groupe">
            <span>{{ indexEtab }}</span>

              <div class="enseignements-prof">
              <template v-for="(item,indexItem) in etabs" :key="indexItem">
                <div class="enseignement-prof">
                    <span class="ens-prof">{{ item.matiere}}</span>
                    <template v-for="(classes, index) in item.cg?.classes" :key="index">
                      <span :class="[ item.cg?.classes != null ? 'classe-prof' : 'none-classe']">Classe : {{ classes}}</span>
                    </template>
                    <template v-for="(groupes, index) in item.cg?.groupes" :key="index">
                      <span :class="[ item.cg?.groupes != null ? 'groupe-prof' : 'none-groupe']">Groupe : {{ groupes }}</span>
                    </template>
                </div>
              </template>
            </div>
            </div>
        </template>
      </template>
      </div>
    
    </div>

    <!-- Mes classes et groupes pédago elève section -->
    <div v-else class="sectionCG_Eleve">
      <div class="heading-titre">
        <span class="titre">Mes classes et groupes pédagogiques</span>
      </div>

      <div class="etabs">
        <template v-for="(classgroup, index) in etabs" :key="index">
          <div class="etab">
              <span class="etab-name">{{ classgroup.nameEtab }}</span>
              <span class="classe">Classe : {{ classgroup.classes[0] || '-'}}</span>
              <span class="groupe">Groupe : {{ classgroup.groupes[0] || '-' }}</span>
          </div>
        </template>
      </div>

      <div class="heading-titre">
        <span class="titre">Enseignements suivis</span>
      </div>
      <div class="enseignements">
      <template v-for="(ens, index) in sectionEleve?.enseignementSuivis" :key="index">
          <div class="ens">{{ ens }}</div>
      </template>
      </div>

    </div>
</template>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
}


.ens-suivis {
  grid-column: span 3;

}


.heading-titre {
  padding: 10px 15px;

  .titre {
    color: rgba(0, 0, 0, 0.4);
    font-size: 18px;
    font-weight: bold;
  }
}

.sectionCG {
  padding: 20px 0px;
}

.enseignements {
  display: grid;
  padding: 0px 15px;

  grid-template-columns: 200px 200px 200px;
  column-gap: 20px;
  row-gap: 15px;

  .ens {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #eee;
    //width: fit-content;
    border-radius: 12px;
    text-align: center;
    justify-content: center;
  }
}

.etabs {
  display: flex;
  padding: 0px 15px;

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

// mes fonction : prof 
.etabs-fonctions {
  display: grid;
  padding: 0px 15px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    column-gap: 20px;
    row-gap: 15px;


  .etab-fonction {

    .fonctions {
      display: flex;
      flex-direction: column;
      padding: 15px 15px;
      background-color: #eee;
      width: fit-content;
      border-radius: 12px;
      gap: 4px;

      .fonction {
        font-weight: bold;
        font-size: 14px;
      }

      .discipline {
        background-color: white;
        padding: 5px;
        border-radius: 14px;
        font-size: 11px;
        text-align: center;
      }

    }
  }
}

// mes cg : prof 
.etabs-cg {
  display: grid;
  padding: 0px 15px;
  grid-template-columns: 300px 300px;
  column-gap: 20px;
  row-gap: 15px;


  .classe-groupe {

    .enseignements-prof {
      display: grid;
      grid-template-columns: 200px 200px;
      column-gap: 15px;
      
      .enseignement-prof {
        display: flex;
        flex-direction: column;
        padding: 15px 15px;
        background-color: #eee;
        border-radius: 12px;
        gap: 4px;

        .ens-prof {
          font-weight: bold;
          font-size: 14px;
        }

        .classe-prof {
          background-color: white;
          padding: 5px;
          border-radius: 14px;
          text-align: center;
        }
        .none-classe {
          display: none;
        }

        .groupe-prof {
          background-color: white;
          padding: 5px;
          border-radius: 14px;
          text-align: center;
        }
        .none-groupe {
          display: none;
        }

      }

    }
  }
}
</style>