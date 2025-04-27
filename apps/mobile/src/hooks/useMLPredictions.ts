// mobile-react/src/hooks/useMLPredictions.ts
import { useState } from 'react'
import { MLService } from '../../shared/services/ml.proxy'

/**
 * Hook for fetching ML predictions
 */
export const useMLPredictions = () => {
  const [predictions, setPredictions] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPredictions = async (tokenPair: string) => {
    try {
      setLoading(true)
      setError(null)
      const result = await MLService.getPredictions(tokenPair)
      setPredictions(result)
      return result
    } catch (err) {
      setError(err.message || 'Failed to fetch predictions')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    predictions,
    loading,
    error,
    fetchPredictions
  }
}