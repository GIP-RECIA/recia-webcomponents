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

<template>
  <mediacentre-ui id="mediacentre-ui" />
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

mediacentre-ui {
  display: block;
  height: 100%;
  width: 100%;
}
/* Variables */
:root {
  --ui-mediacentre-background-color: #ffffff;
  --ui-mediacentre-font-color: #000000;
  --ui-mediacentre-border-color: #d35959;
  --ui-mediacentre-menu-title-background-color: #ededed;
}
</style>
