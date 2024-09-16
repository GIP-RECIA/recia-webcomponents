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
</script>

<template>
  <page-change-etab :show="show" :change-etab-api="changeEtabApi" :user-info-api-url="userInfoApiUrl" />
</template>
