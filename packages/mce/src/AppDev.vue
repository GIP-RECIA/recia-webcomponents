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
  VITE_MCE_API_URI,
  VITE_USER_INFO_API_URI,
  VITE_PORTAIL_API_URI,
  VITE_AVATAR_DEFAULT,
} = import.meta.env
</script>

<template>
  <mce-ui
    :mce-api="VITE_MCE_API_URI"
    :user-info-api-url="VITE_USER_INFO_API_URI"
    :portail-api-url="VITE_PORTAIL_API_URI"
    :avatar-default="VITE_AVATAR_DEFAULT"
  />
</template>

<style lang="scss">
html,
body {
  background-color: #eee !important;
}
</style>
