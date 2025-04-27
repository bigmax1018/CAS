// server/src/core/middleware/tracing.middleware.ts (updated)
/**
 * Starts Sentry transactions for HTTP requests
 */
import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';

export function tracingMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const transaction = Sentry.startTransaction({
      op: 'http.server',
      name: `${req.method} ${req.url}`
    });

    Sentry.getCurrentHub().configureScope(scope => {
      scope.setSpan(transaction);
    });

    // Attach to request
    req.__sentry_transaction = transaction;

    res.on('finish', () => {
      transaction.setHttpStatus(res.statusCode);
      transaction.finish();
    });

    next();
  };
}