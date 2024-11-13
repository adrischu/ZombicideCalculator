<template>
  <v-card>
    <v-tabs v-model="tab">
      <v-tab value="window-bonus">Bonus</v-tab>
      <v-tab value="window-weapons">Weapons</v-tab>
      <v-tab value="window-results">Results</v-tab>
    </v-tabs>
    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="window-bonus">
          <plus-minus v-model="extra.diceAll">Extra dice for all attacks</plus-minus>
          <plus-minus v-model="extra.diceMeele">Extra dice for meele attacks</plus-minus>
          <plus-minus v-model="extra.diceRange">Extra dice for ranged attacks</plus-minus>
          <plus-minus v-model="extra.resultAll">Extra result for all attacks</plus-minus>
          <plus-minus v-model="extra.resultMeele">Extra result for meele attacks</plus-minus>
          <plus-minus v-model="extra.resultRange">Extra result for ranged attacks</plus-minus>
        </v-tabs-window-item>
        <v-tabs-window-item value="window-weapons">
          <div v-for="(selectedWeapon, index) in selectedWeapons" :key="selectedWeapon.name">
            <v-select
              v-model="selectedWeapons![index]"
              :items="weapons"
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
          </div>
          <v-btn @click="addWeapon()">New</v-btn>
        </v-tabs-window-item>
        <v-tabs-window-item value="window-results">
          <plus-minus v-model="toKill">Zombies to kill</plus-minus>
          <plus-minus v-model="actions">Actions available</plus-minus>
          <v-data-table :items="tableProps" mobile></v-data-table>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
    <div></div>
  </v-card>
</template>

<script setup lang="ts">
import { weapons } from './stores/weaponStore'
import { Weapon } from './components/typescript/classes/weapon'
import { computed, ref, type Ref } from 'vue'
import plusMinus from './components/plus-minus.vue'

const selectedWeapons: Ref<Weapon[] | null> = ref<Weapon[] | null>([weapons[0]])
const toKill = ref(2)
const actions = ref(3)
const tab = ref('window-bonus')
const extra = ref({
  diceAll: 0,
  diceMeele: 0,
  diceRange: 0,
  resultAll: 0,
  resultMeele: 0,
  resultRange: 0,
})

function addWeapon() {
  selectedWeapons.value!.push(weapons[0])
}

const tableProps = computed(() => {
  const props: { name: string; propability: number; expectedKills: number }[] = []
  selectedWeapons.value?.forEach((weapon) => {
    props.push({
      name: weapon.name,
      propability: Math.round(100 * weapon.propability(actions.value, toKill.value, extra.value)),
      expectedKills: Math.round(weapon.expected(actions.value, extra.value) * 10) / 10,
    })
  })
  return props
})

const tableHeaders = [
  { text: 'Name' },
  { text: 'Propability to kill all Zombies.' },
  { text: 'Expected kills' },
]
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
