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
    mdp: boolean
    userPublic: string

}>()

function modifAvatar() {
  alert("change avatar")
}
</script>
<template>
      <div class="profile-container">
        <div class="profile-picture">
          <div class="image-container" @click="modifAvatar">
            <img class="avatar" :src="avatar" alt="" />

            <button class="edit-picture">
              <img class="edit-picture-icon" src="../assets/pen-solid.svg" alt="">
            </button>
          </div>
          <span class="user-name">{{ userName }}</span>


        </div>
        <div class="profile-info">
          <label v-if="identifiant!=null">
            <span>Identifiant</span>
            <input type="text" :value="identifiant">
          </label>
          <label>
            <span>Email</span>
            <input type="text" :value="userMail">
          </label>
          <label v-if="bod != null">
            <span>Date de naissance</span>
            <input type="text" :value="bod">
          </label>
          <label>
            <span>Structure rattachement</span>
            <input type="text" :value="etab">
          </label>
          <label v-if="mdp == true">
            <span>Mot de passe <button>modifier</button></span>
            <input type="text" value="*******">
          </label>
          <label v-if="userPublic?.length>=1">
            <span>Mon identifiant</span>
            <input type="text" :value="userPublic">
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
    align-items: center;

    .image-container {
      position: relative;
      display: flex;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      outline: solid #eef0f8;
      box-shadow: 0 .5px 2.5px 1px #00000080;

      .avatar {
        border-radius: 50%;
        position: relative;
        background-color: #26448a;
      }

      .edit-picture {
        display: none;
      }


    }

    .image-container:hover {

        cursor: pointer;
        outline: 3px solid #26448a;
        box-shadow: 0 .5px 2.5px 1px #00000080;

        .avatar {
          opacity: 0.4;

        }

        .edit-picture {
            width: 35px;
            height: 35px;
            border: none;
            border-radius: 50px;
            bottom: 48px;
            right: 48px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            outline: solid #eef0f8;
            box-shadow: 0 .5px 2.5px 1px #00000080;
            position: absolute;

            .edit-picture-icon {
              width: 11px;
              height: 11px;
            }
        }
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

@media (max-width: 815px) {

  .profile-container {

    .profile-picture {
      .image-container{
        .edit-picture {
            width: 35px;
            height: 35px;
            border: none;
            border-radius: 50px;
            left: 95px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            outline: solid #eef0f8;
            box-shadow: 0 .5px 2.5px 1px #00000080;
            position: absolute;

            .edit-picture-icon {
              width: 11px;
              height: 11px;
            }
          }
      }
    }

    .profile-info {
      background-color: white;
      padding: 15px;
      border-radius: 28px;
    }
  }
}

</style>