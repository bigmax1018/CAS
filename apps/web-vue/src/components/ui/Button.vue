<!-- web-vue/src/components/ui/Button.vue -->
<template>
  <button 
    :class="['btn', variant, size, { 'full-width': fullWidth }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot name="icon" v-if="$slots.icon"></slot>
    <span class="btn-content">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'text', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.full-width {
  width: 100%;
}

/* Variants */
.btn.primary {
  background-color: var(--primary-color);
  color: white;
}

.btn.primary:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

.btn.secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn.secondary:hover:not(:disabled) {
  background-color: var(--secondary-dark);
}

.btn.outline {
  background-color: transparent;
  border-color: var(--border-color);
  color: var(--text-color);
}

.btn.outline:hover:not(:disabled) {
  background-color: var(--hover-bg);
}

.btn.text {
  background-color: transparent;
  border-color: transparent;
  color: var(--text-color);
}

.btn.text:hover:not(:disabled) {
  background-color: var(--hover-bg);
}

.btn.danger {
  background-color: var(--danger-color);
  color: white;
}

.btn.danger:hover:not(:disabled) {
  background-color: var(--danger-dark);
}

/* Sizes */
.btn.small {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}

.btn.medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.btn.large {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>