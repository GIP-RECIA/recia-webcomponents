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
  VITE_BASE_API_URL,
  VITE_USER_NEWS_URI,
  VITE_GET_ITEM_URI,
  VITE_GET_NEWS_READING_URI,
  VITE_SET_NEWS_READING_URI,
} = import.meta.env
</script>

<template>
  <div class="app-dev">
    <carrousel-ui
      :user-info-api-url="VITE_USER_INFO_API_URI"
      :base-url="VITE_BASE_API_URL"
      :get-user-news-url="VITE_USER_NEWS_URI"
      :get-item-by-id-url="VITE_GET_ITEM_URI"
      :get-news-reading-informations-url="VITE_GET_NEWS_READING_URI"
      :set-reading-url="VITE_SET_NEWS_READING_URI"
    />
    <all-news
      :user-info-api-url="VITE_USER_INFO_API_URI"
      :base-url="VITE_BASE_API_URL"
      :get-user-news-url="VITE_USER_NEWS_URI"
      :get-item-by-id-url="VITE_GET_ITEM_URI"
      :get-news-reading-informations-url="VITE_GET_NEWS_READING_URI"
      :set-reading-url="VITE_SET_NEWS_READING_URI"
    />
  </div>
</template>

<style lang="scss">
.app-dev {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%; // 80% de la largeur totale (10% de marge de chaque côté)
  margin: 0 auto;
  gap: 2rem;
}

all-news,
carrousel-ui {
  width: 100%;
}

@media (max-width: 768px) {
  .app-dev {
    width: 90%;
  }
}
</style>
