// shared/services/ml.proxy.ts
/**
 * Proxy service for ML predictions - handles communication with Python worker
 */

import { PredictionRequest, PredictionResult } from '../types/ml';
import { ApiClient } from './api/api.client';
const mlClient = new ApiClient();
if (import.meta.env.VITE_ML_API_URL) {
  // Either ensure ApiClient has setBaseUrl or use constructor
  mlClient.setBaseUrl(import.meta.env.VITE_ML_API_URL as string);
}

export class MLProxyService {
  async getPricePrediction(
    request: PredictionRequest
  ): Promise<PredictionResult> {
    try {
      return await mlClient.post('/predict', request);
    } catch (error) {
      console.error('Prediction request failed:', error);
      throw new Error('Prediction service unavailable');
    }
  }

  async getAnomalyDetection(pairId: string): Promise<boolean> {
    try {
      const response = await mlClient.get<{ isAnomaly: boolean }>(`/anomaly/${pairId}`);
      return response.isAnomaly;
    } catch (error) {
      console.error('Anomaly detection failed:', error);
      return false;
    }
  }
}