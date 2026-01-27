<template>
  <div class="flex h-screen bg-white">
    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <div class="p-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
</script>
