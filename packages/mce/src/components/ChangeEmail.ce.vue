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
import { computed, inject, nextTick, ref, watch } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import { dnmaService } from '@/services/dnmaService'
import { updateEmail, verifyEmail } from '@/services/serviceMce'

defineOptions({ name: 'ChangeEmail' })

const props = defineProps<{
  userInfoApiUrl: string
  userId: string
  currentEmail?: string
  currentEmailPerso?: string
  mceApi: string
}>()

const TRAILING_SLASH = /\/$/

const i18n = inject(I18nInjectionKey)
function tEmail(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`change-email.${key}`) : key
}

const newEmail = ref('')
const confirmEmail = ref('')
const verificationCode = ref('')
const step = ref<'form' | 'code' | 'verified'>('form')
const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const isLoading = ref(false)

const alertRef = ref<HTMLDivElement | null>(null)

const EMAIL_REGEX = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
const CODE_REGEX = /^\d{6}$/

const messageId = 'change-email-message'

const displayedCurrentEmail = computed(() => props.currentEmailPerso || props.currentEmail || tEmail('no-email'))

watch([newEmail, confirmEmail], ([n, c]) => {
  if (n || c)
    message.value = ''
})

watch(verificationCode, () => {
  if (verificationCode.value)
    message.value = ''
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

    step.value = 'code'
    message.value = tEmail('code-sent')
    messageType.value = 'success'
    dnmaService.changeEmail()
    await nextTick()
    alertRef.value?.focus()
  }
  catch (error: unknown) {
    const apiMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      ?? (error instanceof Error ? error.message : undefined)

    message.value = apiMessage ?? tEmail('error-default')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
  }
  finally {
    isLoading.value = false
  }
}

async function handleVerify() {
  message.value = ''
  await nextTick()

  if (!CODE_REGEX.test(verificationCode.value)) {
    message.value = tEmail('code-error-format')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
    return
  }

  isLoading.value = true

  try {
    const baseUrl = props.mceApi.replace(TRAILING_SLASH, '')
    await verifyEmail(baseUrl, props.userId, verificationCode.value, props.userInfoApiUrl)

    step.value = 'verified'
    message.value = tEmail('verified')
    messageType.value = 'success'
    await nextTick()
    alertRef.value?.focus()
  }
  catch (error: unknown) {
    const apiMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      ?? (error instanceof Error ? error.message : undefined)

    message.value = apiMessage ?? tEmail('error-default')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
  }
  finally {
    isLoading.value = false
  }
}

async function handleResend() {
  message.value = ''
  await nextTick()

  isLoading.value = true

  try {
    const baseUrl = props.mceApi.replace(TRAILING_SLASH, '')
    await updateEmail(baseUrl, props.userId, newEmail.value, confirmEmail.value, props.userInfoApiUrl)

    message.value = tEmail('code-sent')
    messageType.value = 'success'
    verificationCode.value = ''
    await nextTick()
    alertRef.value?.focus()
  }
  catch (error: unknown) {
    const apiMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      ?? (error instanceof Error ? error.message : undefined)

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
      <div class="card-header">
        <h3 tabindex="0">
          {{ tEmail('title') }}
        </h3>
      </div>

      <form
        v-if="step === 'form'"
        class="card-body"
        novalidate
        @submit.prevent="handleSubmit"
      >
        <div class="form-group">
          <label class="info-label">{{ tEmail('current-email') }}</label>
          <span class="static-value">{{ displayedCurrentEmail }}</span>
        </div>

        <div class="form-group">
          <label
            class="info-label"
            for="newEmail"
          >{{ tEmail('new-email') }}</label>
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
          <label
            class="info-label"
            for="confirmEmail"
          >{{ tEmail('confirm-email') }}</label>
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

      <div
        v-else-if="step === 'code'"
        class="card-body"
      >
        <p class="verification-info">
          {{ tEmail('code-sent') }}
        </p>
        <p class="verification-email">
          <strong>{{ newEmail }}</strong>
        </p>

        <div class="form-group">
          <label
            class="info-label"
            for="verificationCode"
          >{{ tEmail('verification-code') }}</label>
          <input
            id="verificationCode"
            v-model="verificationCode"
            type="text"
            inputmode="numeric"
            maxlength="6"
            :placeholder="tEmail('code-placeholder')"
            class="custom-input"
            autocomplete="one-time-code"
            aria-required="true"
            :aria-label="tEmail('verification-code')"
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
            type="button"
            class="btn-primary small"
            :disabled="isLoading"
            :aria-label="isLoading ? tEmail('loading') : tEmail('verify')"
            @click="handleVerify"
          >
            <span aria-hidden="true">{{ isLoading ? tEmail('loading') : tEmail('verify') }}</span>
          </button>
          <button
            type="button"
            class="btn-secondary small"
            :disabled="isLoading"
            :aria-label="tEmail('resend')"
            @click="handleResend"
          >
            {{ tEmail('resend') }}
          </button>
        </div>
      </div>

      <div
        v-else
        class="card-body"
      >
        <p class="success-message">
          {{ tEmail('verified') }}
        </p>
      </div>
    </div>
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
</style>
