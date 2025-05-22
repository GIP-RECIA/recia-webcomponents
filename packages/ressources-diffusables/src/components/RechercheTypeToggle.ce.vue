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
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
  (event: 'swapRechercheTypeToggle', payload: boolean): void
}>()
const { t } = useI18n()
const rechercheAvanceeActive = ref<boolean>(false)

watch(rechercheAvanceeActive, () => {
  emit('swapRechercheTypeToggle', rechercheAvanceeActive.value)
})
</script>

<template>
  <div class="cadre-toggle">
    <label for="checkbox">{{ t('recherche-ressource.recherche-avancee') }}</label>
    <input id="checkbox" v-model="rechercheAvanceeActive" class="toggle-checkbox" type="checkbox">
  </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.cadre-toggle {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: top;
  padding: $padding;
  margin: $margin;
  background-color: #fff;
  border-radius: $card-border-radius;
}

.toggle-checkbox {
  width: 1.5em;
  height: 1.5em;
  accent-color: $button-background-color;
}
</style>
