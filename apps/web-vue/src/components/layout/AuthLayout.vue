<!-- web-vue/src/components/layout/AuthLayout.vue -->
<script setup lang="ts">
import { useDarkMode } from '../../composables/useDarkMode'
const { isDarkMode } = useDarkMode()
</script>

<template>
  <div class="auth-layout" :class="{ 'dark-mode': isDarkMode }">
    <div class="auth-container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
}

.auth-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--card-background);
}

.dark-mode .auth-container {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
</style>