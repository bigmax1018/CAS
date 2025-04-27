// web-vue/src/stores/market.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Network, TokenPair, Timeframe } from '../../shared/types/market'

/**
 * Store for managing market data and selections
 */
export const useMarketStore = defineStore('market', () => {
  // State
  const selectedNetwork = ref<Network>('All')
  const selectedTokenPair = ref<TokenPair | null>(null)
  const selectedTimeframe = ref<Timeframe>('15s')
  const showReferenceToken = ref(false)
  
  // List data
  const networks = ref<Network[]>(['All', 'Ethereum', 'Binance', 'Polygon'])
  const tokenPairs = ref<TokenPair[]>([])
  
  // Getters
  const filteredTokenPairs = computed(() => {
    if (selectedNetwork.value === 'All') return tokenPairs.value
    return tokenPairs.value.filter(pair => pair.network === selectedNetwork.value)
  })
  
  // Actions
  async function fetchTokenPairs() {
    // TODO: Implement API call to fetch token pairs
  }
  
  function setTimeframe(timeframe: Timeframe) {
    selectedTimeframe.value = timeframe
  }
  
  function toggleReferenceToken() {
    showReferenceToken.value = !showReferenceToken.value
  }
  
  return {
    // State
    selectedNetwork,
    selectedTokenPair,
    selectedTimeframe,
    showReferenceToken,
    networks,
    tokenPairs,
    
    // Getters
    filteredTokenPairs,
    
    // Actions
    fetchTokenPairs,
    setTimeframe,
    toggleReferenceToken
  }
})