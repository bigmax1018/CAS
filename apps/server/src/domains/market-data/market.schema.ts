// server/src/domains/market-data/market.schema.ts
/**
 * Market data schema with:
 * - Time series validation
 * - Decimal precision handling
 * - Exchange enum
 */
// server/src/domains/market-data/market.schema.ts
import { z } from 'zod';

// 1. Keep your existing Zod schemas (for validation)
export const Exchange = z.enum(['BINANCE', 'COINBASE', 'KRAKEN']);
export type Exchange = z.infer<typeof Exchange>;

export const MarketDataSchema = z.object({
  id: z.string().uuid().optional(),
  pair: z.string().regex(/^[A-Z]{3,}-[A-Z]{3,}$/),
  price: z.number().positive().finite(),
  volume: z.number().nonnegative().nullable().optional(),
  timestamp: z.date().optional(),
  exchange: Exchange.nullable().optional(),
});

export const CandleStickSchema = z.object({
  open: z.number().positive(),
  high: z.number().positive(),
  low: z.number().positive(),
  close: z.number().positive(),
  volume: z.number().nonnegative(),
  time: z.date()
});

// 2. Add TypeScript interfaces (for type hints)
export interface MarketData extends z.infer<typeof MarketDataSchema> {}
export interface CandleStick extends z.infer<typeof CandleStickSchema> {}

// 3. Extended interface for caching
export interface CachedMarketData extends MarketData {
  _cachedAt: number;
  _expiresIn: number;
}