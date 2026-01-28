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
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
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
        <div
          v-if="isOpen"
          class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div class="px-8 py-6 flex items-start justify-between">
            <div>
              <h2 class="text-2xl font-semibold text-gray-900">{{ title }}</h2>
              <p class="text-sm text-gray-500 mt-1.5">{{ subtitle }}</p>
            </div>
            <button
              @click="closeModal"
              class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition text-gray-600"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto px-8 pb-6">
            <div class="space-y-4">
              <slot></slot>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-8 py-5 flex items-center justify-end gap-3">
            <button
              @click="closeModal"
              class="px-6 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              @click="$emit('save')"
              class="px-6 py-2.5 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition shadow-sm"
            >
              {{ saveButtonText }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Edit Data',
  },
  subtitle: {
    type: String,
    default: 'Make sure everything looks right before saving.',
  },
  saveButtonText: {
    type: String,
    default: 'Save Changes',
  },
})

const emit = defineEmits(['close', 'save'])

const closeModal = () => {
  emit('close')
}
</script>
