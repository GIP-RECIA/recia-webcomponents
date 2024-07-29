<script setup lang="ts">
import i18n from '@/plugins/i18n.ts';
import { provide } from 'vue';
import { I18nInjectionKey } from 'vue-i18n';

provide(I18nInjectionKey, i18n);

const props = withDefaults(
  defineProps<{
    baseApiUrl: string;
    userInfoApiUrl: string;
    userRightsApiUrl: string;
    getUserFavoriteResourcesUrl: string;
    putUserFavoriteResourcesUrl: string;
    fnameMediacentreUi: string;
  }>(),
  {
    baseApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_API_URI,
    userInfoApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_USER_INFO_API_URI,
    userRightsApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_USER_RIGHTS_API_URI,
    getUserFavoriteResourcesUrl: import.meta.env.VITE_APP_MEDIACENTRE_USER_GET_USER_FAVORITE_RESOURCES_API_URI,
    putUserFavoriteResourcesUrl: import.meta.env.VITE_APP_MEDIACENTRE_USER_PUT_USER_FAVORITE_RESOURCES_API_URI,
    fnameMediacentreUi: import.meta.env.VITE_APP_MEDIACENTRE_FNAME,
  },
);
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
