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
import type { GroupTreeNode } from '@/types/createListFormTypes'
import type { AdminSympaApiListsResponse, CreatableList, UpdatableList } from '@/types/sympaTypes'
import { onMounted, ref } from 'vue'
import i18n from '@/plugins/i18n'
import { getAdditionalGroups, getAllCreatableAndUpdatableLists } from '@/services/fetchServices'
import { fetchNonHttpError, httpErrorCode, supportedErrorCodes } from '@/utils/store'
import '@gip-recia/js-tree'

const props = withDefaults(
  defineProps<{
    apiUrlLists?: string
    apiUrlFormData?: string
    apiUrlTreeData?: string
    apiUrlCreateList?: string
    apiUrlUpdateList?: string
    apiUrlCloseList?: string
    timeoutDefault?: number
    timeoutSympa?: number
  }>(),
  {
    apiUrlLists: import.meta.env.VITE_APP_SYMPA_API_BASE_URL + import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_LISTS,
    apiUrlFormData: import.meta.env.VITE_APP_SYMPA_API_BASE_URL + import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_FORM_DATA,
    apiUrlTreeData: import.meta.env.VITE_APP_SYMPA_API_BASE_URL + import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_TREE_DATA,
    apiUrlCreateList: import.meta.env.VITE_APP_SYMPA_API_BASE_URL + import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_CREATE_LIST,
    apiUrlUpdateList: import.meta.env.VITE_APP_SYMPA_API_BASE_URL + import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_UPDATE_LIST,
    apiUrlCloseList: import.meta.env.VITE_APP_SYMPA_API_BASE_URL + import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_CLOSE_LIST,
    timeoutDefault: import.meta.env.VITE_APP_TIMEOUT_DEFAULT,
    timeoutSympa: import.meta.env.VITE_APP_TIMEOUT_SYMPA,
  },
)
const loaded = ref<boolean>(false)
const { t } = i18n.global

const creatableLists = ref<CreatableList[]>([])
const updatableLists = ref<UpdatableList[]>([])

// --- variable form creation / update ---

const modelId = ref<string | undefined>(undefined)
const modelParam = ref<string | undefined>(undefined)

const groupTreeNodesFetched = ref<boolean>(false)

const errorDuringFetchLists = ref<boolean>(false)
const errorDuringFetchAdditionalGroups = ref<boolean>(false)

const showModal = ref<boolean>(false)

function openModal(): void {
  showModal.value = true
}

onMounted(async (): Promise<void> => {
  await initOrResetLists()
  fetchAdditionalGroups()
})

const loadingAdditionalGroups = ref<boolean>(false)
const groupTreeNodeRoots = ref<Array<GroupTreeNode>>([])

async function fetchAdditionalGroups(): Promise<void> {
  loadingAdditionalGroups.value = true
  try {
    groupTreeNodeRoots.value = await getAdditionalGroups(props.apiUrlTreeData, props.timeoutDefault)
  }
  catch {
    errorDuringFetchAdditionalGroups.value = true
  }
  groupTreeNodesFetched.value = true
  loadingAdditionalGroups.value = false
}

async function initOrResetLists(): Promise<void> {
  try {
    const response: AdminSympaApiListsResponse = await getAllCreatableAndUpdatableLists(props.apiUrlLists, props.timeoutDefault)
    creatableLists.value = response.createData
    updatableLists.value = response.updateData
    loaded.value = true
  }
  catch {
    errorDuringFetchLists.value = true
  }
}

// const for modal
const modalType = ref<string>('')
const listSubject = ref<string>('')
const listAddress = ref<string>('')

function initiateCreateListFromCard(event: CustomEvent): void {
  initiateCreateOrUpdateListFromCard(event, 'create')
}

function initiateUpdateListFromCard(event: CustomEvent): void {
  initiateCreateOrUpdateListFromCard(event, 'update')
}

async function initiateCreateOrUpdateListFromCard(event: CustomEvent, type: 'create' | 'close' | 'update'): Promise<void> {
  // resetModale()

  modalType.value = type

  // fetch data for form
  modelId.value = event.detail[0]
  modelParam.value = event.detail[1] ?? null
  listSubject.value = event.detail[2] ?? null
  listAddress.value = event.detail[3] ?? null

  openModal()
}

async function initiateCloseListFromCard(event: CustomEvent): Promise<void> {
  modalType.value = 'close'

  if (event.detail.length < 2 || event.detail[0] === undefined || event.detail[0] === null || event.detail[1] === undefined || event.detail[1] === null) {
    return
  }
  listSubject.value = event.detail[0] ?? null
  listAddress.value = event.detail[1] ?? null

  openModal()
}
</script>

<template>
  <i18n-host>
    <template v-if="httpErrorCode !== undefined">
      <p v-if="supportedErrorCodes.includes(httpErrorCode)">
        {{ t(`error-messages.${httpErrorCode}`) }}
      </p>

      <p v-else>
        {{ t('error-messages-fallback') }}
      </p>
    </template>
    <p v-else-if="fetchNonHttpError === true">
      {{ t('error-messages-fallback') }}
    </p>

    <list-admin-sympa
      v-else :creatable-lists="creatableLists"
      :updatable-lists="updatableLists"
      :loaded="loaded"
      @create-list="initiateCreateListFromCard"
      @update-list="initiateUpdateListFromCard"
      @close-list="initiateCloseListFromCard"
    />
    <modal-sympa

      v-if="showModal"

      :api-url-close-list="props.apiUrlCloseList"

      :api-url-create-list="props.apiUrlCreateList"
      :api-url-form-data="props.apiUrlFormData"
      :api-url-update-list="props.apiUrlUpdateList"
      :error-during-fetch-additional-groups="errorDuringFetchAdditionalGroups"

      :group-tree-node-roots="groupTreeNodeRoots"
      :list-address="listAddress"

      :list-subject="listSubject"
      :modal-type="modalType"
      :model-id="modelId"
      :model-param="modelParam"
      :timeout-default="props.timeoutDefault"
      :timeout-sympa="props.timeoutSympa"
      @refresh="initOrResetLists"
      @close="() => {
        showModal = false
      }"
    />
  </i18n-host>
</template>

<style lang="scss">
.block {
  display: block;
}

.fa-icon {
  height: 1.25em;
  width: 1.25em;
  vertical-align: bottom;
}

.description {
  text-align: start;
}
</style>
