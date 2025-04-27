// mobile-react/src/components/common/Footer.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

/**
 * App footer component
 */
export const Footer = () => (
  <View style={styles.container}>
    <Text style={styles.text}>CAS Mobile © {new Date().getFullYear()}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#f8f9fa',
    alignItems: 'center'
  },
  text: {
    fontSize: 12,
    color: '#6c757d'
  }
})