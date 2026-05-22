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
import { inject } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'

defineOptions({ name: 'ListeOnglet' })

defineProps<{
  list: Array<string>
  ongletCurrent: string
  classBtn: string
  userInfoApiUrl: string
}>()

const emit = defineEmits<(e: 'selectOnglet', payload: any) => void>()

const i18n = inject(I18nInjectionKey)
function m(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`list-onglet.${key}`) : key
}

function selected(onglet: string) {
  emit('selectOnglet', onglet)
}
</script>

<template>
  <nav class="list-menu" aria-label="Menu de navigation">
    <div v-for="item in list" :key="item" class="onglet-item">
      <button
        :class="[classBtn, item === ongletCurrent ? 'active' : '']"
        :aria-current="item === ongletCurrent ? 'page' : undefined"
        @click="selected(item)"
      >
        {{ m(item) }}
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.list-menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.onglet-item {
  width: 100%;
  max-width: 280px;
}

.btn-secondary-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  border-radius: var(--#{$prefix}border-radius, 8px);

  color: var(--#{$prefix}secondary-color, #6c757d);
  background-color: transparent;
  border: 1px solid transparent;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
  &.active {
    font-weight: 700;
    color: var(--#{$prefix}primary, #0056b3);
    background-color: var(--#{$prefix}primary-bg-subtle, #e7f1ff);
    border-color: var(--#{$prefix}primary-border-subtle, #b6d4fe);
  }
  &:hover:not(.active) {
    color: var(--#{$prefix}body-color, #212529);
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    border-color: var(--#{$prefix}border-color, #dee2e6);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--#{$prefix}primary-focus, rgba(0, 86, 179, 0.15));
  }
}

@media (width >= map.get($grid-breakpoints, md)) {
  .list-menu {
    align-items: flex-start;
  }

  .onglet-item {
    max-width: 100%;
  }

  .btn-secondary-toggle {
    justify-content: flex-start;
    text-align: left;
    padding: 0.85rem 1.5rem;
  }
}
</style>
