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
import { inject, onUnmounted, ref } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
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

const TRAILING_SLASH = /\/$/

const i18n = inject(I18nInjectionKey)
function tEmail(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`change-email.${key}`) : key
}

const newEmail = ref('')
const confirmEmail = ref('')
const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const isLoading = ref(false)
const successTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const EMAIL_REGEX = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

onUnmounted(() => {
  if (successTimer.value)
    clearTimeout(successTimer.value)
})

function handleClose() {
  emit('close')
}

async function handleSubmit() {
  if (!newEmail.value || !confirmEmail.value) {
    message.value = tEmail('error-required')
    messageType.value = 'error'
    return
  }

  if (!EMAIL_REGEX.test(newEmail.value)) {
    message.value = tEmail('error-format')
    messageType.value = 'error'
    return
  }

  if (newEmail.value !== confirmEmail.value) {
    message.value = tEmail('error-mismatch')
    messageType.value = 'error'
    return
  }

  isLoading.value = true
  message.value = ''

  try {
    const baseUrl = props.mceApi.replace(TRAILING_SLASH, '')
    const fullUrl = `${baseUrl}/${props.userId}/update-email`

    await updateEmail(fullUrl, newEmail.value, confirmEmail.value, props.userInfoApiUrl)

    message.value = tEmail('success')
    messageType.value = 'success'

    successTimer.value = setTimeout(() => {
      emit('updated', newEmail.value)
    }, 1000)
  }
  catch (error: unknown) {
    const apiMessage
      = error instanceof Error
        ? error.message
        : (error as { response?: { data?: { message?: string } } })?.response?.data?.message

    message.value = apiMessage ?? tEmail('error-default')
    messageType.value = 'error'
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="change-email-panel">
    <header class="card-header">
      <h3>{{ tEmail('title') }}</h3>
    </header>

    <div class="card-body">
      <div class="form-group">
        <label class="info-label">{{ tEmail('current-email') }}</label>
        <div class="static-value">
          {{ props.currentEmail || '-' }}
        </div>
      </div>

      <div class="form-group">
        <label class="info-label" for="newEmail">{{ tEmail('new-email') }}</label>
        <input
          id="newEmail"
          v-model="newEmail"
          type="email"
          :placeholder="tEmail('placeholder')"
          class="custom-input"
        >
      </div>

      <div class="form-group">
        <label class="info-label" for="confirmEmail">{{ tEmail('confirm-email') }}</label>
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

      <div class="action-row">
        <button class="btn-secondary small" @click="handleClose">
          {{ tEmail('cancel') }}
        </button>

        <button
          class="btn-primary small"
          :disabled="isLoading"
          @click="handleSubmit"
        >
          <span v-if="isLoading">{{ tEmail('loading') }}</span>
          <span v-else>{{ tEmail('submit') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';

.change-email-panel {
  border: 1px solid var(--#{$prefix}stroke);
  border-radius: 10px;
  box-shadow: var(--#{$prefix}shadow-neutral) rgba(0, 0, 0, 0.1);
  overflow: hidden;
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

.card-body {
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
  display: block;
  font-size: var(--#{$prefix}font-size-xxs);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--#{$prefix}basic-black-lighter);
  margin-bottom: 4px;
}

.static-value {
  padding: 0.75rem;
  background-color: var(--#{$prefix}basic-grey);
  border: 1px solid var(--#{$prefix}stroke);
  border-radius: 10px;
  font-size: var(--#{$prefix}font-size-sm);
  color: var(--#{$prefix}basic-black);
  overflow-wrap: break-word;
  word-break: break-all;
}

.custom-input {
  padding: 0.75rem;
  border: 1px solid var(--#{$prefix}stroke);
  border-radius: 10px;
  color: var(--#{$prefix}basic-black);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: var(--#{$prefix}basic-black-lighter);
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: var(--#{$prefix}primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--#{$prefix}primary) 20%, transparent);
  }
}

.action-row {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
  flex-direction: column;

  @media (width >= map.get($grid-breakpoints, sm)) {
    flex-direction: row;
    justify-content: flex-end;
  }
}

.alert-message {
  padding: 0.75rem;
  border-radius: 10px;
  font-size: var(--#{$prefix}font-size-sm);
  font-weight: 600;
  overflow-wrap: break-word;

  &.success {
    background-color: color-mix(in srgb, var(--#{$prefix}system-blue) 10%, transparent);
    color: var(--#{$prefix}system-blue);
    border: 1px solid color-mix(in srgb, var(--#{$prefix}system-blue) 30%, transparent);
  }

  &.error {
    background-color: color-mix(in srgb, var(--#{$prefix}system-red) 10%, transparent);
    color: var(--#{$prefix}system-red);
    border: 1px solid color-mix(in srgb, var(--#{$prefix}system-red) 30%, transparent);
  }
}
</style>
