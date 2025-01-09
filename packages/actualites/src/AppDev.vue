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
  VITE_USER_INFO_API_URI,
} = import.meta.env
</script>

<template>

  <div class="app-dev">
    <carrousel-ui :user-info-api-url="VITE_USER_INFO_API_URI" />
    <all-news :user-info-api-url="VITE_USER_INFO_API_URI" />
  </div>
</template>

<style>
.app-dev {
  display: flex;
  flex-direction: column;
  width: 70%; /* 80% de la largeur totale (10% de marge de chaque côté) */
  justify-content: center; /* Centre horizontalement le contenu interne */
  align-items: center; /* Centre verticalement */
  margin: 0 auto; /* Ajoute automatiquement 10% de marge blanche de chaque côté */
  background-color: #fff; /* (Optionnel) Ajoutez une couleur de fond si nécessaire */
  gap: 2rem;
}
</style>
