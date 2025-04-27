<!-- web-vue/src/components/layout/DefaultLayout.vue -->
<script setup lang="ts">
import Header from '../common/Header.vue'
import Footer from '../common/Footer.vue'
import Sidebar from '../common/Sidebar.vue'
import Breadcrumb from '../common/Breadcrumb.vue'
</script>

<template>
  <div class="default-layout">
    <Header />
    <div class="layout-container">
      <Sidebar />
      <main class="main-content">
        <Breadcrumb />
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.layout-container {
  display: flex;
  flex: 1;
}
.main-content {
  flex: 1;
  padding: 20px;
}
</style>