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
import type { UpdatableList } from '@/types/sympaTypes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n'

const props
  = defineProps<{
    sympaList?: UpdatableList
  }>()

const emit = defineEmits(['updateList', 'closeList'])

const { t } = useI18n()

function updateList(): void {
  emit('updateList', props.sympaList?.modelId, props.sympaList?.modelParam, props.sympaList?.subject, props.sympaList?.address)
}

function closeList(): void {
  emit('closeList', props.sympaList?.subject, props.sympaList?.address)
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
        <span
          v-if="props.sympaList.modelId === null"
          :title="t('card-sympa.deprecated-warning')"
        >
          <FontAwesomeIcon
            class="fa-icon deprecated"
            :icon="['fas', 'exclamation-triangle']"
          />
        </span>
        {{ props.sympaList.address }}
      </p>
    </div>
    <div class="part-wrapper btns">
      <button v-if="props.sympaList.modelId !== null" class="btn-secondary small" @click="updateList()">
        <span>{{ t('card-sympa.modify') }}</span>
        <FontAwesomeIcon class="fa-icon" :icon="['fas', 'redo-alt']" />
      </button>

      <button class="btn-secondary small" @click="closeList()">
        <span>{{ t('card-sympa.close') }}</span>
        <FontAwesomeIcon class="fa-icon" :icon="['fas', 'times']" />
      </button>

      <a :href="props.sympaList.archivesUrl" target="_blank" class="btn-secondary small">
        <span>{{ t('card-sympa.archives') }}</span>
        <FontAwesomeIcon class="fa-icon" :icon="['fas', 'archive']" />
      </a>

      <a :href="props.sympaList.adminUrl" target="_blank" class="btn-secondary small">
        <span>{{ t('card-sympa.admin-access') }}</span>
        <FontAwesomeIcon class="fa-icon" :icon="['fas', 'wrench']" />
      </a>

      <button-dropdown-admin-card-sympa-update class="mobile-only" :sympa-list="sympaList" @update-list="updateList" @close-list="closeList" />
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
    flex: 0 0 auto;
  }
  &.address-wrapper {
    justify-content: start;
    min-height: 0;
    flex: 1 1 auto;
    overflow-y: auto;
    .address {
      min-height: 0;
      flex-shrink: 0;
    }
  }

  &.btns {
    flex: 0 0 auto;
    display: flex;
    align-items: end;
    justify-content: end;
    flex-direction: row;
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
      word-break: normal;
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
  width: auto;
  box-shadow: var(--#{$prefix}shadow-neutral) HEXToRGBA($black, 0.1);
  overflow-y: visible;
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

.part-wrapper {
  .btn-secondary:not(.mobile-only) {
    display: none;
  }
}

.deprecated {
  color: var(--recia-system-red, #ad1919);
}

@media (min-width: 767px) and (max-width: 1024px) {
  .mobile-only {
    display: none;
  }

  .part-wrapper {
    .btn-secondary:not(.mobile-only) {
      display: inherit;
    }
  }
}

@media (min-width: 1024px) and (max-width: 1400px) {
  .mobile-only {
    display: inherit;
  }

  .part-wrapper {
    .btn-secondary:not(.mobile-only) {
      display: none;
    }
  }
}

@media (min-width: 1400px) {
  .mobile-only {
    display: none;
  }

  .part-wrapper {
    .btn-secondary:not(.mobile-only) {
      display: inherit;
    }
  }
}
</style>
