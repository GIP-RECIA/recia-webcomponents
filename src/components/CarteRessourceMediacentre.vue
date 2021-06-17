<template>
  <div class="cadre-carte-ressource-mediacentre">
    <p>
      {{ ressource.idRessource }}
    </p>
  </div>
</template>

<script>
import i18n from "../i18n";

export default {
  name: "carte-ressource-mediacentre",
  props: {
    ressource: Object
  },
  data: function () {
    return {}
  },
  methods: {
    t: function (key) {
      return i18n.t('message.' + this.$options.name + '.' + key); // 'message.page-ressource.{key}
    }
  }
}
</script>

<style scoped>
.cadre-carte-ressource-mediacentre {
  margin: 30px;
  padding: 50px;
}
</style>