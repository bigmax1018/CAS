// shared/utils/auth.utils.ts
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

const SALT_ROUNDS = 12;

@Injectable()
export class AuthUtils {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  static async verifyPassword(
    plainText: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}

// Alternative standalone functions (if not using DI)
export const hashPassword = (password: string) => bcrypt.hash(password, SALT_ROUNDS);
export const verifyPassword = (plainText: string, hash: string) => bcrypt.compare(plainText, hash);