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
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import i18n from '@/plugins/i18n'

const props = defineProps<{
  dataJson: string
  classInput: string
  classLi: string
  classDiv: string
  dataCurrent: string
}>()

const emit = defineEmits<(e: 'selectEtab', payload: any, isSelected: boolean) => void>()

const { t } = i18n.global

const m = (key: string): string => t(`list-etab.${key}`)

const input: Ref<string> = ref('')
const el = ref<HTMLElement>()

function filteredList(): any[] {
  if (!props.dataJson) {
    return []
  }
  const jsonData = JSON.parse(props.dataJson)
  const filteredData = jsonData.filter((etab: any) => etab.etabName.toLowerCase().includes(input.value.toLowerCase()))

  setTimeout(() => {
    const target: HTMLElement | null = el.value != null ? el.value.querySelector('.content .active') : null
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })

  return filteredData
}

function selected(id: string) {
  emit('selectEtab', id, false)
}

const filteredData = computed(() => filteredList())
</script>

<template>
  <div class="search-bar">
    <input v-model="input" :class="classInput" type="text" :placeholder="m('recherche')">
  </div>
  <div ref="el" :class="classDiv">
    <ul class="content">
      <li v-for="etab in filteredData" :id="etab.idSiren" :key="etab">
        <button :class="[classLi, etab.idSiren === dataCurrent ? 'active' : '']" @click="selected(etab)">
          {{ etab.etabName }}
        </button>
      </li>
    </ul>
  </div>

  <div v-if="input && filteredData.length === 0" class="item error">
    <p>{{ m('aucun-res') }}</p>
  </div>
</template>

<style lang="scss">
@use '../assets/base.scss' as *;

.search-bar {
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;

  > .input-search,
  > .input-search-mobile {
    width: 100%;
    padding: 10px 10px 10px 45px;
    background: white;
    background-size: 15px 15px;
    font-size: 16px;
    border: none;
    outline: none;
    border-bottom: 1px solid HEXToRGBA($black, 0.1);
  }

  &::after {
    content: '\f002';
    color: #757575;
    font-family: 'FontAwesome', sans-serif;
    position: absolute;
    left: 20px; /* Adjust this value based on your preference */
    top: 12px;
  }
}

.list-etab,
.options {
  width: 100%;

  > ul {
    list-style: none;
    text-align: left;
    padding-left: 0px;
    overflow-y: scroll;
    overflow-x: hidden;

    > li {
      &:not(:first-child) > *::before {
        content: '';
        position: absolute;
        inset: 0px;
        border-top: 1px solid HEXToRGBA($black, 0.1);
      }

      > .etab,
      > .opt-list {
        position: relative;
        list-style-type: none;
        background-color: unset;
        border: unset;
        outline: none;
        cursor: pointer;
        line-height: 1.5;
        padding: 10px 20px;
        color: black;
        width: 100%;
        border: none;
        text-align: start;

        &.active {
          background-color: #d4d4d4;
        }

        &:hover,
        &:focus-visible {
          background: #eeeeee;
        }
      }
    }
  }
}

.list-etab > ul {
  max-height: 65vh;
}

.options > ul {
  max-height: 180px;
}

.item {
  cursor: pointer;
  line-height: 1.5;
  padding: 10px 20px;
  color: black;
  width: 100%;
  border: none;
  text-align: start;
}

.error {
  background-color: tomato;
}

.selected {
  background-color: green;
}

@media (width >= 1024px) {
  .search-bar::after {
    left: 20px;
    top: 25%;
  }
}
</style>
