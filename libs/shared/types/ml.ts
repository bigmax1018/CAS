// shared/types/ml.ts
/**
 * Machine learning prediction types
 */

export interface PredictionRequest {
    pairId: string;
    timeframe: string;
    modelVersion?: string;
  }
  
export interface PredictionResult {
    predictedPrice: number;
    confidence: number;
    direction: 'up' | 'down' | 'neutral';
    indicators: {
      rsi?: number;
      macd?: number;
    };
  }

export interface MLPrediction {
    // Define the shape of your MLPrediction here
    // For example:
    id: string;
    request: PredictionRequest;
    result: PredictionResult;
    timestamp: string;
    price: number;
    confidence: number;
  }