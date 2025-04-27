// shared/stores/ml.store.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MLPrediction } from '../types/ml'

/**
 * Store for machine learning predictions and models
 */
export const useMLStore = defineStore('ml', () => {
  const predictions = ref<Record<string, MLPrediction>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)
  // 1. First ensure you have a proper ID generation method
  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

  const createPrediction = (
    tokenPair: string, 
    priceValue: number, 
    confidenceValue: number
  ): MLPrediction => {
    return {
      id: generateId(),
      request: {
        pairId: tokenPair,
        timeframe: '1h', // Default timeframe
        modelVersion: '1.0' // Default version
      },
      result: {
        predictedPrice: priceValue,
        confidence: confidenceValue,
        direction: confidenceValue > 0.7 ? 'up' : 
                  confidenceValue < 0.3 ? 'down' : 'neutral',
        indicators: {}
      },
      timestamp: new Date().toISOString(),
      price: priceValue,
      confidence: confidenceValue
    };
  };
  
  // 3. Usage example with your store
  const price = 123.45; // Your actual price value
  const confidence = 0.8; // Your actual confidence value (0-1)
  const tokenPair = "BTC-USD"; // Your token pair
  
  predictions.value[tokenPair] = createPrediction(tokenPair, price, confidence);

  const fetchPrediction = async (tokenPair: string) => {
    try {
      loading.value = true
      error.value = null
      // TODO: Implement API call to fetch prediction
      predictions.value[tokenPair] = {
        id: generateId(), // Add a unique ID
        request: {        // Add request data
          pairId: tokenPair,
          timeframe: '1h', // Or your default timeframe
          modelVersion: '1.0' // If needed
        },
        result: {         // Add result data
          predictedPrice: price,
          confidence: confidence,
          direction: 'neutral', // Default direction
          indicators: {}
        },
        timestamp: new Date().toISOString(),
        price: price,
        confidence: confidence
      };
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Prediction failed'
    } finally {
      loading.value = false
    }
  }

  return {
    predictions,
    loading,
    error,
    fetchPrediction
  }
})