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
import type { Ressource } from '@/types/RessourceType'
import { onMounted, ref } from 'vue'
import i18n from '@/plugins/i18n'
import { setError } from '@/services/ServiceErreurMediacentre'
import { createResourceFromJson } from '@/types/RessourceType'
import { initToken } from '@/utils/axiosUtils'
import { CustomError } from '@/utils/CustomError'
import { getConfig, getResourceById } from '../services/ServiceMediacentre'

const props = withDefaults(
  defineProps<{
    baseApiUrl?: string
    configApiUrl?: string
    isBase64?: boolean
    resourceId?: string
    userInfoApiUrl?: string
    userRightsApiUrl?: string
  }>(),
  {
    baseApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_API_URI,
    configApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_CONFIG_API_URI,
    isBase64: false,
    resourceId: '',
    userInfoApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_UPORTAL_CONTEXT + import.meta.env.VITE_APP_MEDIACENTRE_USER_INFO_API_URI,
    userRightsApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_UPORTAL_CONTEXT + import.meta.env.VITE_APP_MEDIACENTRE_USER_RIGHTS_API_URI,
  },
)

const { t } = i18n.global

const wantedToRedirectButNoResourceFound = ref<boolean>(false)
const chargement = ref<boolean>(false)
const chargementApp = ref<boolean>(false)
const hasNon404Error = ref<boolean>(false)
const errorMessage = ref<string>('')

onMounted(async (): Promise<void> => {
  if (props.resourceId.length === 0)
    return

  chargementApp.value = true
  await initToken(props.userInfoApiUrl)
  await getConfig(props.configApiUrl, [])
  await redirect()
})

async function redirect(): Promise<void> {
  try {
    let res: Ressource | undefined
    await getResourceToRedirectTo(props.resourceId, props.isBase64)
      .then((data) => {
        res = data
      })
      .catch((e: any) => {
        console.error(e.statusCode)
        if (e.statusCode === 404) {
          wantedToRedirectButNoResourceFound.value = true
        }
        else {
          hasNon404Error.value = true
          errorMessage.value = setError(e.statusCode)
        }
      })

    if (res === undefined)
      return

    window.location.replace(res.urlAccesRessource)
  }
  catch (e: any) {
    wantedToRedirectButNoResourceFound.value = true
    console.error(e)
  }
}

async function getResourceToRedirectTo(
  resourceId: string,
  isBase64: boolean,
): Promise<Ressource> {
  chargement.value = true
  try {
    const reponse = await getResourceById(
      `${props.baseApiUrl}/${resourceId}?base64=${isBase64}`,
      props.userRightsApiUrl,
    )
    return createResourceFromJson(reponse)
  }
  catch (e: any) {
    throw new CustomError(e.message, e.statusCode)
  }
  finally {
    chargement.value = false
  }
}
</script>

<template>
  <p v-if="wantedToRedirectButNoResourceFound" class="preserve-breaks">
    {{ t("page-mediacentre.redirect-failed") }}
  </p>
  <p v-else-if="hasNon404Error">
    {{ errorMessage }}
  </p>
</template>

<style lang="scss">
.preserve-breaks {
  white-space: pre-wrap;
  text-align: start;
}

p {
  font-size: 16px;
}
</style>
