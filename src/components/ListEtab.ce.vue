<script setup lang="ts">
import { type Ref, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const m = (key: string): string => t(`list-etab.${key}`);

const props = defineProps<{
  dataJson: string;
  classInput: string;
  classLi: string;
  classDiv: string;
  dataCurrent: string;
}>();

const emit = defineEmits<(e: 'selectEtab', payload: any, isSelected: boolean) => void>();
let input: Ref<string> = ref('');
const el = ref<HTMLElement>();

function filteredList(): any[] {
  if (!props.dataJson) {
    return [];
  }
  const jsonData = JSON.parse(props.dataJson);
  const filteredData = jsonData.filter((etab: any) => etab.etabName.toLowerCase().includes(input.value.toLowerCase()));

  setTimeout(() => {
    const target: HTMLElement | null = el.value != null ? el.value.querySelector('.content .active') : null;
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  return filteredData;
}

function selected(id: string) {
  emit('selectEtab', id, false);
}

const filteredData = computed(() => filteredList());
</script>

<template>
  <div class="search-bar">
    <input v-model="input" :class="classInput" type="text" :placeholder="m('recherche')" />
  </div>
  <div :class="classDiv" ref="el">
    <ul class="content">
      <li v-for="etab in filteredData" :id="etab.idSiren" :key="etab">
        <button :class="[classLi, etab.idSiren == dataCurrent ? 'active' : '']" @click="selected(etab)">
          {{ etab.etabName }}
        </button>
      </li>
    </ul>
  </div>

  <div v-if="input && filteredData.length === 0" class="item error">
    <p>{{ m('aucun-res') }}</p>
  </div>
</template>

<style>
@import '../assets/base.css';

.list {
  flex: 1 30%;
  background-color: white;
  border-radius: 5px;
  margin: 10px;
  overflow-y: scroll;
  /* box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12); */
}

.text {
  text-align: center;
}

.bold {
  font-weight: bold;
}

.input-search {
  display: block;
  width: 100%;
  margin: 10px auto 20px;
  padding: 10px 45px;
  background: white;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.search-bar::after {
  content: '\f002';
  color: #757575;
  font-family: 'FontAwesome', sans-serif;
  position: absolute;
  left: 1rem; /* Adjust this value based on your preference */
  top: 26%;
}

.item {
  cursor: pointer;
  line-height: 1.5;
  margin: 0 auto 5px auto;
  padding: 10px 20px;
  color: black;
  border-radius: 5px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  width: 100%;
  border: none;
  text-align: start;
}

.etab {
  background-color: white;
  cursor: pointer;
  list-style-type: none;
}

ul {
  padding-left: 0px;
}

ul .etab:hover {
  background: #eeeeee;
}

.error {
  background-color: tomato;
}

.selected {
  background-color: green;
}

.active {
  background-color: #d4d4d4;
  color: black;
}

.search-bar {
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
}

@media (max-width: 1023px) {
  .person-list {
    display: none;
  }
  .list-select {
    flex: 1 30%;
    background-color: white;
    border-radius: 5px;
    margin: 10px;
    overflow-y: scroll;
  }

  .search-bar::after {
    content: '\f002';
    color: #757575;
    font-family: 'FontAwesome', sans-serif;
    position: absolute;
    left: 20px; /* Adjust this value based on your preference */
    top: 3px;
  }
}

.search-etab {
  width: 100%;
  height: 30px;
  border: 2px solid lightgray;
  font-size: 16px;
  padding: 10px 45px;
  background-size: 15px 15px;
  border-radius: 5px;
}
.options {
  width: 100%;
}

.list-etab {
  width: 100%;
}
.options ul {
  list-style: none;
  text-align: left;
  padding-left: 0px;
  max-height: 180px;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 10px;
}

.list-etab ul {
  max-height: 85vh;
  list-style: none;
  text-align: left;
  padding-left: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.options ul .opt-list {
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  cursor: pointer;
}
.options ul .opt-list:hover {
  background: #d4d4d4;
  font-weight: bold;
}
</style>
