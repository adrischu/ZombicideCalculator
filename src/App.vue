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
          <plus-minus v-model="extraDiceAll">Extra dice for all attacks</plus-minus>
          <plus-minus v-model="extraDiceMeele">Extra dice for meele attacks</plus-minus>
          <plus-minus v-model="extraDiceRange">Extra dice for ranged attacks</plus-minus>
          <plus-minus v-model="extraResultAll">Extra result for all attacks</plus-minus>
          <plus-minus v-model="extraResultMeele">Extra result for meele attacks</plus-minus>
          <plus-minus v-model="extraResultRange">Extra result for ranged attacks</plus-minus>
        </v-tabs-window-item>
        <v-tabs-window-item value="window-weapons">
          <v-select
            v-model="selectedWeapon"
            :items="weapons"
            item-title="name"
            return-object
            hide-details
          >
          </v-select>
          <v-checkbox v-model="useDualWielding" label="Use Dual Wielding?"></v-checkbox>
          <v-img :src="selectedWeapon?.imagePath" max-width="200" alt="Weapon Image"></v-img>
        </v-tabs-window-item>
        <v-tabs-window-item value="window-results">
          <plus-minus v-model="toKill">Zombies to kill</plus-minus>
          <plus-minus v-model="actions">Actions available</plus-minus>
          <div>
            Propability to kill at least {{ toKill }} zombies with {{ actions }} actions:
            {{ propability }}%
          </div>
          <div>Expected kills: {{ expected }}</div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
    <div></div>
  </v-card>
</template>

<script setup lang="ts">
import { weapons } from './stores/weaponStore'
import { Weapon } from './components/typescript/classes/weapon'
import { computed, ref } from 'vue'
import { bernoulliMindestens } from './components/typescript/stochastics'
import plusMinus from './components/plus-minus.vue'
// <img :src="`./assets/card-images/${selectedWeapon!.imagePath}`" />
const selectedWeapon = ref<Weapon | null>(weapons[0])
const useDualWielding = ref(false)
const toKill = ref(2)
const actions = ref(3)
const tab = ref('window-bonus')
const extraDiceMeele = ref(0)
const extraDiceRange = ref(0)
const extraDiceAll = ref(0)
const extraResultMeele = ref(0)
const extraResultRange = ref(0)
const extraResultAll = ref(0)

const p = computed(() => {
  let p = (6 + 1 - selectedWeapon.value!.hit + extraResultAll.value) / 6
  if (selectedWeapon.value!.isMeele) p += extraResultMeele.value //Falls Waffe Meele ist extra Meele-Würfel dazuzählen
  if (!selectedWeapon.value!.isMeele) p += extraResultRange.value //Falls Waffe Ranged ist extra Ranged-Würfel dazu zählen
  return p
})

const dices = computed(() => {
  let dices = selectedWeapon.value!.dices + extraDiceAll.value //Würfel von Waffe + Extra Würfel(Alle) dazu
  if (selectedWeapon.value!.isMeele) dices += extraDiceMeele.value //Falls Waffe Meele ist extra Meele-Würfel dazuzählen
  if (!selectedWeapon.value!.isMeele) dices += extraDiceRange.value //Falls Waffe Ranged ist extra Ranged-Würfel dazu zählen
  dices = useDualWielding.value ? dices * 2 : dices //Wenn Waffe doppelhändig geführt wird Würfel verdoppeln
  return dices
})

const propability = computed(() => {
  return Math.round(100 * bernoulliMindestens(p.value, actions.value * dices.value, toKill.value))
})

const expected = computed(() => {
  return p.value * actions.value * dices.value
})
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
