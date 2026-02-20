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
import type { SympaList } from '@/types/sympaTypes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n'
import { PermissionKey } from '@/types/permissionKeyEnum'

const props
  = defineProps<{
    sympaList?: SympaList
  }>()
const { t } = useI18n()

async function copyAddress() {
  await navigator.clipboard.writeText(props.sympaList!.address)
}
</script>

<template>
  <div v-if="props.sympaList !== undefined" class="card-wrapper">
    <div class="part-wrapper description-and-tags">
      <p class="description">
        {{ props.sympaList.subject }}
      </p>
      <div class="tags-wrapper">
        <span v-for="key in Object.values(PermissionKey).filter(x => props.sympaList![x] === true)" :key="key" class="tag small permission-tag">
          {{ t(`permission-labels.${key}`) }}
        </span>
      </div>
    </div>

    <div class="address-wrapper part-wrapper">
      <p class="address">
        {{ props.sympaList.address }}
      </p>
    </div>

    <div class="part-wrapper btns">
      <button class="btn-secondary copy small" @click="copyAddress()">
        <span>{{ t('card-sympa.copy') }}</span>
        <FontAwesomeIcon class="fa-icon" :icon="['far', 'copy']" />
      </button>
      <button v-if="sympaList?.editor" class="btn-secondary copy small" @click="copyAddress()">
        <span>{{ t('card-sympa.email') }}</span>
        <FontAwesomeIcon class="fa-icon" :icon="['far', 'paper-plane']" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/main.scss' as *;

.part-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  &.address-wrapper,
  &.btns {
    justify-content: center;
  }

  &.description-and-tags {
    height: fit-content;
  }
  &.address-wrapper {
    p {
      font-size: 0.9em;
    }
    flex-grow: 1;
  }

  &.btns {
    display: flex;
    align-items: end;
    justify-content: end;
    flex-direction: row;
    flex-grow: 0;
    height: fit-content;
    gap: 5px;
  }
}

.part-wrapper.btns button {
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
  background-color: var(--recia-primary) !important;
}

p {
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
}

.card-wrapper {
  padding: 5px;
  background-color: white;
  border-radius: 10px;
  height: 160px;
  width: auto;
  box-shadow: $shadow-neutral;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.fa-icon {
  height: 1.25em;
  width: 1.25em;
  vertical-align: bottom;
}

.tags-wrapper {
  padding: 1px;
  width: fit-content;
  display: flex;
  span {
    font-size: 0.65em;
  }
  gap: 4px;
}
</style>
