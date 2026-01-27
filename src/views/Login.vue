<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-8">
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <LogoBrand size="lg" :showText="false" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">management inventaris.</h1>
        <p class="text-gray-600 mt-2 text-sm">Silakan login untuk melanjutkan</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <div class="relative">
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="email"
              type="email"
              placeholder="nama@email.com"
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white text-sm"
              required
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white text-sm"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <EyeOff v-if="showPassword" class="w-5 h-5" />
              <Eye v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm mt-6"
        >
          <LogIn class="w-5 h-5" />
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-vue-next'
import LogoBrand from '../components/LogoBrand.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = () => {
  router.push('/inventories')
}
</script>
