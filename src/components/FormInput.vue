<template>
  <div class="space-y-2">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium"
      :class="focused ? 'text-teal-600' : 'text-gray-700'"
    >
      {{ label }}
    </label>
    <input
      v-if="type !== 'select'"
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full px-4 py-3 rounded-xl border-2 outline-none transition bg-teal-50"
      :class="[
        focused ? 'border-teal-500 bg-white' : 'border-transparent',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]"
    />
    <select
      v-else
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      @focus="focused = true"
      @blur="focused = false"
      :disabled="disabled"
      class="w-full px-4 py-3 rounded-xl border-2 outline-none transition bg-teal-50 appearance-none cursor-pointer"
      :class="[
        focused ? 'border-teal-500 bg-white' : 'border-transparent',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['update:modelValue'])

const focused = ref(false)
</script>
