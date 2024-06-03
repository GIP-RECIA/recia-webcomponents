<script setup lang="ts">
import { getFavorites, getFilters, getResources } from '../services/ServiceMediacentre.ts';
import { setUserInfoApiUrl } from '../utils/soffitUtils.ts';
import { getFilters as filtrage } from '@/services/ServiceFiltreMediacentre.ts';
import type { Filtres } from '@/types/FiltresType.ts';
// import { addFavorite, removeFavorite } from '../services/ServiceMediacentreTest.ts';
import type { Ressource } from '@/types/RessourceType.ts';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const filtre = ref('tout');
const ressources = ref<Array<Ressource>>([]);
const filtres = ref<Array<Filtres>>([]);
const chargement = ref<boolean>(false);
const chargementApp = ref<boolean>(false);
const filteredResources = ref<Array<Ressource>>([]);
const props = defineProps<{
  baseApiUrl: string;
  userInfoApiUrl: string;
}>();

onMounted(async (): Promise<void> => {
  setUserInfoApiUrl(props.userInfoApiUrl);
  await getRessources();
  await getFiltres();
  getResourcesByFilter(filtre.value, '');
});

const getRessources = async (): Promise<void> => {
  chargement.value = true;
  try {
    let reponse = await getResources(props.baseApiUrl);
    ressources.value = reponse.data;
  } catch (error: any) {
    console.log(error);
  } finally {
    chargement.value = false;
    if (chargementApp.value == false) {
      chargementApp.value = true;
    }
  }
};

const updateFiltre = (value: CustomEvent): void => {
  filtre.value = value.detail[0];
  let idCategorie = value.detail[1];
  if (filtre.value == 'favoris') {
    getFavoris();
  } else {
    getResourcesByFilter(filtre.value, idCategorie);
  }
};

const getFavoris = async (): Promise<void> => {
  chargement.value = true;
  try {
    let reponse = await getFavorites(props.baseApiUrl);
  } catch (error: any) {
    console.log(error);
  } finally {
    chargement.value = false;
  }
};

const getResourcesByFilter = (filtre: string, idCategorie: string): void => {
  chargement.value = true;
  try {
    switch (idCategorie) {
      case 'NIVEAU_EDUCATIF_FILTER':
        filteredResources.value = ressources.value.filter((ressource) =>
          ressource.niveauEducatif.some((e) => e.nom === filtre),
        );
        break;
      case 'TYPE_PRESENTATION_FILTER':
        filteredResources.value = ressources.value.filter((ressource) => ressource.typePresentation.code === filtre);
        break;
      case 'UAI_FILTER':
        filteredResources.value = ressources.value.filter((ressource) =>
          ressource.idEtablissement.some((e) => e.UAI === filtre),
        );
        break;
      case 'DOMAINE_ENSEIGNEMENT_FILTER':
        filteredResources.value = ressources.value.filter((ressource) =>
          ressource.domaineEnseignement.some((e) => e.nom === filtre),
        );
        break;
      default:
        filteredResources.value = ressources.value;
        break;
    }
  } catch (error: any) {
    console.log(error);
  }
  chargement.value = false;
};

const getFiltres = async (): Promise<void> => {
  chargement.value = true;
  try {
    let reponse = await getFilters(props.baseApiUrl);
    filtres.value = filtrage(ressources.value, reponse.data);
  } catch (error: any) {
    console.log(error);
  } finally {
    chargement.value = false;
  }
};
</script>

<template>
  <div v-if="!chargementApp" class="spinner-container">
    <div class="spinner-element">
      <font-awesome-icon icon="fa-solid fa-circle-notch" class="fa-spinner" />
    </div>
  </div>
  <div v-else>
    <div class="cadre-page-mediacentre">
      <aside class="aside-page-mediacentre">
        <menu-mediacentre :filtres="filtres" :checked="filtre" @update-checked="updateFiltre" />
      </aside>

      <main class="main-page-mediacentre">
        <liste-ressources
          v-if="!chargement"
          :filtre="filtre"
          :ressources="filteredResources"
          :chargement="chargement"
          :baseApiUrl="baseApiUrl"
          :userInfoApiUrl="userInfoApiUrl"
        />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
.cadre-page-mediacentre {
  display: flex;
  flex-direction: row;
  gap: 3vh;
  height: 100%;
  width: 100%;
}
.spinner-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.spinner-element {
  color: #d3d3d3;
  width: 10em;
  height: 10em;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.fa-spinner {
  animation: spinner 2s linear infinite;
}

.aside-page-mediacentre {
  max-width: min(25%, 290px);
  width: 100vh;
  align-items: flex-start;
  height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 3em 1em;
}

.main-page-mediacentre {
  max-width: max(75%, calc(100% - 290px));
  width: 100%;
  height: 100%;
}

@media (max-width: 770px) {
  .cadre-page-mediacentre {
    flex-direction: column;
    align-items: center;
  }

  .aside-page-mediacentre {
    max-width: 100%;
  }

  .main-page-mediacentre {
    max-width: 100%;
  }
}
</style>
