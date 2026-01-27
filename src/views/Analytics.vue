<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard
        label="Barang Baik"
        :value="25"
        :icon="CheckCircle"
        iconBgClass="bg-green-100"
        iconColorClass="text-green-600"
      />
      <StatsCard
        label="Barang Rusak"
        :value="20"
        :icon="AlertTriangle"
        iconBgClass="bg-red-100"
        iconColorClass="text-red-600"
      />
      <StatsCard
        label="Dilelang"
        :value="10"
        :icon="Tag"
        iconBgClass="bg-orange-100"
        iconColorClass="text-orange-600"
      />
      <StatsCard
        label="Tidak Dipakai"
        :value="10"
        :icon="XCircle"
        iconBgClass="bg-gray-100"
        iconColorClass="text-gray-600"
      />
    </div>

    <!-- Chart -->
    <div class="bg-white rounded-xl border border-gray-200 p-6">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartData = {
  labels: ['Barang Baik', 'Barang Rusak', 'Dilelang', 'Tidak Dipakai'],
  datasets: [
    {
      data: [25, 20, 10, 10],
      backgroundColor: '#8b5cf6',
      borderRadius: 8,
      barThickness: 80,
    },
  ],
}

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
      max: 100,
      ticks: {
        stepSize: 20,
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
</script>
