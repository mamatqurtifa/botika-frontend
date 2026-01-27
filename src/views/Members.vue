<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Management Anggota</h1>

      <div class="flex items-center gap-3">
        <!-- Search -->
        <div class="w-80">
          <SearchBar v-model="searchQuery" placeholder="Search Anggota" />
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
          Tambah Anggota
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <DataTable :columns="columns" :data="filteredData">
      <!-- Custom cell for No -->
      <template #cell-no="{ row }"> {{ row.no }}. </template>

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
          id="nama"
          label="Nama"
          v-model="formData.nama"
          placeholder="Shopia Elizabeth Turner"
        />

        <FormInput
          id="jabatan"
          label="Jabatan"
          type="select"
          v-model="formData.jabatan"
          :options="jabatanOptions"
        />

        <FormInput
          id="department"
          label="Department"
          type="select"
          v-model="formData.department"
          :options="departmentOptions"
        />
      </div>
    </Modal>

    <!-- Delete Modal -->
    <DeleteModal
      :isOpen="isDeleteModalOpen"
      :itemName="`${deleteItem?.nama}`"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Filter, Plus } from 'lucide-vue-next'
import DataTable from '../components/DataTable.vue'
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
  nama: '',
  jabatan: 'Senior Software Engineer',
  department: 'Technology',
})

const jabatanOptions = [
  { value: 'Senior Software Engineer', label: 'Senior Software Engineer' },
  {
    value: 'Marketing and Communications Executive',
    label: 'Marketing and Communications Executive',
  },
  { value: 'Financial Operations Officer', label: 'Financial Operations Officer' },
  { value: 'Quality Assurance', label: 'Quality Assurance' },
  { value: 'Human Resources Manager', label: 'Human Resources Manager' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'UX/UI Designer', label: 'UX/UI Designer' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer' },
  { value: 'Business Analyst', label: 'Business Analyst' },
]

const departmentOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'HR', label: 'HR' },
  { value: 'Design', label: 'Design' },
  { value: 'Product', label: 'Product' },
  { value: 'Business', label: 'Business' },
]

const columns = [
  { key: 'no', label: 'No', headerClass: 'w-16' },
  { key: 'nama', label: 'Nama' },
  { key: 'jabatan', label: 'Jabatan' },
  { key: 'department', label: 'Department' },
  { key: 'action', label: 'Action', headerClass: 'w-20' },
]

const membersData = ref([
  {
    no: 1,
    nama: 'Daniel Alexander Carter',
    jabatan: 'Senior Software Engineer',
    department: 'Technology',
  },
  {
    no: 2,
    nama: 'Emily Grace Johnson',
    jabatan: 'Marketing and Communications Executive',
    department: 'Marketing',
  },
  {
    no: 3,
    nama: 'Michael Benjamin Lee',
    jabatan: 'Financial Operations Officer',
    department: 'Finance',
  },
  {
    no: 4,
    nama: 'Sophia Elizabeth Turner',
    jabatan: 'Quality Assurance',
    department: 'Technology',
  },
  {
    no: 5,
    nama: 'Christopher Nathan Adams',
    jabatan: 'Financial Operations Officer',
    department: 'Finance',
  },
  { no: 6, nama: 'Olivia Marie Rodriguez', jabatan: 'Human Resources Manager', department: 'HR' },
  { no: 7, nama: 'James William Thompson', jabatan: 'Product Manager', department: 'Product' },
  { no: 8, nama: 'Isabella Rose Martinez', jabatan: 'UX/UI Designer', department: 'Design' },
  { no: 9, nama: 'Alexander David Chen', jabatan: 'DevOps Engineer', department: 'Technology' },
  { no: 10, nama: 'Ava Sophie Anderson', jabatan: 'Business Analyst', department: 'Business' },
])

const filteredData = computed(() => {
  if (!searchQuery.value) return membersData.value

  const query = searchQuery.value.toLowerCase()
  return membersData.value.filter((item) => {
    return (
      item.nama.toLowerCase().includes(query) ||
      item.jabatan.toLowerCase().includes(query) ||
      item.department.toLowerCase().includes(query)
    )
  })
})

const openCreateModal = () => {
  isEditMode.value = false
  formData.value = {
    nama: '',
    jabatan: 'Senior Software Engineer',
    department: 'Technology',
  }
  isModalOpen.value = true
}

const handleEdit = (row) => {
  isEditMode.value = true
  editingIndex.value = membersData.value.findIndex((item) => item.no === row.no)
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
  const index = membersData.value.findIndex((item) => item.no === deleteItem.value.no)
  membersData.value.splice(index, 1)
  // Re-number the items
  membersData.value.forEach((item, idx) => {
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
    membersData.value[editingIndex.value] = { ...formData.value }
  } else {
    // Add new data
    const newNo = membersData.value.length + 1
    membersData.value.push({ ...formData.value, no: newNo })
  }
  closeModal()
}
</script>
