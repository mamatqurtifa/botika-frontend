import axios from 'axios'
import router from '../router'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor - tambahkan token ke setiap request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor - handle error 401 (unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Jika error 401 dan bukan request refresh atau login
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Coba refresh token
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          const response = await axios.post(
            'http://localhost:8000/api/refresh',
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          )

          const { access_token } = response.data.data
          localStorage.setItem('access_token', access_token)

          // Retry original request dengan token baru
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Jika refresh gagal, logout
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        router.push('/login')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
