<script setup lang="ts">
import type { ItemVO } from '@/types/ItemVO.ts'
import { defineProps, ref } from 'vue'

// Props
const props = defineProps<{
  item: ItemVO
}>()

const baseUrl = import.meta.env.VITE_BASE_API_URL

// État pour la modal
const showModal = ref(false)

// Méthodes
function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <article @click="openModal">
    <div class="card-img">
      <img class="img" :src="baseUrl.concat(props.item.article.enclosure)" alt="">
    </div>
    <div class="article-wrapper">
      <div class="source">
        <p>{{ props.item.source }}</p>
      </div>

      <div class="card-body">
        <p class="card-body-title">
          {{ props.item.article.title }}
        </p>
        <p class="card-body-description">
          {{ props.item.article.description }}
        </p>
      </div>
    </div>
  </article>

  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <preview-ui :item="item" />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

article {
  display: flex;
  height: 200px;
  width: auto;
  border-radius: 10px;
  flex-direction: row;
  position: relative;
  background: #fff;
  transform-origin: center;
  transition: all 0.01s ease-in-out;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.06) 0 0 5px 1px;
  border: 2px solid transparent; /* Bordure par défaut */
  cursor: pointer;
}

article:hover {
  border: 2px solid #0062bc; /* Bordure bleue au survol */
}

article:hover .card-body-title {
  color: #0062bc; /* Couleur bleue au survol */
}

.card-img {
  flex: 0 0 20%; /* L'image prend 20% de la largeur de la carte */
  max-width: 20%; /* Assure que l'image ne dépasse pas 20% */
  height: auto; /* Pour garder les proportions de l'image */
  display: flex;
}

.img {
  width: 100%;
  height: auto; /* Remplit complètement la div */
  object-fit: cover;
  transform-origin: center;
  transform: scale(var(--img-scale));
  transition: transform 0.1s ease-in-out;
}

.card-body-title {
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #1e1e1e; /* Couleur par défaut */
  transition: color 0.1s ease-in-out;
}

.card-body-description {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
}

.source {
  font-family: 'DM Sans', sans-serif;
  color: #1e1e1e;
  font-size: 12px;
  opacity: 75%;
}

.article-wrapper {
  padding: 1rem;
  border: #1e1e1e;
}

article:has(:hover, :focus) {
  --img-scale: 1.1;
  --title-color: #28666e;
  --link-icon-translate: 0;
  --link-icon-opacity: 1;
}
</style>
