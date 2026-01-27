<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div
        class="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <template v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Barang Baik"
          :value="analyticsData.baik || 0"
          :icon="CheckCircle"
          iconBgClass="bg-green-100"
          iconColorClass="text-green-600"
        />
        <StatsCard
          label="Barang Rusak"
          :value="analyticsData.rusak || 0"
          :icon="AlertTriangle"
          iconBgClass="bg-red-100"
          iconColorClass="text-red-600"
        />
        <StatsCard
          label="Dilelang"
          :value="analyticsData.dilelang || 0"
          :icon="Tag"
          iconBgClass="bg-orange-100"
          iconColorClass="text-orange-600"
        />
        <StatsCard
          label="Tidak Dipakai"
          :value="analyticsData.tidak_dipakai || 0"
          :icon="XCircle"
          iconBgClass="bg-gray-100"
          iconColorClass="text-gray-600"
        />
      </div>

      <!-- Chart -->
      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CheckCircle, AlertTriangle, Tag, XCircle } from 'lucide-vue-next'
import StatsCard from '../components/StatsCard.vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { analyticsService } from '../services/analyticsService'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const isLoading = ref(false)
const analyticsData = ref({
  baik: 0,
  rusak: 0,
  tidak_dipakai: 0,
  dilelang: 0,
})

const chartData = computed(() => ({
  labels: ['Barang Baik', 'Barang Rusak', 'Dilelang', 'Tidak Dipakai'],
  datasets: [
    {
      data: [
        analyticsData.value.baik,
        analyticsData.value.rusak,
        analyticsData.value.dilelang,
        analyticsData.value.tidak_dipakai,
      ],
      backgroundColor: '#8b5cf6',
      borderRadius: 8,
      barThickness: 80,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2.5,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1f2937',
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 14,
        weight: 'bold',
      },
      bodyFont: {
        size: 13,
      },
      displayColors: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
        font: {
          size: 12,
        },
        color: '#6b7280',
      },
      grid: {
        color: '#e5e7eb',
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 13,
        },
        color: '#374151',
      },
      grid: {
        display: false,
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
  },
}

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
    alert('Gagal memuat data analytics')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchAnalytics()
})
</script>
