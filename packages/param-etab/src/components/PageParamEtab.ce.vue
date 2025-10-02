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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getParametab } from '@/services/serviceParametab'
import { showError } from '@/utils/useToast'

const props = defineProps<{
  paramEtabApi: string
  userInfoApiUrl: string
  defaultLogoIcon: string
}>()

const parametab = ref<any>([])
const etabJson = ref<string>('')
const currentEtab = ref<string>('')
const windowWidth = ref<number>(window.innerWidth)
const isVisible = ref<boolean>(false)
const nameEtabSelected = ref<string>('')
const findEtab = ref<any[]>([])

onMounted(async () => {
  try {
    const res = await getParametab(props.paramEtabApi, props.userInfoApiUrl)
    parametab.value = res.data
    // List of etablissement
    etabJson.value = JSON.stringify(parametab.value.listEtab)
    currentEtab.value = parametab.value.currentStruct
    findEtab.value = JSON.parse(etabJson.value)
  }
  catch (error: any) {
    console.error('error : ', error.response.data)
    showError(error.response.data)
  }
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const isMobile = computed(() => {
  return windowWidth.value < 1024
})

function handleResize() {
  windowWidth.value = window.innerWidth
}

function filteredName() {
  let name: any = ''
  if (!etabJson.value) {
    return
  }
  name = findEtab.value.find((etab: any) => etab.idSiren.toString() === currentEtab.value)
  if (!name) {
    currentEtab.value = findEtab.value[0].idSiren
    name = findEtab.value[0].etabName
  }
  else {
    name = name.etabName
  }
  nameEtabSelected.value = name
}

watch(currentEtab, () => {
  filteredName()
})

function select(payload: CustomEvent, isBoolean: boolean) {
  const getID = payload.detail[0].idSiren
  const getName = payload.detail[0].etabName

  if (getID !== currentEtab.value) {
    currentEtab.value = getID
  }

  if (isBoolean) {
    isVisible.value = false
    nameEtabSelected.value = getName
    currentEtab.value = getID
  }
}
</script>

<template>
  <div id="app">
    <div v-if="!isMobile" class="list">
      <list-etab
        class-input="input-search"
        class-li="item etab"
        class-div="list-etab"
        :data-json="etabJson"
        :data-current="currentEtab"
        @select-etab="select($event, false)"
      />
    </div>
    <div v-else class="dropdown-wrapper">
      <button class="selected-etab" @click="isVisible = !isVisible">
        <span>{{ nameEtabSelected }}</span>
      </button>
      <div v-if="isVisible" class="dropdown-popover">
        <list-etab
          class-input="input-search-mobile"
          class-li="opt-list"
          class-div="options"
          :data-json="etabJson"
          :data-current="currentEtab"
          @select-etab="select($event, true)"
        />
      </div>
    </div>
    <div class="detail">
      <detail-etab
        :struct-current="parametab.currentStruct"
        :detail="currentEtab"
        :param-etab-api="paramEtabApi"
        :user-info-api-url="userInfoApiUrl"
        :default-logo-icon="defaultLogoIcon"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '../assets/base.scss' as *;

#app {
  display: flex;
  flex-direction: column;
  gap: 16px;

  > .list {
    flex: 1 30%;
    border-radius: 10px;
    box-shadow: var(--recia-shadow-neutral) HEXToRGBA($black, 0.1);
    overflow-y: hidden;
    max-height: 70vh;
    height: fit-content;
  }

  > .dropdown-wrapper {
    border: 1px solid HEXToRGBA($black, 0.1);
    border-radius: 10px;
    box-shadow: var(--recia-shadow-neutral) HEXToRGBA($black, 0.1);
    overflow-y: scroll;

    &:has(> .selected-etab:focus-visible) {
      outline: 1px solid;
    }

    > .selected-etab {
      background: unset;
      border: unset;
      width: 100%;
      padding: 10px 20px;
      line-height: 1.5;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      outline: none;

      &::after {
        content: '\f078';
        font-family: 'FontAwesome', sans-serif;
        color: #757575;
        left: 0;
        right: 0;
      }
    }

    > .dropdown-popover {
      position: relative;
      left: 0;
      right: 0;
      max-width: 100%;
      border-top: 1px solid HEXToRGBA($black, 0.1);
    }
  }

  > .detail {
    flex-grow: 2;
    max-height: 100%;
    height: max-content;
    border-radius: 10px;
    box-shadow: var(--recia-shadow-neutral) HEXToRGBA($black, 0.1);
  }
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (width >= 1024px) {
  #app {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
