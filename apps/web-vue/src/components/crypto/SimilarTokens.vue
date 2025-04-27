<!-- web-vue/src/components/crypto/SimilarTokens.vue -->
<template>
  <div class="similar-token" :style="{ width: tokenWidth }">
    <div class="token-info">
      <span class="token-name">{{ token.symbol }}</span>
      <span class="token-price">{{ token.price }}</span>
      <span :class="['token-change', token.change24h >= 0 ? 'positive' : 'negative']">
        {{ token.change24h >= 0 ? '+' : '' }}{{ token.change24h }}%
      </span>
    </div>
    <div class="token-chart">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  token: {
    type: Object,
    required: true
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const tokenWidth = computed(() => {
  return `calc(33.33% - 1rem)` // Accounting for gap between items
})

// Initialize chart
onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: props.token.chartData.labels,
        datasets: [
          {
            data: props.token.chartData.values,
            borderColor: 'rgb(53, 162, 235)',
            tension: 0.1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
})
</script>

<style scoped>
.similar-token {
  background: white;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.token-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.token-chart {
  height: 100px;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
}

.positive {
  color: green;
}

.negative {
  color: red;
}
</style>