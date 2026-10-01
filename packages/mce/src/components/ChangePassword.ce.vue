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
import { inject, nextTick, onMounted, ref, watch } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import { dnmaService } from '@/services/dnmaService'
import {
  getNetworkPasswordStatus,
  postPassword,
  resetNetworkPassword,
} from '@/services/serviceMce.ts'

defineOptions({ name: 'ChangePassword' })

const props = defineProps<{
  userInfoApiUrl: string
  mceApi: string
}>()

const TRAILING_SLASH = /\/$/

const i18n = inject(I18nInjectionKey)
function tPwd(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`change-password.${key}`) : key
}

// Flux affiché : standard (ancien mot de passe) / réseau (changement direct, compte CVDL ntPass
// sans mot de passe local — conforme à l'ancienne application, sans code email).
type FlowMode = 'standard' | 'network'

const mode = ref<FlowMode>('standard')

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const isLoading = ref(false)

const alertRef = ref<HTMLDivElement | null>(null)

const messageId = 'change-password-message'

watch([currentPassword, newPassword, confirmPassword], () => {
  if (currentPassword.value || newPassword.value || confirmPassword.value)
    message.value = ''
})

// L'éligibilité au parcours « mot de passe réseau » est décidée côté serveur (groupes LDAP).
onMounted(async () => {
  try {
    const baseUrl = props.mceApi.replace(TRAILING_SLASH, '')
    const { data } = await getNetworkPasswordStatus(baseUrl, props.userInfoApiUrl)
    if (data?.eligible)
      mode.value = 'network'
  }
  catch (error) {
    // Statut indisponible : repli silencieux sur le flux classique.
    console.error('Impossible de récupérer le statut du mot de passe réseau.', error)
  }
})

function setMessage(text: string, type: 'success' | 'error') {
  message.value = text
  messageType.value = type
  void nextTick().then(() => alertRef.value?.focus())
}

function apiMessage(error: unknown, fallbackKey: string): string {
  const data = (error as { response?: { data?: { message?: string } } })?.response?.data
  return data?.message ?? tPwd(fallbackKey)
}

async function handleChangePassword() {
  setMessage('', 'error')

  if (mode.value === 'standard' && !currentPassword.value) {
    setMessage(tPwd('error-required'), 'error')
    return
  }
  if (!newPassword.value || !confirmPassword.value) {
    setMessage(tPwd('error-required'), 'error')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    setMessage(tPwd('error-mismatch'), 'error')
    return
  }
  if (newPassword.value.length < 12) {
    setMessage(tPwd('error-length'), 'error')
    return
  }

  isLoading.value = true

  try {
    const baseUrl = props.mceApi.replace(TRAILING_SLASH, '')
    if (mode.value === 'network') {
      await resetNetworkPassword(
        baseUrl,
        newPassword.value,
        confirmPassword.value,
        props.userInfoApiUrl,
      )
      setMessage(tPwd('success-network'), 'success')
    }
    else {
      await postPassword(
        baseUrl,
        currentPassword.value,
        newPassword.value,
        confirmPassword.value,
        props.userInfoApiUrl,
      )
      setMessage(tPwd('success'), 'success')
      currentPassword.value = ''
    }
    dnmaService.changePassword()
    newPassword.value = ''
    confirmPassword.value = ''
  }
  catch (error: unknown) {
    setMessage(apiMessage(error, mode.value === 'network' ? 'error-network-default' : 'error-default'), 'error')
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="change-password-panel">
    <div class="card-header">
      <h3>
        {{ mode === 'standard' ? tPwd('title') : tPwd('title-network') }}
      </h3>
    </div>

    <form
      class="card-body"
      novalidate
      @submit.prevent="handleChangePassword"
    >
      <template v-if="mode === 'standard'">
        <div class="field">
          <div class="field-layout">
            <div class="field-container">
              <div class="middle">
                <label for="current-password">{{ tPwd('current-password') }}</label>
                <input
                  id="current-password"
                  v-model="currentPassword"
                  type="password"
                  placeholder=" "
                  autocomplete="current-password"
                  aria-required="true"
                  :aria-invalid="message && messageType === 'error' ? 'true' : 'false'"
                  :aria-describedby="message && messageType === 'error' ? messageId : undefined"
                >
              </div>
            </div>
            <div class="active-indicator" />
          </div>
        </div>
      </template>

      <template v-else-if="mode === 'network'">
        <div class="network-info">
          {{ tPwd('network-info') }}
        </div>
      </template>

      <div class="field">
        <div class="field-layout">
          <div class="field-container">
            <div class="middle">
              <label for="new-password">{{ tPwd('new-password') }}</label>
              <input
                id="new-password"
                v-model="newPassword"
                type="password"
                placeholder=" "
                autocomplete="new-password"
                aria-required="true"
                :aria-invalid="message && messageType === 'error' ? 'true' : 'false'"
                :aria-describedby="message && messageType === 'error' ? messageId : undefined"
              >
            </div>
          </div>
          <div class="active-indicator" />
        </div>
      </div>

      <div class="field">
        <div class="field-layout">
          <div class="field-container">
            <div class="middle">
              <label for="confirm-password">{{ tPwd('confirm-password') }}</label>
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                placeholder=" "
                autocomplete="new-password"
                aria-required="true"
                :aria-invalid="message && messageType === 'error' ? 'true' : 'false'"
                :aria-describedby="message && messageType === 'error' ? messageId : undefined"
              >
            </div>
          </div>
          <div class="active-indicator" />
        </div>
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
          >{{ tPwd('loading') }}</span>
          <span v-else>
            {{ mode === 'network' ? tPwd('submit-network') : tPwd('submit') }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use '@gip-recia/ui/components/fields';
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

.action-row {
  @include mce-action-row;
}

.alert-message {
  @include mce-alert-message;
}

.network-info {
  padding: 0.75rem;
  font-size: var(--#{$prefix}font-size-sm);
  overflow-wrap: break-word;
  word-wrap: break-word;
  background-color: color-mix(in srgb, var(--#{$prefix}system-blue) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--#{$prefix}system-blue) 20%, transparent);
  border-radius: 10px;
}
</style>
