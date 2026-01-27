import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '../utils/axios'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('access_token'))

  const isAuthenticated = computed(() => !!token.value)

  // Load user from localStorage on init
  const loadUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  // Login
  const login = async (credentials) => {
    try {
      const response = await apiClient.post('/login', credentials)

      if (response.data.success) {
        const { access_token } = response.data.data

        // Save token
        token.value = access_token
        localStorage.setItem('access_token', access_token)

        // Fetch user data
        await fetchUser()

        return { success: true }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: error.response?.data?.error || 'Login failed',
      }
    }
  }

  // Fetch current user
  const fetchUser = async () => {
    try {
      const response = await apiClient.get('/me')

      if (response.data.success) {
        user.value = response.data.data
        localStorage.setItem('user', JSON.stringify(response.data.data))
      }
    } catch (error) {
      console.error('Fetch user error:', error)
      logout()
    }
  }

  // Logout
  const logout = async () => {
    try {
      await apiClient.post('/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear state
      user.value = null
      token.value = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')

      router.push('/login')
    }
  }

  // Initialize store
  loadUser()

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  }
})
