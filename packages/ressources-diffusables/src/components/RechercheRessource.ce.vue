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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import debounce from 'lodash.debounce';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

defineProps<{
  nombreRessourcesTotal: number;
  nombreRessourcesAffichees: number;
}>();

const emit = defineEmits<{
  (event: 'reinitialiserRecherche'): void;
  (event: 'recommencerRechercheInput', payload: string): void;
}>();

const rechercheInput = ref<string>('');

const { t } = useI18n();

const reinitialiserRecherche = (): void => {
  rechercheInput.value = '';
  emit('reinitialiserRecherche');
};

const recommencerRecherche = debounce(
  () => emit('recommencerRechercheInput', rechercheInput.value),
  500, // Buffer de 0,5s après input.
);
</script>

<template>
  <div class="cadre-recherche-ressource">
    <div class="input-recherche-ressource">
      <input
        class="champ-recherche-ressource"
        v-model.trim="rechercheInput"
        @input="recommencerRecherche"
        type="text"
        :placeholder="t('recherche-ressource.recherche')"
      />
      <button
        class="reinitialiser-recherche-ressource"
        @click="reinitialiserRecherche"
        :disabled="rechercheInput.length == 0"
      >
        <font-awesome-icon :icon="['fa', 'xmark']" />
      </button>
    </div>
    <small class="elements-affiches-page-ressource">
      {{ nombreRessourcesAffichees }}/{{ nombreRessourcesTotal }}
      {{ t('recherche-ressource.elements-affiches').toUpperCase() }}
    </small>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.cadre-recherche-ressource {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $padding;
  margin: $margin;
  background-color: #fff;
  border-radius: $card-border-radius;
}

.input-recherche-ressource {
  display: flex;
  flex-direction: row;
  margin-bottom: $margin;
}

.champ-recherche-ressource {
  box-sizing: border-box;
  width: 100%;
  height: $input-height;
  padding: 0 $recherche-ressource-padding 0 $recherche-ressource-padding;
  font-size: small;
  font-weight: bold;
  outline: none;
  border: thin solid lightgrey;
  border-right: none;
  border-radius: $button-border-radius 0 0 $button-border-radius;
}

.reinitialiser-recherche-ressource {
  display: flex;
  justify-content: center;
  align-items: center;
  width: $input-height;
  height: $input-height;
  padding: $recherche-ressource-padding;
  background-color: $button-background-color;
  color: $button-text-color;
  border: none;
  border-radius: 0 $button-border-radius $button-border-radius 0;
  cursor: pointer;
}

.reinitialiser-recherche-ressource:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}

.elements-affiches-page-ressource {
  text-align: center;
}
</style>
