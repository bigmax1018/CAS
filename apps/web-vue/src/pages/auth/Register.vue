<!-- web-vue/src/pages/auth/Register.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import AuthLayout from '../../components/layout/AuthLayout.vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()
const { user, register, loading, error } = useAuth()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  await register(email.value, password.value)
  if (user.value) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <AuthLayout>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input v-model="confirmPassword" type="password" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Registering...' : 'Register' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <router-link to="/login">Already have an account? Login</router-link>
  </AuthLayout>
</template>