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
import type { Relation } from '@/types/relationType';
import { ref, watchEffect } from 'vue';


const props = defineProps<{
    details: Array<Relation>
}>()


const relations = ref<Array<Relation>>()

watchEffect((): void => {
  void (() => {
    relations.value = props.details
    
  })()
})

</script>


<template>
    <div class="section_eleve">
      <div class="heading-titre">
        <span>Personne en rélation avec moi</span>
      </div>
      <dl>
        <dt class="dl-header">Nom</dt>
        <dt class="dl-header">Relation</dt>
        <dt></dt>

        <template v-for="(val, index) in relations" :key="index">
          <dd>{{ val.displayNameRelation }}</dd>
          <dd>{{ val.typeRelation }}</dd>
          <dd>{{ val.autoriteParental }}</dd>
        </template>
      </dl>
    </div>
</template>

<style lang="css">

.heading-titre {
  padding: 10px 15px;
  background-color: #f3f3f3;
}

.section_eleve dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns for "My fonctions" */
  gap: 5px;
}

.section_eleve dl::before {
  font-weight: bold;
  font-size: 1.5em;
  display: block;
  margin-bottom: 10px;
}

/* Ensuring dt acts like table headers */
dt {
  font-weight: bold;
  grid-column: span 1;
}

/* dd (content cells) align with dt */
dd {
  margin: 0;
  padding: 5px;
  grid-column: span 1;
}

/* Optional: Adding a border and padding to emulate a table look */
dl,
dt,
dd {
  border-bottom: 1px solid #ccc;
}

dt,
dd {
  padding: 5px;
  text-align: left;
}

/* Styling for headers within the table */
.dl-header {
  font-weight: bold;
  background-color: #25b2f3;
  color: white;
  padding: 8px;
  border-bottom: 2px solid #000;
  grid-column: span 1;
}

/* Optional: Head row styling */
dl.dl-header {
  display: contents; /* Ensure header row spans full width */
}
</style>