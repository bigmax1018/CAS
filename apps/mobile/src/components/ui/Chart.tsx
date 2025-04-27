// mobile-react/src/components/ui/Chart.tsx
import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

interface ChartProps {
  data: {
    labels: string[]
    datasets: {
      data: number[]
    }[]
  }
}

/**
 * Crypto price chart component using react-native-chart-kit
 */
export const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#3498db'
          }
        }}
        bezier
        style={styles.chart}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 16
  },
  chart: {
    borderRadius: 16
  }
})