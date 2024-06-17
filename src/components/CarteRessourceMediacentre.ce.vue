<script setup lang="ts">
import type { Ressource } from '@/types/RessourceType.ts';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, watch } from 'vue';

const isShown = ref<boolean>(true);
const props = defineProps<{
  ressource: Ressource;
  baseApiUrl: string;
  filtre: string;
}>();

const emit = defineEmits(['updateFav', 'openModal', 'updateVisibility']);

watch(
  () => isShown.value,
  (newValue) => {
    if (props.filtre == 'favoris' && !newValue) emit('updateVisibility', props.ressource.idRessource);
  },
);

const toggleFavoris = (): void => {
  if (props.ressource.isFavorite) isShown.value = false;
  emit('updateFav', props.ressource.idRessource, props.ressource.isFavorite == false || undefined ? true : false);
};
</script>

<template>
  <a :href="ressource.urlAccesRessource" target="_blank" class="cadre-carte-ressource-mediacentre">
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
      <h5>
        {{ ressource.nomRessource }}
      </h5>
      <div>
        <button
          class="icone-bouton-carte-ressource-mediacentre"
          @click.prevent="$emit('openModal', ressource.nomRessource, ressource.nomEditeur, ressource.description)"
          style="background: none; border: none"
        >
          <font-awesome-icon class="info-icon" :icon="['fas', 'circle-info']" />
        </button>
      </div>
    </div>
  </a>
</template>

<style lang="scss">
a {
  text-decoration: none;
}

.cadre-carte-ressource-mediacentre {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 15px;
  border-top: 0.9em solid $ui-mediacentre-primary-color;
  background-color: #ffffff;
  box-shadow:
    0px 0px 28px -8px rgba(0, 0, 0, 0.1),
    100px 100px 100px -100px rgba(0, 0, 0, 0.1);
}

.background-carte-ressource-mediacentre {
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  text-align: center;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  padding: 1em;
  height: inherit;
}

.action-zone-carte-ressource-mediacentre {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: calc(100% - 1.5em);
}

.icone-bouton-carte-ressource-mediacentre {
  display: flex;
  justify-content: center;
  background: none;
  border: none;
  height: fit-content;
  width: fit-content;

  color: #b4b4b4;
  padding: 0;
  cursor: pointer;
}

.icone-help-carte-ressource-mediacentre {
  display: flex;
  justify-content: center;
  background: none;
  border: none;
  height: 48px;
  width: 48px;
  padding: 0;
  cursor: pointer;
  transform: opacity 150ms;
}
.icone-favorite-carte-ressource-mediacentre {
  width: 1.8em;
  height: 1.8em;
}

.icone-info-carte-ressource-mediacentre {
  width: 60%;
  height: 60%;
}

.resource-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.info-icon {
  width: 1.5em;
  height: 1.5em;
  color: #b4b4b4;
}
.resource-name {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0;
  padding: 0 0.5em;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  max-width: 538px;

  h5 {
    color: black;
    font-size: 0.9em;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
