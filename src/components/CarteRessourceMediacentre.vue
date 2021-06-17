<template>
  <div class="cadre-carte-ressource-mediacentre" v-bind:style="'background-image: url(\'' + ressource.backgroundImageUrl + '\');' ">
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
  width: 30%;
  max-width: 538px;
  min-width: 260px;
  height: 230px;
  margin: 20px 12px 20px 12px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: rgba(243,243,243,1);
}
</style>
