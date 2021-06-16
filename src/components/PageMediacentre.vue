<template>
  <div class="cadre-page-mediacentre">
    <aside class="aside-page-mediacentre">
      <menu-mediacentre/>
    </aside>
    <main class="main-page-mediacentre">
      <liste-ressources-mediacentre/>
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
  data: function() {
    return {
      ressources: [],
      erreur: '',
      chargement: false
    };
  },
  methods: {
    t: function (key) {
      return i18n.t('message.' + this.$options.name + '.' + key); // 'message.page-ressource.{key}
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
