<template>
  <plus-minus v-model="toKill">Zombies to kill</plus-minus>
  <plus-minus v-model="actions">Actions available</plus-minus>
  <v-data-table :items="tableProps" hide-default-footer items-per-page="-1"></v-data-table>
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
</script>
