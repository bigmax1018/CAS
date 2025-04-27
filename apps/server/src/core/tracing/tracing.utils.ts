// server/src/core/tracing/tracing.utils.ts
/**
 * OpenTelemetry instrumentation for:
 * - HTTP requests
 * - Database queries
 * - Redis operations
 */
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';
import { RedisInstrumentation } from '@opentelemetry/instrumentation-redis';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

export function initTracing(serviceName: string) {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName
    })
  });

  // Jaeger exporter (configure via env vars)
  provider.addSpanProcessor(new SimpleSpanProcessor(new JaegerExporter()));

  provider.register();

  // Auto-instrument common libraries
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new PgInstrumentation(),
      new RedisInstrumentation()
    ]
  });

  return {
    shutdown: async () => {
      await provider.shutdown();
    }
  };
}

// Add to server startup:
// initTracing('cas-server');