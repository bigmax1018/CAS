<!-- web-vue/src/App.vue -->
<script setup lang="ts">
import { useNotification } from './composables/useNotification'
import Notification from './components/ui/Notification.vue'
import { setupRouterGuards } from './router/guards'
import router from './router'

const { notifications } = useNotification()

// Setup router guards
setupRouterGuards(router)
</script>

<template>
  <router-view />
  
  <!-- Notification container -->
  <div class="notifications">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :type="notification.type"
      :message="notification.message"
    />
  </div>
</template>

<style>
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>