<!-- web-vue/src/pages/user/Profile.vue -->
<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'
const { user } = useAuth()
</script>

<template>
  <div class="profile-page">
    <h2>Your Profile</h2>
    <div v-if="user" class="profile-info">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Joined:</strong> {{ new Date(user.createdAt).toLocaleDateString() }}</p>
    </div>
  </div>
</template>