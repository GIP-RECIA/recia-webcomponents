<script setup lang="ts">
import { getFilters, getResources } from '../services/ServiceMediacentre.ts';
import type { Filtre } from '@/types/FiltreType.ts';
// import { addFavorite, removeFavorite } from '../services/ServiceMediacentreTest.ts';
import type { Ressource } from '@/types/RessourceType.ts';
import { setUserInfoApiUrl } from '@/utils/soffitUtils.ts';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const filtre = ref<string>('');
const ressources = ref<Array<Ressource>>([]);
const filtres = ref<Array<Filtre>>([]);
const chargement = ref<boolean>(false);

const props = defineProps<{
  baseApiUrl: string;
  userInfoApiUrl: string;
}>();

onMounted((): void => {
  setUserInfoApiUrl(props.userInfoApiUrl);
  getRessources();
  getFiltres();
});

const getRessources = async (): Promise<void> => {
  chargement.value = true;
  let reponse = await getResources(props.baseApiUrl);
  ressources.value = reponse.data;
  chargement.value = false;
};

const updateFiltre = (filtreSelect: string): void => {
  filtre.value = filtreSelect;
};

const getFiltres = async (): Promise<void> => {
  chargement.value = true;
  let reponse = await getFilters(props.baseApiUrl);
  filtres.value = reponse.data;
  chargement.value = false;
};
</script>

<template>
  <div class="cadre-page-mediacentre">
    <aside class="aside-page-mediacentre">
      <menu-mediacentre :filtres="filtres" />
    </aside>

    <main class="main-page-mediacentre">
      <liste-ressources :filtre="filtre" :ressources="ressources" :chargement="chargement" />
    </main>
  </div>
</template>

<style>
.cadre-page-mediacentre {
  display: flex;
  flex-direction: row;
}

.aside-page-mediacentre {
  max-width: min(25%, 290px);
  width: 100%;
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
}
</style>
