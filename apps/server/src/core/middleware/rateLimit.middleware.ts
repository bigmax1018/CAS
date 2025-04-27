import { Request, Response, NextFunction } from 'express';
import redis, { redisClient } from '../../infrastructure/cache/redis.client';
import { TooManyRequestsError } from '../exceptions';

type WindowConfig = {
  windowMs: number;    // e.g., 60000ms = 1 minute
  maxRequests: number; // e.g., 100 requests per window
};

const DEFAULT_LIMIT = { windowMs: 60_000, maxRequests: 100 };

export function rateLimiter(config: Partial<WindowConfig> = {}) {
  const { windowMs, maxRequests } = { ...DEFAULT_LIMIT, ...config };

  return async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.ip || 'unknown';
    const redisKey = `rate_limit:${clientId}:${req.originalUrl}`;

    try {
      const now = Date.now();
      const multi = redisClient.multi();

      // Clear old entries and count the remaining ones
      multi.zRemRangeByScore(redisKey, 0, now - windowMs);  // Clear old entries
      multi.zCard(redisKey);  // Count remaining

      // Add the current request and set the expiration
      multi.zAdd(redisKey, { score: now, value: now.toString() });
      multi.expire(redisKey, Math.ceil(windowMs / 1000));  // Set TTL for the key

      // Execute the commands
      const results = await multi.exec();
      const count = Number(results[1]); // Ensuring 'count' is a number

      if (count >= maxRequests) {
        // Retrieve the oldest request timestamp to calculate retry time
        const oldestReq = await redisClient.zRange(redisKey, 0, 0);
        const retryAfter = Math.ceil((Number(oldestReq[0]) + windowMs - now) / 1000);
        throw new TooManyRequestsError(retryAfter);
      }

      // Set rate limit headers for the response
      res.set({
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': (maxRequests - count - 1).toString(),
        'X-RateLimit-Reset': Math.ceil((now + windowMs) / 1000).toString()
      });

      next();  // Proceed to next middleware or route handler
    } catch (err) {
      req.logger?.warn(`Rate limit exceeded for ${clientId}`);
      next(err);  // Pass error to error handling middleware
    }
  };
}