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
import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'
import { register } from '@/plugins/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref } from 'vue'

const props = defineProps<FontAwesomeIconProps>()

const iconsReady = ref(false)

register()

onMounted(() => {
  iconsReady.value = true
})
</script>

<template>
  <FontAwesomeIcon v-if="iconsReady" v-bind="props" />
</template>

<style lang="scss">
@import '@fortawesome/fontawesome-svg-core/styles.css';
</style>
