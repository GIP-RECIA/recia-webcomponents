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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'ServicesEnt' })

const props = defineProps<{
  onglet?: string
  details?: string[]
  etab?: string
}>()

const { t } = useI18n()
const m = (key: string): string => t(`services-ent.${key}`)

const services = computed(() => {
  return [...(props.details || [])].sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' }),
  )
})
</script>

<template>
  <div class="section-services">
    <div class="heading-titre">
      <h2 class="titre">
        {{ m('title-services') }}
      </h2>
    </div>

    <div class="grid-services">
      <div class="card-etab">
        <div class="card-header">
          <span class="card-label">{{ etab }}</span>
        </div>

        <div class="card-content">
          <div class="services-list">
            <span v-for="(service, index) in services" :key="index" class="service-tag">
              {{ service }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/mixins' as *;

.section-services {
  padding: 0.75rem;

  .heading-titre {
    margin-bottom: 1rem;

    .titre {
      margin: 0;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      color: var(--#{$prefix}secondary-color, #6c757d);
    }
  }
}

.grid-services {
  display: grid;
  gap: 1rem;
}

.card-etab {
  background-color: var(--#{$prefix}body-bg, #ffffff);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  box-shadow: 0 4px 12px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.05));

  .card-header {
    border-bottom: 1px solid var(--#{$prefix}border-color, #dee2e6);
    padding-bottom: 0.5rem;
    margin-bottom: 0.75rem;

    .card-label {
      font-weight: 800;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--#{$prefix}secondary-color, #6c757d);
    }
  }

  .card-content {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    border-radius: 8px;
    padding: 0.75rem;
    border: 1px solid var(--#{$prefix}border-color, #dee2e6);

    .services-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .service-tag {
        background-color: var(--#{$prefix}body-bg, #ffffff);
        padding: 0.5rem 0.8rem;
        border-radius: var(--#{$prefix}border-radius, 6px);
        text-align: center;
        font-size: 0.75rem;
        font-weight: 600;
        border: 1px solid var(--#{$prefix}border-color, #dee2e6);

        flex: 1 1 auto;
        min-width: 140px;
      }
    }
  }
}

@media (max-width: 320px) {
  .section-services {
    padding: 0.5rem;
  }
  .card-etab {
    padding: 0.75rem;
    .card-content {
      padding: 0.5rem;
    }
  }
}
</style>
