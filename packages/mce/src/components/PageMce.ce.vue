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
import { computed, nextTick, onMounted, provide, ref } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import PreferencesNotification from '@/components/PreferencesNotification.ce.vue'
import i18n from '@/plugins/i18n'
import { dnmaService } from '@/services/dnmaService'
import { getMCE } from '@/services/serviceMce'

defineOptions({ name: 'PageMce' })

const props = defineProps<{
  mceApi: string
  userInfoApiUrl: string
  avatarDefault: string
  portailApiUrl: string
  apiPrefsUrl: string
}>()

provide(I18nInjectionKey, i18n)

const hasError = ref(false)
const errorMessage = ref('')
const alertRef = ref<HTMLDivElement | null>(null)
const errorMessageId = 'page-mce-error'

const mce = ref<any>({
  id: null,
  uid: '',
  userName: '',
  userMail: '',
  emailPersonnel: '',
  avatar: '',
  bod: '',
  etab: '',
  etat: '',
  identifiant: null,

  fonctionClassesGroupe: {},
  parentEleve: [],
  relationEleve: [],
  apprentis: null,

  userPublic: [],
  mdp: null,
  canEditEmail: null,
})

const ongletCurrent = ref<string>('')
const listOnglets = ref<Array<string>>([])
const avatar = ref<string>('')
const civilite = computed<string>(() => mce.value.civilite ?? '')
const nom = computed<string>(() => mce.value.sn ?? '')
const prenom = computed<string>(() => mce.value.givenName ?? '')
const categorie = computed<string>(() => mce.value.categorie ?? '')
const userMailPerso = computed<string>(() => mce.value.emailPersonnel ?? '')

onMounted(async () => {
  try {
    const res = await getMCE(props.mceApi, props.userInfoApiUrl)
    mce.value = res.data

    listOnglets.value = [
      'GENERALE',
      'NOTIFICATIONS',
      ...(mce.value.fonctionClassesGroupe?.listFonctions?.length > 0
        ? ['FONCTION_LIST']
        : []),
      ...(mce.value.mdp === true ? ['CHANGE_PASSWORD'] : []),
      ...(mce.value.canEditEmail === true ? ['CHANGE_EMAIL'] : []),
    ]

    ongletCurrent.value = listOnglets.value[0]

    avatar.value = mce.value.avatar ?? props.avatarDefault
    dnmaService.consult()
  }
  catch (error: unknown) {
    console.error('[onMounted] ERROR =>', error)
    hasError.value = true
    errorMessage.value = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      ?? (error instanceof Error ? error.message : undefined)
      ?? i18n.global.t('page-mce.error-default') as string
    await nextTick()
    alertRef.value?.focus()
  }
})

function select(payload: CustomEvent) {
  const onglet = Array.isArray(payload.detail) ? payload.detail[0] : payload.detail
  if (onglet !== ongletCurrent.value) {
    ongletCurrent.value = onglet
  }
}

function handleAvatarUpdated() {
  if (mce.value.avatar) {
    const baseAvatar = avatar.value.split('?')[0]
    avatar.value = `${baseAvatar}?t=${Date.now()}`
  }
  else {
    window.location.reload()
  }
}
</script>

<template>
  <div
    v-if="hasError"
    :id="errorMessageId"
    ref="alertRef"
    class="alert-message alert-message--error"
    role="alert"
    tabindex="-1"
  >
    {{ errorMessage }}
  </div>

  <div
    v-else
    class="parent"
  >
    <aside class="user-details">
      <user-base-info
        v-if="mce.uid"
        :avatar="avatar"
        :user-id="mce.uid"
        :user-name="mce.userName"
        :user-mail="userMailPerso"
        :etat="mce.etat ?? ''"
        :user-info-api-url="userInfoApiUrl"
        :mce-api="mceApi"
        @avatar-updated="handleAvatarUpdated"
      />

      <list-onglet
        v-if="listOnglets.length > 1"
        :list="listOnglets"
        :onglet-current="ongletCurrent"
        class-btn="btn btn-secondary-toggle"
        @select-onglet="select($event)"
      />
    </aside>

    <div class="sectionTwo">
      <div class="content">
        <PreferencesNotification
          v-if="ongletCurrent === 'NOTIFICATIONS'"
          :api-prefs-url="apiPrefsUrl"
          :user-info-api-url="userInfoApiUrl"
          :portail-api-url="portailApiUrl"
        />

        <section-onglet
          v-else
          :mce-api="mceApi"
          :current-tab="ongletCurrent"
          :user-info-api-url="userInfoApiUrl"
          :fonction-classes-groupe="mce.fonctionClassesGroupe ?? {}"
          :parent-eleve="mce.parentEleve ?? {}"
          :relation-eleve="mce.relationEleve ?? {}"
          :apprentis="mce.apprentis ?? {}"
          :user-name="mce.userName ?? ''"
          :user-mail="mce.email ?? ''"
          :user-mail-perso="userMailPerso"
          :user-id="mce.uid ?? ''"
          :user-public="mce.userPublic ?? []"
          :uid="mce.uid ?? ''"
          :bod="mce.bod ?? ''"
          :civilite="civilite"
          :nom="nom"
          :prenom="prenom"
          :categorie="categorie"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use '../assets/mce-shared' as *;

.parent {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (width >= map.get($grid-breakpoints, md)) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.user-details {
  @include mce-card-base;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex-shrink: 0;
  width: 100%;

  @media (width >= map.get($grid-breakpoints, md)) {
    width: 15rem;
  }
}

.sectionTwo {
  flex: 1;
  min-width: 0;
}
</style>
