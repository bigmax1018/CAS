import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SentrySpanProcessor } from '@sentry/opentelemetry-node';
import { SpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Context, Span as OtelSpan } from '@opentelemetry/api';

// Type augmentation for the missing Span properties
interface CompleteSpan extends OtelSpan {
  _spanContext: any;
  instrumentationLibrary: any;
  _droppedAttributesCount: number;
  _droppedEventsCount: number;
  _droppedLinksCount: number;
  // Add other missing properties as needed
}

// Type-safe adapter with proper type assertions
class CompatibleSentryProcessor implements SpanProcessor {
  private readonly processor = new SentrySpanProcessor();

  onStart(span: OtelSpan, parentContext: Context): void {
    this.processor.onStart(this.ensureCompleteSpan(span), parentContext);
  }

  onEnd(span: OtelSpan): void {
    this.processor.onEnd(this.ensureCompleteSpan(span));
  }

  private ensureCompleteSpan(span: OtelSpan): CompleteSpan {
    return {
      ...span,
      _spanContext: (span as any)._spanContext || {},
      instrumentationLibrary: (span as any).instrumentationLibrary || {},
      _droppedAttributesCount: (span as any)._droppedAttributesCount || 0,
      _droppedEventsCount: (span as any)._droppedEventsCount || 0,
      _droppedLinksCount: (span as any)._droppedLinksCount || 0,
      // Add other required properties with defaults
    } as CompleteSpan;
  }

  shutdown(): Promise<void> {
    return this.processor.shutdown();
  }

  forceFlush(): Promise<void> {
    return this.processor.forceFlush();
  }
}

export function initTracing() {
  const sdk = new NodeSDK({
    resource: new Resource({
      'service.name': 'your-service',
      'deployment.environment': process.env.NODE_ENV || 'development',
    }),
    spanProcessors: [new CompatibleSentryProcessor()],
  });

  sdk.start();
}