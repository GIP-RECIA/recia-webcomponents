<script setup lang="ts">
import { addFavorite, getFavorites, getFilters, getResources, removeFavorite } from '../services/ServiceMediacentre.ts';
import { setError } from '@/services/ServiceErreurMediacentre.ts';
import { getFilters as filtrage } from '@/services/ServiceFiltreMediacentre.ts';
import type { Filtres } from '@/types/FiltresType.ts';
// import { addFavorite, removeFavorite } from '../services/ServiceMediacentreTest.ts';
import { type Ressource, createResourceFromJson } from '@/types/RessourceType.ts';
import { initToken } from '@/utils/axiosUtils.ts';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const filtre = ref('tout');
const filtres = ref<Array<Filtres>>([]);
const ressources = ref<Array<Ressource>>([]);
const filteredResources = ref<Array<Ressource>>([]);
const chargement = ref<boolean>(false);
const chargementApp = ref<boolean>(false);

const erreur = ref<string>('');

const props = defineProps<{
  baseApiUrl: string;
  userInfoApiUrl: string;
  userRightsApiUrl: string;
  userResourceFavoritesApiUrl: string;
}>();

const countNbFilteredResources = computed<number>(() => {
  return filteredResources.value.length;
});

onMounted(async (): Promise<void> => {
  try {
    chargementApp.value = true;

    await initToken(props.userInfoApiUrl);
    await getRessources();
    await setFavoris();
    await getFiltres();

    getResourcesByFilter(filtre.value, '');
  } catch (e: any) {
    erreur.value = setError(e.statusCode);
  } finally {
    chargementApp.value = false;
  }
});

const getRessources = async (): Promise<void> => {
  chargement.value = true;
  try {
    let reponse = await getResources(props.baseApiUrl, props.userRightsApiUrl);
    const res = reponse.data;

    ressources.value = res.map(createResourceFromJson);
  } catch (e: any) {
    console.error(e);
  } finally {
    chargement.value = false;
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

const setFavoris = async (): Promise<void> => {
  try {
    const idResourceFavorites: Array<string> = await getFavorites(props.userResourceFavoritesApiUrl);

    const resourceFavorites = ressources.value.filter((res) => idResourceFavorites.includes(res.idRessource));

    resourceFavorites.forEach((res) => (res.isFavorite = true));
  } catch (e: any) {
    console.error(e);
  }
};

const updateFavori = (event: CustomEvent) => {
  const idResource = event.detail[0];
  const isFavorite = event.detail[1];

  const resourceFavorite = ressources.value.find((res) => res.idRessource == idResource);
  resourceFavorite!.isFavorite = isFavorite;
  try {
    if (isFavorite) {
      addFavorite(props.userResourceFavoritesApiUrl, idResource);
    } else {
      removeFavorite(props.userResourceFavoritesApiUrl, idResource);
    }
  } catch (e: any) {
    console.error(e);
  }
};

const getFavoris = async (): Promise<void> => {
  chargement.value = true;
  try {
    const idResourceFavorites: Array<string> = await getFavorites(props.userResourceFavoritesApiUrl);
    filteredResources.value = ressources.value.filter((ressource) =>
      idResourceFavorites.includes(ressource.idRessource),
    );
    filteredResources.value.forEach((res) => (res.isFavorite = true));
  } catch (error: any) {
    console.error(error);
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
    console.error(error);
  } finally {
    chargement.value = false;
  }
};

const getFiltres = async (): Promise<void> => {
  chargement.value = true;
  try {
    let reponse = await getFilters(props.baseApiUrl);
    filtres.value = filtrage(ressources.value, reponse.data);
  } catch (error: any) {
    console.error(error);
  } finally {
    chargement.value = false;
  }
};
</script>

<template>
  <div v-if="chargementApp" class="spinner-container">
    <div class="spinner-element">
      <font-awesome-icon icon="fa-solid fa-circle-notch" class="fa-spinner" />
    </div>
  </div>
  <div v-else class="cadre-page-mediacentre">
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
        :erreur="erreur"
        @update-favorite="updateFavori"
        :nbResources="countNbFilteredResources"
      />
    </main>
  </div>
</template>

<style lang="scss">
.cadre-page-mediacentre {
  display: flex;
  flex-direction: row;
  row-gap: 2em;
  height: 100%;
  width: 100%;
  padding: 1em 2em;
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
  align-items: flex-start;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-right: 1em;
}

.main-page-mediacentre {
  width: 100%;
  height: 100%;
}

menu-mediacentre {
  height: 100%;
}
@media (max-width: 770px) {
  .cadre-page-mediacentre {
    flex-direction: column;
    justify-content: flex-start;
    padding: 1em 0;
  }

  .aside-page-mediacentre {
    width: 30%;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .main-page-mediacentre {
    width: 70%;
    height: 100%;
    padding: 0;
    box-sizing: border-box;
  }
}
</style>
import { HttpStatusCode } from 'axios';
