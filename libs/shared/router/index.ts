// shared/router/index.ts
/**
 * Shared router configuration
 * Defines base routes and navigation guards
 */

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@web-vue/src/pages/Home.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@web-vue/src/pages/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    // Additional base routes...
  ]
});

// Authentication guard
router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
});

export default router;