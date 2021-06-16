<template>
  <div class="cadre-liste-ressources-mediacentre">
    <p>
      Liste des ressources
    </p>
  </div>
</template>

<script>
import i18n from "../i18n";

export default {
  name: "liste-ressources-mediacentre",
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
}
</style>
