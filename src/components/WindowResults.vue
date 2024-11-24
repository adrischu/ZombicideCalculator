<template>
  <div
    id="results-container"
    style="height: 100%; width: 100%; display: flex; flex-direction: column"
  >
    <div style="flex: none">
      <plus-minus v-model="toKill" :min-value="1">Zombies to kill</plus-minus>
      <plus-minus v-model="actions" :min-value="1">Actions available</plus-minus>
      <v-divider thickness="2" style="margin-top: 10px; margin-bottom: 10px"></v-divider>
    </div>
    <div style="overflow-y: auto; flex: 1">
      <v-data-table
        :headers="tableHeaders"
        class="text-center"
        :items="tableItems"
        hide-default-footer
        items-per-page="-1"
      />
    </div>
    <div id="explanation" style="text-align: left; flex: none">
      <div>P: Propability to kill at least {{ toKill }} zombies with {{ actions }} actions.</div>
      <div>E: Expected number of kills with {{ actions }} actions.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStateStore } from '@/stores/dataState'
import { computed, ref } from 'vue'
import plusMinus from './plus-minus.vue'

const toKill = ref(2)
const actions = ref(3)
const dataState = useDataStateStore()
const tableItems = computed(() => {
  const props: { name: string; propability: number; expectedKills: number }[] = []
  dataState.selectedWeapons.forEach((weapon) => {
    props.push({
      name: weapon!.name,
      propability: Math.round(100 * weapon!.propability(actions.value, toKill.value)),
      expectedKills: Math.round(weapon!.expected(actions.value) * 10) / 10,
    })
  })
  return props
})
const tableHeaders = [
  { title: 'Name', key: 'name', align: 'center' },
  { title: 'P [%]', key: 'propability', align: 'center' },
  { title: 'E [-]', key: 'expectedKills', align: 'center' },
]
</script>

<style scoped></style>
