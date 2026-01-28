<template>
  <div class="bg-white rounded-3xl border border-gray-200 p-6">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  labels: {
    type: Array,
    default: () => [],
  },
  backgroundColor: {
    type: String,
    default: '#8b5cf6',
  },
  borderRadius: {
    type: Number,
    default: 8,
  },
  barThickness: {
    type: Number,
    default: 80,
  },
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: Object.values(props.data),
      backgroundColor: props.backgroundColor,
      borderRadius: props.borderRadius,
      barThickness: props.barThickness,
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
</script>
