<script setup lang="ts">
const {
  VITE_MEDIACENTRE_API_URL,
  VITE_USER_INFO_API_URI,
  VITE_USER_RIGHTS_API_URI,
  VITE_USER_RESOURCE_FAVORITES_API_URI,
} = import.meta.env;
</script>

<template>
  <mediacentre-ui
    :baseApiUrl="VITE_MEDIACENTRE_API_URL"
    :userInfoApiUrl="VITE_USER_INFO_API_URI"
    :userRightsApiUrl="VITE_USER_RIGHTS_API_URI"
    :userResourceFavoritesApiUrl="VITE_USER_RESOURCE_FAVORITES_API_URI"
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
  height: 100%;
  width: 100%;
}

mediacentre-ui {
  display: block;
  height: 100%;
  width: 100%;
}
/* Variables */
:root {
  --ui-mediacentre-background-color: #ffffff;
  --ui-mediacentre-font-color: #000000;
  --ui-mediacentre-border-color: #d35959;
  --ui-mediacentre-menu-title-background-color: #ededed;
}
</style>
