<!-- web-vue/src/components/crypto/TimeframeSelector.vue -->
<template>
  <div class="timeframe-selector">
    <label>Time</label>
    <select v-model="selectedTimeframe" @change="handleTimeframeChange">
      <option v-for="tf in timeframes" :key="tf.value" :value="tf.value">
        {{ tf.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMarketStore } from '@/stores/market'

const marketStore = useMarketStore()
const selectedTimeframe = ref('15s')

const timeframes = [
  { value: '15s', label: '15 seconds' },
  { value: '1m', label: '1 minute' },
  { value: '5m', label: '5 minutes' },
  { value: '15m', label: '15 minutes' },
  { value: '1h', label: '1 hour' },
  { value: '4h', label: '4 hours' },
  { value: '1d', label: '1 day' },
]

const handleTimeframeChange = () => {
  marketStore.setCurrentTimeframe(selectedTimeframe.value)
}
</script>

<style scoped>
.timeframe-selector {
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