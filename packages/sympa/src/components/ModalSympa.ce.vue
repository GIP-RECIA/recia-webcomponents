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
import type { CreateOrUpdateListFormDataResponsePayload, GroupTreeNode } from '@/types/createListFormTypes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref, watch } from 'vue'
import i18n from '@/plugins/i18n'
import { getFormDataForModel, postCloseList, postCreateOrUpdateList } from '@/services/fetchServices'

const props = defineProps<{
  apiUrlCloseList: string
  apiUrlCreateList: string
  apiUrlFormData: string
  apiUrlUpdateList: string
  errorDuringFetchAdditionalGroups: false
  groupTreeNodeRoots: Array<GroupTreeNode>
  listAddress: string
  listSubject: string
  modalType: string
  modelId: string | undefined
  modelParam: string
  timeoutDefault: number
  timeoutSympa: number
}>()

const emit = defineEmits(['close', 'submit'])
const errorDuringSubmit = ref<boolean>(false)
const selectedNodes = ref<GroupTreeNode[]>([])
const messageKey = ref<string | null>(null)
const displayTree = ref<boolean>(false)
const errorDuringFetchFromDataFormModel = ref<boolean>(false)
const formData = ref<CreateOrUpdateListFormDataResponsePayload | undefined>(undefined)

const checkedBoxes = ref<Record<string, boolean>>({})

const statusType = ref<string>('form')

onMounted(async (): Promise<void> => {
  try {
    formData.value = await getFormDataForModel(props.apiUrlFormData, props.timeoutDefault, props.modelId!, props.modelParam)

    formData.value.editorsAliases.forEach((alias) => {
      checkedBoxes.value[alias.idRequest] = alias.checked
    })

    selectedNodes.value = []
  }
  catch {
    errorDuringFetchFromDataFormModel.value = true
  }
})

function close() {
  emit('close')
}

const { t } = i18n.global

const urlForSubmit = computed((): string => {
  switch (props.modalType) {
    case 'create':
      return props.apiUrlCreateList
    case 'update':
      return props.apiUrlUpdateList
    case 'close':
      return props.apiUrlCloseList
  }
  return ''
})

watch(displayTree, (newDisplayTree) => {
  if (newDisplayTree === false) {
    selectedNodes.value = []
  }
})

async function initOrResetLists() {
  // TODO send event to parent to ask refresh
}

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

function handleOnSelection(datas: GroupTreeNode[]) {
  selectedNodes.value = datas
}

async function handleSubmit() {
  if (errorDuringFetchFromDataFormModel.value) {
    close()
    return
  }
  statusType.value = 'waiting'

  if (props.modalType === 'create' || props.modalType === 'update') {
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
      messageKey.value = await postCreateOrUpdateList(urlForSubmit.value, props.timeoutSympa, props.modelId!, type, editorsAliases, editorGroups, typeParam)
    }
    catch {
      // n'arrive que s'il n'y a pas de message key dans l'erreur reçue
      errorDuringSubmit.value = true
    }
    finally {
      await initOrResetLists()
    }
  }
  else if (props.modalType === 'close') {
    try {
      messageKey.value = await postCloseList(urlForSubmit.value, props.timeoutSympa, props.listAddress)
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

const modalButtonI18nKey = computed(() => {
  if (errorDuringFetchFromDataFormModel.value) {
    return `modal.submit.cancel`
  }

  return `modal.submit.${props.modalType}`
})
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div v-if="formData" class="modal-content">
      <div class="modal-header">
        <h1>{{ t(`modal.title.${props.modalType}`) }}</h1>
        <button class="btn-tertiary close" :aria-label="t('aria.aria-label.close-modal')" @click="close">
          <FontAwesomeIcon class="fa-icon" :icon="['fas', 'times']" aria-hidden="true" />
        </button>
      </div>
      <div class="modal-main">
        <!-- no in error template -->
        <template v-if="errorDuringFetchFromDataFormModel === false">
          <template v-if="statusType === 'form'">
            <p style="text-align: start;" v-html="t(`modal.${modalType}-description`, { subject: props.listSubject, address: props.listAddress })" />
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
  --icon-0-font-family: 'FontAwesome';
  --icon-0-font-weight: 900;

  --icon-1-font-family: 'FontAwesome';
  --icon-1-font-weight: 900;
  --icon-1-content:  '\f0c0';

  --icon-fold-font-family: 'FontAwesome';
  --icon-fold-font-weight: 900;
  --icon-fold-content: '\f0da';
  --icon-unfold-font-family: 'FontAwesome';
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
      <div class="modal-footer">
        <button
          v-if="statusType === 'form'"
          class="btn-primary btn-create"

          @click="(event) => {
            event.stopPropagation()
            event.preventDefault()
            handleSubmit()
          }"
        >
          {{ t(modalButtonI18nKey) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/core/typo' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/global';
@use '@gip-recia/ui/components';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* assombrissement */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 900px;
  width: 90%;
  max-height: 80vh;
  position: relative;

  display: flex;
  flex-direction: column;
}

.modal-main {
  flex: 1 1 auto;
  overflow-y: auto;
  margin: 8px;
}

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0 0 auto;
  height: 25px;
}

.modal-footer {
  flex: 0 0 auto;
  height: 60px;
  margin-left: auto;
  width: fit-content;
  button {
    margin-top: 1rem;
    cursor: pointer;
  }
}

.fa-icon {
  height: 1.25em;
  width: 1.25em;
  vertical-align: top;
  pointer-events: none;
}

input[type='checkbox'] {
  accent-color: var(--recia-primary) !important;
  margin-right: 4px;
}

.btn-tertiary.close {
  color: black;
}
</style>
