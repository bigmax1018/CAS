<!-- web-vue/src/components/ui/Modal.vue -->
<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-container" :class="size">
        <div class="modal-header">
          <h3 v-if="title">{{ title }}</h3>
          <button class="close-btn" @click="close">
            <CloseIcon />
          </button>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch } from 'vue'
import CloseIcon from '@/assets/icons/CloseIcon.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'full'].includes(value)
  },
  preventClose: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isOpen', 'close'])

const close = () => {
  if (!props.preventClose) {
    emit('update:isOpen', false)
    emit('close')
  }
}

// Close modal on Escape key
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
})

const handleKeydown = (e) => {
  if (e.key === 'Escape' && !props.preventClose) {
    close()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: var(--modal-bg);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--modal-border);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-muted);
}

.close-btn:hover {
  color: var(--text-color);
}

.modal-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--modal-border);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Modal sizes */
.modal-container.small {
  width: 400px;
}

.modal-container.medium {
  width: 600px;
}

.modal-container.large {
  width: 800px;
}

.modal-container.full {
  width: 95vw;
  height: 95vh;
}

/* Transition effects */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-20px);
  opacity: 0;
}
</style>