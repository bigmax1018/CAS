// mobile-react/src/components/common/Header.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface HeaderProps {
  title: string
}

/**
 * App header component with title
 */
export const Header: React.FC<HeaderProps> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#3498db',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
})