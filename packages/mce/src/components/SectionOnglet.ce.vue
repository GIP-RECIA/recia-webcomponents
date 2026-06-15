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
import { inject } from 'vue'
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
  userName: string
  userMail?: string
  identifiant?: string
  uid?: string
  bod: string
  userId: string
  civilite?: string
  nom?: string
  prenom?: string
  categorie?: string
  canModifyEmail?: boolean
  showChangeEmail?: boolean
  mdp?: boolean
  listOnglets: string[]
}>()
defineEmits<{
  (e: 'closeChangeEmail'): void
  (e: 'openChangeEmail'): void
  (e: 'emailUpdated', email: string): void
}>()
const i18n = inject(I18nInjectionKey)
function tOnglet(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`list-onglet.${key}`) : key
}
</script>

<template>
  <div class="section-content-wrapper">
    <!-- Panneau ChangeEmail -->
    <div v-if="props.showChangeEmail" class="tab-pane animate-fade">
      <ChangeEmail
        :user-info-api-url="props.userInfoApiUrl"
        :mce-api="props.mceApi"
        :user-id="props.userId"
        :current-email="props.userMail"
        @close="$emit('closeChangeEmail')"
        @updated="(email) => $emit('emailUpdated', email)"
      />
    </div>

    <template v-else>
      <!-- ONGLET GÉNÉRALE : v-show pour préserver l'état du formulaire email -->
      <div
        v-show="props.listMenu === 'GENERALE'"
        id="onglet-tabpanel-GENERALE"
        :inert="props.listMenu !== 'GENERALE'"
        role="tabpanel"
        :aria-label="tOnglet('GENERALE')"
        tabindex="-1"
        class="tab-pane"
        :class="{ 'animate-fade': props.listMenu === 'GENERALE' }"
      >
        <InformationPersonnelleCe
          :uid="props.uid"
          :user-name="props.userName"
          :date-naissance="props.bod"
          :user-mail="props.userMail"
          :user-id="props.userId"
          :user-info-api-url="props.userInfoApiUrl"
          :mce-api="props.mceApi"
          :civilite="props.civilite"
          :nom="props.nom"
          :prenom="props.prenom"
          :categorie="props.categorie"
          :can-modify-email="props.canModifyEmail"
          :show-change-email="props.showChangeEmail"
          @open-change-email="$emit('openChangeEmail')"
          @email-updated="(email) => $emit('emailUpdated', email)"
        />
        <info-general
          :details="props.fonctionClassesGroupe"
          :list-fonctions="props.fonctionClassesGroupe.listFonctions ?? []"
          :user-id="props.userId"
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
        v-if="props.listMenu === 'SERVICE'"
        id="onglet-tabpanel-SERVICE"
        role="tabpanel"
        :aria-label="tOnglet('SERVICE')"
        tabindex="-1"
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
        v-if="props.listMenu === 'CHANGE_PASSWORD'"
        id="onglet-tabpanel-CHANGE_PASSWORD"
        role="tabpanel"
        :aria-label="tOnglet('CHANGE_PASSWORD')"
        tabindex="-1"
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
        v-if="props.listMenu === 'FONCTION_LIST'"
        id="onglet-tabpanel-FONCTION_LIST"
        role="tabpanel"
        :aria-label="tOnglet('FONCTION_LIST')"
        tabindex="-1"
        class="tab-pane animate-fade"
      >
        <FonctionsList
          :fonctions="props.fonctionClassesGroupe.listFonctions ?? []"
          :user-info-api-url="props.userInfoApiUrl ?? ''"
          :mce-api="props.mceApi"
        />
      </div>
    </template>
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px dotted var(--#{$prefix}primary);
    outline-offset: 8px;
    border-radius: 10px;
  }
}

.animate-fade {
  animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
