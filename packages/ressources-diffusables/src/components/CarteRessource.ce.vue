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
import type { DistributeursCom } from '@/types/disctibuteurComType'
import type { Ressource } from '@/types/ressourceType'
import debounce from 'lodash.debounce'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  ressource: Ressource
}>()

const plusInfos = ref<boolean>(false)
const distributeursComComputed = ref<Array<DistributeursCom>>([])

onMounted(() => {
  distributeursComComputed.value = props.ressource.distributeursCom.filter(
    (distributeurCom: DistributeursCom) => distributeurCom.nom !== '',
  )
})

const { t } = useI18n()

function afficherPlusInfos(): void {
  plusInfos.value = !plusInfos.value
}

const isSuccess = ref<boolean>(false)

const resetSuccess = debounce(() => {
  isSuccess.value = false
}, 1500)

function copierReferences(): void {
  let string = `${t('carte-ressource.nom-ressource')}: ${props.ressource.ressource.nom}
${t('carte-ressource.id-gar')}: ${props.ressource.ressource.id}
${t('carte-ressource.editeur')}: ${props.ressource.editeur.nom}`

  props.ressource.distributeursCom.forEach((element) => {
    string += `\n${t('carte-ressource.distributeurCom')}: ${element.nom}`
  })

  navigator.clipboard.writeText(string)
  isSuccess.value = true
  resetSuccess()
}
</script>

<template>
  <div class="cadre-carte-ressource">
    <h3 class="nom-ressource-carte-ressource">
      {{ ressource.ressource.nom }}
    </h3>
    <ul class="liste-attributs-ressource-carte-ressource">
      <li class="attribut-ressource-carte-ressource">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.id-gar') }} : </span>
        <span class="id-principal-ressource-carte-ressource">
          {{ ressource.ressource.id }}
        </span>
      </li>
      <li v-if="ressource.editeur.nom !== '' || plusInfos" class="attribut-ressource-carte-ressource">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.editeur') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ ressource.editeur.nom }}
        </span>
        <span v-if="plusInfos" class="id-attribut-ressource-carte-ressource">&nbsp;{{ ressource.editeur.id }} </span>
      </li>
      <li
        v-for="distributeurCom in distributeursComComputed"
        :key="distributeurCom.id"
        class="attribut-ressource-carte-ressource"
      >
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.distributeurCom') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ distributeurCom.nom }}
        </span>
        <span v-if="plusInfos" class="id-attribut-ressource-carte-ressource">&nbsp;{{ distributeurCom.id }} </span>
      </li>
      <li v-if="plusInfos" class="attribut-ressource-carte-ressource">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.distributeurTech') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ ressource.distributeurTech.nom }}
        </span>
        <span v-if="plusInfos" class="id-attribut-ressource-carte-ressource">&nbsp;{{ ressource.distributeurTech.id }}
        </span>
      </li>
      <li v-if="plusInfos" class="attribut-ressource-carte-ressource">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.affichable') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ ressource.affichable ? t('carte-ressource.oui') : t('carte-ressource.non') }}
        </span>
      </li>
      <li v-if="plusInfos" class="attribut-ressource-carte-ressource">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.diffusable') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ ressource.diffusable ? t('carte-ressource.oui') : t('carte-ressource.non') }}
        </span>
      </li>
    </ul>
    <div class="boutons-carte-ressource">
      <button @click="afficherPlusInfos">
        {{ plusInfos ? t('carte-ressource.moins-informations') : t('carte-ressource.plus-informations') }}
      </button>
      <button :class="[isSuccess ? 'success' : '']" @click="copierReferences">
        {{ t(isSuccess ? 'carte-ressource.contenu-copie' : 'carte-ressource.copier-references') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.cadre-carte-ressource {
  text-align: left;
  background-color: #fff;
  padding: $padding;
  margin-bottom: $margin;
  border-radius: $card-border-radius;
}

.nom-ressource-carte-ressource {
  margin-top: 0;
  margin-bottom: $margin;
  color: $ressources-title-color;
}

.liste-attributs-ressource-carte-ressource {
  list-style-type: none;
  padding: 0;
  margin: 0 0 $margin 0;
}

.intitule-attribut-ressource-carte-ressource {
  font-weight: bold;
}

.id-principal-ressource-carte-ressource {
  word-wrap: break-word;
}

.id-attribut-ressource-carte-ressource {
  opacity: 0.5;
  font-size: smaller;
  word-wrap: break-word;
}

.boutons-carte-ressource {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.boutons-carte-ressource > button {
  min-width: min(200px, 45%);
  padding: $button-padding;
  font-size: small;
  font-weight: bold;
  background-color: $button-background-color;
  color: $button-text-color;
  border: none;
  border-radius: $button-border-radius;
  cursor: pointer;
  max-width: 45%;
}

.boutons-carte-ressource > button:not(:first-child) {
  margin-left: calc($margin/2);
}
.boutons-carte-ressource > button:not(:last-child) {
  margin-right: calc($margin/2);
}

.boutons-carte-ressource > button:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}

.boutons-carte-ressource > button.success {
  background-color: $button-background-color-success;
  color: $button-text-color-success;
}

@media (min-width: 768px) {
  .boutons-carte-ressource {
    justify-content: flex-end;
  }
}
</style>
