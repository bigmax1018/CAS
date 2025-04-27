<!-- web-vue/src/components/auth/LoginForm.vue -->
<script setup lang="ts">
/**
 * Login form component
 * Handles user authentication with email/password
 * Includes validation and error handling
 */

import { ref } from 'vue';
import { useAuthStore } from '../@shared/stores/auth.store';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  try {
    await authStore.login(email.value, password.value);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login failed';
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input 
        id="email" 
        v-model="email" 
        type="email" 
        required
      />
    </div>
    
    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
      />
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <button type="submit" :disabled="authStore.isLoading">
      {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>

<style scoped>
/* Form styles */
</style>