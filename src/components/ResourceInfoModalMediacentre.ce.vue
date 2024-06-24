<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['close']);

const { t } = useI18n();

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
        <span>{{ title.toUpperCase() }}</span>
        <div class="close-button-container">
          <button class="close-button" @click="closeModal()">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>
      </div>
      <div class="modal-body">
        <span>{{ t('resource-info-modal-mediacentre.editor') }} {{ editor }} </span>
        <div v-if="description" class="description">
          {{ description }}
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
  animation: fadein 250ms;
  background-color: #a0a0a06b;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  position: relative;
  max-width: 600px;
  width: 100%;
  height: auto;
  padding: spacing(4);
  margin: 0;
  overflow: hidden;
  background-color: $background-color;
  border-radius: 0.7em;
}

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.5em 1.5em 0.9em 1.5em;
  color: #212121;
  background-color: #7573750d;
  font-weight: bold;
  font-size: 1.1em;
}

.modal-body {
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 2em;

  & span {
    font-size: 1em;
  }
}

.close-button-container {
  justify-content: center;
  width: fit-content;
  height: fit-content;
  margin-left: 0.5em;
}

.close-button {
  all: unset;
  width: fit-content;
  height: fit-content;

  & svg {
    width: 1.5em;
    height: 1.5em;
    color: #757375;
    -webkit-transition: color 0.5s;
    transition: color 0.5s;

    &:hover {
      cursor: pointer;
      color: #212121;
    }
  }
}
.title {
  font-size: 2em;
  font-style: bold;
  margin: 0;
}

.description {
  text-align: justify;
}

@media (max-width: 770px) {
  .close-button {
    svg {
      cursor: pointer;
    }
  }

  .modal {
    padding: 1em;
  }
}
</style>
