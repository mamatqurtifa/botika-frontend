import apiClient from '../utils/axios'

export const inventoryService = {
  // Get all inventories
  getAll() {
    return apiClient.get('/inventories')
  },

  // Get single inventory
  getById(id) {
    return apiClient.get(`/inventories/${id}`)
  },

  // Create inventory
  create(data) {
    return apiClient.post('/inventories', data)
  },

  // Update inventory
  update(id, data) {
    return apiClient.put(`/inventories/${id}`, data)
  },

  // Delete inventory
  delete(id) {
    return apiClient.delete(`/inventories/${id}`)
  },

  // Get users for assignment
  getUsers() {
    return apiClient.get('/inventories/users')
  },
}
