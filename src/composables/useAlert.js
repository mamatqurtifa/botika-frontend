import { ref } from 'vue'

const isAlertOpen = ref(false)
const alertConfig = ref({
  type: 'info',
  title: '',
  message: '',
  buttonText: 'OK',
})

export function useAlert() {
  const showAlert = (options) => {
    alertConfig.value = {
      type: options.type || 'info',
      title: options.title || getTitleByType(options.type),
      message: options.message,
      buttonText: options.buttonText || 'OK',
    }
    isAlertOpen.value = true
  }

  const closeAlert = () => {
    isAlertOpen.value = false
  }

  const getTitleByType = (type) => {
    const titles = {
      success: 'Berhasil',
      error: 'Error',
      warning: 'Peringatan',
      info: 'Informasi',
    }
    return titles[type] || 'Informasi'
  }

  const showSuccess = (message, title) => {
    showAlert({ type: 'success', message, title })
  }

  const showError = (message, title) => {
    showAlert({ type: 'error', message, title })
  }

  const showWarning = (message, title) => {
    showAlert({ type: 'warning', message, title })
  }

  const showInfo = (message, title) => {
    showAlert({ type: 'info', message, title })
  }

  return {
    isAlertOpen,
    alertConfig,
    showAlert,
    closeAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
