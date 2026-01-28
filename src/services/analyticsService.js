import apiClient from '../utils/axios'

export const analyticsService = {
  getData() {
    return apiClient.get('/analytics')
  },
}
