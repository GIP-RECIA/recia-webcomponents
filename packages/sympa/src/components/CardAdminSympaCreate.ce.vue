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
import type { CreatableList } from '@/types/sympaTypes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n'

const props
  = defineProps<{
    sympaList?: CreatableList
  }>()
const emit = defineEmits(['createList'])

const { t } = useI18n()

function createList(): void {
  emit('createList', props.sympaList?.modelId, props.sympaList?.modelParam, props.sympaList?.subject, props.sympaList?.address)
}
</script>

<template>
  <div v-if="props.sympaList !== undefined" class="card-wrapper">
    <div class="part-wrapper description-and-tags">
      <h2 class="description">
        {{ props.sympaList.subject }}
      </h2>
    </div>

    <div class="address-wrapper part-wrapper">
      <p class="address">
        {{ props.sympaList.address }}
      </p>
    </div>

    <div class="part-wrapper btns">
      <button class="btn-secondary copy small" @click="createList()">
        <span>{{ t('card-sympa.create') }}</span>
        <FontAwesomeIcon class="fa-icon" :icon="['fas', 'plus']" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/core/typo' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/global';
@use '@gip-recia/ui/components';
.part-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 0;

  &.address-wrapper {
    justify-content: center;
  }

  &.description-and-tags {
    h2 {
      word-wrap: anywhere;
    }
  }
  &.address-wrapper {
    justify-content: start;
    min-height: 0;
    overflow-y: auto;
    .address {
      min-height: 0;
      flex-shrink: 0;
      word-break: break-all;
    }
  }

  &.btns {
    display: flex;
    align-items: end;
    justify-content: end;
    flex-direction: row;
    flex-grow: 1;
    gap: 5px;
  }
}

.part-wrapper.btns button {
  width: auto;
  max-width: 100%;
}

@media (width < 576px) {
  .address-wrapper {
    .address-div,
    p.address {
      white-space: normal;
      overflow-wrap: anywhere;
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

.card-wrapper {
  padding: 16px;
  background-color: white;
  border-radius: 10px;
  height: 100%;
  width: auto;
  box-shadow: var(--#{$prefix}shadow-neutral) HEXToRGBA($black, 0.1);
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
  gap: 4px;
}
.address {
  margin-bottom: 8px;
}
</style>
