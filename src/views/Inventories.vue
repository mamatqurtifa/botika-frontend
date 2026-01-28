<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Data Inventaris</h1>

      <div class="flex items-center gap-3">
        <!-- Search -->
        <div class="w-80">
          <SearchBar v-model="searchQuery" placeholder="Search Inventaris" />
        </div>

        <!-- Add Button -->
        <button
          @click="openCreateModal"
          class="flex items-center gap-2 bg-gray-900 px-4 py-3 rounded-2xl hover:bg-gray-800 transition text-sm font-medium"
        >
          <span class="bg-inline-flex items-center">
            <Plus class="w-5 h-5 text-cyan-500" style="stroke: currentColor" />
          </span>
          <span
            class="font-semibold bg-linear-to-r from-cyan-500 to-yellow-500 bg-clip-text text-transparent"
          >
            Tambah Data
          </span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div
        class="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <!-- Data Table -->
    <DataTable v-else :columns="columns" :data="filteredData">
      <!-- Custom cell for No -->
      <template #cell-no="{ row }"> {{ inventoryData.indexOf(row) + 1 }}. </template>

      <!-- Custom cell for Status -->
      <template #cell-status="{ row }">
        <StatusBadge :status="row.status" />
      </template>

      <!-- Custom cell for Assign -->
      <template #cell-assign="{ row }">
        {{ row.assigned_user?.name || '-' }}
      </template>

      <!-- Custom cell for Department -->
      <template #cell-department="{ row }">
        {{ row.assigned_user?.department || '-' }}
      </template>

      <!-- Custom cell for Action -->
      <template #cell-action="{ row }">
        <ActionDropdown @edit="handleEdit(row)" @delete="openDeleteModal(row)" />
      </template>
    </DataTable>

    <!-- Edit/Create Modal -->
    <Modal
      :isOpen="isModalOpen"
      :title="isEditMode ? 'Edit Data' : 'Tambah Data'"
      subtitle="Make sure everything looks right before saving."
      :saveButtonText="isEditMode ? 'Save Changes' : 'Create Data'"
      @close="closeModal"
      @save="saveData"
    >
      <div class="space-y-4">
        <!-- Show Inventory ID when editing -->
        <div v-if="isEditMode && currentInventoryId" class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Inventaris ID</label>
          <input
            :value="currentInventoryId"
            disabled
            class="w-full px-4 py-3 rounded-xl border-2 border-transparent outline-none bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <FormInput
          id="item_name"
          label="Barang"
          v-model="formData.item_name"
          placeholder="Lenovo Legion"
        />

        <FormInput id="type" label="Type" v-model="formData.type" placeholder="Laptop" />

        <FormInput
          id="serial_number"
          label="Serial Number"
          v-model="formData.serial_number"
          placeholder="12345678"
        />

        <FormInput
          id="specification"
          label="Spesifikasi"
          v-model="formData.specification"
          placeholder="RAM 12"
        />

        <FormInput
          id="status"
          label="Status"
          type="select"
          v-model="formData.status"
          :options="statusOptions"
        />

        <div class="grid grid-cols-2 gap-4">
          <FormInput
            id="assigned_to"
            label="Assign To"
            type="select"
            v-model="formData.assigned_to"
            :options="userOptions"
          />
        </div>
      </div>
    </Modal>

    <!-- Delete Modal -->
    <DeleteModal
      :isOpen="isDeleteModalOpen"
      :itemName="`${deleteItem?.item_name} (${deleteItem?.inventory_id})`"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />

    <!-- Alert Modal -->
    <AlertModal
      :isOpen="isAlertOpen"
      :type="alertConfig.type"
      :title="alertConfig.title"
      :message="alertConfig.message"
      :buttonText="alertConfig.buttonText"
      @close="closeAlert"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Filter, Plus } from 'lucide-vue-next'
import DataTable from '../components/DataTable.vue'
import StatusBadge from '../components/StatusBadge.vue'
import ActionDropdown from '../components/ActionDropdown.vue'
import Modal from '../components/Modal.vue'
import FormInput from '../components/FormInput.vue'
import DeleteModal from '../components/DeleteModal.vue'
import SearchBar from '../components/SearchBar.vue'
import AlertModal from '../components/AlertModal.vue'
import { inventoryService } from '../services/inventoryService'
import { useAlert } from '../composables/useAlert'

