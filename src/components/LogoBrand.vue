<template>
  <div class="flex items-center gap-3">
    <div
      class="flex items-center justify-center rounded-2xl bg-gray-900"
      :class="sizeClasses.container"
    >
      <span
        class="font-bold bg-gradient-to-br from-cyan-500 to-yellow-500 bg-clip-text text-transparent"
        :class="sizeClasses.text"
      >
        m
      </span>
    </div>
    <div v-if="showText">
      <h1 class="font-bold text-gray-400 leading-tight" :class="sizeClasses.title">
        {{ title }}
      </h1>
      <p class="font-bold text-gray-900 leading-tight" :class="sizeClasses.subtitle">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  showText: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: 'management',
  },
  subtitle: {
    type: String,
    default: 'inventaris.',
  },
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: {
      container: 'w-10 h-10',
      text: 'text-lg',
      title: 'text-sm',
      subtitle: 'text-sm',
    },
    md: {
      container: 'w-12 h-12',
      text: 'text-xl',
      title: 'text-base',
      subtitle: 'text-base',
    },
    lg: {
      container: 'w-16 h-16',
      text: 'text-2xl',
      title: 'text-xl',
      subtitle: 'text-xl',
    },
  }
  return sizes[props.size]
})
</script>
