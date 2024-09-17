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
import { getChangeEtab, updateCurrentStruct } from '@/services/serviceChangeEtab';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  show: boolean;
  changeEtabApi: string;
  userInfoApiUrl: string;
}>();

const { t } = useI18n();
const m = (key: string): string => t(`change-etab.${key}`);

const emit = defineEmits(['update:show']);

console.log('showProps: ', props.show);
let showState = ref<boolean>(props.show);
const checked = ref<string>('');
const changeetab = ref<any>([]);
const etabJson = ref<string>('');
const structCurrent = ref<any>([]);

const closeModal = () => {
  showState.value = false;
  console.log('showState: ', showState.value);
};

onMounted(async () => {
  try {
    const res = await getChangeEtab(props.changeEtabApi, props.userInfoApiUrl);
    changeetab.value = res.data;
    // List of structures
    etabJson.value = changeetab.value.sirenStructures;
    structCurrent.value = changeetab.value.structCurrent;
  } catch (error: any) {
    console.error('error : ', error.res.data);
  }
});

watch(
  () => props.show,
  () => {
    showState.value = props.show;
  },
);
watch(checked, () => console.log('checked.val : ', checked.value));

function listStructs(): any {
  if (!etabJson.value) {
    return [];
  }

  return etabJson.value;
}

async function updateStruct() {
  try {
    const confirmed = confirm(m('change-confirm'));
    if (confirmed) {
      const res = await updateCurrentStruct(props.changeEtabApi + checked.value, props.userInfoApiUrl);
      location.replace(res.data.redirectUrl + `/Logout`);
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

const structures = computed(() => listStructs());

const isButtonDisabled = computed<boolean>(() => {
  return checked.value === '';
});
</script>

<template>
  <!-- Modal -->

  <div v-if="showState" @input="emit('update:show')" class="modal-mask">
    <div class="modal-component">
      <div class="modal-header">
        <h1>{{ m('title') }}</h1>
        <button class="btnClose" @click="closeModal">
          <font-awesome-icon :icon="['fa', 'xmark']" />
        </button>
      </div>

      <div class="modal-content">
        <span class="current"
          >{{ m('struct-current') }} {{ structCurrent.displayName }} <small>({{ structCurrent.code }})</small></span
        >
        <div class="formChange">
          <fieldset>
            <legend>{{ m('legend') }}</legend>
            <div class="list-struct">
              <div v-for="data in structures" :key="data.id" class="struct">
                <input type="radio" name="" :id="data.id" :value="data.id" v-model="checked" />
                <label :for="data.id">
                  {{ data.displayName }} <small> ({{ data.code }}) </small></label
                >
              </div>
            </div>
          </fieldset>
          <button :disabled="isButtonDisabled" class="btnSubmit" @click="updateStruct">
            {{ m('valid-button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
label {
  font-size: 14px;
}

.current {
  align-self: flex-start;
  font-size: 15px;
  margin-bottom: 15px;
}

fieldset {
  padding: 0;
  margin: 0;
  border: 0;
}

legend {
  padding: 0;
  font-size: 18px;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
}
.list-struct {
  max-height: 50%;
  overflow-y: scroll;
}
.struct {
  padding-top: 12px;
}
.modal-header {
  width: 100%;
  display: flex;
}

.modal-content {
  width: 100%;
  display: grid;
}
.formChange {
  align-self: flex-start;
}

h1 {
  font-size: 22px;
}

.modal-mask {
  position: fixed;
  float: left;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 650px;
  padding: 20px;
  border-radius: 8px;
  bottom: 10%;
  max-width: 90%;
  /* height: 500px; */
}

.btnClose {
  opacity: 0.4;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  margin-left: auto;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
}

.btnSubmit:disabled {
  color: #757575;
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.btnSubmit {
  padding: 7px;
  width: 28%;
  border-radius: 5px;
  background-color: var(--change-etab-button-background-color, #25b2f3);
  color: var(--change-etab-button-text-color, #ffffff);
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 15px;
  border: transparent;
  font-size: 15px;
}
</style>
