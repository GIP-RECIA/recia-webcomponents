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

<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref } from 'vue'

const show = ref<boolean>(false)

const { VITE_CHANGEETAB_API_URI, VITE_USER_INFO_API_URI } = import.meta.env

function toggleShow() {
  show.value = true
  console.log('click: ', show.value)
}
</script>

<template>
  <button @click="toggleShow">
    Modal
  </button>
  <change-etab
    :show="show"
    :change-etab-api="VITE_CHANGEETAB_API_URI"
    :user-info-api-url="VITE_USER_INFO_API_URI"
  />
</template>

<style lang="scss">
:root {
  /* Couleurs des boutons */
  --change-etab-button-background-color: #25b2f3;
  --change-etab-button-text-color: #ffffff;

  /* Couleur de font */
  --change-etab-font-text-color: #000000;

  /* Couleur modal-mask */
  --change-etab-background-modal-overlay-color: #a0a0a06b;

  /* Couleur modal-component */
  --change-etab-background-modal-component-color: #ffffff;

  /* z-index */
  --change-etab-modal-z-index: 1055;
}
</style>
