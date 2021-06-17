<template>
  <div class="cadre-menu-mediacentre">
    <h3 class="titre-menu-mediacentre">
      {{ t('ressources').toUpperCase() }}
    </h3>
    <ul class="liste-boutons-menu-mediacentre">
      <li>
        <label
            class="bouton-menu-mediacentre"
        >
          <input
              type="radio"
              name="ressources"
              value="tout"
              checked
              class="radio-bouton-menu-mediacentre"
              v-model="selection"
              @change="changementFiltre"
          >
          <span>
            {{ t('toutes-ressources') }}
          </span>
        </label>
      </li>
      <li>
        <label
            class="bouton-menu-mediacentre"
        >
          <input
              type="radio"
              name="ressources"
              value="favoris"
              class="radio-bouton-menu-mediacentre"
              v-model="selection"
              @change="changementFiltre"
          >
          <span>
            {{ t('mes-favoris') }}
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import i18n from "../i18n";

export default {
  name: "menu-mediacentre",
  data: function() {
    return {
      selection: 'tout'
    };
  },
  mounted() {
    this.changementFiltre();
  },
  methods: {
    t: function (key) {
      return i18n.t('message.' + this.$options.name + '.' + key); // 'message.page-ressource.{key}
    },
    changementFiltre: function () {
      this.$parent.changementFiltre(this.selection);
    },
  }
}
</script>

<style scoped>
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
  background-color: rgba(0, 0, 0, 0.10);
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
