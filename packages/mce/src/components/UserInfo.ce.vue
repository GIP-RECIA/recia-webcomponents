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

const props = defineProps<{
    avatar: string
    userName: string
    etab: string
    userMail: string
    bod: string
    identifiant: string

}>()
</script>
<template>
      <div class="profile-container">
        <div class="profile-picture">
          <img class="avatar" :src="avatar" alt="" />
          <span class="user-name">{{ userName }}</span>

        </div>
        <div class="profile-info">
          <label>
            <span>Identifiant</span>
            <input type="text" :value="identifiant">
          </label>
          <label>
            <span>Email</span>
            <input type="text" :value="userMail">
          </label>
          <label>
            <span>Date de naissance</span>
            <input type="text" :value="bod">
          </label>
          <label>
            <span>Structure rattachement</span>
            <input type="text" :value="etab">
          </label>
        </div>
        </div>
</template>

<style lang="scss">

.profile-container {
  top: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 25px;

  .profile-picture {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .avatar {
      border-radius: 50%;
      width: 130px;
      height: 130px;
    }

    .user-name {
      text-align: center;
    }

  }


  .profile-info {
    flex: 2 30%;
    left: 16px;
    top: 214px;
    width: 100%;
    display: flex;
    column-gap: 8px;
    row-gap: 13.67px;
    flex-direction: column;


    label {
      display: flex;
      flex-direction: column;
      padding-top: 5px;

      span {
        color: black;
        display: block;
        font-size: 0.875em;
        margin-top: 0.625em;
        order: 1;
        transition: all 0.25s;
        font-weight: bold;
      }

      input {
        order: 2;
        outline: none;
        top: 0.08rem;
        border: 0;
        border-bottom: 2px solid #eee;
        font-weight: 300;
      }

    }
  }


}




.circle {
  width: 80px;
  height: 80px;
  background-color: #6ec295;
  border-radius: 50%;
}



</style>