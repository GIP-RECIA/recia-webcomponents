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
export default {
  name: "page-mediacentre",
  components: {MenuMediacentre, ListeRessourcesMediacentre}
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
