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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref } from 'vue'
import i18n from '@/plugins/i18n.ts'

const adminUrl = ref<string>('')
const { t } = i18n.global

onMounted(() => {
  document.addEventListener('set-is-admin', (e) => {
    const event = e as CustomEvent<{ adminUrl: string }>
    adminUrl.value = event.detail.adminUrl
  })
})
</script>

<template>
  <i18n-host>
    <p>
      <a v-if="adminUrl.length > 0" :href="adminUrl">
        {{ t('admin-redirect') }}
        <FontAwesomeIcon class="fa-icon" :icon="['fas', 'arrow-right']" />
      </a>
    </p>
  </i18n-host>
</template>

<style lang="scss">
a {
  text-decoration: none;
  color: var(--recia-primary, #0062bc);
  display: inline;
}

.fa-icon {
  height: 1em;
  width: 1em;
  vertical-align: middle;
}
</style>
