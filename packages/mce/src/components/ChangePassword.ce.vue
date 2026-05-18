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
import { ref } from 'vue'
import { postPassword } from '@/services/serviceMce.ts'

defineOptions({ name: 'ChangePassword' })

const props = defineProps<{
  userInfoApiUrl: string
  userId: string
  mceApi: string
}>()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const isLoading = ref(false)

async function handleChangePassword() {
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    message.value = 'Tous les champs sont obligatoires'
    messageType.value = 'error'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    message.value = 'Les nouveaux mots de passe ne correspondent pas'
    messageType.value = 'error'
    return
  }

  if (newPassword.value.length < 8) {
    message.value = 'Le nouveau mot de passe doit contenir au moins 8 caractères'
    messageType.value = 'error'
    return
  }

  isLoading.value = true
  message.value = ''

  try {
    // eslint-disable-next-line e18e/prefer-static-regex
    const baseUrl = props.mceApi.replace(/\/$/, '')
    const fullUrl = `${baseUrl}/${props.userId}/change-password`

    await postPassword(
      fullUrl,
      currentPassword.value,
      newPassword.value,
      confirmPassword.value,
      props.userInfoApiUrl,
    )

    message.value = 'Mot de passe changé avec succès'
    messageType.value = 'success'

    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  }
  catch (error: unknown) {
    const apiMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
    message.value = apiMessage ?? 'Erreur lors du changement du mot de passe'
    messageType.value = 'error'
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="page-container">
    <div class="profile-card">
      <header class="card-header">
        <h2>Changer mon mot de passe</h2>
      </header>

      <div class="card-body-grid">
        <form class="password-form" @submit.prevent="handleChangePassword">
          <div class="form-group">
            <label class="info-label" for="current-password">Mot de passe actuel</label>
            <input
              id="current-password"
              v-model="currentPassword"
              type="password"
              placeholder="Entrez votre mot de passe actuel"
              required
              class="custom-input"
            >
          </div>

          <div class="form-group">
            <label class="info-label" for="new-password">Nouveau mot de passe</label>
            <input
              id="new-password"
              v-model="newPassword"
              type="password"
              placeholder="Au moins 8 caractères"
              required
              class="custom-input"
            >
          </div>

          <div class="form-group">
            <label class="info-label" for="confirm-password">Confirmer le nouveau mot de passe</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              placeholder="Répétez votre mot de passe"
              required
              class="custom-input"
            >
          </div>

          <div v-if="message" class="alert-message" :class="messageType">
            {{ message }}
          </div>

          <!-- Ligne d'action avec le bouton bordure 2px -->
          <div class="action-row">
            <button type="submit" :disabled="isLoading" class="btn-outline-modify">
              {{ isLoading ? 'Chargement...' : 'Changer le mot de passe' }}
            </button>
          </div>
        </form>
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
  display: flex;
  justify-content: center;

  @media (width >= map.get($grid-breakpoints, md)) {
    padding: 2.5rem;
  }
}

.profile-card {
  width: 100%;
  background-color: var(--#{$prefix}body-bg, #ffffff);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.1));
  overflow: hidden;
}

.card-header {
  padding: 1.5rem 1.25rem 0;
  background-color: var(--#{$prefix}body-bg, #ffffff);
  border-bottom: 1px solid var(--#{$prefix}border-color, #dee2e6);

  h2 {
    margin: 0;
    padding-bottom: 1.25rem;
  }
}

.card-body-grid {
  padding: 1.25rem;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: var(--#{$prefix}secondary-color, #6c757d);
}

.custom-input {
  padding: 0.75rem;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: var(--#{$prefix}border-radius, 8px);
  background-color: var(--#{$prefix}secondary-bg, #ffffff);
  color: var(--#{$prefix}body-color, #212529);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: var(--#{$prefix}secondary-color, #6c757d);
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: var(--#{$prefix}primary, #0056b3);
    box-shadow: 0 0 0 3px var(--#{$prefix}primary-focus, rgba(0, 86, 179, 0.25));
  }
}

.action-row {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  border-top: 1px solid var(--#{$prefix}border-color, #dee2e6);
  padding-top: 1.25rem;

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    justify-content: flex-end;
  }
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

  &:hover:not(:disabled) {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    border-color: var(--#{$prefix}secondary-color, #6c757d);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.alert-message {
  padding: 0.75rem;
  border-radius: var(--#{$prefix}border-radius, 8px);
  font-size: 0.85rem;
  font-weight: 600;

  &.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  &.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
}
</style>
