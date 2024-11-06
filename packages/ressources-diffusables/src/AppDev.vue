<!--
 Copyright (C) 2023 GIP-RECIA, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<script setup lang="ts">
const {
  VITE_BASE_API_URL,
  VITE_RESSOURCES_DIFFUSABLES_API_URI,
  VITE_RESSOURCES_DIFFUSABLES_SIZE_API_URI,
  VITE_USER_INFO_API_URI,
} = import.meta.env
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
