<script setup lang="ts">
import type { Ressource } from '@/types/RessourceType.ts';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isModalOpen = ref(false);
const resourceTitle = ref<string>('');
const resourceEditor = ref<string>('');
const resourceDescription = ref<string | undefined>();
const nbHiddenCards = ref<number>(0);

const emit = defineEmits(['update-favorite']);

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
  isModalOpen.value = true;
  resourceTitle.value = event.detail[0];
  resourceEditor.value = event.detail[1];
  resourceDescription.value = event.detail[2];
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
    <resource-info-modal
      v-show="isModalOpen"
      @close="isModalOpen = false"
      :title="resourceTitle"
      :editor="resourceEditor"
      :description="resourceDescription"
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: 1fr;
  grid-gap: 3em;
  overflow-y: scroll;
  padding: 0.5em 0.5em 1.5em 1em;
  margin-left: 3em;
  height: auto;
  box-sizing: border-box;
  max-height: 100%;
}

@media only screen and (max-width: 770px) {
  .cadre-liste-ressources-mediacentre {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    justify-content: center;
    overflow-y: scroll;
  }
}
</style>
