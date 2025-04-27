<!-- web-vue/src/components/crypto/NetworkSelector.vue -->
<template>
  <div class="network-selector">
    <label>Network List</label>
    <select v-model="selectedNetwork" @change="handleNetworkChange">
      <option v-for="network in networks" :key="network" :value="network">
        {{ network }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMarketStore } from '@/stores/market'

const marketStore = useMarketStore()
const selectedNetwork = ref('All')
const networks = ref(['All']) // Will be populated from API

// Fetch networks on mount
onMounted(async () => {
  await marketStore.fetchNetworks()
  networks.value = ['All', ...marketStore.availableNetworks]
})

const handleNetworkChange = () => {
  marketStore.setCurrentNetwork(selectedNetwork.value)
  marketStore.fetchTokenPairs()
}
</script>

<style scoped>
.network-selector {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>