<template>
  <div class="counter">
    <v-btn @click="decrement">-</v-btn>
    <span>{{ value }}</span>
    <v-btn @click="increment">+</v-btn>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  minValue?: number
  maxValue?: number
}

// Props definieren
const { modelValue, minValue = -Infinity, maxValue = Infinity } = defineProps<Props>()
// const props = defineProps<{
//   modelValue: number
// }>()

// Event zum Emitten definieren
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// Computed property für den Wert
const value = computed({
  get: () => modelValue,
  set: (newValue: number) => emit('update:modelValue', newValue),
})

// Methoden für das Inkrementieren und Dekrementieren
const increment = () => {
  if (value.value < maxValue) value.value++
}

const decrement = () => {
  if (value.value > minValue) value.value--
}
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 3px;
  margin-right: 3px;
}

button {
  padding: 5px 10px;
  font-size: 16px;
}
</style>
