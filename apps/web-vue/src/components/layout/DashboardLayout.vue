<!-- web-vue/src/components/layout/DashboardLayout.vue -->
<script setup lang="ts">
import Header from '../common/Header.vue'
import Sidebar from '../common/Sidebar.vue'
</script>

<template>
  <div class="dashboard-layout">
    <Header />
    <div class="layout-content">
      <Sidebar />
      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-content {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>