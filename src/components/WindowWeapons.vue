<template>
  <div class="content">
    <div class="sidebar">
      <v-tabs v-model="weaponTabs" direction="vertical" height="60px">
        <div v-for="(weapon, index) in selectedWeapons" :key="`${weapon!.name} ${index}`">
          <v-tab>
            <template #default>
              <v-img
                style="border-radius: 50%"
                cover
                :src="weapon.imagePath"
                width="40px"
                height="40px"
              ></v-img>
            </template>
          </v-tab>
        </div>
        <v-tab>
          <v-btn @click="addWeapon()">New</v-btn>
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
          ></v-select>

          <v-img :src="selectedWeapon.imagePath" max-width="200" alt="Weapon Image"></v-img>
          <v-checkbox
            v-model="selectedWeapon.useDualWielding"
            label="Use Dual Wielding?"
          ></v-checkbox>
          <v-btn @click="selectedWeapons?.splice(index, 1)">Delete</v-btn>
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
