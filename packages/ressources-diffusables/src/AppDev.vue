<script setup lang="ts">
const {
  VITE_BASE_API_URL,
  VITE_RESSOURCES_DIFFUSABLES_API_URI,
  VITE_RESSOURCES_DIFFUSABLES_SIZE_API_URI,
  VITE_USER_INFO_API_URI,
} = import.meta.env;
</script>

<template>
  <ui-ressources-gar
    :base-api-url="VITE_BASE_API_URL"
    :ressources-diffusables-api-uri="VITE_RESSOURCES_DIFFUSABLES_API_URI"
    :ressources-diffusables-size-api-uri="VITE_RESSOURCES_DIFFUSABLES_SIZE_API_URI"
    :user-info-api-url="VITE_USER_INFO_API_URI"
  />
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  overflow-y: auto;
}

/* Variables */
:root {
  /* Couleur des titres des cartes de ressources */
  --ui-ressources-gar-ressources-title-color: #25b2f3;

  /* Couleurs des boutons */
  --ui-ressources-gar-button-background-color: #0c9ee1;
  --ui-ressources-gar-button-background-color-success: #37b61d;
  --ui-ressources-gar-button-text-color: #ffffff;
  --ui-ressources-gar-button-text-color-success: #ffffff;

  /* Mise en forme */
  --ui-ressources-gar-button-border-radius: 24px;
  --ui-ressources-gar-card-border-radius: 16px;
  --ui-ressources-gar-margin: 10px;
  --ui-ressources-gar-padding: 16px;

  background-color: #f3f3f3;
}
</style>
