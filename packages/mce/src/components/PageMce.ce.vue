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
import { ref, onMounted } from 'vue'

const props = defineProps<{
  mceApi: string
  userInfoApiUrl: string
  portailApiUrl: string
}>()


const mce = ref<any>([])
let ongletCurrent = ref<string>('')
const listOnglets = ref<Array<string>>([])


interface Service {
  id: number;
  title: string;
  fname: string;
}

const jsonSubcategories = ref<any[]>([])
const servicesList = ref<Service[]>([]);
const portletsSet = ref<Set<string>>(new Set());
const portlets = ref<Array<string>>()


async function getAllPortlets(uri: string, token: string) {
  const services = await getServicesEnt(uri, token);
  jsonSubcategories.value = services.data.registry.categories[0].subcategories;

    const localPortletsSet = new Set<string>(); // Temporary set to avoid reactive overhead

    const localServicesList: Service[] = []; // Temporary array to collect services

    for(let subcategory of jsonSubcategories.value){
      for (let portlet of subcategory['portlets']) {

        localServicesList.push({
                  id: portlet.id,
                  title: portlet.title,
                  fname: portlet.fname
        });

        localPortletsSet.add(portlet.title);
      }
    }

    // Update reactive refs with local values
    servicesList.value = localServicesList;
    portletsSet.value = localPortletsSet;

    // Convert portletsSet to an array
    portlets.value = Array.from(localPortletsSet);

}

onMounted(async () => {
  try {
    const res = await getMCE(props.mceApi, props.userInfoApiUrl)
    mce.value = res.data
    ongletCurrent.value = mce.value.listMenu[0]
    listOnglets.value = mce.value.listMenu

    await getAllPortlets(props.portailApiUrl,props.userInfoApiUrl);
    
  } catch (error: any) {
    console.error('error : ', error.res.data)
  }
})


function select(payload: CustomEvent, isBoolean: boolean) {

  let getOnglet = payload.detail[0];

  if (getOnglet != ongletCurrent.value) {
    ongletCurrent.value = getOnglet
  }
  
}
</script>
<template>
  <div class="parent">

    <div class="user-details">
      <user-info :avatar="mce.avatar" :userName="mce.userName" :etab="mce.etab" :userMail="mce.userMail" :bod="mce.bod" :identifiant="mce.identifiant"/>
      </div>
      <div class="sectionTwo">
      <div class="content">
          <list-onglet :list="listOnglets" :onglet-current="ongletCurrent" :user-info-api-url="userInfoApiUrl" class-btn="onglet-name" @selectOnglet="select($event, false)"/>
          <section-onglet
            :mce-api="mceApi"
            :list-menu="ongletCurrent"
            :user-info-api-url="userInfoApiUrl"
            :fonctionClassesGroupe="mce.fonctionClassesGroupe"
            :parentEleve="mce.parentEleve"
            :relationEleve="mce.relationEleve"
            :apprentis="mce.apprentis"
            :services="portlets"
            :etabCurrent="mce.etab"
          />
        </div>
      </div>
    </div>
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
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
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
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
    flex-grow: 2;
  }

}


@media (max-width: 768px) {

  .parent {
    display: flex;
    flex-flow: wrap;
  }

  .user-details{
    display: contents;

  }
}


</style>
