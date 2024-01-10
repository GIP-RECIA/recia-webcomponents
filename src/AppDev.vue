<script setup lang="ts">
const { VITE_BASE_API_URL, VITE_PARAMETAB_API_URI, VITE_USER_INFO_API_URI } = import.meta.env;
</script>

<template>
  <param-etab
    :base-api-url="VITE_BASE_API_URL"
    :param-etab-api="VITE_PARAMETAB_API_URI"
    :user-info-api-url="VITE_USER_INFO_API_URI"
  />
</template>
