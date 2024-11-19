<template>
  <!-- --- -->
  <!-- Header-Menü -->
  <!-- --- -->

  <v-tabs v-model="generalTabs">
    <v-tab value="window-settings">Bonus</v-tab>
    <v-tab value="window-weapons">Weapons</v-tab>
    <v-tab value="window-results">Results</v-tab>
  </v-tabs>

  <v-tabs-window v-model="generalTabs">
    <!-- --- -->
    <!-- Fenster für Einstellungen -->
    <!-- --- -->
    <v-tabs-window-item value="window-settings">
      <WindowSettings />
    </v-tabs-window-item>
    <!-- ---
        Fenster für Waffenauswahl
        --- -->

    <v-tabs-window-item value="window-weapons">
      <WindowWeapons />
    </v-tabs-window-item>
    <!-- ---
        Fenster für Ergebnisse
        --- -->
    <v-tabs-window-item value="window-results">
      <WindowResults />
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<script setup lang="ts">
import WindowSettings from './components/WindowSettings.vue'
import WindowResults from './components/WindowResults.vue'
import WindowWeapons from './components/WindowWeapons.vue'

import { ref } from 'vue'

const generalTabs = ref('window-settings')
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
