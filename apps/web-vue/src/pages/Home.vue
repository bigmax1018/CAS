<!-- web-vue/src/pages/Home.vue -->
<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
const { isAuthenticated } = useAuth()
</script>

<template>
  <div class="home-page">
    <h1>Welcome to CAS</h1>
    <p v-if="!isAuthenticated">Please login to access the dashboard</p>
    <router-link v-else to="/dashboard">Go to Dashboard</router-link>
  </div>
</template>

<style scoped>
.home-page {
  text-align: center;
  padding: 2rem;
}
</style>