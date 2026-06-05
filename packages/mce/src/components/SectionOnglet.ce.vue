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

defineProps<{
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
  canModifyEmail?: boolean
  showChangeEmail?: boolean
  mdp?: boolean
}>()

defineEmits<{
  (e: 'closeChangeEmail'): void
  (e: 'openChangeEmail'): void
  (e: 'emailUpdated', email: string): void
}>()
</script>

<template>
  <div class="section-content-wrapper">
    <div v-if="showChangeEmail" class="tab-pane animate-fade">
      <ChangeEmail
        :user-info-api-url="userInfoApiUrl"
        :mce-api="mceApi"
        :user-id="userId"
        :current-email="userMail"
        @close="$emit('closeChangeEmail')"
        @updated="(email) => $emit('emailUpdated', email)"
      />
    </div>

    <template v-else>
      <!-- ONGLET GÉNÉRALE -->
      <div v-if="listMenu === 'GENERALE'" key="generale" class="tab-pane animate-fade">
        <InformationPersonnelleCe
          :uid="uid"
          :nom="nom"
          :prenom="prenom"
          :date-naissance="bod"
          :user-mail="userMail"
          :user-id="userId"
          :user-info-api-url="userInfoApiUrl"
          :mce-api="mceApi"
          :can-modify-email="canModifyEmail"
          @open-change-email="$emit('openChangeEmail')"
          @email-updated="(email) => $emit('emailUpdated', email)"
        />

        <info-general
          :details="fonctionClassesGroupe"
          :list-fonctions="fonctionClassesGroupe.listFonctions ?? []"
          :user-id="userId"
          :list-menu="listMenu"
          :mce-api="mceApi"
          :parent-eleve="parentEleve"
          :relation-eleve="relationEleve"
          :apprentis="apprentis"
          :user-info-api-url="userInfoApiUrl"
        />
      </div>

      <!-- ONGLET SERVICES ENT -->
      <div v-else-if="listMenu === 'SERVICE'" key="service" class="tab-pane animate-fade">
        <services-ent
          :details="services"
          :etab="etabCurrent"
          :onglet="listMenu"
        />
      </div>

      <!-- ONGLET CHANGEMENT MOT DE PASSE -->
      <div v-else-if="listMenu === 'CHANGE_PASSWORD'" key="password" class="tab-pane animate-fade">
        <ChangePassword
          :user-info-api-url="userInfoApiUrl"
          :user-id="userId"
          :mce-api="mceApi"
        />
      </div>

      <!-- ONGLET LISTE DES FONCTIONS / RÔLES -->
      <div v-else-if="listMenu === 'FONCTION_LIST'" key="fonctions" class="tab-pane animate-fade">
        <FonctionsList
          :fonctions="fonctionClassesGroupe.listFonctions ?? []"
          :user-info-api-url="userInfoApiUrl ?? ''"
          :mce-api="mceApi"
        />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;

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

  @media (width < map.get($grid-breakpoints, sm)) {
    gap: 0.75rem;
  }
}

.animate-fade {
  animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
