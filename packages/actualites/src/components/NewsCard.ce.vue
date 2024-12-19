<script setup lang="ts">
import type { ItemVO } from '@/types/ItemVO.ts'
import type { Rubrique } from '@/types/Rubrique.ts'
import { PageOrigin } from '@/types/PageOrigin.ts'
import { defineProps, ref } from 'vue'

// Props
const props = defineProps<{
  item: ItemVO
  rubriques: Array<Rubrique>
  pageOrigin: PageOrigin
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

function isPageOriginCarrousel() {
  return props.pageOrigin === PageOrigin.CARROUSEL
}

function isPageOriginAll() {
  return props.pageOrigin === PageOrigin.ALL
}
</script>

<template>
  <article @click="openModal">
    <div class="card-img">
      <img class="img" :src="baseUrl.concat(props.item.article.enclosure)" alt="">
    </div>
    <div class="article-wrapper">
      <div v-if="isPageOriginCarrousel()" class="source">
        <p>{{ props.item.source }}</p>
      </div>

      <div v-if="isPageOriginAll()" class="source">
        <p>{{ props.item.article.pubDate }}</p>
        <p>lu</p>
      </div>

      <div class="card-body-title">
        {{ props.item.article.title }}
      </div>
      <div class="card-body-description">
        <p class="description">
          {{ props.item.article.description }}
        </p>
      </div>
      <div v-if="isPageOriginAll()" class="source all">
        <p>{{ props.item.source }}</p>
      </div>
    </div>
  </article>

  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <preview-ui :item="props.item" :rubriques="props.rubriques" />
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

article {
  display: flex;
  height: 200px;
  width: auto;
  border-radius: 10px;
  flex-direction: row;
  transform-origin: center;
  transition: all 0.01s ease-in-out;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.06) 0 0 5px 1px;
  cursor: pointer;

  --description-font-size: 12px;
  --description-font-line-heigth: 1.2;
}

article:hover {
  outline: 2px solid #0062bc;
}

article:hover .card-body-title {
  color: #0062bc; /* Couleur bleue au survol */
}

.card-img {
  display: flex;
  flex: 0 0 auto;
  height: 100%;
  aspect-ratio: 2 / 4;
  overflow: hidden;
  position: relative;
  justify-content: center;
}

.img {
  height: 100%; /* Remplit complètement la div */
  object-fit: cover;
  transform-origin: center;
  transform: scale(var(--img-scale));
}

.card-body-title {
  flex-shrink: 0;
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #1e1e1e; /* Couleur par défaut */
  transition: color;
  height: auto;
}

.card-body-description {
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
}

.description {
  display: -webkit-box; /* Nécessaire pour limiter les lignes */
  -webkit-box-orient: vertical;
  font-family: 'DM Sans', sans-serif;
  font-size: var(--description-font-size);
  line-height: var(--description-font-line-heigth);
  text-overflow: ellipsis;
  overflow: hidden;
}

.source {
  flex-shrink: 0;
  height: auto;
  display: flex;
  font-family: 'DM Sans', sans-serif;
  color: #1e1e1e;
  font-size: 12px;
  opacity: 75%;
  justify-content: space-between;
}

.source.all {
  justify-content: right;
}

.article-wrapper {
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  padding-left: 1rem;
  border: #1e1e1e;
}

article:has(:hover, :focus) {
  --img-scale: 1.3;
  --title-color: #0062bc;
}
</style>
