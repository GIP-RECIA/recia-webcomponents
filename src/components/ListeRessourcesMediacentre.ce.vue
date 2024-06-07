<script setup lang="ts">
import type { Ressource } from '@/types/RessourceType.ts';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isModalOpen = ref(false);
const resourceTitle = ref<string>('');
const resourceEditor = ref<string>('');
const resourceDescription = ref<string | undefined>();

const emit = defineEmits(['update-favorite']);

const props = defineProps<{
  filtre: string;
  ressources: Array<Ressource>;
  chargement: boolean;
  baseApiUrl: string;
  userInfoApiUrl: string;
  erreur: string;
}>();

const isError = computed<boolean>(() => {
  return props.erreur !== '';
});

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
  <div class="cadre-liste-ressources-mediacentre" v-if="ressources.length > 0">
    <carte-ressource
      v-for="ressource in ressources"
      v-show="filtre != 'favoris' || ressource.isFavorite != false"
      :key="ressource.idRessource"
      :ressource="ressource"
      :baseApiUrl="baseApiUrl"
      :userInfoApiUrl="userInfoApiUrl"
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
    <p v-else>{{ t('liste-ressources-mediacentre.no-resources') }}</p>
  </div>
</template>

<style>
.cadre-liste-ressources-mediacentre {
  min-width: fit-content;
  max-width: 100%;
  max-height: calc(100vh - 6em);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-template-rows: auto auto 1fr 1fr 1fr auto auto;
  gap: 3em;
  row-gap: 1em;
  align-items: center;
  justify-content: center;
  justify-items: center;
  padding: 2em 4em;
  overflow-y: scroll;
}

@media (max-height: 770px) {
  .cadre-liste-ressources-mediacentre {
    height: auto;
    width: auto;
    margin-bottom: 3em;
  }
}
</style>
