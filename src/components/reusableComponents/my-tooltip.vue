<template>
  <v-tooltip
    v-model="visible"
    location="top"
    :open-on-click="true"
    :open-on-hover="false"
    :close-on-content-click="true"
  >
    <template #activator="{ props }">
      <!-- Button als Activator -->
      <v-btn v-bind="props" icon size="small" density="compact">
        <v-icon color="grey-lighten-1">mdi-information</v-icon>
      </v-btn>
    </template>

    <!-- Tooltip-Inhalt -->
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

defineProps<{
  tooltipText: string
}>()

document.addEventListener('click', () => {
  if (visible.value) visible.value = false
})
</script>
