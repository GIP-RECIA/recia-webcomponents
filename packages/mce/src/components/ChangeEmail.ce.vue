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
import { inject, nextTick, onUnmounted, ref } from 'vue'
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

const alertRef = ref<HTMLDivElement | null>(null)

const EMAIL_REGEX = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

const messageId = 'change-email-message'

onUnmounted(() => {
  if (successTimer.value)
    clearTimeout(successTimer.value)
})

async function handleSubmit() {
  message.value = ''
  await nextTick()

  if (!newEmail.value || !confirmEmail.value) {
    message.value = tEmail('error-required')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
    return
  }

  if (!EMAIL_REGEX.test(newEmail.value)) {
    message.value = tEmail('error-format')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
    return
  }

  if (newEmail.value !== confirmEmail.value) {
    message.value = tEmail('error-mismatch')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
    return
  }

  isLoading.value = true

  try {
    const baseUrl = props.mceApi.replace(TRAILING_SLASH, '')
    await updateEmail(baseUrl, props.userId, newEmail.value, confirmEmail.value, props.userInfoApiUrl)

    message.value = tEmail('success')
    messageType.value = 'success'
    await nextTick()
    alertRef.value?.focus()

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
    await nextTick()
    alertRef.value?.focus()
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="card-wrapper">
    <div class="change-email-panel">
      <span class="sr-only" tabindex="-1" data-panel-start>{{ tEmail('title') }}</span>

      <div class="card-header">
        <h3 tabindex="0">
          {{ tEmail('title') }}
        </h3>
      </div>

      <form class="card-body" role="none" novalidate @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="info-label">{{ tEmail('current-email') }}</label>
          <span class="static-value">{{ props.currentEmail || '-' }}</span>
        </div>

        <div class="form-group">
          <label class="info-label" for="newEmail">{{ tEmail('new-email') }}</label>
          <input
            id="newEmail"
            v-model="newEmail"
            type="email"
            :placeholder="tEmail('placeholder')"
            class="custom-input"
            autocomplete="email"
            aria-required="true"
            :aria-label="tEmail('new-email')"
            :aria-invalid="message && messageType === 'error' ? 'true' : undefined"
            :aria-describedby="message && messageType === 'error' ? messageId : undefined"
          >
        </div>

        <div class="form-group">
          <label class="info-label" for="confirmEmail">{{ tEmail('confirm-email') }}</label>
          <input
            id="confirmEmail"
            v-model="confirmEmail"
            type="email"
            :placeholder="tEmail('placeholder')"
            class="custom-input"
            autocomplete="email"
            aria-required="true"
            :aria-label="tEmail('confirm-email')"
            :aria-invalid="message && messageType === 'error' ? 'true' : undefined"
            :aria-describedby="message && messageType === 'error' ? messageId : undefined"
          >
        </div>

        <div
          v-if="message"
          :id="messageId"
          ref="alertRef"
          class="alert-message"
          :class="`alert-message--${messageType}`"
          role="alert"
          tabindex="-1"
        >
          {{ message }}
        </div>

        <div class="action-row">
          <button
            type="submit"
            class="btn-primary small"
            :disabled="isLoading"
            :aria-label="isLoading ? tEmail('loading') : tEmail('submit')"
          >
            <span aria-hidden="true">{{ isLoading ? tEmail('loading') : tEmail('submit') }}</span>
          </button>
        </div>
      </form>
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
@use './mce-shared' as *;

.change-email-panel {
  @include mce-card-base;
}

.card-header {
  @include mce-card-header;
}

.card-body {
  @include mce-card-body;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  @include mce-form-group;
}

.info-label {
  @include mce-info-label;
}

.static-value {
  @include mce-value-box;
  padding: 0.75rem;
  font-size: var(--#{$prefix}font-size-sm);
  overflow-wrap: break-word;
  word-break: break-all;
}

.custom-input {
  @include mce-custom-input;
}

.action-row {
  @include mce-action-row;
}

.alert-message {
  @include mce-alert-message;
}

.sr-only {
  @include mce-sr-only;
}
</style>
