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
import { computed, onMounted, ref, watch } from 'vue'
import i18n from '@/plugins/i18n'
import { getAdditionalGroups, getAllCreatableAndUpdatableLists, getFormDataForModel, postCloseList, postCreateOrUpdateList } from '@/services/fetchServices'
import { httpErrorCode, supportedErrorCodes } from '@/utils/store'
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

let triggerElement: any

const creatableLists = ref<CreatableList[]>([])
const updatableLists = ref<UpdatableList[]>([])
const formData = ref<CreateOrUpdateListFormDataResponsePayload | undefined>(undefined)
const groupTreeNodeRoots = ref<Array<GroupTreeNode>>([])
const groupTreeNodesFetched = ref<boolean>(false)
const errorDuringFetchAdditionalGroups = ref<boolean>(false)
const errorDuringFetchFromDataFormModel = ref<boolean>(false)
const errorDuringFetchLists = ref<boolean>(false)
const errorDuringSubmit = ref<boolean>(false)

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
const displayTree = ref<boolean>(false)

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

function closeModal() {
  const modalElement: InfoModal = document.querySelector('info-modal')
  modalElement.isOpen = false
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
      const modalElement: InfoModal = document.querySelector('info-modal')

      modalElement.isOpen = false
    }
  })
  initOrResetLists()
  fetchAdditionalGroups()
})

async function initOrResetLists() {
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

function handleOnSelection(datas: GroupTreeNode[]) {
  selectedNodes.value = datas
}

watch(displayTree, (newDisplayTree) => {
  if (newDisplayTree === false) {
    selectedNodes.value = []
  }
})

function getAllGroupsFromSelectedNodes(): Array<string> {
  const allGroups: Set<string> = new Set()

  const childNodeSet: Set<GroupTreeNode> = new Set()

  selectedNodes.value.forEach((node) => {
    getChildNodes(node).forEach(childNode => childNodeSet.add(childNode))
  })

  childNodeSet.forEach((childNode) => {
    allGroups.add(getSelfAndPrefix(childNode))
  })

  return Array.from(allGroups)
}

function getChildNodes(groupTreeNode: GroupTreeNode): Array<GroupTreeNode> {
  if (!groupTreeNode.children) {
    return Array.of(groupTreeNode)
  }

  let children: Array<GroupTreeNode> = []

  groupTreeNode.getChildren.forEach((child) => {
    // populated parent that is undefined by default
    child.parent = groupTreeNode
    children = children.concat(getChildNodes(child))
  })
  return children
}

function getSelfAndPrefix(groupTreeNode: GroupTreeNode): string {
  if (groupTreeNode.parent !== undefined && groupTreeNode.parent !== null) {
    return `${getSelfAndPrefix(groupTreeNode.parent)}:${groupTreeNode.text}`
  }
  return groupTreeNode.text
}

async function handleSubmit() {
  if (errorDuringFetchFromDataFormModel.value) {
    closeModal()
    return
  }
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
    try {
      messageKey.value = await postCreateOrUpdateList(urlForSubmit.value, props.timeoutSympa, modelId.value!, type, editorsAliases, editorGroups, typeParam)
    }
    catch {
      // n'arrive que s'il n'y a pas de message key dans l'erreur reçue
      errorDuringSubmit.value = true
    }
    finally {
      await initOrResetLists()
    }
  }
  else if (modalType.value === 'close') {
    try {
      messageKey.value = await postCloseList(urlForSubmit.value, props.timeoutSympa, listAddress.value)
    }
    catch {
      errorDuringSubmit.value = true
    }
    finally {
      await initOrResetLists()
    }
  }
  statusType.value = 'response'
}

function resetModale() {
  selectedNodes.value = []
  displayTree.value = false
  loadingAdditionalGroups.value = false
  groupTreeNodesFetched.value = false
  errorDuringFetchAdditionalGroups.value = false
  errorDuringFetchFromDataFormModel.value = false
  errorDuringSubmit.value = false
  messageKey.value = ''
}

function initiateCreateListFromCard(event: CustomEvent) {
  initiateCreateOrUpdateListFromCard(event, 'create')
}

