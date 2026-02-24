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
import type { InfoModal } from '@gip-recia/info-modal'
import type { CreateOrUpdateListFormDataResponsePayload, GroupTreeNode } from '@/types/createListFormTypes'
import type { AdminSympaApiListsResponse, CreatableList, UpdatableList } from '@/types/sympaTypes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref } from 'vue'
import i18n from '@/plugins/i18n'
import { getAdditionalGroups, getAllCreatableAndUpdatableLists, getFormDataForModel, postCloseList, postCreateOrUpdateList } from '@/services/fetchServices'
import '@gip-recia/js-tree'

const props = withDefaults(
  defineProps<{
    apiUrlLists?: string
    apiUrlFormData?: string
    apiUrlTreeData?: string
    apiUrlCreateList?: string
    apiUrlUpdateList?: string
    apiUrlCloseList?: string
    timeout?: number
    timeoutLong?: number
  }>(),
  {
    apiUrlLists: import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_LISTS,
    apiUrlFormData: import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_FORM_DATA,
    apiUrlTreeData: import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_TREE_DATA,
    apiUrlCreateList: import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_CREATE_LIST,
    apiUrlUpdateList: import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_UPDATE_LIST,
    apiUrlCloseList: import.meta.env.VITE_APP_ADMIN_SYMPA_API_URI_CLOSE_LIST,
    timeout: import.meta.env.VITE_APP_TIMEOUT,
    timeoutLong: import.meta.env.VITE_APP_TIMEOUT_LONG,
  },
)
const loaded = ref<boolean>(false)
const { t } = i18n.global

let triggerElement: any

const creatableLists = ref<CreatableList[]>([])
const updatableLists = ref<UpdatableList[]>([])
const formData = ref<CreateOrUpdateListFormDataResponsePayload | undefined>(undefined)
const groupTreeNodeRoots = ref<Array<GroupTreeNode>>([])

// --- variable form creation / update ---

const modelId = ref<string | undefined>(undefined)
const modelParam = ref<string | undefined>(undefined)
const checkedBoxes = ref<Record<string, boolean>>({})
const loadingAdditionalGroups = ref<boolean>(false)
const selectedNodes = ref<GroupTreeNode[]>([])
const modalType = ref<'create' | 'update' | 'close'>('create')
const statusType = ref<'form' | 'waiting' | 'response'>('form')
const listAddress = ref<string>('')
const listSubject = ref<string>('')
const messageKey = ref<string | null>(null)

const urlForSubmit = computed((): string => {
  switch (modalType.value) {
    case 'create':
      return props.apiUrlCreateList
    case 'update':
      return props.apiUrlUpdateList
    case 'close':
      return props.apiUrlCloseList
  }
  return ''
})

function openModal(title: string) {
  document.dispatchEvent(
    new CustomEvent('openModale', {
      bubbles: true,
      detail: { title },
    }),
  )
}

onMounted(async (): Promise<void> => {
  document.addEventListener('openModale', (event: any) => {
    triggerElement = event.detail.originalEvent
    const modalElement: InfoModal = document.querySelector('info-modal')
    modalElement.isOpen = !modalElement.isOpen
    modalElement.titleModal = event.detail.title
    modalElement.mainElement = document.querySelector('body > main, body > div')
  })

  document.addEventListener('closeModale', (event) => {
    if (triggerElement) {
      triggerElement.focus()
      event.preventDefault()
    }
  })

  const response: AdminSympaApiListsResponse = await getAllCreatableAndUpdatableLists(props.apiUrlLists, props.timeout)
  creatableLists.value = response.createData
  updatableLists.value = response.updateData
  loaded.value = true
})

function handleOnSelection(datas: GroupTreeNode[]) {
  selectedNodes.value = datas
}

function getAllGroupsFromSelectedNodes(): Array<string> {
  const allGroups: Set<string> = new Set()

  selectedNodes.value.forEach((node) => {
    const fullPrefix: string | undefined = node.parent ? getPrefix(node.parent) : undefined
    const suffixes: Array<string> = getSuffixesAndSelf(node)

    suffixes.forEach((suffixe) => {
      allGroups.add(fullPrefix ? `${fullPrefix}:${suffixe}` : suffixe)
    })
  })

  return Array.from(allGroups)
}

