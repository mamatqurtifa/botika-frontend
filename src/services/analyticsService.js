import apiClient from '../utils/axios'

export const analyticsService = {
  // Get analytics data
  getData() {
    return apiClient.get('/analytics')
  },
}
