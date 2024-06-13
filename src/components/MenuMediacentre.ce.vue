<script setup lang="ts">
import type { Filtres } from '@/types/FiltresType';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { capitalize, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  checked: string;
  filtres: Array<Filtres>;
}>();

const { t } = useI18n();
const filtre = ref(props.checked || '');
const activeCategory = ref('tout');

const emit = defineEmits(['update-checked']);

const changementFiltre = (idFiltre: string, idCategorie: string) => {
  filtre.value = idFiltre;
  if (idFiltre == 'tout' || idFiltre == 'favoris') {
    showSubCategories(idCategorie);
  }
  emit('update-checked', idFiltre, idCategorie);
};

const showSubCategories = (idCategory: string): void => {
  if (idCategory !== 'tout' && idCategory !== 'favoris' && activeCategory.value == idCategory) {
    activeCategory.value = '';
  } else {
    activeCategory.value = idCategory;
  }
};
</script>

<template>
  <div class="cadre-menu-mediacentre">
    <button class="titre-menu-mediacentre menu-toggle" id="menu-titre">
      <h1>{{ t('menu-mediacentre.title').toUpperCase() }}</h1>
    </button>
    <div class="categories-container">
      <button
        active
        :class="[activeCategory == 'tout' ? 'active' : '']"
        class="sub-categories-container without-sub-cat"
        id="tout"
        value="tout"
        @click="changementFiltre('tout', 'tout')"
      >
        <h3>{{ capitalize(t('menu-mediacentre.all-resources')) }}</h3>
      </button>

      <button
        :class="[activeCategory == 'favoris' ? 'active' : '']"
        class="sub-categories-container without-sub-cat"
        id="favoris"
        value="favoris"
        @click="changementFiltre('favoris', 'favoris')"
      >
        <h3>{{ capitalize(t('menu-mediacentre.my-favorites')) }}</h3>
      </button>

      <div v-for="(category, index) in filtres" :key="index" :id="category.filterEnum" class="test">
        <button
          class="sub-categories-container"
          :class="[activeCategory == category.name ? 'active' : '']"
          :id="category.name"
          @click="showSubCategories(category.name)"
        >
          <h3>{{ capitalize(category.name) }}</h3>
          <font-awesome-icon class="caret-menu-icon" :icon="['fas', 'caret-right']" />
        </button>
        <div class="container" :class="[activeCategory == category.name ? 'active' : '']">
          <div v-for="(subCat, idx) of category.filters" :key="idx">
            <button
              :class="{ active: filtre == subCat.id }"
              class="sub-category-container"
              @click.prevent="changementFiltre(subCat.id, category.filterEnum)"
            >
              <span>
                {{ capitalize(subCat.nom) }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cadre-menu-mediacentre {
  max-height: 100%;
  text-align: center;
  background-color: #ffffff;
  width: min-content;
  border-radius: 1em;
  box-shadow: 0px 10px 15px -7px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  display: flex;
  flex-direction: column;

  & :only-child {
    box-sizing: border-box;
  }
}

.titre-menu-mediacentre {
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  font-weight: bold;
  padding: 1em 1em 0 1em;
  margin: 0;
  border: none;
  background-color: #ffffff;
  flex-shrink: 0;
}

.sub-categories-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
  padding: 0 1em;
  border-radius: 0.7em;
  border: none;
  border-top: 0.7em solid transparent;
  color: black;
  flex-shrink: 0;
  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
  &.active {
    border-color: $ui-mediacentre-primary-color;
    border-radius: 0.5em 0.5em 0 0;
    background-color: #ffffff;

    .caret-menu-icon {
      transform: rotate(90deg);
      transition: transform 0.3s ease;
    }
  }
}

.without-sub-cat {
  padding-left: 1em;
  justify-content: start;
}

.caret-menu-icon {
  height: 20px;
  width: 20px;
  transition: transform 0.3s ease;
}

.sub-category-container {
  background-color: #ffffff;
  width: 100%;
  border-collapse: collapse;
  border: none;
  padding: 1em 1em;
  color: black;
  border-radius: 0.7em;
  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
  &.active {
    background-color: #f8f8f8;
    border: 0.1em solid rgba(#f8f8f8, 0.5);
    color: black;
  }
}

.container {
  padding: 0;
  max-height: 0;
  visibility: hidden;
  overflow-y: auto;
  transition:
    max-height 0s ease,
    visibility 0.1s ease;

  flex-grow: 1;

  &.active {
    max-height: 60%;
    visibility: visible;
    transition:
      max-height 0.3s ease,
      visibility 0.3s ease;
  }
}

.categories-container {
  border-collapse: collapse;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

@media (max-width: 770px) {
  .cadre-menu-mediacentre {
    text-align: center;
    margin: 0 3em 0 3em;

    & h3 {
      padding-top: 0;
    }
  }

  .categories-container {
    display: none;
  }

  .menu-toggle {
    display: block;
    cursor: pointer;
  }
}
</style>
