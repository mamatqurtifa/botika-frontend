<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <!-- Logo -->
    <div class="p-6">
      <LogoBrand size="md" />
    </div>

    <!-- Navigation -->
    <NavigationMenu :items="menuItems" />

    <!-- User Section -->
    <div class="p-4">
      <UserMenu
        :userName="authStore.user?.name"
        :userEmail="authStore.user?.email"
        v-model:isDarkMode="isDarkMode"
        @logout="handleLogout"
      />
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { ListChecks, Users, TrendingUp } from 'lucide-vue-next'
import LogoBrand from './LogoBrand.vue'
import NavigationMenu from './NavigationMenu.vue'
import UserMenu from './UserMenu.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const isDarkMode = ref(false)

const menuItems = [
  { path: '/inventories', label: 'Data Inventaris', icon: ListChecks },
  { path: '/members', label: 'Management Anggota', icon: Users },
  { path: '/analytics', label: 'Analytics', icon: TrendingUp },
]

const handleLogout = async () => {
  await authStore.logout()
}
</script>
