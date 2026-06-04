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

.list-menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.onglet-item {
  width: 100%;
}

.btn-secondary-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: var(--#{$prefix}font-size-sm);
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  color: var(--#{$prefix}basic-black-lighter);
  background-color: transparent;
  border: 1px solid transparent;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;

  &.active {
    font-weight: 700;
    color: var(--#{$prefix}primary);
    background-color: color-mix(in srgb, var(--#{$prefix}primary) 10%, transparent);
    border-color: color-mix(in srgb, var(--#{$prefix}primary) 30%, transparent);
  }

  &:hover:not(.active) {
    color: var(--#{$prefix}basic-black);
    background-color: var(--#{$prefix}hover);
    border-color: var(--#{$prefix}stroke);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--#{$prefix}primary) 20%, transparent);
  }
}
</style>
