// web-vue/src/composables/useNotification.ts
import { ref } from 'vue'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: number
  type: NotificationType
  message: string
  timeout?: number
}

/**
 * Notification system composable
 */
export function useNotification() {
  const notifications = ref<Notification[]>([])

  const notify = (message: string, type: NotificationType = 'info', timeout = 3000) => {
    const id = Date.now()
    notifications.value.push({ id, type, message, timeout })

    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, timeout)
    }
  }

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    notifications,
    notify,
    removeNotification,
  }
}