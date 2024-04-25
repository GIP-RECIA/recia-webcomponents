<script setup lang="ts">
import { addFavorite, removeFavorite } from '@/services/ServiceMediacentre.ts';
import type { Ressource } from '@/types/RessourceType.ts';
import { setUserInfoApiUrl } from '@/utils/soffitUtils.ts';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const props = defineProps<{
  filtre: string;
  ressource: Ressource;
  userInfoApiUrl: string;
  baseApiUrl: string;
}>();

const isOpened = ref<boolean>(false);
const isFavorite = ref<boolean>(false);

//   // voir pour set si la ressource est en favori
//   //isFavorite.value = ressource.favorite;

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

// affichable() {
//     // TODO: IMPLÉMENTER UNE FONCTION QUI VÉRIFIE QUE LA RESSOURCE EST AFFICHABLE SELON LE FILTRE SÉLECTIONNÉ
//     switch (this.filtre) {
//       case 'favoris':
//         return this.isFavorite;
//       default:
//         return true;
//     }
//   },
</script>

<template>
  <div class="cadre-carte-ressource-mediacentre" @mouseover="isOpened = true" @mouseout="isOpened = false">
    <!-- v-if="affichable() === true" -->
    <div class="action-zone-carte-ressource-mediacentre">
      <button class="icone-bouton-carte-ressource-mediacentre" @click="toggleFavoris">
        <font-awesome-icon
          class="icone-favorite-carte-ressource-mediacentre"
          :icon="[isFavorite ? 'fas' : 'far', 'star']"
        />
      </button>
      <a class="icone-bouton-carte-ressource-mediacentre" :href="ressource.urlAccesRessource" target="_blank">
        <font-awesome-icon class="icone-link-carte-ressource-mediacentre" :icon="['fas', 'arrow-up-from-square']" />
      </a>
    </div>
    <div
      class="background-carte-ressource-mediacentre"
      :style="'background-image: url(\'' + props.ressource.urlVignette + '\');'"
    ></div>
    <div class="block-info-carte-ressource-mediacentre" :class="{ opened: isOpened }">
      <h3 class="titre-carte-ressource-mediacentre" :class="{ opened: isOpened }">{{ ressource.nomRessource }}</h3>
      <p class="texte-carte-ressource-mediacentre">
        <!-- voir si besoin d'afficher tous les types de présentation -->
        <i class="type-presentation-ressource-mediacentre">{{ $props.ressource.typePresentation[0].nom }}</i>
        <br />
        {{ ressource.description }}
      </p>
      <p class="footer-carte-ressource-mediacentre">
        <span class="nom-editeur-carte-ressource-mediacentre">{{ ressource.nomEditeur }}</span>
        <span class="id-ressource-carte-ressource-mediacentre">{{ ressource.idRessource }}</span>
      </p>
    </div>
  </div>
</template>

<style>
.cadre-carte-ressource-mediacentre {
  width: 30%;
  max-width: 538px;
  min-width: 260px;
  height: 230px;
  margin: 20px 12px 20px 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px #00000054;
}

.action-zone-carte-ressource-mediacentre {
  position: absolute;
  width: 100%;
  height: 48px;
  line-height: 48px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.icone-bouton-carte-ressource-mediacentre {
  background: none;
  border: none;
  height: 48px;
  width: 48px;
  color: #b4b4b4;
  padding: 0;
  cursor: pointer;
}

.icone-favorite-carte-ressource-mediacentre {
  width: 50%;
  height: 50%;
}

.icone-link-carte-ressource-mediacentre {
  width: 40%;
  height: 40%;
}

.block-info-carte-ressource-mediacentre {
  position: absolute;
  display: flex;
  flex-flow: column;
  -moz-transform: translateY(175px);
  -ms-transform: translateY(175px);
  -webkit-transform: translateY(175px);
  transform: translateY(175px);
  -webkit-transition: all 0.15s cubic-bezier(0.67, 0.2, 0.53, 0.91);
  -o-transition: all 0.15s cubic-bezier(0.67, 0.2, 0.53, 0.91);
  transition: all 0.15s cubic-bezier(0.67, 0.2, 0.53, 0.91);
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(100% - 24px);
  background: rgba(0, 0, 0, 0.5);
  padding: 12px;
  z-index: 0;
  color: white;
  text-align: left;
  font-family: 'Roboto Condensed', sans-serif;
}

.block-info-carte-ressource-mediacentre.opened {
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -webkit-transform: translateY(0);
}

.titre-carte-ressource-mediacentre {
  margin-top: 6px;
  margin-bottom: 5px;
  transition: all 0.15s cubic-bezier(0.67, 0.2, 0.53, 0.91);
}

.titre-carte-ressource-mediacentre.opened {
  margin-top: 38px;
  margin-bottom: 5px;
}

.type-presentation-ressource-mediacentre {
  text-transform: capitalize;
}

.footer-carte-ressource-mediacentre {
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  font-size: smaller;
}

.nom-editeur-carte-ressource-mediacentre {
  font-weight: bold;
}

.id-ressource-carte-ressource-mediacentre {
  font-size: smaller;
  color: #000;
}

.id-ressource-carte-ressource-mediacentre::before {
  content: 'Ref : ';
}

.background-carte-ressource-mediacentre {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: rgba(243, 243, 243, 1);
}

.texte-carte-ressource-mediacentre {
  font-size: smaller;
}
</style>
