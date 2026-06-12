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
import { inject, nextTick, ref, watch } from 'vue'
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

// Ref pour restituer le focus sur le bouton "Modifier" après fermeture du panneau
const editEmailBtn = ref<HTMLButtonElement | null>(null)
// Ref pour déplacer le focus vers le panneau à l'ouverture
const editPanelRef = ref<HTMLDivElement | null>(null)

watch(
  () => props.userMail,
  (newVal) => {
    if (newVal)
      currentEmail.value = newVal
  },
)

async function toggleEmail() {
  isEmailOpen.value = !isEmailOpen.value
  if (isEmailOpen.value) {
    // Déplace le focus vers le panneau ChangeEmail à l'ouverture
    await nextTick()
    editPanelRef.value?.focus()
  }
}

function handleEmailUpdated(email: string) {
  currentEmail.value = email
  isEmailOpen.value = false
  emit('emailUpdated', email)
  // Restitue le focus sur le bouton "Modifier" après la mise à jour
  nextTick(() => editEmailBtn.value?.focus())
}

function handleCloseEmail() {
  isEmailOpen.value = false
  // Restitue le focus sur le bouton "Modifier" à la fermeture
  nextTick(() => editEmailBtn.value?.focus())
}
</script>

<template>
  <section class="profile-card" aria-labelledby="personal-info-title">
    <header class="card-header">
      <h3 id="personal-info-title">
        {{ tUser('informations-personnelles') }}
      </h3>
    </header>

    <!-- Données statiques uniquement : dl sémantiquement propre -->
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
          <time v-if="props.dateNaissance" :datetime="props.dateNaissance">
            {{ props.dateNaissance }}
          </time>
          <span v-else :aria-label="`${tUser('bod')} : ${tUser('not-available')}`">—</span>
        </dd>
      </div>
    </dl>

    <!-- Section email : regroupée, autonome, tout au même endroit dans le DOM -->
    <section
      class="email-section"
      aria-labelledby="email-section-label"
    >
      <div class="email-row">
        <div class="email-container">
          <p id="email-section-label" class="info-label">
            {{ tUser('email') }}
          </p>
          <p class="info-value info-value--bold">
            {{ currentEmail || '—' }}
          </p>
        </div>

        <div class="email-actions">
          <button
            v-if="!isEmailOpen && !props.canModifyEmail"
            ref="editEmailBtn"
            class="btn-primary small"
            type="button"
            :aria-expanded="isEmailOpen"
            aria-controls="edit-email-panel"
            @click="toggleEmail"
          >
            {{ tUser('modifier') }}
          </button>
        </div>
      </div>

      <!-- Panneau d'édition adjacent à la valeur qu'il modifie -->
      <div
        v-if="isEmailOpen"
        id="edit-email-panel"
        ref="editPanelRef"
        class="edit-section-panel"
        tabindex="-1"
        aria-live="polite"
      >
        <ChangeEmail
          :user-info-api-url="props.userInfoApiUrl"
          :mce-api="props.mceApi"
          :user-id="props.userId"
          :current-email="currentEmail"
          @updated="handleEmailUpdated"
          @close="handleCloseEmail"
        />
      </div>
    </section>
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
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-item {
  @include mce-info-item;
}

.info-label {
  @include mce-info-label;
}

.info-value {
  @include mce-info-value;
  margin: 0;

  &--bold {
    @include mce-info-value-bold;
  }
}

.email-section {
  padding: 1.25rem;
  border-top: 1px dashed var(--#{$prefix}stroke);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.email-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.email-row {
  display: flex;
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
  &:focus {
    outline: none;
  }
}
</style>
