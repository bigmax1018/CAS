// server/src/infrastructure/cache/market.cache.ts
/**
 * Market data cache layer using Redis
 * Implements fallback to DB when cache fails
 */
// server/src/infrastructure/cache/market.cache.ts
import { MarketData } from '../../domains/market-data/market.schema';
import { DatabaseError } from '../../core/exceptions/database.error';
import redis from './redis.client';
import { logger } from '../../core/utils/logger';

export class MarketCache {
  private readonly CACHE_TTL = 60 * 5; // 5 minutes

  async getLatestPrices(pair: string): Promise<MarketData | null> {
    try {
      // Try Redis first
      const cached = await redis.get(`market:${pair}`);
      if (cached) {
        const data = JSON.parse(cached) as MarketData;
        logger.debug('Cache hit', { pair });
        return data;
      }

      // Fallback to database
      const dbData = await this.queryDatabase(pair);
      if (dbData) {
        await this.setCache(pair, dbData);
      }
      return dbData;
    } catch (error) {
      logger.error('Failed to get market data', {
        error,
        pair,
        operation: 'getLatestPrices'
      });
      throw new DatabaseError('Failed to fetch market data', {
        cause: error instanceof Error ? error : undefined
      });
    }
  }

  private async queryDatabase(pair: string): Promise<MarketData | null> {
    // Implement with your actual database client
    // Example with Prisma:
    // return await prisma.marketData.findFirst({...});
    throw new Error('Database implementation missing');
  }

  private async setCache(pair: string, data: MarketData): Promise<void> {
    try {
      await redis.setEx(
        `market:${pair}`,
        this.CACHE_TTL,
        JSON.stringify({
          ...data,
          _cachedAt: Date.now(),
          _expiresIn: this.CACHE_TTL
        })
      );
    } catch (error) {
      logger.error('Failed to set cache', {
        error,
        pair,
        operation: 'setCache'
      });
      // Fail silently for cache errors
    }
  }

  private async getFromDbFallback(pair: string): Promise<MarketData | null> {
    try {
      return await this.queryDatabase(pair);
    } catch (err) {
      logger.error('DB fallback failed', {
        error: err.message,
        stack: err.stack,
        pair,
      });
      throw new DatabaseError('Failed to fetch market data');
    }
  }
}