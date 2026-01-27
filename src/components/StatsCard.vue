<template>
  <div class="bg-[#F6F7FB] rounded-3xl p-4 relative">
    <button
      class="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#DCDDDF] flex items-center justify-center"
    >
      <Info class="w-6 h-6 text-gray-600" />
    </button>

    <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" :class="iconBgClass">
      <component :is="icon" class="w-6 h-6" :class="iconColorClass" />
    </div>

    <p class="text-sm text-semibold text-gray-600 mb-2">{{ label }}</p>

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
