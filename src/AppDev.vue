<script setup lang="ts">
const { VITE_BASE_API_URL, VITE_PARAMETAB_API_URI, VITE_USER_INFO_API_URI, VITE_DEFAULT_LOGO_ICON } = import.meta.env;
</script>

<template>
  <param-etab
    :base-api-url="VITE_BASE_API_URL"
    :param-etab-api="VITE_PARAMETAB_API_URI"
    :user-info-api-url="VITE_USER_INFO_API_URI"
    :default-logo-icon="VITE_DEFAULT_LOGO_ICON"
  />
</template>

<style lang="scss">
:root {
  /* Couleurs des boutons */
  --param-etab-button-background-color: #25b2f3;
  --param-etab-button-text-color: #ffffff;

  /* Input text focus */
  --param-etab-input-text-focus-color: #25b2f3;
}
</style>
