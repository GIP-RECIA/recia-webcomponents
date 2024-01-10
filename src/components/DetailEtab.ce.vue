<script setup lang="ts">
import type { StructureDetail } from '../types/structureType';
import { getDetailEtab, updateEtab } from '@/services/serviceParametab';
import { showError } from '@/utils/errorUtils';
import axios from 'axios';
import Swal from 'sweetalert2';
import { computed, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const m = (key: string): string => t(`detail-etab.${key}`);
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
// const details = ref<any[]>([]);

const props = defineProps<{
  detail: string;
  baseApiUrl: string;
  paramEtabApi: string;
  userInfoApiUrl: string;
}>();

watchEffect((): void => {
  void (async () => {
    await fetchDetailData(props.detail);
  })();
});

async function fetchDetailData(id: string) {
  if (id != '') {
    try {
      //const response = await axios.get(`/test/api/${id}`);
      const response = await getDetailEtab(props.baseApiUrl + props.paramEtabApi + id);
      details.value = response.data;
      getDetailsAsString.value = JSON.stringify(details.value);
    } catch (error) {
      console.error('error: ', error);
    }
  }
}

const handleUpdated = async ({ urlEtab }) => {
  const res = await axios.get(urlEtab);
  details.value = res.data;
};

async function updateInfo() {
  console.warn(details.value);
  const dataJson = `/test/api/updateV2/${props.detail}`;
  try {
    await updateEtab(props.baseApiUrl + dataJson, details.value, props.userInfoApiUrl);
    Swal.fire({
      title: 'Sauvegardé',
      icon: 'success',
    });
  } catch (error) {
    showError(error.response.data);
  }
}

const isButtonDisabled = computed(() => {
  return (
    (details.value.structCustomDisplayName === null || details.value.structCustomDisplayName === '') &&
    (details.value.structSiteWeb === null || details.value.structSiteWeb === '')
  );
});
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
      :base-api-url="baseApiUrl"
      :user-info-api-url="userInfoApiUrl"
      @updated="handleUpdated"
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
          v-model="details.structCustomDisplayName"
        />
        <span>{{ m('nom-personnalise-titre') }}</span>
      </label>
      <label class="label">
        <input class="input-field" type="text" :placeholder="m('lien-placeholder')" v-model="details.structSiteWeb" />
        <span>{{ m('lien') }}</span>
      </label>
      <br />
      <button :disabled="isButtonDisabled" class="btn-valider" @click="updateInfo">
        {{ m('valider') }}
      </button>
    </div>
  </div>
</template>
<style>
@import '../assets/detailList.css';
/* @import '../assets/list.css'; */
</style>
