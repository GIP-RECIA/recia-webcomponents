<template>
  <div class="cadre-page-mediacentre">
    <aside class="aside-page-mediacentre">
      <menu-mediacentre/>
    </aside>
    <main class="main-page-mediacentre">
      <liste-ressources-mediacentre
        v-bind:ressources="ressources"
        v-bind:chargement="chargement"
      />
    </main>
  </div>
</template>

<script>
import ListeRessourcesMediacentre from "./ListeRessourcesMediacentre";
import MenuMediacentre from "./MenuMediacentre";
import i18n from "../i18n";

export default {
  name: "page-mediacentre",
  components: {
    menuMediacentre: MenuMediacentre,
    listeRessourcesMediacentre: ListeRessourcesMediacentre
  },
  props: {
    baseApiUrl: {
      type: String,
      default: process.env.VUE_APP_BASE_API_URI
    },
    userInfoApiUrl: {
      type: String,
      default: process.env.VUE_APP_USER_INFO_API_URI
    }
  },
  data: function() {
    return {
      filtre: '',
      ressources: [],
      erreur: '',
      chargement: false
    };
  },
  methods: {
    t: function (key) {
      return i18n.t('message.' + this.$options.name + '.' + key); // 'message.page-ressource.{key}
    },
    changementFiltre(selection) {
      this.filtre = selection;
    }
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.ressources.push(
          {
            idRessource: i
          }
      );
    }
  }
}
</script>

<style scoped>
.cadre-page-mediacentre {
  display: flex;
  flex-direction: row;
}

.aside-page-mediacentre {
  max-width: 25%;
  width: 100%;
}

.main-page-mediacentre {
  max-width: 75%;
  width: 100%;
  height: 100%;
}
</style>
