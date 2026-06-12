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
  <section class="profile-container" aria-labelledby="user-baseinfo-heading">
    <div class="profile-picture">
      <avatar-user
        :avatar="props.avatar"
        :user="props.userId"
        :user-info-api-url="props.userInfoApiUrl"
        :mce-api="props.mceApi"
        @avatar-updated="emit('avatarUpdated')"
      />
      <div class="user-name-block">
        <h3 id="user-baseinfo-heading" class="user-name">
          {{ props.userName }}
        </h3>
        <span
          v-if="props.etat"
          class="etat-badge"
          :class="`etat-badge--${props.etat.toLowerCase()}`"
          :aria-label="`${m('etat')} : ${props.etat}`"
        >
          {{ props.etat }}
        </span>
      </div>
    </div>
    <dl v-if="props.userMail" class="profile-info">
      <dt class="info-label">
        {{ m('email') }}
      </dt>
      <dd class="info-value">
        <a
          :href="`mailto:${props.userMail}`"
          class="email-link"
          :aria-label="`${m('email')} : ${props.userMail}`"
        >
          {{ props.userMail }}
        </a>
      </dd>
    </dl>
  </section>
</template>

<style lang="scss" scoped>
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use './mce-shared' as *;

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
  flex-direction: column;
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

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-color: var(--#{$prefix}basic-grey);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--#{$prefix}stroke);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  margin: 0;
}

.info-label {
  @include mce-info-label;
}

.info-value {
  @include mce-info-value;
  font-weight: 500;
  width: 100%;
  margin: 0;
}

.email-link {
  color: inherit;
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: normal;
  width: auto;
  font-size: clamp(0.65rem, 1vw, var(--#{$prefix}font-size-sm));

  &:hover,
  &:focus-visible {
    text-decoration: underline;
    color: var(--#{$prefix}primary);
  }

  &:focus-visible {
    outline: 2px solid var(--#{$prefix}primary);
    outline-offset: 2px;
    border-radius: 4px;
  }
}
</style>
