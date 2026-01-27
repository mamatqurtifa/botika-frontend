<template>
  <div class="bg-gray-50 rounded-xl p-6 relative">
    <!-- Info Button -->
    <button
      class="absolute top-4 right-4 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
    >
      <Info class="w-3.5 h-3.5 text-gray-600" />
    </button>

    <!-- Icon -->
    <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" :class="iconBgClass">
      <component :is="icon" class="w-6 h-6" :class="iconColorClass" />
    </div>

    <!-- Label -->
    <p class="text-sm text-gray-600 mb-2">{{ label }}</p>

    <!-- Value -->
    <p class="text-3xl font-bold text-gray-900">{{ value }}</p>
  </div>
</template>

<script setup>
import { Info } from 'lucide-vue-next'

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
  iconBgClass: {
    type: String,
    default: 'bg-blue-100',
  },
  iconColorClass: {
    type: String,
    default: 'text-blue-600',
  },
})
</script>
