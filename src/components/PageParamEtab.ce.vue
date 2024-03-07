<script setup lang="ts">
import { getParametab } from '@/services/serviceParametab';
import { showError } from '@/utils/errorUtils';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

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
  defaultLogoIcon: string;
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

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const isMobile = computed(() => {
  return windowWidth.value < 1024;
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const filteredName = () => {
  let name: any = '';
  if (!etabJson.value) {
    return;
  }
  name = findEtab.value.find((etab: any) => etab.idSiren.toString() === currentEtab.value);
  if (!name) {
    currentEtab.value = findEtab.value[0].idSiren;
    name = findEtab.value[0].etabName;
  } else {
    name = name.etabName;
  }
  nameEtabSelected.value = name;
};

watch(currentEtab, () => {
  filteredName();
});

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
  <div id="app">
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
          class-input="input-search-mobile"
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
        :default-logo-icon="defaultLogoIcon"
      ></detail-etab>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/base.scss';

#app {
  max-width: 1280px;
  max-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: flex;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
    flex-wrap: wrap;
  }
}

@media (max-width: 1024px) {
  #app {
    display: flex;
    flex-wrap: wrap;
  }
}

.list {
  flex: 1 30%;
  background-color: white;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  overflow-y: hidden;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.12),
    0 1px 2px 0 rgba(0, 0, 0, 0.12);
}

.detail {
  flex-grow: 2;
  background-color: white;
  border-radius: 5px;
  margin: 10px;
  max-height: 100%;
  height: max-content;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.12),
    0 1px 2px 0 rgba(0, 0, 0, 0.12);
}

.dropdown-wrapper {
  flex: 1 30%;
  border-radius: 5px;
  margin: 10px;
  overflow-y: scroll;

  .selected-etab {
    background: white;
    background-position-x: right 15px;
    background-size: 15px 15px;
    border: 2px solid lightgray;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  .selected-etab::after {
    content: '\f078';
    font-family: 'FontAwesome', sans-serif;
    color: #757575;
    left: 0;
    right: 0;
  }

  .dropdown-popover {
    position: relative;
    border: 2px solid lightgray;
    left: 0;
    right: 0;
    background-color: #fff;
    max-width: 100%;
    padding: 10px;
    border-top: none;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
</style>
