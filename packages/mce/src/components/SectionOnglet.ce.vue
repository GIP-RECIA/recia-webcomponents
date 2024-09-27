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
import { getContentOnglet } from '@/services/serviceMce';
import { ref, watchEffect } from 'vue';


const props = defineProps<{
  mceApi: string
  listMenu: string
  userInfoApiUrl: string
}>()

const details = ref<Object>([])

watchEffect((): void => {
  void (async () => {
    await fetchDetailOnglet(props.listMenu)
  })()
})

async function fetchDetailOnglet(name: string) {
  if (name != '') {
    try {
      const response = await getContentOnglet(props.mceApi + name, props.userInfoApiUrl)
      details.value = response.data

    } catch (error) {
      console.error('error: ', error)
    }
  }
}

</script>

<template>
    <div v-if="props.listMenu == 'GENERALE'">
        <info-general :details="details"/>
        
    </div>

    <div v-else-if="props.listMenu == 'PARENT_ELEVE'">
        <relation-user :details="details"/>
    </div>
</template>