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
      <ul class="content">
        <li v-for="item in list" :key="item">
          <button :class="[classBtn, item == ongletCurrent ? 'active' : '']" @click="selected(item)">{{ m(item) }}</button>
        </li>
      </ul>
    </div>
</template>

<style lang="css">
.list-menu {
  margin: 50px;
}
.onglet-name {
  border: none;
  padding-bottom: 10px;
  padding-top: 10px;
  width: 100%;
}

ul {
  list-style: none;
}
.active {
  background-color: #d4d4d4;
  color: black;
}
</style>