<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium"
    :class="badgeClass"
  >
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const statusConfig = {
  Baik: { label: 'Baik', class: 'bg-green-100 text-green-700' },
  Rusak: { label: 'Rusak', class: 'bg-red-100 text-red-700' },
  'Tidak Dipakai': { label: 'Tidak Dipakai', class: 'bg-gray-100 text-gray-700' },
  Dilelang: { label: 'Dilelang', class: 'bg-orange-100 text-orange-700' },
}

const label = computed(() => statusConfig[props.status]?.label || props.status)
const badgeClass = computed(() => statusConfig[props.status]?.class || 'bg-gray-100 text-gray-700')
</script>
