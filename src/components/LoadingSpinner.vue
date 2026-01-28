<template>
  <div class="flex items-center justify-center py-12">
    <div class="border-4 rounded-full animate-spin" :class="[sizeClass, colorClass]"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  color: {
    type: String,
    default: 'gray', // 'gray', 'primary', 'white'
  },
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  }
  return sizes[props.size]
})

const colorClass = computed(() => {
  const colors = {
    gray: 'border-gray-900 border-t-transparent',
    primary: 'border-indigo-600 border-t-transparent',
    white: 'border-white border-t-transparent',
  }
  return colors[props.color]
})
</script>
