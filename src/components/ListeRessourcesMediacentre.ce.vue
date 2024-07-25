<script setup lang="ts">
import type { Ressource } from '@/types/RessourceType.ts';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const nbHiddenCards = ref<number>(0);

const emit = defineEmits(['update-favorite', 'open-modal']);

const props = defineProps<{
  filtre: string;
  ressources: Array<Ressource>;
  chargement: boolean;
  baseApiUrl: string;
  userInfoApiUrl: string;
  erreur: string;
  nbResources: number;
}>();
const nbShownCards = ref<number>(props.nbResources);
const nbCards = computed<number>(() => {
  return props.nbResources;
});

watch(
  () => nbCards.value,
  (newValue) => {
    nbShownCards.value = props.nbResources;
  },
);
const isError = computed<boolean>(() => {
  return props.erreur !== '';
});

const isEmptyFavoritesList = (event: CustomEvent): void => {
  nbHiddenCards.value++;
  nbShownCards.value = props.nbResources - nbHiddenCards.value;
};

const openModal = (event: CustomEvent): void => {
  const isModalOpen = true;
  const resourceTitle = event.detail[0];
  const resourceEditor = event.detail[1];
  const resourceDescription = event.detail[2];
  const resourceReference = event.detail[3];
  emit('open-modal', isModalOpen, resourceTitle, resourceEditor, resourceDescription, resourceReference);
};

const sendUpdateFavorite = (event: CustomEvent) => {
  const idResource = event.detail[0];
  const isFavorite = event.detail[1];
  emit('update-favorite', idResource, isFavorite);
};
</script>

<template>
  <div class="cadre-liste-ressources-mediacentre" v-if="ressources.length > 0 && nbShownCards > 0">
    <carte-ressource
      v-for="ressource in ressources"
      v-show="filtre != 'favoris' || ressource.isFavorite != false"
      :key="ressource.idRessource"
      :ressource="ressource"
      :baseApiUrl="baseApiUrl"
      :userInfoApiUrl="userInfoApiUrl"
      @updateVisibility="isEmptyFavoritesList"
      @openModal="openModal"
      @updateFav="sendUpdateFavorite"
      :filtre="filtre"
    />
  </div>

  <div class="cadre-liste-ressources-mediacentre" v-else>
    <p v-if="isError">{{ erreur }}</p>
    <p v-else-if="filtre == 'favoris'">{{ t('liste-ressources-mediacentre.no-favorite-resources') }}</p>
    <p v-else>{{ t('liste-ressources-mediacentre.no-resources') }}</p>
  </div>
</template>

<style>
.cadre-liste-ressources-mediacentre {
  overflow-y: scroll;

  height: auto;
  box-sizing: border-box;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em;
  padding: 0 2em 2em 2em;
  p {
    text-align: justify;
    padding: 1em;
  }
}

@media only screen and (max-width: 650px) {
  .cadre-liste-ressources-mediacentre {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    margin: 0;
    padding: 2em;
    justify-content: flex-start;
  }
}
</style>
