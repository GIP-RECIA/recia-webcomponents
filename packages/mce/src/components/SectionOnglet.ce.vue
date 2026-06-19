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
import type { PersonneFonction } from '@/types/fonctionType'
import { inject, nextTick, watch } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import ChangeEmail from '@/components/ChangeEmail.ce.vue'
import FonctionsList from '@/components/FonctionsList.ce.vue'
import ChangePassword from './ChangePassword.ce.vue'
import InformationPersonnelleCe from './InformationPersonnelle.ce.vue'

export interface FonctionClassesGroupe {
  listFonctions: PersonneFonction[]
}

export interface PersonneRelation {
  [key: string]: unknown
}

defineOptions({ name: 'SectionOnglet' })

const props = defineProps<{
  mceApi: string
  listMenu: string
  userInfoApiUrl: string
  fonctionClassesGroupe: FonctionClassesGroupe
  parentEleve: PersonneRelation
  relationEleve: PersonneRelation
  apprentis: PersonneRelation
  services: Array<string>
  etabCurrent: string
  userMail?: string
  userMailPerso?: string
  uid?: string
  bod: string
  userId: string
  civilite?: string
  nom?: string
  prenom?: string
  categorie?: string
  userPublic?: string[]
}>()
defineEmits<{
  (e: 'emailUpdated', email: string): void
}>()

const i18n = inject(I18nInjectionKey)
function tPage(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`list-onglet.${key}`) : key
}

// À chaque changement d'onglet, focus la sentinelle en tête du panneau actif
// pour que ORCA parte du début du contenu avec les flèches
watch(() => props.listMenu, async () => {
  await nextTick()
  const panelId = `onglet-tabpanel-${props.listMenu}`
  const panel = document.getElementById(panelId)
  const sentinel = panel?.querySelector('[data-panel-start]') as HTMLElement | null
  sentinel?.focus()
}, { flush: 'post' })
</script>

<template>
  <div class="section-content-wrapper">
    <!-- ONGLET GÉNÉRALE -->
    <div
      v-show="props.listMenu === 'GENERALE'"
      id="onglet-tabpanel-GENERALE"
      :inert="props.listMenu !== 'GENERALE'"
      role="tabpanel"
      aria-labelledby="onglet-tab-GENERALE"
      class="tab-pane"
      :class="{ 'animate-fade': props.listMenu === 'GENERALE' }"
    >
      <!-- Sentinelle directement dans le panel : querySelector la trouve sans traverser le Shadow DOM -->
      <span class="sr-only" tabindex="-1" data-panel-start>{{ tPage('GENERALE') }}</span>
      <InformationPersonnelleCe
        :uid="props.uid"
        :date-naissance="props.bod"
        :user-mail="props.userMail"
        :user-public="props.userPublic"
        :civilite="props.civilite"
        :nom="props.nom"
        :prenom="props.prenom"
        :categorie="props.categorie"
      />
      <info-general
        :details="props.fonctionClassesGroupe"
        :list-fonctions="props.fonctionClassesGroupe.listFonctions ?? []"
        :list-menu="props.listMenu"
        :mce-api="props.mceApi"
        :parent-eleve="props.parentEleve"
        :relation-eleve="props.relationEleve"
        :apprentis="props.apprentis"
        :user-info-api-url="props.userInfoApiUrl"
      />
    </div>

    <!-- ONGLET SERVICES ENT -->
    <div
      v-show="props.listMenu === 'SERVICE'"
      id="onglet-tabpanel-SERVICE"
      :inert="props.listMenu !== 'SERVICE'"
      role="tabpanel"
      aria-labelledby="onglet-tab-SERVICE"
      class="tab-pane animate-fade"
    >
      <services-ent
        :details="props.services"
        :etab="props.etabCurrent"
        :onglet="props.listMenu"
      />
    </div>

    <!-- ONGLET CHANGEMENT MOT DE PASSE -->
    <div
      v-show="props.listMenu === 'CHANGE_PASSWORD'"
      id="onglet-tabpanel-CHANGE_PASSWORD"
      :inert="props.listMenu !== 'CHANGE_PASSWORD'"
      role="tabpanel"
      aria-labelledby="onglet-tab-CHANGE_PASSWORD"
      class="tab-pane animate-fade"
    >
      <ChangePassword
        :user-info-api-url="props.userInfoApiUrl"
        :user-id="props.userId"
        :mce-api="props.mceApi"
      />
    </div>

    <!-- ONGLET LISTE DES FONCTIONS / RÔLES -->
    <div
      v-show="props.listMenu === 'FONCTION_LIST'"
      id="onglet-tabpanel-FONCTION_LIST"
      :inert="props.listMenu !== 'FONCTION_LIST'"
      role="tabpanel"
      aria-labelledby="onglet-tab-FONCTION_LIST"
      class="tab-pane animate-fade"
    >
      <FonctionsList
        :fonctions="props.fonctionClassesGroupe.listFonctions ?? []"
        :user-info-api-url="props.userInfoApiUrl ?? ''"
        :mce-api="props.mceApi"
      />
    </div>

    <!-- ONGLET CHANGEMENT EMAIL -->
    <div
      v-show="props.listMenu === 'CHANGE_EMAIL'"
      id="onglet-tabpanel-CHANGE_EMAIL"
      :inert="props.listMenu !== 'CHANGE_EMAIL'"
      role="tabpanel"
      aria-labelledby="onglet-tab-CHANGE_EMAIL"
      class="tab-pane animate-fade"
    >
      <ChangeEmail
        :user-info-api-url="props.userInfoApiUrl"
        :mce-api="props.mceApi"
        :user-id="props.userId"
        :current-email="props.userMail"
        :current-email-perso="props.userMailPerso"
        @updated="(email) => $emit('emailUpdated', email)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use './mce-shared' as *;

.section-content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tab-pane {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;
}

.animate-fade {
  @include mce-fade-in(0.25s);
}

.sr-only {
  @include mce-sr-only;
}
</style>
