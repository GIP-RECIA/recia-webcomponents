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
import { useI18n } from 'vue-i18n'


const { t } = useI18n()
const m = (key: string): string => t(`list-onglet.${key}`)


const props = defineProps<{
  list: Array<string>
  ongletCurrent: string
  classBtn: string
  userInfoApiUrl: string
}>()

const emit = defineEmits<(e: 'selectOnglet', payload: any, isSelected: boolean) => void>();

function selected(onglet: string) {    
  emit('selectOnglet', onglet, false);
}
</script>

<template>
    <div class="list-menu">
    <div v-for="item in list" :key="item">
      <button :class="[classBtn, item == ongletCurrent ? 'active' : '']" @click="selected(item)">{{ m(item) }}</button>
    </div>
    </div>
</template>

<style lang="css">
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
</style>