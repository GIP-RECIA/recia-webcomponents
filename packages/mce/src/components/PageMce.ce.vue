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
import { getMCE } from '@/services/serviceMce'
import { ref, onMounted } from 'vue'

const props = defineProps<{
  mceApi: string
  userInfoApiUrl: string
}>()


const mce = ref<any>([])
let ongletCurrent = ref<string>('')
const listOnglets = ref<Array<string>>([])

onMounted(async () => {
  try {
    const res = await getMCE(props.mceApi, props.userInfoApiUrl)
    mce.value = res.data
    ongletCurrent.value = mce.value.listMenu[0]
    listOnglets.value = mce.value.listMenu
    
    // List of structures
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
    <list-onglet :list="listOnglets" :onglet-current="ongletCurrent" :user-info-api-url="userInfoApiUrl" class-btn="onglet-name" @selectOnglet="select($event, false)"/>
    <div class="user-details">
      <div class="profile-container">
        <div class="profile-picture">
          <img class="avatar" :src="mce.avatar" alt="" />
        </div>
        <div class="profile-info">
          <div class="left-info">
            <p>{{ mce.userName }}</p>
            <p>{{ mce.etab }}</p>
            <p>{{ mce.userMail }}</p>
          </div>
          <div class="right-info">
            <p>Date de naissance: {{ mce.bod }}</p>
            <p>Identifiant: {{ mce.identifiant }}</p>
          </div>
        </div>
      </div>
      <div class="sectionTwo">
      <div class="content">
          <section-onglet
            :mce-api="mceApi"
            :list-menu="ongletCurrent"
            :user-info-api-url="userInfoApiUrl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
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
}


.profile-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 900px;
  background-color: white;
  padding: 20px;
  margin-top: 50px;
  border-radius: 5px 5px 0px 0px;
  /* box-shadow:
    0 1px 2px #0000001f,
    0 1px 2px #0000001f; */
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
}

.profile-picture {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  border-radius: 50%;
}

.circle {
  width: 80px;
  height: 80px;
  background-color: #6ec295;
  border-radius: 50%;
}

.profile-info {
  flex: 2 30%;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
}

.left-info p,
.right-info p {
  margin-bottom: 10px;
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

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 5px;
  /* box-shadow:
    0 1px 2px #0000001f,
    0 1px 2px #0000001f; */
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
}
</style>
