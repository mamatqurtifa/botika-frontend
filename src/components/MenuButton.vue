<template>
  <button
    @click="$emit('click')"
    class="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition text-left"
  >
    <component :is="icon" class="w-4 h-4 text-gray-600" />
    <span class="text-sm text-gray-700">{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
})

defineEmits(['click'])
</script>
