// mobile-react/src/screens/DashboardScreen.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/ui/Button'
import { Chart } from '../components/ui/Chart'
import { useMarketData } from '../hooks/useMarketData'

/**
 * Main dashboard screen showing crypto market data
 */
export const DashboardScreen = () => {
  const { marketData, loading, refresh } = useMarketData()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Dashboard</Text>
      
      <Button 
        title="Refresh Data" 
        onPress={refresh} 
        loading={loading}
      />
      
      {marketData && (
        <View style={styles.chartContainer}>
          <Chart data={marketData} />
        </View>
      )}
      
      <View style={styles.statsContainer}>
        <Text>24h Change: {marketData?.change24h}%</Text>
        <Text>Volume: ${marketData?.volume?.toLocaleString()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    height: 300,
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
})