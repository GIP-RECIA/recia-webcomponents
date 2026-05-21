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
import { updateEmail } from '@/services/serviceMce.ts'

defineOptions({ name: 'ChangeEmail' })

const props = defineProps<{
  userInfoApiUrl: string
  userId: string
  currentEmail?: string
  mceApi: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updated', email: string): void
}>()

const newEmail = ref('')
const confirmEmail = ref('')
const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const isLoading = ref(false)

const EMAIL_REGEX = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

function handleClose() {
  emit('close')
}

async function handleSubmit() {
  if (!newEmail.value || !confirmEmail.value) {
    message.value = 'Tous les champs sont obligatoires.'
    messageType.value = 'error'
    return
  }

  if (!EMAIL_REGEX.test(newEmail.value)) {
    message.value = 'Le format de l\'email est invalide.'
    messageType.value = 'error'
    return
  }

  if (newEmail.value !== confirmEmail.value) {
    message.value = 'Les emails ne correspondent pas.'
    messageType.value = 'error'
    return
  }

  isLoading.value = true
  message.value = ''

  try {
    // eslint-disable-next-line e18e/prefer-static-regex
    const baseUrl = props.mceApi.replace(/\/$/, '')
    const fullUrl = `${baseUrl}/${props.userId}/update-email`

    await updateEmail(fullUrl, newEmail.value, confirmEmail.value, props.userInfoApiUrl)

    message.value = 'Email mis à jour avec succès !'
    messageType.value = 'success'

    setTimeout(() => {
      emit('updated', newEmail.value)
    }, 1000)
  }
  catch (error: unknown) {
    const apiMessage
      = error instanceof Error
        ? error.message
        : (error as { response?: { data?: { message?: string } } })?.response?.data?.message

    message.value = apiMessage ?? 'Erreur lors de la modification.'
    messageType.value = 'error'
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="change-email-panel">
    <header class="panel-header">
      <h3>Modifier l'adresse email</h3>
    </header>

    <div class="panel-body">
      <div class="form-group">
        <label class="info-label">Email actuel</label>
        <div class="static-value">
          {{ props.currentEmail || '-' }}
        </div>
      </div>

      <div class="form-group">
        <label class="info-label" for="newEmail">Nouvel email</label>
        <input
          id="newEmail"
          v-model="newEmail"
          type="email"
          placeholder="exemple@domaine.fr"
          class="custom-input"
        >
      </div>

      <div class="form-group">
        <label class="info-label" for="confirmEmail">Confirmation du nouvel email</label>
        <input
          id="confirmEmail"
          v-model="confirmEmail"
          type="email"
          class="custom-input"
        >
      </div>

      <div v-if="message" class="alert-message" :class="messageType">
        {{ message }}
      </div>

      <div class="panel-actions">
        <button class="btn-secondary" @click="handleClose">
          Annuler
        </button>

        <button
          class="btn-primary"
          :disabled="isLoading"
          @click="handleSubmit"
        >
          <span v-if="isLoading">...</span>
          <span v-else>Valider</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.change-email-panel {
  background-color: var(--#{$prefix}body-bg, #ffffff);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px var(--#{$prefix}shadow-neutral, rgba(0, 0, 0, 0.1));
  overflow: hidden;
}

.panel-header {
  padding: 1.25rem;
  border-bottom: 1px solid var(--#{$prefix}border-color, #dee2e6);

  h3 {
    margin: 0;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--#{$prefix}body-color, #212529);
  }
}

.panel-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-sizing: border-box;
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
  color: var(--#{$prefix}body-color, #212529);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.static-value {
  padding: 0.75rem;
  background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: var(--#{$prefix}border-radius, 8px);
  color: var(--#{$prefix}body-color, #212529);
  font-size: 0.9rem;

  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
}

.custom-input {
  padding: 0.75rem;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  border-radius: var(--#{$prefix}border-radius, 8px);
  background-color: var(--#{$prefix}secondary-bg, #ffffff);
  color: var(--#{$prefix}body-color, #212529);
  width: 100%;
  box-sizing: border-box;
  font-size: 0.95rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: var(--#{$prefix}primary, #0056b3);
    box-shadow: 0 0 0 3px var(--#{$prefix}primary-focus, rgba(0, 86, 179, 0.25));
  }
}

.panel-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    justify-content: flex-end;
  }
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--#{$prefix}border-radius, 8px);
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    opacity 0.2s;
  width: 100%;

  @media (width >= map.get($grid-breakpoints, sm)) {
    width: auto;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn-primary {
  background-color: var(--#{$prefix}primary, #0056b3);
  color: var(--#{$prefix}primary-contrast, #ffffff);
  border: 1px solid transparent;

  &:hover:not(:disabled) {
    background-color: var(--#{$prefix}primary-hover, var(--#{$prefix}primary));
    filter: brightness(90%);
  }
}

.btn-secondary {
  background-color: transparent;
  color: var(--#{$prefix}body-color, #212529);
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);

  &:hover:not(:disabled) {
    background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
    border-color: var(--#{$prefix}secondary-color, #6c757d);
  }
}

.alert-message {
  padding: 0.75rem;
  border-radius: var(--#{$prefix}border-radius, 8px);
  font-size: 0.85rem;
  font-weight: 600;
  word-wrap: break-word;
  overflow-wrap: break-word;

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

@media (max-width: 330px) {
  .panel-header,
  .panel-body {
    padding: 0.85rem;
  }

  .panel-header h3 {
    font-size: 0.9rem;
  }

  .info-label {
    font-size: 0.7rem;
  }

  .static-value,
  .custom-input {
    padding: 0.65rem;
    font-size: 0.85rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.65rem 1rem;
    font-size: 0.8rem;
  }
}
</style>
