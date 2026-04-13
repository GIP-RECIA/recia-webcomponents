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
import type { ComponentPublicInstance } from 'vue'
import type { CreatableList, UpdatableList } from '@/types/sympaTypes'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DeprecatedKey } from '@/types/deprecatedKeyEnum'
import { adminSympaFilter } from '@/utils/store'

const props = defineProps<{
  creatableLists: Array<CreatableList>
  updatableLists: Array<UpdatableList>
}>()
const emit = defineEmits(['createList', 'updateList', 'closeList'])

// const { t } = useI18n()

const buttons = ref<(HTMLButtonElement | null)[]>([])

const { t } = useI18n()

function createList(event: CustomEvent) {
  emit('createList', ...event.detail)
}

function updateList(event: CustomEvent) {
  emit('updateList', ...event.detail)
}

function closeList(event: CustomEvent) {
  emit('closeList', ...event.detail)
}

const tabCount = 2

const selectedTab = ref<number>(1)

onMounted(async (): Promise<void> => {

})

const selectedTabId = computed(() => {
  return `tab-${selectedTab.value}`
})

function onKeydown(event: KeyboardEvent) {
  let flag = false

  switch (event.key) {
    case 'ArrowLeft':
      selectedTab.value = selectedTab.value === 1 ? tabCount : selectedTab.value - 1
      flag = true
      break

    case 'ArrowRight':
      selectedTab.value = selectedTab.value === tabCount ? 1 : selectedTab.value + 1
      flag = true
      break

    case 'Home':
      selectedTab.value = 1
      flag = true
      break

    case 'End':
      selectedTab.value = tabCount
      flag = true
      break

    default:
      break
  }

  buttons.value[selectedTab.value - 1]?.focus()

  if (flag) {
    event.stopPropagation()
    event.preventDefault()
  }
}

function setSelected(index: number) {
  selectedTab.value = index
  buttons.value[selectedTab.value - 1]?.focus()
}

function tabIndex(id: string) {
  return selectedTabId.value === id ? 0 : -1
}

function ariaSelected(id: string) {
  return selectedTabId.value === id
}

function isHidden(id: string) {
  return selectedTabId.value === id ? '' : 'is-hidden'
}

function setButtonRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLButtonElement) {
    buttons.value[index] = el
  }
  else {
    buttons.value[index] = null
  }
}

function displayState(sympaList: UpdatableList): boolean {
  if (adminSympaFilter.value.length === 0)
    return true

  if (adminSympaFilter.value.includes(DeprecatedKey.DEPRECATED) && sympaList.modelId === null) {
    return true
  }

  if (adminSympaFilter.value.includes(DeprecatedKey.SUPPORTED) && sympaList.modelId !== null) {
    return true
  }
  return false
}
</script>

<template>
  <div class="tabs">
    <div role="tablist" class="automatic">
      <button
        id="tab-1" :ref="el => setButtonRef(el, 0)" type="button" role="tab"
        :aria-selected="ariaSelected('tab-1')" aria-controls="tabpanel-1"
        :tabindex="tabIndex('tab-1')" class="tag" :class="{ active: selectedTabId === 'tab-1' }" @keydown="onKeydown" @click="setSelected(1)"
      >
        <span class="focus">{{ t('list-admin-sympa.tabs.create') }}</span>
      </button>
      <button
        id="tab-2" :ref="el => setButtonRef(el, 1)" type="button" role="tab"
        :aria-selected="ariaSelected('tab-2')" aria-controls="tabpanel-2"
        :tabindex="tabIndex('tab-2')" class="tag" :class="{ active: selectedTabId === 'tab-2' }" @keydown="onKeydown" @click="setSelected(2)"
      >
        <span class="focus">{{ t('list-admin-sympa.tabs.update') }}</span>
      </button>
    </div>

    <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1" :class="isHidden('tab-1')">
      <div class="wrapper">
        <card-admin-sympa-create v-for="list in props.creatableLists" :key="list.address" :sympa-list="list" @create-list="createList" />
      </div>
    </div>

    <div id="tabpanel-2" role="tabpanel" tabindex="0" aria-labelledby="tab-2" :class="isHidden('tab-2')">
      <div id="filter">
        <filter-admin-sympa />
      </div>
      <div class="wrapper">
        <card-admin-sympa-update v-for="list in props.updatableLists.filter(x => displayState(x))" :key="list.address" :sympa-list="list" @update-list="updateList" @close-list="closeList" />
      </div>
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
@use '@gip-recia/ui/components/buttons';

.wrapper {
  display: grid !important;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 24px;
}

@media only screen and (min-width: 1024px) {
  .wrapper {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

#filter,
.automatic {
  margin-bottom: 32px;
}

@media (width >= map.get($grid-breakpoints, md)) {
  .wrapper {
    gap: 16px;
  }
  #filter,
  .automatic {
    margin-bottom: 46px;
  }
}

[role='tabpanel'].is-hidden {
  display: none;
}
</style>
