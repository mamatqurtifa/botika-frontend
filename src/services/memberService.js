import apiClient from '../utils/axios'

export const memberService = {
  // Get all users
  getAll() {
    return apiClient.get('/users')
  },

  // Get single user
  getById(id) {
    return apiClient.get(`/users/${id}`)
  },

  // Create user
  create(data) {
    return apiClient.post('/users', data)
  },

  // Update user
  update(id, data) {
    return apiClient.put(`/users/${id}`, data)
  },

  // Delete user
  delete(id) {
    return apiClient.delete(`/users/${id}`)
  },
}
