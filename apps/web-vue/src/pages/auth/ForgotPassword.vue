<!-- web-vue/src/pages/auth/ForgotPassword.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'
import AuthLayout from '../../components/layout/AuthLayout.vue'

const email = ref('')
const { resetPassword, loading, error } = useAuth()

const handleSubmit = async () => {
  await resetPassword(email.value)
}
</script>

<template>
  <AuthLayout>
    <h2>Forgot Password</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-else-if="!error && loading" class="info">
        If an account exists, you'll receive a password reset link
      </p>
    </form>
    <router-link to="/login">Back to Login</router-link>
  </AuthLayout>
</template>

<style scoped>
.error {
  color: var(--danger-color);
}
.info {
  color: var(--secondary-color);
}
</style>