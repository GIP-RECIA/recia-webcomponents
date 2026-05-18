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
import './info-modal/info-modal.js'

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
const personDetail = ref<any>()
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
  if (!value) {
    return ''
  }

  // eslint-disable-next-line e18e/prefer-static-regex
  const parts = value.split(/\s+/)
  return parts.length > 1 ? parts.slice(0, -1).join(' ') : value
})

const prenom = computed<string>(() => {
  const value = mce.value.userName?.trim() ?? ''
  if (!value) {
    return ''
  }

  // eslint-disable-next-line e18e/prefer-static-regex
  const parts = value.split(/\s+/)
  return parts.length > 1 ? parts.at(-1) : ''
})

async function getAllPortlets(uri: string, token: string) {
  try {
    const services = await getServicesEnt(uri, token)

    jsonSubcategories.value
      = services.data.registry.categories[0].subcategories

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
  console.warn('[onMounted] START')
  console.warn('[onMounted] props =>', props)

  try {
    const res = await getMCE(
      props.mceApi,
      props.userInfoApiUrl,
    )

    console.warn('[onMounted] getMCE response =>', res)

    mce.value = res.data

    console.warn('[onMounted] mce =>', mce.value)

    ongletCurrent.value = mce.value.listMenu[0]

    console.warn(
      '[onMounted] ongletCurrent =>',
      ongletCurrent.value,
    )

    listOnglets.value = [
      'GENERALE',
      'SERVICE',
      ...(mce.value.fonctionClassesGroupe?.listFonctions?.length > 0
        ? ['FONCTION_LIST']
        : []),
      ...(mce.value.mdp === false ? [] : ['CHANGE_PASSWORD']),
    ]

    console.warn(
      '[onMounted] listOnglets =>',
      listOnglets.value,
    )

    if (mce.value.avatar == null) {
      console.warn(
        '[onMounted] avatar null => default avatar used',
      )

      avatar.value = props.avatarDefault
    }
    else {
      console.warn(
        '[onMounted] avatar found =>',
        mce.value.avatar,
      )

      avatar.value = mce.value.avatar
    }

    console.warn(
      '[onMounted] final avatar =>',
      avatar.value,
    )

    await getAllPortlets(
      props.portailApiUrl,
      props.userInfoApiUrl,
    )

    console.warn('[onMounted] END SUCCESS')
  }
  catch (error: any) {
    console.error('[onMounted] ERROR =>', error)
    console.error(
      '[onMounted] ERROR RESPONSE =>',
      error?.response?.data,
    )
  }
})

function select(payload: CustomEvent) {
  console.warn('[select] payload =>', payload)

  const getOnglet = payload.detail[0]

  console.warn('[select] getOnglet =>', getOnglet)
  console.warn(
    '[select] current onglet =>',
    ongletCurrent.value,
  )

  if (getOnglet !== ongletCurrent.value) {
    console.warn('[select] updating onglet')

    ongletCurrent.value = getOnglet
  }
}

function handleOpenChangeEmail() {
  showChangeEmail.value = true
}

function handleCloseChangeEmail() {
  showChangeEmail.value = false
}

function handleEmailUpdated(email: string) {
  mce.value.userMail = email
  showChangeEmail.value = false
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
            @email-updated="handleEmailUpdated"
          />
        </div>

        <Teleport to="body">
          <info-modal id="modale" debug="false">
            <template #modal-body>
              <div>
                <div style="display: flex; flex-direction: column; gap: 3em">
                  <div style="display: flex; flex-direction: column; gap: 0.5em">
                    <modal-content
                      v-if="personDetail"
                      :person-detail="personDetail"
                    />
                  </div>
                </div>
              </div>
            </template>
          </info-modal>
        </Teleport>
      </main>
    </div>
  </i18n-host>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;

.parent {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 1rem;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;

  @media (width >= map.get($grid-breakpoints, md)) {
    flex-direction: row;
    padding: 1.5rem 2rem;
    align-items: flex-start;
  }

  .user-details {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    padding: 20px;
    border-radius: 28px;
    box-sizing: border-box;
    flex-shrink: 0;
    min-width: 0;

    @media (width >= map.get($grid-breakpoints, md)) {
      width: 320px;
      max-width: 30%;
      position: sticky;
      top: 1.5rem;
    }
  }

  .sectionTwo {
    width: 100%;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    padding: 24px;
    border-radius: 28px;
    box-sizing: border-box;
    flex: 1;
    min-width: 0;
  }
}

@media (max-width: 340px) {
  .parent {
    padding: 0.5rem;
    gap: 12px;

    .user-details {
      padding: 12px;
      border-radius: 16px;
    }

    .sectionTwo {
      padding: 12px;
      border-radius: 16px;
      min-height: auto;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  label {
    display: flex;
    flex-direction: column;
  }
}

:deep(*) {
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-wrap: break-word;

  word-break: normal;
  hyphens: none !important;
}
</style>
