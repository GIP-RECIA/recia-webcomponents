<script setup lang="ts">
import type { StructureDetail } from '../types/structureType';
import { getDetailEtab, updateEtab } from '@/services/serviceParametab';
import { showError } from '@/utils/errorUtils';
import Swal from 'sweetalert2';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const m = (key: string): string => t(`detail-etab.${key}`);
const tmp = ref<{ customName: string | undefined; siteWeb: string | undefined }>({ customName: '', siteWeb: '' });
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
  console.warn(details.value);
  try {
    await updateEtab(props.paramEtabApi + `/update/${props.detail}`, details.value, props.userInfoApiUrl);
    Swal.fire({
      title: 'Sauvegardé',
      icon: 'success',
      confirmButtonColor: '#37b61d',
    });
  } catch (error) {
    showError(error.response.data);
  }
}

const isButtonDisabled = computed<boolean>(() => {
  const hasCustomName = tmp.value.customName != undefined && tmp.value.customName.trim().length > 0;
  const CustomNameHasChanged = tmp.value.customName != details.value.structCustomDisplayName;

  const hasSiteWeb = tmp.value.siteWeb != undefined && tmp.value.siteWeb.trim().length > 0;
  const siteWebHasChanged = tmp.value.siteWeb != details.value.structSiteWeb;

  return (hasCustomName && CustomNameHasChanged) || (hasSiteWeb && siteWebHasChanged);
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
      :detail-etab="getDetailsAsString"
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
</style>
