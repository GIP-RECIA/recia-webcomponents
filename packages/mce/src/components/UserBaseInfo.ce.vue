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
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'UserBaseInfo' })

const props = defineProps<{
  avatar: string
  userId: string
  userName: string
  userMail?: string | null
  userInfoApiUrl: string
  mceApi: string
}>()

const emit = defineEmits<{
  (e: 'avatarUpdated'): void
}>()

const { t } = useI18n()
const m = (key: string): string => t(`user-info.${key}`)
</script>

<template>
  <div class="profile-container">
    <div class="profile-picture">
      <avatar-user
        :avatar="props.avatar"
        :user="props.userId"
        :user-info-api-url="props.userInfoApiUrl"
        :mce-api="props.mceApi"
        @avatar-updated="emit('avatarUpdated')"
      />
      <h3 class="user-name">
        {{ props.userName }}
      </h3>
    </div>

    <div v-if="props.userMail" class="profile-info">
      <span class="info-label">{{ m('email') }}</span>
      <span class="info-value">{{ props.userMail }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';

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

.user-name {
  margin: 0;
  font-size: var(--#{$prefix}font-size-h3);
  font-weight: 700;
  color: var(--#{$prefix}basic-black);
  padding: 0 0.5rem;
  line-height: 1.3;
  overflow-wrap: break-word;
  word-break: break-word;
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
}

.info-label {
  display: block;
  font-size: var(--#{$prefix}font-size-xxs);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--#{$prefix}basic-black-lighter);
  margin-bottom: 4px;
}

.info-value {
  font-size: var(--#{$prefix}font-size-sm);
  color: var(--#{$prefix}basic-black);
  font-weight: 500;
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-all;
}
</style>
