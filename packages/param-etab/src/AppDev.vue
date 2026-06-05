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
const {
  VITE_BASE_API_URL,
  VITE_PARAMETAB_API_URI,
  VITE_USER_INFO_API_URI,
  VITE_DEFAULT_LOGO_ICON,
} = import.meta.env

declare global {
  interface DocumentEventMap {
    'click-portlet-card': CustomEvent<{
      fname: string
      SERVICE: string
    }>
  }
}

document.addEventListener('click-portlet-card', (e) => {
  if (!e.detail) {
    // eslint-disable-next-line no-console
    console.log(e.type)
    return
  }

  // eslint-disable-next-line no-console
  console.log(e.type, e.detail)
})
</script>

<template>
  <param-etab
    :base-api-url="VITE_BASE_API_URL"
    :param-etab-api="VITE_PARAMETAB_API_URI"
    :user-info-api-url="VITE_USER_INFO_API_URI"
    :default-logo-icon="VITE_DEFAULT_LOGO_ICON"
  />
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
</style>
