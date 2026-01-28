import { ref, computed } from 'vue'
import { useAlert } from './useAlert'

export function useCrud(service, config = {}) {
  const { showError, showSuccess } = useAlert()

  const data = ref([])
  const isLoading = ref(false)
  const searchQuery = ref('')
  const isModalOpen = ref(false)
  const isEditMode = ref(false)
  const editingId = ref(null)
  const isDeleteModalOpen = ref(false)
  const deleteItem = ref(null)
  const formData = ref({ ...config.initialFormData })

  const filteredData = computed(() => {
    if (!searchQuery.value) return data.value

    const query = searchQuery.value.toLowerCase()
    return data.value.filter((item) => {
      return config.searchFields.some((field) => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], item)
        return value?.toLowerCase().includes(query)
      })
    })
  })

  const fetchData = async () => {
    isLoading.value = true
    try {
      const response = await service.getAll()
      if (response.data.success) {
        data.value = response.data.data
      }
    } catch (error) {
      console.error(`Error fetching ${config.entityName}:`, error)
      showError(`Gagal memuat data ${config.entityName}`)
    } finally {
      isLoading.value = false
    }
  }

  const openCreateModal = () => {
    isEditMode.value = false
    formData.value = { ...config.initialFormData }
    if (config.beforeCreate) {
      config.beforeCreate(formData)
    }
    isModalOpen.value = true
  }

  const handleEdit = (row) => {
    isEditMode.value = true
    editingId.value = row.id
    formData.value = config.mapToForm ? config.mapToForm(row) : { ...row }
    if (config.beforeEdit) {
      config.beforeEdit(formData, row)
    }
    isModalOpen.value = true
  }

  const openDeleteModal = (row) => {
    deleteItem.value = row
    isDeleteModalOpen.value = true
  }

  const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
    deleteItem.value = null
  }

  const confirmDelete = async () => {
    try {
      const response = await service.delete(deleteItem.value.id)
      if (response.data.success) {
        await fetchData()
        closeDeleteModal()
        showSuccess(`${config.entityName} berhasil dihapus`)
      }
    } catch (error) {
      console.error(`Error deleting ${config.entityName}:`, error)
      const message = error.response?.data?.message || 'Gagal menghapus data'
      showError(message)
    }
  }

  const closeModal = () => {
    isModalOpen.value = false
  }

  const saveData = async () => {
    try {
      const payload = config.beforeSave
        ? config.beforeSave({ ...formData.value }, isEditMode.value)
        : { ...formData.value }

      let response
      if (isEditMode.value) {
        response = await service.update(editingId.value, payload)
      } else {
        response = await service.create(payload)
      }

      if (response.data.success) {
        await fetchData()
        closeModal()
        showSuccess(
          isEditMode.value
            ? `${config.entityName} berhasil diperbarui`
            : `${config.entityName} berhasil ditambahkan`,
        )
      }
    } catch (error) {
      console.error(`Error saving ${config.entityName}:`, error)
      const message = error.response?.data?.message || 'Gagal menyimpan data'
      showError(message)
    }
  }

  return {
    // State
    data,
    isLoading,
    searchQuery,
    isModalOpen,
    isEditMode,
    editingId,
    isDeleteModalOpen,
    deleteItem,
    formData,
    filteredData,

    // Methods
    fetchData,
    openCreateModal,
    handleEdit,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    closeModal,
    saveData,
  }
}
