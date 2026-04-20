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
import type { SympaApiResponse, SympaList } from '@/types/sympaTypes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref } from 'vue'
import { HttpError } from '@/classes/httpError'
import i18n from '@/plugins/i18n.ts'
import { getLists } from '@/services/fetchServices'

const props = withDefaults(
  defineProps<{
    apiUrl?: string
    timeoutDefault?: number
  }>(),
  {
    apiUrl: import.meta.env.VITE_APP_SYMPA_API_BASE_URL + import.meta.env.VITE_APP_SYMPA_API_URI,
    timeoutDefault: import.meta.env.VITE_APP_TIMEOUT_DEFAULT,
  },
)
const adminServiceUrl = ref<string | undefined>(undefined)
const sympaLists = ref<Array<SympaList>>([])
const loaded = ref<boolean>(false)
const httpError = ref<HttpError | undefined>(undefined)
const { t } = i18n.global

onMounted(async (): Promise<void> => {
  try {
    const response: SympaApiResponse = await getLists(props.apiUrl, props.timeoutDefault)
    adminServiceUrl.value = response.adminServiceUrl !== undefined && response.adminServiceUrl !== null && response.adminServiceUrl.length > 0 ? response.adminServiceUrl : undefined
    sympaLists.value = response.sympaLists
  }
  catch (error) {
    if (error instanceof HttpError) {
      console.error(error.code)
      httpError.value = error
    }
  }

  loaded.value = true

  if (adminServiceUrl.value !== undefined) {
    document.dispatchEvent(
      new CustomEvent('set-is-admin', {
        bubbles: true,
        detail: { adminUrl: adminServiceUrl.value },
      }),
    )
  }
})

function getErrorMessage(code: number): string {
  const key = `error-messages.${code}`
  return t(key, t('error-messages-fallback'))
}

const displayWarning = computed<boolean>(() => {
  return sympaLists.value.filter(x => x.editor).length > 0
})
</script>

<template>
  <i18n-host>
    <filter-sympa
      v-if="loaded && sympaLists.length > 0"
      class="filters"
    />
    <div
      v-if="displayWarning"
      class="warning-wrapper"
    >
      <FontAwesomeIcon
        class="fa-icon"
        :icon="['fas', 'exclamation-triangle']"
      />
      <p>{{ t('email-warning') }}</p>
    </div>
    <list-sympa
      v-if="loaded"
      :sympa-lists="sympaLists"
    />
    <div v-if="httpError !== undefined">
      <p>{{ getErrorMessage(httpError.code) }}</p>
    </div>
  </i18n-host>
</template>

<style lang="scss">
filter-sympa {
  display: block;
  margin-bottom: 20px;
}

.warning-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}

.fa-icon {
  flex-shrink: 0;
  height: 1.25em;
  width: 1.25em;
  vertical-align: bottom;
  color: var(--#{$prefix}system-red);
}
</style>
