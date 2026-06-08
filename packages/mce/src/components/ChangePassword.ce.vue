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
import { inject, nextTick, ref } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import { postPassword } from '@/services/serviceMce.ts'

defineOptions({ name: 'ChangePassword' })

const props = defineProps<{
  userInfoApiUrl: string
  userId: string
  mceApi: string
}>()

const TRAILING_SLASH = /\/$/

const i18n = inject(I18nInjectionKey)
function tPwd(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`change-password.${key}`) : key
}

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const isLoading = ref(false)

const alertRef = ref<HTMLDivElement | null>(null)

const messageId = 'change-password-message'

async function handleChangePassword() {
  message.value = ''
  await nextTick()

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    message.value = tPwd('error-required')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    message.value = tPwd('error-mismatch')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
    return
  }

  if (newPassword.value.length < 8) {
    message.value = tPwd('error-length')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
    return
  }

  isLoading.value = true

  try {
    const baseUrl = props.mceApi.replace(TRAILING_SLASH, '')
    const fullUrl = `${baseUrl}/${props.userId}/change-password`

    await postPassword(
      fullUrl,
      currentPassword.value,
      newPassword.value,
      confirmPassword.value,
      props.userInfoApiUrl,
    )

    message.value = tPwd('success')
    messageType.value = 'success'
    await nextTick()
    alertRef.value?.focus()

    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  }
  catch (error: unknown) {
    const apiMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
    message.value = apiMessage ?? tPwd('error-default')
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
  <section class="profile-card" aria-labelledby="change-password-title">
    <header class="card-header">
      <h3 id="change-password-title">
        {{ tPwd('title') }}
      </h3>
    </header>

    <div class="card-body">
      <form class="password-form" novalidate @submit.prevent="handleChangePassword">
        <div class="form-group">
          <label class="info-label" for="current-password">{{ tPwd('current-password') }}</label>
          <input
            id="current-password"
            v-model="currentPassword"
            type="password"
            :placeholder="tPwd('placeholder-current')"
            class="custom-input"
            autocomplete="current-password"
            aria-required="true"
            :aria-invalid="message && messageType === 'error' ? 'true' : 'false'"
            :aria-describedby="message && messageType === 'error' ? messageId : undefined"
          >
        </div>

        <div class="form-group">
          <label class="info-label" for="new-password">{{ tPwd('new-password') }}</label>
          <input
            id="new-password"
            v-model="newPassword"
            type="password"
            :placeholder="tPwd('placeholder-new')"
            class="custom-input"
            autocomplete="new-password"
            aria-required="true"
            :aria-invalid="message && messageType === 'error' ? 'true' : 'false'"
            :aria-describedby="message && messageType === 'error' ? messageId : undefined"
          >
        </div>

        <div class="form-group">
          <label class="info-label" for="confirm-password">{{ tPwd('confirm-password') }}</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            :placeholder="tPwd('placeholder-confirm')"
            class="custom-input"
            autocomplete="new-password"
            aria-required="true"
            :aria-invalid="message && messageType === 'error' ? 'true' : 'false'"
            :aria-describedby="message && messageType === 'error' ? messageId : undefined"
          >
        </div>

        <div
          v-if="message"
          :id="messageId"
          ref="alertRef"
          class="alert-message"
          :class="messageType"
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
            :aria-busy="isLoading ? 'true' : undefined"
            :aria-label="isLoading ? tPwd('loading') : undefined"
          >
            <span v-if="isLoading" aria-hidden="true">{{ tPwd('loading') }}</span>
            <span v-else>{{ tPwd('submit') }}</span>
          </button>
        </div>
      </form>
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

.card-body {
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
  display: block;
  font-size: var(--#{$prefix}font-size-xxs);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--#{$prefix}basic-black-lighter);
  margin-bottom: 4px;
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

  &:focus-visible {
    outline: none;
    border-color: var(--#{$prefix}primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--#{$prefix}primary) 20%, transparent);
  }

  // Bordure rouge quand le champ est invalide (signalé via aria-invalid="true")
  &[aria-invalid='true'] {
    border-color: var(--#{$prefix}system-red);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--#{$prefix}system-red) 15%, transparent);
  }
}

.action-row {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--#{$prefix}stroke);

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

  // Focus visible uniquement en navigation clavier (pas au clic JS)
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

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
