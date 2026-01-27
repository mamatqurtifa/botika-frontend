<template>
  <nav class="flex-1 px-4 space-y-1">
    <SidebarButton
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      :label="item.label"
      :icon="item.icon"
    />
  </nav>
</template>

<script setup>
import SidebarButton from './SidebarButton.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>
