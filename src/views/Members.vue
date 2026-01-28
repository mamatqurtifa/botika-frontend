<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Management Anggota"
      v-model:searchQuery="searchQuery"
      searchPlaceholder="Search Anggota"
      addButtonText="Tambah Anggota"
      @add="openCreateModal"
    />

    <!-- Loading State -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Data Table -->
    <DataTable v-else :columns="columns" :data="filteredData">
      <template #cell-no="{ row }"> {{ data.indexOf(row) + 1 }}. </template>

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
import { onMounted } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import DataTable from '../components/DataTable.vue'
import ActionDropdown from '../components/ActionDropdown.vue'
import Modal from '../components/Modal.vue'
import FormInput from '../components/FormInput.vue'
import DeleteModal from '../components/DeleteModal.vue'
import AlertModal from '../components/AlertModal.vue'
import { memberService } from '../services/memberService'
import { useCrud } from '../composables/useCrud'
import { useAlert } from '../composables/useAlert'

const { isAlertOpen, alertConfig, closeAlert } = useAlert()

const {
  data,
  isLoading,
  searchQuery,
  isModalOpen,
  isEditMode,
  isDeleteModalOpen,
  deleteItem,
  formData,
  filteredData,
  fetchData,
  openCreateModal,
  handleEdit,
  openDeleteModal,
  closeDeleteModal,
  confirmDelete,
  closeModal,
  saveData,
} = useCrud(memberService, {
  entityName: 'Anggota',
  initialFormData: {
    name: '',
    email: '',
    password: '',
    position: '',
    department: '',
  },
  searchFields: ['name', 'position', 'department', 'email'],
  mapToForm: (row) => ({
    name: row.name,
    email: row.email,
    password: '',
    position: row.position || '',
    department: row.department || '',
  }),
  beforeSave: (payload, isEdit) => {
    if (isEdit && !payload.password) {
      delete payload.password
    }
    return payload
  },
})

const columns = [
  { key: 'no', label: 'No', headerClass: 'w-16' },
  { key: 'name', label: 'Nama' },
  { key: 'position', label: 'Jabatan' },
  { key: 'department', label: 'Department' },
  { key: 'action', label: 'Action', headerClass: 'w-20' },
]

onMounted(() => {
  fetchData()
})
</script>
