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
import type { SympaType } from '@/types/sympaTypes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n'
import { PermissionKey } from '@/types/permissionKeyEnum'

const props
  = defineProps<{
    sympaItem?: SympaType
  }>()
const { t } = useI18n()

async function copyAddress() {
  await navigator.clipboard.writeText(props.sympaItem!.address)
}
</script>

<template>
  <div v-if="props.sympaItem !== undefined" class="card-wrapper">
    <div class="grid-wrapper">
      <p class="description">
        {{ props.sympaItem.description }}
      </p>
      <div class="tags-wrapper">
        <span v-for="key in Object.values(PermissionKey).filter(x => props.sympaItem![x] === true)" :key="key" class="permission-tag">
          {{ t(`permission-labels.${key}`) }}
        </span>
      </div>
    </div>

    <div class="address-wrapper grid-wrapper">
      <button v-if="props.sympaItem.editor" class="address btn-secondary">
        <div class="address-div">
          {{ props.sympaItem.address }}
        </div>
      </button>
      <p v-else class="address">
        {{ props.sympaItem.address }}
      </p>
    </div>

    <div class="grid-wrapper btns">
      <button class="btn-tertiary copy" @click="copyAddress()">
        <span>{{ t('card-esup-sympa.copy') }}</span>
        <FontAwesomeIcon class="fa-icon" :icon="['far', 'copy']" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/main.scss' as *;

.grid-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  &.address-wrapper,
  &.btns {
    justify-content: center;
  }

  &.btns {
    align-items: flex-start;
  }
}

.grid-wrapper.btns {
  display: flex;
  align-items: flex-start;
  gap: 1em;
}

.grid-wrapper.btns button {
  width: auto;
  max-width: 100%;
}

p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;

  overflow: hidden;
}

@media (width < 576px) {
  p {
    font-size: 0.8em;
  }

  button.address {
    font-size: 0.75em;
  }

  .address-wrapper {
    .address-div,
    p.address {
      white-space: normal;
      overflow-wrap: anywhere;
      word-break: normal;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;

      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.permission-tag {
  font-family: $dm-sans;
  font-weight: normal;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: fit-content;
  height: auto;
  background-color: var(--recia-primary);
  border-radius: 20px;
  text-wrap: nowrap;
  text-align: center;
  padding: 4px 12px;
  color: white;
}

p {
  margin: 5px;
  margin-right: 5px;
  &.description {
    font-weight: bold;
  }
}

.address-wrapper {
  .address {
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: normal;
  }

  button.address {
    margin-left: 5px;
    margin-right: 5px;
  }
}

.card-wrapper {
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
  height: 180px;
  width: auto;
  box-shadow: $shadow-neutral;
  overflow: hidden;
  transition:
    outline 0.15s ease-out,
    box-shadow 0.15s ease-out,
    background-color 0.15s ease-out,
    box-shadow 0.15s ease-out;
  display: grid;
  grid-template-rows: 3fr 3fr 2fr;
}

.fa-icon {
  height: 1.25em;
  width: 1.25em;
  vertical-align: bottom;
}

.tags-wrapper {
  margin-left: 5px;
  padding: 1px;
  width: fit-content;
  display: flex;
  span {
    font-size: 0.65em;
  }
  gap: 4px;
}
</style>
