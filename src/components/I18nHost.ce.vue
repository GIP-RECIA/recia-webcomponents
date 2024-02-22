<script setup lang="ts">
// import '../main';
import '../assets/detailList.css';
import '../assets/list.css';
import i18n from '@/i18n';
import 'cropperjs/dist/cropper.css';
import { provide } from 'vue';
import { I18nInjectionKey } from 'vue-i18n';

provide(I18nInjectionKey, i18n);

defineProps<{
  paramEtabApi: string;
  userInfoApiUrl: string;
}>();
</script>

<template>
  <page-param-etab id="app" :param-etab-api="paramEtabApi" :user-info-api-url="userInfoApiUrl"></page-param-etab>
</template>
