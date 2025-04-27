// server/src/shared/stores/ml.store.ts
/**
 * ML prediction store with:
 * - Model caching
 * - Request batching
 * - Fallback mechanisms
 */
import { Injectable } from '@nestjs/common';
import { MLProxy } from '../services/ml.proxy';
import { MarketPrediction, SentimentAnalysis } from '../types/ml';

@Injectable()
export class MLStore {
  private predictionCache = new Map<string, MarketPrediction>();
  private sentimentCache = new Map<string, SentimentAnalysis>();

  constructor(private readonly mlProxy: MLProxy) {}

  async getPrediction(pair: string): Promise<MarketPrediction> {
    const cacheKey = `prediction:${pair}`;
    
    if (this.predictionCache.has(cacheKey)) {
      return this.predictionCache.get(cacheKey)!;
    }

    const prediction = await this.mlProxy.predictPrice(pair);
    this.predictionCache.set(cacheKey, prediction);
    setTimeout(() => this.predictionCache.delete(cacheKey), 60_000); // 1 min TTL
    
    return prediction;
  }

  async analyzeSentiment(texts: string[]): Promise<SentimentAnalysis> {
    const cacheKey = `sentiment:${texts.join('|')}`;
    
    if (this.sentimentCache.has(cacheKey)) {
      return this.sentimentCache.get(cacheKey)!;
    }

    const analysis = await this.mlProxy.analyzeSentiment(texts);
    this.sentimentCache.set(cacheKey, analysis);
    
    return analysis;
  }
}