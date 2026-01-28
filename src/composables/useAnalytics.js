import { ref, computed } from 'vue'
import { analyticsService } from '../services/analyticsService'
import { useAlert } from './useAlert'

export function useAnalytics() {
  const { showError } = useAlert()

  const isLoading = ref(false)
  const analyticsData = ref({
    baik: 0,
    rusak: 0,
    tidak_dipakai: 0,
    dilelang: 0,
  })

  // Fetch analytics data
  const fetchAnalytics = async () => {
    isLoading.value = true
    try {
      const response = await analyticsService.getData()
      if (response.data.success) {
        analyticsData.value = response.data.data
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      showError('Gagal memuat data analytics')
    } finally {
      isLoading.value = false
    }
  }

  // Chart data computed
  const chartData = computed(() => ({
    baik: analyticsData.value.baik || 0,
    rusak: analyticsData.value.rusak || 0,
    dilelang: analyticsData.value.dilelang || 0,
    tidak_dipakai: analyticsData.value.tidak_dipakai || 0,
  }))

  return {
    isLoading,
    analyticsData,
    chartData,
    fetchAnalytics,
  }
}
