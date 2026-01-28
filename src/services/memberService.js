import apiClient from '../utils/axios'

export const memberService = {
  getAll() {
    return apiClient.get('/users')
  },

  getById(id) {
    return apiClient.get(`/users/${id}`)
  },

  create(data) {
    return apiClient.post('/users', data)
  },

  update(id, data) {
    return apiClient.put(`/users/${id}`, data)
  },

  delete(id) {
    return apiClient.delete(`/users/${id}`)
  },
}
