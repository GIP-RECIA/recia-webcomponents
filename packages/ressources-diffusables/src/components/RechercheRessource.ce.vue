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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import debounce from 'lodash.debounce'
import { ref, watch } from 'vue'
import i18n from '@/plugins/i18n'
import { RechercheFilter } from '@/utils/RechercheFilter'

defineProps<{
  nombreRessourcesTotal: number
  nombreRessourcesAffichees: number
}>()

const emit = defineEmits<{
  (event: 'swapRechercheTypeToggle', payload: boolean): void
  (event: 'reinitialiserRecherche'): void
  (event: 'recommencerRechercheInput', payload: string): void
  (event: 'reinitialiserRechercheAvancee', payload: RechercheFilter): void
  (event: 'recommencerRechercheAvanceeInput', payload: RechercheFilter): void
}>()

const { t } = i18n.global

const rechercheAvanceeActive = ref<boolean>(false)

watch(rechercheAvanceeActive, () => {
  emit('swapRechercheTypeToggle', rechercheAvanceeActive.value)
})

const rechercheInput = ref<string>('')

function reinitialiserRecherche(): void {
  rechercheInput.value = ''
  emit('reinitialiserRecherche')
}

const recommencerRecherche = debounce(
  () => emit('recommencerRechercheInput', rechercheInput.value),
  500, // Buffer de 0,5s après input.
)

const rechercheInputNomRessource = ref<string>('')
const rechercheInputNomEditeur = ref<string>('')

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
  <div class="cadre">
    <div class="toggle">
      <label for="checkbox">{{ t('recherche-ressource.recherche-avancee') }}</label>
      <input id="checkbox" v-model="rechercheAvanceeActive" class="toggle-checkbox" type="checkbox">
    </div>
    <div v-show="!rechercheAvanceeActive" class="input-recherche-ressource">
      <input
        v-model.trim="rechercheInput"
        class="champ-recherche-ressource"
        type="text"
        :placeholder="t('recherche-ressource.recherche')"
        @input="recommencerRecherche"
      >
      <button
        class="reinitialiser-recherche-ressource"
        :disabled="rechercheInput.length === 0"
        @click="reinitialiserRecherche"
      >
        <FontAwesomeIcon :icon="['fa', 'xmark']" />
      </button>
    </div>

    <div v-show="rechercheAvanceeActive">
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
    </div>

    <small class="elements-affiches-page-ressource">
      {{ nombreRessourcesAffichees }}/{{ nombreRessourcesTotal }}
      {{ t('recherche-ressource.elements-affiches').toUpperCase() }}
    </small>
  </div>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

.cadre {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $padding;
  background-color: $body-bg;
  border-radius: $card-border-radius;
  box-shadow: $shadow-neutral;
  margin-bottom: 24px;
}

.toggle {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: top;
  margin-bottom: $margin;
}

.toggle-checkbox {
  width: 1.5em;
  height: 1.5em;
  accent-color: $primary;
  margin-left: 8px;
}

.input-recherche-ressource {
  display: flex;
  flex-direction: row;
  margin-bottom: $margin;
}

.champ-recherche-ressource {
  box-sizing: border-box;
  width: 100%;
  padding: 0 $recherche-ressource-padding 0 $recherche-ressource-padding;
  font-size: small;
  font-weight: bold;
  outline: none;
  border: thin solid $stroke;
  border-right: none;
  border-radius: $button-border-radius 0 0 $button-border-radius;
}

.reinitialiser-recherche-ressource {
  display: flex;
  justify-content: center;
  align-items: center;
  width: $input-height;
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
