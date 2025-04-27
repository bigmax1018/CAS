// mobile-react/src/screens/HomeScreen.tsx
import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useAuth } from '../hooks/useAuth'

/**
 * Home screen with welcome message and auth navigation
 */
export const HomeScreen = ({ navigation }) => {
  const { isAuthenticated } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CAS</Text>
      
      {isAuthenticated ? (
        <Button
          title="Go to Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
        />
      ) : (
        <>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  }
})