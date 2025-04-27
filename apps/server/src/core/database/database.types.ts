// server/src/core/database/database.types.ts
import { MarketData } from '../../domains/market-data/market.schema';

export interface DatabaseClient {
  getLatestMarketData(pair: string): Promise<MarketData | null>;
  insertMarketData(data: MarketData): Promise<void>;
  // Add other methods as needed
}