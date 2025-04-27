<!-- web-vue/src/components/crypto/TokenPairSelector.vue -->
<template>
  <div class="token-pair-selector">
    <label>Token List</label>
    <select v-model="selectedTokenPair" @change="handleTokenPairChange">
      <option 
        v-for="pair in filteredTokenPairs" 
        :key="pair.symbol" 
        :value="pair.symbol"
      >
        {{ pair.symbol }} ({{ pair.price }}) {{ pair.change24h >= 0 ? '+' : '' }}{{ pair.change24h }}%
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMarketStore } from '@/stores/market'

const marketStore = useMarketStore()
const selectedTokenPair = ref('')

const filteredTokenPairs = computed(() => {
  return marketStore.availableTokenPairs.filter(pair => {
    if (marketStore.currentNetwork === 'All') return true
    return pair.network === marketStore.currentNetwork
  })
})

const handleTokenPairChange = () => {
  marketStore.setCurrentTokenPair(selectedTokenPair.value)
}
</script>

<style scoped>
.token-pair-selector {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 200px;
}
</style>