// server/src/core/middleware/error.middleware.ts
/**
 * Central error handling middleware
 * Formats all errors consistently and logs unexpected errors
 */
import { Request, Response, NextFunction } from 'express';
import { ApiError, ValidationError } from '../exceptions';
import logger from '../utils/logger';

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err instanceof ValidationError && { fields: err.fields })
      }
    });
  }

  logger.error('Unexpected error:', err);
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  });
}