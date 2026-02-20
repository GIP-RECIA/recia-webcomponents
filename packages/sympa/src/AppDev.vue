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
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    apiUrl?: string
    apidAdminUrl?: string
    apidNoAdminUrl?: string
    errorUrl?: string
  }>(),
  {
    apiUrl: import.meta.env.VITE_APP_SYMPA_API_URI,
    apidAdminUrl: import.meta.env.VITE_DEV_ADMIN_URI,
    apidNoAdminUrl: import.meta.env.VITE_DEV_NO_ADMIN_URI,
    errorUrl: import.meta.env.VITE_DEV_ERROR_URI,
  },
)

const selectedError = ref<number | undefined>(undefined)
const selectedUrl = ref<string | undefined>('true')

const errorCodes = [400, 401, 403, 404, 500, 503]

const urlTypes = ['true', 'admin', 'no-admin', 'error']

const urlProvidedToComponent = computed(() => {
  switch (selectedUrl.value) {
    case 'admin': return props.apidAdminUrl
    case 'no-admin': return props.apidNoAdminUrl
    case 'error': return selectedError.value !== undefined ? props.errorUrl + selectedError.value : props.apiUrl
    default: return props.apiUrl
  }
},
)
</script>

<template>
  <div class="dev-tools">
    <span>Url to use: </span>
    <label v-for="url in urlTypes" :key="url" class="radio">
      <input
        v-model="selectedUrl"
        type="radio"
        :value="url"
      >
      {{ url }}
    </label>
    <br>
    <p>Url used: {{ urlProvidedToComponent }}</p>
    <br>
    <span>Error code to use: </span>
    <label v-for="code in errorCodes" :key="code" class="radio">
      <input
        v-model="selectedError"
        type="radio"
        :value="code"
      >
      {{ code }}
    </label>
  </div>
  <page-sympa v-if="urlProvidedToComponent !== undefined" :key="urlProvidedToComponent" :api-url="urlProvidedToComponent" />
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  height: 100%;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

.dev-tools {
  border: red solid 2px;
  margin-left: -20px;
  margin-right: -20px;
  .radio {
    margin-left: 10px;
  }
}
</style>
