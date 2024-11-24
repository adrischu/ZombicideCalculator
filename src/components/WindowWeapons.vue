<template>
  <div id="weaponwindow" style="width: 100%; height: 100%; display: flex; flex-direction: row">
    <div class="sidebar" style="overflow: auto">
      <v-tabs mobile align-tabs="end" v-model="weaponTabs" direction="vertical" height="60px">
        <div v-for="(weapon, index) in dataState.selectedWeapons" :key="`${weapon!.name} ${index}`">
          <v-tab>
            <template #default>
              <div style="align-self: center">
                <v-img
                  style="border-radius: 50%"
                  cover
                  :src="weapon.imagePath"
                  width="50px"
                  height="50px"
                ></v-img>
              </div>
            </template>
          </v-tab>
        </div>
        <!-- <v-tab> -->
        <v-btn @click="addWeapon()">New</v-btn>
        <!-- </v-tab> -->
      </v-tabs>
    </div>
    <v-divider style="margin: 1px" vertical thickness="1"></v-divider>
    <v-divider style="margin: 1px; margin-right: 4px" vertical thickness="1"></v-divider>

    <div class="weapon-space" style="overflow: auto; flex: none">
      <v-tabs-window v-model="weaponTabs">
        <v-tabs-window-item
          transition="false"
          reverse-transition="false"
          v-for="(selectedWeapon, index) in dataState.selectedWeapons"
          :key="`${selectedWeapon.name} ${index}`"
        >
          <v-select
            width="100vw"
            max-width="300px"
            v-model="dataState.selectedWeapons[index]"
            :items="weaponPool"
            item-title="name"
            return-object
            hide-details
          ></v-select>

          <v-img
            style="border-radius: 15px"
            :src="selectedWeapon.imagePath"
            width="100vw"
            max-width="300px"
            alt="Weapon Image"
          ></v-img>
          <v-checkbox
            hide-details
            width="100vw"
            max-width="300px"
            v-model="selectedWeapon.useDualWielding"
            label="Use dual wielding?"
          ></v-checkbox>
          <v-checkbox
            hide-details
            width="100vw"
            max-width="300px"
            v-model="selectedWeapon.supressReload"
            label="Ignore reloading?"
          ></v-checkbox>
          <v-btn width="100vw" max-width="300px" @click="dataState.selectedWeapons.splice(index, 1)"
            >Delete Weapon</v-btn
          >
          <div v-if="selectedWeapon.disclaimer !== ''">{{ selectedWeapon.disclaimer }}</div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStateStore } from '@/stores/dataState'
import { allWeapons } from '@/stores/weaponStore'
import { ref, computed } from 'vue'

const weaponTabs = ref(0)
const dataState = useDataStateStore()
function addWeapon() {
  dataState.selectedWeapons.push(allWeapons[0])
  weaponTabs.value = dataState.selectedWeapons.length - 1
}

const weaponPool = computed(() => {
  return allWeapons
    .filter((weapon) => weapon.isIncludedInSeasons(dataState.selectedSeasons))
    .sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<style scopec>
.sidebar {
  /* height: 85vh; */
  width: 80px;
  align-items: start;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.sidebar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
