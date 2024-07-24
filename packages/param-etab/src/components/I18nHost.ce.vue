<script setup lang="ts">
import i18n from '@/i18n';
import { provide } from 'vue';
import { I18nInjectionKey } from 'vue-i18n';

provide(I18nInjectionKey, i18n);

defineProps<{
  paramEtabApi: string;
  userInfoApiUrl: string;
  defaultLogoIcon: string;
}>();
</script>

<template>
  <page-param-etab
    :param-etab-api="paramEtabApi"
    :user-info-api-url="userInfoApiUrl"
    :default-logo-icon="defaultLogoIcon"
  ></page-param-etab>
</template>
