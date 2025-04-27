<!-- web-vue/src/pages/user/Settings.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useDarkMode } from '../../composables/useDarkMode'

const { updateProfile } = useAuth()
const { isDarkMode, toggleDarkMode } = useDarkMode()
const form = ref({
  email: '',
  currentPassword: '',
  newPassword: ''
})

const handleSubmit = async () => {
  await updateProfile(form.value)
}
</script>

<template>
  <div class="settings-page">
    <h2>Settings</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" />
      </div>
      
      <div class="form-group">
        <label>Current Password</label>
        <input v-model="form.currentPassword" type="password" />
      </div>
      
      <div class="form-group">
        <label>New Password</label>
        <input v-model="form.newPassword" type="password" />
      </div>
      
      <button type="submit">Update Profile</button>
    </form>
    
    <div class="preferences">
      <h3>Preferences</h3>
      <label class="toggle">
        <input type="checkbox" :checked="isDarkMode" @change="toggleDarkMode">
        <span>Dark Mode</span>
      </label>
    </div>
  </div>
</template>