function getPrefix(groupTreeNode: GroupTreeNode): string {
  return groupTreeNode.parent ? `${getPrefix(groupTreeNode.parent)}:${groupTreeNode.text}` : groupTreeNode.text
}

function getSuffixesAndSelf(groupTreeNode: GroupTreeNode): Array<string> {
  const suffixes: Array<string> = []

  if (!groupTreeNode.children) {
    suffixes.push(groupTreeNode.text)
    return suffixes
  }

  groupTreeNode.getChildren.forEach((child) => {
    suffixes.push(`${groupTreeNode.text}:${getSuffixesAndSelf(child)}`)
  })
  return suffixes
}

async function handleSubmit() {
  statusType.value = 'waiting'

  if (modalType.value === 'create' || modalType.value === 'update') {
    const type: string = formData.value!.type
    const editorsAliases: string | null = Object.keys(checkedBoxes.value).length > 0
      ? (Object.entries(checkedBoxes.value)
          .filter(([, value]) => value)
          .filter(([key]) => key !== 'self')
          .map(([key]) => key))
          .join('$')
      : null

    const groupsFromTree: string | null = selectedNodes.value.length > 0 ? getAllGroupsFromSelectedNodes().join('$') : null
    const groupFromCheckbox: string | null = checkedBoxes.value.self === true ? formData.value!.subscribersGroup : null

    const editorGroups: string | null = groupsFromTree !== null || groupFromCheckbox !== null
      ? [groupFromCheckbox, groupsFromTree].filter(x => x !== null).join('$')
      : null

    const typeParam: string | null = formData.value?.typeParam !== null || formData.value?.typeParamName !== null ? `${formData.value?.typeParamName}$${formData.value?.typeParam}` : null
    messageKey.value = await postCreateOrUpdateList(urlForSubmit.value, props.timeoutLong, modelId.value!, type, editorsAliases, editorGroups, typeParam)
  }
  else if (modalType.value === 'close') {
    messageKey.value = await postCloseList(urlForSubmit.value, props.timeoutLong, listAddress.value)
  }
  statusType.value = 'response'
}

async function createList(event: CustomEvent) {
  modalType.value = 'create'
  statusType.value = 'form'

  // fetch data for form
  formData.value = await getFormDataForModel(props.apiUrlFormData, props.timeout, event.detail[0], event.detail[1])

  modelId.value = event.detail[0]
  modelParam.value = event.detail[1] ?? null
  listSubject.value = event.detail[2] ?? null
  listAddress.value = event.detail[3] ?? null

  checkedBoxes.value = {}
  formData.value.editorsAliases.forEach((alias) => {
    checkedBoxes.value[alias.idRequest] = alias.checked
  })

  selectedNodes.value = []
  loadingAdditionalGroups.value = false

  openModal(t('modal.title.create'))
}

async function updateList(event: CustomEvent) {
  modalType.value = 'update'
  statusType.value = 'form'

  // fetch data for form
  formData.value = await getFormDataForModel(props.apiUrlFormData, props.timeout, event.detail[0], event.detail[1])

  modelId.value = event.detail[0]
  modelParam.value = event.detail[1] ?? null
  listSubject.value = event.detail[2] ?? null
  listAddress.value = event.detail[3] ?? null

  checkedBoxes.value = {}
  formData.value.editorsAliases.forEach((alias) => {
    checkedBoxes.value[alias.idRequest] = alias.checked
  })

  selectedNodes.value = []
  loadingAdditionalGroups.value = false

  openModal(t('modal.title.update'))
}

async function closeList(event: CustomEvent) {
  modalType.value = 'close'
  statusType.value = 'form'

  listSubject.value = event.detail[0] ?? null
  listAddress.value = event.detail[1] ?? null

  selectedNodes.value = []
  loadingAdditionalGroups.value = false

  openModal(t('modal.title.close'))
}

