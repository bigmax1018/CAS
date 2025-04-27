// server/src/core/middleware/logging.middleware.ts
import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

/**
 * Logging middleware for API requests
 * Logs request method, path, and response time
 */
export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info({
      message: 'Request completed',
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    })
  })
  
  logger.debug({
    message: 'Incoming request',
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
  })
  
  next()
}