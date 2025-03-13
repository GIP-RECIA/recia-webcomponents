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
import { ref } from 'vue'

const isRedirect = ref<boolean>(false)
const isBase64 = ref<boolean>(false)
const redirectArgument = ref<string>('')

function swap(): void {
  isRedirect.value = !isRedirect.value
}
</script>

<template>
  <div class="dev-only">
    <button @click="swap">
      Swap
    </button>

    <br>
    <label v-show="isRedirect === false" for="redirectArgument">

      Redirect value: <input id="redirectArgument" v-model="redirectArgument" name="redirectArgument" type="text">

    </label>

    <label v-show="isRedirect === false" for="isBase64"><br>

      Is base 64: <input id="isBase64" :checked="isBase64" name="isBase64" type="checkbox"></label>
  </div>

  <mediacentre-redirect v-if="isRedirect" id="mediacentre-redirect" :resource-id="redirectArgument" />
  <mediacentre-ui v-else id="mediacentre-ui" />
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  height: 100%;
  width: 100%;
}

.dev-only {
  border: solid red 2px;
}

mediacentre-ui {
  display: block;
  height: 100%;
  width: 100%;
}
/* Variables */
:root {
  --ui-mediacentre-background-color: #f3f3f3;
  --ui-mediacentre-font-color: #000000;
  --ui-mediacentre-border-color: #d35959;
  --ui-mediacentre-menu-title-background-color: #ededed;
}
</style>
