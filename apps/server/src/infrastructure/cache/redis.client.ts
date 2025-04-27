// server/src/infrastructure/cache/redis.client.ts
import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect when the file is loaded
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(console.error);

export default redisClient;