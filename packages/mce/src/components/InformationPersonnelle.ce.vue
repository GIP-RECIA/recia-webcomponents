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
  civilite?: string
  nom?: string
  prenom?: string
  categorie?: string
  dateNaissance?: string
  userMail?: string
  userPublic?: string[]
  uid?: string
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
    <section
      class="profile-card"
      aria-labelledby="info-personnelle-title"
    >
      <div class="card-header">
        <h3
          id="info-personnelle-title"
          tabindex="0"
        >
          {{ tUser('informations-personnelles') }}
        </h3>
      </div>

      <div class="card-body">
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
              <time
                v-if="formattedDate"
                :datetime="props.dateNaissance"
              >{{ formattedDate }}</time>
              <template v-else>{{ tUser('non-renseigne') }}</template>
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ tUser('categorie') }}</span>
            <span class="info-value">{{ props.categorie || tUser('non-renseigne') }}</span>
          </div>
          <div
            v-if="currentEmail"
            class="info-item"
          >
            <span class="info-label">{{ tUser('email') }}</span>
            <span class="info-value">{{ currentEmail }}</span>
          </div>
          <div
            v-if="props.userPublic?.length"
            class="info-item"
          >
            <span class="info-label">{{ tUser('login') }}</span>
            <div class="info-value">
              <a
                v-for="(url, i) in props.userPublic"
                :key="i"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="public-link"
              >
                {{ tUser('educonnect') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use '../assets/mce-shared' as *;

.profile-card {
  @include mce-card-base;
}

.card-header {
  @include mce-card-header;
}

.card-body {
  @include mce-card-body;
}

.card-body-grid {
  display: grid;
  gap: 1.25rem;
  margin: 0;

  @media (width >= map.get($grid-breakpoints, md)) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.info-item {
  @include mce-info-item;
}

.info-label {
  @include mce-info-label;
  display: block;
}

.info-value {
  @include mce-info-value;
  display: block;
}

.public-link {
  color: var(--#{$prefix}primary);
  text-decoration: underline;
  cursor: pointer;
  font-size: var(--#{$prefix}font-size-sm);

  &:hover {
    color: color-mix(in srgb, var(--#{$prefix}primary) 80%, black);
  }
}
</style>
