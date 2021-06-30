<template>
  <div class="cadre-liste-ressources-mediacentre">
    <carte-ressource-mediacentre
        v-for="ressource in ressources"
        :key="ressource.idRessource"
        v-bind:filtre="filtre"
        v-bind:ressource="ressource"
    />
  </div>
</template>

<script>
import i18n from "../i18n";
import CarteRessourceMediacentre from "./CarteRessourceMediacentre";

export default {
  name: "liste-ressources-mediacentre",
  components: {CarteRessourceMediacentre},
  props: {
    filtre: String,
    ressources: Array,
    chargement: Boolean
  },
  data: function() {
    return {};
  },
  methods: {
    t: function (key) {
      return i18n.t('message.' + this.$options.name + '.' + key); // 'message.page-ressource.{key}
    },
    ajouterFavoris(idRessource) {
      this.$parent.ajouterFavoris(idRessource);
    },
    retirerFavoris(idRessource) {
      this.$parent.retirerFavoris(idRessource);
    }
  }
}
</script>

<style scoped>
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
