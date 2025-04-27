<!-- web-vue/src/components/common/Footer.vue -->
<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>About</h4>
        <p>CAS - Crypto Analysis System</p>
        <p>Version 1.0.0</p>
      </div>
      <div class="footer-section">
        <h4>Links</h4>
        <router-link to="/terms">Terms</router-link>
        <router-link to="/privacy">Privacy</router-link>
        <router-link to="/docs">Documentation</router-link>
      </div>
      <div class="footer-section">
        <h4>Contact</h4>
        <p>support@cas.example.com</p>
        <div class="social-links">
          <a href="#"><TwitterIcon /></a>
          <a href="#"><DiscordIcon /></a>
          <a href="#"><GithubIcon /></a>
        </div>
      </div>
    </div>
    <div class="copyright">
      &copy; {{ currentYear }} CAS. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import TwitterIcon from '@/assets/icons/TwitterIcon.vue'
import DiscordIcon from '@/assets/icons/DiscordIcon.vue'
import GithubIcon from '@/assets/icons/GithubIcon.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background-color: var(--footer-bg);
  color: var(--footer-text);
  padding: 2rem 1rem;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-section {
  flex: 1;
  min-width: 200px;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: var(--footer-heading);
}

.footer-section p, .footer-section a {
  margin: 0.5rem 0;
  color: inherit;
  text-decoration: none;
  display: block;
}

.footer-section a:hover {
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-links a {
  color: inherit;
  opacity: 0.8;
}

.social-links a:hover {
  opacity: 1;
}

.copyright {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--footer-border);
}
</style>