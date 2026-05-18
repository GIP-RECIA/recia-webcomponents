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
      />
      <h1 class="user-name">
        {{ props.userName }}
      </h1>
    </div>
    <div v-if="props.userMail" class="profile-info">
      <span class="info-label">{{ m('email') }}</span>
      <span class="info-value">{{ props.userMail }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  min-width: 0;
}

.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

.user-name {
  font-family: $sora, Arial, sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--#{$prefix}body-color, #212529);
  margin: 0;
  padding: 0 0.5rem;
  letter-spacing: -0.025em;
  line-height: 1.3;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background-color: var(--#{$prefix}tertiary-bg, #f8f9fa);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--#{$prefix}border-color, #dee2e6);
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.info-label {
  font-family: $sora, Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--#{$prefix}secondary-color, #6c757d);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 0.9rem;
  color: var(--#{$prefix}body-color, #212529);
  font-weight: 500;
  width: 100%;

  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
}

@media (max-width: 340px) {
  .user-name {
    font-size: 1.15rem;
  }

  .profile-info {
    padding: 0.5rem;
  }

  .info-value {
    font-size: 0.85rem;
  }
}
</style>
