// mobile-react/src/hooks/useAuth.ts
import { useState } from 'react'
import { AuthService } from '../../shared/services/auth.service'
import { useAuthStore } from '@shared/stores/auth.store'

/**
 * Authentication hook for React Native
 * Handles login, registration and auth state
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, setUser, clearUser } = useAuthStore()

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const userData = await AuthService.login(email, password)
      setUser(userData)
    } catch (err) {
      setError(err.message || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const userData = await AuthService.register(email, password)
      setUser(userData)
    } catch (err) {
      setError(err.message || 'Registration failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await AuthService.logout()
    clearUser()
  }

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout
  }
}