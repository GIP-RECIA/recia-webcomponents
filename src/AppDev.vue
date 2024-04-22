<script setup lang="ts">
const { VITE_BASE_API_URL, VITE_USER_INFO_API_URI } = import.meta.env;
</script>

<template>
  <xxx :base-api-url="VITE_BASE_API_URL" :user-info-api-url="VITE_USER_INFO_API_URI" />
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
  background-color: #f3f3f3;
}
</style>
