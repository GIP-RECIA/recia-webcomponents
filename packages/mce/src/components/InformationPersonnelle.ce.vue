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
  uid?: string
  userName?: string
  civilite?: string
  nom?: string
  prenom?: string
  categorie?: string
  dateNaissance?: string
  userMail?: string
  userId: string
  userInfoApiUrl: string
  mceApi: string
  canModifyEmail?: boolean
  showChangeEmail?: boolean
}>()

const emit = defineEmits<{
  (e: 'emailUpdated', email: string): void
  (e: 'openChangeEmail'): void
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
  <section class="profile-card" aria-labelledby="personal-info-title">
    <div class="card-header">
      <h3 id="personal-info-title">
        {{ tUser('informations-personnelles') }}
      </h3>
    </div>

    <!-- Improved Definition List -->
    <dl class="card-body-grid">
      <div class="info-item">
        <dt class="info-label">
          {{ tUser('uid') }}
        </dt>
        <dd class="info-value">
          {{ props.uid || '—' }}
        </dd>
      </div>
      <div class="info-item">
        <dt class="info-label">
          {{ tUser('civilite') }}
        </dt>
        <dd class="info-value">
          {{ props.civilite || '—' }}
        </dd>
      </div>
      <div class="info-item">
        <dt class="info-label">
          {{ tUser('nom') }}
        </dt>
        <dd class="info-value">
          {{ props.nom || '—' }}
        </dd>
      </div>
      <div class="info-item">
        <dt class="info-label">
          {{ tUser('prenom') }}
        </dt>
        <dd class="info-value">
          {{ props.prenom || '—' }}
        </dd>
      </div>
      <div class="info-item">
        <dt class="info-label">
          {{ tUser('bod') }}
        </dt>
        <dd class="info-value">
          <time v-if="formattedDate" :datetime="props.dateNaissance">
            {{ formattedDate }}
          </time>
          <span v-else aria-hidden="true">—</span>
        </dd>
      </div>
      <div class="info-item">
        <dt class="info-label">
          {{ tUser('categorie') }}
        </dt>
        <dd class="info-value">
          {{ props.categorie || '—' }}
        </dd>
      </div>
    </dl>

    <!-- Email Section -->
    <div class="email-section" role="group" aria-labelledby="email-section-label">
      <div class="email-row">
        <div class="email-container">
          <span id="email-section-label" class="info-label email-section-label">
            {{ tUser('email') }}
          </span>
          <p class="info-value info-value--bold" :title="currentEmail">
            {{ currentEmail || '—' }}
          </p>
        </div>

        <div class="email-actions">
          <button
            v-if="!props.canModifyEmail"
            class="btn-primary small"
            type="button"
            @click="emit('openChangeEmail')"
          >
            {{ tUser('modifier') }}
          </button>
        </div>
      </div>
    </div>
  </section>
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
  @include mce-info-item;
}

.info-label {
  @include mce-info-label;
}

.email-section-label {
  display: block;
  font-size: var(--#{$prefix}font-size-h4);
}

.info-value {
  @include mce-info-value;
  margin: 0;

  &--bold {
    @include mce-info-value-bold;
    overflow-wrap: break-word;
    word-break: break-all;
    max-width: 100%;
  }
}

.email-section {
  padding: 1.25rem;
  border-top: 1px dashed var(--#{$prefix}stroke);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.email-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    align-items: flex-end;
  }
}

.email-container {
  flex: 1;
  min-width: 0;
}

.email-actions {
  flex-shrink: 0;
}

.edit-section-panel {
  &:focus {
    outline: none;
  }
}
</style>
