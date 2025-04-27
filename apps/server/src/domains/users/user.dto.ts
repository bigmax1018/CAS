// server/src/domains/users/user.dto.ts
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional() // If name is optional
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;