<!-- web-vue/src/components/auth/SignUpForm.vue -->
<script setup lang="ts">
/**
 * User registration form
 * Handles new account creation with validation
 */

import { ref } from 'vue';
import { useAuthStore } from '../@shared/stores/auth.store';

const authStore = useAuthStore();
const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
});
const error = ref('');

const validateForm = () => {
  return form.value.password === form.value.confirmPassword;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    await authStore.register(form.value);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Registration failed';
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- Form fields similar to LoginForm -->
  </form>
</template>