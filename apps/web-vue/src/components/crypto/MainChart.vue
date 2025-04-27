<!-- web-vue/src/components/crypto/MainChart.vue -->
<template>
  <div class="main-chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useMarketStore } from '@/stores/market'
import Chart from 'chart.js/auto'

const marketStore = useMarketStore()
const chartCanvas = ref(null)
let chartInstance = null

// Initialize chart
onMounted(() => {
  initChart()
})

// Watch for data changes
watch(() => marketStore.chartData, (newData) => {
  updateChart(newData)
}, { deep: true })

const initChart = () => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: marketStore.chartData.labels,
        datasets: [
          {
            label: marketStore.currentPair,
            data: marketStore.chartData.values,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
}

const updateChart = (data) => {
  if (chartInstance) {
    chartInstance.data.labels = data.labels
    chartInstance.data.datasets[0].data = data.values
    chartInstance.data.datasets[0].label = marketStore.currentPair
    chartInstance.update()
  }
}
</script>

<style scoped>
.main-chart {
  flex: 1;
  height: 100%;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>