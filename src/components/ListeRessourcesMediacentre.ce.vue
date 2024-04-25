<script setup lang="ts">
import type { Ressource } from '@/types/RessourceType.ts';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  filtre: String;
  ressources: Array<Ressource>;
  chargement: Boolean;
}>();
</script>

<template>
  <div class="cadre-liste-ressources-mediacentre">
    <div v-if="ressources.length > 0">
      <carte-ressource v-for="ressource in ressources" :key="ressource.idRessource" :ressource="ressource" />
    </div>
    <div v-else>
      <p>{{ t('no-resources') }}</p>
    </div>
  </div>
</template>

<style>
.cadre-liste-ressources-mediacentre {
  border-radius: 3px;
  box-shadow: 0 1px 3px #00000054;
  background-color: #fff;
  min-height: 269px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 22px 7px 22px 7px;
}
</style>
