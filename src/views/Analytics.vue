<template>
  <div>
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Analytics Content -->
    <template v-else>
      <!-- Stats Grid -->
      <StatsGrid :stats="statsData" />

      <!-- Bar Chart -->
      <BarChart
        :data="chartData"
        :labels="chartLabels"
        :backgroundColor="chartConfig.backgroundColor"
        :borderRadius="chartConfig.borderRadius"
        :barThickness="chartConfig.barThickness"
      />
    </template>

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
import { computed, onMounted } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import StatsGrid from '../components/StatsGrid.vue'
import BarChart from '../components/BarChart.vue'
import AlertModal from '../components/AlertModal.vue'
import { useAnalytics } from '../composables/useAnalytics'
import { useAlert } from '../composables/useAlert'
import { analyticsStatsConfig, chartLabels, chartConfig } from '../config/analyticsConfig'

const { isAlertOpen, alertConfig, closeAlert } = useAlert()
const { isLoading, analyticsData, chartData, fetchAnalytics } = useAnalytics()

// Map stats config with actual data
const statsData = computed(() => {
  return analyticsStatsConfig.map((stat) => ({
    ...stat,
    value: analyticsData.value[stat.key] || 0,
  }))
})

onMounted(() => {
  fetchAnalytics()
})
</script>
