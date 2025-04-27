<!-- web-vue/src/components/ui/Chart.vue -->
<script setup lang="ts">
/**
 * Reusable chart component
 * Wrapper for charting library (e.g., Chart.js, ECharts)
 * Handles data updates and responsive sizing
 */

import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import type { PriceTick } from '../../../shared/types/market';

const props = defineProps<{
  data: PriceTick[];
  options?: object;
}>();

const chartCanvas = ref<HTMLCanvasElement>();
let chartInstance: any = null;

const initChart = () => {
  if (!chartCanvas.value) return;
  
  // Initialize chart library with props.data
  // Example for Chart.js:
  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: formatChartData(props.data),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      ...props.options
    }
  });
};

const formatChartData = (ticks: PriceTick[]) => ({
  labels: ticks.map(t => new Date(t.timestamp).toLocaleTimeString()),
  datasets: [{
    label: 'Price',
    data: ticks.map(t => t.price),
    borderColor: '#4f46e5',
    tension: 0.1
  }]
});

const updateChart = () => {
  if (!chartInstance) return;
  chartInstance.data = formatChartData(props.data);
  chartInstance.update();
};

useResizeObserver(chartCanvas, () => {
  chartInstance?.resize();
});

onMounted(initChart);
watch(() => props.data, updateChart);
onBeforeUnmount(() => chartInstance?.destroy());
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>