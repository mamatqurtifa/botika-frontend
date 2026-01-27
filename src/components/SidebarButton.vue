<template>
  <RouterLink
    :to="to"
    class="flex items-center justify-between px-3 py-2.5 rounded-lg transition group relative"
    :class="
      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    "
  >
    <div class="flex items-center gap-3">
      <component :is="icon" class="w-5 h-5" />
      <span class="text-sm font-medium">{{ label }}</span>
    </div>

    <!-- Indicator Line -->
    <div v-if="isActive" class="w-1 h-3 bg-gray-900 rounded-full"></div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
})

const route = useRoute()

const isActive = computed(() => {
  return route.path === props.to
})
</script>
