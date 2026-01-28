<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Data Inventaris"
      v-model:searchQuery="searchQuery"
      searchPlaceholder="Search Inventaris"
      addButtonText="Tambah Data"
      @add="openCreateModal"
    />

    <!-- Loading State -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Data Table -->
    <DataTable v-else :columns="columns" :data="filteredData">
      <template #cell-no="{ row }"> {{ data.indexOf(row) + 1 }}. </template>

      <template #cell-status="{ row }">
        <StatusBadge :status="row.status" />
      </template>

      <template #cell-assign="{ row }">
        {{ row.assigned_user?.name || '-' }}
      </template>

      <template #cell-department="{ row }">
        {{ row.assigned_user?.department || '-' }}
      </template>

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

        <FormInput
          id="assigned_to"
          label="Assign To"
          type="select"
          v-model="formData.assigned_to"
          :options="userOptions"
        />
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
import PageHeader from '../components/PageHeader.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import DataTable from '../components/DataTable.vue'
import StatusBadge from '../components/StatusBadge.vue'
import ActionDropdown from '../components/ActionDropdown.vue'
import Modal from '../components/Modal.vue'
import FormInput from '../components/FormInput.vue'
import DeleteModal from '../components/DeleteModal.vue'
import AlertModal from '../components/AlertModal.vue'
import { inventoryService } from '../services/inventoryService'
import { useCrud } from '../composables/useCrud'
import { useAlert } from '../composables/useAlert'

const { isAlertOpen, alertConfig, showError, closeAlert } = useAlert()

// Additional state for inventory-specific data
const users = ref([])
const currentInventoryId = ref('')

// CRUD composable
const {
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
  fetchData,
  openCreateModal: baseOpenCreateModal,
  handleEdit: baseHandleEdit,
  openDeleteModal,
  closeDeleteModal,
  confirmDelete,
  closeModal,
  saveData: baseSaveData,
} = useCrud(inventoryService, {
  entityName: 'Inventaris',
  initialFormData: {
    item_name: '',
    type: '',
    serial_number: '',
    specification: '',
    status: 'Baik',
    assigned_to: '',
  },
  searchFields: [
    'inventory_id',
    'item_name',
    'type',
    'serial_number',
    'assigned_user.name',
    'assigned_user.department',
  ],
  mapToForm: (row) => ({
    item_name: row.item_name,
    type: row.type,
    serial_number: row.serial_number || '',
    specification: row.specification || '',
    status: row.status,
    assigned_to: row.assigned_to || '',
  }),
  beforeSave: (payload) => ({
    ...payload,
    assigned_to: payload.assigned_to || null,
  }),
})

// Override methods with additional logic
const openCreateModal = () => {
  currentInventoryId.value = ''
  baseOpenCreateModal()
}

const handleEdit = (row) => {
  currentInventoryId.value = row.inventory_id
  baseHandleEdit(row)
}

const saveData = async () => {
  await baseSaveData()
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

const statusOptions = [
  { value: 'Baik', label: 'Baik' },
  { value: 'Rusak', label: 'Rusak' },
  { value: 'Tidak dipakai', label: 'Tidak Dipakai' },
  { value: 'Dilelang', label: 'Dilelang' },
]

const userOptions = computed(() => [
  { value: '', label: '- Pilih User -' },
  ...users.value.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.department || 'No Dept'})`,
  })),
])

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

onMounted(() => {
  fetchData()
  fetchUsers()
})
</script>
