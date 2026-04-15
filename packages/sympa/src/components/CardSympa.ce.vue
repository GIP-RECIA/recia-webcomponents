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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { PermissionKey } from '@/types/permissionKeyEnum'

const props
  = defineProps<{
    sympaList?: SympaList
  }>()
const { t } = useI18n()

async function copyAddress(): Promise<void> {
  await navigator.clipboard.writeText(props.sympaList!.address)
}

const mailTo = computed<string>(() => {
  return `mailto:${props.sympaList?.address}`
},
)
</script>

<template>
  <div
    v-if="props.sympaList !== undefined"
    class="card-wrapper"
  >
    <div class="part-wrapper description">
      <h2 class="description">
        {{ props.sympaList.subject }}
      </h2>
    </div>

    <div class="address-and-tags-wrapper part-wrapper">
      <div class="tags-wrapper">
        <span
          v-for="key in Object.values(PermissionKey).filter(x => props.sympaList![x] === true)"
          :key="key"
          class="tag-primary"
        >
          {{ t(`permission-labels.${key}`) }}
        </span>
      </div>
      <p class="address">
        {{ props.sympaList.address }}
      </p>
    </div>

    <div class="part-wrapper btns">
      <button
        class="btn-secondary copy small"
        :aria-label="`${t('card-sympa.copy')} ${props.sympaList.address}`"
        @click="copyAddress()"
      >
        <span>{{ t('card-sympa.copy') }}</span>
        <FontAwesomeIcon
          class="fa-icon"
          :icon="['far', 'copy']"
        />
      </button>
      <a
        v-if="sympaList?.editor"
        :href="mailTo"
        class="btn-secondary copy small"
        :aria-label="`${t('card-sympa.email')} ${props.sympaList.address}`"
        @click="copyAddress()"
      >
        <span>{{ t('card-sympa.email') }}</span>
        <FontAwesomeIcon
          class="fa-icon"
          :icon="['far', 'paper-plane']"
        />
      </a>
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:map';
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

  &.description {
    h2 {
      word-wrap: anywhere;
    }
  }
  &.address-and-tags-wrapper {
    justify-content: start;
    min-height: 0;
    .address {
      word-wrap: anywhere;
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

@media (width < map.get($grid-breakpoints, sm)) {
  .address-and-tags-wrapper {
    .address-div,
    p.address {
      white-space: normal;
      overflow-wrap: anywhere;
      word-break: normal;
    }
  }
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
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}

.fa-icon {
  height: 1.25em;
  width: 1.25em;
  vertical-align: bottom;
}

.tags-wrapper {
  padding: 1px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.address {
  margin-bottom: 8px;
}
</style>