async function fetchAdditionalGroups() {
  loadingAdditionalGroups.value = true
  groupTreeNodeRoots.value = await getAdditionalGroups(props.apiUrlTreeData, props.timeout)
  loadingAdditionalGroups.value = false
}
</script>

<template>
  <i18n-host>
    <p>Page Admin Sympa</p>

    <list-admin-sympa :creatable-lists="creatableLists" :updatable-lists="updatableLists" @create-list="createList" @update-list="updateList" @close-list="closeList" />

    <Teleport to="body">
      <info-modal id="modale" debug="false" style="z-index: 99;">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <div slot="modal-body">
          <template v-if="statusType === 'form'">
            <p v-html="t(`modal.${modalType}-description`, { subject: listSubject, address: listAddress })" />
            <template v-if="modalType === 'create' || modalType === 'update'">
              <p v-if="modalType === 'update'">
                {{ t('modal.update-warning') }}
              </p>

              <form>
                <div v-for="alias in formData?.editorsAliases" :key="alias.idRequest">
                  <input
                    :id="alias.idRequest" v-model="checkedBoxes[alias.idRequest]" type="checkbox" :checked="alias.checked" :disabled="!alias.editable"
                  >
                  <label :for="alias.idRequest">{{ alias.name }}</label>
                </div>

                <div>
                  <input
                    id="self"
                    v-model="checkedBoxes.self" type="checkbox"
                  >
                  <label for="self">Self register</label>
                </div>

                <button
                  class="btn-secondary small"
                  :disabled="loadingAdditionalGroups"
                  @click="(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    fetchAdditionalGroups()
                  }"
                >
                  {{ t("modal.load-more-groups") }}
                  <FontAwesomeIcon class="fa-icon" :icon="['fas', 'plus']" />
                </button>
                <!-- eslint-disable vue/attribute-hyphenation -->
                <esup-js-tree
                  v-if="groupTreeNodeRoots.length > 0"

                  style="
              accent-color: 'var(--recia-primary)';
  --icon-0-font-family: 'Font Awesome 6 Free';
  --icon-0-font-weight: 900;

  --icon-1-font-family: 'Font Awesome 6 Free';
  --icon-1-font-weight: 900;
  --icon-1-content:  '\f0c0';

  --icon-fold-font-family: 'Font Awesome 6 Free';
  --icon-fold-font-weight: 900;
  --icon-fold-content: '\f0da';
  --icon-unfold-font-family: 'Font Awesome 6 Free';
  --icon-unfold-font-weight: 900;
  --icon-unfold-content: '\f0d7';
  "

                  .onSelection="handleOnSelection"

                  :datas="groupTreeNodeRoots"
                  :config="{ showCheckbox: true, isMultipleSelection: true }"
                />
                <!-- eslint-enable vue/attribute-hyphenation -->
              </form>
            </template>
            <!-- if create or update end -->
          </template>
          <!-- if form end -->
          <template v-if="statusType === 'waiting'">
            <p>{{ t('modal.description.waiting') }}</p>
          </template>
          <!-- if waiting end -->
          <template v-if="statusType === 'response'">
            <p v-if="messageKey !== null && messageKey.length > 0">
              {{ t(messageKey) }}
            </p>
            <p v-else v-html="t(`modal.response.${modalType}.default`)" />
          </template>
        </div>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <div v-if="statusType === 'form'" slot="modal-footer">
          <button
            class="btn-secondary btn-create"

            @click="(event) => {
              event.stopPropagation()
              event.preventDefault()
              handleSubmit()
            }"
          >
            {{ t(`modal.submit.${modalType}`) }}
          </button>
        </div>
      </info-modal>
    </Teleport>
  </i18n-host>
</template>

<style lang="scss">
@use '@/assets/main.scss' as *;

.block {
  display: block;
}

.fa-icon {
  height: 1.25em;
  width: 1.25em;
  vertical-align: bottom;
}

:root {
  --primary: #{$primary};
}
</style>
