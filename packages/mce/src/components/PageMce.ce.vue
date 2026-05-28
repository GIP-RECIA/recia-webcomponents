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
import { computed, onMounted, ref } from 'vue'
import { getMCE, getServicesEnt } from '@/services/serviceMce'

defineOptions({ name: 'PageMce' })

const props = defineProps<{
  mceApi: string
  userInfoApiUrl: string
  portailApiUrl: string
  avatarDefault: string
}>()

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

interface Service {
  id: number
  title: string
  fname: string
}

const jsonSubcategories = ref<any[]>([])
const servicesList = ref<Service[]>([])
const portletsSet = ref<Set<string>>(new Set())
const portlets = ref<string[]>([])

const nom = computed<string>(() => {
  const value = mce.value.userName?.trim() ?? ''
  if (!value)
    return ''
  // eslint-disable-next-line e18e/prefer-static-regex
  const parts = value.split(/\s+/)
  return parts.length > 1 ? parts.slice(0, -1).join(' ') : value
})

const prenom = computed<string>(() => {
  const value = mce.value.userName?.trim() ?? ''
  if (!value)
    return ''
  // eslint-disable-next-line e18e/prefer-static-regex
  const parts = value.split(/\s+/)
  return parts.length > 1 ? parts.at(-1) : ''
})

async function getAllPortlets(uri: string, token: string) {
  try {
    const services = await getServicesEnt(uri, token)

    jsonSubcategories.value = services.data.registry.categories[0].subcategories

    const localPortletsSet = new Set<string>()
    const localServicesList: Service[] = []

    for (const subcategory of jsonSubcategories.value) {
      for (const portlet of subcategory.portlets) {
        localServicesList.push({
          id: portlet.id,
          title: portlet.title,
          fname: portlet.fname,
        })
        localPortletsSet.add(portlet.title)
      }
    }

    servicesList.value = localServicesList
    portletsSet.value = localPortletsSet
    portlets.value = Array.from(localPortletsSet)
  }
  catch (error: any) {
    console.error(error)
  }
}

onMounted(async () => {
  try {
    const res = await getMCE(props.mceApi, props.userInfoApiUrl)
    mce.value = res.data

    ongletCurrent.value = mce.value.listMenu[0]

    listOnglets.value = [
      'GENERALE',
      ...(mce.value.fonctionClassesGroupe?.listFonctions?.length > 0
        ? ['FONCTION_LIST']
        : []),
      ...(mce.value.mdp === true ? [] : ['CHANGE_PASSWORD']),
    ]

    avatar.value = mce.value.avatar ?? props.avatarDefault

    await getAllPortlets(props.portailApiUrl, props.userInfoApiUrl)
  }
  catch (error: any) {
    console.error('[onMounted] ERROR =>', error)
  }
})

function select(payload: CustomEvent) {
  const getOnglet = payload.detail[0]
  if (getOnglet !== ongletCurrent.value) {
    ongletCurrent.value = getOnglet
  }
}

function handleOpenChangeEmail() {
  showChangeEmail.value = true
}

function handleCloseChangeEmail() {
  showChangeEmail.value = false
}

function handleEmailUpdated(event: any) {
  const value = event?.detail ?? event

  const email
    = Array.isArray(value) ? value[0] : value

  mce.value = {
    ...mce.value,
    userMail: email,
  }
}
</script>

<template>
  <i18n-host>
    <div class="parent">
      <aside class="user-details">
        <user-base-info
          v-if="mce.uid"
          :avatar="avatar"
          :user-id="mce.uid"
          :user-name="mce.userName"
          :user-mail="mce.userMail"
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

      <main class="sectionTwo">
        <div class="content">
          <section-onglet
            v-if="mce?.listMenu?.length"
            :mce-api="mceApi"
            :list-menu="ongletCurrent"
            :user-info-api-url="userInfoApiUrl"
            :fonction-classes-groupe="mce.fonctionClassesGroupe ?? {}"
            :parent-eleve="mce.parentEleve ?? {}"
            :relation-eleve="mce.relationEleve ?? {}"
            :apprentis="mce.apprentis ?? {}"
            :services="portlets ?? []"
            :etab-current="mce.etab ?? ''"
            :user-name="mce.userName ?? ''"
            :user-mail="mce.userMail ?? ''"
            :user-id="mce.uid ?? ''"
            :uid="mce.uid ?? ''"
            :bod="mce.bod ?? ''"
            :nom="nom"
            :prenom="prenom"
            :date-naissance="mce.dateNaissance ?? ''"
            :can-modify-email="mce.mailEditable ?? false"
            :show-change-email="showChangeEmail"
            :mdp="mce.mdp"
            @open-change-email="handleOpenChangeEmail"
            @close-change-email="handleCloseChangeEmail"
            @email-updated="(e: { detail: string; }) => handleEmailUpdated(e.detail)"
          />
        </div>
      </main>
    </div>
  </i18n-host>
</template>

<style lang="scss" scoped>
.parent {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (width >= 768px) {
    flex-direction: row;
    padding: 1.5rem 2rem;
    align-items: flex-start;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    padding: 20px;
    border-radius: 28px;
  }

  .sectionTwo {
    width: 100%;
  }
}

@media (max-width: 340px) {
  .parent {
    padding: 0.5rem;
  }
}
</style>
