<template>
  <div id="app">
    <page-mediacentre/>
  </div>
</template>

<script>
import PageMediacentre from './PageMediacentre';

export default {
  name: 'app',
  components: {
    PageMediacentre
  }
}
</script>

<style>
/* Variables */
#app {
  /* Couleur par défaut de tout le texte */
  --ui-mediacentre-default-text-color: #303030;
}
</style>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--ui-mediacentre-default-text-color);
}
</style>
