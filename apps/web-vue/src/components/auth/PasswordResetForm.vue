<!-- web-vue/src/components/auth/PasswordResetForm.vue -->
<script setup lang="ts">
/**
 * Password reset flow with:
 * - Token validation
 * - Security requirements
 * - Error handling
 */
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { z } from 'zod';

const schema = z.object({
  token: z.string().min(6),
  newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const auth = useAuthStore();
const form = ref({
  token: '',
  newPassword: '',
  confirmPassword: ''
});
const error = ref('');

async function handleSubmit() {
  try {
    schema.parse(form.value);
    await auth.resetPassword(
      form.value.token,
      form.value.newPassword
    );
  } catch (err) {
    error.value = err instanceof z.ZodError 
      ? err.errors[0].message 
      : err.message;
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <Input 
      v-model="form.token" 
      label="Reset Token" 
      type="text" 
    />
    <Input
      v-model="form.newPassword"
      label="New Password"
      type="password"
    />
    <Input
      v-model="form.confirmPassword"
      label="Confirm Password"
      type="password"
    />
    <Button type="submit">Reset Password</Button>
    <Notification v-if="error" type="error" :message="error" />
  </form>
</template>