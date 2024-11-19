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
          <v-select
            label="Filter by seasons"
            v-model="selectedSeasons"
            :items="allSeasons"
            item-title="name"
            return-object
            multiple
            @update:modelValue="cullSelectedWeapons()"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 10">
                <span>{{ item.raw.short }}</span>
              </v-chip>
              <!-- <span v-if="index === 2" class="text-grey text-caption align-self-center">
                (+{{ value.length - 2 }} others)
              </span> -->
            </template>
          </v-select>
          <plus-minus v-model="settings.extraDiceAll">Extra dice for all attacks</plus-minus>
          <plus-minus v-model="settings.extraDiceMeele">Extra dice for meele attacks</plus-minus>
          <plus-minus v-model="settings.extraDiceRange">Extra dice for ranged attacks</plus-minus>
          <plus-minus v-model="settings.extraResultAll">Extra result for all attacks</plus-minus>
          <plus-minus v-model="settings.extraResultMeele"
            >Extra result for meele attacks</plus-minus
          >
          <plus-minus v-model="settings.extraResultRange"
            >Extra result for ranged attacks</plus-minus
          >
        </v-tabs-window-item>
        <v-tabs-window-item value="window-weapons">
          <div v-for="(selectedWeapon, index) in selectedWeapons" :key="selectedWeapon.name">
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
          </div>
          <v-btn @click="addWeapon()">New</v-btn>
        </v-tabs-window-item>
        <v-tabs-window-item value="window-results">
          <plus-minus v-model="toKill">Zombies to kill</plus-minus>
          <plus-minus v-model="actions">Actions available</plus-minus>
          <v-data-table :items="tableProps"></v-data-table>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
    <div></div>
  </v-card>
</template>

<script setup lang="ts">
import { allWeapons } from './stores/weaponStore'
import { Weapon } from './components/typescript/classes/weapon'
import { computed, ref, type Ref } from 'vue'
import plusMinus from './components/plus-minus.vue'
import { useSettingsStore } from './stores/settingsStore'
import { allSeasons } from './stores/seasonStore'
import type { Season } from './components/typescript/classes/season'

const selectedWeapons: Ref<Weapon[] | null> = ref<Weapon[] | null>([
  allWeapons.find((o) => o.name === 'Pan')!,
])

const settings = useSettingsStore()
const selectedSeasons: Ref<Season[]> = ref(allSeasons)
const weaponPool = computed(() => {
  return allWeapons.filter((weapon) => weapon.isIncludedInSeasons(selectedSeasons.value))
})

const toKill = ref(2)
const actions = ref(3)
const tab = ref('window-bonus')

function addWeapon() {
  selectedWeapons.value!.push(allWeapons[0])
}

function cullSelectedWeapons() {
  selectedWeapons.value = selectedWeapons.value!.filter((weapon) =>
    weapon.isIncludedInSeasons(selectedSeasons.value),
  )
}

const tableProps = computed(() => {
  const props: { name: string; propability: number; expectedKills: number }[] = []
  selectedWeapons.value?.forEach((weapon) => {
    props.push({
      name: weapon.name,
      propability: Math.round(100 * weapon.propability(actions.value, toKill.value)),
      expectedKills: Math.round(weapon.expected(actions.value) * 10) / 10,
    })
  })
  return props
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
