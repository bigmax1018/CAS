// mobile-react/src/components/auth/RegisterForm.tsx
import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'
import { useAuth } from '../../hooks/useAuth'

/**
 * Registration form component
 */
export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { register, loading, error } = useAuth()

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    register(email, password)
  }

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
      
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <Button
        title={loading ? "Registering..." : "Register"}
        onPress={handleRegister}
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