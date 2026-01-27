<template>
  <button
    @click="toggle"
    class="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition"
  >
    <div class="flex items-center gap-2">
      <component :is="icon" class="w-4 h-4 text-gray-600" />
      <span class="text-sm text-gray-700">{{ label }}</span>
    </div>
    <div
      class="w-10 h-6 rounded-full transition-colors relative"
      :class="modelValue ? activeColor : 'bg-gray-300'"
    >
      <div
        class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"
        :class="modelValue ? 'translate-x-5' : 'translate-x-1'"
      ></div>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
  activeColor: {
    type: String,
    default: 'bg-[#31738F]',
  },
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
