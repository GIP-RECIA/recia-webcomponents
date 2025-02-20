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
import type { Relation } from '@/types/relationType'
import { getDetailEnfant } from '@/services/serviceMce'
import { ref, watchEffect } from 'vue'

defineOptions({ name: 'RelationUser' })

const props = defineProps<{
  mceApi: string
  userInfoApiUrl: string
  details: Array<Relation>
  titre: string
  onglet: string
}>()

const emit = defineEmits(['openModal'])
const relations = ref<Array<Relation>>([])
const personne = ref<any>()

watchEffect((): void => {
  void (() => {
    relations.value = props.details
  })()
})

async function openModal(event: Event, uid: string): Promise<void> {
  const response = await getDetailEnfant(props.mceApi + uid, props.userInfoApiUrl)
  personne.value = response.data

  const openModalCustomEvent = new CustomEvent('openModale', {
    detail: {
      title: personne.value?.userName,
      originalEvent: event.composedPath()[0] as HTMLElement,
    },
    bubbles: true, // Permet à l'événement de remonter dans le DOM
    composed: true, // Permet à l'événement de sortir du shadow DOM

  })
  document.dispatchEvent(openModalCustomEvent)
  emit(
    'openModal',
    personne.value,
  )
}
</script>

<template>
  <div class="section_eleve">
    <div class="heading-titre">
      <span class="titre">{{ titre }}</span>
    </div>
    <div class="relations">
      <template v-for="(val, index) in relations" :key="index">
        <div class="relation" @click.prevent="(e) => openModal(e, val.uidRelation)">
          <span class="type">{{ val.typeRelation === "20" && "Pere" ? "Père" : val.typeRelation }}</span>
          <span class="name-person">{{ val.displayNameRelation }}</span>
          <span>{{ val.autoriteParental === true ? "Autorité parental" : "" }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.relations {
  display: grid;
  padding: 0px 15px;
  grid-template-columns: 200px 200px 200px;
  column-gap: 20px;
  row-gap: 15px;

  .relation {
    display: flex;
    flex-direction: column;
    padding: 15px 15px;
    background-color: #eee;
    border-radius: 12px;
    gap: 3px;

    .type {
      font-weight: bold;
      font-size: 15px;
    }
  }
}

@media (max-width: 815px) {
  .relations {
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr;

    .relation {
      background-color: white;
    }
  }
}

.heading-titre {
  padding: 10px 15px;

  .titre {
    color: rgba(0, 0, 0, 0.4);
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
