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
import type { StructureDetail } from '../types/structureType';
import { getDetailEtab, updateEtab } from '@/services/serviceParametab';
import { showError, showSuccess } from '@/utils/useToast';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const m = (key: string): string => t(`detail-etab.${key}`);
const tmp = ref<{ customName: string | null; siteWeb: string | null }>({ customName: '', siteWeb: '' });
const getDetailsAsString = ref<string>('');
const details = ref<StructureDetail>({
  id: '',
  name: '',
  displayName: '',
  description: '',
  otherAttributes: [],
  structCustomDisplayName: '',
  structLogo: '',
  structSiteWeb: '',
});

const props = defineProps<{
  structCurrent: string;
  detail: string;
  paramEtabApi: string;
  userInfoApiUrl: string;
  defaultLogoIcon: string;
}>();

const initForm = (): void => {
  tmp.value = {
    customName: details.value.structCustomDisplayName,
    siteWeb: details.value.structSiteWeb,
  };
};

watchEffect((): void => {
  void (async () => {
    await fetchDetailData(props.detail);
  })();
});

watch(details, (): void => initForm());

async function fetchDetailData(id: string) {
  if (id != '') {
    try {
      const response = await getDetailEtab(props.paramEtabApi + id);
      details.value = response.data;
      getDetailsAsString.value = JSON.stringify(details.value);
    } catch (error) {
      console.error('error: ', error);
    }
  }
}

async function updateInfo() {
  try {
    const structCustomDisplayName =
      tmp.value.customName && tmp.value.customName.trim().length > 0 ? tmp.value.customName : null;
    const structSiteWeb = tmp.value.siteWeb && tmp.value.siteWeb.trim().length > 0 ? tmp.value.siteWeb : null;

    const response = await updateEtab(
      props.paramEtabApi + `update/${props.detail}`,
      { ...details.value, structCustomDisplayName, structSiteWeb },
      props.userInfoApiUrl,
    );
    details.value = response.data;

    if (props.detail == props.structCurrent) {
      const myEvent = new CustomEvent('update-structure-name', {
        detail: {
          structName: details.value.structCustomDisplayName,
        },
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(myEvent);
    }
    showSuccess();
  } catch (error: any) {
    console.error('error: ', error);
    showError(error);
  }
}

const isButtonDisabled = computed<boolean>(() => {
  const structCustomDisplayName =
    tmp.value.customName && tmp.value.customName.trim().length > 0 ? tmp.value.customName : null;
  const structSiteWeb = tmp.value.siteWeb && tmp.value.siteWeb.trim().length > 0 ? tmp.value.siteWeb : null;

  let checkCustomName = true;
  const customNameHasChanged = structCustomDisplayName != details.value.structCustomDisplayName;
  if (details.value.structCustomDisplayName != null)
    checkCustomName = checkCustomName && structCustomDisplayName != null;

  let checkSiteWeb = true;
  const siteWebHasChanged = structSiteWeb != details.value.structSiteWeb;
  if (details.value.structSiteWeb != null) checkSiteWeb = checkSiteWeb && structSiteWeb != null;

  return checkCustomName && checkSiteWeb && (customNameHasChanged || siteWebHasChanged);
});

onMounted((): void => initForm());
</script>

<template>
  <span class="warn">
    {{ m('warn') }}
    <br />{{ m('explication') }}
  </span>
  <div class="title-info">{{ m('info') }}</div>
  <div class="container">
    <image-cropper
      :struct-current="structCurrent"
      :image-url="details.structLogo"
      :id-etab="details.id"
      :param-etab-api="paramEtabApi"
      :user-info-api-url="userInfoApiUrl"
      :default-logo-icon="defaultLogoIcon"
    >
      <teleport to="body"></teleport
    ></image-cropper>

    <div class="infos">
      <label class="label">
        <input class="input-field" type="text" :value="details.name" disabled />
        <span>{{ m('nom-institutionnel') }}</span>
      </label>
      <label class="label">
        <input
          id="customName"
          class="input-field"
          type="text"
          :placeholder="m('nom-personnalise-placeholder')"
          :maxlength="56"
          v-model="tmp.customName"
        />
        <span>{{ m('nom-personnalise-titre') }}</span>
      </label>
      <label class="label">
        <input class="input-field" type="text" :placeholder="m('lien-placeholder')" v-model="tmp.siteWeb" />
        <span>{{ m('lien') }}</span>
      </label>
      <br />
      <button :disabled="!isButtonDisabled" class="btn-valider" @click="updateInfo">
        {{ m('valider') }}
      </button>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/base.scss';

.title-info {
  margin: 15px auto;
  padding: 5px 15px;
  background-color: #eeeeee;
  font-weight: bold;
  font-size: medium;
}

.warn {
  font-style: italic;
  font-size: small;
  left: 3px;
  top: 5px;
}

.infos {
  flex-grow: 1;
  padding-left: 10px;
  padding-right: 10px;
}

.label {
  display: flex;
  flex-direction: column;
  padding-top: 5px;

  input {
    order: 2;
    outline: none;
    top: 0.08rem;
  }
}

.label > span {
  color: #a5a5a5;
  display: block;
  font-size: 0.875em;
  margin-top: 0.625em;
  order: 1;
  transition: all 0.25s;
  font-weight: 500;
}

.input-field {
  border: 0;
  border-bottom: 2px solid #eee;
}

.input-field:focus {
  border-bottom: 2px solid var(--param-etab-input-text-focus-color, #25b2f3);
}

.input-field:disabled {
  cursor: not-allowed;
}

.btn-valider {
  padding: 5px;
  width: 20%;
  border-radius: 10px;
  background-color: var(--param-etab-button-background-color, #25b2f3);
  color: var(--param-etab-button-text-color, #ffffff);
  cursor: pointer;
  margin-bottom: 20px;
  border: transparent;
}

.btn-valider:disabled {
  color: #757575;
  background-color: #d6d6d6;
  cursor: not-allowed;
}

*:disabled {
  color: black;
}

@media (max-height: 650px) {
  .container {
    display: flex;
  }
}

@media (max-width: 1023px) {
  .container {
    display: block;
  }

  .btn-valider {
    width: 25%;
  }
}
</style>
