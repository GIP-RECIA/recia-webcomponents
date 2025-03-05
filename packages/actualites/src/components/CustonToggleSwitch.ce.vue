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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['readStatus'])

const states: string[] = ['all', 'read', 'not-read']
const currentState = ref(states[0])

const { t } = useI18n()

function setState(state: string) {
  if (states.includes(state)) {
    currentState.value = state
    emit('readStatus', state === 'all' ? undefined : (state === 'read'))
  }
}
</script>

<template>
  <ul>
    <li
      v-for="state in states"
      :key="state"
    >
      <button :class="{ active: currentState === state }" @click="setState(state)">
        {{ t(`switch.${state}`) }}
      </button>
    </li>
  </ul>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

ul {
  list-style-type: none;
  display: inline-flex;
  background-color: rgba(from $basic-black r g b / 0.05);
  border-radius: 50px;
  padding: 4px;
  gap: 8px;

  li > button {
    @extend %tag;
  }
}

@media only screen and (min-width: 1024px) {
  ul > li > button {
    padding: 4px 12px;
  }
}
</style>
