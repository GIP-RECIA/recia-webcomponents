<template>
  <div
      class="cadre-carte-ressource-mediacentre"
      @mouseover="isOpened = true"
      @mouseout="isOpened = false"
      v-if="affichable() === true"
  >
    <div class="action-zone-carte-ressource-mediacentre">
      <button class="icone-bouton-carte-ressource-mediacentre" @click="toggleFavoris">
        <font-awesome-icon
            class="icone-favorite-carte-ressource-mediacentre"
            :icon="[isFavorite ? 'fas' : 'far', 'star']"
        />
      </button>
      <a class="icone-bouton-carte-ressource-mediacentre" :href="ressource.urlAccesRessource" target="_blank">
        <font-awesome-icon
            class="icone-link-carte-ressource-mediacentre"
            :icon="['fas', 'external-link-alt']"
        />
      </a>
    </div>
    <div
        class="background-carte-ressource-mediacentre"
        v-bind:style="'background-image: url(\'' + ressource.urlVignette + '\');'"
    ></div>
    <div
        class="block-info-carte-ressource-mediacentre"
        :class="{opened: isOpened}"
    >
      <h3
          class="titre-carte-ressource-mediacentre"
          :class="{opened: isOpened}"
      >{{ ressource.nomRessource }}</h3>
      <p
          class="texte-carte-ressource-mediacentre"
      ><i>{{ premiereLettreCapitale(ressource.typePresentation.nom) }}</i><br>{{ ressource.description }}</p>
      <p class="footer-carte-ressource-mediacentre">
        <span class="nom-editeur-carte-ressource-mediacentre">{{ ressource.nomEditeur }}</span>
        <span class="id-ressource-carte-ressource-mediacentre">{{ ressource.idRessource }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import i18n from "../i18n";
import '@/icons';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "carte-ressource-mediacentre",
  components: {
    FontAwesomeIcon
  },
  props: {
    filtre: String,
    ressource: Object
  },
  data: function () {
    return {
      isOpened: false,
      isFavorite: false
    }
  },
  mounted() {
    this.isFavorite = this.ressource.favorite;
  },
  methods: {
    t: function (key) {
      return i18n.t('message.' + this.$options.name + '.' + key); // 'message.page-ressource.{key}
    },
    toggleFavoris() {
      if (this.isFavorite === false) {
        this.isFavorite = true;
        this.$parent.ajouterFavoris(this.ressource.idRessource);
      } else {
        this.isFavorite = false;
        this.$parent.retirerFavoris(this.ressource.idRessource);
      }
    },
    affichable() { // TODO: IMPLÉMENTER UNE FONCTION QUI VÉRIFIE QUE LA RESSOURCE EST AFFICHABLE SELON LE FILTRE SÉLECTIONNÉ
      switch (this.filtre) {
        case 'favoris':
          return this.isFavorite;
        default:
          return true;
      }
    },
    premiereLettreCapitale(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }
}
</script>

<style scoped>
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
  cursor:pointer;
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
  -webkit-transition: all .15s cubic-bezier(0.67,0.2,0.53,0.91);
  -o-transition: all .15s cubic-bezier(0.67,0.2,0.53,0.91);
  transition: all .15s cubic-bezier(0.67,0.2,0.53,0.91);
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(100% - 24px);
  background: rgba(0,0,0,0.5);
  padding: 12px;
  z-index: 0;
  color: white;
  text-align: left;
  font-family: 'Roboto Condensed',sans-serif;
}

.block-info-carte-ressource-mediacentre.opened {
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -webkit-transform: translateY(0);
}

.titre-carte-ressource-mediacentre {
  margin-top: 6px;
  margin-bottom: 5px;
  transition: all .15s cubic-bezier(0.67,0.2,0.53,0.91);
}

.titre-carte-ressource-mediacentre.opened {
  margin-top: 38px;
  margin-bottom: 5px;
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
  background-color: rgba(243,243,243,1);
}

.texte-carte-ressource-mediacentre {
  font-size: smaller;
}
</style>
