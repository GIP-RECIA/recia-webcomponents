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

const props = withDefaults(
  defineProps<{
    mediacentreContextUrl: string;
    baseApiUrl: string;
    userInfoApiUrl: string;
    userRightsApiUrl: string;
    getUserFavoriteResourcesUrl: string;
    putUserFavoriteResourcesUrl: string;
    fnameMediacentreUi: string;
  }>(),
  {
    mediacentreContextUrl: import.meta.env.VITE_APP_MEDIACENTRE_CONTEXT,
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
    :mediacentre-context-url="mediacentreContextUrl"
    :base-api-url="baseApiUrl"
    :user-info-api-url="`${mediacentreContextUrl}${userInfoApiUrl}`"
    :user-rights-api-url="`${mediacentreContextUrl}${userRightsApiUrl}`"
    :get-user-favorite-resources-api-url="`${mediacentreContextUrl}${getUserFavoriteResourcesUrl}`"
    :put-user-favorite-resources-api-url="`${mediacentreContextUrl}${putUserFavoriteResourcesUrl}`"
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
