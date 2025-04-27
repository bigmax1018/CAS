<!-- web-vue/src/components/ui/Notification.vue -->
<template>
  <transition-group name="notification">
    <div 
      v-for="notification in notifications" 
      :key="notification.id"
      :class="['notification', notification.type]"
      @click="remove(notification.id)"
    >
      <div class="notification-icon">
        <component :is="typeIcons[notification.type]" />
      </div>
      <div class="notification-content">
        <h4 v-if="notification.title" class="notification-title">
          {{ notification.title }}
        </h4>
        <p class="notification-message">
          {{ notification.message }}
        </p>
      </div>
      <button class="close-btn" @click.stop="remove(notification.id)">
        <CloseIcon />
      </button>
    </div>
  </transition-group>
</template>

<script setup>
import { ref } from 'vue'
import SuccessIcon from '@/assets/icons/SuccessIcon.vue'
import ErrorIcon from '@/assets/icons/ErrorIcon.vue'
import WarningIcon from '@/assets/icons/WarningIcon.vue'
import InfoIcon from '@/assets/icons/InfoIcon.vue'
import CloseIcon from '@/assets/icons/CloseIcon.vue'

const typeIcons = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon
}

const notifications = ref([])

const add = (notification) => {
  const id = Date.now().toString()
  notifications.value.push({
    id,
    type: 'info',
    timeout: 5000,
    ...notification
  })
  
  if (notification.timeout !== 0) {
    setTimeout(() => remove(id), notification.timeout)
  }
}

const remove = (id) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

defineExpose({ add, remove })
</script>

<style scoped>
.notification {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 400px;
}

.notification:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.notification-icon {
  margin-right: 1rem;
  font-size: 1.5rem;
}

.notification-content {
  flex: 1;
}

.notification-title {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.notification-message {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.close-btn {
  background: none;
  border: none;
  margin-left: 0.5rem;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
}

.close-btn:hover {
  opacity: 1;
}

/* Notification types */
.notification.success {
  background-color: var(--success-bg);
  color: var(--success-text);
}

.notification.error {
  background-color: var(--error-bg);
  color: var(--error-text);
}

.notification.warning {
  background-color: var(--warning-bg);
  color: var(--warning-text);
}

.notification.info {
  background-color: var(--info-bg);
  color: var(--info-text);
}

/* Transition effects */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.notification-move {
  transition: transform 0.5s ease;
}
</style>