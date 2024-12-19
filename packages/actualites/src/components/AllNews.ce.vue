<script setup lang="ts">
import type { PaginatedResult } from '@/types/PaginatedResult.ts'
import { getPaginatedNews } from '@/services/NewsService.ts'
import { PageOrigin } from '@/types/PageOrigin.ts'
import { initToken } from '@/utils/axiosUtils.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onBeforeMount, ref } from 'vue'

const props = defineProps<{
  userInfoApiUrl: string
}>()

const result = ref<PaginatedResult>()
const source = ref()
const rubriques = ref<Array<number>>()
const currentPage = ref() // Page courante
const totalPages = ref() // Nombre total de pages

onBeforeMount(async () => {
  try {
    console.log('onBeforeMount')
    await initToken(props.userInfoApiUrl)

    // await getprops.userInfoApiUrlConfig(props.baseApiUrl)
    result.value = await getPaginatedNews(2, currentPage.value > 1 ? currentPage.value : undefined, source.value ? source.value : undefined, (rubriques.value) ? rubriques.value : undefined)
    currentPage.value = result.value?.pageIndex
    totalPages.value = result.value?.totalPages
  }
  catch (e: any) {
    console.error(e)
  }
})

function handleToggleChange(newState: string) {
  console.log(`Le toggle switch est maintenant à l'état : ${newState}`)
}

function handleSourceChange(s: CustomEvent) {
  console.log(`s : ${s.detail[0]}`)
  source.value = s.detail[0]
  fetchPaginatedNews()
  console.log(`source.value : ${source.value}`)
}

function handlePageChange(page: CustomEvent) {
  currentPage.value = page.detail[0]
  fetchPaginatedNews()
}

async function fetchPaginatedNews() {
  try {
    result.value = await getPaginatedNews(2, currentPage.value > 1 ? currentPage.value : undefined, source.value ? source.value : undefined, (rubriques.value) ? rubriques.value : undefined)
    totalPages.value = result.value?.totalPages || 1
  }
  catch (e: any) {
    console.error(e)
  }
}
</script>

<template>
  <div class="allNews-container">
    <div class="allNews-header">
      <div class="allNews-header-title">
        <button class="carousel-header-see-all-news">
          <FontAwesomeIcon class="arrow-left" :icon="['fas', 'arrow-left']" />
        </button>
        <h1>Toutes les actualités</h1>
      </div>

      <custom-toggle-switch
        :states="['all', 'read', 'unread']"
        @change="handleToggleChange"
      />
    </div>

    <div class="allNews-filter">
      <p>Filtres</p>
      <news-filter-section :actualites="result?.actualite" @update-model-value="handleSourceChange" />
    </div>

    <div class="allNews-body">
      <div v-for="(item, index) in result?.actualite?.items" :key="index" class="card-wrapper">
        <news-card :item="item" :rubriques="result?.actualite?.rubriques" :page-origin="PageOrigin.ALL" />
      </div>
    </div>
    <div class="allNews-footer">
      <page-selector
        :total-pages="totalPages"
        :max-visible-pages="5"
        @update-model-value="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.allNews-container {
  display: grid;
  margin-bottom: 10%;
}

.allNews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.allNews-header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
  font-family: 'Sora', sans-serif;
}

.carousel-header-see-all-news {
  border: none;
  background: none;
}

.arrow-left {
  width: 20px;
  border: none;
  background: none;
}

.allNews-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Deux colonnes égales */
  gap: 1.5rem; /* Espacement entre les cartes */
  margin-top: 2rem;
}

.allNews-footer {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.card-wrapper {
  border: none;
  border-radius: 8px;
  background-color: #fff;
}
</style>
