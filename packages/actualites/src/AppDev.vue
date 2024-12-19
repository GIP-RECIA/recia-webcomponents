<script setup lang="ts">
const {
  VITE_USER_INFO_API_URI,
} = import.meta.env
</script>

<template>
  <carrousel-ui :user-info-api-url="VITE_USER_INFO_API_URI" />
  <div class="app-dev">
    <all-news :user-info-api-url="VITE_USER_INFO_API_URI" />
  </div>
</template>

<style>
.app-dev {
  display: flex;
  width: 70%; /* 80% de la largeur totale (10% de marge de chaque côté) */
  justify-content: center; /* Centre horizontalement le contenu interne */
  align-items: center; /* Centre verticalement */
  margin: 0 auto; /* Ajoute automatiquement 10% de marge blanche de chaque côté */
  background-color: #fff; /* (Optionnel) Ajoutez une couleur de fond si nécessaire */
  gap: 100px;
}
</style>
