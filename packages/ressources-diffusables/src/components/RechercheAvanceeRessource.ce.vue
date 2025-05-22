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
import { RechercheFilter } from '@/utils/RechercheFilter'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import debounce from 'lodash.debounce'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  nombreRessourcesTotal: number
  nombreRessourcesAffichees: number
}>()

const emit = defineEmits<{
  (event: 'reinitialiserRechercheAvancee', payload: RechercheFilter): void
  (event: 'recommencerRechercheAvanceeInput', payload: RechercheFilter): void
}>()

const rechercheInputNomRessource = ref<string>('')
const rechercheInputNomEditeur = ref<string>('')

const { t } = useI18n()

function reinitialiserRechercheAvancee(prop: string): void {
  switch (prop) {
    case 'nomRessource':
      rechercheInputNomRessource.value = ''
      break
    case 'nomEditeur':
      rechercheInputNomEditeur.value = ''
      break
    default:
      rechercheInputNomRessource.value = ''
      rechercheInputNomEditeur.value = ''
      break
  }
  emit(
    'reinitialiserRechercheAvancee',
    new RechercheFilter(rechercheInputNomRessource.value, rechercheInputNomEditeur.value),
  )
}

const recommencerRechercheAvancee = debounce(
  () =>
    emit(
      'recommencerRechercheAvanceeInput',
      new RechercheFilter(rechercheInputNomRessource.value, rechercheInputNomEditeur.value),
    ),
  500, // Buffer de 0,5s après input.
)
</script>

<template>
  <div class="cadre-recherche-ressource">
    <label for="recherche-nom-ressource">{{ t('recherche-ressource.recherche-ressource') }}</label>
    <div class="input-recherche-ressource">
      <input
        id="recherche-nom-ressource"
        v-model.trim="rechercheInputNomRessource"
        name="recherche-nom-ressource"
        class="champ-recherche-ressource"
        type="text"
        :placeholder="t('recherche-ressource.recherche')"
        @input="recommencerRechercheAvancee"
      >
      <button
        class="reinitialiser-recherche-ressource"
        :disabled="rechercheInputNomRessource.length === 0"
        @click="reinitialiserRechercheAvancee('nomRessource')"
      >
        <FontAwesomeIcon :icon="['fa', 'xmark']" />
      </button>
    </div>
    <label for="recherche-nom-editeur">{{ t('recherche-ressource.recherche-editeur') }}</label>
    <div class="input-recherche-ressource">
      <input
        id="recherche-nom-editeur"
        v-model.trim="rechercheInputNomEditeur"
        name="recherche-nom-editeur"
        class="champ-recherche-ressource"
        type="text"
        :placeholder="t('recherche-ressource.recherche')"
        @input="recommencerRechercheAvancee"
      >
      <button
        class="reinitialiser-recherche-ressource"
        :disabled="rechercheInputNomEditeur.length === 0"
        @click="reinitialiserRechercheAvancee('nomEditeur')"
      >
        <FontAwesomeIcon :icon="['fa', 'xmark']" />
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
  background-color: $body-bg;
  border-radius: $card-border-radius;
  box-shadow: $shadow-neutral;
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
  background-color: transparent;
  color: $body-color;
  border: thin solid $stroke;
  border-left: none;
  border-radius: 0 $button-border-radius $button-border-radius 0;
  border-color: $stroke;
  cursor: pointer;
}

.reinitialiser-recherche-ressource:disabled {
  background-color: transparent;
  color: $stroke;
  cursor: not-allowed;
}

.elements-affiches-page-ressource {
  text-align: center;
}
</style>
