<script setup lang="ts">
import ResourceInfoModal from './ResourceInfoModalMediacentre.ce.vue';
import { addFavorite, removeFavorite } from '@/services/ServiceMediacentre.ts';
import type { Ressource } from '@/types/RessourceType.ts';
import { setUserInfoApiUrl } from '@/utils/soffitUtils.ts';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const isFavorite = ref<boolean>(false);

const props = defineProps<{
  ressource: Ressource;
  userInfoApiUrl: string;
  baseApiUrl: string;
}>();

onMounted((): void => {
  setUserInfoApiUrl(props.userInfoApiUrl);
});

const toggleFavoris = (): void => {
  if (isFavorite.value === false) {
    isFavorite.value = true;
    ajouterFavoris(props.ressource.idRessource);
  } else {
    isFavorite.value = false;
    retirerFavoris(props.ressource.idRessource);
  }
};

const ajouterFavoris = async (idRessource: string) => {
  try {
    await addFavorite(props.baseApiUrl, idRessource);
  } catch (error: any) {
    console.log(error);
  }
};

const retirerFavoris = async (idRessource: string) => {
  try {
    await removeFavorite(props.baseApiUrl, idRessource);
  } catch (error: any) {
    console.log(error);
  }
};
</script>

<template>
  <a :href="ressource.urlAccesRessource" target="_blank">
    <div class="cadre-carte-ressource-mediacentre">
      <div class="background-carte-ressource-mediacentre">
        <div class="action-zone-carte-ressource-mediacentre">
          <button class="icone-bouton-carte-ressource-mediacentre" @click.prevent="toggleFavoris">
            <font-awesome-icon
              class="icone-favorite-carte-ressource-mediacentre"
              :icon="[isFavorite ? 'fas' : 'far', 'star']"
            />
          </button>
        </div>
        <img class="resource-image" :src="props.ressource.urlVignette" :alt="ressource.nomRessource" />
      </div>
      <div class="resource-name">
        <h5>
          {{ ressource.nomRessource }}
        </h5>
        <div>
          <button
            class="icone-bouton-carte-ressource-mediacentre"
            @click.prevent="$emit('openModal', ressource.nomRessource, ressource.nomEditeur, ressource.description)"
            style="background: none; border: none"
          >
            <font-awesome-icon class="info-icon" :icon="['fas', 'circle-info']" />
          </button>
        </div>
      </div>
    </div>
  </a>
</template>

<style lang="scss">
a {
  text-decoration: none;
}

.cadre-carte-ressource-mediacentre {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  max-width: 538px;
  min-width: 260px;
  height: 250px;
  margin: 20px 12px 20px 12px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 15px;
  border-top: 0.9em solid $ui-mediacentre-primary-color;
  box-shadow:
    13px 13px 39px #c1c1c1,
    -13px -13px 39px #ffffff;
  background-color: #ffffff;
}

.background-carte-ressource-mediacentre {
  position: relative;
  width: 90%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  text-align: center;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  padding: 1em;
}

.action-zone-carte-ressource-mediacentre {
  position: absolute;
  width: 90%;
  height: 48px;
  line-height: 48px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: right;
}

.icone-bouton-carte-ressource-mediacentre {
  display: flex;
  justify-content: center;
  background: none;
  border: none;
  height: fit-content;
  width: fit-content;
  color: #b4b4b4;
  padding: 0;
  cursor: pointer;
}

.icone-help-carte-ressource-mediacentre {
  display: flex;
  justify-content: center;
  background: none;
  border: none;
  height: 48px;
  width: 48px;
  padding: 0;
  cursor: pointer;
}
.icone-favorite-carte-ressource-mediacentre {
  width: 1.8em;
  height: 1.8em;
}

.icone-info-carte-ressource-mediacentre {
  width: 60%;
  height: 60%;
}

.resource-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.info-icon {
  width: 1.5em;
  height: 1.5em;
  color: black;
}
.resource-name {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0;
  padding: 0 0.5em;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  max-width: 538px;

  h5 {
    color: black;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* Nombre de lignes à afficher */
    -webkit-box-orient: vertical;
    overflow: hidden; /* Cache le contenu qui dépasse */
    text-overflow: ellipsis; /* Ajoute des points de suspension */
  }
}
</style>
