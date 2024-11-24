<template>
  <!-- --- -->
  <!-- Header-Menü -->
  <!-- --- -->
  <div class="layout">
    <div class="elevation-10 header" style="margin-bottom: 5px">
      <v-tabs v-model="generalTabs">
        <v-tab value="window-settings">Settings</v-tab>
        <v-tab value="window-weapons">Weapons</v-tab>
        <v-tab value="window-results">Results</v-tab>
      </v-tabs>
    </div>
    <!-- <v-divider style="margin: 1px" thickness="1"></v-divider>
    <v-divider style="margin: 1px" thickness="1"></v-divider> -->
    <div class="content">
      <v-tabs-window style="width: 100%; height: 100%" v-model="generalTabs">
        <!-- --- -->
        <!-- Fenster für Einstellungen -->
        <!-- --- -->
        <v-tabs-window-item style="width: 100%; height: 100%" value="window-settings">
          <WindowSettings />
        </v-tabs-window-item>
        <!-- ---
        Fenster für Waffenauswahl
        --- -->

        <v-tabs-window-item style="width: 100%; height: 100%" value="window-weapons">
          <WindowWeapons />
        </v-tabs-window-item>
        <!-- ---
        Fenster für Ergebnisse
        --- -->
        <v-tabs-window-item style="width: 100%; height: 100%" value="window-results">
          <WindowResults />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
    <div class="footer">&copy; Adrian Schubert - {{ new Date().getFullYear() }} - v1.0.0</div>
  </div>
</template>

<script setup lang="ts">
import WindowSettings from './components/WindowSettings.vue'
import WindowResults from './components/WindowResults.vue'
import WindowWeapons from './components/WindowWeapons.vue'

import { ref } from 'vue'

const generalTabs = ref('window-settings')
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}

.header {
  /* height: 7vh; */
  flex: none;
}

.content {
  /* height: 89.5vh; */
  flex: 1;
  flex-direction: column;
  min-height: 0;
  padding: 0;
  margin: 0;
}

.footer {
  /* height: 3.5vh; */
  background-color: rgb(130, 130, 130);
  padding: 0;
  margin: 0;
  text-align: center;
  flex: none; /* Footer wird nicht vergrößert */
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
