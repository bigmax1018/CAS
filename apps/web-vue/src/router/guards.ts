// web-vue/src/router/guards.ts
import { useAuthStore } from '@shared/stores/auth.store'

/**
 * Authentication guards for Vue Router
 */
export function setupRouterGuards(router) {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return next('/login')
    }
    
    if (to.meta.requiresGuest && authStore.isAuthenticated) {
      return next('/dashboard')
    }
    
    next()
  })
}