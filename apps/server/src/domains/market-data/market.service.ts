// server/src/domains/market-data/market.service.ts
/**
 * Market domain service - server side
 * Contains business logic for market data operations
 */

import { Injectable } from '@nestjs/common';
import { MarketRepository } from './market.repository';
import { Network, TokenPair } from '../../../../shared/types/market';
import { CacheService } from '../../infrastructure/cache/market.cache';

@Injectable()
export class MarketService {
  constructor(
    private readonly repository: MarketRepository,
    private readonly cache: CacheService
  ) {}

  async getActiveNetworks(): Promise<Network[]> {
    const cacheKey = 'active-networks';
    const cached = await this.cache.get<Network[]>(cacheKey);
    
    if (cached) return cached;

    const networks = await this.repository.findActiveNetworks();
    await this.cache.set(cacheKey, networks, 60); // Cache for 1 minute
    return networks;
  }

  async getTokenPairs(networkId: string): Promise<TokenPair[]> {
    const cacheKey = `token-pairs:${networkId}`;
    const cached = await this.cache.get<TokenPair[]>(cacheKey);
    
    if (cached) return cached;

    const pairs = await this.repository.findTokenPairs(networkId);
    await this.cache.set(cacheKey, pairs, 30); // Cache for 30 seconds
    return pairs;
  }

  async getPriceHistory(
    pairId: string,
    timeframe: string
  ): Promise<PriceTick[]> {
    return this.repository.findPriceHistory(pairId, timeframe);
  }
}