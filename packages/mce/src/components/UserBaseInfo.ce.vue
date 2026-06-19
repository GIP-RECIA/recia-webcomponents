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
import { inject } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'

defineOptions({ name: 'UserBaseInfo' })

const props = defineProps<{
  avatar: string
  userId: string
  userName: string
  etat?: string
  userMail?: string | null
  userInfoApiUrl: string
  mceApi: string
}>()

const emit = defineEmits<{
  (e: 'avatarUpdated'): void
}>()

const i18n = inject(I18nInjectionKey)
function m(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`user-info.${key}`) : key
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-picture">
      <!-- Nom + statut : visuel uniquement, résumé accessible porté par l'avatar-user -->
      <div class="user-name-block" aria-hidden="true">
        <p class="user-name">
          {{ props.userName }}
        </p>
        <span
          v-if="props.etat"
          class="etat-badge"
          :class="`etat-badge--${props.etat.toLowerCase()}`"
        >
          {{ props.etat }}
        </span>
      </div>
      <avatar-user
        :avatar="props.avatar"
        :user="props.userId"
        :user-info-api-url="props.userInfoApiUrl"
        :mce-api="props.mceApi"
        @avatar-updated="emit('avatarUpdated')"
      />
    </div>

    <!-- Email : lien focusable, libellé porté par aria-label pour éviter dl/dt/dd -->
    <a
      v-if="props.userMail"
      :href="`mailto:${props.userMail}`"
      class="email-link"
      :aria-label="`${m('email-personnel')} ${props.userMail}`"
    >
      <span aria-hidden="true" class="email-label">{{ m('email-personnel') }}</span>
      <span aria-hidden="true" class="email-value">{{ props.userMail }}</span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use '../assets/mce-shared' as *;

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.25rem;
  text-align: center;
  min-width: 0;
  box-sizing: border-box;
}

.profile-picture {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  width: 100%;
}

.user-name-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.user-name {
  margin: 0;
  font-size: var(--#{$prefix}font-size-h3);
  font-weight: 700;
  padding: 0 0.5rem;
  line-height: 1.3;
  overflow-wrap: break-word;
  word-break: break-word;
}

.etat-badge {
  @include mce-status-badge;
}

.email-link {
  @include mce-value-box(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  text-decoration: none;
  color: inherit;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  &:hover {
    background-color: var(--#{$prefix}hover);
    border-color: var(--#{$prefix}primary);
  }

  &:focus-visible {
    outline: 2px solid var(--#{$prefix}primary);
    outline-offset: 2px;
  }
}

.email-label {
  @include mce-info-label;
  display: block;
}

.email-value {
  @include mce-info-value;
  font-weight: 500;
  display: block;
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-all;
}
</style>
