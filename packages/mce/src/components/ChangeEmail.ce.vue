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
import { inject, nextTick, onMounted, onUnmounted, ref } from 'vue'
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

const alertRef = ref<HTMLDivElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)

const EMAIL_REGEX = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

const messageId = 'change-email-message'

function handleKeydown(event: KeyboardEvent) {
  // Fermeture au clavier avec Échap
  if (event.key === 'Escape') {
    emit('close')
    return
  }
  if (event.key === 'Tab') {
    const panel = panelRef.value
    if (!panel)
      return

    const focusableElements = Array.from(
      panel.querySelectorAll('input:not([disabled]), button:not([disabled]), [tabindex="0"]'),
    ) as HTMLElement[]

    if (focusableElements.length === 0)
      return

    const first = focusableElements[0]
    const last = focusableElements.at(-1) as HTMLElement

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    }
    else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}

function handleFocusIn(event: FocusEvent) {
  const panel = panelRef.value
  const target = event.target as HTMLElement

  if (panel && !panel.contains(target)) {
    event.preventDefault()
    event.stopImmediatePropagation()
    const firstFocusable = panel.querySelector('button:not([disabled]), input:not([disabled])') as HTMLElement
    firstFocusable?.focus()
  }
}

function focusFirst() {
  const panel = panelRef.value
  const focusable = panel?.querySelectorAll('input:not([disabled]), button:not([disabled]), [tabindex="0"]')
  if (focusable && focusable.length > 1)
    (focusable[1] as HTMLElement).focus()
}

function focusLast() {
  const panel = panelRef.value
  const focusable = panel?.querySelectorAll('input:not([disabled]), button:not([disabled]), [tabindex="0"]')
  if (focusable && focusable.length > 2)
    (focusable[focusable.length - 2] as HTMLElement).focus()
}

onMounted(() => document.addEventListener('keydown', handleKeydown, true))
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown, true)
  if (successTimer.value)
    clearTimeout(successTimer.value)
})

function handleClose() {
  emit('close')
}

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
    const fullUrl = `${baseUrl}/${props.userId}/update-email`

    await updateEmail(fullUrl, newEmail.value, confirmEmail.value, props.userInfoApiUrl)

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
  <section
    class="change-email-panel"
    aria-labelledby="change-email-title"
    @focusin="handleFocusIn"
  >
    <div ref="panelRef">
      <!-- Sentinelle début : Shift+Tab depuis le premier élément cycle vers le dernier -->
      <span tabindex="0" aria-hidden="true" @focus="focusLast" />

      <header class="card-header">
        <h3 id="change-email-title">
          {{ tEmail('title') }}
        </h3>
      </header>

      <form class="card-body" novalidate @submit.prevent="handleSubmit">
        <!-- Email actuel en lecture seule -->
        <dl class="form-group">
          <dt class="info-label">
            {{ tEmail('current-email') }}
          </dt>
          <dd class="static-value">
            {{ props.currentEmail || '-' }}
          </dd>
        </dl>
        <!-- Nouvel email -->
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
            :aria-describedby="message && messageType === 'error'
              ? `current-email-value ${messageId}`
              : 'current-email-value'"
            :aria-invalid="message && messageType === 'error' ? 'true' : undefined"
          >
        </div>

        <!-- Confirmation email -->
        <div class="form-group">
          <label class="info-label" for="confirmEmail">{{ tEmail('confirm-email') }}</label>
          <input
            id="confirmEmail"
            v-model="confirmEmail"
            type="email"
            class="custom-input"
            autocomplete="email"
            aria-required="true"
            :aria-invalid="message && messageType === 'error' ? 'true' : undefined"
            :aria-describedby="message && messageType === 'error' ? messageId : undefined"
          >
        </div>

        <div
          v-if="message"
          :id="messageId"
          ref="alertRef"
          class="alert-message"
          :class="messageType"
          :role="messageType === 'success' ? 'status' : undefined"
          :aria-live="messageType === 'success' ? 'polite' : undefined"
          tabindex="-1"
        >
          {{ message }}
        </div>

        <div class="action-row">
          <button type="button" class="btn-secondary small" @click="handleClose">
            {{ tEmail('cancel') }}
          </button>
          <button
            type="submit"
            class="btn-primary small"
            :disabled="isLoading"
            :aria-busy="isLoading ? 'true' : undefined"
          >
            <span v-if="isLoading" aria-hidden="true">{{ tEmail('loading') }}</span>
            <span v-else>{{ tEmail('submit') }}</span>
          </button>
        </div>
      </form>
      <span tabindex="0" aria-hidden="true" @focus="focusFirst" />
    </div>
  </section>
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
  padding: 0.75rem;
  background-color: var(--#{$prefix}basic-grey);
  border: 1px solid var(--#{$prefix}stroke);
  border-radius: 10px;
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
