import winston from 'winston';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

const { combine, timestamp, json, errors } = winston.format;

// Custom error formatter
const errorFormatter = winston.format((info) => {
  if (info instanceof Error) {
    return { ...info, stack: info.stack, message: info.message };
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    errorFormatter(),
    errors({ stack: true }),
    json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

// Request logger middleware
export function requestLogger() {
  return (req: Request, res: Response, next: NextFunction) => {
    const correlationId = req.headers['x-correlation-id'] || randomUUID();
    const startTime = process.hrtime();

    res.on('finish', () => {
      const duration = process.hrtime(startTime);
      const ms = duration[0] * 1000 + duration[1] / 1e6;
      logger.info({
        correlationId,
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${ms.toFixed(2)}ms`,
        ip: req.ip
      });
    });

    req.logger = logger.child({ correlationId });
    next();
  };
}

// Augment Express Request type
declare global {
  namespace Express {
    interface Request {
      logger: winston.Logger;
    }
  }
}

export default logger;