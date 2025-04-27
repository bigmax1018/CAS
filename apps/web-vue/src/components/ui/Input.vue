<!-- web-vue/src/components/ui/Input.vue -->
<template>
  <div class="input-wrapper" :class="{ 'has-error': error }">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="required-asterisk">*</span>
    </label>
    <div class="input-container">
      <slot name="prefix"></slot>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        class="input-field"
      />
      <slot name="suffix"></slot>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="hint && !error" class="hint-message">
      {{ hint }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'blur', 'focus'])
</script>

<style scoped>
.input-wrapper {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}

.required-asterisk {
  color: var(--danger-color);
}

.input-container {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: border-color 0.2s;
  background-color: var(--input-bg);
}

.input-container:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color);
}

.input-field {
  flex: 1;
  padding: 0.75rem;
  border: none;
  background: transparent;
  color: var(--text-color);
  font-size: 1rem;
}

.input-field:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.input-field:read-only {
  background-color: var(--readonly-bg);
}

.error-message {
  margin-top: 0.25rem;
  color: var(--danger-color);
  font-size: 0.8rem;
}

.hint-message {
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.input-wrapper.has-error .input-container {
  border-color: var(--danger-color);
}
</style>