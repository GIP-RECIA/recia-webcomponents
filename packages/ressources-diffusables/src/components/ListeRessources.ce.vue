<script setup lang="ts">
import type { Ressource } from '@/types/ressourceType.ts';
import { useI18n } from 'vue-i18n';

defineProps<{
  ressources: Array<Ressource>;
  erreur: string;
  lectureTerminee: boolean;
  chargement: boolean | null;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="cadre-liste-ressources">
    <main>
      <carte-ressource v-for="ressource in ressources" :key="ressource.ressource.id" :ressource="ressource" />
    </main>
    <footer>
      <p v-if="chargement" class="chargement-liste-ressources">
        {{ t('liste-ressources.chargement') }}
      </p>
      <p v-else-if="erreur !== ''">
        {{ t('liste-ressources.erreur') }}<br />
        {{ t('liste-ressources.detail-erreur') }}: <code>{{ erreur }}</code>
      </p>
      <p v-else-if="ressources.length === 0">
        {{ t('liste-ressources.aucune-ressource') }}
      </p>
      <button v-else-if="!lectureTerminee" class="page-suivante-liste-ressources" @click="$emit('getPageSuivante')">
        {{ t('liste-ressources.charger-plus') }}
      </button>
    </footer>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.cadre-liste-ressources {
  padding: $margin;
}

.cadre-liste-ressources > main {
  margin-bottom: -$margin;
}

.cadre-liste-ressources > footer {
  text-align: center;
}

.page-suivante-liste-ressources {
  width: 100%;
  padding: $button-padding;
  font-size: x-large;
  font-weight: bold;
  background-color: $button-background-color;
  color: $button-text-color;
  border: none;
  border-radius: $button-border-radius;
  cursor: pointer;
}

.chargement-liste-ressources {
  font-size: x-large;
  font-weight: bold;
}

@media (max-width: 1024px) {
  .cadre-liste-ressources {
    padding-top: 0;
  }
}

@media (min-width: 1024px) {
  .cadre-liste-ressources {
    height: calc(100% - 2 * $margin);
    overflow-y: scroll;
    padding-left: 0;
  }
}
</style>
