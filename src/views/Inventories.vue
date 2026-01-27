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

        <!-- Filter Button -->
        <button
          class="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 bg-gray-50 transition"
        >
          <Filter class="w-5 h-5 text-gray-600" />
        </button>

        <!-- Add Button -->
        <button
          @click="openCreateModal"
          class="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition text-sm font-medium"
        >
          <Plus class="w-5 h-5" />
          Tambah Data
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <DataTable :columns="columns" :data="filteredData">
      <!-- Custom cell for No -->
      <template #cell-no="{ row }"> {{ row.no }}. </template>

      <!-- Custom cell for Status -->
      <template #cell-status="{ row }">
        <StatusBadge :status="row.status" />
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
        <FormInput
          id="inventarisId"
          label="Inventaris ID"
          v-model="formData.inventarisId"
          placeholder="INV-1234"
        />

        <FormInput
          id="barang"
          label="Barang"
          v-model="formData.barang"
          placeholder="Lenovo Region"
        />

        <FormInput id="type" label="Type" v-model="formData.type" placeholder="Laptop" />

        <FormInput
          id="seriaNumber"
          label="Serial Number"
          v-model="formData.seriaNumber"
          placeholder="12345678"
        />

        <FormInput
          id="spesifikasi"
          label="Spesifikasi"
          v-model="formData.spesifikasi"
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
            id="assign"
            label="Assign"
            type="select"
            v-model="formData.assign"
            :options="assignOptions"
          />

          <FormInput
            id="department"
            label="Department"
            type="select"
            v-model="formData.department"
            :options="departmentOptions"
          />
        </div>
      </div>
    </Modal>

    <!-- Delete Modal -->
    <DeleteModal
      :isOpen="isDeleteModalOpen"
      :itemName="`${deleteItem?.barang} with ID ${deleteItem?.inventarisId}`"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Filter, Plus } from 'lucide-vue-next'
import DataTable from '../components/DataTable.vue'
import StatusBadge from '../components/StatusBadge.vue'
import ActionDropdown from '../components/ActionDropdown.vue'
import Modal from '../components/Modal.vue'
import FormInput from '../components/FormInput.vue'
import DeleteModal from '../components/DeleteModal.vue'
import SearchBar from '../components/SearchBar.vue'

const searchQuery = ref('')
const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingIndex = ref(null)
const isDeleteModalOpen = ref(false)
const deleteItem = ref(null)

const formData = ref({
  inventarisId: '',
  barang: '',
  type: '',
  seriaNumber: '',
  spesifikasi: '',
  status: 'Baik',
  assign: 'userA',
  department: 'Technology',
})

const statusOptions = [
  { value: 'Baik', label: 'Baik' },
  { value: 'Rusak', label: 'Rusak' },
  { value: 'Tidak Dipakai', label: 'Tidak Dipakai' },
  { value: 'Dilelang', label: 'Dilelang' },
]

const assignOptions = [
  { value: 'userA', label: 'UserA' },
  { value: 'userB', label: 'UserB' },
  { value: 'userC', label: 'UserC' },
  { value: 'userD', label: 'UserD' },
  { value: 'userE', label: 'UserE' },
]

const departmentOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'HR', label: 'HR' },
  { value: 'Design', label: 'Design' },
]

const columns = [
  { key: 'no', label: 'No', headerClass: 'w-16' },
  { key: 'inventarisId', label: 'Inventaris ID' },
  { key: 'barang', label: 'Barang' },
  { key: 'type', label: 'Type' },
  { key: 'seriaNumber', label: 'Seria Number' },
  { key: 'spesifikasi', label: 'Spesifikasi' },
  { key: 'status', label: 'Status' },
  { key: 'assign', label: 'Assign' },
  { key: 'department', label: 'Department' },
  { key: 'action', label: 'Action', headerClass: 'w-20' },
]

const inventoryData = ref([
  {
    no: 1,
    inventarisId: 'INV-1234',
    barang: 'Lenovo Legion',
    type: 'Laptop',
    seriaNumber: '123456',
    spesifikasi: 'RAM 12',
    status: 'Baik',
    assign: 'userA',
    department: 'Technology',
  },
  {
    no: 2,
    inventarisId: 'INV-1234',
    barang: 'Lenovo Legion',
    type: 'Laptop',
    seriaNumber: '123456',
    spesifikasi: 'RAM 12',
    status: 'Rusak',
    assign: 'userB',
    department: 'Technology',
  },
  {
    no: 3,
    inventarisId: 'INV-1234',
    barang: 'Lenovo Legion',
    type: 'Laptop',
    seriaNumber: '123456',
    spesifikasi: 'RAM 12',
    status: 'Tidak Dipakai',
    assign: 'userC',
    department: 'Technology',
  },
  {
    no: 4,
    inventarisId: 'INV-1234',
    barang: 'Lenovo Legion',
    type: 'Laptop',
    seriaNumber: '123456',
    spesifikasi: 'RAM 12',
    status: 'Dilelang',
    assign: 'userD',
    department: 'Technology',
  },
  {
    no: 5,
    inventarisId: 'INV-1234',
    barang: 'Lenovo Legion',
    type: 'Laptop',
    seriaNumber: '123456',
    spesifikasi: 'RAM 12',
    status: 'Dilelang',
    assign: 'userE',
    department: 'Technology',
  },
  {
    no: 6,
    inventarisId: 'INV-1235',
    barang: 'Dell XPS',
    type: 'Laptop',
    seriaNumber: '123457',
    spesifikasi: 'RAM 16',
    status: 'Baik',
    assign: 'userF',
    department: 'Design',
  },
  {
    no: 7,
    inventarisId: 'INV-1236',
    barang: 'MacBook Pro',
    type: 'Laptop',
    seriaNumber: '123458',
    spesifikasi: 'RAM 32',
    status: 'Baik',
    assign: 'userG',
    department: 'Marketing',
  },
  {
    no: 8,
    inventarisId: 'INV-1237',
    barang: 'HP Pavilion',
    type: 'Laptop',
    seriaNumber: '123459',
    spesifikasi: 'RAM 8',
    status: 'Rusak',
    assign: 'userH',
    department: 'HR',
  },
])

const filteredData = computed(() => {
  if (!searchQuery.value) return inventoryData.value

  const query = searchQuery.value.toLowerCase()
  return inventoryData.value.filter((item) => {
    return (
      item.inventarisId.toLowerCase().includes(query) ||
      item.barang.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.assign.toLowerCase().includes(query) ||
      item.department.toLowerCase().includes(query)
    )
  })
})

const openCreateModal = () => {
  isEditMode.value = false
  formData.value = {
    inventarisId: '',
    barang: '',
    type: '',
    seriaNumber: '',
    spesifikasi: '',
    status: 'Baik',
    assign: 'userA',
    department: 'Technology',
  }
  isModalOpen.value = true
}

const handleEdit = (row) => {
  isEditMode.value = true
  editingIndex.value = inventoryData.value.findIndex((item) => item.no === row.no)
  formData.value = { ...row }
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

const confirmDelete = () => {
  const index = inventoryData.value.findIndex((item) => item.no === deleteItem.value.no)
  inventoryData.value.splice(index, 1)
  // Re-number the items
  inventoryData.value.forEach((item, idx) => {
    item.no = idx + 1
  })
  closeDeleteModal()
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveData = () => {
  if (isEditMode.value) {
    // Update existing data
    inventoryData.value[editingIndex.value] = { ...formData.value }
  } else {
    // Add new data
    const newNo = inventoryData.value.length + 1
    inventoryData.value.push({ ...formData.value, no: newNo })
  }
  closeModal()
}
</script>
