<script setup lang="ts">
import i18n from '@/plugins/i18n.ts';
import { provide } from 'vue';
import { I18nInjectionKey } from 'vue-i18n';

provide(I18nInjectionKey, i18n);

defineProps<{
  baseApiUrl: string;
  userInfoApiUrl: string;
  userRightsApiUrl: string;
  getUserFavoriteResourcesUrl: string;
  putUserFavoriteResourcesUrl: string;
  fnameMediacentreUi: string;
}>();
</script>

<template>
  <page-mediacentre
    id="page-mediacentre"
    :base-api-url="baseApiUrl"
    :user-info-api-url="userInfoApiUrl"
    :user-rights-api-url="userRightsApiUrl"
    :get-user-favorite-resources-api-url="getUserFavoriteResourcesUrl"
    :put-user-favorite-resources-api-url="putUserFavoriteResourcesUrl"
    :fname-mediacentre-ui="fnameMediacentreUi"
  />
</template>

<style>
page-mediacentre {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
