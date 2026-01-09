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
import { useI18n } from 'vue-i18n'
import { PermissionKey } from '@/types/permissionKeyEnum'
import { checked } from '@/utils/store'

const props = defineProps<{
  sympaList: Array<SympaType>
}>()
const { t } = useI18n()

function displayStateForSympaItem(sympaItem: SympaType): boolean {
  if (checked.value.length === 0)
    return true

  return Object.values(PermissionKey).some(
    key => sympaItem[key] && checked.value.includes(key),
  )
}
</script>

<template>
  <p class="results-count">
    {{ t('list-esup-sympa.results', { count: sympaList.length }, { plural: sympaList.length }) }}
  </p>
  <div class="wrapper">
    <card-esup-sympa v-for="sympaItem in props.sympaList.filter(x => displayStateForSympaItem(x))" :key="sympaItem.address" :sympa-item="sympaItem" />
  </div>
</template>

<style lang="scss">
  @media only screen and (width > 1024px) {
  .wrapper {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5em;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.results-count {
  font-size: var(--recia-font-size-md);
  font-weight: 700;
}
</style>
