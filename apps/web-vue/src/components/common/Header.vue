<!-- web-vue/src/components/common/Header.vue -->
<template>
  <header class="app-header">
    <div class="header-left">
      <slot name="left">
        <router-link to="/" class="logo-link">
          <img :src="logo" alt="App Logo" class="logo" />
          <span class="app-name">CAS</span>
        </router-link>
      </slot>
    </div>
    <div class="header-center">
      <slot name="center"></slot>
    </div>
    <div class="header-right">
      <slot name="right">
        <nav class="nav-links">
          <router-link to="/dashboard">Dashboard</router-link>
          <router-link to="/markets">Markets</router-link>
          <router-link to="/profile">Profile</router-link>
        </nav>
        <DarkModeToggle />
      </slot>
    </div>
  </header>
</template>

<script setup>
import logo from '@/assets/images/logo.png'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--header-bg);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logo {
  height: 2rem;
  margin-right: 0.5rem;
}

.app-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-right: 1rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  padding: 0.5rem;
  border-radius: 4px;
}

.nav-links a:hover {
  background-color: var(--hover-bg);
}

.nav-links a.router-link-exact-active {
  color: var(--primary-color);
  font-weight: bold;
}
</style>