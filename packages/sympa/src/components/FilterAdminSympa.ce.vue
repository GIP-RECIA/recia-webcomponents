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
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DeprecatedKey } from '@/types/deprecatedKeyEnum'
import { adminSympaFilter } from '@/utils/store'
import '@gip-recia/ui-webcomponents/dist/r-filters.js'

const { t } = useI18n()
const data = ref<Array<any>>([])

onMounted(async (): Promise<void> => {
  data.value = [
    {
      id: 'deprecated',
      name: t('filter.admin-sympa.name'),
      type: 'checkbox',
      items: [
        {
          key: 'all',
          value: t('filter.admin-sympa.all-value'),
        },
        ...Object.values(DeprecatedKey).map(x => ({ key: x, value: t(`deprecated-labels.${x}`) })),

      ],
    },
  ]
})

async function updateChecked(event: CustomEvent) {
  adminSympaFilter.value = event.detail.activeFilters[0].checked
}
</script>

<template>
  <r-filters
    :data="data"
    @update-filters="updateChecked"
  />
</template>
