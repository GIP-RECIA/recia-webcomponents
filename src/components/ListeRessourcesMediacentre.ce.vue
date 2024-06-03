<script setup lang="ts">
import type { Ressource } from '@/types/RessourceType.ts';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isModalOpen = ref(false);
const resourceTitle = ref<string>('');
const resourceEditor = ref<string>('');
const resourceDescription = ref<string | undefined>();
const props = defineProps<{
  filtre: String;
  ressources: Array<Ressource>;
  chargement: Boolean;
  baseApiUrl: string;
  userInfoApiUrl: string;
}>();

const openModal = (event: CustomEvent): void => {
  isModalOpen.value = true;
  resourceTitle.value = event.detail[0];
  resourceEditor.value = event.detail[1];
  resourceDescription.value = event.detail[2];
};
</script>

<template>
  <div class="cadre-liste-ressources-mediacentre" v-if="ressources.length > 0">
    <carte-ressource
      v-for="ressource in ressources"
      :key="ressource.idRessource"
      :ressource="ressource"
      :baseApiUrl="baseApiUrl"
      :userInfoApiUrl="userInfoApiUrl"
      @openModal="openModal"
    />ss
    <resource-info-modal
      v-show="isModalOpen"
      @close="isModalOpen = false"
      :title="resourceTitle"
      :editor="resourceEditor"
      :description="resourceDescription"
    />
  </div>

  <div class="cadre-liste-ressources-mediacentre" v-else>
    <p>{{ t('liste-ressources-mediacentre.no-resources') }}</p>
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
