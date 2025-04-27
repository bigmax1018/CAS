<!-- web-vue/src/components/common/Sidebar.vue -->
<template>
  <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-header">
      <button class="toggle-btn" @click="toggleSidebar">
        <MenuIcon />
      </button>
      <span v-if="!isCollapsed" class="sidebar-title">Menu</span>
    </div>
    <nav class="sidebar-nav">
      <router-link 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        class="nav-item"
        :title="item.title"
      >
        <component :is="item.icon" class="nav-icon" />
        <span v-if="!isCollapsed" class="nav-text">{{ item.title }}</span>
      </router-link>
    </nav>
    <div class="sidebar-footer" v-if="!isCollapsed">
      <DarkModeToggle />
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { 
  DashboardIcon, 
  MarketIcon, 
  ProfileIcon,
  SettingsIcon,
  MenuIcon
} from '@/assets/icons'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'

const isCollapsed = ref(false)

const navItems = [
  { path: '/dashboard', title: 'Dashboard', icon: DashboardIcon },
  { path: '/markets', title: 'Markets', icon: MarketIcon },
  { path: '/profile', title: 'Profile', icon: ProfileIcon },
  { path: '/settings', title: 'Settings', icon: SettingsIcon }
]

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--sidebar-border);
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sidebar-border);
}

.toggle-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.5rem;
}

.sidebar-title {
  margin-left: 0.5rem;
  font-weight: bold;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: var(--sidebar-hover);
}

.nav-item.router-link-exact-active {
  background-color: var(--sidebar-active);
  color: var(--sidebar-active-text);
}

.nav-icon {
  flex-shrink: 0;
}

.nav-text {
  margin-left: 0.75rem;
  white-space: nowrap;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--sidebar-border);
}
</style>