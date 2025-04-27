// server/src/core/utils/config.validator.ts
/**
 * Validates environment configuration on server startup.
 * Uses Zod for schema validation with descriptive errors.
 */
import { z } from 'zod';
import { logger } from './logger';

const ConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.number().int().positive(),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  ENCRYPTION_SECRET: z.string().min(32),
  API_RATE_LIMIT: z.number().int().positive().default(100),
});

export function validateConfig(env: NodeJS.ProcessEnv) {
  try {
    return ConfigSchema.parse({
      ...env,
      PORT: parseInt(env.PORT || '3000'),
      API_RATE_LIMIT: parseInt(env.API_RATE_LIMIT || '100'),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      logger.error('Configuration validation failed:');
      err.issues.forEach((issue) => {
        logger.error(`- ${issue.path.join('.')}: ${issue.message}`);
      });
    }
    process.exit(1);
  }
}