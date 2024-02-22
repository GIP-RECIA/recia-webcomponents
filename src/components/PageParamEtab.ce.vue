<script setup lang="ts">
import { getParametab } from '@/services/serviceParametab';
import { showError } from '@/utils/errorUtils';
import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';

const parametab = ref<any>([]);
const etabJson = ref<string>('');
const currentEtab = ref<string>('');
const windowWidth = ref<number>(window.innerWidth);
const isVisible = ref<boolean>(false);
const nameEtabSelected = ref<string>('');
const findEtab = ref<any[]>([]);

const props = defineProps<{
  paramEtabApi: string;
  userInfoApiUrl: string;
}>();

onMounted(async () => {
  try {
    const res = await getParametab(props.paramEtabApi, props.userInfoApiUrl);
    parametab.value = res.data;
    // List of etablissement
    etabJson.value = JSON.stringify(parametab.value.listEtab);
    currentEtab.value = parametab.value.currentStruct;
    findEtab.value = JSON.parse(etabJson.value);
  } catch (error) {
    console.error('error : ', error.response.data);
    showError(error.response.data);
  }
  window.addEventListener('resize', handleResize);
});

onUpdated(() => {
  let id = document.getElementById(currentEtab.value);
  if (id != null) {
    id.classList.add('active');
  } else {
    const findName = filteredName();
    nameEtabSelected.value = findName;
  }
  let listEtab: HTMLElement | null = document.querySelector('.list');
  let activeElement: HTMLElement | null = document.querySelector('.content .active');

  if (listEtab) {
    if (activeElement) {
      let scrollTop = activeElement.offsetTop - listEtab.offsetTop;
      let scrollBottom = scrollTop + activeElement.offsetHeight;
      let maxScrollTop = listEtab.scrollHeight - listEtab.offsetHeight;
      if (scrollTop < 0) {
        scrollTop = 0;
      } else if (scrollBottom > listEtab.offsetHeight) {
        scrollTop = maxScrollTop;
      }
      listEtab.scrollTop = scrollTop;
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const isMobile = computed(() => {
  return windowWidth.value < 1024;
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

function filteredName() {
  let name: any = '';
  if (!etabJson.value) {
    return [];
  }
  name = findEtab.value.find((etab: any) => etab.idSiren.toString() === currentEtab.value);
  if (name) {
    return name.etabName;
  } else {
    currentEtab.value = findEtab.value[0].idSiren;
    return findEtab.value[0].etabName;
  }
}

function select(payload: CustomEvent, isBoolean: boolean) {
  let getID = payload.detail[0].idSiren;
  let getName = payload.detail[0].etabName;

  if (getID !== currentEtab.value) {
    currentEtab.value = getID;
  }

  if (isBoolean) {
    isVisible.value = false;
    nameEtabSelected.value = getName;
    currentEtab.value = getID;
  }
}
</script>

<template>
  <div v-bind="$attrs">
    <div v-if="!isMobile" class="list">
      <list-etab
        class-input="input-search"
        class-li="item etab"
        class-div="list-etab"
        v-bind:data-json="etabJson"
        :data-current="currentEtab"
        @selectEtab="select($event, false)"
      ></list-etab>
    </div>
    <div v-else class="dropdown-wrapper">
      <div class="selected-etab" @click="isVisible = !isVisible">
        <span>{{ nameEtabSelected }}</span>
      </div>
      <div v-if="isVisible" class="dropdown-popover">
        <list-etab
          class-input="search-etab"
          class-li="opt-list"
          class-div="options"
          v-bind:data-json="etabJson"
          :data-current="currentEtab"
          @selectEtab="select($event, true)"
        ></list-etab>
      </div>
    </div>
    <div class="detail">
      <detail-etab
        :detail="currentEtab"
        :param-etab-api="paramEtabApi"
        :user-info-api-url="userInfoApiUrl"
      ></detail-etab>
    </div>
  </div>
</template>
<style>
@import '../assets/detailList.css';
@import '../assets/list.css';
@import '../assets/main.css';
</style>
