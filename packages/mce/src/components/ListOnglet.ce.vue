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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  list: Array<string>
  ongletCurrent: string
  classBtn: string
  userInfoApiUrl: string
}>()

const emit = defineEmits<(e: 'selectOnglet', payload: any, isSelected: boolean) => void>()

const { t } = useI18n()
const m = (key: string): string => t(`list-onglet.${key}`)

function selected(onglet: string) {
  emit('selectOnglet', onglet, false)
}

const currentIndex = ref(0)
const windowWidth = ref<number>(window.innerWidth)

const isMobile = computed(() => {
  return windowWidth.value <= 768
})

function handleResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

function nextSlide() {
  if (currentIndex.value < props.list.length - 1) {
    currentIndex.value++
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>

<template>
  <!-- <div class="list-menu">
    <div v-for="item in list" :key="item">
      <button :class="[classBtn, item == ongletCurrent ? 'active' : '']" @click="selected(item)">{{ m(item) }}</button>
    </div>
    </div> -->

  <div class="list-menu">
    <!-- Desktop View -->
    <div v-for="item in list" v-if="!isMobile" :key="item">
      <button :class="[classBtn, item === ongletCurrent ? 'active' : '']" @click="selected(item)">
        {{ m(item) }}
      </button>
    </div>

    <!-- Mobile View (Carousel) -->
    <div v-else class="carousel">
      <div class="carousel-controls">
        <button class="prev" @click="prevSlide">
          ‹
        </button>
        <div class="carousel-container">
          <div
            class="carousel-track"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="item in list"
              :key="item"
              class="carousel-content"
            >
              <button
                :class="[classBtn, item === ongletCurrent ? 'active' : '']"
                @click="selected(item)"
              >
                {{ m(item) }}
              </button>
            </div>
          </div>
        </div>
        <button class="next" @click="nextSlide">
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="css">
/*
.list-menu {
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
  padding: 20px 0;
}
.onglet-name {
  border: none;
  width: 100%;
  background-color: transparent;
  border-radius: 28px;
  padding: 14px;
}

ul {
  list-style: none;
}
.active {
  background-color: rgba(38, 68, 138, 0.18);
  color: #26448a;
  font-weight: bolder;
}

@media (max-width: 768px) {
  .list-menu {
    display: block;
  }
}*/
.list-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
}

.carousel {
  overflow: hidden;
  width: 100%;
}

.carousel-container {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-content {
  min-width: 100%;
  display: flex;
  justify-content: center;
}

button {
  border: none;
  background-color: transparent;
  border-radius: 28px;
  padding: 14px;
}

button.active {
  background-color: rgba(38, 68, 138, 0.18);
  color: #26448a;
  font-weight: bolder;
}

.carousel-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.carousel-controls button {
  border: none;
  cursor: pointer;
}

@media (min-width: 769px) {
  .carousel {
    display: none;
  }
  .list-menu {
    display: flex;
    flex-direction: row;
    gap: 40px;
  }
}
</style>
