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
import { onMounted, ref } from 'vue'
import { HttpError } from '@/classes/httpError'
import i18n from '@/plugins/i18n.ts'

const props = withDefaults(
  defineProps<{
    apiUrl?: string
    timeout?: number
  }>(),
  {
    apiUrl: import.meta.env.VITE_APP_SYMPA_API_URI,
    timeout: import.meta.env.VITE_APP_TIMEOUT,
  },
)
const adminServiceUrl = ref<string | undefined>(undefined)
const sympaLists = ref<Array<SympaList>>([])
const loaded = ref<boolean>(false)
const httpError = ref<HttpError | undefined>(undefined)
const { t } = i18n.global

onMounted(async (): Promise<void> => {
  const response: SympaApiResponse = await get(props.apiUrl, props.timeout)
  adminServiceUrl.value = response.adminServiceUrl !== undefined && response.adminServiceUrl !== null && response.adminServiceUrl.length > 0 ? response.adminServiceUrl : undefined
  sympaLists.value = response.sympaLists
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

async function get(
  url: string,
  timeout: number,
): Promise<SympaApiResponse> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      signal: AbortSignal.timeout(timeout),
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status)
    }
    return await response.json()
  }
  catch (error) {
    if (error instanceof HttpError) {
      console.error(error.code)
      httpError.value = error
    }
    throw error
  }
}

function getErrorMessage(code: number) {
  const key = `error-messages.${code}`
  return t(key, t('error-messages-fallback'))
}
</script>

<template>
  <i18n-host>
    <div>
      <p>Page Sympa</p>
    </div>
    <filter-sympa v-if="loaded && sympaLists.length > 0" class="filters" />
    <list-sympa v-if="loaded" :sympa-lists="sympaLists" />
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
</style>
