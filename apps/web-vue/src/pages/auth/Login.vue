<!-- web-vue/src/pages/auth/Login.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import AuthLayout from '../../components/layout/AuthLayout.vue'

const email = ref('')
const password = ref('')
const router = useRouter()
const { login, loading, error } = useAuth()

const handleLogin = async () => {
  await login(email.value, password.value)
}
</script>

<template>
  <AuthLayout>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <router-link to="/register">Create an account</router-link>
  </AuthLayout>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.error {
  color: var(--danger-color);
}
</style>