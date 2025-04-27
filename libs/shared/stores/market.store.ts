// shared/stores/market.store.ts
/**
 * Market data store - manages all market-related state
 */

import { defineStore } from 'pinia';
import { Network, TokenPair } from '../types/market';
import { MarketService } from '../services/market.service';

interface MarketState {
  networks: Network[];
  selectedNetwork: Network | null;
  tokenPairs: TokenPair[];
  selectedPair: TokenPair | null;
  isLoading: boolean;
}

export const useMarketStore = defineStore('market', {
  state: (): MarketState => ({
    networks: [],
    selectedNetwork: null,
    tokenPairs: [],
    selectedPair: null,
    isLoading: false
  }),

  actions: {
    async loadNetworks() {
      this.isLoading = true;
      try {
        this.networks = await new MarketService().getAvailableNetworks();
        if (this.networks.length) {
          this.selectedNetwork = this.networks[0];
        }
      } finally {
        this.isLoading = false;
      }
    },

    async loadTokenPairs(networkId: string) {
      this.isLoading = true;
      try {
        this.tokenPairs = await new MarketService().getTokenPairs(networkId);
      } finally {
        this.isLoading = false;
      }
    },

    selectPair(pair: TokenPair) {
      this.selectedPair = pair;
    }
  },

  getters: {
    availablePairs: (state) => state.tokenPairs,
    currentNetwork: (state) => state.selectedNetwork
  }
});