<template>
  <div class="bg-white rounded-lg overflow-hidden">
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left text-sm font-semibold text-gray-900"
              :class="column.headerClass"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="(row, index) in paginatedData" :key="index" class="hover:bg-gray-50">
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 text-sm text-gray-900"
              :class="column.cellClass"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-700">Showing</span>
        <select
          v-model="itemsPerPage"
          class="px-2 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
        <span class="text-sm text-gray-700">items per page</span>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          class="w-10 h-10 rounded-xl text-sm font-medium transition"
          :class="
            currentPage === page
              ? 'border-2 border-gray-200 text-gray-900 bg-white'
              : 'text-gray-700 hover:bg-gray-50 bg-white'
          "
        >
          {{ page }}
        </button>

        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm text-black rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})

const currentPage = ref(1)
const itemsPerPage = ref(5)

const totalPages = computed(() => {
  return Math.ceil(props.data.length / itemsPerPage.value)
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.data.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3)
    } else if (current >= total - 2) {
      pages.push(total - 2, total - 1, total)
    } else {
      pages.push(current - 1, current, current + 1)
    }
  }

  return pages
})

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

watch(itemsPerPage, () => {
  currentPage.value = 1
})
</script>
