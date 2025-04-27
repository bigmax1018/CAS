<!-- web-vue/src/pages/Dashboard.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useMarketStore } from '../stores/market'
import CryptoDashboard from '../components/crypto/CryptoDashboard.vue'

const marketStore = useMarketStore()

onMounted(() => {
  marketStore.fetchTokenPairs()
})
</script>

<template>
  <div class="dashboard-page">
    <CryptoDashboard />
  </div>
</template>