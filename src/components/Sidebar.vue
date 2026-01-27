<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <!-- Logo -->
    <div class="p-6">
      <LogoBrand size="md" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 space-y-1">
      <SidebarButton
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :label="item.label"
        :icon="item.icon"
      />
    </nav>

    <!-- User Section -->
    <div class="p-4 border-t border-gray-200">
      <div class="bg-gray-50 rounded-xl p-4 space-y-3">
        <!-- User Info -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User class="w-5 h-5 text-blue-600" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-900 text-sm truncate">tiara tiara</p>
            <p class="text-xs text-gray-500 truncate">tiara@botika.online</p>
          </div>
        </div>

        <!-- Dark Theme Toggle -->
        <button
          @click="toggleDarkMode"
          class="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <div class="flex items-center gap-2">
            <Moon class="w-4 h-4 text-gray-600" />
            <span class="text-sm text-gray-700">Dark Theme</span>
          </div>
          <div
            class="w-10 h-6 rounded-full transition-colors relative"
            :class="isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'"
          >
            <div
              class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"
              :class="isDarkMode ? 'translate-x-5' : 'translate-x-1'"
            ></div>
          </div>
        </button>

        <!-- Logout Button -->
        <button
          @click="handleLogout"
          class="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition text-left"
        >
          <LogOut class="w-4 h-4 text-gray-600" />
          <span class="text-sm text-gray-700">Logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Box, Users, TrendingUp, User, Moon, LogOut } from 'lucide-vue-next'
import SidebarButton from './SidebarButton.vue'
import LogoBrand from './LogoBrand.vue'

const router = useRouter()
const isDarkMode = ref(false)

const menuItems = [
  { path: '/inventories', label: 'Data Inventaris', icon: Box },
  { path: '/members', label: 'Management Anggota', icon: Users },
  { path: '/analytics', label: 'Analytics', icon: TrendingUp },
]

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  // Nanti bisa ditambahkan logic untuk apply dark mode
}

const handleLogout = () => {
  router.push('/login')
}
</script>
