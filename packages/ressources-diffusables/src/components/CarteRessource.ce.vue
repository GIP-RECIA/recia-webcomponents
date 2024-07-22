<script setup lang="ts">
import type { DistributeursCom } from '@/types/disctibuteurComType.ts';
import type { Ressource } from '@/types/ressourceType.ts';
import debounce from 'lodash.debounce';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  ressource: Ressource;
}>();

const plusInfos = ref<boolean>(false);
const distributeursComComputed = ref<Array<DistributeursCom>>([]);

onMounted(() => {
  distributeursComComputed.value = props.ressource.distributeursCom.filter(
    (distributeurCom: DistributeursCom) => distributeurCom.nom !== '',
  );
});

const { t } = useI18n();

const afficherPlusInfos = (): void => {
  plusInfos.value = !plusInfos.value;
};

const isSuccess = ref<boolean>(false);

const resetSuccess = debounce(() => {
  isSuccess.value = false;
}, 1500);

const copierReferences = (): void => {
  let string = `${t('carte-ressource.nom-ressource')}: ${props.ressource.ressource.nom}
${t('carte-ressource.id-gar')}: ${props.ressource.ressource.id}
${t('carte-ressource.editeur')}: ${props.ressource.editeur.nom}`;

  props.ressource.distributeursCom.forEach((element) => {
    string += `\n${t('carte-ressource.distributeurCom')}: ${element.nom}`;
  });

  navigator.clipboard.writeText(string);
  isSuccess.value = true;
  resetSuccess();
};
</script>

<template>
  <div class="cadre-carte-ressource">
    <h3 class="nom-ressource-carte-ressource">
      {{ ressource.ressource.nom }}
    </h3>
    <ul class="liste-attributs-ressource-carte-ressource">
      <li class="attribut-ressource-carte-ressource">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.id-gar') }} : </span>
        <span class="id-principal-ressource-carte-ressource">
          {{ ressource.ressource.id }}
        </span>
      </li>
      <li class="attribut-ressource-carte-ressource" v-if="ressource.editeur.nom !== '' || plusInfos">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.editeur') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ ressource.editeur.nom }}
        </span>
        <span class="id-attribut-ressource-carte-ressource" v-if="plusInfos">&nbsp;{{ ressource.editeur.id }} </span>
      </li>
      <li
        class="attribut-ressource-carte-ressource"
        v-for="distributeurCom in distributeursComComputed"
        :key="distributeurCom.id"
      >
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.distributeurCom') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ distributeurCom.nom }}
        </span>
        <span class="id-attribut-ressource-carte-ressource" v-if="plusInfos">&nbsp;{{ distributeurCom.id }} </span>
      </li>
      <li class="attribut-ressource-carte-ressource" v-if="plusInfos">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.distributeurTech') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ ressource.distributeurTech.nom }}
        </span>
        <span class="id-attribut-ressource-carte-ressource" v-if="plusInfos"
          >&nbsp;{{ ressource.distributeurTech.id }}
        </span>
      </li>
      <li class="attribut-ressource-carte-ressource" v-if="plusInfos">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.affichable') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ ressource.affichable ? t('carte-ressource.oui') : t('carte-ressource.non') }}
        </span>
      </li>
      <li class="attribut-ressource-carte-ressource" v-if="plusInfos">
        <span class="intitule-attribut-ressource-carte-ressource"> {{ t('carte-ressource.diffusable') }} : </span>
        <span class="nom-attribut-ressource-carte-ressource">
          {{ ressource.diffusable ? t('carte-ressource.oui') : t('carte-ressource.non') }}
        </span>
      </li>
    </ul>
    <div class="boutons-carte-ressource">
      <button @click="afficherPlusInfos">
        {{ plusInfos ? t('carte-ressource.moins-informations') : t('carte-ressource.plus-informations') }}
      </button>
      <button :class="[isSuccess ? 'success' : '']" @click="copierReferences">
        {{ t(isSuccess ? 'carte-ressource.contenu-copie' : 'carte-ressource.copier-references') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.cadre-carte-ressource {
  text-align: left;
  background-color: #fff;
  padding: $padding;
  margin-bottom: $margin;
  border-radius: $card-border-radius;
}

.nom-ressource-carte-ressource {
  margin-top: 0;
  margin-bottom: $margin;
  color: $ressources-title-color;
}

.liste-attributs-ressource-carte-ressource {
  list-style-type: none;
  padding: 0;
  margin: 0 0 $margin 0;
}

.intitule-attribut-ressource-carte-ressource {
  font-weight: bold;
}

.id-principal-ressource-carte-ressource {
  word-wrap: break-word;
}

.id-attribut-ressource-carte-ressource {
  opacity: 0.5;
  font-size: smaller;
  word-wrap: break-word;
}

.boutons-carte-ressource {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.boutons-carte-ressource > button {
  min-width: min(200px, 45%);
  padding: $button-padding;
  font-size: small;
  font-weight: bold;
  background-color: $button-background-color;
  color: $button-text-color;
  border: none;
  border-radius: $button-border-radius;
  cursor: pointer;
}

.boutons-carte-ressource > button:not(:first-child) {
  margin-left: calc($margin/2);
}
.boutons-carte-ressource > button:not(:last-child) {
  margin-right: calc($margin/2);
}

.boutons-carte-ressource > button:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}

.boutons-carte-ressource > button.success {
  background-color: $button-background-color-success;
  color: $button-text-color-success;
}

@media (min-width: 768px) {
  .boutons-carte-ressource {
    justify-content: flex-end;
  }
}
</style>
