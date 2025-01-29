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
import type { Item } from '@/types/Item.ts'
import i18n from '@/plugins/i18n.ts'
import { capitalize } from 'vue'

defineProps<{
  item: Item
}>()

const { t, d } = i18n.global
</script>

<template>
  <i18n-host>
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-content-edition">
          <div class="modal-content-edition-by">
            {{ t('text.creation-info.create-by') }}
            <div :style="{ fontWeight: 'bold' }">
              {{ capitalize(item.createdBy.displayName) }}
            </div>
          </div>
          <div class="modal-content-edition-when">
            {{ t('text.creation-info.when', { date: d(item.createdDate, 'medium'), datetime: d(item.createdDate, 'datetime') }) }}
          </div>
        </div>
        <div class="modal-content-edition">
          <div class="modal-content-edition-by">
            {{ t('text.creation-info.update-by') }}
            <div :style="{ fontWeight: 'bold' }">
              {{ capitalize(item.lastModifiedBy.displayName) }}
            </div>
          </div>
          <div class="modal-content-edition-when">
            {{ t('text.creation-info.when', { date: d(item.lastModifiedDate, 'medium'), datetime: d(item.lastModifiedDate, 'datetime') }) }}
          </div>
        </div>
        <div class="modal-content-edition">
          <div class="modal-content-edition-by">
            {{ t('text.creation-info.validate-by') }}
            <div :style="{ fontWeight: 'bold' }">
              {{ capitalize(item.validatedBy.displayName) }}
            </div>
          </div>
          <div class="modal-content-edition-when">
            {{ t('text.creation-info.when', { date: d(item.validatedDate, 'medium'), datetime: d(item.validatedDate, 'datetime') }) }}
          </div>
        </div>
      </div>
    </div>
  </i18n-host>
</template>

<style scoped lang="scss">
@use '@/assets/global.scss' as *;

* {
  box-sizing: border-box;
}

.modal-container {
  height: auto;
  max-width: 400px;
  padding: 0.5rem;
  padding-right: 2.5rem;
  border-radius: 10px 20px 10px 10px;
  background-color: white; /* Couleur semi-transparente */
  display: grid;
  grid-template-columns: auto 1fr;
  box-shadow: rgba(0, 0, 0, 0.06) 0 0 5px 3px;
  z-index: 100;
  align-items: center;
}

.modal-content {
  color: black;
  display: flex;
  flex-direction: column;
  font-family: $dm-sans;
  font-size: 14px;
  padding: 1.5rem;
  gap: 1rem;
}
.modal-content-edition {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.modal-content-edition-by {
  display: flex;
  gap: 5px;
  text-wrap: nowrap;
}

.modal-content-edition-when {
  font-size: 12px;
}
</style>
