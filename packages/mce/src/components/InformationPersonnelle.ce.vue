<!--
 Copyright (C) 2023 GIP-RECIA, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file in compliance with the License.
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
  <section class="page-container">
    <div class="profile-card">
      <header class="card-header">
        <h2>{{ tUser('informations-personnelles') }}</h2>
      </header>

      <div class="card-body-grid">
        <div class="info-item">
          <span class="info-label">{{ tUser('uid') }}</span>
          <span class="info-value">{{ props.uid || '—' }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">{{ tUser('nom') }}</span>
          <span class="info-value">{{ props.nom || '—' }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">{{ tUser('prenom') }}</span>
          <span class="info-value">{{ props.prenom || '—' }}</span>
        </div>

        <div class="info-item">
          <span class="info-label">{{ tUser('bod') }}</span>
          <span class="info-value">{{ props.dateNaissance || '—' }}</span>
        </div>

        <!-- Section Email -->
        <div class="email-row">
          <div class="info-item email-container">
            <span class="info-label">{{ tUser('email') }}</span>
            <span class="info-value email-bold">{{ currentEmail || '—' }}</span>
          </div>

          <button
            v-if="props.canModifyEmail !== true"
            class="btn-outline-modify"
            @click="toggleEmail"
          >
            {{ isEmailOpen ? tUser('annuler') : tUser('modifier') }}
          </button>
        </div>

        <!-- Panel de modification -->
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
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.page-container {
  padding: 0.75rem;
  display: flex;
}

.profile-card {
  width: 100%;
  background-color: var(--#{$prefix}body-bg, #ffffff);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.1));
}

.card-header {
  padding: 1.5rem 1.25rem 0;
  background-color: var(--#{$prefix}body-bg, #ffffff);

  h2 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--#{$prefix}body-color, #212529);
  }
}

.card-body-grid {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  background-color: var(--#{$prefix}body-bg, #ffffff);

  @media (width >= map.get($grid-breakpoints, md)) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 3rem;
    padding: 1.5rem 2rem 2rem;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  color: var(--#{$prefix}secondary-color, #6c757d);
}

.info-value {
  font-size: 0.95rem;
  color: var(--#{$prefix}body-color, #212529);

  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;

  &.email-bold {
    font-weight: 600;
    font-size: 0.95rem;
  }
}

@media (max-width: 340px) {
  .info-value {
    font-size: 0.88rem;

    &.email-bold {
      font-size: 0.88rem;
    }
  }
}

.email-row {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
  border-top: 1px dashed var(--#{$prefix}border-color, #dee2e6);
  padding-top: 1.25rem;

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    align-items: flex-end;
    gap: 1.5rem;
  }
}

.email-container {
  flex: 1;
}

.btn-outline-modify {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--#{$prefix}border-radius, 8px);
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  width: 100%;

  background-color: transparent;
  color: var(--#{$prefix}body-color, #212529);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);

  @media (width >= map.get($grid-breakpoints, sm)) {
    width: auto;
  }

  &:hover {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    border-color: var(--#{$prefix}secondary-color, #6c757d);
  }
}

.edit-section-panel {
  grid-column: 1 / -1;
  margin-top: 0.5rem;
}
</style>
