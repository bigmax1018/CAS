// mobile-react/src/components/auth/LoginForm.tsx
import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'
import { useAuth } from '../../hooks/useAuth'

/**
 * Login form component with email/password fields
 */
export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuth()

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={() => login(email, password)}
        disabled={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4
  },
  error: {
    color: 'red',
    marginBottom: 12
  }
})