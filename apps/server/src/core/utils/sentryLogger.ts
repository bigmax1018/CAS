// server/src/core/utils/sentryLogger.ts
/**
 * Winston transport that sends errors to Sentry with OTEL context
 */
import Transport from 'winston-transport';
import * as Sentry from '@sentry/node';
import { trace } from '@opentelemetry/api';

export class SentryTransport extends Transport {
  log(info: any, callback: () => void) {
    const { level, message, ...meta } = info;
    const span = trace.getActiveSpan();

    setImmediate(() => {
      if (level === 'error') {
        Sentry.withScope(scope => {
          if (span) {
            scope.setSpan(span);
          }
          scope.setExtras(meta);
          Sentry.captureException(message instanceof Error ? message : new Error(message));
        });
      }
      this.emit('logged', info);
    });

    callback();
  }
}

// Add to logger configuration:
// logger.add(new SentryTransport({ level: 'error' }));
