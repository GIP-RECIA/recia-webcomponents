<!--
 Copyright (C) 2023 GIP-RECIA, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed t in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<script setup lang="ts">
import {
  getRessourcesDiffusables,
  getRessourcesDiffusablesWithRechercheFilter,
  setResourcesPerPage,
  // getSize,
  // getSizeWithRechercheFilter,
} from '@/services/serviceRessourcesDiffusables';
import type { Ressource } from '@/types/ressourceType';
import { RechercheFilter } from '@/utils/RechercheFilter';
import { initToken } from '@/utils/axiosUtils';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  baseApiUrl: string;
  ressourcesDiffusablesApiUri: string;
  ressourcesDiffusablesSizeApiUri: string;
  userInfoApiUrl: string;
  resourcesPerPageDefault: number;
}>();

const ressources = ref<Array<Ressource>>([]);
const erreur = ref<string>('');
const nombreRessourcesTotal = ref<number>(0);
const pageActuelle = ref<number>(0);
// const pageSuivante = ref<number>(0);
const lectureTerminee = ref<boolean>(false);
const chargement = ref<boolean>(false);
const recherche = ref<string>('');
const rechercheFilter = ref<RechercheFilter>();
const rechercheAvanceeActive = ref<boolean>(false);
const numerosPagesAffiches = ref<number[]>([]);
const refreshKey = ref<boolean>(false);

onMounted(async (): Promise<void> => {
  await initToken(props.userInfoApiUrl);
  // await recommencerRecherche();
  setResourcesPerPage(props.resourcesPerPageDefault);
  await rechercheInitiale();
});

const reinitialiserRecherche = async (): Promise<void> => {
  if (rechercheAvanceeActive.value) {
    return;
  }
  recherche.value = '';
  getPageSuivante(1);
};

const reinitialiserRechercheAvancee = async (rechercheInput: CustomEvent): Promise<void> => {
  if (!rechercheAvanceeActive.value) {
    return;
  }
  rechercheFilter.value = rechercheInput.detail[0];
  getPageSuivante(1);
};

const recommencerRechercheInput = async (rechercheInput: CustomEvent): Promise<void> => {
  if (rechercheAvanceeActive.value) {
    return;
  }
  recherche.value = rechercheInput.detail[0];
  getPageSuivante(1);
};

const recommencerRechercheAvanceeInput = async (rechercheInput: CustomEvent): Promise<void> => {
  if (!rechercheAvanceeActive.value) {
    return;
  }
  rechercheFilter.value = rechercheInput.detail[0];
  getPageSuivante(1);
};

const rechercheInitiale = async (): Promise<void> => {
  erreur.value = '';
  chargement.value = true;
  try {
    let response = await getRessourcesDiffusables(
      props.baseApiUrl + props.ressourcesDiffusablesApiUri,
      props.userInfoApiUrl,
      1 /*Page number, human-readable */,
      recherche.value,
    );
    console.log(props.resourcesPerPageDefault);
    if (response.status == 200) {
      let payload = response.data.payload;
      handlePayload(payload);
    }
    console.log(response);
  } catch (e: any) {
    erreur.value = e.toString() + (e.response != undefined ? ' | ' + e.response.data.message : '');
  }
  chargement.value = false;
};

function handlePayload(payload: any) {
  let pagination = payload.pagination;
  if (typeof pagination.totalObjectsCount === 'number') {
    nombreRessourcesTotal.value = pagination.totalObjectsCount;
    console.log('not undefined if');
  }

  if (typeof pagination.totalObjectsCount === 'number') {
    pageActuelle.value = pagination.pageIndexHumanReadable;
    console.log('not undefined if again');
  }

  numerosPagesAffiches.value = pagesNumberToDisplay();
  refreshKey.value = true;
  refreshKey.value = false;
  console.log('numero page affiche ' + numerosPagesAffiches.value);
  console.log(pagesNumberToDisplay());

  let ressourcesDiffusables = payload.ressourcesDiffusables;
  console.log(ressourcesDiffusables.length);
  ressources.value = ressourcesDiffusables;
}

const maxPagesCountFromObjectsCount = (): number => {
  console.log('ressource per page default ' + props.resourcesPerPageDefault);
  return Math.ceil(nombreRessourcesTotal.value / props.resourcesPerPageDefault);
};

const pagesNumberToDisplay = (): number[] => {
  let monSet: Set<number> = new Set<number>();

  monSet.add(1);
  if (pageActuelle.value > 1) {
    monSet.add(pageActuelle.value - 1);
  }
  monSet.add(pageActuelle.value);
  monSet.add(Math.min(pageActuelle.value + 1, maxPagesCountFromObjectsCount()));
  monSet.add(maxPagesCountFromObjectsCount());
  // let firstPageArrayLastValue = Math.min(3, maxPagesCountFromObjectsCount());

  // for (let index = 1; index <= firstPageArrayLastValue; index++) {
  //   monSet.add(index);
  // }

  // console.log(firstPageArrayLastValue);

  // let pageAroundUnder: number = Math.max(Math.min(1, pageActuelle.value - 2), 1);
  // let pageAroundUpper: number = Math.min(maxPagesCountFromObjectsCount(), pageActuelle.value + 2);

  // console.log(pageAroundUnder + ' under');
  // console.log(pageAroundUpper + ' upper');
  // console.log(pageActuelle.value + 4 + ' pa actu +4');
  // console.log(pageActuelle.value + ' pa actu');

  // for (let index = pageAroundUnder; index <= pageAroundUpper; index++) {
  //   monSet.add(index);
  // }

  // let lastsPagesArrayStartValue = maxPagesCountFromObjectsCount() - 2;
  // console.log(' lastsPagesArrayStartValue' + lastsPagesArrayStartValue);

  // for (let index = lastsPagesArrayStartValue; index <= maxPagesCountFromObjectsCount(); index++) {
  //   monSet.add(index);
  // }

  return Array.from(monSet);
};

