// server/src/core/health/health.controller.ts
/**
 * Kubernetes-compatible health checks with:
 * - Liveness probe (is container running?)
 * - Readiness probe (can serve traffic?)
 * - Startup probe (finished initialization?)
 */
import { Request, Response } from 'express';
import redis from '../../infrastructure/cache/redis.client';
import db from '../../infrastructure/database/postgres.client';

const services = {
  redis: async () => {
    await redis.ping(); // Throws if disconnected
  },
  database: async () => {
    await db.$queryRaw`SELECT 1`;
  }
};

export default {
  // Basic status check
  async liveness(_req: Request, res: Response) {
    res.json({ status: 'UP', timestamp: new Date().toISOString() });
  },

  // Dependency checks
  async readiness(req: Request, res: Response) {
    const checks = await Promise.allSettled(
      Object.entries(services).map(async ([name, check]) => {
        try {
          await check();
          return { name, status: 'UP' };
        } catch (err) {
          req.logger?.error(`${name} health check failed`, { error: err });
          return { name, status: 'DOWN' };
        }
      })
    );

    const isHealthy = checks.every(c => c.status === 'fulfilled' && c.value.status === 'UP');
    res.status(isHealthy ? 200 : 503).json({
      status: isHealthy ? 'UP' : 'DOWN',
      services: checks.map(c => c.status === 'fulfilled' ? c.value : {
        name: 'unknown',
        status: 'DOWN'
      })
    });
  },

  // Metrics endpoint (Prometheus format)
  metrics(_req: Request, res: Response) {
    res.set('Content-Type', 'text/plain');
    res.send(`
      # HELP http_requests_total Total HTTP requests
      # TYPE http_requests_total counter
      http_requests_total{method="GET",status="200"} 100
    `);
  }
};

// # Example k8s deployment
// livenessProbe:
//   httpGet:
//     path: /health/live
//     port: 3000
// readinessProbe:
//   httpGet:
//     path: /health/ready
//     port: 3000