const { isAlertOpen, alertConfig, showError, showSuccess, closeAlert } = useAlert()

const searchQuery = ref('')
const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingId = ref(null)
const currentInventoryId = ref('')
const isDeleteModalOpen = ref(false)
const deleteItem = ref(null)
const isLoading = ref(false)
const inventoryData = ref([])
const users = ref([])

const formData = ref({
  item_name: '',
  type: '',
  serial_number: '',
  specification: '',
  status: 'Baik',
  assigned_to: '',
})

const statusOptions = [
  { value: 'Baik', label: 'Baik' },
  { value: 'Rusak', label: 'Rusak' },
  { value: 'Tidak dipakai', label: 'Tidak Dipakai' },
  { value: 'Dilelang', label: 'Dilelang' },
]

const userOptions = computed(() => {
  return [
    { value: '', label: '- Pilih User -' },
    ...users.value.map((user) => ({
      value: user.id,
      label: `${user.name} (${user.department || 'No Dept'})`,
    })),
  ]
})

const columns = [
  { key: 'no', label: 'No', headerClass: 'w-16' },
  { key: 'inventory_id', label: 'Inventaris ID' },
  { key: 'item_name', label: 'Barang' },
  { key: 'type', label: 'Type' },
  { key: 'serial_number', label: 'Serial Number' },
  { key: 'specification', label: 'Spesifikasi' },
  { key: 'status', label: 'Status' },
  { key: 'assign', label: 'Assign' },
  { key: 'department', label: 'Department' },
  { key: 'action', label: 'Action', headerClass: 'w-20' },
]

const filteredData = computed(() => {
  if (!searchQuery.value) return inventoryData.value

  const query = searchQuery.value.toLowerCase()
  return inventoryData.value.filter((item) => {
    return (
      item.inventory_id?.toLowerCase().includes(query) ||
      item.item_name?.toLowerCase().includes(query) ||
      item.type?.toLowerCase().includes(query) ||
      item.serial_number?.toLowerCase().includes(query) ||
      item.assigned_user?.name?.toLowerCase().includes(query) ||
      item.assigned_user?.department?.toLowerCase().includes(query)
    )
  })
})

// Fetch inventories
const fetchInventories = async () => {
  isLoading.value = true
  try {
    const response = await inventoryService.getAll()
    if (response.data.success) {
      inventoryData.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching inventories:', error)
    showError('Gagal memuat data inventaris')
  } finally {
    isLoading.value = false
  }
}

// Fetch users for dropdown
const fetchUsers = async () => {
  try {
    const response = await inventoryService.getUsers()
    if (response.data.success) {
      users.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    showError('Gagal memuat data user')
  }
}

const openCreateModal = () => {
  isEditMode.value = false
  currentInventoryId.value = ''
  formData.value = {
    item_name: '',
    type: '',
    serial_number: '',
    specification: '',
    status: 'Baik',
    assigned_to: '',
  }
  isModalOpen.value = true
}

const handleEdit = (row) => {
  isEditMode.value = true
  editingId.value = row.id
  currentInventoryId.value = row.inventory_id
  formData.value = {
    item_name: row.item_name,
    type: row.type,
    serial_number: row.serial_number || '',
    specification: row.specification || '',
    status: row.status,
    assigned_to: row.assigned_to || '',
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
    const response = await inventoryService.delete(deleteItem.value.id)
    if (response.data.success) {
      await fetchInventories()
      closeDeleteModal()
      showSuccess('Data berhasil dihapus')
    }
  } catch (error) {
    console.error('Error deleting inventory:', error)
    showError('Gagal menghapus data')
  }
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveData = async () => {
  try {
    const payload = {
      ...formData.value,
      assigned_to: formData.value.assigned_to || null,
    }

    let response
    if (isEditMode.value) {
      response = await inventoryService.update(editingId.value, payload)
    } else {
      response = await inventoryService.create(payload)
    }

    if (response.data.success) {
      await fetchInventories()
      closeModal()
      showSuccess(isEditMode.value ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan')
    }
  } catch (error) {
    console.error('Error saving inventory:', error)
    showError('Gagal menyimpan data')
  }
}

onMounted(() => {
  fetchInventories()
  fetchUsers()
})
</script>
