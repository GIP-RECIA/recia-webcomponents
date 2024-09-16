<script setup lang="ts">
import { ref } from 'vue';

const show = ref<boolean>(false);

const { VITE_CHANGEETAB_API_URI, VITE_USER_INFO_API_URI } = import.meta.env;

const toggleShow = () => {
  show.value = true;
  console.log('click: ', show.value);
};
</script>

<template>
  <button @click="toggleShow">Modal</button>
  <change-etab
    :show="show"
    :change-etab-api="VITE_CHANGEETAB_API_URI"
    :user-info-api-url="VITE_USER_INFO_API_URI"
  ></change-etab>
</template>

<style lang="scss">
:root {
  /* Couleurs des boutons */
  --change-etab-button-background-color: #25b2f3;
  --change-etab-button-text-color: #ffffff;
}
</style>
