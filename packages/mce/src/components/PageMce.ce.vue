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
import { getMCE, getServicesEnt } from '@/services/serviceMce'
import { onMounted, ref } from 'vue'
import './info-modal/info-modal.js'

defineOptions({ name: 'PageMce' })

const props = defineProps<{
  mceApi: string
  userInfoApiUrl: string
  portailApiUrl: string
  avatarDefault: string
}>()

const mce = ref<any>([])
const ongletCurrent = ref<string>('')
const listOnglets = ref<Array<string>>([])
const isModalOpen = ref(false)
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
const portlets = ref<Array<string>>()

async function getAllPortlets(uri: string, token: string) {
  const services = await getServicesEnt(uri, token)
  jsonSubcategories.value = services.data.registry.categories[0].subcategories

  const localPortletsSet = new Set<string>() // Temporary set to avoid reactive overhead

  const localServicesList: Service[] = [] // Temporary array to collect services

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

  // Update reactive refs with local values
  servicesList.value = localServicesList
  portletsSet.value = localPortletsSet

  // Convert portletsSet to an array
  portlets.value = Array.from(localPortletsSet)
}

onMounted(async () => {
  try {
    const res = await getMCE(props.mceApi, props.userInfoApiUrl)
    mce.value = res.data
    ongletCurrent.value = mce.value.listMenu[0]
    listOnglets.value = mce.value.listMenu

    if (mce.value.avatar == null) {
      avatar.value = props.avatarDefault
    }
    else {
      avatar.value = mce.value.avatar
    }

    await getAllPortlets(props.portailApiUrl, props.userInfoApiUrl)
  }
  catch (error: any) {
    console.error('error : ', error.res.data)
  }
})

function select(payload: CustomEvent) {
  const getOnglet = payload.detail[0]

  if (getOnglet !== ongletCurrent.value) {
    ongletCurrent.value = getOnglet
  }
}

function openModal(event: CustomEvent) {
  isModalOpen.value = true
  personDetail.value = event.detail[1]
}
</script>

<template>
  <i18n-host>
    <div class="parent">
      <div class="user-details">
        <user-info
          :avatar="avatar"
          :userName="mce.userName"
          :etab="mce.etab"
          :userMail="mce.userMail"
          :bod="mce.bod"
          :identifiant="mce.identifiant"
          :mdp="mce.mdp"
          :user-public="mce.userPublic"
          :user-id="mce.uid"
        />
      </div>
      <div class="sectionTwo">
        <div class="content">
          <list-onglet
            v-if="listOnglets.length > 1"
            :list="listOnglets"
            :onglet-current="ongletCurrent"
            :user-info-api-url="userInfoApiUrl"
            class-btn="onglet-name"
            @select-onglet="select($event)"
          />
          <section-onglet
            :mce-api="mceApi"
            :listMenu="ongletCurrent"
            :user-info-api-url="userInfoApiUrl"
            :fonction-classes-groupe="mce.fonctionClassesGroupe"
            :parent-eleve="mce.parentEleve"
            :relation-eleve="mce.relationEleve"
            :apprentis="mce.apprentis"
            :services="portlets"
            :etab-current="mce.etab"
            @open-modal="openModal"
          />
        </div>
        <Teleport to="body">
          <info-modal id="modale" debug="false">
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <div slot="modal-body">
              <div style="display: flex; flex-direction: column; gap: 3em">
                <div style="display: flex; flex-direction: column; gap: 0.5em">
                  <modal-content :person-detail="personDetail" />
                </div>
              </div>
            </div>
          </info-modal>
        </Teleport>
      </div>
    </div>
  </i18n-host>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 13px;
}

body {
  font-family: Arial, sans-serif;
}

.parent {
  display: flex;
  position: absolute;
  left: 120px;
  top: 80px;
  width: 85%;
  gap: 20px;
  overflow-y: scroll;

  .user-details {
    top: 0px;
    width: 340px;
    height: 600px;
    background-color: white;
    padding: 20px;
    border-radius: 28px;
    box-shadow:
      rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
      rgb(209, 213, 219) 0px 0px 0px 1px inset;
    flex-grow: 0.3;
  }

  .sectionTwo {
    left: 370px;
    top: 0px;
    width: 600px;
    min-height: 600px;
    //max-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    border-radius: 28px;
    box-shadow:
      rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
      rgb(209, 213, 219) 0px 0px 0px 1px inset;
    flex-grow: 2;
  }
}

@media (max-width: 815px) {
  .parent {
    display: flex;
    flex-flow: wrap;
    position: sticky;
    width: 100%;

    .user-details {
      height: auto;
      width: 100%;
      background-color: transparent;
      box-shadow: none;
    }

    .sectionTwo {
      background-color: transparent;
      box-shadow: none;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
  }
}
</style>
