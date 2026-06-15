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
import { computed, onMounted, provide, ref } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import i18n from '@/plugins/i18n'
import { getMCE, getServicesEnt } from '@/services/serviceMce'

defineOptions({ name: 'PageMce' })

const props = defineProps<{
  mceApi: string
  userInfoApiUrl: string
  portailApiUrl: string
  avatarDefault: string
}>()

provide(I18nInjectionKey, i18n)

function tPage(key: string): string {
  return (i18n.global.t as (k: string) => string)(`page-mce.${key}`)
}

const showChangeEmail = ref(false)

const mce = ref<any>({
  id: null,
  uid: '',
  userName: '',
  userMail: '',
  avatar: '',
  bod: '',
  etab: '',
  etat: '',
  identifiant: null,

  listMenu: [],
  fonctionClassesGroupe: {},
  parentEleve: [],
  relationEleve: [],
  apprentis: null,

  userPublic: [],
  mdp: null,
  mailEditable: null,
})

const ongletCurrent = ref<string>('')
const listOnglets = ref<Array<string>>([])
const avatar = ref<string>('')
const portlets = ref<string[]>([])

const apersonne = computed(() => mce.value.parentEleve?.[0]?.eleve?.apersonne ?? null)
const civilite = computed<string>(() => apersonne.value?.civilite ?? '')
const nom = computed<string>(() => apersonne.value?.sn ?? '')
const prenom = computed<string>(() => apersonne.value?.givenName ?? '')
const categorie = computed<string>(() => apersonne.value?.categorie ?? '')

async function getAllPortlets(uri: string, token: string) {
  try {
    const services = await getServicesEnt(uri, token)

    const subcategories
      = services?.data?.registry?.categories?.[0]?.subcategories

    if (!Array.isArray(subcategories)) {
      console.warn(
        '[getAllPortlets] Invalid registry structure: categories[0].subcategories is missing',
      )
      portlets.value = []
      return
    }

    const set = new Set<string>()

    for (const subcategory of subcategories) {
      for (const portlet of subcategory.portlets ?? []) {
        set.add(portlet.title)
      }
    }

    portlets.value = Array.from(set)
  }
  catch (error) {
    console.error('[getAllPortlets] ERROR =>', error)
  }
}

onMounted(async () => {
  try {
    const res = await getMCE(props.mceApi, props.userInfoApiUrl)
    mce.value = res.data

    listOnglets.value = [
      'GENERALE',
      ...(mce.value.fonctionClassesGroupe?.listFonctions?.length > 0
        ? ['FONCTION_LIST']
        : []),
      ...(mce.value.mdp === true ? [] : ['CHANGE_PASSWORD']),
    ]

    ongletCurrent.value = listOnglets.value[0]

    avatar.value = mce.value.avatar ?? props.avatarDefault

    await getAllPortlets(props.portailApiUrl, props.userInfoApiUrl)
  }
  catch (error: any) {
    console.error('[onMounted] ERROR =>', error)
  }
})

function select(payload: CustomEvent) {
  const onglet = Array.isArray(payload.detail) ? payload.detail[0] : payload.detail
  if (onglet !== ongletCurrent.value) {
    ongletCurrent.value = onglet
  }
}

function handleOpenChangeEmail() {
  showChangeEmail.value = true
}

function handleCloseChangeEmail() {
  showChangeEmail.value = false
}

function handleEmailUpdated(event: CustomEvent<string[]>) {
  const email = Array.isArray(event.detail) ? event.detail[0] : event.detail
  mce.value = {
    ...mce.value,
    userMail: email,
  }
}

function handleAvatarUpdated() {
  const baseAvatar = avatar.value.split('?')[0]
  avatar.value = `${baseAvatar}?t=${Date.now()}`
}
</script>

<template>
  <div class="parent">
    <aside class="user-details" aria-labelledby="user-details-heading">
      <h2 id="user-details-heading" class="sr-only">
        {{ tPage('user-details') }}
      </h2>
      <user-base-info
        v-if="mce.uid"
        :avatar="avatar"
        :user-id="mce.uid"
        :user-name="mce.userName"
        :user-mail="mce.userMail"
        :etat="mce.etat ?? ''"
        :user-info-api-url="userInfoApiUrl"
        :mce-api="mceApi"
        @avatar-updated="handleAvatarUpdated"
      />

      <list-onglet
        v-if="listOnglets.length > 1"
        :list="listOnglets"
        :onglet-current="ongletCurrent"
        :user-info-api-url="userInfoApiUrl"
        class-btn="btn btn-secondary-toggle"
        @select-onglet="select($event)"
      />
    </aside>

    <main class="sectionTwo" aria-labelledby="page-content-heading">
      <h2 id="page-content-heading" class="sr-only">
        {{ tPage('main-content') }}
      </h2>
      <div class="content">
        <section-onglet
          v-if="mce?.listMenu?.length"
          :mce-api="mceApi"
          :list-menu="ongletCurrent"
          :list-onglets="listOnglets"
          :user-info-api-url="userInfoApiUrl"
          :fonction-classes-groupe="mce.fonctionClassesGroupe ?? {}"
          :parent-eleve="mce.parentEleve ?? {}"
          :relation-eleve="mce.relationEleve ?? {}"
          :apprentis="mce.apprentis ?? {}"
          :services="portlets"
          :etab-current="mce.etab ?? ''"
          :user-name="mce.userName ?? ''"
          :user-mail="mce.userMail ?? ''"
          :user-id="mce.uid ?? ''"
          :uid="mce.uid ?? ''"
          :bod="mce.bod ?? ''"
          :civilite="civilite"
          :nom="nom"
          :prenom="prenom"
          :categorie="categorie"
          :can-modify-email="mce.mailEditable ?? false"
          :show-change-email="showChangeEmail"
          :mdp="mce.mdp"
          @open-change-email="handleOpenChangeEmail"
          @close-change-email="handleCloseChangeEmail"
          @email-updated="handleEmailUpdated"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use './mce-shared' as *;

.parent {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (width >= map.get($grid-breakpoints, md)) {
    flex-direction: row;
    padding: 1.5rem 2rem;
    align-items: flex-start;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border-radius: 0.625rem; // 10px
    box-shadow: var(--#{$prefix}shadow-neutral) #0000001a;
    overflow: clip;
    flex-shrink: 0;
    width: 100%;

    @media (width >= map.get($grid-breakpoints, md)) {
      width: 15rem; // 240px
    }
    &:focus-within {
      outline: 2px solid var(--#{$prefix}primary);
      outline-offset: 2px;
    }
  }

  .sectionTwo {
    flex: 1;
    min-width: 0;
  }
}

@media (width < 340px) {
  .parent {
    padding: 0.5rem;
  }
}

.sr-only {
  @include mce-sr-only;
}
</style>
