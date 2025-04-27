<!-- web-vue/src/components/common/Breadcrumb.vue -->
<template>
  <nav class="breadcrumb">
    <ol>
      <li v-for="(item, index) in items" :key="index">
        <router-link 
          v-if="item.to" 
          :to="item.to"
          class="breadcrumb-link"
        >
          {{ item.text }}
        </router-link>
        <span v-else class="breadcrumb-text">
          {{ item.text }}
        </span>
        <span 
          v-if="index < items.length - 1" 
          class="breadcrumb-separator"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => typeof item.text === 'string')
    }
  }
})
</script>

<style scoped>
.breadcrumb {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: var(--primary-color);
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-text {
  color: var(--text-muted);
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: var(--text-muted);
}
</style>