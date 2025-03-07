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
import { capitalize } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  item: Item
}>()

const { t, d } = useI18n()
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-content-edition">
        <div
          class="modal-content-edition-by"
          v-html="t('text.creation-info.create-by', { name: `<strong>${capitalize(item.createdBy.displayName)}</strong>` })"
        />
        <div class="modal-content-edition-when">
          {{ t('text.creation-info.when', { date: d(item.createdDate, 'medium'), datetime: d(item.createdDate, 'datetime') }) }}
        </div>
      </div>
      <div class="modal-content-edition">
        <div
          class="modal-content-edition-by"
          v-html="t('text.creation-info.update-by', { name: `<strong>${capitalize(item.lastModifiedBy.displayName)}</strong>` })"
        />
        <div class="modal-content-edition-when">
          {{ t('text.creation-info.when', { date: d(item.lastModifiedDate, 'medium'), datetime: d(item.lastModifiedDate, 'datetime') }) }}
        </div>
      </div>
      <div class="modal-content-edition">
        <div
          class="modal-content-edition-by"
          v-html="t('text.creation-info.validate-by', { name: `<strong>${capitalize(item.validatedBy.displayName)}</strong>` })"
        />
        <div class="modal-content-edition-when">
          {{ t('text.creation-info.when', { date: d(item.validatedDate, 'medium'), datetime: d(item.validatedDate, 'datetime') }) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

.modal {
  height: auto;
  max-width: 400px;
  padding: 32px;
  padding-right: 58px;
  border-radius: 10px;
  border-top-right-radius: 20px;
  background-color: white; // Couleur semi-transparente
  box-shadow: $shadow-strong rgba(0, 0, 0, 0.25);
  z-index: 100;
  align-items: center;

  &-content {
    display: flex;
    flex-direction: column;
    font-family: $dm-sans;
    font-size: 14px;
    gap: 12px;

    &-edition {
      line-height: 24px;

      &-by {
        text-wrap: nowrap;
      }

      &-when {
        font-size: 12px;
      }
    }
  }
}
</style>
