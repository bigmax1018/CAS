<!-- web-vue/src/components/crypto/LiveDashboard.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWebSocket } from '@/composables/useWebSocket'
import * as echarts from 'echarts'

const props = defineProps<{
  pair: string
}>()

const chart = ref<HTMLElement | null>(null)
let echart: echarts.ECharts

// Candlestick data structure
interface Candle {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

const candles = ref<Candle[]>([])

// Setup WebSocket
const { subscribe } = useWebSocket()
onMounted(() => {
  echart = echarts.init(chart.value)
  
  subscribe(`candles:${props.pair}`, (data: Candle) => {
    candles.value.push(data)
    if (candles.value.length > 200) {
      candles.value.shift()
    }
    updateChart()
  })

  // Initial chart config
  echart.setOption({
    tooltip: { trigger: 'axis' },
    grid: [{ left: '10%', right: '10%', bottom: '15%' }],
    xAxis: { type: 'category', data: [] },
    yAxis: { scale: true },
    series: [
      {
        type: 'candlestick',
        data: [],
        itemStyle: {
          color: '#ef5350',
          color0: '#26a69a',
          borderColor: '#ef5350',
          borderColor0: '#26a69a'
        }
      },
      {
        type: 'bar',
        name: 'Volume',
        data: [],
        itemStyle: {
          color: (params: any) => 
            params.data[1] > params.data[0] ? '#26a69a' : '#ef5350'
        },
        yAxisIndex: 1
      }
    ]
  })
})

function updateChart() {
  const times = candles.value.map(c => c.time)
  const candleData = candles.value.map(c => [
    c.open,
    c.close,
    c.low,
    c.high
  ])
  const volumes = candles.value.map((c, i) => [
    i,
    c.volume,
    c.close > c.open ? 1 : -1
  ])

  echart.setOption({
    xAxis: { data: times },
    series: [
      { data: candleData },
      { data: volumes }
    ]
  })
}
</script>

<template>
  <div class="dashboard">
    <div ref="chart" style="width: 100%; height: 500px;"></div>
    <div class="stats">
      <LiveStats :pair="pair" />
      <OrderBook :pair="pair" />
    </div>
  </div>
</template>