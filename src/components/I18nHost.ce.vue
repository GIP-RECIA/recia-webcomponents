<script setup lang="ts">
import i18n from '@/plugins/i18n.ts';
import { provide } from 'vue';
import { I18nInjectionKey } from 'vue-i18n';

provide(I18nInjectionKey, i18n);

defineProps<{
  baseApiUrl: string;
  userInfoApiUrl: string;
  userRightsApiUrl: string;
  userResourceFavoritesApiUrl: string;
}>();
</script>

<template>
  <page-mediacentre
    :base-api-url="baseApiUrl"
    :user-info-api-url="userInfoApiUrl"
    :user-rights-api-url="userRightsApiUrl"
    :user-resource-favorites-api-url="userResourceFavoritesApiUrl"
  />
</template>
