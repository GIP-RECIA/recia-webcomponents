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
import i18n from '@/plugins/i18n';
import { provide } from 'vue';
import { I18nInjectionKey } from 'vue-i18n';

provide(I18nInjectionKey, i18n);

defineProps<{
  show: boolean;
  changeEtabApi: string;
  userInfoApiUrl: string;
}>();

const emit = defineEmits(['update:show']);

const handleUpdateShow = (value: boolean) => {
  emit('update:show', value);
};

</script>

<template>
  <page-change-etab :show="show" :change-etab-api="changeEtabApi" :user-info-api-url="userInfoApiUrl" />
</template>
