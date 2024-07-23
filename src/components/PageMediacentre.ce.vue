<script setup lang="ts">
import '../../src/info-modal.js';
import {
  flushMediacentreFavorites,
  getFavorites,
  getFilters,
  getResources,
  putFavorites,
} from '../services/ServiceMediacentre.ts';
import { setError } from '@/services/ServiceErreurMediacentre.ts';
import { getFilters as filtrage } from '@/services/ServiceFiltreMediacentre.ts';
import type { Filtres } from '@/types/FiltresType.ts';
import { type Ressource, createResourceFromJson } from '@/types/RessourceType.ts';
import { CustomError } from '@/utils/CustomError.ts';
import { initToken } from '@/utils/axiosUtils.ts';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const filtre = ref('tout');
const filtres = ref<Array<Filtres>>([]);
const ressources = ref<Array<Ressource>>([]);
const filteredResources = ref<Array<Ressource>>([]);
const chargement = ref<boolean>(false);
const chargementApp = ref<boolean>(false);
const isModalOpen = ref(false);
const resourceTitle = ref<string>('');
const resourceEditor = ref<string>('');
const resourceDescription = ref<string | undefined>();

const { t } = useI18n();
const erreur = ref<string>('');

const props = defineProps<{
  baseApiUrl: string;
  userInfoApiUrl: string;
  userRightsApiUrl: string;
  getUserFavoriteResourcesApiUrl: string;
  putUserFavoriteResourcesApiUrl: string;
  fnameMediacentreUi: string;
}>();

const countNbFilteredResources = computed<number>(() => {
  return filteredResources.value.length;
});

onMounted(async (): Promise<void> => {
  try {
    chargementApp.value = true;

    await initToken(props.userInfoApiUrl);
    // await flushMediacentreFavorites(props.putUserFavoriteResourcesApiUrl, props.fnameMediacentreUi);
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
    const res = reponse;

    ressources.value = res.map(createResourceFromJson);
  } catch (e: any) {
    throw new CustomError(e.message, e.statusCode);
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
    const resourceFavoriteIds = await getFavorites(props.getUserFavoriteResourcesApiUrl, props.fnameMediacentreUi);
    const mediacentreFavorites = resourceFavoriteIds.mediacentreFavorites;
    const resourceFavorites = ressources.value.filter((res) => mediacentreFavorites.includes(res.idRessource));
    resourceFavorites.forEach((res) => (res.isFavorite = true));
  } catch (e: any) {
    console.error(e);
  }
};

const updateFavori = async (event: CustomEvent) => {
  const idResource = event.detail[0];
  const isFavorite = event.detail[1];

  const resourceFavorite = ressources.value.find((res) => res.idRessource == idResource);
  resourceFavorite!.isFavorite = isFavorite;
  try {
    const resourceFavoriteIds = await getFavorites(props.getUserFavoriteResourcesApiUrl, props.fnameMediacentreUi);
    await putFavorites(
      props.putUserFavoriteResourcesApiUrl,
      idResource,
      isFavorite,
      resourceFavoriteIds.mediacentreFavorites,
      props.fnameMediacentreUi,
    );
  } catch (e: any) {
    console.error(e);
  }
};

const openModal = (event: CustomEvent) => {
  isModalOpen.value = true;
  resourceTitle.value = event.detail[1];
  resourceEditor.value = event.detail[2];
  resourceDescription.value = event.detail[3];
};

const getFavoris = async (): Promise<void> => {
  chargement.value = true;
  try {
    const idResourceFavorites = await getFavorites(props.getUserFavoriteResourcesApiUrl, props.fnameMediacentreUi);
    filteredResources.value = ressources.value.filter((res) =>
      idResourceFavorites.mediacentreFavorites.includes(res.idRessource),
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
    filtres.value = filtrage(ressources.value, reponse);
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
        @open-modal="openModal"
      />
    </main>
    <Teleport to="body">
      <info-modal id="modale" debug="false">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <template slot="modal-body">
          <div style="display: flex; flex-direction: column; gap: 2em">
            <span>{{ t('resource-info-modal-mediacentre.editor') }} {{ resourceEditor }} </span>
            <div v-if="resourceDescription" class="description-modal">
              {{ resourceDescription }}
            </div>
          </div>
        </template>
      </info-modal>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.spinner-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;

  .spinner-element {
    color: #d3d3d3;
    width: 10em;
    height: 10em;

    @keyframes spinner {
      to {
        transform: rotate(360deg);
      }
    }

    .fa-spinner {
      animation: spinner 2s linear infinite;
    }
  }
}
.cadre-page-mediacentre {
  display: flex;
  flex-direction: row;
  gap: 4em;
  padding: 2em;
  height: 100%;
  width: 100%;

  .aside-page-mediacentre {
    align-items: flex-start;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin-right: 1em;

    menu-mediacentre {
      height: 100%;
    }
  }

  .main-page-mediacentre {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

.description-modal {
  text-align: justify;
}

div[slot='modal-body'] {
  background-color: aqua;
}
@media only screen and (max-width: 650px) {
  .cadre-page-mediacentre {
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    margin: 0;
    display: flex;
    align-content: space-around;
    overflow: hidden;
    row-gap: 0;

    .aside-page-mediacentre {
      height: unset;
      max-height: 100%;
      justify-content: center;
      padding: 0;
      margin: 0;
      width: 100%;
      position: absolute;
      top: 0;
      overflow: hidden;
      z-index: 2;
      box-shadow: 0px 10px 15px -7px rgba(0, 0, 0, 0.1);
      transition: height 3s ease-in-out;

      menu-mediacentre {
        height: 100%;
        width: 100%;
      }
    }

    .main-page-mediacentre {
      box-sizing: border-box;
      height: calc(100% - 70px);
      margin: 0;
      padding: 0;
      flex-shrink: 0;
      flex-grow: 0;
      justify-content: center;

      liste-ressources {
        width: 100%;
      }
    }
  }
}
</style>
