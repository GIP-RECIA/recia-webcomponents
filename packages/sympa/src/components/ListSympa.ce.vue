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
import { useI18n } from 'vue-i18n'
import { PermissionKey } from '@/types/permissionKeyEnum'
import { sympaFilter } from '@/utils/store'

const props = defineProps<{
  sympaLists: Array<SympaList>
}>()
const { t } = useI18n()

function displayStateForSympaList(sympaList: SympaList): boolean {
  if (sympaFilter.value.length === 0)
    return true

  return Object.values(PermissionKey).some(
    key => sympaList[key] && sympaFilter.value.includes(key),
  )
}
</script>

<template>
  <p class="results-count">
    {{ t('list-sympa.results', { count: sympaLists.filter(x => displayStateForSympaList(x)).length }, { plural: sympaLists.filter(x => displayStateForSympaList(x)).length }) }}
  </p>
  <div class="wrapper">
    <card-sympa v-for="sympaList in props.sympaLists.filter(x => displayStateForSympaList(x))" :key="sympaList.address" :sympa-list="sympaList" />
  </div>
</template>

<style lang="scss">
@use 'sass:map';
@use 'ress/dist/ress.min.css';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

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
    gap: 1.5em;
  }
}

@media (width >= map.get($grid-breakpoints, md)) {
  .wrapper {
    gap: 16px;
  }
}

.results-count {
  font-size: var(--recia-font-size-md);
  font-weight: 700;
  margin-bottom: 16px;
}
</style>