function initiateUpdateListFromCard(event: CustomEvent) {
  initiateCreateOrUpdateListFromCard(event, 'update')
}

async function initiateCreateOrUpdateListFromCard(event: CustomEvent, type: 'create' | 'close' | 'update') {
  resetModale()

  modalType.value = type
  statusType.value = 'form'

  // fetch data for form
  try {
    formData.value = await getFormDataForModel(props.apiUrlFormData, props.timeoutDefault, event.detail[0], event.detail[1])
    modelId.value = event.detail[0]
    modelParam.value = event.detail[1] ?? null
    listSubject.value = event.detail[2] ?? null
    listAddress.value = event.detail[3] ?? null

    checkedBoxes.value = {}
    formData.value.editorsAliases.forEach((alias) => {
      checkedBoxes.value[alias.idRequest] = alias.checked
    })

    selectedNodes.value = []
  }
  catch {
    errorDuringFetchFromDataFormModel.value = true
  }

  openModal(t(`modal.title.${type}`))
}

async function initiateCloseListFromCard(event: CustomEvent) {
  resetModale()

  modalType.value = 'close'
  statusType.value = 'form'

  listSubject.value = event.detail[0] ?? null
  listAddress.value = event.detail[1] ?? null

  selectedNodes.value = []

  openModal(t('modal.title.close'))
}

async function fetchAdditionalGroups() {
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

const modalButtonI18nKey = computed(() => {
  if (errorDuringFetchFromDataFormModel.value) {
    return `modal.submit.cancel`
  }

  return `modal.submit.${modalType.value}`
})
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

    <list-admin-sympa v-else :creatable-lists="creatableLists" :updatable-lists="updatableLists" @create-list="initiateCreateListFromCard" @update-list="initiateUpdateListFromCard" @close-list="initiateCloseListFromCard" />
    <Teleport to="body">
      <info-modal id="modale" debug="false" style="z-index: 99;">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <div slot="modal-body">
          <!-- no in error template -->
          <template v-if="errorDuringFetchFromDataFormModel === false">
            <template v-if="statusType === 'form'">
              <p style="text-align: start;" v-html="t(`modal.${modalType}-description`, { subject: listSubject, address: listAddress })" />
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
                    <label for="self">{{ listAddress }} {{ t('modal.self-register-explanation') }}</label>
                  </div>

                  <button

                    class="btn-tertiary small"
                    :disabled="loadingAdditionalGroups"
                    aria-controls="additiona-groups-tree"

                    :aria-expanded="displayTree"
                    @click="(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      displayTree = !displayTree
                    }"
                  >
                    {{ t("modal.load-more-groups") }}
                    <FontAwesomeIcon v-if="displayTree" class="fa-icon" :icon="['fas', 'minus']" />
                    <FontAwesomeIcon v-else class="fa-icon" :icon="['fas', 'plus']" />
                  </button>
                  <!-- eslint-disable vue/attribute-hyphenation -->
                  <esup-js-tree
                    v-if="groupTreeNodeRoots.length > 0 && displayTree"
                    id="additiona-groups-tree"

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

                  <!-- error during additional group fetch -->
                  <p v-if="errorDuringFetchAdditionalGroups" style="margin-top: 5px; text-align: start;">
                    {{ t('error-messages-additional-groups') }}
                  </p>

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
              <p v-if="messageKey !== undefined && messageKey !== null && messageKey.length > 0">
                {{ t(`modal.response.${messageKey}`) }}
              </p>
              <p v-else-if="errorDuringSubmit === false" v-html="t(`modal.response.${modalType}.default`)" />
              <p v-else>
                {{ t('error-messages-sumbit') }}
              </p>
            </template>
          </template>
          <p v-else>
            {{ t('error-messages-list-data') }}
          </p>
        </div>

        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <div v-if="statusType === 'form' && httpErrorCode === undefined" slot="modal-footer">
          <button
            class="btn-secondary btn-create"

            @click="(event) => {
              event.stopPropagation()
              event.preventDefault()
              handleSubmit()
            }"
          >
            {{ t(modalButtonI18nKey) }}
          </button>
        </div>
      </info-modal>
    </Teleport>
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
