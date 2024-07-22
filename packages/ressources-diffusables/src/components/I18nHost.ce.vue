<script setup lang="ts">
import i18n from '@/plugins/i18n.ts';
import { provide } from 'vue';
import { I18nInjectionKey } from 'vue-i18n';

provide(I18nInjectionKey, i18n);

defineProps<{
  baseApiUrl: string;
  ressourcesDiffusablesApiUri: string;
  ressourcesDiffusablesSizeApiUri: string;
  userInfoApiUrl: string;
}>();
</script>

<template>
  <page-ressource
    :base-api-url="baseApiUrl"
    :ressources-diffusables-api-uri="ressourcesDiffusablesApiUri"
    :ressources-diffusables-size-api-uri="ressourcesDiffusablesSizeApiUri"
    :user-info-api-url="userInfoApiUrl"
  />
</template>
