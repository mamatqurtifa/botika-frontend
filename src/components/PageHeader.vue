<template>
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>

    <div class="flex items-center gap-3">
      <!-- Search -->
      <div class="w-80">
        <SearchBar
          :modelValue="searchQuery"
          @update:modelValue="$emit('update:searchQuery', $event)"
          :placeholder="searchPlaceholder"
        />
      </div>

      <!-- Add Button -->
      <button
        @click="$emit('add')"
        class="flex items-center gap-2 bg-gray-900 px-6 py-3 rounded-2xl hover:bg-gray-800 transition text-sm font-medium"
      >
        <span class="inline-flex items-center">
          <Plus class="w-5 h-5 text-[#6FD0B8]" />
        </span>
        <span
          class="font-semibold bg-gradient-to-r from-[#6FD0B8] to-[#DFD287] bg-clip-text text-transparent"
        >
          {{ addButtonText }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Plus } from 'lucide-vue-next'
import SearchBar from './SearchBar.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  searchQuery: {
    type: String,
    default: '',
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...',
  },
  addButtonText: {
    type: String,
    default: 'Tambah Data',
  },
})

defineEmits(['update:searchQuery', 'add'])
</script>
