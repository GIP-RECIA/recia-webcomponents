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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  show: boolean;
  changeEtabApi: string;
  userInfoApiUrl: string;
}>();

const { t } = useI18n();
const m = (key: string): string => t(`change-etab.${key}`);

const emit = defineEmits(['update:show']);

let showState = ref<boolean>(false);
const checked = ref<string>('');
const changeetab = ref<any>([]);
const etabJson = ref<string>('');
const structCurrent = ref<any>([]);

const closeModal = () => {
  showState.value = false;
  emit('update:show', false);
};

// Watch for changes in the `show` prop to update `showState`
watch(
  () => props.show,
  (newVal) => {
    showState.value = newVal;

    // Only call the API when the modal is opened (showState becomes true)
    if (newVal) {
      fetchModalData();
    }
  },
);

// Fetch modal data from the API
const fetchModalData = async () => {
  try {
    const res = await getChangeEtab(props.changeEtabApi, props.userInfoApiUrl);
    changeetab.value = res.data;
    etabJson.value = changeetab.value.sirenStructures;
    structCurrent.value = changeetab.value.structCurrent;
  } catch (error: any) {
    console.error('error : ', error.res.data);
  }
};

// watch(checked, () => console.log('checked.val : ', checked.value));

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


// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showState.value) {
    // Close modal on "Escape" key
    closeModal();
  }
};

// Attach keydown event listeners when component is mounted
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

// Remove keydown event listeners when component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <!-- Modal -->
  <div v-if="showState" class="modal-mask" @click="closeModal">
    <div class="modal-component" @click.stop>
      <div class="modal-header">
        <h1>{{ m('title') }}</h1>
        <button class="btn-close" @click="closeModal">
          <font-awesome-icon :icon="['fa', 'xmark']" />
        </button>
      </div>

      <div class="modal-content">
        <span class="current"
          >{{ m('struct-current') }} {{ structCurrent.displayName }} <small>({{ structCurrent.code }})</small></span
        >
        <div class="form-change">
          <fieldset>
            <legend>{{ m('legend') }}</legend>
            <ul class="list-struct">
              <li v-for="data in structures" :key="data.id">
                <input type="radio" name="" :id="data.id" :value="data.id" v-model="checked" />
                <label :for="data.id">
                  {{ data.displayName }} <small> ({{ data.code }}) </small></label
                >
              </li>
            </ul>
          </fieldset>
          <div style="display: flex; margin: 15px 0px 0px">
            <div style="flex-grow: 1"></div>
            <button :disabled="isButtonDisabled" class="btn-submit" @click="updateStruct">
              {{ m('valid-button') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
  list-style: none;
  margin: 10px 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-header {
  width: 100%;
  display: flex;
}

.modal-content {
  width: 100%;
  display: grid;
}
.form-change {
  align-self: flex-start;
}

h1 {
  margin: 0px;
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
  z-index: var(--change-etab-modal-z-index, 1055);
}

.modal-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 650px;
  padding: 20px;
  border-radius: 28px;
  bottom: 10%;
  max-width: 90%;
  /* height: 500px; */
  color: var(--change-etab-font-text-color, #333);
}

.btn-close {
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

.btn-submit:disabled {
  color: #757575;
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.btn-submit {
  padding: 7px;
  width: 28%;
  border-radius: 5px;
  background-color: var(--change-etab-button-background-color, #25b2f3);
  color: var(--change-etab-button-text-color, #ffffff);
  cursor: pointer;
  border: transparent;
  font-size: 15px;
}
</style>
