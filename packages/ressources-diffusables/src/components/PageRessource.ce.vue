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
import {
  getRessourcesDiffusables,
  getRessourcesDiffusablesWithRechercheFilter,
  getSize,
  getSizeWithRechercheFilter,
} from '@/services/serviceRessourcesDiffusables';
import type { Ressource } from '@/types/ressourceType';
import { onMounted, ref } from 'vue';
import { initToken } from '@/utils/axiosUtils';
import { RechercheFilter } from '@/utils/RechercheFilter';

const props = defineProps<{
  baseApiUrl: string
  ressourcesDiffusablesApiUri: string
  ressourcesDiffusablesSizeApiUri: string
  userInfoApiUrl: string
}>()

const ressources = ref<Array<Ressource>>([]);
const erreur = ref<string>('');
const nombreRessourcesTotal = ref<number>(0);
const pageSuivante = ref<number>(0);
const lectureTerminee = ref<boolean>(false);
const chargement = ref<boolean>(false);
const recherche = ref<string>('');
const rechercheV2 = ref<RechercheFilter>();

onMounted(async(): Promise<void> => {
  await initToken(props.userInfoApiUrl);
  await recommencerRecherche();
});

const reinitialiserRecherche = async (): Promise<void> => {
  recherche.value = '';
  recommencerRecherche();
};

const reinitialiserRechercheAvancee = async (rechercheInput: CustomEvent): Promise<void> => {
  rechercheV2.value = rechercheInput.detail[0];
  recommencerRechercheAvancee();
};

const recommencerRechercheInput = async (rechercheInput: CustomEvent): Promise<void> => {
  recherche.value = rechercheInput.detail[0];
  recommencerRecherche();
};

const recommencerRechercheAvanceeInput = async (rechercheInput: CustomEvent): Promise<void> => {
  rechercheV2.value = rechercheInput.detail[0];
  recommencerRechercheAvancee();
};

const recommencerRecherche = async (): Promise<void> => {
  ressources.value = [];
  pageSuivante.value = 0;
  erreur.value = '';
  chargement.value = true;
  try {
    const response = await getSize(
      props.baseApiUrl + props.ressourcesDiffusablesSizeApiUri,
      props.userInfoApiUrl,
      recherche.value,
    )
    nombreRessourcesTotal.value = response.data.payload
    if (nombreRessourcesTotal.value === 0) {
      lectureTerminee.value = true
      chargement.value = false
    }
    else {
      lectureTerminee.value = false
      getPageSuivante()
    }
  }
  catch (e: any) {
    erreur.value = e.toString() + (e.response !== undefined ? ` | ${e.response.data.message}` : '')
    chargement.value = false
  }
};

const recommencerRechercheAvancee = async (): Promise<void> => {
  ressources.value = [];
  pageSuivante.value = 0;
  erreur.value = '';
  chargement.value = true;
  try {
    let response = await getSizeWithRechercheFilter(
      props.baseApiUrl + props.ressourcesDiffusablesSizeApiUri,
      props.userInfoApiUrl,
      rechercheV2.value != undefined ? rechercheV2.value : new RechercheFilter(),
    );
    nombreRessourcesTotal.value = response.data.payload;
    if (nombreRessourcesTotal.value === 0) {
      lectureTerminee.value = true;
      chargement.value = false;
    } else {
      lectureTerminee.value = false;
      getPageSuivanteRechercheAvancee();
    }
  } catch (e: any) {
    erreur.value = e.toString() + (e.response != undefined ? ' | ' + e.response.data.message : '');
    chargement.value = false;
  }
};

const getPageSuivante = async (): Promise<void> => {
  if (!lectureTerminee.value) {
    erreur.value = ''
    chargement.value = true
    try {
      const response = await getRessourcesDiffusables(
        props.baseApiUrl + props.ressourcesDiffusablesApiUri,
        props.userInfoApiUrl,
        pageSuivante.value++,
        recherche.value,
      )
      ressources.value = ressources.value.concat(response.data.payload)
      if (ressources.value.length === nombreRessourcesTotal.value) {
        lectureTerminee.value = true
      }
    }
    catch (e: any) {
      erreur.value = e.toString() + (e.response !== undefined ? ` | ${e.response.data.message}` : '')
    }
    chargement.value = false
  }
};

const getPageSuivanteRechercheAvancee = async (): Promise<void> => {
  if (!lectureTerminee.value) {
    erreur.value = '';
    chargement.value = true;
    try {
      let response = await getRessourcesDiffusablesWithRechercheFilter(
        props.baseApiUrl + props.ressourcesDiffusablesApiUri,
        props.userInfoApiUrl,
        pageSuivante.value++,
        rechercheV2.value != undefined ? rechercheV2.value : new RechercheFilter(),
      );
      ressources.value = ressources.value.concat(response.data.payload);
      if (ressources.value.length === nombreRessourcesTotal.value) {
        lectureTerminee.value = true;
      }
    } catch (e: any) {
      erreur.value = e.toString() + (e.response != undefined ? ' | ' + e.response.data.message : '');
    }
    chargement.value = false;
  }
};
</script>

<template>
  <div class="cadre-page-ressource">
    <aside class="aside-page-ressource">
      <recherche-ressource
        :nombre-ressources-total="nombreRessourcesTotal"
        :nombre-ressources-affichees="ressources.length"
        @recommencer-recherche-input="recommencerRechercheInput"
        @reinitialiser-recherche="reinitialiserRecherche"
        ref="rechercheRessource"
      />
      <recherche-avancee-ressource
        :nombre-ressources-total="nombreRessourcesTotal"
        :nombre-ressources-affichees="ressources.length"
        @recommencer-recherche-avancee-input="recommencerRechercheAvanceeInput"
        @reinitialiser-recherche-avancee="reinitialiserRechercheAvancee"
        ref="rechercheAvanceeRessource"
      />
      <legende-ressource class="legende-ressource-page-ressource" />
    </aside>
    <main class="main-page-ressource">
      <liste-ressources
        :ressources="ressources"
        :erreur="erreur"
        :lectureTerminee="lectureTerminee"
        :chargement="chargement"
        @get-page-suivante="getPageSuivante"
        ref="listeRessource"
      />
    </main>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.cadre-page-ressource {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-page-ressource {
  height: 100%;
}

.legende-ressource-page-ressource {
  display: none;
}

@media (min-width: 1024px) {
  .cadre-page-ressource {
    flex-direction: row;
  }

  .aside-page-ressource {
    max-height: 100%;
    min-width: 20%;
    overflow-y: hidden;
    margin-right: -$margin;
  }

  .main-page-ressource {
    min-width: 80%;
  }

  .legende-ressource-page-ressource {
    display: block;
  }
}
</style>
