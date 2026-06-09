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

defineOptions({ name: 'ListOnglet' })
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
    <ul>
      <li v-for="item in list" :key="item" class="onglet-item">
        <button
          type="button"
          :class="[classBtn, item === ongletCurrent ? 'active' : '']"
          :aria-current="item === ongletCurrent ? 'page' : undefined"
          @click="selected(item)"
        >
          {{ m(item) }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';

.list-menu > ul {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-menu button {
  display: block;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  text-align: start;
  border-radius: 12px;
  padding: 0.875rem 1rem;
  font-size: var(--#{$prefix}font-size-sm);
  border: 1px solid transparent;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s,
    box-shadow 0.2s;
}

.list-menu .btn-secondary-toggle:not(.active) {
  background-color: transparent;
}

.list-menu .btn-secondary-toggle.active {
  background-color: color-mix(in srgb, var(--#{$prefix}primary) 12%, var(--#{$prefix}body-bg));
  border-color: var(--#{$prefix}primary);
  color: var(--#{$prefix}primary);
  box-shadow: none;
}

.list-menu button:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--#{$prefix}primary) 30%, transparent);
}

.list-menu .btn-secondary-toggle.active:focus-visible {
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--#{$prefix}primary) 30%, transparent);
}
</style>
