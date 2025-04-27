import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import { trace, SpanStatusCode } from '@opentelemetry/api'; // Add SpanStatusCode

export function sentryErrorHandler() {
  return (err: Error, req: Request, _res: Response, next: NextFunction) => {
    const transaction = Sentry.getCurrentHub()?.getScope()?.getTransaction();
    
    // Capture exceptions with context
    Sentry.withScope(scope => {
      scope.setContext('request', {
        method: req.method,
        url: req.url,
        headers: req.headers
      });
      
      if (transaction) {
        scope.setSpan(transaction);
      }
      
      Sentry.captureException(err);
    });

    // Ensure the error is passed to OpenTelemetry
    const activeSpan = trace.getActiveSpan();
    if (activeSpan) {
      activeSpan.recordException(err);
      activeSpan.setStatus({ 
        code: SpanStatusCode.ERROR, // Use SpanStatusCode instead
        message: err.message 
      });
    }

    next(err);
  };
}