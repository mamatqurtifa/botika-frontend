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

        <!-- Add Button -->
        <button
          @click="openCreateModal"
          class="flex items-center gap-2 bg-gray-900 px-6 py-3 rounded-2xl hover:bg-gray-800 transition text-sm font-medium"
        >
          <span class="bg-inline-flex items-center">
            <Plus class="w-5 h-5 text-[#6FD0B8]" style="stroke: currentColor" />
          </span>
          <span
            class="font-semibold bg-linear-to-r from-[#6FD0B8] to-[#DFD287] bg-clip-text text-transparent"
          >
            Tambah Data
          </span></button
        >``
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
      <template #cell-no="{ row }"> {{ membersData.indexOf(row) + 1 }}. </template>

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
          id="name"
          label="Nama"
          v-model="formData.name"
          placeholder="Sophia Elizabeth Turner"
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          v-model="formData.email"
          placeholder="sophia@email.com"
        />

        <FormInput
          v-if="!isEditMode"
          id="password"
          label="Password"
          type="password"
          v-model="formData.password"
          placeholder="Minimal 5 karakter"
        />

        <FormInput
          id="position"
          label="Jabatan"
          v-model="formData.position"
          placeholder="Quality Assurance"
        />

        <FormInput
          id="department"
          label="Department"
          v-model="formData.department"
          placeholder="Technology"
        />
      </div>
    </Modal>

    <!-- Delete Modal -->
    <DeleteModal
      :isOpen="isDeleteModalOpen"
      :itemName="`${deleteItem?.name}`"
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
import ActionDropdown from '../components/ActionDropdown.vue'
import Modal from '../components/Modal.vue'
import FormInput from '../components/FormInput.vue'
import DeleteModal from '../components/DeleteModal.vue'
import SearchBar from '../components/SearchBar.vue'
import AlertModal from '../components/AlertModal.vue'
import { memberService } from '../services/memberService'
import { useAlert } from '../composables/useAlert'

const { isAlertOpen, alertConfig, showError, showSuccess, closeAlert } = useAlert()

const searchQuery = ref('')
const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingId = ref(null)
const isDeleteModalOpen = ref(false)
const deleteItem = ref(null)
const isLoading = ref(false)
const membersData = ref([])

const formData = ref({
  name: '',
  email: '',
  password: '',
  position: '',
  department: '',
})

const columns = [
  { key: 'no', label: 'No', headerClass: 'w-16' },
  { key: 'name', label: 'Nama' },
  { key: 'position', label: 'Jabatan' },
  { key: 'department', label: 'Department' },
  { key: 'action', label: 'Action', headerClass: 'w-20' },
]

const filteredData = computed(() => {
  if (!searchQuery.value) return membersData.value

  const query = searchQuery.value.toLowerCase()
  return membersData.value.filter((item) => {
    return (
      item.name?.toLowerCase().includes(query) ||
      item.position?.toLowerCase().includes(query) ||
      item.department?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query)
    )
  })
})

// Fetch members
const fetchMembers = async () => {
  isLoading.value = true
  try {
    const response = await memberService.getAll()
    if (response.data.success) {
      membersData.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching members:', error)
    showError('Gagal memuat data anggota')
  } finally {
    isLoading.value = false
  }
}

const openCreateModal = () => {
  isEditMode.value = false
  formData.value = {
    name: '',
    email: '',
    password: '',
    position: '',
    department: '',
  }
  isModalOpen.value = true
}

const handleEdit = (row) => {
  isEditMode.value = true
  editingId.value = row.id
  formData.value = {
    name: row.name,
    email: row.email,
    password: '', // Don't prefill password
    position: row.position || '',
    department: row.department || '',
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
    const response = await memberService.delete(deleteItem.value.id)
    if (response.data.success) {
      await fetchMembers()
      closeDeleteModal()
      showSuccess('Anggota berhasil dihapus')
    }
  } catch (error) {
    console.error('Error deleting member:', error)
    const message = error.response?.data?.message || 'Gagal menghapus data'
    showError(message)
  }
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveData = async () => {
  try {
    const payload = { ...formData.value }

    // Remove empty password on edit
    if (isEditMode.value && !payload.password) {
      delete payload.password
    }

    let response
    if (isEditMode.value) {
      response = await memberService.update(editingId.value, payload)
    } else {
      response = await memberService.create(payload)
    }

    if (response.data.success) {
      await fetchMembers()
      closeModal()
      showSuccess(isEditMode.value ? 'Anggota berhasil diperbarui' : 'Anggota berhasil ditambahkan')
    }
  } catch (error) {
    console.error('Error saving member:', error)
    const message = error.response?.data?.message || 'Gagal menyimpan data'
    showError(message)
  }
}

onMounted(() => {
  fetchMembers()
})
</script>
