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
import { computed, inject, ref, watch } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'

defineOptions({ name: 'InformationPersonnelle' })

const props = defineProps<{
  userName?: string
  civilite?: string
  nom?: string
  prenom?: string
  categorie?: string
  dateNaissance?: string
  userMail?: string
}>()

const i18n = inject(I18nInjectionKey)

function tUser(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`user-info.${key}`) : key
}

const currentEmail = ref(props.userMail || '')

watch(() => props.userMail, (newVal) => {
  if (newVal)
    currentEmail.value = newVal
})

const formattedDate = computed(() => {
  if (!props.dateNaissance)
    return null
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(props.dateNaissance))
  }
  catch {
    return props.dateNaissance
  }
})
</script>

<template>
  <div class="card-wrapper">
    <section class="profile-card">
      <div class="card-header">
        <p class="card-title" tabindex="0">
          {{ tUser('informations-personnelles') }}
        </p>
      </div>

      <div class="card-body-grid">
        <div class="info-item">
          <span class="info-label">{{ tUser('civilite') }}</span>
          <span class="info-value">{{ props.civilite || tUser('non-renseigne') }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">{{ tUser('nom') }}</span>
          <span class="info-value">{{ props.nom || tUser('non-renseigne') }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">{{ tUser('prenom') }}</span>
          <span class="info-value">{{ props.prenom || tUser('non-renseigne') }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">{{ tUser('bod') }}</span>
          <span class="info-value">
            <time v-if="formattedDate" :datetime="props.dateNaissance">{{ formattedDate }}</time>
            <template v-else>{{ tUser('non-renseigne') }}</template>
          </span>
        </div>
        <div class="info-item">
          <span class="info-label">{{ tUser('categorie') }}</span>
          <span class="info-value">{{ props.categorie || tUser('non-renseigne') }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">{{ tUser('email') }}</span>
          <span class="info-value">{{ currentEmail || tUser('non-renseigne') }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use './mce-shared' as *;

.profile-card {
  @include mce-card-base;
}

.card-header {
  @include mce-card-header;
}

.card-title {
  margin: 0;
  font-size: var(--#{$prefix}font-size-h3);
  font-weight: 700;
}

.card-body-grid {
  padding: 1.25rem;
  display: grid;
  gap: 1.25rem;
  margin: 0;

  @media (width >= map.get($grid-breakpoints, md)) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  min-width: 0;
}

.info-label {
  @include mce-info-label;
  display: block;
}

.info-value {
  @include mce-info-value;
  display: block;
}
</style>
