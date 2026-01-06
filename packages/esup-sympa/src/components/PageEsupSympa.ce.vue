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
import type { SympaApiResponse, SympaType } from '@/types/sympaTypes'
import { onMounted, ref } from 'vue'
import { HttpError } from '@/classes/httpError'

const props = withDefaults(
  defineProps<{
    apiUrl?: string
    timeout?: number
  }>(),
  {
    apiUrl: import.meta.env.VITE_APP_ESUP_SYMPA_API_URI,
    timeout: import.meta.env.VITE_APP_TIMEOUT,
  },
)
const adminPortletUrl = ref<string | undefined>(undefined)
const sympaList = ref<Array<SympaType>>([])
const loaded = ref<boolean>(false)

onMounted(async (): Promise<void> => {
  const response: SympaApiResponse = await get(props.apiUrl, props.timeout)
  adminPortletUrl.value = response.adminPortletUrl !== undefined && response.adminPortletUrl.length > 0 ? response.adminPortletUrl : undefined
  sympaList.value = response.sympaList
  loaded.value = true
})

async function get(
  url: string,
  timeout: number,
): Promise<SympaApiResponse> {
  try {
    const response = await fetch(url, {
      method: 'GET',
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
    }
    console.error(error, url)
    throw error
  }
}
</script>

<template>
  <i18n-host>
    <div>
      <p>Page Esup Sympa</p>
    </div>
    <filter-esup-sympa />
    <list-esup-sympa v-if="loaded" :sympa-list="sympaList" />
  </i18n-host>
</template>
