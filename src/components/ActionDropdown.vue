<template>
  <div class="relative" ref="dropdownRef">
    <!-- Trigger Button -->
    <button
      @click="toggleDropdown"
      ref="triggerRef"
      class="p-2 hover:bg-gray-100 rounded-lg transition"
    >
      <MoreVertical class="w-5 h-5 text-gray-600" />
    </button>

    <!-- Dropdown Menu (using Teleport to body) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          ref="menuRef"
          class="fixed bg-gray-900 rounded-lg shadow-lg py-2 z-50 w-32"
          :style="menuStyle"
        >
          <button
            @click="handleEdit"
            class="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-800 transition"
          >
            Edit
          </button>
          <button
            @click="handleDelete"
            class="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-800 transition"
          >
            Delete
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { MoreVertical } from 'lucide-vue-next'

const emit = defineEmits(['edit', 'delete'])

const isOpen = ref(false)
const dropdownRef = ref(null)
const triggerRef = ref(null)
const menuRef = ref(null)
const menuPosition = ref({ top: 0, left: 0 })

const menuStyle = computed(() => ({
  top: `${menuPosition.value.top}px`,
  left: `${menuPosition.value.left}px`,
}))

const updateMenuPosition = () => {
  if (triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    const menuWidth = 128 // w-32 = 8rem = 128px

    // Position menu to the left of the trigger button
    menuPosition.value = {
      top: rect.bottom + 8, // 8px below the button
      left: rect.right - menuWidth, // Align right edge with button
    }
  }
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    updateMenuPosition()
  }
}

const handleEdit = () => {
  emit('edit')
  isOpen.value = false
}

const handleDelete = () => {
  emit('delete')
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target) &&
    menuRef.value &&
    !menuRef.value.contains(event.target)
  ) {
    isOpen.value = false
  }
}

watch(isOpen, (newVal) => {
  if (newVal) {
    // Update position when opened
    setTimeout(updateMenuPosition, 0)
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', updateMenuPosition, true)
  window.addEventListener('resize', updateMenuPosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updateMenuPosition, true)
  window.removeEventListener('resize', updateMenuPosition)
})
</script>
