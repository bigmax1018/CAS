// web-vue/src/composables/useWebSocket.ts
import { ref, onUnmounted } from 'vue'
import { useMarketStore } from '../stores/market'

/**
 * WebSocket composable for real-time market data
 */
export function useWebSocket() {
  const marketStore = useMarketStore()
  const socket = ref<WebSocket | null>(null)
  const connected = ref(false)

  const connect = (url: string) => {
    socket.value = new WebSocket(url)

    socket.value.onopen = () => {
      connected.value = true
      console.log('WebSocket connected')
    }

    socket.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      marketStore.updateMarketData(data)
    }

    socket.value.onclose = () => {
      connected.value = false
      console.log('WebSocket disconnected')
    }

    socket.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  const disconnect = () => {
    if (socket.value) {
      socket.value.close()
    }
  }

  onUnmounted(() => {
    disconnect()
  })

  return {
    connected,
    connect,
    disconnect,
  }
}