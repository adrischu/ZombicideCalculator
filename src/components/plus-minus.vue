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

// Props definieren
const props = defineProps<{
  modelValue: number
}>()

// Event zum Emitten definieren
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// Computed property für den Wert
const value = computed({
  get: () => props.modelValue,
  set: (newValue: number) => emit('update:modelValue', newValue),
})

// Methoden für das Inkrementieren und Dekrementieren
const increment = () => {
  value.value++
}

const decrement = () => {
  value.value--
}
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  font-size: 16px;
}
</style>
