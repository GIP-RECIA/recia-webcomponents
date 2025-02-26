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
defineOptions({ name: 'ServicesEnt' })

defineProps<{
  details: Array<string>
  etab: string
}>()
</script>

<template>
  <div class="heading-titre">
    <span class="titre">Services auxquels j'ai accès dans l'ENT</span>
  </div>
  <div class="etabs">
    <div class="etab">
      <span class="etab-name">{{ etab }}</span>
      <div class="services">
        <template v-for="(service, index) in details" :key="index">
          <span class="service"> {{ service }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.heading-titre {
  padding: 10px 15px;

  .titre {
    color: rgba(0, 0, 0, 0.4);
    font-size: 18px;
    font-weight: bold;
  }
}

.etabs {
  padding: 0px 15px 20px 15px;

  .etab {
    display: flex;
    flex-direction: column;
    padding: 15px 15px;
    background-color: #eee;
    border-radius: 12px;
    gap: 4px;

    .etab-name {
      font-weight: bold;
      font-size: 15px;
    }

    .services {
      padding: 5px 0px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      column-gap: 15px;
      row-gap: 10px;

      .service {
        background-color: white;
        padding: 5px;
        border-radius: 14px;
        text-align: center;
        align-content: center;
      }
    }
  }
}

@media (max-width: 815px) {
  .etabs {
    .etab {
      background-color: white;

      .services {
        grid-template-columns: auto auto;
        gap: 1em;

        .service {
          background-color: #eee;
        }
      }
    }
  }
}
</style>
