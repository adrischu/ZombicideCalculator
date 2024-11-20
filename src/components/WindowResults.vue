<template>
  <div>
    <plus-minus v-model="toKill">Zombies to kill</plus-minus>
    <plus-minus v-model="actions">Actions available</plus-minus>
    <v-divider thickness="2" style="margin-top: 10px; margin-bottom: 10px"></v-divider>

    <v-data-table
      :headers="tableHeaders"
      class="text-center"
      :items="tableProps"
      hide-default-footer
      items-per-page="-1"
    />
    <div style="text-align: left">
      P: Propability to kill at least {{ toKill }} zombies with {{ actions }} actions.
    </div>
    <div style="text-align: left">E: Expected number of kills with {{ actions }} actions</div>
  </div>
</template>

<script setup lang="ts">
import { useDataStateStore } from '@/stores/dataState'
import { computed, ref } from 'vue'
import plusMinus from './plus-minus.vue'

const toKill = ref(2)
const actions = ref(3)
const selectedWeapons = useDataStateStore().selectedWeapons
const tableProps = computed(() => {
  const props: { name: string; propability: number; expectedKills: number }[] = []
  selectedWeapons.forEach((weapon) => {
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
