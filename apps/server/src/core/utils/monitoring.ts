// web-vue/src/utils/monitoring.ts
/**
 * Sentry + OpenTelemetry for Vue frontend with:
 * - Error boundary tracking
 * - Performance monitoring
 * - Session replay
 */
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import { init as initOtel } from '@opentelemetry/sdk-browser';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SentrySpanProcessor, SentryPropagator } from '@sentry/opentelemetry-browser';

export function initMonitoring(app: App, router: Router) {
  // Initialize Sentry
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENV,
    integrations: [
      new BrowserTracing({ routingInstrumentation: Sentry.vueRouterInstrumentation(router) }),
      new Sentry.Replay()
    ],
    tracesSampleRate: 0.5, // 50% transaction sampling
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0
  });

  // Configure OpenTelemetry
  const provider = new WebTracerProvider();
  provider.addSpanProcessor(new SentrySpanProcessor());
  provider.register({ propagator: new SentryPropagator() });

  // Vue error handler
  app.config.errorHandler = (err, vm, info) => {
    Sentry.captureException(err, {
      contexts: { vue: { component: vm?.$options.name, info } }
    });
  };
}