// const recommencerRecherche = async (): Promise<void> => {
//   ressources.value = [];
//   erreur.value = '';
//   chargement.value = true;
//   try {
//     // nombreRessourcesTotal.value = response.data.payload;
//     if (nombreRessourcesTotal.value === 0) {
//       lectureTerminee.value = true;
//       chargement.value = false;
//     } else {
//       lectureTerminee.value = false;
//       getPageSuivante(1);
//     }
//   } catch (e: any) {
//     erreur.value = e.toString() + (e.response != undefined ? ' | ' + e.response.data.message : '');
//     chargement.value = false;
//   }
// };

// const recommencerRechercheAvancee = async (): Promise<void> => {
//   ressources.value = [];
//   erreur.value = '';
//   chargement.value = true;
//   try {
//     let response = await getSizeWithRechercheFilter(
//       props.baseApiUrl + props.ressourcesDiffusablesSizeApiUri,
//       props.userInfoApiUrl,
//       rechercheFilter.value != undefined ? rechercheFilter.value : new RechercheFilter(),
//     );
//     nombreRessourcesTotal.value = response.data.payload;
//     if (nombreRessourcesTotal.value === 0) {
//       lectureTerminee.value = true;
//       chargement.value = false;
//     } else {
//       lectureTerminee.value = false;
//       getPageSuivanteRechercheAvancee();
//     }
//   } catch (e: any) {
//     erreur.value = e.toString() + (e.response != undefined ? ' | ' + e.response.data.message : '');
//     chargement.value = false;
//   }
// };

const getPageSuivante = async (nbr: number): Promise<void> => {
  // if (!lectureTerminee.value) {
  if (nbr <= maxPagesCountFromObjectsCount()) {
    erreur.value = '';
    chargement.value = true;
    try {
      let response;

      if (rechercheAvanceeActive.value == true) {
        response = await getRessourcesDiffusablesWithRechercheFilter(
          props.baseApiUrl + props.ressourcesDiffusablesApiUri,
          props.userInfoApiUrl,
          nbr,
          rechercheFilter.value != undefined ? rechercheFilter.value : new RechercheFilter(),
        );
      } else {
        response = await getRessourcesDiffusables(
          props.baseApiUrl + props.ressourcesDiffusablesApiUri,
          props.userInfoApiUrl,
          nbr,
          recherche.value,
        );
      }

      let payload = response.data.payload;
      handlePayload(payload);
    } catch (e: any) {
      erreur.value = e.toString() + (e.response != undefined ? ' | ' + e.response.data.message : '');
    }
    chargement.value = false;
  }
};

// const getPageSuivanteRechercheAvancee = async (): Promise<void> => {
//   if (!lectureTerminee.value) {
//     erreur.value = '';
//     chargement.value = true;
//     try {
//       let response = await getRessourcesDiffusablesWithRechercheFilter(
//         props.baseApiUrl + props.ressourcesDiffusablesApiUri,
//         props.userInfoApiUrl,
//         pageActuelle.value + 1,
//         rechercheFilter.value != undefined ? rechercheFilter.value : new RechercheFilter(),
//       );
//       ressources.value = ressources.value.concat(response.data.payload);
//       if (ressources.value.length === nombreRessourcesTotal.value) {
//         lectureTerminee.value = true;
//       }
//     } catch (e: any) {
//       erreur.value = e.toString() + (e.response != undefined ? ' | ' + e.response.data.message : '');
//     }
//     chargement.value = false;
//   }
// };

const swapRechercheTypeToggle = (rechercheInput: CustomEvent): void => {
  rechercheAvanceeActive.value = rechercheInput.detail[0];
  getPageSuivante(1);
};

function clickfct(targetPageNbr: number) {
  // if (targetPageNbr == pageActuelle.value) {
  //   return;
  // }
  console.log('click ' + targetPageNbr);
  getPageSuivante(targetPageNbr);
}
</script>

<template>
  <div class="cadre-page-ressource">
    <aside class="aside-page-ressource">
      <recherche-type-toggle @swap-recherche-type-toggle="swapRechercheTypeToggle" />
      <recherche-ressource
        v-show="!rechercheAvanceeActive"
        :nombre-ressources-total="nombreRessourcesTotal"
        :nombre-ressources-affichees="ressources.length"
        @recommencer-recherche-input="recommencerRechercheInput"
        @reinitialiser-recherche="reinitialiserRecherche"
        ref="rechercheRessource"
      />
      <recherche-avancee-ressource
        v-show="rechercheAvanceeActive"
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
        :lastPageIndexHumanReadable="maxPagesCountFromObjectsCount()"
        :currentPageIndexHumanReadable="pageActuelle"
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

  .current {
    background-color: $button-background-color;
    color: $button-text-color;
    border-radius: 5px;
    border-color: transparent;
  }

  button:not(.current) {
    cursor: pointer;
  }
}
</style>
