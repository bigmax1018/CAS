<!-- web-vue/src/pages/markets/Overview.vue -->
<script setup lang="ts">
/**
 * Market overview page
 * Displays network selection and token pair listings
 */

import { ref, onMounted } from 'vue';
import { useMarketStore } from '../../../shared/stores/market.store';

const marketStore = useMarketStore();
const searchQuery = ref('');

onMounted(async () => {
  await marketStore.loadNetworks();
  if (marketStore.currentNetwork) {
    await marketStore.loadTokenPairs(marketStore.currentNetwork.id);
  }
});

const filteredPairs = computed(() => {
  return marketStore.availablePairs.filter(pair => 
    pair.base.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    pair.quote.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="markets-overview">
    <div class="network-selector">
      <select 
        v-model="marketStore.selectedNetwork"
        @change="marketStore.loadTokenPairs(marketStore.selectedNetwork.id)"
      >
        <option 
          v-for="network in marketStore.networks" 
          :key="network.id" 
          :value="network"
        >
          {{ network.name }}
        </option>
      </select>
    </div>

    <div class="search-box">
      <input 
        v-model="searchQuery" 
        placeholder="Search tokens..." 
      />
    </div>

    <div class="token-list">
      <div 
        v-for="pair in filteredPairs" 
        :key="pair.id"
        class="token-item"
        @click="marketStore.selectPair(pair)"
      >
        <span class="pair">{{ pair.base }}/{{ pair.quote }}</span>
        <span class="price">{{ pair.lastPrice }}</span>
        <span 
          class="change" 
          :class="{ positive: pair.change24h >= 0, negative: pair.change24h < 0 }"
        >
          {{ pair.change24h }}%
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Market overview styles */
</style>