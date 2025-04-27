<!-- web-vue/src/components/auth/LogoutForm.vue -->
<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'
const { logout, loading } = useAuth()
</script>

<template>
  <button 
    @click="logout" 
    :disabled="loading"
    class="logout-button"
  >
    {{ loading ? 'Logging out...' : 'Logout' }}
  </button>
</template>

<style scoped>
.logout-button {
  padding: 8px 16px;
  background-color: var(--danger-color);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.logout-button:hover {
  opacity: 0.9;
}

.logout-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>