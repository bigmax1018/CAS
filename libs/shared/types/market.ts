// shared/types/market.ts
/**
 * Market data types and interfaces
 * Includes:
 * - Token/network definitions
 * - Price data structures
 * - Market metadata
 */

export interface Network {
    id: string;
    name: string;
    isActive: boolean;
    nativeToken: string;
  }
  
  export interface TokenPair {
    base: string;
    quote: string;
    networkId: string;
    lastPrice: number;
    change24h: number;
    volume24h: number;
  }
  
  export interface PriceTick {
    timestamp: number;
    price: number;
    volume: number;
    pairId: string; 
  }
  
  export interface Timeframe {
    value: string;
    label: string;
    intervalMs: number;
  }

  export interface Token {
    address: string;
    symbol: string;
    decimals: number;
  }
  
  export interface PredictionRequest {
    pairId: string;
    timeframe: string;
    modelVersion?: string;
  }

  export interface PredictionResult {
    prediction: number;
    confidence: number;
    nextUpdate: number;
  }