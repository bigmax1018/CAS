// server/src/core/middleware/validation.middleware.ts
/**
 * Type-safe request validation using Zod schemas.
 * Supports params, query, and body validation in one middleware.
 */
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import logger from '../utils/logger';
import { ValidationError } from '../exceptions';

export function validate<T extends z.ZodTypeAny>(schema: {
  params?: T;
  query?: T;
  body?: T;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }
      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.errors.reduce((acc, curr) => {
          const path = curr.path.join('.');
          return { ...acc, [path]: curr.message };
        }, {});

        logger.warn('Validation failed', { errors: fieldErrors });
        next(new ValidationError('Invalid request data', fieldErrors));
      } else {
        next(err);
      }
    }
  };
}

// Example usage in routes:
// router.post(
//   '/users',
//   validate({
//     body: z.object({
//       email: z.string().email(),
//       password: z.string().min(8)
//     })
//   }),
//   userController.create
// );