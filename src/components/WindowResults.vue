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
      >
        <template v-slot:headers="{ columns, toggleSort, getSortIcon, isSorted }">
          <tr>
            <template v-for="column in columns" :key="column.key">
              <td>
                <span>{{ column.title }} </span>
                <my-tooltip v-if="column.headerProps" :tooltip-text="column.headerProps.text" />

                <div>
                  <v-icon
                    v-if="!isSorted(column)"
                    icon="mdi-sort"
                    size="small"
                    density="compact"
                    class="mr-2 cursor-pointer"
                    @click="() => toggleSort(column)"
                  ></v-icon>
                  <v-icon
                    v-if="isSorted(column)"
                    :icon="getSortIcon(column)"
                    size="small"
                    density="compact"
                    class="mr-2 cursor-pointer"
                    @click="() => toggleSort(column)"
                  ></v-icon>
                </div>
              </td>
            </template>
          </tr>
          <!-- Horizontal Divider -->
          <tr>
            <td :colspan="columns.length">
              <v-divider />
              <v-divider />
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStateStore } from '@/stores/dataState'
import { computed, ref } from 'vue'
import plusMinus from './reusableComponents/plus-minus.vue'
import myTooltip from './reusableComponents/my-tooltip.vue'

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

const tableHeaders = computed(() => {
  const alignCenter: 'center' | 'left' | 'right' = 'center'
  return [
    { title: 'Name', key: 'name', align: alignCenter },
    {
      title: 'P [%]',
      key: 'propability',
      align: alignCenter,
      headerProps: {
        text: `Propability to kill at least ${toKill.value} zombies with ${actions.value} actions.`,
      },
    },
    {
      title: 'E [-]',
      key: 'expectedKills',
      align: alignCenter,
      headerProps: { text: `Expected number of kills with ${actions.value} actions.` },
    },
  ]
})
</script>

<style scoped></style>
