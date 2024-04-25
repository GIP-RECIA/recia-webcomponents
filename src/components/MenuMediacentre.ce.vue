<script setup lang="ts">
import type { Filtre } from '@/types/FiltreType.ts';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  filtres: Array<Filtre>;
}>();

const { t } = useI18n();
const filtre = ref<string>('tout');

const emit = defineEmits<{
  (event: 'updateFiltre', filtre: string): void;
}>();

onMounted((): void => {
  // changementFiltre();
});

// const changementFiltre = (): void => {
//   emit('updateFiltre', filtre);
// };
</script>

<template>
  <div class="cadre-menu-mediacentre">
    <h3 class="titre-menu-mediacentre">
      {{ t('resources').toUpperCase() }}
    </h3>
    <ul class="liste-boutons-menu-mediacentre">
      <li>
        <label class="bouton-menu-mediacentre">
          <input
            type="radio"
            name="ressources"
            value="tout"
            checked
            class="radio-bouton-menu-mediacentre"
            v-model="filtre"
            @change="changementFiltre"
          />
          <span>
            {{ t('menu-mediacentre.all-resources') }}
          </span>
        </label>
      </li>
      <li>
        <label class="bouton-menu-mediacentre">
          <input
            type="radio"
            name="ressources"
            value="favoris"
            class="radio-bouton-menu-mediacentre"
            v-model="filtre"
            @change="changementFiltre"
          />
          <span>
            {{ t('menu-mediacentre.my-favorites') }}
          </span>
        </label>
      </li>

      <!-- affichage dynamique des filtres  -->
      <li v-for="f in filtres" :key="f.id">
        <label class="bouton-menu-mediacentre">
          <input
            type="radio"
            :name="f.nom"
            :value="f.id"
            class="radio-bouton-menu-mediacentre"
            v-model="filtre"
            @change="changementFiltre"
          />
          <span>
            {{ f.nom }}
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style>
.cadre-menu-mediacentre {
  text-align: left;
}

.liste-boutons-menu-mediacentre {
  list-style: none;
  padding-left: 0;
}

.titre-menu-mediacentre {
  padding-left: 15px;
}

.bouton-menu-mediacentre {
  padding: 20px 0 20px 15px;
  display: block;
}

.bouton-menu-mediacentre:hover {
  -webkit-transition: all 0.15s ease-in-out;
  -o-transition: all 0.15s ease-in-out;
  transition: all 0.15s ease-in-out;
  background-color: rgba(0, 0, 0, 0.1);
}

.radio-bouton-menu-mediacentre {
  width: 18px;
  height: 18px;
}

@media (max-width: 770px) {
  .cadre-menu-mediacentre {
    text-align: center;
  }
}
</style>
