<template>
  <v-select
    label="Filter by seasons"
    v-model="dataState.selectedSeasons"
    :items="allSeasons"
    item-title="name"
    return-object
    multiple
    @update:modelValue="seasonSelectionChanged()"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index < 4">
        <span>{{ item.raw.short }}</span>
      </v-chip>
      <span v-if="index === 4" class="text-grey text-caption align-self-center">
        (+{{ dataState.selectedSeasons.length - 4 }} others)
      </span>
    </template>
  </v-select>
  <plus-minus v-model="settings.extraDiceAll">Extra dice for all attacks</plus-minus>
  <plus-minus v-model="settings.extraDiceMeele">Extra dice for meele attacks</plus-minus>
  <plus-minus v-model="settings.extraDiceRange">Extra dice for ranged attacks</plus-minus>
  <plus-minus v-model="settings.extraResultAll">Extra result for all attacks</plus-minus>
  <plus-minus v-model="settings.extraResultMeele">Extra result for meele attacks</plus-minus>
  <plus-minus v-model="settings.extraResultRange">Extra result for ranged attacks</plus-minus>
</template>

<script setup lang="ts">
import { useDataStateStore } from '@/stores/dataState'
import { allSeasons } from '@/stores/seasonStore'
import { useSettingsStore } from '@/stores/settingsStore'
import plusMinus from './plus-minus.vue'
const settings = useSettingsStore()
const dataState = useDataStateStore()

function seasonSelectionChanged() {
  dataState.selectedWeapons = dataState.selectedWeapons.filter((weapon) =>
    weapon.isIncludedInSeasons(dataState.selectedSeasons),
  )
}
</script>
