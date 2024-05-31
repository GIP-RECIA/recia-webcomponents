<script setup lang="ts">
import type { Filtres } from '@/types/FiltresType';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { capitalize, defineEmits, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  checked: string;
  filtres: Array<Filtres>;
}>();

const { t } = useI18n();
const filtre = ref(props.checked || '');
const emit = defineEmits(['update-checked']);
const activeCategory = ref('tout');

onMounted(() => {});

const changementFiltre = (idFiltre: string, idCategorie: string) => {
  console.log('valeur du filtre sélectionné dans le menu : ', idFiltre);
  console.log('clé du filtre sélectionné dans le menu : ', idCategorie);
  filtre.value = idFiltre;
  console.log(filtre.value);
  if (idFiltre == 'tout' || idFiltre == 'favoris') {
    showSubCategories(idCategorie);
  }

  emit('update-checked', idFiltre, idCategorie);
};

const showSubCategories = (idCategory: string): void => {
  activeCategory.value = idCategory;
};
</script>

<template>
  <div class="cadre-menu-mediacentre">
    <h2 class="titre-menu-mediacentre menu-toggle" id="menu-titre">
      {{ t('menu-mediacentre.title').toUpperCase() }}
    </h2>
    <div class="categories-container">
      <button
        active
        :class="[activeCategory == 'tout' ? 'active' : '']"
        class="sub-categories-container without-sub-cat"
        id="tout"
        value="tout"
        @click="changementFiltre('tout', 'tout')"
      >
        <span>
          <h3>{{ capitalize(t('menu-mediacentre.all-resources')) }}</h3>
        </span>
      </button>

      <button
        :class="[activeCategory == 'favoris' ? 'active' : '']"
        class="sub-categories-container without-sub-cat"
        id="favoris"
        value="favoris"
        @click="changementFiltre('favoris', 'favoris')"
      >
        <span>
          <h3>{{ capitalize(t('menu-mediacentre.my-favorites')) }}</h3>
        </span>
      </button>

      <div v-for="(category, index) in filtres" :key="index" :id="category.filterEnum" style="height: 100%">
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
  max-height: 70%;
  text-align: left;
  margin-left: 5vh;
  background-color: #f3f3f3;
  width: min-content;
  border-radius: 1em;

  overflow-y: hidden;
  box-shadow:
    13px 13px 39px #c1c1c1,
    13px 13px 39px #ffffff;

  & :only-child {
    box-sizing: border-box;
  }
}

.titre-menu-mediacentre {
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  font-weight: bold;
  padding: 1em;
  margin: 0;
}

.sub-categories-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f3f3;
  width: 100%;
  padding: 0 1em;
  border-radius: 0.7em;
  border: none;
  color: black;
  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
  &.active {
    border-top: 0.7em solid $ui-mediacentre-primary-color;
    border-radius: 0.5em 0.5em 0 0;
    background-color: #f3f3f3;
    cursor: none;

    .caret-menu-icon {
      transform: rotate(90deg);
      transition: transform 0.3s ease;
    }
  }
}

.caret-menu-icon {
  height: 20px;
  width: 20px;
  transition: transform 0.3s ease;
}

.sub-category-container {
  background-color: #f3f3f3;
  width: 100%;
  border-collapse: collapse;
  border: none;
  padding: 1em 1em;
  color: black;
  border-radius: 0.7em;
  &:hover {
    background-color: #e2e2e2;
    cursor: pointer;
  }
  &.active {
    background-color: #ebebeb;
    border: 0.1em solid #e5e5e5d8;
    color: black;
  }
}

.container {
  padding: 0;
  max-height: 0;
  visibility: hidden;
  overflow-y: scroll;
  transition:
    max-height 0.3s ease,
    visibility 0.3s ease;

  &.active {
    max-height: 60vh;
    visibility: visible;
    transition:
      max-height 0.5s ease,
      visibility 0.3s ease;
  }
}

.categories-container {
  border-collapse: collapse;
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
