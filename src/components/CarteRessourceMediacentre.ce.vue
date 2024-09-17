<script setup lang="ts">
import type { Ressource } from '@/types/RessourceType';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref, watch } from 'vue';

const buttonModal = ref<HTMLButtonElement | null>(null);
const isShown = ref<boolean>(true);
const props = defineProps<{
  ressource: Ressource;
  baseApiUrl: string;
  filtre: string;
}>();

onMounted(() => {
  parent.addEventListener('closeModaleCard', (event: Event) => {
    buttonModal.value!.focus();
    event.preventDefault();
  });
});
const emit = defineEmits(['updateFav', 'openModal', 'updateVisibility']);

watch(
  () => isShown.value,
  (newValue) => {
    if (props.filtre == 'favoris' && !newValue) emit('updateVisibility', props.ressource.idRessource);
  },
);

const openModal = (event: Event): void => {
  const openModalCustomEvent = new CustomEvent('openModale', {
    detail: {
      title: props.ressource.nomRessource,
      originalEvent: event.composedPath()[0] as HTMLElement,
    },
    bubbles: true, // Permet à l'événement de remonter dans le DOM
    composed: true, // Permet à l'événement de sortir du shadow DOM
  });
  document.dispatchEvent(openModalCustomEvent);
  emit(
    'openModal',
    props.ressource.nomRessource,
    props.ressource.nomEditeur,
    props.ressource.description,
    props.ressource.idRessource,
  );
};

const toggleFavoris = (): void => {
  if (props.ressource.isFavorite) isShown.value = false;
  emit('updateFav', props.ressource.idRessource, props.ressource.isFavorite == false || undefined ? true : false);
};
</script>

<template>
  <a
    :href="ressource.urlAccesRessource"
    target="_blank"
    class="cadre-carte-ressource-mediacentre"
    :title="props.ressource.nomRessource"
  >
    <div class="background-carte-ressource-mediacentre">
      <div class="action-zone-carte-ressource-mediacentre">
        <button class="icone-bouton-carte-ressource-mediacentre" @click.prevent="toggleFavoris">
          <font-awesome-icon
            class="icone-favorite-carte-ressource-mediacentre"
            :icon="[ressource.isFavorite ? 'fas' : 'far', 'star']"
            :class="ressource.isFavorite ? 'fav' : 'noFav'"
          />
        </button>
      </div>
      <img class="resource-image" :src="props.ressource.urlVignette" :alt="ressource.nomRessource" />
    </div>
    <div class="resource-name">
      <span>
        {{ ressource.nomRessource }}
      </span>
      <div>
        <button
          class="icone-bouton-carte-ressource-mediacentre"
          @click.prevent="openModal"
          aria-haspopup="dialog"
          aria-controls="modal"
          ref="buttonModal"
        >
          <font-awesome-icon class="icone-info-carte-ressource-mediacentre" :icon="['fas', 'circle-info']" />
        </button>
      </div>
    </div>
  </a>
</template>

<style lang="scss">
.cadre-carte-ressource-mediacentre {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: 250px;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  border-radius: 1em;
  border-top: 1em solid $border-color;
  background-color: $card-background-color;
  box-shadow:
    0px 0px 28px -8px rgba(0, 0, 0, 0.1),
    100px 100px 100px -100px rgba(0, 0, 0, 0.1);

  .background-carte-ressource-mediacentre {
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    text-align: center;
    background-color: $card-background-color;
    overflow: hidden;
    padding: 1em;
    height: inherit;

    .action-zone-carte-ressource-mediacentre {
      position: absolute;
      z-index: 1;
      display: flex;
      flex-direction: row;
      justify-content: end;
      width: calc(100% - 1.5em);
    }
    .resource-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .resource-name {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 0;
    padding: 0.5em 0.5em 1em 0.5em;
    align-items: center;
    font-weight: 500;
    position: relative;
    max-width: 538px;

    span {
      color: $font-color;
      font-size: 1em;
      word-wrap: unset;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icone-info-carte-ressource-mediacentre {
      width: 1.5em;
      height: 1.5em;
      color: $menu-title-background-color;
    }
  }
}

.icone-bouton-carte-ressource-mediacentre {
  display: flex;
  justify-content: center;
  background: none;
  border: none;
  height: fit-content;
  width: fit-content;
  padding: 0;
  color: $menu-title-background-color;
  cursor: pointer;

  .icone-favorite-carte-ressource-mediacentre {
    width: 1.8em;
    height: 1.8em;

    &.fav {
      color: #ffaa46;
    }
  }
}
</style>
