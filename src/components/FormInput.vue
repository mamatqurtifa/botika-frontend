<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium text-[#11B18A]">
      {{ label }}
    </label>
    <input
      v-if="type !== 'select'"
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full px-4 py-3.5 bg-[#E9F8F4] border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-teal-50 focus:ring-2 focus:ring-teal-400/50 transition-all outline-none"
    />
    <select
      v-else
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      class="w-full px-4 py-3.5 bg-[#E9F8F4] border-0 rounded-xl text-gray-900 focus:bg-teal-50 focus:ring-2 focus:ring-teal-400/50 transition-all outline-none appearance-none cursor-pointer"
      :style="{
        backgroundImage: `url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        backgroundSize: '1.25rem',
        paddingRight: '3rem',
      }"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
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

const emit = defineEmits(['update:modelValue'])
</script>
