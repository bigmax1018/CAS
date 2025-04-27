// mobile-react/src/components/ui/Button.tsx
import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  loading?: boolean
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

/**
 * Reusable button component with loading state
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary'
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === 'primary' ? styles.primary : styles.secondary,
      (disabled || loading) && styles.disabled
    ]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color={variant === 'primary' ? 'white' : '#3498db'} />
    ) : (
      <Text style={[
        styles.text,
        variant === 'primary' ? styles.primaryText : styles.secondaryText
      ]}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4
  },
  primary: {
    backgroundColor: '#3498db'
  },
  secondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3498db'
  },
  disabled: {
    opacity: 0.6
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  primaryText: {
    color: 'white'
  },
  secondaryText: {
    color: '#3498db'
  }
})