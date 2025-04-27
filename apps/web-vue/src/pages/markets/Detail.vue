<!-- web-vue/src/pages/markets/Detail.vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useMarketStore } from '../../stores/market'
import MainChart from '../../components/crypto/MainChart.vue'

const route = useRoute()
const marketStore = useMarketStore()
const tokenPair = ref<string>(route.params.pair as string)

onMounted(() => {
  marketStore.fetchTokenPairs()
  if (tokenPair.value) {
    marketStore.selectTokenPair(tokenPair.value)
  }
})
</script>

<template>
  <div class="market-detail">
    <h2>{{ tokenPair }} Market</h2>
    <MainChart />
    <div class="market-info">
      <!-- Additional market details would go here -->
    </div>
  </div>
</template>