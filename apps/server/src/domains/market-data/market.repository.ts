// server/src/domains/market-data/market.repository.ts
/**
 * Market data repository
 * Handles database operations for market data
 * Abstracts data source implementation
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NetworkEntity, TokenPairEntity, PriceTickEntity } from './market.entity';

@Injectable()
export class MarketRepository {
  constructor(
    @InjectRepository(NetworkEntity)
    private networkRepo: Repository<NetworkEntity>,
    @InjectRepository(TokenPairEntity)
    private pairRepo: Repository<TokenPairEntity>,
    @InjectRepository(PriceTickEntity)
    private priceRepo: Repository<PriceTickEntity>
  ) {}

  async findActiveNetworks(): Promise<NetworkEntity[]> {
    return this.networkRepo.find({ 
      where: { isActive: true },
      order: { name: 'ASC' }
    });
  }

  async findTokenPairs(networkId: string): Promise<TokenPairEntity[]> {
    return this.pairRepo.find({
      where: { networkId },
      order: { volume24h: 'DESC' }
    });
  }

  async findPriceHistory(
    pairId: string,
    timeframe: string
  ): Promise<PriceTickEntity[]> {
    const interval = this.getInterval(timeframe);
    return this.priceRepo.query(`
      SELECT * FROM price_ticks
      WHERE pair_id = $1
      AND timestamp >= NOW() - INTERVAL '${interval}'
      ORDER BY timestamp ASC
    `, [pairId]);
  }

  private getInterval(timeframe: string): string {
    const intervals = {
      '15s': '15 seconds',
      '30s': '30 seconds',
      '1m': '1 minute',
      '5m': '5 minutes',
      '1h': '1 hour',
      '1d': '1 day'
    };
    return intervals[timeframe] || '1 hour';
  }
}