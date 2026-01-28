import apiClient from '../utils/axios'

export const inventoryService = {
  getAll() {
    return apiClient.get('/inventories')
  },

  getById(id) {
    return apiClient.get(`/inventories/${id}`)
  },

  create(data) {
    return apiClient.post('/inventories', data)
  },

  update(id, data) {
    return apiClient.put(`/inventories/${id}`, data)
  },

  delete(id) {
    return apiClient.delete(`/inventories/${id}`)
  },

  getUsers() {
    return apiClient.get('/inventories/users')
  },
}
