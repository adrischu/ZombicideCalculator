<template>
  <div class="content">
    <div class="sidebar">
      <v-tabs v-model="weaponTabs" direction="vertical">
        <v-tab v-for="(weapon, index) in selectedWeapons" :key="`${weapon!.name} ${index}`">
          {{ weapon!.name }}
        </v-tab>
        <v-tab>
          <v-btn @click="addWeapon()">+</v-btn>
        </v-tab>
      </v-tabs>
    </div>
    <div class="weapon-space">
      <v-tabs-window v-model="weaponTabs">
        <v-tabs-window-item
          v-for="(selectedWeapon, index) in selectedWeapons"
          :key="`${selectedWeapon.name} ${index}`"
        >
          <v-select
            v-model="selectedWeapons![index]"
            :items="weaponPool"
            item-title="name"
            return-object
            hide-details
          >
          </v-select>
          <v-checkbox
            v-model="selectedWeapon.useDualWielding"
            label="Use Dual Wielding?"
          ></v-checkbox>
          <v-img :src="selectedWeapon.imagePath" max-width="200" alt="Weapon Image"></v-img>
          <v-btn @click="selectedWeapons?.splice(index, 1)">-</v-btn>
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
const selectedWeapons = useDataStateStore().selectedWeapons
const selectedSeasons = useDataStateStore().selectedSeasons
function addWeapon() {
  selectedWeapons.push(allWeapons[0])
}

const weaponPool = computed(() => {
  return allWeapons.filter((weapon) => weapon.isIncludedInSeasons(selectedSeasons))
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
  width: 10%;
  height: 100%;
  align-items: start;
}
.weapon-space {
  width: 90%;
  height: 100%;
  align-items: center;
}
</style>
