// server/src/core/database/prisma.types.ts
import { MarketData, Exchange } from '../../domains/market-data/market.schema';
import { PrismaClient, Prisma } from '@prisma/client';

// Type guard for Exchange enum
const isExchange = (value: unknown): value is Exchange => 
    ['BINANCE', 'COINBASE', 'KRAKEN'].includes(String(value));

export type MarketDataCreateInput = Prisma.MarketDataCreateInput;
export type PrismaMarketData = Prisma.MarketDataGetPayload<{}>;
// export type PrismaMarketData = Prisma.MarketDataGetPayload<{
//   select: {
//     id: true;
//     pair: true;
//     price: true;
//     volume: true;
//     timestamp: true;
//     exchange: true;
//   }
// }>;

export const toMarketData = (data: PrismaMarketData): MarketData => ({
    ...data,
    volume: data.volume ?? undefined,
    exchange: isExchange(data.exchange) ? data.exchange : undefined
  });

//   export function toMarketData(data: PrismaMarketData): MarketData {
//     return {
//       id: data.id,
//       pair: data.pair,
//       price: data.price,
//       volume: data.volume ?? null,
//       exchange: data.exchange ?? null,
//       timestamp: data.timestamp,
//     };
//   }