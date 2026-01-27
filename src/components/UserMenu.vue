<template>
  <div class="bg-[#F6F7FB] rounded-3xl p-3 space-y-2 border border-gray-200">
    <!-- User Profile -->
    <UserProfile :userName="userName" :userEmail="userEmail" :avatarUrl="avatarUrl" />

    <!-- Dark Theme Toggle -->
    <ToggleSwitch
      v-model="isDarkModeLocal"
      label="Dark Theme"
      :icon="Moon"
      activeColor="bg-[#31738F]"
    />

    <!-- Logout Button -->
    <MenuButton label="Logout" :icon="LogOut" @click="$emit('logout')" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Moon, LogOut } from 'lucide-vue-next'
import UserProfile from './UserProfile.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import MenuButton from './MenuButton.vue'

const props = defineProps({
  userName: {
    type: String,
    default: 'User',
  },
  userEmail: {
    type: String,
    default: 'email@example.com',
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  isDarkMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['logout', 'update:isDarkMode'])

const isDarkModeLocal = ref(props.isDarkMode)

watch(isDarkModeLocal, (newValue) => {
  emit('update:isDarkMode', newValue)
})

watch(
  () => props.isDarkMode,
  (newValue) => {
    isDarkModeLocal.value = newValue
  },
)
</script>
