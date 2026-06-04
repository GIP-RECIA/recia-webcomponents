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
import { inject, ref, watch } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import ChangeEmail from '@/components/ChangeEmail.ce.vue'

const props = defineProps<{
  uid?: string
  nom?: string
  prenom?: string
  dateNaissance?: string
  userMail?: string
  userId: string
  userInfoApiUrl: string
  mceApi: string
  canModifyEmail?: boolean
}>()

const emit = defineEmits<{
  (e: 'emailUpdated', email: string): void
}>()

const i18n = inject(I18nInjectionKey)
function tUser(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`user-info.${key}`) : key
}

const currentEmail = ref(props.userMail || '')
const isEmailOpen = ref(false)

watch(
  () => props.userMail,
  (newVal) => {
    if (newVal)
      currentEmail.value = newVal
  },
)

function toggleEmail() {
  isEmailOpen.value = !isEmailOpen.value
}

function handleEmailUpdated(email: string) {
  currentEmail.value = email
  isEmailOpen.value = false
  emit('emailUpdated', email)
}
</script>

<template>
  <section class="profile-card">
    <header class="card-header">
      <h3>{{ tUser('informations-personnelles') }}</h3>
    </header>

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
          {{ props.dateNaissance || '—' }}
        </dd>
      </div>

      <div class="email-row">
        <div class="info-item email-container">
          <dt class="info-label">
            {{ tUser('email') }}
          </dt>
          <dd class="info-value info-value--bold">
            {{ currentEmail || '—' }}
          </dd>
        </div>

        <button
          v-if="!props.canModifyEmail"
          class="btn-primary small"
          @click="toggleEmail"
        >
          {{ isEmailOpen ? tUser('annuler') : tUser('modifier') }}
        </button>
      </div>
    </dl>

    <div v-if="isEmailOpen" class="edit-section-panel">
      <ChangeEmail
        :user-info-api-url="props.userInfoApiUrl"
        :mce-api="props.mceApi"
        :user-id="props.userId"
        :current-email="currentEmail"
        @updated="handleEmailUpdated"
        @close="isEmailOpen = false"
      />
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

.profile-card {
  border: 1px solid var(--#{$prefix}stroke);
  border-radius: 10px;
  box-shadow: var(--#{$prefix}shadow-neutral) rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: var(--#{$prefix}body-bg);
}

.card-header {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid var(--#{$prefix}stroke);

  h3 {
    margin: 0;
    font-size: var(--#{$prefix}font-size-h3);
    color: var(--#{$prefix}basic-black);
  }
}

.card-body-grid {
  padding: 1.25rem;
  display: grid;
  gap: 1.25rem;
  margin: 0;

  @media (width >= map.get($grid-breakpoints, md)) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  display: block;
  font-size: var(--#{$prefix}font-size-xxs);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--#{$prefix}basic-black-lighter);
  margin-bottom: 4px;
}

.info-value {
  margin: 0;
  font-size: var(--#{$prefix}font-size-sm);
  color: var(--#{$prefix}basic-black);

  &--bold {
    font-weight: 600;
  }
}

.email-row {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.25rem;
  border-top: 1px dashed var(--#{$prefix}stroke);

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    align-items: flex-end;
    gap: 1.5rem;
  }
}

.email-container {
  flex: 1;
}

.edit-section-panel {
  padding: 0 1.25rem 1.25rem;
}
</style>
