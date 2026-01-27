<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="isOpen" class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
          <!-- Icon -->
          <div
            class="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Trash2 class="w-8 h-8 text-white" />
          </div>

          <!-- Title -->
          <h2 class="text-xl font-bold text-gray-900 mb-2">Delete Data</h2>

          <!-- Description -->
          <p class="text-sm text-gray-600 mb-6">
            Are you sure you want to delete
            <span class="font-semibold text-gray-900">{{ itemName }}</span
            >? This action cannot be undone.
          </p>

          <!-- Buttons -->
          <div class="space-y-3">
            <button
              @click="$emit('confirm')"
              class="w-full px-6 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition"
            >
              Delete Data
            </button>
            <button
              @click="closeModal"
              class="w-full px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { Trash2 } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => {
  emit('close')
}
</script>
