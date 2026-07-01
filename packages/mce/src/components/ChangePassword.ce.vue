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
import { dnmaService } from '@/services/dnmaService'
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

watch([currentPassword, newPassword, confirmPassword], ([c, n, cf]) => {
  if (c || n || cf)
    message.value = ''
})

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

  if (newPassword.value.length < 12) {
    message.value = tPwd('error-length')
    messageType.value = 'error'
    await nextTick()
    alertRef.value?.focus()
    return
  }

  isLoading.value = true

  try {
    const baseUrl = props.mceApi.replace(TRAILING_SLASH, '')
    await postPassword(
      baseUrl,
      props.userId,
      currentPassword.value,
      newPassword.value,
      confirmPassword.value,
      props.userInfoApiUrl,
    )

    message.value = tPwd('success')
    messageType.value = 'success'
    await nextTick()
    alertRef.value?.focus()

    dnmaService.changePassword()
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
  <div class="change-password-panel">
    <div class="card-header">
      <h3 tabindex="0">
        {{ tPwd('title') }}
      </h3>
    </div>

    <form
      class="card-body"
      novalidate
      @submit.prevent="handleChangePassword"
    >
      <div class="form-group">
        <label
          class="info-label"
          for="current-password"
        >{{ tPwd('current-password') }}</label>
        <input
          id="current-password"
          v-model="currentPassword"
          type="password"
          :placeholder="tPwd('placeholder-current')"
          class="custom-input"
          autocomplete="current-password"
          aria-required="true"
          :aria-label="tPwd('current-password')"
          :aria-invalid="message && messageType === 'error' ? 'true' : 'false'"
          :aria-describedby="message && messageType === 'error' ? messageId : undefined"
        >
      </div>

      <div class="form-group">
        <label
          class="info-label"
          for="new-password"
        >{{ tPwd('new-password') }}</label>
        <input
          id="new-password"
          v-model="newPassword"
          type="password"
          :placeholder="tPwd('placeholder-new')"
          class="custom-input"
          autocomplete="new-password"
          aria-required="true"
          :aria-label="tPwd('new-password')"
          :aria-invalid="message && messageType === 'error' ? 'true' : 'false'"
          :aria-describedby="message && messageType === 'error' ? messageId : undefined"
        >
      </div>

      <div class="form-group">
        <label
          class="info-label"
          for="confirm-password"
        >{{ tPwd('confirm-password') }}</label>
        <input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          :placeholder="tPwd('placeholder-confirm')"
          class="custom-input"
          autocomplete="new-password"
          aria-required="true"
          :aria-label="tPwd('confirm-password')"
          :aria-invalid="message && messageType === 'error' ? 'true' : 'false'"
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
          :aria-busy="isLoading ? 'true' : undefined"
          :aria-label="isLoading ? tPwd('loading') : undefined"
        >
          <span
            v-if="isLoading"
            aria-hidden="true"
          >{{ tPwd('loading') }}</span>
          <span v-else>{{ tPwd('submit') }}</span>
        </button>
      </div>
    </form>
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

.change-password-panel {
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
