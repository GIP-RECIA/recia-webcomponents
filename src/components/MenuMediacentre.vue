<template>
  <div class="cadre-menu-mediacentre">
    <p>
      Menu
    </p>
  </div>
</template>

<script>
import i18n from "../i18n";

export default {
  name: "menu-mediacentre",
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

</style>
