// shared/services/market.service.ts
/**
 * Market domain service - business logic layer for market operations
 * Combines API calls with WebSocket updates and local state management
 */

import { MarketApi } from './api/api';
import { MarketWebSocket } from './api/websocket';
import { Network, TokenPair, PriceTick } from '../types/market';

export class MarketService {
  private socket: MarketWebSocket;
  private activeSubscriptions: Set<string> = new Set();

  constructor() {
    this.socket = new MarketWebSocket(import.meta.env.VITE_WS_URL);
    this.socket.connect();
  }

  async getAvailableNetworks(): Promise<Network[]> {
    try {
      return await MarketApi.getNetworks();
    } catch (error) {
      console.error('Failed to fetch networks:', error);
      throw new Error('Network data unavailable');
    }
  }

  async getTokenPairs(networkId: string): Promise<TokenPair[]> {
    try {
      const pairs = await MarketApi.getTokenPairs(networkId);
      return pairs.sort((a, b) => b.volume24h - a.volume24h);
    } catch (error) {
      console.error(`Failed to fetch pairs for network ${networkId}:`, error);
      throw new Error('Token pair data unavailable');
    }
  }

  subscribeToPriceUpdates(
    pairId: string, 
    callback: (tick: PriceTick) => void
  ): () => void {
    if (!this.activeSubscriptions.has(pairId)) {
      this.socket.subscribe(pairId, callback);
      this.activeSubscriptions.add(pairId);
    }

    return () => {
      this.socket.unsubscribe(pairId);
      this.activeSubscriptions.delete(pairId);
    };
  }

  // Additional market-related methods...
}