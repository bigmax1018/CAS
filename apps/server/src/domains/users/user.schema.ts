// server/src/domains/users/user.schema.ts
/**
 * Complete user schema with:
 * - Zod validation
 * - TypeScript interfaces
 * - Swagger annotations
 */
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const UserRole = z.enum(['USER', 'ADMIN', 'TRADER']);
export type UserRole = z.infer<typeof UserRole>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password_hash: z.string().min(8),
  role: UserRole.default('USER'),
  is_verified: z.boolean().default(false),
  created_at: z.date().default(new Date()),
  updated_at: z.date().default(new Date())
});
// For registration/creation - accepts password but outputs password_hash
export const CreateUserSchema = UserSchema.omit({ 
  password_hash: true 
}).extend({
  password: z.string().min(8)
}).transform((data) => ({
  ...data,
  password_hash: data.password, // Or hash it here
  // Remove the plain password from the output
  password: undefined
}));

export type User = z.infer<typeof UserSchema>;
export class UserDto extends createZodDto(UserSchema.omit({ password_hash: true })) {}
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class UpdateUserDto extends createZodDto(UserSchema.partial()) {}