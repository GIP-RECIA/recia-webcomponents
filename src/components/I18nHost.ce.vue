<script setup lang="ts">
import i18n from '@/plugins/i18n.ts';
import { provide } from 'vue';
import { I18nInjectionKey } from 'vue-i18n';

provide(I18nInjectionKey, i18n);

defineProps<{
  baseApiUrl: string;
  userInfoApiUrl: string;
}>();
</script>

<template>
  <div></div>
</template>
