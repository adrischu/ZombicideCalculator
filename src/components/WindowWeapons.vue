<template>
  <div class="content">
    <div class="sidebar">
      <v-tabs align-tabs="end" v-model="weaponTabs" direction="vertical" height="60px">
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

    <div class="weapon-space">
      <v-tabs-window v-model="weaponTabs">
        <v-tabs-window-item
          transition="false"
          reverse-transition="false"
          v-for="(selectedWeapon, index) in dataState.selectedWeapons"
          :key="`${selectedWeapon.name} ${index}`"
        >
          <v-select
            width="100%"
            max-width="300px"
            v-model="dataState.selectedWeapons[index]"
            :items="weaponPool"
            item-title="name"
            return-object
            hide-details
          ></v-select>

          <v-img
            style="border-radius: 5px"
            :src="selectedWeapon.imagePath"
            width="100%"
            max-width="300px"
            alt="Weapon Image"
          ></v-img>
          <v-checkbox
            v-model="selectedWeapon.useDualWielding"
            label="Use Dual Wielding?"
          ></v-checkbox>
          <v-btn @click="dataState.selectedWeapons.splice(index, 1)">Delete Weapon</v-btn>
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
  return allWeapons.filter((weapon) => weapon.isIncludedInSeasons(dataState.selectedSeasons))
})

// function cullSelectedWeapons() {
//   selectedWeapons.value = selectedWeapons.value!.filter((weapon) =>
//     weapon.isIncludedInSeasons(selectedSeasons.value),
//   )
// }
</script>

<style>
.content {
  flex: 1;
  flex-direction: row;
}
.sidebar {
  height: 100vh;
  align-items: start;
}
.weapon-space {
  width: 80vw;
  height: 100vh;
  align-self: flex-start;
  align-items: left;
}
</style>
