<script setup lang="ts">
import type { Ressource } from '@/types/RessourceType.ts';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  filtre: String;
  ressources: Array<Ressource>;
  chargement: Boolean;
  baseApiUrl: string;
  userInfoApiUrl: string;
}>();
</script>

<template>
  <div class="cadre-liste-ressources-mediacentre" v-if="ressources.length > 0">
    <carte-ressource
      v-for="ressource in ressources"
      :key="ressource.idRessource"
      :ressource="ressource"
      :baseApiUrl="baseApiUrl"
      :userInfoApiUrl="userInfoApiUrl"
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
