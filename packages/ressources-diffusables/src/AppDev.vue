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
const {
  VITE_BASE_API_URL,
  VITE_RESSOURCES_DIFFUSABLES_API_URI,
  VITE_USER_INFO_API_URI,
  VITE_RESOURCES_PER_PAGE_DEFAULT,
} = import.meta.env
</script>

<template>
  <ui-ressources-gar
    :base-api-url="VITE_BASE_API_URL"
    :ressources-diffusables-api-uri="VITE_RESSOURCES_DIFFUSABLES_API_URI"
    :user-info-api-url="VITE_USER_INFO_API_URI"
    :resources-per-page-default="VITE_RESOURCES_PER_PAGE_DEFAULT"
  />
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
  overflow-y: auto;
}

/* Variables */
:root {
  /* Mise en forme */
  --ui-ressources-gar-button-border-radius: 24px;
  --ui-ressources-gar-card-border-radius: 16px;
  --ui-ressources-gar-margin: 10px;
  --ui-ressources-gar-padding: 16px;

  background-color: #f3f3f3;
}

/* Variables du portail */
:root {
  --recia-body: #1e1e1e;
  --recia-body-inverted: #fff;
  --recia-body-bg: #fff;
  --recia-white: #fff;
  --recia-black: #000;
  --recia-favorite: #ffaa46;
  --recia-stroke: #e9e9e9;
  --recia-tutorial: #171717;
  --recia-basic-grey: #f4f4f4;
  --recia-basic-black: #1e1e1e;
  --recia-basic-black-lighter: #737373;
  --recia-lighter-black: #2c2c2c;
  --recia-system-blue: #005099;
  --recia-system-red: #ad1919;
  --recia-primary: #0062bc;
  --recia-primary-light: #0062bc;
  --recia-hover: #f8f8f8;
  --recia-hover-light: #f8f8f8;
  --recia-primary-inverted: #57aeff;
  --recia-primary-dark: #57aeff;
  --recia-hover-inverted: #262626;
  --recia-hover-dark: #262626;
  --recia-documentation: #ab47bc;
  --recia-documentation-hover: #c400f3;
  --recia-documentation-hover-shadow: rgba(from var(--recia-documentation-hover) r g b/0.1);
  --recia-documentation-text: #fff;
  --recia-collaboratif: #5747bc;
  --recia-collaboratif-hover: #665be7;
  --recia-collaboratif-hover-shadow: rgba(from var(--recia-collaboratif-hover) r g b/0.15);
  --recia-collaboratif-text: #fff;
  --recia-apprentissage: #ffac2f;
  --recia-apprentissage-hover: #f5c72e;
  --recia-apprentissage-hover-shadow: rgba(from var(--recia-apprentissage-hover) r g b/0.15);
  --recia-apprentissage-text: #000;
  --recia-vie-scolaire: #858585;
  --recia-vie-scolaire-hover: #5b5b5b;
  --recia-vie-scolaire-hover-shadow: rgba(from var(--recia-vie-scolaire-hover) r g b/0.15);
  --recia-vie-scolaire-text: #000;
  --recia-orientation: #26c6da;
  --recia-orientation-hover: #70eaf5;
  --recia-orientation-hover-shadow: rgba(from var(--recia-orientation-hover) r g b/0.15);
  --recia-orientation-text: #000;
  --recia-parametres: #66bb6a;
  --recia-parametres-hover: #4ef186;
  --recia-parametres-hover-shadow: rgba(from var(--recia-parametres-hover) r g b/0.15);
  --recia-parametres-text: #000;
  --recia-communication: #ec407a;
  --recia-communication-hover: #f60086;
  --recia-communication-hover-shadow: rgba(from var(--recia-communication-hover) r g b/0.2);
  --recia-communication-text: #000;
  --recia-btn-primary: #fff;
  --recia-btn-primary-light: #fff;
  --recia-btn-primary-pressed: #004584;
  --recia-btn-primary-pressed-light: #004584;
  --recia-btn-secondary: #1e1e1e;
  --recia-btn-secondary-light: #1e1e1e;
  --recia-btn-secondary-hover: #e6eff8;
  --recia-btn-secondary-hover-light: #e6eff8;
  --recia-btn-secondary-pressed: #cce0f2;
  --recia-btn-secondary-pressed-light: #cce0f2;
  --recia-btn-primary-bg: #1e1e1e;
  --recia-btn-primary-bg-light: #1e1e1e;
  --recia-btn-secondary-bg: #f4f4f4;
  --recia-btn-secondary-bg-light: #f4f4f4;
  --recia-btn-primary-inverted: #1e1e1e;
  --recia-btn-primary-dark: #1e1e1e;
  --recia-btn-primary-pressed-inverted: #8ac7ff;
  --recia-btn-primary-pressed-dark: #8ac7ff;
  --recia-btn-secondary-inverted: #fff;
  --recia-btn-secondary-dark: #fff;
  --recia-btn-secondary-hover-inverted: #1a1f23;
  --recia-btn-secondary-hover-dark: #1a1f23;
  --recia-btn-secondary-pressed-inverted: #212e3a;
  --recia-btn-secondary-pressed-dark: #212e3a;
  --recia-btn-primary-bg-inverted: #fff;
  --recia-btn-primary-bg-dark: #fff;
  --recia-btn-secondary-bg-inverted: #1e1e1e;
  --recia-btn-secondary-bg-dark: #1e1e1e;
  --recia-shadow-neutral: 0 4px 15.9px 0;
  --recia-shadow-strong: 0 4px 24.4px 0;
  --recia-shadow-hover: 0 4px 26px 0;
  --recia-shadow-low-elevation: 0 2px 6px 0;
  --recia-shadow-low-elevation-avatar-notif: 0 1px 24px 0;
  --recia-font-size-base: 1rem;
  --recia-body-font-size: calc(var(--recia-font-size-base) * 0.75);
  --recia-font-size-xxs: calc(var(--recia-font-size-base) * 0.625);
  --recia-font-size-xs: calc(var(--recia-font-size-base) * 0.75);
  --recia-font-size-sm: calc(var(--recia-font-size-base) * 0.875);
  --recia-font-size-md: calc(var(--recia-font-size-base) * 1);
  --recia-font-size-lg: calc(var(--recia-font-size-base) * 1.125);
  --recia-font-size-xl: calc(var(--recia-font-size-base) * 1.25);
  --recia-font-size-xxl: calc(var(--recia-font-size-base) * 1.5);
  --recia-font-size-h1: calc(var(--recia-font-size-base) * 1.25);
  --recia-font-size-h2: calc(var(--recia-font-size-base) * 1.125);
  --recia-font-size-h3: calc(var(--recia-font-size-base) * 1);
  --recia-font-size-h4: calc(var(--recia-font-size-base) * 0.875);
}

@media screen and (width >= 992px) {
  :root {
    --recia-body-font-size: calc(var(--recia-font-size-base) * 0.875);
    --recia-font-size-h1: calc(var(--recia-font-size-base) * 1.5);
    --recia-font-size-h2: calc(var(--recia-font-size-base) * 1.25);
    --recia-font-size-h3: calc(var(--recia-font-size-base) * 1);
    --recia-font-size-h4: calc(var(--recia-font-size-base) * 0.875);
  }
}
</style>
