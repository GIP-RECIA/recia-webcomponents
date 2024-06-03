<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onClickOutside } from '@vueuse/core';
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['close']);

const props = defineProps<{
  title: string;
  editor: string;
  description?: string;
}>();

const target = ref(null);
onClickOutside(target, () => emit('close'));

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div class="modal">
    <div class="modal-content" ref="target">
      <div class="modal-header">
        <div class="close-button-container">
          <button class="close-button" @click="closeModal()">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>
      </div>
      <div class="modal-body">
        <div class="info-row-container center">
          <h1 class="title">Informations de la ressource</h1>
          <font-awesome-icon class="info-icon" :icon="['fas', 'circle-info']" style="width: 1.5em; height: 1.5em" />
        </div>
        <div class="info-row-container info">
          <div class="info-column-container">
            <h3 class="key">Titre :</h3>
            <span>{{ title }}</span>
          </div>
          <div class="info-column-container">
            <h3 class="key">Editeur :</h3>
            <span>{{ editor }}</span>
          </div>
        </div>
        <div v-if="description">
          <h3 class="key">Description :</h3>
          <span>{{ description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
ss
<style lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  background-color: #5a5a5abe;
}
.modal-content {
  position: relative;
  max-width: 600px;
  width: 100%;
  padding: spacing(4);
  margin: 0;

  background-color: #ffffff;
  border-radius: 0.7em;
}

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: right;
}

.modal-body {
  padding: 0 1em 1em 1em;
}

.close-button-container {
  justify-content: center;
  padding: 0.5em;
  width: fit-content;
  height: fit-content;
}

.close-button {
  all: unset;
  width: fit-content;
  height: fit-content;

  & svg {
    width: 1.5em;
    height: 1.5em;
  }
}
.title {
  font-size: 2em;
  font-style: bold;
  margin: 0;
}

.key {
  font-size: 1.2em;
  margin: 0;
}

.info-column-container {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.info-row-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2em;

  &.center {
    justify-content: center;
  }

  &.info {
    justify-content: space-around;
    padding: 0.5em;
  }
}
</style>
