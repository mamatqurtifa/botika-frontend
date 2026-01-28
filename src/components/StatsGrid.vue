<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatsCard
      v-for="stat in stats"
      :key="stat.label"
      :label="stat.label"
      :value="stat.value"
      :icon="stat.icon"
      :iconBgClass="stat.iconBgClass"
      :iconColorClass="stat.iconColorClass"
    />
  </div>
</template>

<script setup>
import StatsCard from './StatsCard.vue'

defineProps({
  stats: {
    type: Array,
    required: true,
  },
})
</script>
