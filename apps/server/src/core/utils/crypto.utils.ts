// server/src/core/utils/crypto.utils.ts
/**
 * Cryptographic utilities for password hashing and sensitive data encryption.
 * Uses bcrypt for hashing and Node's crypto for AES-256-GCM encryption.
 */
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';
import bcrypt from 'bcrypt';
import config from '../../config';

const SALT_ROUNDS = 12;
const ENCRYPTION_KEY = scryptSync(config.ENCRYPTION_SECRET, 'salt', 32);
const IV_LENGTH = 16;
const ALGORITHM = 'aes-256-gcm';

export const CryptoUtils = {
  // Password Hashing
  async hashPassword(plainText: string): Promise<string> {
    try {
      return await bcrypt.hash(plainText, SALT_ROUNDS);
    } catch (err) {
      throw new CryptoError('Password hashing failed', err);
    }
  },

  async comparePassword(plainText: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainText, hash);
    } catch (err) {
      throw new CryptoError('Password comparison failed', err);
    }
  },

  // Data Encryption
  encrypt(text: string): string {
    try {
      const iv = randomBytes(IV_LENGTH);
      const cipher = createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
      const encrypted = Buffer.concat([
        cipher.update(text, 'utf8'),
        cipher.final(),
      ]);
      const authTag = cipher.getAuthTag();
      return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
    } catch (err) {
      throw new CryptoError('Encryption failed', err);
    }
  },

  decrypt(encryptedText: string): string {
    try {
      const [ivHex, authTagHex, encryptedHex] = encryptedText.split(':');
      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');
      const decipher = createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
      decipher.setAuthTag(authTag);
      return Buffer.concat([
        decipher.update(Buffer.from(encryptedHex, 'hex')),
        decipher.final(),
      ]).toString('utf8');
    } catch (err) {
      throw new CryptoError('Decryption failed', err);
    }
  },
};

class CryptoError extends Error {
  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    this.name = 'CryptoError';
  }
}