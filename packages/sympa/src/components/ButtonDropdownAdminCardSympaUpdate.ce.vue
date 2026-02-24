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
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props
  = defineProps<{
    sympaList: UpdatableList
  }>()

const emit = defineEmits(['updateList', 'closeList'])
const self = ref<HTMLElement>()
const button = ref<HTMLElement>()
const isExpanded = ref(false)
const { t } = useI18n()

onMounted(() => {
  if (self.value)
    self.value.addEventListener('keyup', handleKeyPress.bind(this))
  window.addEventListener('keyup', handleOutsideEvents.bind(this))
  window.addEventListener('click', handleOutsideEvents.bind(this))
})

onUnmounted(() => {
  if (self.value)
    self.value.removeEventListener('keyup', handleKeyPress.bind(this))
  window.removeEventListener('keyup', handleOutsideEvents.bind(this))
  window.removeEventListener('click', handleOutsideEvents.bind(this))
})

function handleKeyPress(e: KeyboardEvent): void {
  if (isExpanded.value && e.key === 'Escape') {
    e.preventDefault()
    close(e)
  }
}

function handleOutsideEvents(e: KeyboardEvent | MouseEvent): void {
  if (
    isExpanded.value
    && self.value
    && e.target instanceof HTMLElement
    && !(self.value.contains(e.target) || e.composedPath().includes(self.value))
  ) {
    close(undefined, false)
  }
}

function close(_: Event | undefined = undefined, resetFocus: boolean = true): void {
  isExpanded.value = false
  if (resetFocus)
    button.value!.focus()
}

function updateList(): void {
  close()
  emit('updateList')
}

function closeList(): void {
  close()
  emit('closeList')
}
</script>

<template>
  <div ref="self" class="dropdown">
    <button
      ref="button"
      :aria-expanded="isExpanded"
      aria-controls="dropdown-content"
      aria-label="Label"
      class="btn-secondary small "

      @click="() => { isExpanded = !isExpanded }"
    >
      <span>{{ t('card-sympa.options') }}</span>
      <FontAwesomeIcon class="fa-icon" :icon="['fas', 'ellipsis-h']" />
    </button>
    <ul
      id="dropdown-content"
      :class="isExpanded ? '' : 'hidden'"
    >
      <li>
        <button v-if="props.sympaList.modelId !== null" class=" mobile-only btn-dropdown" @click="updateList()">
          <span>{{ t('card-sympa.modify') }}</span>
          <FontAwesomeIcon class="fa-icon" :icon="['fas', 'redo-alt']" />
        </button>
      </li>
      <li>
        <button class=" mobile-only btn-dropdown" @click="closeList()">
          <span>{{ t('card-sympa.close') }}</span>
          <FontAwesomeIcon class="fa-icon" :icon="['fas', 'times']" />
        </button>
      </li>

      <li>
        <a :href="props.sympaList.archivesUrl" target="_blank" class="  mobile-only btn-dropdown">
          <span>{{ t('card-sympa.archives') }}</span>
          <FontAwesomeIcon class="fa-icon" :icon="['fas', 'archive']" />
        </a>
      </li>

      <li>
        <a :href="props.sympaList.adminUrl" target="_blank" class=" mobile-only btn-dropdown">
          <span>{{ t('card-sympa.admin-access') }}</span>
          <FontAwesomeIcon class="fa-icon" :icon="['fas', 'wrench']" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use '@/assets/main.scss' as *;

.dropdown {
  position: relative;
  width: fit-content;

  > ul {
    padding-left: 0;
    list-style: none;
    position: absolute;
    z-index: 99;
    top: calc(100% + 6px);
    right: 0;
    min-width: 100%;
    max-width: calc(100vw - 32px);
    background-color: var(--#{$prefix}body-bg);
    border-radius: 8px;
    box-shadow: var(--#{$prefix}shadow-strong) HEXToRGBA($black, 0.1);
    overflow: hidden;
    z-index: 1000;

    > li > .btn-dropdown {
      background: transparent;
      border-radius: 0;
      color: inherit;
      text-decoration: none;
      text-align: end;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 12px;
      text-wrap: nowrap;
      column-gap: 16px;
      min-width: 170px;

      font-size: var(--#{$prefix}font-size-sm);
      width: 100%;
      > svg {
        opacity: 0.3;
      }

      &:hover,
      &:focus-visible {
        font-weight: bold;
        background-color: var(--#{$prefix}hover);
        outline: none;
        > svg {
          opacity: 1;
        }
      }
    }
  }
}

.fa-icon {
  height: 1.25em;
  width: 1.25em;
  vertical-align: bottom;
}

.hidden {
  display: none;
}
</style>
