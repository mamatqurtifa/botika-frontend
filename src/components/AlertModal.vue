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
      @click.self="close"
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
          class="bg-white rounded-[2.5rem] shadow-xl w-full max-w-sm p-6 text-center"
        >
          <!-- Icon -->
          <div
            class="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
            :class="iconBgClass"
          >
            <component :is="iconComponent" class="w-8 h-8" :class="iconColorClass" />
          </div>

          <!-- Title -->
          <h2 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h2>

          <!-- Message -->
          <p class="text-sm text-gray-600 mb-6">{{ message }}</p>

          <!-- Button -->
          <button
            @click="close"
            class="w-full px-6 py-3 text-sm font-medium text-white rounded-xl transition"
            :class="buttonClass"
          >
            {{ buttonText }}
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    default: 'info', // 'success', 'error', 'warning', 'info'
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: 'OK',
  },
})

const emit = defineEmits(['close'])

const typeConfig = {
  success: {
    icon: CheckCircle2,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    button: 'bg-green-500 hover:bg-green-600',
  },
  error: {
    icon: AlertCircle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    button: 'bg-red-500 hover:bg-red-600',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    button: 'bg-orange-500 hover:bg-orange-600',
  },
  info: {
    icon: Info,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    button: 'bg-blue-500 hover:bg-blue-600',
  },
}

const config = computed(() => typeConfig[props.type])
const iconComponent = computed(() => config.value.icon)
const iconBgClass = computed(() => config.value.iconBg)
const iconColorClass = computed(() => config.value.iconColor)
const buttonClass = computed(() => config.value.button)

const close = () => {
  emit('close')
}
</script>
