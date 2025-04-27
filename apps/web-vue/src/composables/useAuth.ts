// web-vue/src/composables/useAuth.ts
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@shared/stores/auth.store'

/**
 * Authentication composable for Vue components
 * Handles login, logout, and user state
 */
export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      await authStore.login(email, password)
      router.push('/dashboard')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await authStore.logout()
    router.push('/login')
  }

  return {
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    loading,
    error,
    login,
    logout,
  }
}