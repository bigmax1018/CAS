<!-- web-vue/src/components/auth/AuthWrapper.vue -->
<script setup lang="ts">
/**
 * Authentication wrapper with:
 * - Route guards
 * - Permission checks
 * - Session monitoring
 */
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
  requiresAuth?: boolean;
  requiredRole?: string;
}>();

const auth = useAuthStore();
const router = useRouter();
const isReady = ref(false);

onMounted(async () => {
  await auth.checkSession();
  
  // Redirect logic
  if (props.requiresAuth && !auth.isAuthenticated) {
    router.push('/login');
  } else if (auth.isAuthenticated && props.requiredRole && 
             !auth.user.roles.includes(props.requiredRole)) {
    router.push('/forbidden');
  }
  
  isReady.value = true;
});
</script>

<template>
  <div v-if="isReady">
    <slot v-if="!requiresAuth || auth.isAuthenticated" />
    <div v-else class="auth-loading">
      <p>Redirecting to login...</p>
    </div>
  </div>
  <div v-else class="auth-loading">
    <p>Checking session...</p>
  </div>
</template>