<template>
  <div class="cadre-liste-ressources-mediacentre">
    <carte-ressource-mediacentre
        v-for="ressource in ressources"
        :key="ressource.idRessource"
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
    ressources: Array,
    chargement: Boolean
  },
  data: function() {
    return {};
  },
  methods: {
    t: function (key) {
      return i18n.t('message.' + this.$options.name + '.' + key); // 'message.page-ressource.{key}
    }
  }
}
</script>

<style scoped>
.cadre-liste-ressources-mediacentre {
  border-radius: 3px;
  box-shadow: 0 1px 3px #00000054;
  background-color: #fff;
  padding: 7px;
  min-height: 269px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
